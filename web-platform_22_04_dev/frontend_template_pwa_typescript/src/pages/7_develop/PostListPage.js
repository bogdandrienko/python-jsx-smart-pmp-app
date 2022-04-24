// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import { BaseComponent3 } from "../../components/ui/base";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as constant from "../../components/constant";
import * as action from "../../components/action";

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////

export const PostListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [totalPages, setTotalPages] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);

  const PostReadListStore = useSelector((state) => state.PostReadListStore);
  const {
    load: loadPosts,
    data: dataPosts,
    error: errorPosts,
    fail: failPosts,
  } = PostReadListStore;

  const PostDeleteStore = useSelector((state) => state.PostDeleteStore);
  const {
    load: loadPostDeleteStore,
    data: dataPostDeleteStore,
    error: errorPostDeleteStore,
    fail: failPostDeleteStore,
  } = PostDeleteStore;

  useEffect(() => {
    dispatch(
      action.Post.PostReadListAction(constant.PostReadListStore, page, limit)
    );
  }, [page, limit]);

  useEffect(() => {
    if (!dataPosts) {
      dispatch(
        action.Post.PostReadListAction(constant.PostReadListStore, page, limit)
      );
    }
  }, [dataPosts]);

  useEffect(() => {
    if (dataPosts) {
      setTotalPages(Math.ceil(dataPosts["x-total-count"] / limit));
    }
  }, [dataPosts, limit]);

  useEffect(() => {
    if (totalPages) {
      let result = [];
      for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
      }
      setPagesArray(result);
    }
  }, [totalPages]);

  const changePage = (page) => {
    setPage(page);
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <BaseComponent1>
      {/* buttons group */}
      <div className="d-flex justify-content-center">
        <button
          onClick={() => dispatch({ type: constant.PostReadListStore.reset })}
          className="btn btn-lg btn-outline-primary m-1 p-2"
        >
          update
        </button>
        <button
          onClick={() => navigate("/posts/create")}
          className="btn btn-lg btn-outline-success m-1 p-2"
        >
          create
        </button>
      </div>
      <div>{dataPostDeleteStore && dataPostDeleteStore}</div>
      <div>
        {/* search field group */}
        <input
          className="custom_input_1"
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
          placeholder="Поиск..."
        />
        <div className="d-flex justify-content-center m-0 p-1">
          {/* sorting */}
          <select
            value={filter.sort}
            onChange={(event) =>
              setFilter({ ...filter, sort: event.target.value })
            }
          >
            <option disabled defaultValue value="">
              sort By
            </option>
            <option value="title">by Name</option>
            <option value="body">by Description</option>
          </select>

          {/* limit */}
          <select
            value={limit}
            onChange={(event) => setLimit(event.target.value)}
          >
            <option disabled defaultValue value="">
              limit elements
            </option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="-1">all</option>
          </select>
        </div>
      </div>
      {errorPosts && <h4>We have some error {errorPosts}</h4>}
      {failPosts && <h4>We have some fail {failPosts}</h4>}
      {loadPosts ? (
        <h4>Downloading...</h4>
      ) : (
        dataPosts && (
          <div>
            {dataPosts.data ? (
              <div>
                {/* list of post */}
                {dataPosts.data.map((post, index) => (
                  <div key={index}>
                    <div
                      className="post"
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      <div className="post__content">
                        <h5>{post.name}</h5>
                        <strong>{post.place}</strong>
                        <div>{post.body}</div>
                        <div>{post.sphere}</div>
                        <div className="post__btns">
                          <button className="btn btn-sm btn-outline-primary m-0 p-3">
                            open
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1>Post not found!</h1>
            )}
          </div>
        )
      )}
      <div className="page__wrapper">
        {pagesArray.map((p) => (
          <span
            onClick={() => changePage(p)}
            key={p}
            className={page === p ? "page page__current" : "page"}
          >
            {p}
          </span>
        ))}
      </div>
    </BaseComponent1>
  );
};
