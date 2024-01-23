import { useState } from "react";
import { storage } from "../Firebase/credentials";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function Admin() {
  const [imageUpload, setImageUpload] = useState(null);

  function uploadImage() {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  }

  return (
    <div>
      Hola
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}
