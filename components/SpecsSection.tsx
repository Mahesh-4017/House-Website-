export default function SpecsSection() {
  const specs = [
    { label: "Internal Area", value: "6,200 sq ft" },
    { label: "External Area", value: "3,400 sq ft" },
    { label: "Bedrooms", value: "5 Suites" },
    { label: "Bathrooms", value: "6.5" },
    { label: "Parking", value: "4 Cars" },
    { label: "Completion", value: "Q4 2025" },
    { label: "Architect", value: "Studio AR" },
    { label: "Price", value: "€4,200,000" },
  ];

  return (
    <section className="bg-[#050505] text-white py-32 px-6 md:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] uppercase text-white/50 mb-16">
          05 — Property Specifications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {specs.map((spec, i) => (
            <div key={i} className="flex flex-col border-t border-white/10 pt-6">
              <span className="text-3xl font-light mb-2 text-white/90">{spec.value}</span>
              <span className="text-xs uppercase tracking-widest text-white/40">{spec.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
