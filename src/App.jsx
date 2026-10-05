import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MainCategories from './components/MainCategories';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import ProductDetailPage from './components/ProductDetailPage';
import BuyNowModal from './components/BuyNowModal';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';
import WhatsappPopupModal from './components/WhatsappPopupModal';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import SplashLoader from './components/SplashLoader';
import { INITIAL_PRODUCTS, INITIAL_HOMEPAGE_MEDIA, INITIAL_REVIEWS, INITIAL_ORDERS } from './data/initialProducts';
import { 
  fetchFullCloudData, 
  syncProductsToCloud, 
  syncMediaToCloud, 
  syncReviewsToCloud, 
  syncOrdersToCloud 
} from './services/cloudSyncService';

const STORAGE_PRODUCTS = 'dzone_products_v2';
const STORAGE_MEDIA = 'dzone_homepage_media_v1';
const STORAGE_REVIEWS = 'dzone_reviews_v1';
const STORAGE_AUTH = 'dzone_admin_auth_v1';
const STORAGE_ORDERS = 'dzone_orders_v1';
const STORAGE_ADMIN_SESSION = 'dzone_admin_logged_in_v1';
const STORAGE_THEME = 'dzone_theme_mode';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // 0. Dark / Light Mode Theme State
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (err) {}
    return 'light';
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (e) {}
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 1. Products State
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {}
    return INITIAL_PRODUCTS;
  });

  // 2. Homepage Media Banners State
  const [homepageMedia, setHomepageMedia] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MEDIA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...INITIAL_HOMEPAGE_MEDIA, ...parsed };
      }
    } catch (err) {}
    return INITIAL_HOMEPAGE_MEDIA;
  });

  // 3. Customer Reviews State
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REVIEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {}
    return INITIAL_REVIEWS;
  });

  // 4. Admin Auth State (Default: dzone / dzone123)
  const [adminAuth, setAdminAuth] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTH);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.username && parsed.password) return parsed;
      }
    } catch (err) {}
    return { username: 'dzone', password: 'dzone123' };
  });

  // 5. Orders & Customer Leads State
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {}
    return INITIAL_ORDERS;
  });

  const [activeTab, setActiveTab] = useState('HOME');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [selectedBuyNowProduct, setSelectedBuyNowProduct] = useState(null);

  // Popups & Admin Route States
  const [showWhatsappPopup, setShowWhatsappPopup] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  
  // Persistent Admin Session (Stays logged in per device)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_ADMIN_SESSION) === 'true';
    } catch (err) {
      return false;
    }
  });

  // 6. Automatic Live Cross-Device Cloud Sync on App Mount
  useEffect(() => {
    let isMounted = true;
    const syncFromCloud = async () => {
      try {
        const cloudData = await fetchFullCloudData();
        if (!isMounted || !cloudData) return;

        if (Array.isArray(cloudData.products) && cloudData.products.length > 0) {
          setProducts(cloudData.products);
          localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(cloudData.products));
        }
        if (cloudData.media && typeof cloudData.media === 'object') {
          setHomepageMedia(cloudData.media);
          localStorage.setItem(STORAGE_MEDIA, JSON.stringify(cloudData.media));
        }
        if (Array.isArray(cloudData.reviews) && cloudData.reviews.length > 0) {
          setReviews(cloudData.reviews);
          localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(cloudData.reviews));
        }
        if (Array.isArray(cloudData.orders)) {
          setOrders(cloudData.orders);
          localStorage.setItem(STORAGE_ORDERS, JSON.stringify(cloudData.orders));
        }
      } catch (err) {
        console.warn('Initial cloud sync error:', err);
      }
    };

    syncFromCloud();
    return () => { isMounted = false; };
  }, []);

  // Sync states to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_MEDIA, JSON.stringify(homepageMedia));
    } catch (e) {}
  }, [homepageMedia]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(reviews));
    } catch (e) {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_AUTH, JSON.stringify(adminAuth));
    } catch (e) {}
  }, [adminAuth]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ORDERS, JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ADMIN_SESSION, isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {}
  }, [isAdminLoggedIn]);

  // Real-time Storage Listener across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_ORDERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setOrders(parsed);
        } catch (err) {}
      }
      if (e.key === STORAGE_PRODUCTS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setProducts(parsed);
        } catch (err) {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check URL Hash for #admin link
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation handlers
  const handleSelectCategory = (categoryKey) => {
    setSelectedProductDetail(null);
    setSelectedCategory(categoryKey);
    setActiveTab(categoryKey);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    setSelectedProductDetail(null);
    setSelectedCategory('ALL');
    setActiveTab('WATCHES');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Product & Data Mutations with Instant Cross-Device Cloud Sync
  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: `p-${Date.now()}` };
    setProducts((prev) => {
      const updated = [productWithId, ...prev];
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const handleUpdateProduct = (id, updatedFields) => {
    setProducts((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const handleToggleStock = (id) => {
    setProducts((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item));
      syncProductsToCloud(updated);
      return updated;
    });
  };

  const handleUpdateHomepageMedia = (updatedMedia) => {
    setHomepageMedia((prev) => {
      const updated = { ...prev, ...updatedMedia };
      syncMediaToCloud(updated);
      return updated;
    });
  };

  const handleAddReview = (newReview) => {
    setReviews((prev) => {
      const updated = [newReview, ...prev];
      syncReviewsToCloud(updated);
      return updated;
    });
  };

  const handleDeleteReview = (id) => {
    setReviews((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      syncReviewsToCloud(updated);
      return updated;
    });
  };

  const handleUpdateAdminAuth = (newAuth) => {
    setAdminAuth(newAuth);
  };

  const handlePlaceOrder = (newOrder) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem(STORAGE_ORDERS, JSON.stringify(updated));
      } catch (e) {}
      syncOrdersToCloud(updated);
      return updated;
    });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
      try {
        localStorage.setItem(STORAGE_ORDERS, JSON.stringify(updated));
      } catch (e) {}
      syncOrdersToCloud(updated);
      return updated;
    });
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prev) => {
      const updated = prev.filter((ord) => ord.id !== orderId);
      try {
        localStorage.setItem(STORAGE_ORDERS, JSON.stringify(updated));
      } catch (e) {}
      syncOrdersToCloud(updated);
      return updated;
    });
  };

  const handleResetDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setHomepageMedia(INITIAL_HOMEPAGE_MEDIA);
    setReviews(INITIAL_REVIEWS);
    setOrders(INITIAL_ORDERS);
    syncProductsToCloud(INITIAL_PRODUCTS);
    syncMediaToCloud(INITIAL_HOMEPAGE_MEDIA);
    syncReviewsToCloud(INITIAL_REVIEWS);
    syncOrdersToCloud(INITIAL_ORDERS);
  };

  const handleImportProducts = (importedList) => {
    setProducts(importedList);
    syncProductsToCloud(importedList);
  };

  // IF ADMIN ROUTE (#admin)
  if (isAdminRoute) {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          adminAuth={adminAuth}
          onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            try {
              localStorage.setItem(STORAGE_ADMIN_SESSION, 'true');
            } catch (e) {}
          }}
          onClose={() => {
            setIsAdminRoute(false);
            window.location.hash = '';
          }}
        />
      );
    }

    return (
      <AdminPage
        products={products}
        homepageMedia={homepageMedia}
        reviews={reviews}
        orders={orders}
        adminAuth={adminAuth}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onToggleStock={handleToggleStock}
        onUpdateHomepageMedia={handleUpdateHomepageMedia}
        onDeleteReview={handleDeleteReview}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onUpdateAdminAuth={handleUpdateAdminAuth}
        onResetDefaults={handleResetDefaults}
        onImportProducts={handleImportProducts}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          try {
            localStorage.setItem(STORAGE_ADMIN_SESSION, 'false');
          } catch (e) {}
          setIsAdminRoute(false);
          window.location.hash = '';
        }}
      />
    );
  }

  // PUBLIC CUSTOMER WEBSITE VIEW
  return (
    <div className="app-root bg-cream">
      {/* Website Opening Splash Animation */}
      {showSplash && (
        <SplashLoader onComplete={() => setShowSplash(false)} />
      )}

      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setSelectedProductDetail(null);
          setActiveTab(tab);
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Full-Page Dedicated Product Details View OR Main Homepage */}
      {selectedProductDetail ? (
        <ProductDetailPage
          product={selectedProductDetail}
          onBack={() => setSelectedProductDetail(null)}
          onBuyNow={(product) => setSelectedBuyNowProduct(product)}
          onSelectProduct={(product) => setSelectedProductDetail(product)}
          allProducts={products}
        />
      ) : (
        /* Main Content */
        <main>
          {/* Hero Section */}
          <Hero
            onExploreClick={handleExploreClick}
            onOpenWhatsappPopup={() => setShowWhatsappPopup(true)}
            homepageMedia={homepageMedia}
          />

          {/* 4 Main Categories Showcase */}
          <MainCategories
            onSelectCategory={handleSelectCategory}
            homepageMedia={homepageMedia}
          />

          {/* Product Catalogue & Filtering */}
          <ProductCatalog
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={(cat) => {
              setSelectedCategory(cat);
              if (cat !== 'ALL') setActiveTab(cat);
            }}
            onProductClick={(product) => setSelectedProductDetail(product)}
            onBuyNow={(product) => setSelectedBuyNowProduct(product)}
          />

          {/* Customer Reviews & Feedback Section */}
          <ReviewsSection
            reviews={reviews}
            onAddReview={handleAddReview}
          />

          {/* About Brand */}
          <AboutSection />

          {/* Store Contact & Map Directions */}
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsapp />

      {/* WhatsApp Enquiry Popup Modal */}
      {showWhatsappPopup && (
        <WhatsappPopupModal
          onClose={() => setShowWhatsappPopup(false)}
        />
      )}

      {/* Product Details Modal Fallback */}
      {selectedProductModal && (
        <ProductModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
          onBuyNow={(product) => setSelectedBuyNowProduct(product)}
        />
      )}

      {/* Buy Now Direct Checkout Modal */}
      {selectedBuyNowProduct && (
        <BuyNowModal
          product={selectedBuyNowProduct}
          onClose={() => setSelectedBuyNowProduct(null)}
          onSubmitOrder={handlePlaceOrder}
        />
      )}
    </div>
  );
}
