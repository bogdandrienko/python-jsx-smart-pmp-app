import React from "react";

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
  // @ts-ignore
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
