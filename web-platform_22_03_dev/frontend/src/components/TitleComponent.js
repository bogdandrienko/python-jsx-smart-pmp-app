import React from "react";

const TitleComponent = ({ first = "Заголовок", second = "подзаголовок." }) => {
  return (
    <div>
      <header className="pb-1">
        <div className="container d-flex flex-wrap justify-content-center shadow">
          <div className="d-flex align-items-center mb-0 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <span className="fw-normal fs-4 text-start">
              <small className="display-6 fw-normal text-start">{first}</small>
              <p className="lead fw-normal text-start m-0">{second}</p>
            </span>
          </div>
          {/*<form className="col-12 col-lg-auto mb-0 mb-lg-0">*/}
          {/*  <input*/}
          {/*    type="search"*/}
          {/*    className="form-control"*/}
          {/*    placeholder="Поиск..."*/}
          {/*    aria-label="Search"*/}
          {/*  />*/}
          {/*</form>*/}
        </div>
      </header>
    </div>
  );
};

export default TitleComponent;
