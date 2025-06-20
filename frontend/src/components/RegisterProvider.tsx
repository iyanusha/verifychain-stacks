"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { openContractCall } from "@stacks/connect";
import {
  uintCV,
  PostConditionMode,
} from "@stacks/transactions";
import { CONTRACT_ADDRESS, CONTRACT_NAME, network } from "@/lib/stacks";

export default function RegisterProvider() {
  const { isConnected } = useWallet();
  const [capacity, setCapacity] = useState("");
  const [stake, setStake] = useState("");

  const handleRegister = async () => {
    if (!capacity || !stake) return;

    await openContractCall({
      network,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "register-provider",
      functionArgs: [
        uintCV(parseInt(capacity)),
        uintCV(parseInt(stake) * 1000000),
      ],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => {
        console.log("Transaction submitted:", data.txId);
      },
    });
  };

  if (!isConnected) return null;

  return (
    <section id="register" className="py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
          Register as Provider
        </h2>
        <p className="mt-4 text-center text-gray-600">
          Stake STX and start earning rewards for storage verification
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Storage Capacity (MB)
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              placeholder="Enter storage capacity in MB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stake Amount (STX)
            </label>
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              placeholder="Minimum 1 STX"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Register Provider
          </button>
        </div>
      </div>
    </section>
  );
}
