// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import { Button1 } from "../components/ui/button";
import { Loader1 } from "../components/ui/loader";
import { useFetching, usePosts } from "../components/hook";
import { PostList, PostForm, PostFilter } from "../components/ui/component";
import { Pagination3 } from "../components/ui/paginator";
import { Base3 } from "../components/ui/base";
import { Modal1 } from "../components/ui/modal";
import { Select2 } from "../components/ui/select";

import * as util from "../components/util";
import * as action from "../components/action";

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////

export const PostListPaginationPage = () => {
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
      const response = await action.Services.getAll(limit, page);
      setPosts(response.data.response);
      const totalCount = response.data["x-total-count"];
      setTotalPages(util.getPageCount(totalCount, limit));
    }
  );

  const changePage = (page) => {
    setPage(page);
  };

  const createPost = async (newPost) => {
    await action.Services.createPost(newPost);
    setModal(false);
  };

  const removePost = async (post) => {
    await action.Services.removePost(post.id);
  };

  useEffect(() => {
    fetchPost(limit, page);
  }, [page, limit]);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

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
      <Pagination3
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </BaseComponent1>
  );
};
