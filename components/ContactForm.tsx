"use client";

export default function ContactForm() {
  return (
    <section className="bg-[#f8f6f1] text-[#111] py-32 px-6 md:px-24 border-t border-black/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20">
        
        {/* LEFT */}
        <div className="w-full md:w-1/2">
          <h2 className="text-sm tracking-[0.3em] uppercase text-black/40 mb-8">
            10 — Private Viewing
          </h2>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-8">
            Register your interest.
          </h3>

          <p className="text-lg text-black/55 leading-relaxed mb-16 max-w-md">
            The residence is currently under construction. Private site
            viewings and detailed architectural presentations are available
            strictly by appointment.
          </p>

          <div className="flex flex-col gap-6 text-sm text-black/45 tracking-[0.1em] uppercase">
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-black/25 mb-1">Email</span>
              <a
                href="mailto:contact@luxuryvilla.com"
                className="hover:text-black transition-colors"
              >
                contact@luxuryvilla.com
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-black/25 mb-1">Phone</span>
              <a
                href="tel:+1234567890"
                className="hover:text-black transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-black/25 mb-1">Office</span>
              <span className="leading-relaxed">
                100 Luxury Avenue
                <br />
                Los Angeles, CA 90210
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 md:pt-16">
          <form
            className="flex flex-col gap-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-3 relative group">
              <label className="text-[10px] tracking-[0.2em] uppercase text-black/40 group-focus-within:text-black transition-colors">
                Full Name
              </label>

              <input
                type="text"
                className="bg-transparent border-b border-black/15 pb-3 text-black outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 relative group">
              <label className="text-[10px] tracking-[0.2em] uppercase text-black/40 group-focus-within:text-black transition-colors">
                Email Address
              </label>

              <input
                type="email"
                className="bg-transparent border-b border-black/15 pb-3 text-black outline-none focus:border-black transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-3 relative group">
              <label className="text-[10px] tracking-[0.2em] uppercase text-black/40 group-focus-within:text-black transition-colors">
                Phone Number
              </label>

              <input
                type="tel"
                className="bg-transparent border-b border-black/15 pb-3 text-black outline-none focus:border-black transition-colors"
              />
            </div>

            <div className="flex flex-col gap-3 relative group">
              <label className="text-[10px] tracking-[0.2em] uppercase text-black/40 group-focus-within:text-black transition-colors">
                Message
              </label>

              <textarea
                rows={4}
                className="bg-transparent border-b border-black/15 pb-3 text-black outline-none focus:border-black transition-colors resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="mt-6 self-start px-10 py-5 rounded-full text-xs tracking-[0.2em] uppercase font-medium border border-black/15 text-black hover:bg-black hover:text-white transition-all duration-500"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}