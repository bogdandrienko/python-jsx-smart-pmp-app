// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useRef, useState } from "react";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import { Button1 } from "../components/ui/button";
import { Loader1 } from "../components/ui/loader";
import { useFetching, useObserver, usePosts } from "../components/hook";
import { PostList, PostForm, PostFilter } from "../components/ui/component";
import { Base3 } from "../components/ui/base";
import { Modal1 } from "../components/ui/modal";
import { Select2 } from "../components/ui/select";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../components/action";
import * as component from "../components/ui/component";
import * as constant from "../components/constant";
import * as context from "../components/context";
import * as hook from "../components/hook";
import * as router from "../components/router";
import * as store from "../components/store";
import * as util from "../components/util";

import * as base from "../components/ui/base";
import * as captcha from "../components/ui/captcha";
import * as footer from "../components/ui/footer";
import * as modal from "../components/ui/modal";
import * as navbar from "../components/ui/navbar";
import * as paginator from "../components/ui/paginator";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const PostListUnlimitedScrollPage = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPost, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await action.Services.getAll(limit, page);
      const totalCount = response.data["x-total-count"];
      setPosts([...posts, ...response.data.response]);
      setTotalPages(util.getPageCount(totalCount, limit));
    }
  );

  const lastElement = useRef();

  const changePage = (page) => {
    setPage(page);
  };

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  useEffect(() => {
    fetchPost(limit, page);
  }, [page, limit]);

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1);
  });

  // const [comments, setComments] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);
  // const [limit, setLimit] = useState(100);
  // const [page, setPage] = useState(1);
  //
  // const [fetchFunction, isFetchLoading, fetchError] = hook.useFetchingCustom1(
  //   // @ts-ignore
  //   async ({ id: id, limit: limit, page: page }) => {
  //     const response = await action.IdeaComment.getAllComments({
  //       id: id,
  //       limit: limit,
  //       page: page,
  //     });
  //     setTotalPages(util.getPageCount(response["x-total-count"], limit));
  //     // @ts-ignore
  //     setComments([...comments, ...response.list]);
  //   }
  // );
  //
  // useEffect(() => {
  //   // @ts-ignore
  //   fetchFunction({ id: id, limit: limit, page: page });
  // }, [id, page]);
  //
  // useEffect(() => {
  //   // @ts-ignore
  //   setPage(1);
  //   setComments([]);
  //   setTotalPages(0);
  // }, [limit]);
  //
  // const observeTargetUseRef = useRef();
  //
  // hook.useObserverCustom1({
  //   observeTargetUseRef: observeTargetUseRef,
  //   canLoad: page < totalPages,
  //   // @ts-ignore
  //   isLoading: isFetchLoading,
  //   callbackIntersecting: () => {
  //     setPage(page + 1);
  //   },
  // });
  //
  // console.log("IdeaCommentReadListStore: ", IdeaCommentReadListStore);
  // console.log("comments: ", comments);
  // console.log("page: ", page);
  // console.log("limit: ", limit);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <Modal1 visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal1>
      <Button1 style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        create
      </Button1>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <Select2
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue={"limit elements"}
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "all" },
        ]}
      />
      {postError && <h1>We have some error {postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"Post list"}
      />
      {isPostLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader1 />
        </div>
      )}
      <div
        ref={lastElement}
        style={{
          height: 1,
          background: "black",
          margin: 0,
          padding: 0,
        }}
      />
    </base.Base1>
  );
};
