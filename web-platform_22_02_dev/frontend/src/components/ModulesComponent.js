import React from "react";
import ModuleComponent from "./ModuleComponent";
import modules from "../constants/modulesConstants";

const ModulesComponent = () => {
  return (
    <div>
      <h2>Модули:</h2>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3">
          {modules
            ? modules.map((module, module_i) => (
                <ModuleComponent key={module_i} module={module} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default ModulesComponent;
