import React from "react";
import configureStore from "store/utils/configureStore";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";

const initialState = {};

export const setupStore = (reducers = {}, initState = initialState) => {
  const store = configureStore(initState);
  Object.keys(reducers).forEach((reducerName) =>
    store.injectReducer(reducerName, reducers[reducerName])
  );

  store.dispatchSpy = jest.spyOn(store, "dispatch");

  return store;
};

export const renderPage = (Page, renderOptions, state) => {
  const store = setupStore({}, state);

  const rendered = render(
    <Provider store={store}>{Page}</Provider>,
    renderOptions
  );

  return { ...rendered, store };
};
