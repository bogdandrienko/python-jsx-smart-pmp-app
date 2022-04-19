import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as utils from "./utils";
import * as constants from "./constants";

export function Post() {
  const dispatch = useDispatch();
  const POST = useSelector((state) => state.POST);
  const {
    load: loadPosts,
    data: dataPosts,
    error: errorPosts,
    fail: failPosts,
  } = POST;

  useEffect(() => {
    console.log("posts: ", POST);
  }, [POST]);

  function getAll() {
    dispatch(utils.ActionConstructorUtility(constants.POST));
  }

  return (
    <div>
      <div>
        <button
          className="btn btn-lg btn-outline-success m-5 p-5"
          onClick={() => getAll()}
        >
          getAll
        </button>
      </div>
    </div>
  );
}
