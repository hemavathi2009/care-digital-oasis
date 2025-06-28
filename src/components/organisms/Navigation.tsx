
import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { Menu, Phone, Calendar, User, Home } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'Services', href: '#services', icon: Calendar },
    { label: 'Doctors', href: '#doctors', icon: User },
    { label: 'Contact', href: '#contact', icon: Phone },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container-hospital px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="w-6 h-6 rounded bg-white"></div>
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                MediCare+
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-muted-foreground' : 'text-white/80'}`}>
                Excellence in Healthcare
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-medium transition-colors hover:scale-105 ${
                  isScrolled 
                    ? 'text-foreground hover:text-primary' 
                    : 'text-white hover:text-accent'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant={isScrolled ? 'outline' : 'ghost'}
              size="md"
              className={!isScrolled ? 'text-white border-white hover:bg-white hover:text-primary' : ''}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button
              variant={isScrolled ? 'primary' : 'accent'}
              size="md"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled 
                ? 'text-foreground hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">
            <div className="container-hospital px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 text-foreground hover:text-primary font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button variant="outline" size="md" className="w-full justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="primary" size="md" className="w-full justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
