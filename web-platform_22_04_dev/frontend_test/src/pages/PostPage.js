import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostServise from "../API/PostServise";
import MyLoader from "../components/UI/loader/MyLoader";
import Navbar from "../components/UI/navbar/navbar";

const PostPage = () => {
  const id = useParams().id;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchById, isLoading, error] = useFetching(async (id) => {
    const response = await PostServise.getById(id);
    setPost(response.data);
  });
  const [fetchCommentById, isCommentLoading, errorComment] = useFetching(
    async (id) => {
      const response = await PostServise.getCommentById(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchById(id);
    fetchCommentById(id);
  }, []);
  return (
    <div>
      <Navbar />
      {isLoading ? (
        <MyLoader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      {isCommentLoading ? (
        <MyLoader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
          {post.id}. {post.title}
        </div>
      )}
    </div>
  );
};

export default PostPage;
