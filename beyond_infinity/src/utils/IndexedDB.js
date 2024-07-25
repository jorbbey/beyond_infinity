import { openDB } from "idb";
import CryptoJS from "crypto-js";

const DB_NAME = "userDataDB";
const STORE_NAME = "users";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; 

const openDatabase = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("email", "email", { unique: true });
      }
    },
  });
};

// Encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const saveUserData = async (userData) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    userData.password,
    SECRET_KEY
  ).toString();
  const encryptedUserData = {
    ...userData,
    password: encryptedPassword,
  };
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add(encryptedUserData);
  await tx.done;
  console.log("User data saved:", encryptedUserData);
};

 const getUserDataByEmail = async (email) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("email");
  const userData = await index.get(email);
  await tx.done;
  return userData ? decryptData(userData) : null; // Decrypt password before returning
};

 const getAllUserData = async () => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const userData = await store.getAll();
  await tx.done;
  return userData.map((encryptedUserData) => decryptData(encryptedUserData)); // Decrypt passwords before returning
};

// Check if email already exists
const checkEmailExists = async (email) => {
  const db = await openDatabase();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("email");
  const userData = await index.get(email);
  await tx.done;
  return userData !== undefined;
};

export { saveUserData, getAllUserData, getUserDataByEmail, checkEmailExists };