// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useMemo, useRef, useState } from "react";
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

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TestPage = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  // let number = 5; // изменяемая переменная
  // const number2 = 5; // не изменяемая переменная
  // javascript:document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 2.5;
  // alert(1)

  const [posts, setPosts] = useState([
    { id: 1, title: "Javascript 1", body: "Description" },
    { id: 2, title: "Javascript 2", body: "Description" },
    { id: 3, title: "Javascript 3", body: "Description" },
    { id: 4, title: "Javascript 4", body: "Description" },
    { id: 5, title: "Javascript 5", body: "Description" },
  ]);
  const [filter, setFilter] = useState({ sort: "", query: "" });

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <main>
        <div className="App">
          <PostForm create={createPost} />
          <hr style={{ margin: "15px 0" }} />
          <PostFilter filter={filter} setFilter={setFilter} />
          {sortedAndSearchedPosts.length !== 0 ? (
            <PostList
              remove={removePost}
              posts={sortedAndSearchedPosts}
              title={"Post list"}
            />
          ) : (
            <h1 style={{ textAlign: "center" }}>Post not found!</h1>
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
