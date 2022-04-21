import React from "react";

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
