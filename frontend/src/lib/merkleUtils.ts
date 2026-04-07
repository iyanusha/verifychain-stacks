export function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error('Invalid hex string length');
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sha256(data: Uint8Array): Promise<Uint8Array> {
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(buffer);
}

async function hashPair(left: string, right: string): Promise<string> {
  const leftBytes = hexToBytes(left);
  const rightBytes = hexToBytes(right);
  const combined = new Uint8Array(64);
  combined.set(leftBytes, 0);
  combined.set(rightBytes, 32);
  const hash = await sha256(combined);
  return bytesToHex(hash);
}

export async function verifyMerklePath(
  chunkHash: string,
  proof: string[],
  root: string,
  index: number
): Promise<boolean> {
  let current = chunkHash.toLowerCase();
  let idx = index;

  for (const sibling of proof) {
    const sib = sibling.toLowerCase();
    const isLeft = idx % 2 === 0;
    current = await hashPair(isLeft ? current : sib, isLeft ? sib : current);
    idx = Math.floor(idx / 2);
  }

  return current === root.toLowerCase();
}

export async function getMerkleRoot(leaves: string[]): Promise<string> {
  const tree = await buildMerkleTree(leaves);
  return tree[tree.length - 1][0] ?? '';
}

export async function buildMerkleTree(leaves: string[]): Promise<string[][]> {
  if (leaves.length === 0) return [[]];

  // Pad leaves to power of 2
  let level = leaves.map((l) => l.toLowerCase());
  while (level.length & (level.length - 1)) {
    level.push(level[level.length - 1]);
  }

  const tree: string[][] = [level];

  while (level.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < level.length; i += 2) {
      const parent = await hashPair(level[i], level[i + 1] ?? level[i]);
      nextLevel.push(parent);
    }
    tree.push(nextLevel);
    level = nextLevel;
  }

  return tree;
}

export function getProofForIndex(tree: string[][], index: number): string[] {
  const proof: string[] = [];
  let idx = index;

  for (let level = 0; level < tree.length - 1; level++) {
    const siblingIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
    const sibling = tree[level][siblingIdx] ?? tree[level][idx];
    proof.push(sibling);
    idx = Math.floor(idx / 2);
  }

  return proof;
}
