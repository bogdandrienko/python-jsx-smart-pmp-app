import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../actions/userActions";

import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import NewsComponent from "../components/NewsComponent";

const NewsPage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Новости"}
        second={"страница новостей веб-платформы."}
      />
      <main className="container text-center">
        <NewsComponent/>
      </main>
      <FooterComponent />
    </div>
  );
};

export default NewsPage;
