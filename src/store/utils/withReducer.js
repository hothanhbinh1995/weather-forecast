import store from "../index";

const withReducer = (key, reducer) => (WrappedComponent) => {
  store.injectReducer(key, reducer);

  return WrappedComponent;
};

export default withReducer;
