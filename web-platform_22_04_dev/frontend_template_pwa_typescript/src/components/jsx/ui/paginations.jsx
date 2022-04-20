import React from "react";
import * as utils from "../../utils";

export const Pagination1 = ({ totalPages, page, changePage }) => {
  let pagesArray = utils.getPagesArray(totalPages);
  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
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
