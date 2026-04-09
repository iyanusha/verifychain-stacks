"use client";

import { useWallet } from "@/hooks/useWallet";

export default function Navbar() {
  const { isConnected, connect, disconnect, getAddress } = useWallet();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              VerifyChain
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="/providers" className="text-sm text-gray-600 hover:text-gray-900">
              Providers
            </a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
              How It Works
            </a>
          </div>

          <div>
            {isConnected ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {getAddress()?.slice(0, 6)}...{getAddress()?.slice(-4)}
                </span>
                <button
                  onClick={disconnect}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
