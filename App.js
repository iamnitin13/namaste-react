// importing the module or package the we have install (react and react-dom);
import React from "react";
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

const e = React.createElement;

const nested = e(
  "div",
  { id: "parent" },
  e(
    "div",
    { id: "child" },
    e("h1", null, "I'm h1 tag"), // these are the array of children and we can have n number of children btw the tag
    e("h2", null, "I'm h2 tag")
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

root.render(nested);

// render it will take the react element i,e the js object create the tag and put in the root elment;
// that we created using reactdom.createroot
