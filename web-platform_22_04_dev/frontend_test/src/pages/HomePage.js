import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostServise from "../API/PostServise";
import MyLoader from "../components/UI/loader/MyLoader";
import Navbar from "../components/UI/navbar/navbar";
import Footer from "../components/UI/navbar/footer";

const PostPage = () => {
  return (
    <div className="custom_main_1">
      <Navbar />
      <div className="custom_main_2">
        <h1>Home page</h1>
      </div>
      <Footer />
    </div>
  );
};

export default PostPage;
