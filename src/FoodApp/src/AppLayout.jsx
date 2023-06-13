import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/NavBar/About";
import Error from "./components/shared/Error";
import Contact from "./components/NavBar/Contact";
import RestaurantMenu from "./components/Restaurant/RestaurantMenu";

/**
 *
 *    RESTAURANT APPLICATION
 *
 * HEADER
 *  - logo
 *  - navbar item
 *
 * BODY
 *  - searchbar
 *  - restaurant container
 *      - restaurantCard
 *          - Img
 *          - Name ---> cusinie (bottom)
 *          - rating time price
 *
 * FOOTER
 *  - copyright
 *  - link
 *  - address
 *  - contact
 *
 *
 */
const AppLayout = () => {
  return (
    <Fragment>
      <Header />
      <div className="app-container">
        {/* Outlet compoent is like a placeholder to render the dynamic component based on the child route */}
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};

// export default AppLayout;

/**
 * creating a browser router;
 * it will take some configuration(here we will decide what to load on which route, basically we setup the configuration for our routing)
 * It will take an array of path & the path is an object.
 *
 * After configuring we need to provide this configuration to the RouterProvider component imported from react-router-dom
 *
 * this react-router-dom is a powerfull library that handle errors like wildcard routes and shown a proper error ui messages.
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // load elements on the given path
    errorElement: <Error />, // whatever we want to load on error give it to errorElement for this path
    children: [
      { path: "/", index: true, element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/restaurants/:id", element: <RestaurantMenu /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />); // render will render whatever we will pass to it, but i want to render based on router;
// so we need to provide RouterProvider component with router props and it will render based on the current route.
