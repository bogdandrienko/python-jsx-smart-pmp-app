import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { userListAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const UsersListPage = () => {
  const dispatch = useDispatch();
  const [usersList, setUsersList] = useState([]);

  const userListStore = useSelector((state) => state.userListStore);
  const {
    usersListLoadingReducer,
    usersListDataReducer,
    usersListErrorReducer,
  } = userListStore;
  console.log("usersListLoadingReducer: ", usersListLoadingReducer);
  console.log("usersListDataReducer: ", usersListDataReducer);
  console.log("usersListErrorReducer: ", usersListErrorReducer);

  useEffect(() => {
    if (usersListDataReducer) {
      setUsersList(usersListDataReducer);
    } else {
      dispatch(userListAction());
    }
  }, [dispatch, usersListDataReducer]);

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Все пользователи"}
        second={"страница со списком всех пользователей системы."}
      />
      <main className="container text-center">
        <div className="m-1">
          {usersListErrorReducer && (
            <MessageComponent variant="danger">
              {usersListErrorReducer}
            </MessageComponent>
          )}
          {usersListLoadingReducer && <LoaderComponent />}
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
              {!usersList
                ? ""
                : usersList.map((user, index) => (
                    <tr key={index}>
                      <td className="text-center">{user.id}</td>
                      <td className="text-center">{user.username}</td>
                      <td className="text-center">
                        {user["user_model"]["password_slug_field"]}
                      </td>
                      <td className="text-center">{user["last_login"]}</td>
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
