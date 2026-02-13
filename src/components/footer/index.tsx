import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        // { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "GitHub", href: "https://github.com/afiqhafiz" },
        { label: "LinkedIn", href: "https://my.linkedin.com/in/afiq-redzuan-3849331a4" },
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-6 border-t border-white/10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#home" className="text-2xl font-bold mb-4 inline-block">
              <span className="gradient-text">Afiq</span>
              <span className="text-white">.</span>
              <span className="text-gray-400 text-sm font-normal ml-2">dev</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              Crafting beautiful digital experiences with code and creativity.
              Let&apos;s build something amazing together.
            </p>

            {/* Quote */}
            <div className="glass rounded-xl p-4 inline-block">
              <p className="text-sm text-gray-400 italic">
                &ldquo;Code is like humor. When you have to explain it, it&apos;s
                bad.&rdquo;
              </p>
              <p className="text-xs text-primary-400 mt-2">— Cory House</p>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Afiq Hafiz. Built with{" "}
            <span className="text-primary-400">React</span>,{" "}
            <span className="text-accent-cyan">Tailwind</span>, and lots of{" "}
            <span className="text-accent-gold">☕</span>
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors text-sm group hover:-translate-y-1 duration-300"
          >
            Back to top
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>

        {/* Fun Easter Egg */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-600 font-mono">
            Made with ❤️ in Malaysia 🇲🇾 | No templates were harmed in the making
            of this site
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
