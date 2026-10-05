import React from 'react';
import { X, MessageCircle, CheckCircle2, XCircle, ShoppingBag } from 'lucide-react';

export default function ProductModal({ product, onClose, onBuyNow }) {
  if (!product) return null;

  const whatsappMessage = `Hello DZONE COLLECTION, I am interested in ${product.name}. Please share details and availability.`;
  const whatsappUrl = `https://wa.me/919624165548?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="product-modal-grid">
          <div className="modal-image-col">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-info-col">
            <div className="modal-meta-row">
              <span className="badge badge-gold">{product.category}</span>
              {product.subcategory && (
                <span className="modal-subcat-badge">{product.subcategory}</span>
              )}
            </div>

            <h2 className="modal-product-title">{product.name}</h2>

            <div className="modal-price-row">
              <span className="modal-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
              <span className={`badge ${product.inStock ? 'badge-in-stock' : 'badge-out-stock'}`}>
                {product.inStock ? (
                  <><CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4 }} /> Available in Store</>
                ) : (
                  <><XCircle size={12} style={{ display: 'inline', marginRight: 4 }} /> Currently Out of Stock</>
                )}
              </span>
            </div>

            <div className="modal-divider"></div>

            <div className="modal-description-box">
              <span className="modal-section-label">DESCRIPTION</span>
              <p className="modal-description-text">{product.shortDescription}</p>
            </div>

            <div className="modal-store-info">
              <span className="store-note">📍 Store Address: G-23, Royal Arcade, Sarthana Jakatnaka, Surat</span>
            </div>

            <div className="modal-actions-row">
              <button
                onClick={() => {
                  onClose();
                  onBuyNow(product);
                }}
                className="btn btn-primary modal-buy-btn"
              >
                <ShoppingBag size={18} /> BUY NOW
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp modal-wa-btn"
              >
                <MessageCircle size={18} /> ENQUIRE ON WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .product-modal-card {
          background-color: #FFFFFF;
          border-radius: var(--radius-md);
          width: 100%;
          max-width: 820px;
          overflow: hidden;
          position: relative;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          animation: slideUp 0.25s ease-out;
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          background-color: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: var(--transition-smooth);
        }
        .modal-close-btn:hover {
          background-color: var(--text-primary);
          color: #FFFFFF;
        }

        .product-modal-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 650px) {
          .product-modal-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .modal-image-col {
          background-color: #F8F6F0;
          height: 320px;
        }
        @media (min-width: 650px) {
          .modal-image-col {
            height: 100%;
            min-height: 420px;
          }
        }
        .modal-image-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-info-col {
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
        }

        .modal-meta-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .modal-subcat-badge {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .modal-product-title {
          font-size: 1.85rem;
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .modal-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .modal-price {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent-gold-dark);
        }

        .modal-divider {
          height: 1px;
          background-color: var(--border-light);
          margin: 0.75rem 0 1.25rem;
        }

        .modal-description-box {
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .modal-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent-gold-dark);
          display: block;
          margin-bottom: 0.35rem;
        }
        .modal-description-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .modal-store-info {
          background-color: var(--bg-main);
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-light);
        }
        .store-note {
          font-size: 0.775rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .modal-actions-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        @media (max-width: 500px) {
          .modal-actions-row {
            grid-template-columns: 1fr;
          }
        }
        .modal-buy-btn, .modal-wa-btn {
          padding: 0.85rem 0.5rem;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
