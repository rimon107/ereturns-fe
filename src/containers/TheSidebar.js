import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import logo2 from "../assets/images/e_logo.jpeg";

// sidebar nav config
import {
  bank_branch_nav,
  bank_admin_nav,
  bb_user_nav,
  bb_admin_nav,
  default_nav,
} from "./_nav";
import { SET } from "../actiontypes";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.core.sidebarShow);
  const user = useSelector((state) => state.auth.user);

  const navigation = user
    ? user.groups[0] === 1
      ? bb_admin_nav
      : user.groups[0] === 2
      ? bb_user_nav
      : user.groups[0] === 3
      ? bank_admin_nav
      : user.groups[0] === 4 || user.groups[0] === 5
      ? bank_branch_nav
      : default_nav
    : default_nav;

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: SET, sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          src={logo2}
          content="ereturns"
          height={35}
        />
        {/* &nbsp;eReturns */}
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
