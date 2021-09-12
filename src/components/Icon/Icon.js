import React from "react";
import classNames from "classnames";

const Icon = ({ name, className, ...restProps }) => (
  <i {...restProps} className={classNames("bi", name, className)} />
);

export default Icon;
