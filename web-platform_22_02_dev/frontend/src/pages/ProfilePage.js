import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { userDetailsAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ProfilePage = () => {
  const dispatch = useDispatch();

  const userLoginStore = useSelector((state) => state.userLoginStore);
  const { userToken } = userLoginStore;

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const { error, loading, user } = userDetailsStore;
  // console.log("userToken: ", userToken);
  // console.log("user: ", user);

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);

  let groups = "";
  if (userToken != null && userToken.groups) {
    for (let i = 0; i < userToken.groups.length; i++) {
      groups += userToken.groups[i] + ", ";
    }
    groups = groups.slice(0, -2);
  } else {
    groups = "-";
  }

  let lastLogin = "";
  if (user !== null) {
    try {
      lastLogin = `${user["last_login"].split("T")[0]} ${user["last_login"]
        .split("T")[1]
        .slice(0, -13)}`;
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(userDetailsAction());
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
                <td className="text-end">{user ? user.id : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Имя пользователя</td>
                <td className="text-end">{user ? user.username : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Пароль</td>
                <td className="text-end">{user ? user["password"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Последний логин</td>
                <td className="text-end">{lastLogin ? lastLogin : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Права</td>
                <td className="text-end">
                  {user ? user["user_permissions"] : "-"}
                </td>
              </tr>
              <tr>
                <td className="text-start">Группы</td>
                <td className="text-end">{user ? user["groups"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Почта</td>
                <td className="text-end">
                  {user["user_model"] && !loading && !error
                    ? user["user_model"]["email_field"]
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="text-start">Имя</td>
                <td className="text-end">{user ? user["first_name"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Фамилия</td>
                <td className="text-end">{user ? user["last_name"] : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Активность аккаунта</td>
                <td className="text-end">{user ? "+" : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Модератор</td>
                <td className="text-end">{user ? "+" : "-"}</td>
              </tr>
              <tr>
                <td className="text-start">Суперпользователь</td>
                <td className="text-end">{user ? "+" : "-"}</td>
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
