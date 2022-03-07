import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { adminExportUsersAction } from "../../js/actions";
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import LoaderComponent from "../../components/LoaderComponent";
import MessageComponent from "../../components/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AdminExportUsersPage = () => {
  const dispatch = useDispatch();

  const adminExportUsersStore = useSelector(
    (state) => state.adminExportUsersStore
  );
  const {
    load: loadExportUsers,
    data: dataExportUsers,
    error: errorExportUsers,
    fail: failExportUsers,
  } = adminExportUsersStore;
  console.log("dataExportUsers: ", dataExportUsers);

  useEffect(() => {}, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "EXPORT_USERS",
    };
    dispatch(adminExportUsersAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Расчётный лист"}
        second={"страница выгрузки Вашего расчётного листа."}
      />
      <main className="container text-center">
        <div className="text-center">
          {loadExportUsers && <LoaderComponent />}
          {dataExportUsers && (
            <div className="m-1">
              <MessageComponent variant="success">
                Данные успешно получены!
              </MessageComponent>
            </div>
          )}
          {errorExportUsers && (
            <div className="m-1">
              <MessageComponent variant="danger">
                {errorExportUsers}
              </MessageComponent>
            </div>
          )}
          {failExportUsers && (
            <div className="m-1">
              <MessageComponent variant="warning">
                {failExportUsers}
              </MessageComponent>
            </div>
          )}
        </div>
        <div className="input-group m-1">
          {!loadExportUsers && (
            <form
              method="POST"
              target="_self"
              encType="multipart/form-data"
              name="EXPORT_USERS"
              autoComplete="on"
              className="w-100"
              onSubmit={submitHandler}
            >
              <button className="btn btn-md btn-primary" type="submit">
                получить
              </button>
            </form>
          )}
        </div>
        <hr />
        <div>
          {dataExportUsers && (
            <div>
              <a
                className="btn btn-md btn-success m-1"
                href={`/${dataExportUsers["excel"]}`}
              >
                Скачать excel-документ
              </a>
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default AdminExportUsersPage;
