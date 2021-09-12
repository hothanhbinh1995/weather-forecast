import thunk from "redux-thunk";
import asyncActionWatcherMiddleware from "./asyncActionWatcherMiddleware";

const middlewares = [thunk, asyncActionWatcherMiddleware];

export default middlewares;
