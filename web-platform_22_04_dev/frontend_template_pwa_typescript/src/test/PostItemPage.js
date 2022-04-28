import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetching } from "../components/hook";
import { Loader1 } from "../components/ui/loader";
import { Base3 } from "../components/ui/base";
import { Button1 } from "../components/ui/button";

import * as action from "../components/action";

const PostItemPage = () => {
  const navigate = useNavigate();
  const id = useParams().id;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchById, isLoading, error] = useFetching(async (id) => {
    const response = await action.Services.getById(id);
    setPost(response.data.response);
  });
  const [fetchCommentById, isCommentLoading, errorComment] = useFetching(
    async (id) => {
      const response = await action.Services.getCommentById(id);
      setComments(response.data.response);
    }
  );

  useEffect(() => {
    fetchById(id);
    fetchCommentById(id);
  }, []);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <BaseComponent1>
      <Button1 onClick={() => navigate("/posts_pagination")}>
        {" <= "} back
      </Button1>
      <div className="post_detail">
        {isLoading ? (
          <Loader1 />
        ) : (
          <div className="post">
            <div className="post__content">
              <h5>{post.name}</h5>
              <strong>{post.place}</strong>
              <div>{post.body}</div>
              <div>{post.sphere}</div>
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

export default PostItemPage;
