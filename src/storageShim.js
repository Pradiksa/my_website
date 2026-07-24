// Portfolio.jsx was originally built for Claude's artifact preview, which
// provides a built-in `window.storage` key-value API. That API doesn't
// exist in a normal browser, so this shim re-implements the same
// get/set/delete/list methods on top of localStorage. Data is saved per
// browser/device (not per "account"), which is fine for a personal site.
const storage = {
  async get(key) {
    const raw = window.localStorage.getItem(key);
    if (raw === null) throw new Error(`Key not found: ${key}`);
    return { key, value: raw };
  },
  async set(key, value) {
    window.localStorage.setItem(key, value);
    return { key, value };
  },
  async delete(key) {
    window.localStorage.removeItem(key);
    return { key, deleted: true };
  },
  async list(prefix = "") {
    const keys = Object.keys(window.localStorage).filter((k) => k.startsWith(prefix));
    return { keys, prefix };
  },
};

if (typeof window !== "undefined" && !window.storage) {
  window.storage = storage;
}
