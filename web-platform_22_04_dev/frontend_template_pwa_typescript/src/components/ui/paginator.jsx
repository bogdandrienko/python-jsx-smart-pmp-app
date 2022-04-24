"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination3 = exports.Pagination2 = exports.Pagination1 = void 0;
var react_1 = require("react");
var util = require("../util");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var Pagination1 = function (_a) {
    var _b = _a.totalObjects, totalObjects = _b === void 0 ? 0 : _b, _c = _a.limit, limit = _c === void 0 ? 1 : _c, _d = _a.page, page = _d === void 0 ? 1 : _d, 
    // @ts-ignore
    changePage = _a.changePage;
    var totalPages = Math.ceil(totalObjects / limit);
    return (<nav aria-label="Page navigation example m-0 p-0">
      {totalPages > 1 ? (<ul className={totalPages < 4
                ? "pagination justify-content-center pagination-lg m-0 p-3"
                : totalPages < 10
                    ? "pagination justify-content-center m-0 p-3"
                    : "pagination justify-content-center pagination-sm m-0 p-3"}>
          {page > 2 && (<li className="page-item">
              <a className="page-link" href="#" aria-label="First" onClick={function () { return changePage(1); }}>
                <span aria-hidden="true">&laquo;&laquo;</span>
              </a>
            </li>)}
          {page > 1 && (<li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={function () { return changePage(--page); }}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>)}
          {util.GetPagesArray(totalObjects, limit).map(function (p) { return (<li className="page-item" key={p}>
              <button className={page === p
                    ? "page-link fw-bold bg-warning bg-opacity-75"
                    : "page-link"} onClick={function () { return changePage(p); }}>
                {p}
              </button>
            </li>); })}
          {page < totalPages && (<li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={function () { return changePage(++page); }}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>)}
          {page + 1 < totalPages && (<li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={function () { return changePage(totalPages); }}>
                <span aria-hidden="true">&raquo;&raquo;</span>
              </a>
            </li>)}
        </ul>) : ("")}
    </nav>);
};
exports.Pagination1 = Pagination1;
var Pagination2 = function (_a) {
    var _b = _a.totalObjects, totalObjects = _b === void 0 ? 0 : _b, _c = _a.limit, limit = _c === void 0 ? 1 : _c, _d = _a.page, page = _d === void 0 ? 1 : _d, 
    // @ts-ignore
    changePage = _a.changePage;
    return (<div className="page__wrapper">
      {util.GetPagesArray(totalObjects, limit).map(function (p) { return (<span onClick={function () { return changePage(p); }} key={p} className={page === p ? "page page__current" : "page"}>
          {p}
        </span>); })}
    </div>);
};
exports.Pagination2 = Pagination2;
// @ts-ignore
var Pagination3 = function (_a) {
    var totalPages = _a.totalPages, page = _a.page, changePage = _a.changePage;
    var pagesArray = util.getPagesArray(totalPages);
    return (<div className="page__wrapper">
      {pagesArray.map(function (p) { return (<span onClick={function () { return changePage(p); }} key={p} className={page === p ? "page page__current" : "page"}>
          {p}
        </span>); })}
    </div>);
};
exports.Pagination3 = Pagination3;
