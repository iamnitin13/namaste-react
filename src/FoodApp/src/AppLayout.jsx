import React, { Fragment } from "react";
import Footer from "./components/Footer/Footer";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";

/**
 *
 *    RESTURANT APPLICATION
 *
 * HEADER
 *  - logo
 *  - navbar item
 *
 * BODY
 *  - searchbar
 *  - resturant container
 *      - resturantCard
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
      <Body />
      <Footer />
    </Fragment>
  );
};

export default AppLayout;
