import { MMKV } from "react-native-mmkv";

export const mmkv_storage = new MMKV();

export const mmkv = {
  setItem: (key: string, value: any) => {
    if (typeof value === "object") {
      mmkv_storage.set(key, JSON.stringify(value)); 
    } else {
      mmkv_storage.set(key, value);
    }
  },

  getItem: (key: string) => {
    const value = mmkv_storage.getString(key);
    try {
      return value ? JSON.parse(value) : null; // Parse JSON if possible
    } catch {
      return value; 
    }
  },

  removeItem: (key: string) => {
    mmkv_storage.delete(key);
  },

  clearAll: () => {
    mmkv_storage.clearAll();
  },
};
