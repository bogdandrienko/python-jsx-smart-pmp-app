import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { bankIdeaListAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
import BankIdeaComponent from "../components/BankIdeaComponent";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BankIdeaListPage = () => {
  const dispatch = useDispatch();

  const bankIdeaListStore = useSelector((state) => state.bankIdeaListStore);
  const {
    load: loadBankIdeaList,
    data: dataBankIdeaList,
    error: errorBankIdeaList,
    fail: failBankIdeaList,
  } = bankIdeaListStore;

  useEffect(() => {
    if (dataBankIdeaList) {
    } else {
      dispatch(bankIdeaListAction());
    }
  }, [dispatch, dataBankIdeaList]);

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Все идеи"}
        second={"страница содержит все идеи в банке идей."}
      />
      <main className="container text-center">
          <div className="text-center">
            {loadBankIdeaList && <LoaderComponent />}
            {dataBankIdeaList && (
              <div className="m-1">
                <MessageComponent variant="success">
                  Данные успешно получены!
                </MessageComponent>
              </div>
            )}
            {errorBankIdeaList && (
              <div className="m-1">
                <MessageComponent variant="danger">
                  {errorBankIdeaList}
                </MessageComponent>
              </div>
            )}
            {failBankIdeaList && (
              <div className="m-1">
                <MessageComponent variant="warning">
                  {failBankIdeaList}
                </MessageComponent>
              </div>
            )}
          </div>
        <div class="container-fluid text-center">
          <ul class="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
            {!dataBankIdeaList
              ? ""
              : dataBankIdeaList.map((data, index) => (
                  <BankIdeaComponent key={index} data={data} />
                ))}
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default BankIdeaListPage;
