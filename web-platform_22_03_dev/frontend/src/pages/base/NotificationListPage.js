///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import ReactPlayer from "react-player";
import axios from "axios";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const NotificationListPage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [firstRefresh, firstRefreshSet] = useState(true);
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const notificationListStore = useSelector(
    (state) => state.notificationListStore
  );
  const {
    // load: loadNotificationList,
    data: dataNotificationList,
    // error: errorNotificationList,
    // fail: failNotificationList,
  } = notificationListStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO reset state
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.NOTIFICATION_LIST_RESET_CONSTANT });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (!dataNotificationList) {
      const form = {
        "Action-type": "NOTIFICATION_LIST",
      };
      dispatch(actions.notificationListAction(form));
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      }
    }
  }, [dataNotificationList, dispatch, firstRefresh]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent
        logic={true}
        redirect={true}
        title={"Уведомления"}
        description={"ваши уведомления"}
      />
      <main>
        <components.StoreStatusComponent
          storeStatus={notificationListStore}
          keyStatus={"notificationListStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {dataNotificationList && (
          <table className="table table-sm table-hover table-borderless table-striped m-0 p-0">
            <tbody>
              {dataNotificationList.map((object, index) => (
                <tr key={index} className="">
                  <td className="fw-bold text-secondary text-start">
                    {object[0]}
                  </td>
                  <td className="small text-center">{object[1]}</td>
                  <td className="small text-end">{object[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <components.FooterComponent />
    </body>
  );
};
