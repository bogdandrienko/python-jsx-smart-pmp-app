// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useMemo, useRef, useState } from "react";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as test from "../components/TestComponent";
import Counter from "../components/Counter.jsx";
import ClassCounter from "../components/ClassCounter.jsx";
import "../styles/App.css";
import PostItem from "../components/PostItem";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import PostForm from "../components/PostForm";
import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import { usePosts } from "../hooks/usePosts";
import axios from "axios";
import PostServise from "../API/PostServise";
import MyLoader from "../components/UI/loader/MyLoader";
import { useFetching } from "../hooks/useFetching";

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TestPage = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  // let number = 5; // изменяемая переменная
  // const number2 = 5; // не изменяемая переменная
  // javascript:document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 2.5;
  // alert(1)

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPost, isPostLoading, postError] = useFetching(async () => {
    const posts = await PostServise.getAll();
    setPosts(posts);
  });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <main>
        <div className="App">
          <MyButton style={{ marginTop: 30 }} onClick={() => fetchPost()}>
            get Posts
          </MyButton>
          <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
            create
          </MyButton>
          <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
          </MyModal>
          <hr style={{ margin: "15px 0" }} />
          <PostFilter filter={filter} setFilter={setFilter} />
          {postError && <h1>We have some error {postError}</h1>}
          {isPostLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <MyLoader />
            </div>
          ) : (
            <PostList
              remove={removePost}
              posts={sortedAndSearchedPosts}
              title={"Post list"}
            />
          )}
        </div>
        {/*<div className="container text-center w-25 m-0 p-0">*/}
        {/*  ClassCounter*/}
        {/*  <ClassCounter key={"ClassCounter"} />*/}
        {/*</div>*/}
        {/*<div className="container text-center w-25 m-0 p-0">*/}
        {/*  Counter*/}
        {/*  <Counter key={"Counter"} />*/}
        {/*</div>*/}
        {/*<div className="container text-center w-25 m-0 p-0">*/}
        {/*  TestComponent1*/}
        {/*  <test.TestComponent1 key={"TestComponent1"} />*/}
        {/*</div>*/}
        {/*<div className="container text-center w-25 m-0 p-0">*/}
        {/*  TestComponent2*/}
        {/*  <test.TestComponent2 key={"TestComponent2"} />*/}
        {/*</div>*/}
      </main>
    </div>
  );
};
