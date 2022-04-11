import React, { useEffect, useState, lazy } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import {
  loadInactiveUserList,
  updateUser,
  userDelete,
} from "../../actions/user";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const DashboardWidgetsDropdown = lazy(() =>
  import("../widgets/DashboardWidgetsDropdown.js")
);

const getBadge = (status) => {
  switch (status) {
    case "Online":
      return "success";
    case "Offline":
      return "danger";
    case true:
      return "primary";
    case false:
      return "warning";
    default:
      return "primary";
  }
};
const fields = [
  { key: "no", label: "#" },
  { key: "username", label: "Userame", _style: { width: "20%" } },
  { key: "name", label: "Name", _style: { width: "20%" } },
  { key: "branch", label: "Branch", sorter: false },
  { key: "mobile" },
  { key: "is_active", label: "Active" },
  {
    key: "toggle_button",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "active_button",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "delete_button",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const DashboardHO = ({
  user: { inactive_users },
  loadInactiveUserList,
  updateUser,
  userDelete,
}) => {
  // const dispatch = useDispatch();
  // const user_list = useSelector((state) => state.user.inactive_users);

  useEffect(() => {
    // dispatch(loadInactiveUserList());
    loadInactiveUserList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [details, setDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [modalData, setModalData] = useState("");

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const activateUser = (id) => {
    let data = {};
    data["is_active"] = true;
    updateUser(id, data).then((res) => {
      loadInactiveUserList();
      setModalData("User activation successful.");
      setModal(true);
    });
  };

  const deleteUserModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const deleteUser = () => {
    console.log("delete user");
    // dispatch(userDelete(deleteId));
    userDelete(deleteId).then((res) => {
      loadInactiveUserList();
      setDeleteModal(false);
      setModalData("User delete successful.");
      setModal(true);
    });
  };

  const closeModal = () => {
    setModal(false);
    setDeleteModal(false);
  };

  return (
    <>
      <DashboardWidgetsDropdown />
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              User <small>List</small>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={inactive_users}
                fields={fields}
                hover
                tableFilter
                itemsPerPageSelect
                striped
                bordered
                size="md"
                itemsPerPage={10}
                sorter
                pagination
                scopedSlots={{
                  no: (item, index) => <td>{(index = index + 1)}</td>,
                  branch: (item) => <td>{item.branch?.name?.toString()}</td>,
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                  is_active: (item) => (
                    <td>
                      <CBadge color={getBadge(item.is_active)}>
                        {item.is_active?.toString()}
                      </CBadge>
                    </td>
                  ),
                  toggle_button: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? "Hide" : "Show"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <p className="text-muted">
                            <b>Username:</b> {item.username}
                          </p>
                          <p className="text-muted">
                            <b>Name:</b> {item.name}
                          </p>
                          <p className="text-muted">
                            <b>Bank:</b>{" "}
                            {item.financial_institute?.name?.toString()}
                          </p>
                          <p className="text-muted">
                            <b>Branch:</b> {item.branch?.name?.toString()}
                          </p>
                          <p className="text-muted">
                            <b>Department:</b> {item.department}
                          </p>
                          <p className="text-muted">
                            <b>Designation:</b> {item.designation}
                          </p>
                          <p className="text-muted">
                            <b>Email:</b> {item.email}
                          </p>
                          <p className="text-muted">
                            <b>Mobile:</b> {item.mobile}
                          </p>
                          <p className="text-muted">
                            <b>Phone:</b> {item.phone}
                          </p>
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                  active_button: (item) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="success"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            activateUser(item.id);
                          }}
                        >
                          {"Active"}
                        </CButton>
                      </td>
                    );
                  },
                  delete_button: (item) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="danger"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            deleteUserModal(item.id);
                          }}
                        >
                          {"Delete"}
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal size="sm" show={modal} onClose={closeModal} centered={true}>
        <CModalBody>{modalData}</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={closeModal}>
            Ok
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal size="sm" show={deleteModal} onClose={closeModal} centered={true}>
        <CModalBody>Are you sure?</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => {
              deleteUser();
            }}
          >
            Yes
          </CButton>
          <CButton color="danger" onClick={closeModal}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

DashboardHO.propTypes = {
  loadInactiveUserList: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  userDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  loadInactiveUserList,
  updateUser,
  userDelete,
})(DashboardHO);

// export default DashboardHO;
