import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  getDocs 
} from '../firebase/config';

// Dedicated Global Cloud Storage ID for DZONE COLLECTION SURAT
const CLOUD_STORE_ID = 'ff808181a09d98f701a10aefb6a67af4';
const CLOUD_STORE_URL = `https://api.restful-api.dev/objects/${CLOUD_STORE_ID}`;

const DB_COLLECTION_PRODUCTS = 'dzone_products';
const DB_COLLECTION_MEDIA = 'dzone_media';
const DB_COLLECTION_REVIEWS = 'dzone_reviews';
const DB_COLLECTION_ORDERS = 'dzone_orders';

// In-memory cache for full payload sync
let currentCloudCache = {
  products: null,
  media: null,
  reviews: null,
  orders: null
};

/**
 * Fetch full data container from Cloud Storage
 */
export const fetchFullCloudData = async () => {
  try {
    // 1. Try Firebase Firestore first if initialized
    if (db) {
      try {
        const productsSnap = await getDocs(collection(db, DB_COLLECTION_PRODUCTS));
        const fbProducts = [];
        productsSnap.forEach((docSnap) => fbProducts.push({ id: docSnap.id, ...docSnap.data() }));

        const mediaSnap = await getDocs(collection(db, DB_COLLECTION_MEDIA));
        let fbMedia = null;
        mediaSnap.forEach((d) => { if (d.id === 'main_banner') fbMedia = d.data(); });

        if (fbProducts.length > 0 || fbMedia) {
          return {
            products: fbProducts.length > 0 ? fbProducts : null,
            media: fbMedia,
            reviews: null,
            orders: null
          };
        }
      } catch (fbErr) {
        console.warn('Firebase sync read fallback:', fbErr);
      }
    }

    // 2. Fetch from Public Cloud REST Store
    const res = await fetch(CLOUD_STORE_URL);
    if (res.ok) {
      const result = await res.json();
      if (result && result.data && typeof result.data === 'object') {
        currentCloudCache = { ...currentCloudCache, ...result.data };
        return result.data;
      }
    }
  } catch (err) {
    console.warn('Cloud sync fetch error:', err);
  }
  return null;
};

/**
 * Save full data container to Cloud Storage
 */
const pushContainerToCloud = async (newData) => {
  try {
    currentCloudCache = { ...currentCloudCache, ...newData };
    
    // Save to Public Cloud Store
    await fetch(CLOUD_STORE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'DZONE_COLLECTION_SURAT_CLOUD_STORE',
        data: currentCloudCache
      })
    });
  } catch (err) {
    console.warn('Push to cloud error:', err);
  }
};

// ----------------------------------------------------
// 1. PRODUCTS CLOUD SYNC
// ----------------------------------------------------
export const syncProductsToCloud = async (products) => {
  try {
    localStorage.setItem('dzone_products_v2', JSON.stringify(products));

    if (db) {
      try {
        const productsCol = collection(db, DB_COLLECTION_PRODUCTS);
        for (const prod of products) {
          if (prod && prod.id) {
            await setDoc(doc(productsCol, String(prod.id)), prod, { merge: true });
          }
        }
      } catch (e) {}
    }

    await pushContainerToCloud({ products });
    window.dispatchEvent(new CustomEvent('dzone_cloud_update', { detail: { type: 'products', data: products } }));
  } catch (err) {
    console.warn('Cloud product sync warning:', err);
  }
};

export const fetchCloudProducts = async () => {
  const data = await fetchFullCloudData();
  return data?.products || null;
};

// ----------------------------------------------------
// 2. HOMEPAGE MEDIA BANNERS CLOUD SYNC
// ----------------------------------------------------
export const syncMediaToCloud = async (media) => {
  try {
    localStorage.setItem('dzone_homepage_media_v1', JSON.stringify(media));

    if (db) {
      try {
        await setDoc(doc(db, DB_COLLECTION_MEDIA, 'main_banner'), media, { merge: true });
      } catch (e) {}
    }

    await pushContainerToCloud({ media });
    window.dispatchEvent(new CustomEvent('dzone_cloud_update', { detail: { type: 'media', data: media } }));
  } catch (err) {
    console.warn('Cloud media sync warning:', err);
  }
};

export const fetchCloudMedia = async () => {
  const data = await fetchFullCloudData();
  return data?.media || null;
};

// ----------------------------------------------------
// 3. REVIEWS CLOUD SYNC
// ----------------------------------------------------
export const syncReviewsToCloud = async (reviews) => {
  try {
    localStorage.setItem('dzone_reviews_v1', JSON.stringify(reviews));

    if (db) {
      try {
        const reviewsCol = collection(db, DB_COLLECTION_REVIEWS);
        for (const rev of reviews) {
          if (rev && rev.id) {
            await setDoc(doc(reviewsCol, String(rev.id)), rev, { merge: true });
          }
        }
      } catch (e) {}
    }

    await pushContainerToCloud({ reviews });
    window.dispatchEvent(new CustomEvent('dzone_cloud_update', { detail: { type: 'reviews', data: reviews } }));
  } catch (err) {
    console.warn('Cloud reviews sync warning:', err);
  }
};

// ----------------------------------------------------
// 4. ORDERS CLOUD SYNC
// ----------------------------------------------------
export const syncOrdersToCloud = async (orders) => {
  try {
    localStorage.setItem('dzone_orders_v1', JSON.stringify(orders));

    if (db) {
      try {
        const ordersCol = collection(db, DB_COLLECTION_ORDERS);
        for (const ord of orders) {
          if (ord && ord.id) {
            await setDoc(doc(ordersCol, String(ord.id)), ord, { merge: true });
          }
        }
      } catch (e) {}
    }

    await pushContainerToCloud({ orders });
    window.dispatchEvent(new CustomEvent('dzone_cloud_update', { detail: { type: 'orders', data: orders } }));
  } catch (err) {
    console.warn('Cloud orders sync warning:', err);
  }
};

