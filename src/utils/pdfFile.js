import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Function to upload a PDF file to Firebase Storage
const uploadPdfFile = async (file) => {
  const storage = getStorage();

  // Step 1: Validate the file type (PDF only)
  const isPdf = file.type === "application/pdf";
  if (!isPdf) {
    throw new Error("You can only upload PDF files!");
  }

  // Step 2: Check file size (limit to 10MB as an example)
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    throw new Error("PDF file size must be smaller than 10MB!");
  }

  // Step 3: Create a reference to Firebase Storage
  const storageRef = ref(storage, `pdfs/${file.name}`);

  try {
    // Step 4: Upload the file
    const uploadResult = await uploadBytes(storageRef, file);

    // Step 5: Get the download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    console.log("File uploaded successfully. URL:", downloadURL);

    // Step 6: Return the download URL
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadPdfFile;
