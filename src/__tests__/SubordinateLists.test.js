import React from "react";
import { shallow } from "enzyme";

import SubordinateLists from "../components/SubordinateLists";

describe("Table Header Component", () => {
  it("renders Table Header", () => {
    const empLists = [
        "test1",
        "test2"
    ]
    const wrapper = shallow(<SubordinateLists empLists={empLists}/>);

    expect(wrapper).toBeDefined();
    expect(wrapper.find("li")).toBeDefined();
    expect(wrapper.find("li").length).toBe(empLists.length);
  });
});
