import React, { useEffect } from 'react';
import { ArrowLeft, ShoppingBag, MessageCircle, CheckCircle2, XCircle, MapPin, ShieldCheck, Truck, RefreshCw, Star, Sparkles, ChevronRight } from 'lucide-react';

export default function ProductDetailPage({ product, onBack, onBuyNow, onSelectProduct, allProducts = [] }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  if (!product) return null;

  const whatsappMessage = `Hello DZONE COLLECTION Surat, I am interested in ${product.name} (Price: ₹${Number(product.price).toLocaleString('en-IN')}). Please share availability and dispatch details!`;
  const whatsappUrl = `https://wa.me/919624165548?text=${encodeURIComponent(whatsappMessage)}`;

  // Find related products in the same category
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail-page-root animate-fade-in-up">
      {/* Top Navigation Bar */}
      <div className="detail-top-bar">
        <div className="container detail-bar-flex">
          <button onClick={onBack} className="btn-back-catalogue">
            <ArrowLeft size={18} /> BACK TO CATALOGUE
          </button>

          <div className="detail-breadcrumbs">
            <span>HOME</span>
            <span className="crumb-sep">/</span>
            <span>{product.category}</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container detail-main-container">
        {/* Main 2-Column Showcase */}
        <div className="product-showcase-grid">
          {/* Left Column: Large Image & Badges */}
          <div className="showcase-image-col">
            <div className="main-image-card">
              <span className="badge badge-gold category-float-badge">{product.category}</span>
              {product.subcategory && (
                <span className="subcategory-float-badge">{product.subcategory}</span>
              )}
              <img src={product.image} alt={product.name} className="product-main-img" />
            </div>

            <div className="guarantee-pills-row">
              <div className="guarantee-pill">
                <ShieldCheck size={16} className="pill-icon" /> 100% Genuine Quality
              </div>
              <div className="guarantee-pill">
                <Truck size={16} className="pill-icon" /> Express Prepaid Dispatch
              </div>
              <div className="guarantee-pill">
                <RefreshCw size={16} className="pill-icon" /> Store Exchange Warranty
              </div>
            </div>
          </div>

          {/* Right Column: Title, Specs & Buy Actions */}
          <div className="showcase-info-col">
            <div className="info-meta-tags">
              <span className="badge badge-gold">{product.category}</span>
              {product.subcategory && (
                <span className="meta-subcat-chip">{product.subcategory}</span>
              )}
            </div>

            <h1 className="detail-product-title">{product.name}</h1>

            <div className="detail-price-row">
              <div className="detail-price">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </div>
              <div className={`stock-status-badge ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                {product.inStock ? (
                  <><CheckCircle2 size={14} /> Available at Surat Store</>
                ) : (
                  <><XCircle size={14} /> Out of Stock</>
                )}
              </div>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-desc-box">
              <h3 className="desc-heading">Product Overview</h3>
              <p className="desc-text">{product.shortDescription}</p>
            </div>

            {/* Key Features & Specifications Table */}
            <div className="specs-card">
              <h4 className="specs-heading">Item Specifications</h4>
              <div className="specs-table">
                <div className="spec-row">
                  <span className="spec-label">Category:</span>
                  <span className="spec-val"><strong>{product.category}</strong></span>
                </div>
                {product.subcategory && (
                  <div className="spec-row">
                    <span className="spec-label">Subcategory / Type:</span>
                    <span className="spec-val">{product.subcategory}</span>
                  </div>
                )}
                <div className="spec-row">
                  <span className="spec-label">Store Location:</span>
                  <span className="spec-val">Royal Arcade, Sarthana Jakatnaka, Surat</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Delivery Mode:</span>
                  <span className="spec-val" style={{ color: '#03543F', fontWeight: 700 }}>
                    ⚡ Prepaid Online UPI Scanner (BharatPe)
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="detail-actions-box">
              <button
                onClick={() => onBuyNow(product)}
                className="btn btn-primary detail-buy-now-btn"
              >
                <ShoppingBag size={18} /> BUY NOW - DIRECT CHECKOUT
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp detail-wa-btn"
              >
                <MessageCircle size={18} /> ENQUIRE ON WHATSAPP
              </a>
            </div>

            <div className="store-address-notice">
              <MapPin size={16} className="pin-icon" />
              <span>
                <strong>DZONE COLLECTION Surat</strong> • G-23, Royal Arcade, Nr. Dairy Onn, Opp. Deepkamal Mall, Sarthana Jakatnaka, Surat (Tel: +91 96241 65548)
              </span>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <div className="related-header">
              <span className="section-subtitle">RECOMMENDED FOR YOU</span>
              <h3 className="related-title">MORE FROM {product.category}</h3>
              <div className="gold-divider"></div>
            </div>

            <div className="related-grid">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="related-product-card"
                  onClick={() => onSelectProduct(rel)}
                >
                  <img src={rel.image} alt={rel.name} />
                  <div className="related-card-body">
                    <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{rel.category}</span>
                    <h4 className="related-name">{rel.name}</h4>
                    <div className="related-price">₹{Number(rel.price).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .product-detail-page-root {
          min-height: 100vh;
          background-color: var(--bg-main);
          padding-bottom: 5rem;
        }

        .detail-top-bar {
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }

        .detail-bar-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .btn-back-catalogue {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--text-primary);
          color: #FFFFFF;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-sm);
          transition: var(--transition-smooth);
        }
        .btn-back-catalogue:hover {
          background-color: var(--accent-gold);
          color: var(--text-primary);
        }

        .detail-breadcrumbs {
          font-size: 0.775rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 600;
        }
        .crumb-sep { color: var(--text-muted); }
        .crumb-active { color: var(--accent-gold-dark); font-weight: 700; }

        .detail-main-container {
          margin-top: 2.5rem;
        }

        .product-showcase-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 2rem;
          box-shadow: var(--shadow-md);
        }
        @media (min-width: 900px) {
          .product-showcase-grid {
            grid-template-columns: 1.1fr 1.25fr;
            padding: 3rem;
          }
        }

        /* Left Image Showcase */
        .showcase-image-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .main-image-card {
          position: relative;
          background-color: #FFFFFF;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-float-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
        }
        .subcategory-float-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 2;
          background: rgba(28, 28, 28, 0.85);
          color: #FFFFFF;
          font-size: 0.725rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          backdrop-filter: blur(4px);
        }

        .product-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .main-image-card:hover .product-main-img {
          transform: scale(1.05);
        }

        .guarantee-pills-row {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .guarantee-pill {
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          padding: 0.65rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .pill-icon {
          color: var(--accent-gold-dark);
        }

        /* Right Info Column */
        .showcase-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .info-meta-tags {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .meta-subcat-chip {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          background-color: var(--bg-main);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .detail-product-title {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .detail-product-title {
            font-size: 2.6rem;
          }
        }

        .detail-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .detail-price {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--accent-gold-dark);
        }

        .stock-status-badge {
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .stock-status-badge.in-stock {
          background-color: #DEF7EC;
          color: #03543F;
        }
        .stock-status-badge.out-stock {
          background-color: #FDE8E8;
          color: #9B1C1C;
        }

        .detail-divider {
          height: 1px;
          background-color: var(--border-color);
        }

        .detail-desc-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .desc-heading {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }
        .desc-text {
          font-size: 1rem;
          color: var(--text-primary);
          line-height: 1.6;
        }

        /* Specifications Card */
        .specs-card {
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
        }
        .specs-heading {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          padding-bottom: 0.35rem;
          border-bottom: 1px solid var(--border-color);
        }
        .specs-table {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }
        .spec-label {
          color: var(--text-secondary);
          width: 40%;
        }
        .spec-val {
          color: var(--text-primary);
          width: 60%;
          text-align: right;
        }

        /* Action Buttons Box */
        .detail-actions-box {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-top: 0.5rem;
        }
        @media (min-width: 600px) {
          .detail-actions-box {
            flex-direction: row;
          }
        }

        .detail-buy-now-btn {
          flex-grow: 1;
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
        }
        .detail-wa-btn {
          flex-grow: 1;
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
        }

        .store-address-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .pin-icon {
          color: var(--accent-gold-dark);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Related Products */
        .related-products-section {
          margin-top: 4rem;
        }
        .related-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .related-title {
          font-family: var(--font-heading);
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.25rem;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .related-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .related-product-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .related-product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-gold);
        }
        .related-product-card img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }
        .related-card-body {
          padding: 0.85rem;
        }
        .related-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0.35rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .related-price {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--accent-gold-dark);
        }
      `}</style>
    </div>
  );
}
