import React from 'react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { profile } from '../actions/user';

const TheHeaderDropdown = ({ auth: { user }, logout, profile }) => {

  const onProfileClick = async e => {
    // e.preventDefault();
    profile(user.id);
  };
  
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/9.png'}
            className="c-avatar-img"
            alt="ereturns@bb.org.bd"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem href={`#/user/change-password`}>
          <CIcon name="cil-settings" className="mfe-2" />
          Change Password
        </CDropdownItem>
        <CDropdownItem onClick={onProfileClick} href={`#/users/${user?.id}`}>
            <CIcon name="cil-user" className="mfe-2" />
            Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-account-logout" className="mfe-2" />Sign out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

TheHeaderDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, profile })(TheHeaderDropdown);
// export default TheHeaderDropdown
