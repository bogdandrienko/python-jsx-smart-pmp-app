import React from "react";

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
