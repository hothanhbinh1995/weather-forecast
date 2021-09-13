import React from "react";
import configureStore from "store/utils/configureStore";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";

const initialState = {};

const renderPage = (Page, renderOptions, state = initialState) => {
  const store = configureStore(state);

  const dispatchSpy = jest.spyOn(store, "dispatch");

  const rendered = render(
    <Provider store={store}>{Page}</Provider>,
    renderOptions
  );

  return { ...rendered, dispatchSpy };
};

export default {
  renderPage,
};
