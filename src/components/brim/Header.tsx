import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface HeaderProps {
  currentPage: "home" | "contact";
  onNavigate: (page: "home" | "contact") => void;
}

export function Header({
  currentPage,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavClick = (
    page: "home" | "contact",
    section?: string,
  ) => {
    setMobileMenuOpen(false);
    onNavigate(page);

    // If navigating to home with a section, scroll to it after a brief delay
    if (page === "home" && section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // toggle scrolled state to create a merging/compact header effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="site-header" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-colors duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
            scrolled ? "h-[72px] sm:h-[80px]" : "h-[80px] sm:h-[88px]"
          }`}
          role="banner"
        >
          {/* Logo/Brand */}
          <button
            onClick={() => handleNavClick("home")}
            className="transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ fontFamily: "Aerial", fontWeight: "bold" }}
            aria-label="Brim Clocks Home"
          >
            <span
              className={`text-[#1E3A8A] transition-all duration-300 ease-in-out ${
                    scrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              }`}
            >
              BRIM
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => handleNavClick("home", "about")}
              className="text-sm lg:text-base text-[#546E7A] hover:text-[#1E3A8A] transition-colors"
              aria-label="About section"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("home", "products")}
              className="text-sm lg:text-base text-[#546E7A] hover:text-[#1E3A8A] transition-colors"
              aria-label="Products section"
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="px-4 lg:px-6 py-2 bg-[#2196F3] text-white rounded hover:bg-[#1976D2] transition-colors text-sm lg:text-base"
              aria-label="Contact page"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1E3A8A] p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <button
              onClick={() => handleNavClick("home", "about")}
              className="block w-full text-left text-[#546E7A] hover:text-[#1E3A8A] hover:bg-gray-100 transition-all py-2.5 px-3 rounded-lg"
              aria-label="About section"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("home", "products")}
              className="block w-full text-left text-[#546E7A] hover:text-[#1E3A8A] hover:bg-gray-100 transition-all py-2.5 px-3 rounded-lg"
              aria-label="Products section"
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full text-left px-4 py-2.5 bg-[#2196F3] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
              aria-label="Contact page"
            >
              Contact
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}