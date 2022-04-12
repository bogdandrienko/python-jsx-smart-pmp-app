import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate, useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostServise from "../API/PostServise";

const PostItem = (props) => {
  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id} {props.post.title}
        </strong>
        <div>{props.post.body}</div>
        <div className="post__btns">
          <MyButton onClick={() => navigate("/posts/" + props.post.id)}>
            open
          </MyButton>
          <MyButton onClick={() => props.remove(props.post)}>delete</MyButton>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
