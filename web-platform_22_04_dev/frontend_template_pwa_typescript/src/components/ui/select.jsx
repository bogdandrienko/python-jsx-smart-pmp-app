"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select2 = exports.Select1 = void 0;
var react_1 = require("react");
// @ts-ignore
var Select1 = function (_a) {
    var 
    // @ts-ignore,
    value = _a.value, 
    // @ts-ignore
    onChange = _a.onChange, _b = _a.options, options = _b === void 0 ? [{ value: "", name: "" }] : _b, _c = _a.useDefaultSelect, useDefaultSelect = _c === void 0 ? false : _c, _d = _a.defaultSelect, defaultSelect = _d === void 0 ? { value: "", name: "" } : _d;
    // @ts-ignore
    return (<select value={value} onChange={function (event) { return onChange(event.target.value); }}>
      {useDefaultSelect && (<option disabled defaultValue={defaultSelect.value} value={defaultSelect.value}>
          {defaultSelect.name}
        </option>)}
      {options.map(function (option) {
            if (option === void 0) { option = { value: "", name: "" }; }
            return (<option key={option.value} value={option.value}>
          {option.name}
        </option>);
        })}
    </select>);
};
exports.Select1 = Select1;
// @ts-ignore
var Select2 = function (_a) {
    var options = _a.options, defaultValue = _a.defaultValue, value = _a.value, onChange = _a.onChange;
    return (<select value={value} onChange={function (event) { return onChange(event.target.value); }}>
      // @ts-ignore
      <option disabled defaultValue={defaultValue} value="">
        {defaultValue}
      </option>
      {options.map(
        // @ts-ignore
        function (option) { return (<option key={option.value} value={option.value}>
            {option.name}
          </option>); })}
    </select>);
};
exports.Select2 = Select2;
