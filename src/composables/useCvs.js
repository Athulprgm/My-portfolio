/**
 * useCvs — localStorage-backed CV profile store (with IndexedDB for file blobs).
 *
 * Since the backend has no /cvs endpoint, all CV data is persisted in
 * localStorage under the key 'portfolio_cvs' (metadata) and IndexedDB (binary blobs).
 * Each CV entry in localStorage looks like:
 * {
 *   id:         number,
 *   title:      string,
 *   file_path:  string,  // external https link, /public path, or empty if local
 *   is_local:   boolean, // true if stored in IndexedDB
 *   sort_order: number,
 *   created_at: string (ISO date),
 * }
 */

const LS_KEY = 'portfolio_cvs';
const DB_NAME = 'portfolio_cvs_db';
const DB_VERSION = 1;
const STORE_NAME = 'cv_files';

function initDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

async function getBlob(id) {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function setBlob(id, blob) {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(blob, id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function deleteBlob(id) {
  const db = await initDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

const activeBlobUrls = new Map();

function getBlobUrlForId(id, blob) {
  if (activeBlobUrls.has(id)) {
    URL.revokeObjectURL(activeBlobUrls.get(id));
  }
  const url = URL.createObjectURL(blob);
  activeBlobUrls.set(id, url);
  return url;
}

function revokeBlobUrlForId(id) {
  if (activeBlobUrls.has(id)) {
    URL.revokeObjectURL(activeBlobUrls.get(id));
    activeBlobUrls.delete(id);
  }
}

function readAll() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function nextId(list) {
  return list.length === 0 ? 1 : Math.max(...list.map(c => c.id)) + 1;
}

export async function getCvs() {
  const list = readAll();
  const sorted = list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  for (const cv of sorted) {
    if (cv.is_local) {
      try {
        const blob = await getBlob(cv.id);
        if (blob) {
          cv.file_path = getBlobUrlForId(cv.id, blob);
        } else {
          cv.file_path = '';
        }
      } catch (err) {
        console.error(`Failed to load blob for CV #${cv.id}:`, err);
        cv.file_path = '';
      }
    }
  }
  return sorted;
}

export async function createCv({ title, file_path, file_blob, sort_order = 0 }) {
  const list = readAll();
  const id = nextId(list);
  const is_local = !!file_blob;

  if (is_local) {
    await setBlob(id, file_blob);
  }

  const cv = {
    id,
    title,
    file_path: is_local ? '' : file_path,
    is_local,
    sort_order,
    created_at: new Date().toISOString().slice(0, 10),
  };
  list.push(cv);
  writeAll(list);
  return cv;
}

export async function updateCv(id, { title, file_path, file_blob, sort_order }) {
  const list = readAll();
  const idx  = list.findIndex(c => c.id === id);
  if (idx === -1) throw new Error(`CV #${id} not found`);

  const cv = list[idx];

  if (title      !== undefined) cv.title      = title;
  if (sort_order !== undefined) cv.sort_order = sort_order;

  if (file_blob) {
    await setBlob(id, file_blob);
    cv.is_local = true;
    cv.file_path = '';
  } else if (file_path !== undefined && file_path !== '') {
    if (cv.is_local) {
      await deleteBlob(id);
      revokeBlobUrlForId(id);
    }
    cv.is_local = false;
    cv.file_path = file_path;
  }

  writeAll(list);
  return cv;
}

export async function deleteCvById(id) {
  const list = readAll();
  const idx = list.findIndex(c => c.id === id);
  if (idx !== -1) {
    const cv = list[idx];
    if (cv.is_local) {
      await deleteBlob(id);
      revokeBlobUrlForId(id);
    }
    const filtered = list.filter(c => c.id !== id);
    writeAll(filtered);
  }
}
