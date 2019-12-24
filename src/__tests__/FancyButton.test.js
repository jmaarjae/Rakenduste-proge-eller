import React from "react";
import renderer from "react-test-renderer";
import FancyButton from "../components/FancyButton";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("FancyButton component", () => {
  test("snapshot", () => {
    const component = renderer.create(
      <FancyButton onClick={() => 0}>Hello</FancyButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

it("should trigger callback when the button is clicked", () => {
  let x = 0;
  shallow(<FancyButton onClick={() => (x = x + 1)}>Hello</FancyButton>);
});
