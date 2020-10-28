import React from "react";
import { shallow } from "enzyme";

import App from "../App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "../reducers";

const store = createStore(reducers);

describe("App Component", () => {
  it("renders App", () => {
    // Arrange.
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Act.
    const wrapper = shallow(app);

    // Assert.
    expect(wrapper).toBeDefined();
    expect(wrapper.find("h1")).toBeDefined();
  });
});
