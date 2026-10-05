import React, { useState } from 'react';
import { MessageCircle, Eye, Search, Filter, AlertCircle, ShoppingBag } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/initialProducts';

export default function ProductCatalog({
  products,
  selectedCategory,
  setSelectedCategory,
  onProductClick,
  onBuyNow
}) {
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey);
    setSelectedSubcategory('All');
  };

  // Category list tabs
  const categoryKeys = ['ALL', 'WATCHES', 'BELTS', 'JEWELLERY', 'PERFUMES'];

  // Subcategories available for active category
  const currentCategoryConfig = CATEGORIES_CONFIG[selectedCategory];
  const subcategoryList = selectedCategory === 'ALL'
    ? ['All']
    : currentCategoryConfig?.subcategories || ['All'];

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesSubcategory =
      selectedSubcategory === 'All' ||
      p.subcategory === selectedSubcategory ||
      p.type === selectedSubcategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.shortDescription && p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSubcategory && matchesSearch;
  });

  const generateWhatsappUrl = (productName) => {
    const text = `Hello DZONE COLLECTION, I am interested in ${productName}. Please share details and availability.`;
    return `https://wa.me/919624165548?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catalog-section" className="catalog-section">
      <div className="container">
        <div className="catalog-header">
          <span className="section-subtitle">OUR CATALOGUE</span>
          <h2 className="section-title">EXPLORE COLLECTION</h2>
          <p className="catalog-sub-desc">
            Browse timeless watches, genuine leather belts, crafted jewellery, and luxury fragrances.
          </p>
        </div>

        {/* Search & Main Category Nav Tabs */}
        <div className="catalog-controls">
          <div className="category-tabs">
            {categoryKeys.map((catKey) => (
              <button
                key={catKey}
                onClick={() => handleCategoryChange(catKey)}
                className={`cat-tab ${selectedCategory === catKey ? 'active' : ''}`}
              >
                {catKey}
              </button>
            ))}
          </div>

          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search watches, belts, perfumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        </div>

        {/* Subcategory Pills & Price Range Banner */}
        {selectedCategory !== 'ALL' && currentCategoryConfig && (
          <div className="subcategory-bar">
            <div className="subcat-pills">
              <span className="subcat-label"><Filter size={14} /> Filter:</span>
              {subcategoryList.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`subcat-chip ${selectedSubcategory === sub ? 'active' : ''}`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="price-range-badge">
              Price Range: <strong>{currentCategoryConfig.priceRange}</strong>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <AlertCircle size={40} className="no-products-icon" />
            <h3>No products found</h3>
            <p>Try adjusting your search query or switching categories.</p>
            <button
              className="btn btn-outline"
              onClick={() => { setSelectedCategory('ALL'); setSelectedSubcategory('All'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const waUrl = generateWhatsappUrl(product.name);
              return (
                <div key={product.id} className="product-card">
                  <div
                    className="product-image-container"
                    onClick={() => onProductClick(product)}
                  >
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="product-image-overlay">
                      <span className="quick-view-btn">
                        <Eye size={16} /> Quick View
                      </span>
                    </div>

                    <div className="badge-position">
                      <span className={`badge ${product.inStock ? 'badge-in-stock' : 'badge-out-stock'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <div className="product-details">
                    <div className="product-tags">
                      <span className="badge badge-gold">{product.category}</span>
                      {product.subcategory && (
                        <span className="subcat-tag">{product.subcategory}</span>
                      )}
                    </div>

                    <h3
                      className="product-name"
                      onClick={() => onProductClick(product)}
                    >
                      {product.name}
                    </h3>

                    <p className="product-desc">{product.shortDescription}</p>

                    <div className="product-price-row">
                      <div className="product-price">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="product-action-buttons-row">
                      <button
                        className="btn btn-primary buy-now-btn"
                        onClick={() => onBuyNow(product)}
                      >
                        <ShoppingBag size={14} /> BUY NOW
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp product-wa-btn"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .catalog-section {
          padding: 4rem 0;
          background-color: var(--bg-main);
        }
        .catalog-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .catalog-sub-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0.5rem auto 0;
        }
        .catalog-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: center;
          justify-content: space-between;
        }
        @media (min-width: 768px) {
          .catalog-controls {
            flex-direction: row;
          }
        }
        .category-tabs {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          width: 100%;
          padding-bottom: 0.25rem;
        }
        @media (min-width: 768px) {
          .category-tabs {
            width: auto;
          }
        }
        .cat-tab {
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          background-color: var(--bg-surface);
          border: 1px solid var(--border-color);
          white-space: nowrap;
          transition: var(--transition-smooth);
        }
        .cat-tab:hover {
          color: var(--text-primary);
          border-color: var(--accent-gold);
        }
        .cat-tab.active {
          background-color: var(--text-primary);
          color: #FFFFFF;
          border-color: var(--text-primary);
        }
        .search-box {
          position: relative;
          width: 100%;
          max-width: 320px;
        }
        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .search-box input {
          width: 100%;
          padding: 0.65rem 2rem 0.65rem 2.4rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: #FFFFFF;
          font-size: 0.85rem;
          color: var(--text-primary);
          outline: none;
          transition: var(--transition-smooth);
        }
        .search-box input:focus {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 3px var(--accent-gold-light);
        }
        .clear-search {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.25rem;
          color: var(--text-muted);
        }
        .subcategory-bar {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 0.85rem 1.25rem;
          background-color: #FFFFFF;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .subcategory-bar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .subcat-pills {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .subcat-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          text-transform: uppercase;
        }
        .subcat-chip {
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }
        .subcat-chip:hover {
          border-color: var(--accent-gold);
          color: var(--text-primary);
        }
        .subcat-chip.active {
          background-color: var(--accent-gold-light);
          border-color: var(--accent-gold);
          color: var(--accent-gold-dark);
          font-weight: 700;
        }
        .price-range-badge {
          font-size: 0.785rem;
          color: var(--text-secondary);
          background: var(--bg-main);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          align-self: flex-start;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 550px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 900px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1150px) {
          .products-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .product-card {
          background-color: #FFFFFF;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-gold);
        }
        .product-image-container {
          position: relative;
          height: 230px;
          overflow: hidden;
          cursor: pointer;
          background-color: #F8F6F0;
        }
        .product-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .product-card:hover .product-image-container img {
          transform: scale(1.05);
        }
        .product-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(28, 28, 28, 0.25);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.25s ease;
        }
        .product-card:hover .product-image-overlay {
          opacity: 1;
        }
        .quick-view-btn {
          background-color: #FFFFFF;
          color: var(--text-primary);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: var(--shadow-md);
        }
        .badge-position {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
        }
        .product-details {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .product-tags {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.4rem;
        }
        .subcat-tag {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .product-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
          line-height: 1.3;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .product-name:hover {
          color: var(--accent-gold-dark);
        }
        .product-desc {
          font-size: 0.825rem;
          color: var(--text-secondary);
          margin-bottom: 0.85rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex-grow: 1;
        }
        .product-price-row {
          margin-bottom: 0.85rem;
        }
        .product-price {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .product-action-buttons-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-light);
        }
        .buy-now-btn {
          flex-grow: 1;
          padding: 0.55rem;
          font-size: 0.75rem;
          border-radius: var(--radius-sm);
        }
        .product-wa-btn {
          padding: 0.55rem 0.75rem;
          font-size: 0.75rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .no-products {
          text-align: center;
          padding: 4rem 1rem;
          background: #FFFFFF;
          border-radius: var(--radius-md);
          border: 1px dashed var(--border-color);
        }
        .no-products-icon {
          color: var(--accent-gold);
          margin-bottom: 0.75rem;
        }
        .no-products h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .no-products p {
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
      `}</style>
    </section>
  );
}
