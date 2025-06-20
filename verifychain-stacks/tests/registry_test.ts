import { Clarinet, Tx, Chain, Account, types } from "https://deno.land/x/clarinet@v0.31.0/index.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

Clarinet.test({
  name: "Provider can register with valid stake",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet1 = accounts.get("wallet_1")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "registry",
        "register-provider",
        [types.uint(1000), types.uint(1000000)],
        wallet1.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    block.receipts[0].result.expectOk().expectUint(1);
  },
});

Clarinet.test({
  name: "Cannot register twice with same address",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get("wallet_1")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "registry",
        "register-provider",
        [types.uint(1000), types.uint(1000000)],
        wallet1.address
      ),
      Tx.contractCall(
        "registry",
        "register-provider",
        [types.uint(500), types.uint(1000000)],
        wallet1.address
      ),
    ]);

    assertEquals(block.receipts.length, 2);
    block.receipts[0].result.expectOk();
    block.receipts[1].result.expectErr().expectUint(101);
  },
});

Clarinet.test({
  name: "Provider can add additional stake",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const wallet1 = accounts.get("wallet_1")!;

    let block = chain.mineBlock([
      Tx.contractCall(
        "registry",
        "register-provider",
        [types.uint(1000), types.uint(1000000)],
        wallet1.address
      ),
    ]);
    block.receipts[0].result.expectOk();

    block = chain.mineBlock([
      Tx.contractCall(
        "registry",
        "add-stake",
        [types.uint(500000)],
        wallet1.address
      ),
    ]);

    assertEquals(block.receipts.length, 1);
    block.receipts[0].result.expectOk().expectUint(500000);
  },
});

Clarinet.test({
  name: "Only contract owner can pause",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet1 = accounts.get("wallet_1")!;

    let block = chain.mineBlock([
      Tx.contractCall("registry", "pause-contract", [], wallet1.address),
    ]);

    block.receipts[0].result.expectErr().expectUint(100);

    block = chain.mineBlock([
      Tx.contractCall("registry", "pause-contract", [], deployer.address),
    ]);

    block.receipts[0].result.expectOk();
  },
});

Clarinet.test({
  name: "Cannot register when contract is paused",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get("deployer")!;
    const wallet1 = accounts.get("wallet_1")!;

    chain.mineBlock([
      Tx.contractCall("registry", "pause-contract", [], deployer.address),
    ]);

    let block = chain.mineBlock([
      Tx.contractCall(
        "registry",
        "register-provider",
        [types.uint(1000), types.uint(1000000)],
        wallet1.address
      ),
    ]);

    block.receipts[0].result.expectErr().expectUint(108);
  },
});
