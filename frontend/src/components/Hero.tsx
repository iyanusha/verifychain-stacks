"use client";

import { useWallet } from "@/hooks/useWallet";

export default function Hero() {
  const { isConnected, connect } = useWallet();

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Decentralized Storage
            <span className="block text-primary-600">Verification Network</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Verify data storage on the Stacks blockchain using optimistic
            verification. Stake STX, register as a provider, and earn rewards
            for honest storage.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!isConnected ? (
              <button
                onClick={connect}
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
              >
                Connect Wallet to Start
              </button>
            ) : (
              <a
                href="#register"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
              >
                Register as Provider
              </a>
            )}
            <a
              href="#how-it-works"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more &rarr;
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">1M+ STX</div>
            <div className="mt-2 text-sm text-gray-600">Total Staked</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">250+</div>
            <div className="mt-2 text-sm text-gray-600">Storage Providers</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-primary-600">99.9%</div>
            <div className="mt-2 text-sm text-gray-600">Uptime Verified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
