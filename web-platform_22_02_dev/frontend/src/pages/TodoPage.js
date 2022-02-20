import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { USER_CHANGE_RESET_CONSTANT } from "../js/constants";
import { userChangeProfileAction, userLogoutAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
// import TodoFormComponent from "../components/TodoFormComponent";
import TodoListComponent from "../components/TodoListComponent";
import ReCAPTCHA from "react-google-recaptcha";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TodoPage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Todo page"}
        second={"page with actions with todos."}
        logic={true}
      />
      <main className="container text-center">
        {/*<TodoFormComponent />*/}
        <TodoListComponent />
      </main>
      <FooterComponent />
    </div>
  );
};

export default TodoPage;
