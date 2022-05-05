import { useState, useEffect } from "react";
import "../../App.css";
import AxiosPosts from "../../Routes/postRoutes";

const CustomButton = ({ post }) => {
  const [buttonClass, setButtonClass] = useState("likeButton");
  const [buttonClass2, setButtonClass2] = useState("dislikeButton");

  useEffect(() => {
    if (post.likeStatus === false) {
      setButtonClass("likeButton");
      setButtonClass2("dislikeButtonActive");
    } else if (post.likeStatus === true) {
      setButtonClass("likeButtonActive");
      setButtonClass2("dislikeButton");
    } else {
      setButtonClass("likeButton");
      setButtonClass2("dislikeButton");
    }
  }, []);

  function handleClick(event) {
    let likedPost = {
      likeStatus: true,
    };
    let dislikedPost = {
      likeStatus: false,
    };

    async function setToLike(postId, obj) {
      await AxiosPosts.updateAPost(postId, obj);
      return obj;
    }
    async function setToDislike(postId, obj) {
      await AxiosPosts.updateAPost(postId, obj);
      return obj;
    }
    if (event.target.id === "like") {
      if (buttonClass === "likeButton") {
        setButtonClass("likeButtonActive");
        setToLike(post._id, likedPost);
        console.log(likedPost);
        console.log(post);
        setButtonClass2("dislikeButton");
      } else {
        setButtonClass("likeButton");
      }
    } else if (event.target.id === "dislike") {
      if (buttonClass2 === "dislikeButton") {
        setButtonClass2("dislikeButtonActive");
        setToDislike(post._id, dislikedPost);
        setButtonClass("likeButton");
      } else {
        setButtonClass2("dislikeButton");
      }
    }
  }
  return (
    <div>
      <button className={buttonClass} onClick={handleClick}>
        <i id="like" className="fa fa-thumbs-up"></i>
      </button>
      <button className={buttonClass2} onClick={handleClick}>
        <i id="dislike" className="fa fa-thumbs-down"></i>
      </button>
    </div>
  );
};

export default CustomButton;
