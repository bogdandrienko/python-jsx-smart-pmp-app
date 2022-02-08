import React from "react";

const TableComponent = ({ tab = {} }) => {
  // console.log("tab: ", tab);

  let header = tab[0];
  // console.log("header: ", header);

  let thead_array = [];
  for (let i in tab[1]["Fields"]) {
    if (
      tab[1]["Fields"][i] !== "ВсегоДни" &&
      tab[1]["Fields"][i] !== "ВсегоЧасы"
    ) {
      thead_array.push(tab[1]["Fields"][i]);
    }
  }
  // console.log("thead: ", thead_array);

  let tbody_array = [];
  for (let i in tab[1]) {
    if (i !== "Fields") {
      let local_tbody_array = [];
      for (let j in tab[1][i]) {
        if (j !== "ВсегоДни" && j !== "ВсегоЧасы") {
          local_tbody_array.push(tab[1][i][j]);
        }
      }
      tbody_array.push(local_tbody_array);
    }
  }
  // console.log("tbody: ", tbody_array);

  function getValue(value) {
    if (typeof value === "number") {
      return value.toFixed(2);
    } else {
      return value;
    }
  }

  return (
    <li className="m-1">
      <h6 className="lead fw-bold bold">{header}</h6>
      <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small">
        <thead>
          <tr>
            {thead_array.map((thead, index_h) => (
              <th key={index_h} className="text-center">
                {thead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody_array.map((tbody, index_i) => (
            <tr key={index_i}>
              {tbody.slice(0, 1).map((body, index_j) => (
                <td key={index_j} className="text-start">
                  {body}
                </td>
              ))}
              {tbody.slice(1, -1).map((body, index_j) => (
                <td key={index_j} className="text-end">
                  {body ? body : ""}
                </td>
              ))}
              {tbody.slice(-1).map((body, index_j) => (
                <td key={index_j} className="text-end">
                  {body ? getValue(body) : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </li>
  );
};

export default TableComponent;
