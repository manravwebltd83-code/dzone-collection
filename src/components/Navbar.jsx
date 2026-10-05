import React, { useState } from 'react';
import { Menu, X, Mail, MessageCircle, Sun, Moon } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Navbar({ activeTab, setActiveTab, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'HOME', id: 'HOME' },
    { label: 'WATCHES', id: 'WATCHES' },
    { label: 'BELTS', id: 'BELTS' },
    { label: 'JEWELLERY', id: 'JEWELLERY' },
    { label: 'PERFUMES', id: 'PERFUMES' },
    { label: 'REVIEWS', id: 'REVIEWS' },
    { label: 'CONTACT', id: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === 'HOME') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'CONTACT') {
      const el = document.getElementById('contact-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'REVIEWS') {
      const el = document.getElementById('reviews-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="navbar-header">
      {/* Top Banner Notice */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-location">
            <span>📍 G-23, Royal Arcade, Sarthana Jakatnaka, Surat</span>
          </div>

          <div className="top-social-contacts">
            <span>📞 Call / WhatsApp: <strong>96241 65548</strong></span>
            <span className="top-dot">•</span>
            <span>✉ <strong>dzone6226@gmail.com</strong></span>
          </div>
        </div>
      </div>

      {/* Main Header Line */}
      <div className="main-nav-container">
        <div className="container main-nav">
          {/* Logo */}
          <div className="logo-brand" onClick={() => handleNavClick('HOME')}>
            <img src={getAssetUrl('dzone_logo.png')} alt="DZONE COLLECTION Logo" className="header-brand-logo-img" />
            <div className="logo-text">
              <span className="brand-name">DZONE COLLECTION</span>
              <span className="brand-sub">SURAT</span>
            </div>
          </div>

          {/* Navigation Links + Inline Contact Icons */}
          <div className="nav-and-icons-group">
            <nav className="desktop-menu">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Icons in this exact navigation line */}
            <div className="inline-header-icons">
              {/* Dark / Light Mode Switcher Button */}
              <button
                onClick={onToggleTheme}
                className="header-icon-btn theme-toggle-btn"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme Mode"
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="sun-icon" />
                ) : (
                  <Moon size={18} className="moon-icon" />
                )}
              </button>

              {/* WhatsApp Icon */}
              <a
                href="https://wa.me/919624165548"
                target="_blank"
                rel="noreferrer"
                className="header-icon-btn nav-wa"
                title="WhatsApp Enquiry (96241 65548)"
              >
                <MessageCircle size={18} />
              </a>

              {/* Gmail Icon */}
              <a
                href="mailto:dzone6226@gmail.com"
                className="header-icon-btn nav-mail"
                title="Email Us (dzone6226@gmail.com)"
              >
                <Mail size={18} />
              </a>

              {/* Instagram Icon */}
              <a
                href="https://instagram.com/DZONE_COLLECTION"
                target="_blank"
                rel="noreferrer"
                className="header-icon-btn nav-insta"
                title="Instagram (@DZONE_COLLECTION)"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="nav-actions">
            <button
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-menu-links">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mobile-social-bar">
            <a href="https://wa.me/919624165548" target="_blank" rel="noreferrer" className="mobile-social-item wa">
              <MessageCircle size={16} /> WhatsApp: 96241 65548
            </a>
            <a href="mailto:dzone6226@gmail.com" className="mobile-social-item mail">
              <Mail size={16} /> dzone6226@gmail.com
            </a>
            <a href="https://instagram.com/DZONE_COLLECTION" target="_blank" rel="noreferrer" className="mobile-social-item insta">
              <InstagramIcon size={16} /> @DZONE_COLLECTION
            </a>
          </div>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }
        .top-bar {
          background-color: var(--text-primary);
          color: #E6E0D4;
          font-size: 0.75rem;
          padding: 0.35rem 0;
          letter-spacing: 0.03em;
        }
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .top-location {
          font-weight: 500;
          color: #D6CFBE;
        }
        .top-social-contacts {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .top-dot {
          color: #666;
        }
        .main-nav-container {
          padding: 0.85rem 0;
          background-color: #FFFFFF;
        }
        .main-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
        }
        .header-brand-logo-img {
          height: 44px;
          width: auto;
          object-fit: contain;
          border-radius: var(--radius-sm);
        }
        .logo-emblem {
          width: 38px;
          height: 38px;
          background-color: var(--text-primary);
          color: var(--accent-gold);
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          border: 1px solid var(--accent-gold);
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .brand-sub {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: var(--accent-gold-dark);
          font-weight: 600;
        }
        .nav-and-icons-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .desktop-menu {
          display: none;
          align-items: center;
          gap: 1.5rem;
        }
        @media (min-width: 900px) {
          .desktop-menu {
            display: flex;
          }
        }
        .nav-link {
          font-size: 0.825rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          padding: 0.35rem 0;
          position: relative;
          transition: var(--transition-smooth);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--text-primary);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--accent-gold);
        }
        .inline-header-icons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-left: 0.75rem;
          border-left: 1px solid var(--border-color);
        }
        .header-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          transition: var(--transition-smooth);
          text-decoration: none;
        }
        .header-icon-btn.theme-toggle-btn:hover {
          background-color: var(--accent-gold-light);
          border-color: var(--accent-gold);
          transform: translateY(-2px) scale(1.05);
        }
        .sun-icon { color: #F59E0B; }
        .moon-icon { color: #8B5CF6; }
        .header-icon-btn.nav-wa:hover {
          background-color: #25D366;
          border-color: #25D366;
          color: #FFFFFF;
          transform: translateY(-2px);
        }
        .header-icon-btn.nav-mail:hover {
          background-color: var(--text-primary);
          border-color: var(--text-primary);
          color: var(--accent-gold);
          transform: translateY(-2px);
        }
        .header-icon-btn.nav-insta:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          border-color: #E1306C;
          color: #FFFFFF;
          transform: translateY(-2px);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mobile-hamburger {
          display: block;
          color: var(--text-primary);
          padding: 0.25rem;
        }
        @media (min-width: 900px) {
          .mobile-hamburger {
            display: none;
          }
        }
        .mobile-drawer {
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 1.25rem 1.5rem;
          box-shadow: var(--shadow-md);
        }
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1rem;
        }
        .mobile-nav-link {
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 0.5rem 0;
          color: var(--text-secondary);
          border-bottom: 1px dashed var(--border-light);
        }
        .mobile-nav-link.active {
          color: var(--accent-gold-dark);
          font-weight: 700;
        }
        .mobile-social-bar {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-light);
        }
        .mobile-social-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
        }
        .mobile-social-item.wa { color: #25D366; }
        .mobile-social-item.mail { color: var(--accent-gold-dark); }
        .mobile-social-item.insta { color: #E1306C; }
        @media (max-width: 650px) {
          .top-bar-content {
            flex-direction: column;
            gap: 0.3rem;
            text-align: center;
          }
          .inline-header-icons {
            border-left: none;
            padding-left: 0;
          }
        }
      `}</style>
    </header>
  );
}
