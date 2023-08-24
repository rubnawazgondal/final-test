import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const encryptionKey = "raheemDad";

export const getStorage = (key) => {
  const encryptedValue = Cookies.get(key);
  if (encryptedValue) {
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedValue,
      encryptionKey
    ).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedValue);
  }
  return null;
};

export const setStorage = (key, value) => {
  const encryptedValue = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    encryptionKey
  ).toString();
  console.log(encryptedValue);
  Cookies.set(key, encryptedValue);
};

export const removeStorage = (key) => {
  Cookies.remove(key);
};
