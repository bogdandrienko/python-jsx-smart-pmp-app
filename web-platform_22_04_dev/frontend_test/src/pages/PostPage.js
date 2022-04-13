import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetching } from "../components/hooks";
import { Services } from "../components/services";
import { Loader1 } from "../components/ui/loaders";
import { BaseComponent1 } from "../components/ui/base";
import { Button1 } from "../components/ui/buttons";

const PostPage = () => {
  const navigate = useNavigate();
  const id = useParams().id;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchById, isLoading, error] = useFetching(async (id) => {
    const response = await Services.getById(id);
    console.log(response.data);
    setPost(response.data.response);
  });
  const [fetchCommentById, isCommentLoading, errorComment] = useFetching(
    async (id) => {
      const response = await Services.getCommentById(id);
      setComments(response.data.response);
    }
  );

  useEffect(() => {
    fetchById(id);
    fetchCommentById(id);
  }, []);
  return (
    <BaseComponent1>
      <Button1 onClick={() => navigate("/posts_pagination")}>
        {" "}
        {"<="} back
      </Button1>
      <div className="post_detail">
        {isLoading ? (
          <Loader1 />
        ) : (
          <div className="post">
            <div className="post__content">
              <strong>
                {post.id} {post.request_method_slug_field}{" "}
                {post.request_path_slug_field} {post.username_slug_field}
              </strong>
              <div>{post.error_text_field}</div>
            </div>
          </div>
        )}
        {isCommentLoading ? (
          <Loader1 />
        ) : (
          <div>
            {comments.map((comm) => (
              <div key={comm.id} className="post_detail_comment">
                <h6>
                  {comm.id} {comm.title}
                </h6>
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
