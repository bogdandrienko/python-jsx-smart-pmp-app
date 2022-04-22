import React from "react";
import * as utils from "../utils";

export const Pagination1 = ({
  totalObjects = 0,
  limit = 1,
  page = 1,
  // @ts-ignore
  changePage,
}) => {
  // @ts-ignore
  const totalPages = Math.ceil(totalObjects / limit);
  return (
    <nav aria-label="Page navigation example m-0 p-0">
      <ul
        className={
          totalPages < 5
            ? "pagination justify-content-center pagination-lg m-0 p-3"
            : totalPages < 20
            ? "pagination justify-content-center m-0 p-3"
            : "pagination justify-content-center pagination-sm m-0 p-3"
        }
      >
        {page > 2 && (
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="First"
              onClick={() => changePage(1)}
            >
              <span aria-hidden="true">&laquo;&laquo;</span>
            </a>
          </li>
        )}
        {page > 1 && (
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => changePage(--page)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        {utils.GetPagesArray(totalObjects, limit).map((p) => (
          <li className="page-item" key={p}>
            <button
              className={
                page === p
                  ? "page-link fw-bold bg-warning bg-opacity-75"
                  : "page-link"
              }
              onClick={() => changePage(p)}
            >
              {p}
            </button>
          </li>
        ))}
        {page < totalPages && (
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => changePage(++page)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
        {page + 1 < totalPages && (
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => changePage(totalPages)}
            >
              <span aria-hidden="true">&raquo;&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export const Pagination2 = ({
  totalObjects = 0,
  limit = 1,
  page = 1,
  // @ts-ignore
  changePage,
}) => {
  return (
    <div className="page__wrapper">
      {utils.GetPagesArray(totalObjects, limit).map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
};
