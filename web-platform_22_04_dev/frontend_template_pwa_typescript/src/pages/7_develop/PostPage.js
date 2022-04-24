import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseComponent3 } from "../../components/ui/base";
import { useDispatch, useSelector } from "react-redux";
import * as constant from "../../components/constant";
import * as action from "../../components/action";
import AuthContext from "../../components/context";

export const PostPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const PostReadStore = useSelector((state) => state.PostReadStore);
  const {
    load: loadPostReadStore,
    data: dataPostReadStore,
    error: errorPostReadStore,
    fail: failPostReadStore,
  } = PostReadStore;

  useEffect(() => {
    dispatch(action.Post.PostReadAction(constant.PostReadStore, id));
  }, [id]);

  const deletePost = async (event) => {
    event.stopPropagation();
    dispatch(action.Post.PostDeleteAction(constant.PostDeleteStore, id));
    navigate("/posts");
    dispatch({ type: constant.PostReadListStore.reset });
  };

  return (
    <BaseComponent3>
      <button onClick={() => navigate("/posts")} className="custom_button_1">
        {" <= "} back
      </button>
      {errorPostReadStore && <h4>We have some error {errorPostReadStore}</h4>}
      {failPostReadStore && <h4>We have some fail {failPostReadStore}</h4>}
      <div className="post_detail">
        {loadPostReadStore ? (
          <div>Loading...</div>
        ) : (
          dataPostReadStore && (
            <div className="post">
              <div className="post__content">
                <h5>{dataPostReadStore.name}</h5>
                <strong>{dataPostReadStore.place}</strong>
                <div>{dataPostReadStore.body}</div>
                <div>{dataPostReadStore.sphere}</div>
              </div>
              <div>
                <button onClick={(event) => setVisible(true)}>delete</button>
              </div>
            </div>
          )
        )}
      </div>
      <PostDelete
        visible={visible}
        setVisible={setVisible}
        action={deletePost}
      />
    </BaseComponent3>
  );
};

export const PostDelete = ({ visible, setVisible, action }) => {
  const rootClasses = ["custom_modal_1"];
  if (visible) {
    rootClasses.push("custom_modal_1_active");
  }
  return (
    <div>
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
        <div
          className={"custom_modal_content_1"}
          onClick={(e) => e.stopPropagation()}
        >
          <h5>Delete post?</h5>
          <button
            onClick={(event) => action(event)}
            className="custom_button_1"
          >
            delete
          </button>
          <button
            onClick={(event) => setVisible(false)}
            className="custom_button_1"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
