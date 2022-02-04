import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../actions/userActions";

import Header from "../components/Header";
import Title from "../components/Title";
import Footer from "../components/Footer";
import News from "../components/News";

const NewsPage = () => {
  return (
    <div>
      <Header />
      <Title
        first={"Новости"}
        second={"страница новостей веб-платформы."}
      />
      <main className="container text-center">
        <News/>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
