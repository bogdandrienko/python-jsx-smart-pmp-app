// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useRef, useState } from "react";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import { Button1 } from "../components/UI/buttons";
import Services from "../components/services";
import { Loader1 } from "../components/UI/loaders";
import { useFetching, useObserver, usePosts } from "../components/hooks";
import { getPageCount } from "../components/utils";
import { PostList, PostForm, PostFilter } from "../components/components";
import { Pagination1 } from "../components/UI/paginations";
import { BaseComponent1 } from "../components/UI/base";
import { Modal1 } from "../components/UI/modals";
import { Select1 } from "../components/UI/selects";

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const PostListPage = () => {
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
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
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

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <BaseComponent1>
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
      <div
        ref={lastElement}
        style={{
          height: 1,
          background: "black",
          margin: 0,
          padding: 0,
        }}
      />
      <Pagination1
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </BaseComponent1>
  );
};
