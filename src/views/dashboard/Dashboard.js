import React, { lazy, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashboardHO = lazy(() => import('./DashboardHO.js'))
const DashboardBranch = lazy(() => import('./DashboardBranch.js'))
const DashboardOthers = lazy(() => import('./DashboardOthers.js'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Dashboard  = ({ auth: { user } }) => {
  
  return (
    <>
    {user ? user.groups[0]===3 || user.groups[0]===4 ? <DashboardBranch /> : user.groups[0]===5 ? <DashboardHO /> : <DashboardOthers /> : loading}
    </>
  )
  
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
