// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as util from "../util";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const Modal1 = ({ children, visible, setVisible }) => {
  const rootClasses = ["custom_modal_1"];
  if (visible) {
    rootClasses.push("custom_modal_1_active");
  }
  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={"custom_modal_content_1"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalConfirm1 = ({
  isModalVisible = false,
  // @ts-ignore
  setIsModalVisible,
  description = "Подтвердить действие?",
  // @ts-ignore
  callback,
}) => {
  return (
    <div
      className={
        isModalVisible
          ? "custom_modal_1 custom_modal_1_active"
          : "custom_modal_1"
      }
      onClick={() => callback(false)}
    >
      <div
        className={"custom_modal_content_1"}
        onClick={(event) => event.stopPropagation()}
      >
        {description && <h2>{description}</h2>}
        <button
          type="button"
          onClick={(event) => callback(true)}
          className="btn btn-lg btn-outline-success m-1 p-2"
        >
          подтвердить
        </button>
        <button
          type="button"
          onClick={(event) => callback(false)}
          className="btn btn-lg btn-outline-secondary m-1 p-2"
        >
          отмена
        </button>
      </div>
    </div>
  );
};

export const ModalPrompt2 = ({
  isModalVisible = false,
  // @ts-ignore
  setIsModalVisible,
  form = {
    question: "Введите причину?",
    answer: "Нарушение норм приличия!",
  },
  // @ts-ignore
  callback,
}) => {
  const [answ, setAnsw] = useState(form.answer);

  useEffect(() => {
    setAnsw(form.answer);
  }, [form]);

  // @ts-ignore
  const returnCallback = (event) => {
    event.preventDefault();
    setIsModalVisible(false);
    callback({ ...form, answer: answ });
    setAnsw("Нарушение норм приличия!");
  };

  // @ts-ignore
  const cancelCallback = (event) => {
    event.preventDefault();
    setIsModalVisible(false);
    callback(false);
    setAnsw("Нарушение норм приличия!");
  };

  return (
    <div
      className={
        isModalVisible
          ? "custom_modal_1 custom_modal_1_active"
          : "custom_modal_1"
      }
      onClick={(event) => cancelCallback(event)}
    >
      <div
        className={"custom_modal_content_1"}
        onClick={(event) => event.stopPropagation()}
      >
        {form.question && <h2>{form.question}</h2>}
        <input
          type="text"
          className="form-control form-control-sm text-center m-0 p-1"
          placeholder="введите название тут..."
          minLength={1}
          maxLength={100}
          value={answ}
          required
          onChange={(event) =>
            setAnsw(
              event.target.value.replace(
                util.GetRegexType({
                  numbers: true,
                  cyrillic: true,
                  space: true,
                  punctuationMarks: true,
                }),
                ""
              )
            )
          }
        />
        <button
          type="button"
          onClick={(event) => returnCallback(event)}
          className="btn btn-lg btn-outline-success m-1 p-2"
        >
          подтвердить
        </button>
        <button
          type="button"
          onClick={(event) => cancelCallback(event)}
          className="btn btn-lg btn-outline-secondary m-1 p-2"
        >
          отмена
        </button>
      </div>
    </div>
  );
};
