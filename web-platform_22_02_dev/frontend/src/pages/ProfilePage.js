import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../actions/userActions";

import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let groups = "";
  if (userInfo != null) {
    for (let i = 0; i < userInfo.groups.length; i++) {
      groups += userInfo.groups[i] + ", ";
    }
    groups = groups.slice(0, -2);
  }

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  // console.log(user);

  let last_login = "";
  if (user !== null) {
    try{
      last_login = `${user["last_login"].split("T")[0]} ${user["last_login"].split("T")[1].slice(0, -13)}`;
    }catch(error){
    }
  }

  useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Личная страница"}
        second={"страница Вашего личного профиля."}
      />
      <main className="container text-center">
        <div className="m-1">
          <h6 className="lead fw-bold bold">Основная информация</h6>
          <table className="table table-striped table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small">
            <thead>
              <tr>
                <th className="text-center">Вид</th>
                <th className="text-center">Значение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start">Идентификатор</td>
                <td className="text-end">{user.id ? user.id : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Имя пользователя</td>
                <td className="text-end">{user.username ? user.username : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Пароль</td>
                <td className="text-end">{user["password"] ? user["password"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Последний логин</td>
                <td className="text-end">{last_login ? last_login : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Права</td>
                <td className="text-end">{user["user_permissions"] ? user["user_permissions"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Группы</td>
                <td className="text-end">{user["groups"] ? user["groups"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Почта</td>
                <td className="text-end">{user.email ? user.email : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Имя</td>
                <td className="text-end">{user["first_name"] ? user["first_name"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Фамилия</td>
                <td className="text-end">{user["last_name"] ? user["last_name"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Активность аккаунта</td>
                <td className="text-end">{user["is_active"] ? "+" : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Модератор</td>
                <td className="text-end">{user["is_staff"] ? "+" : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Суперпользователь</td>
                <td className="text-end">{user["is_superuser"] ? "+" : "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ProfilePage;
