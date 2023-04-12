// importing the module or package the we have install (react and react-dom);
import React, { Fragment } from "react";
import ReactDOM from "react-dom/client"; //earlier it was from react-dom

/**
 *
 * crete a nested structure in react
 *
 * <div id='parent'>
 *     <div id='child'>
 *         <h1>I'm h1 tag</h1>
 *         <h2>I'm h2 tag</h2>
 *     </div>
 * </div>
 *
 *
 */

// const heading = React.createElement(
//   "h1",
//   { id: "heading", xyz: "abc" },
//   "Hello World from React!!"
// );
// create react element i.e the js object not the actual h1 tag;
//{tagName:'h1',props:{id:'heading,xyz:'abc',children:"Hello World from React!!",....other property}}

//creating a nested structure describe in the above

// const e = React.createElement;

// const nested = e(
//   "div",
//   { id: "parent" },
//   e(
//     "div",
//     { id: "child" },
//     e("h1", null, "I'm h1 tag"), // these are the array of children and we can have n number of children btw the tag
//     e("h2", null, "I'm h2 tag")
//   )
// );

// React Element
const heading = React.createElement(
  "h1",
  {},
  "Namste React with react element"
);

// jsx Element
const jsxHeading = <h1>Namaste React with JSX element.</h1>;

// React Component
const HeadingComponent = () => (
  <div id="parent">
    <h2 id="heading">
      Namaste React from React Functional Component with JSX.
    </h2>
  </div>
);

// this is component composition (composing multiple component into a single component)
const ComponentCompostion = () => (
  <Fragment>
    <>
      <div id="container" className="app-container">
        {jsxHeading}
        {console.log("Hello from console")}
        {HeadingComponent()}
        <HeadingComponent />
        <HeadingComponent></HeadingComponent>
        <p id="paragraph">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          dolorum consequuntur, quam ratione veritatis consequatur adipisci
          sapiente minus recusandae tenetur, mollitia veniam id tempora aperiam
          pariatur maxime nihil officiis?
        </p>
        {100 + 2000}
      </div>
      <div id="container-2">
        <h2>Hello from container 2</h2>
      </div>
    </>
  </Fragment>
  // fragment and <> are the same; fragment are imported from React & <> are from jsx
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ComponentCompostion />); // <HeadingComponnet/> is treated as jsx element
root.render(<HeadingComponent />);

// render it will take the react element i,e the js object create the tag and put in the root elment;
// that we created using reactdom.createroot

// const secondRoot = ReactDOM.createRoot(document.getElementById("root-2"));
// secondRoot.render(<HeadingComponent />);
