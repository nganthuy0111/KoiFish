// utils/file.js
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadFile = async (file) => {
  const storageRef = ref(storage, file.name);
  // Lưu cái file lên Firebase
  const response = await uploadBytes(storageRef, file);
  // Lấy cái đường dẫn đến file vừa tạo
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;
