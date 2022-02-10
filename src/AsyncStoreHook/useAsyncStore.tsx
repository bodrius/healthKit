import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = () => {
  const setStorage = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      throw e;
    }
  };

  const getStorageItem = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
    }
  };
  const removeStorageItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      throw e;
    }
  };
  const allStorageKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (e) {
      throw e;
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      throw e;
    }
  };

  return {
    setStorage,
    getStorageItem,
    removeStorageItem,
    allStorageKeys,
    clearStorage,
  };
};
