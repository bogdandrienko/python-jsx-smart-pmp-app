// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useRef, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import { Button1 } from "../components/ui/buttons";
import { Services } from "../components/services";
import { Loader1 } from "../components/ui/loaders";
import { useFetching, useObserver, usePosts } from "../components/hooks";
import { getPageCount } from "../components/utils";
import { PostList, PostForm, PostFilter } from "../components/ui/components";
import { Pagination1 } from "../components/ui/paginations";
import { BaseComponent1 } from "../components/ui/base";
import { Modal1 } from "../components/ui/modals";
import { Select1 } from "../components/ui/selects";
import { Post } from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../components/utils";
import * as constants from "../components/constants";

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////

export const PostListPaginationPage = () => {
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [fetchPost, isPostLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await Services.getAll(limit, page);
      setPosts(response.data.response);
      const totalCount = response.data["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  const POST = useSelector((state) => state.POST);
  const {
    load: loadPosts,
    data: dataPosts,
    error: errorPosts,
    fail: failPosts,
  } = POST;

  useEffect(() => {
    if (dataPosts) {
      setPosts(dataPosts.response);
      const totalCount = dataPosts["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    } else {
      dispatch(utils.ActionConstructorUtility(constants.POST));
    }
  }, [dataPosts]);

  function getAll() {
    dispatch(utils.ActionConstructorUtility(constants.POST));
  }

  const changePage = (page) => {
    setPage(page);
  };

  const createPost = async (newPost) => {
    await Services.createPost(newPost);
    setModal(false);
  };

  const removePost = async (post) => {
    await Services.removePost(post.id);
  };

  useEffect(() => {
    fetchPost(limit, page);
  }, [page, limit]);

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <BaseComponent1>
      <Post />
      <Modal1 visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal1>
      <Button1 style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        create
      </Button1>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <Select1
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
      <Pagination1
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </BaseComponent1>
  );
};
