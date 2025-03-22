"use client";

import api from "@/utils/axiosInstance";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const LikePost = ({ slug, _likes, _dislikes, _liked, _disliked }: { slug: string; _likes: number; _dislikes: number; _liked: boolean; _disliked: boolean }) => {
  const likePost = async () => {
    const res = (await api.post(`/posts/${slug}/like`)).data;
    setLiked(res.liked);
    setLikes((prev) => (res.liked ? prev + 1 : prev - 1));
  };

  const dislikePost = async () => {
    const res = (await api.post(`/posts/${slug}/dislike`)).data;
    setDisliked(res.disliked);
    setDislikes((prev) => (res.disliked ? prev + 1 : prev - 1));
  };

  const [likes, setLikes] = useState<number>(_likes);
  const [dislikes, setDislikes] = useState<number>(_dislikes);
  const [liked, setLiked] = useState<boolean>(_liked);
  const [disliked, setDisliked] = useState<boolean>(_disliked);

  return (
    <>
      <button className="flex items-center gap-x-1" onClick={likePost}>
        <FontAwesomeIcon icon={faThumbsUp} size="lg" className={`${liked ? "text-[--light-blue]" : "text-[--light-gray]"}`} /> {likes}
      </button>
      <button className="flex items-center gap-x-1" onClick={dislikePost}>
        <FontAwesomeIcon icon={faThumbsDown} size="lg" className={`${disliked ? "text-[--light-red]" : "text-[--light-gray]"}`} /> {dislikes}
      </button>
    </>
  );
};

export default LikePost;
