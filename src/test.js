import App from "./App";

test("Render <App/> correctly", () => {
  const tree = render(<App />);
  expect(tree).toMatchSnapshot();
});
