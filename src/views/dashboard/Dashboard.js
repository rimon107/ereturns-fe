import React, { lazy } from "react";
import { CModal, CModalBody, CSpinner } from "@coreui/react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const DashboardHO = lazy(() => import("./DashboardHO.js"));
const DashboardBranch = lazy(() => import("./DashboardBranch.js"));
const DashboardOthers = lazy(() => import("./DashboardOthers.js"));

const loading = (
  <CModal
    size="sm"
    show={true}
    backdrop={true}
    // onClose={closeModal}
    centered={true}
    style={{
      width: "auto",
    }}
  >
    <CModalBody>
      <div className="d-flex text-center justify-content-between align-items-center">
        <CSpinner
          color="primary"
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />
      </div>
    </CModalBody>
  </CModal>
);

const Dashboard = ({ auth: { user } }) => {
  return (
    <>
      {user ? (
        user.groups[0] === 4 || user.groups[0] === 5 ? (
          <DashboardBranch />
        ) : user.groups[0] === 3 ? (
          <DashboardHO />
        ) : (
          <DashboardOthers />
        )
      ) : (
        loading
      )}
      {/* <DashboardBranch /> */}
    </>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
