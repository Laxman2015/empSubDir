import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import rootReducer from "../reducers";
const history = createHistory();

const configStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      reduxImmutableStateInvariant(),
      routerMiddleware(history)
    )
  );
};

export default configStore;
