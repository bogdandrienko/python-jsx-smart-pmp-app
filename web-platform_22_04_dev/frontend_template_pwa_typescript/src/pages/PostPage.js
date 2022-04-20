import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseComponent1 } from "../components/jsx/ui/base";
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../components/constants";
import * as actions from "../components/actions";

export const PostPage = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const PostGetOneStore = useSelector((state) => state.PostGetOneStore);
  const {
    load: loadPostGetOneStore,
    data: dataPostGetOneStore,
    error: errorPostGetOneStore,
    fail: failPostGetOneStore,
  } = PostGetOneStore;

  useEffect(() => {
    dispatch(actions.GetPostAction(constants.PostGetOneStore, id));
  }, [id]);

  const deletePost = async (event) => {
    event.stopPropagation();
    navigate("/posts");
    await actions.Services.removePost(id);
    dispatch({ type: constants.PostGetListStore.reset });
  };

  return (
    <BaseComponent1>
      <button onClick={() => navigate("/posts")} className="custom_button_1">
        {" <= "} back
      </button>
      {errorPostGetOneStore && (
        <h4>We have some error {errorPostGetOneStore}</h4>
      )}
      {failPostGetOneStore && <h4>We have some fail {failPostGetOneStore}</h4>}
      <div className="post_detail">
        {loadPostGetOneStore ? (
          <div>Loading...</div>
        ) : (
          dataPostGetOneStore && (
            <div className="post">
              <div className="post__content">
                <h5>{dataPostGetOneStore.name}</h5>
                <strong>{dataPostGetOneStore.place}</strong>
                <div>{dataPostGetOneStore.body}</div>
                <div>{dataPostGetOneStore.sphere}</div>
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
    </BaseComponent1>
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
