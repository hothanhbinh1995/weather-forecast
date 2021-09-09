import store from '..';

const withReducer = (key, reducer) => (WrappedComponent) => {
  store.injectReducer(key, reducer);

  return WrappedComponent;
};

export default withReducer;
