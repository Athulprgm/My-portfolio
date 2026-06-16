/**
 * useCvs — localStorage-backed CV profile store.
 *
 * Since the backend has no /cvs endpoint, all CV data is persisted in
 * localStorage under the key 'portfolio_cvs'. Each CV entry looks like:
 * {
 *   id:         number,
 *   title:      string,
 *   file_path:  string,  // base64 data-URL, external https link, or /public path
 *   sort_order: number,
 *   created_at: string (ISO date),
 * }
 */

const LS_KEY = 'portfolio_cvs';

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

export function getCvs() {
  return readAll().sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function createCv({ title, file_path, sort_order = 0 }) {
  const list = readAll();
  const cv = {
    id: nextId(list),
    title,
    file_path,
    sort_order,
    created_at: new Date().toISOString().slice(0, 10),
  };
  list.push(cv);
  writeAll(list);
  return cv;
}

export function updateCv(id, { title, file_path, sort_order }) {
  const list = readAll();
  const idx  = list.findIndex(c => c.id === id);
  if (idx === -1) throw new Error(`CV #${id} not found`);
  if (title      !== undefined) list[idx].title      = title;
  if (file_path  !== undefined) list[idx].file_path  = file_path;
  if (sort_order !== undefined) list[idx].sort_order = sort_order;
  writeAll(list);
  return list[idx];
}

export function deleteCvById(id) {
  const list = readAll().filter(c => c.id !== id);
  writeAll(list);
}
