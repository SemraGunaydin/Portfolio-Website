import { useRef } from "react";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore"; 


const Home = () => {
  const form = useRef();

  const savePortfolio = async (portfolio) => {
    try {
      await addDoc(collection(db, "portfolio"), portfolio);
      window.location.reload(false);
    } catch (error) {
      alert("Failed to add portfolio");
      console.error(error);
    }
  };

  const submitPortfolio = (e) => {
    e.preventDefault();

    const name = form.current[0]?.value;
    const description = form.current[1]?.value;
    const url = form.current[2]?.value;
    const image = form.current[3]?.files[0];

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const storageRef = ref(storage, `portfolio/${image.name}`); // ✅ use image.name

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadUrl) => {
        savePortfolio({
          name,
          description,
          url,
          image: downloadUrl,
        });
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        savePortfolio({
          name,
          description,
          url,
          image: null,
        });
      });
  };

  return (
    <div className="dashboard">
      <form ref={form} onSubmit={submitPortfolio}>
        <p>
          <input type="text" placeholder="Name" />
        </p>
        <p>
          <textarea placeholder="Description"></textarea>
        </p>
        <p>
          <input type="text" placeholder="Url" />
        </p>
        <p>
          <input type="file" placeholder="Image" />
        </p>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => auth.signOut()}>
          Sign out
        </button>
      </form>
    </div>
  );
};

export default Home;
