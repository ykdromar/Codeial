import { useState } from "react";
import styles from "../styles/home.module.css";
import { addPost } from "../api";
import { useToasts } from "react-toast-notifications";
const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const handelAddPost = async () => {
    setAddingPost(true);
    const response = await addPost(post);

    if (response.success) {
      setPost("");
      addToast("Posted successfully", {
        appearance: "success",
      });
      setAddingPost(false);
      return;
    } else {
      addToast(response.message, {
        appearance: "error",
      });
      setAddingPost(false);
      return;
    }
  };
  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
        }}
        required
      ></textarea>
      <div>
        <button
          className={styles.addPostBtn}
          onClick={handelAddPost}
          disabled={addingPost}
        >
          {addingPost ? "Adding Post" : "Add Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
