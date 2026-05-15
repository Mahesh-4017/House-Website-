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
    <section className="bg-[#f8f6f1] text-[#111] py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
          
          <div>
            <span className="text-sm tracking-[0.3em] uppercase text-black/35">
              05 — Property Specifications
            </span>

            <h2 className="mt-6 text-4xl md:text-6xl font-light leading-tight tracking-tight max-w-2xl">
              Crafted with precision, designed for modern luxury living.
            </h2>
          </div>

          <p className="text-black/50 max-w-md leading-relaxed text-lg">
            Every detail of the residence has been carefully considered to
            deliver a refined architectural experience with exceptional comfort
            and timeless aesthetics.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, i) => (
            <div
              key={i}
              className="group bg-white/70 backdrop-blur-sm border border-black/5 rounded-3xl p-8 hover:-translate-y-1 transition-all duration-500 hover:shadow-xl"
            >
              <div className="w-10 h-[2px] bg-black/20 mb-8 group-hover:w-16 transition-all duration-500" />

              <span className="block text-3xl md:text-4xl font-light tracking-tight text-black mb-3">
                {spec.value}
              </span>

              <span className="text-xs uppercase tracking-[0.25em] text-black/40">
                {spec.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}