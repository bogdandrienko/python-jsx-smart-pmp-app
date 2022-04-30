// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const Select1 = ({
  // @ts-ignore,
  value,
  // @ts-ignore
  onChange,
  options = [{ value: "", name: "" }],
  useDefaultSelect = false,
  defaultSelect = { value: "", name: "" },
}) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {useDefaultSelect && (
        <option
          disabled
          defaultValue={defaultSelect.value}
          value={defaultSelect.value}
        >
          {defaultSelect.name}
        </option>
      )}
      {options.map((option = { value: "", name: "" }) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

// @ts-ignore
export const Select2 = ({ options, defaultValue, value, onChange }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      // @ts-ignore
      <option disabled defaultValue={defaultValue} value="">
        {defaultValue}
      </option>
      {options.map(
        // @ts-ignore
        (option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        )
      )}
    </select>
  );
};
