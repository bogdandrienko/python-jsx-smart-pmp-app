import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostServise from "../API/PostServise";
import MyLoader from "../components/UI/loader/MyLoader";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import Navbar from "../components/UI/navbar/navbar";
import AuthContext from "../context";

const PostPage = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };
  return (
    <div>
      <Navbar />
      <h1>Login to account</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Login" />
        <MyInput type="password" placeholder="Password" />
        <MyButton>enter</MyButton>
      </form>
    </div>
  );
};

export default PostPage;
