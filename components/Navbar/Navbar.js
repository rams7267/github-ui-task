import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Navbar.module.scss";
import { Navbar_Items } from "@/Utils/constants";
import { setActiveTab } from "@/Utils/Redux/user.slice";

export const Navbar = () => {
  
  const dispatch = useDispatch();
  const { activeTab } = useSelector((state) => state.user);

  return (
    <div className={styles.navWrapper}>
      <div>
        {Navbar_Items?.map((nav_item, index) => {
          return (
            <div
              className={`${styles.navItems} ${
                activeTab === nav_item.name ? styles.activeTab : ""
              }`}
              key={`nav-item-${index}`}
              onClick={() => {
                dispatch(setActiveTab(nav_item.name));
              }}
              dangerouslySetInnerHTML={{
                __html: nav_item.icon + " " + nav_item.name,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
