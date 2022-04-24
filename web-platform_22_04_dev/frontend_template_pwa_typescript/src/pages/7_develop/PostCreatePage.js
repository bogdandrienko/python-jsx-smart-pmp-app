import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseComponent3 } from "../../components/ui/base";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../components/action";
import * as constant from "../../components/constant";

export const PostCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    name: "",
    place: "",
    sphere: "",
  });

  const PostCreateStore = useSelector((state) => state.PostCreateStore);
  const {
    load: loadPostCreateStore,
    data: dataPostCreateStore,
    error: errorPostCreateStore,
    fail: failPostCreateStore,
  } = PostCreateStore;

  const createPost = async (event) => {
    event.preventDefault();
    dispatch(action.Post.PostCreateAction(constant.PostCreateStore, post));
    setPost({
      name: "",
      place: "",
      sphere: "",
    });
  };

  useEffect(() => {
    dispatch({ type: constant.PostCreateStore.reset });
  }, []);

  return (
    <BaseComponent1>
      <button onClick={() => navigate("/posts")} className="custom_button_1">
        {" <= "} back
      </button>
      {errorPostCreateStore && (
        <h4>We have some error {errorPostCreateStore}</h4>
      )}
      {failPostCreateStore && <h4>We have some fail {failPostCreateStore}</h4>}
      <div className="post_detail">
        {loadPostCreateStore ? (
          <div>Loading...</div>
        ) : (
          !dataPostCreateStore && (
            <form onSubmit={createPost}>
              <h5>Create post</h5>
              <input
                value={post.name}
                onChange={(e) => setPost({ ...post, name: e.target.value })}
                className="custom_input_1"
                type="text"
                placeholder="Title..."
              />
              <input
                value={post.place}
                onChange={(e) => setPost({ ...post, place: e.target.value })}
                className="custom_input_1"
                type="text"
                placeholder="Body..."
              />
              <input
                value={post.sphere}
                onChange={(e) => setPost({ ...post, sphere: e.target.value })}
                className="custom_input_1"
                type="text"
                placeholder="Body..."
              />
              <button type="submit" className="custom_button_1">
                create
              </button>
            </form>
          )
        )}
      </div>
    </BaseComponent1>
  );
};
