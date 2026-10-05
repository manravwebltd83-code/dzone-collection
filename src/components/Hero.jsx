import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Hero({ onExploreClick, onOpenWhatsappPopup, homepageMedia }) {
  const instagramUrl = "https://instagram.com/DZONE_COLLECTION";

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <div className="hero-badge">SURAT'S FINEST SELECTION</div>
          <h1 className="hero-heading">
            TIMELESS STYLE.<br />
            <span className="hero-heading-sub">ELEVATED EVERY DAY.</span>
          </h1>

          <p className="hero-small-text">
            Watches • Belts • Jewellery • Perfumes
          </p>

          <div className="hero-actions">
            <button onClick={onExploreClick} className="btn btn-primary hero-btn">
              EXPLORE COLLECTION <ArrowRight size={16} />
            </button>

            <button onClick={onOpenWhatsappPopup} className="btn btn-whatsapp hero-btn">
              <MessageCircle size={18} /> WHATSAPP ENQUIRY
            </button>
          </div>

          {/* Instagram Profile Quick Badge */}
          <div className="hero-insta-badge-wrap">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="hero-insta-badge">
              <span className="insta-icon-circle">
                <InstagramIcon size={16} />
              </span>
              <span>Follow us on Instagram <strong>@DZONE_COLLECTION</strong></span>
            </a>
          </div>
        </div>

        <div className="hero-visual animate-fade-in-up delay-200">
          <div className="hero-card-grid">
            <div className="hero-image-card card-1">
              <img
                src={homepageMedia?.heroImage1 || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop"}
                alt="Luxury Watch"
              />
              <span className="hero-tag">Watches</span>
            </div>
            <div className="hero-image-card card-2">
              <img
                src={homepageMedia?.heroImage2 || "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop"}
                alt="Luxury Fragrance"
              />
              <span className="hero-tag">Perfumes</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background-color: var(--bg-main);
          padding: 3.5rem 0 4rem;
          border-bottom: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        @media (min-width: 850px) {
          .hero-container {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        .hero-badge {
          display: inline-block;
          font-size: 0.725rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-gold-dark);
          background-color: var(--accent-gold-light);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-color);
        }
        .hero-heading {
          font-size: 2.5rem;
          line-height: 1.15;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-weight: 700;
        }
        @media (min-width: 600px) {
          .hero-heading {
            font-size: 3.5rem;
          }
        }
        .hero-heading-sub {
          color: var(--accent-gold);
          font-weight: 500;
        }
        .hero-small-text {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          letter-spacing: 0.05em;
          font-weight: 500;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .hero-btn {
          min-width: 170px;
        }
        .hero-insta-badge-wrap {
          margin-top: 0.5rem;
        }
        .hero-insta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.4rem 0.85rem;
          background-color: #FFFFFF;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          font-size: 0.8rem;
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
        }
        .hero-insta-badge:hover {
          border-color: #E1306C;
          color: #E1306C;
          transform: translateY(-2px);
        }
        .insta-icon-circle {
          width: 26px;
          height: 26px;
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          color: #FFFFFF;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-visual {
          position: relative;
        }
        .hero-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .hero-image-card {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
          aspect-ratio: 4/5;
          background: #FFF;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .hero-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .hero-image-card:hover {
          box-shadow: var(--shadow-lg);
        }
        .hero-image-card:hover img {
          transform: scale(1.08);
        }
        .hero-tag {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(28, 28, 28, 0.85);
          color: #FFF;
          backdrop-filter: blur(4px);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .card-1 {
          animation: floatGentle 5s ease-in-out infinite;
        }
        .card-2 {
          transform: translateY(1.25rem);
          animation: floatGentle 5s ease-in-out infinite 2.5s;
        }
      `}</style>
    </section>
  );
}
