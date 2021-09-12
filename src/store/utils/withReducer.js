import React from "react";
import { useStore } from "react-redux";

const withReducer = (key, reducer) => (WrappedComponent) => (props) => {
  const store = useStore();
  store.injectReducer(key, reducer);
  return <WrappedComponent {...props} />;
};

export default withReducer;
