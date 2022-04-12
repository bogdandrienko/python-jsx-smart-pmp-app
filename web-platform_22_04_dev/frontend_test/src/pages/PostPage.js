import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetching } from "../components/hooks";
import Services from "../components/services";
import { Loader1 } from "../components/UI/loaders";
import { BaseComponent1 } from "../components/UI/base";
import { Button1 } from "../components/UI/buttons";

const PostPage = () => {
  const navigate = useNavigate();
  const id = useParams().id;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchById, isLoading, error] = useFetching(async (id) => {
    const response = await Services.getById(id);
    setPost(response.data);
  });
  const [fetchCommentById, isCommentLoading, errorComment] = useFetching(
    async (id) => {
      const response = await Services.getCommentById(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchById(id);
    fetchCommentById(id);
  }, []);
  return (
    <BaseComponent1>
      <Button1 onClick={() => navigate("/posts")}> {"<="} back</Button1>
      <div className="post_detail">
        {isLoading ? (
          <Loader1 />
        ) : (
          <div className="post_detail_header">
            {post.id}. {post.title}
          </div>
        )}
        {isCommentLoading ? (
          <Loader1 />
        ) : (
          <div>
            {comments.map((comm) => (
              <div key={comm.id} className="post_detail_comment">
                <h6>{comm.email}</h6>
                <small>{comm.body}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseComponent1>
  );
};

export default PostPage;
