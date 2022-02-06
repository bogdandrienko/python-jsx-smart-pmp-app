import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction, userListAction } from "../actions/userActions";

import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import { useLocation, useNavigate } from "react-router-dom";

const UsersListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);

  const usersList = useSelector((state) => state.usersList);
  const {
    usersListLoadingReducer,
    usersListDataReducer,
    usersListErrorReducer,
  } = usersList;
  // console.log("usersListLoadingReducer: ", usersListLoadingReducer);
  // console.log("usersListDataReducer: ", usersListDataReducer);
  // console.log("usersListErrorReducer: ", usersListErrorReducer);

  useEffect(() => {
    dispatch(userListAction());
  }, [dispatch]);

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Все пользователи"}
        second={"страница со списком всех пользователей системы."}
      />
      <main className="container text-center">
        <div className="m-1">
          <table className="table table-striped table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small">
            <thead>
              <tr>
                <th className="text-center">Идентификатор</th>
                <th className="text-center">Имя пользователя</th>
                <th className="text-center">Пароль</th>
                <th className="text-center">Последний вход</th>
                <th className="text-center">Почта</th>
              </tr>
            </thead>
            <tbody>
              {usersListLoadingReducer === true
                ? "идёт загрузка"
                : usersListErrorReducer !== undefined
                ? `ошибка: ${usersListErrorReducer}`
                : !usersListDataReducer
                ? ""
                : usersListDataReducer.map((user, index) => (
                    <tr key={index}>
                      <td className="text-center">{user.id}</td>
                      <td className="text-center">{user.username}</td>
                      <td className="text-center">
                        {user["user_model"]["password_slug_field"]}
                      </td>
                      <td className="text-center">{user.last_login}</td>
                      <td className="text-center">
                        {user["user_model"]["email_field"]}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default UsersListPage;
