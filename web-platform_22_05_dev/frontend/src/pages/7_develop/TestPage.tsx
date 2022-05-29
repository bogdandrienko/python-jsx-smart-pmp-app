// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/ui/component";
import * as base from "../../components/ui/base";
import json_obj from "../../components/Результат тестирования.json";
import { Link } from "react-router-dom";
import * as util from "../../components/util";
import * as slice from "../../components/slice";
import * as hook from "../../components/hook";
import { usePosts1 } from "../../components/hook";
import * as constant from "../../components/constant";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const TestPage = () => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  const source_objs = json_obj;
  const [filter, setFilter, resetFilter] = hook.useStateCustom1({
    type: "Современная история Казахстана",
    result: "",
    isAnswer: false,
    search: "",
  });
  let objs = hook.usePosts1(
    source_objs,
    filter.type,
    filter.result,
    filter.isAnswer,
    filter.search
  );

  return (
    <base.Base1>
      <component.Accordion1
        key_target={"accordion1"}
        isCollapse={true}
        title={
          <span>
            <i className="fa-solid fa-filter" /> Фильтрация, поиск и сортировка:
          </span>
        }
        text_style="text-success"
        header_style="bg-success bg-opacity-10 custom-background-transparent-low"
        body_style="bg-light bg-opacity-10 custom-background-transparent-low"
      >
        {
          <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
            <form
              className="m-0 p-0"
              // onSubmit={(event) => {
              //   FormIdeaListSubmit(event);
              // }}
              // onReset={(event) => {
              //   FormIdeaListReset(event);
              // }}
            >
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Результат:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.type}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="Современная история Казахстана">
                          Современная история Казахстана
                        </option>
                      </select>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Результат:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={filter.result}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            result: e.target.value,
                          })
                        }
                      >
                        <option value="">Все варианты</option>
                        <option value="Верный ответ">Верный ответ</option>
                        <option value="Неверный ответ">Неверный ответ</option>
                      </select>
                    </label>
                    <label className="form-control-sm form-switch text-center m-0 p-1">
                      Искать в ответе:
                      <input
                        type="checkbox"
                        className="form-check-input m-0 p-1"
                        id="flexSwitchCheckDefault"
                        defaultChecked={filter.isAnswer}
                        onClick={() =>
                          setFilter({
                            ...filter,
                            isAnswer: !filter.isAnswer,
                          })
                        }
                      />
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Поле поиска по части названия:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        placeholder="введите часть названия тут..."
                        value={filter.search}
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            search: e.target.value.replace(
                              util.RegularExpression.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                latin: true,
                                space: true,
                                punctuationMarks: true,
                              }),
                              ""
                            ),
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="card-body m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-primary m-1 p-2"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      обновить
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                    >
                      <i className="fa-solid fa-pen-nib m-0 p-1" />
                      сбросить
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        }
      </component.Accordion1>
      <div>
        <table className="table table-responsive table-striped table-bordered table-light bg-light bg-opacity-100 border-3 border-dark">
          {objs &&
            // @ts-ignore
            objs.map(
              // @ts-ignore
              (obj, index) => (
                // @ts-ignore
                <tr
                  key={obj["0"]}
                  className={
                    // @ts-ignore
                    obj["1"]["Результат"] === "Верный ответ"
                      ? "bg-success bg-opacity-75 text-light"
                      : "bg-danger bg-opacity-75 text-light"
                  }
                >
                  <td>
                    {
                      // @ts-ignore
                      obj["1"]["Вопрос"]
                    }
                  </td>
                  <td>
                    {
                      // @ts-ignore
                      obj["1"]["Ответ"]
                    }
                  </td>
                </tr>
              )
            )}
        </table>
      </div>
      {/*<component.TestComponent1 />*/}
      {/*<component.TestComponent2 />*/}
      {/*<component.TestComponent3 />*/}
      {/*<component.TestComponent4 />*/}
    </base.Base1>
  );
};
