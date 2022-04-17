import React from "react";
import { BaseComponent2 } from "../components/ui/base";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <BaseComponent2>
      <h1>Home page</h1>
      <div className="">
        <table className="table table-striped table-bordered table-responsive border-dark">
          <thead className="bg-primary bg-opacity-10">
            <tr>
              <td>Type</td>
              <td>Description</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody className="bg-light bg-opacity-25">
            <tr>
              <td>Статическая пагинация</td>
              <td>
                "Классическая" постраничная пагинация - разделение данных на
                порции (страницы).
              </td>
              <td>
                <Link
                  to="/posts_pagination"
                  className="btn btn-xs btn-outline-primary"
                >
                  Link
                </Link>
              </td>
            </tr>
            <tr>
              <td>Динамическая пагинация</td>
              <td>
                "Бесконечный скролл" - разделение данных на порции (страницы) и
                "подрузка" при достижении края страницы.
              </td>
              <td>
                <Link
                  to="/posts_unlimited"
                  className="btn btn-xs btn-outline-primary"
                >
                  Link
                </Link>
              </td>
            </tr>
            <tr>
              <td>Заголовки или "навбар"</td>
              <td>Header / navbar for page.</td>
              <td>
                <Link to="/test" className="btn btn-xs btn-outline-primary">
                  Link
                </Link>
              </td>
            </tr>
            <tr>
              <td>Test page</td>
              <td>Page with test components and check the some logic.</td>
              <td>
                <Link to="/test" className="btn btn-xs btn-outline-primary">
                  Link
                </Link>
              </td>
            </tr>
            <tr>
              <td>About page</td>
              <td>Page with test components and check the some logic.</td>
              <td>
                <Link to="/about" className="btn btn-xs btn-outline-primary">
                  Link
                </Link>
              </td>
            </tr>
            <tr>
              <td>Drag and drop</td>
              <td>
                "Drag and drop" - functional to move components with this
                operations. [react-trello-example]
              </td>
              <td>Link</td>
            </tr>
            <tr>
              <td>Формы</td>
              <td>Все варианты наполнения форм: input, select...</td>
              <td>
                <Link to="/form" className="btn btn-xs btn-outline-primary">
                  Link
                </Link>
              </td>
            </tr>
            <tr>
              <td>Элементы</td>
              <td>Все варианты наполнения форм: button, table, accordion...</td>
              <td>Link</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>Description</td>
              <td>Link</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseComponent2>
  );
};

export default HomePage;
