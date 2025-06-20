const features = [
  {
    title: "Optimistic Verification",
    description:
      "Data is assumed correctly stored until proven otherwise, reducing verification overhead by 90%.",
    icon: "🔍",
  },
  {
    title: "Economic Security",
    description:
      "Providers stake STX tokens as collateral. Dishonest behavior leads to stake slashing.",
    icon: "🔒",
  },
  {
    title: "Challenge Protocol",
    description:
      "Random challenges verify data integrity. Providers must prove possession of specific chunks.",
    icon: "⚡",
  },
  {
    title: "Bitcoin Settlement",
    description:
      "All disputes are settled on Bitcoin through Stacks, providing maximum security guarantees.",
    icon: "₿",
  },
  {
    title: "Reputation System",
    description:
      "Track provider reliability with on-chain reputation scores based on verification history.",
    icon: "⭐",
  },
  {
    title: "Fraud Proofs",
    description:
      "Anyone can submit fraud proofs against dishonest providers and earn rewards.",
    icon: "🛡️",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Core Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Built for security, efficiency, and trust minimization
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-8"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
