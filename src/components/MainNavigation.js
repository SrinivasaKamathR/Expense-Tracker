import React from "react";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/product">Products</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
