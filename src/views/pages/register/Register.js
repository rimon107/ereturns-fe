import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInputRadio,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CListGroupItem,
  CCardHeader,
  CListGroup,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  loadInstitutes,
  loadBranches,
  loadInstituteUserCount,
} from "../../../actions/institute";
import { register } from "../../../actions/auth";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ERROR } from "../../../utils/messages";

const Register = ({
  institute: { institutes, branches, users },
  isAuthenticated,
  loadInstitutes,
  loadBranches,
  loadInstituteUserCount,
  register,
}) => {
  const [branch, setBranch] = useState(false);
  const [ho, setHo] = useState(false);
  const [sbsCode, setSbsCode] = useState(false);
  const [newBranch, setNewBranch] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [responseList, setResponseList] = useState(null);

  const selectFiRef = useRef();
  const selectBranchRef = useRef();
  const history = useHistory();

  const [formData, setFormData] = useState({
    employee_name: "",
    password: "",
    confirm_password: "",
    designation: "",
    department: "",
    email: "",
    mobile: "",
    phone: "",
    sbs_code: "",
    report_type: "",
    fi_id: "",
    branch_id: "",
  });

  const [modalLoading, setModalLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const {
    employee_name,
    password,
    confirm_password,
    designation,
    department,
    email,
    mobile,
    phone,
    sbs_code,
    report_type,
    fi_id,
    branch_id,
  } = formData;

  const [reportTypeBranchChecked, setReportTypeBranchChecked] = useState(false);
  const [reportTypeHOChecked, setReportTypeHOChecked] = useState(false);

  useEffect(() => {
    loadInstitutes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBranch = async (fi_id) => {
    loadBranches(fi_id);
  };

  const loadUserCount = async (fi_id, branch_id) => {
    loadInstituteUserCount(fi_id, branch_id);
  };

  const initializeReportType = () => {
    setReportTypeBranchChecked(false);
    setReportTypeHOChecked(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeFI = (e) => {
    const name = "fi_id";
    if (e !== null) {
      const value = e.value;
      loadBranch(value);
      loadUserCount(value, 0);
    }

    initializeReportType();
    setHo(false);
    setBranch(false);
    setFormData({ ...formData, [name]: e ? e.value : null });
  };

  const onChangeBranchId = (e) => {
    const name = "branch_id";

    if (e !== null) {
      const value = e.value;
      loadUserCount(fi_id, value);
      onChangeBranch(value);
    }
    setNewBranch(false);
    setFormData({ ...formData, [name]: e ? e.value : null });
  };

  const onChangeReportTypeBranch = (e) => {
    if (!fi_id) {
      setModalData(ERROR.SELECT_FI);
      setModal(true);
    } else {
      setReportTypeBranchChecked(true);
      setReportTypeHOChecked(false);
      setHo(false);
      setBranch(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onChangeReportTypeHO = (e) => {
    if (!fi_id) {
      setModalData(ERROR.SELECT_FI);
      setModal(true);
    } else {
      setReportTypeBranchChecked(false);
      setReportTypeHOChecked(true);

      setBranch(false);
      setSbsCode(false);
      setNewBranch(false);

      const ho_users = users ? users["ho_users"] : -1;
      if (ho_users === -1) {
        setModalData(ERROR.DATA_LOAD_ERROR);
        setModal(true);
      } else if (ho_users > -1 && ho_users < 5) {
        setHo(true);
        setFormData({ ...formData, [e.target.name]: e.target.value });
      } else {
        setModalData(ERROR.HO_USER_LIMIT);
        setModal(true);
      }
    }
  };

  const onChangeBranch = (e) => {
    setSbsCode(true);
  };

  const checkSbsCode = (e) => {
    let branch_info = branches.filter(
      (br) => br.value.toString() === branch_id.toString()
    );

    if (sbs_code === branch_info[0].value.slice(-4)) {
      const branch_users = users["branch_users"];
      const ho_users = users ? users["ho_users"] : -1;
      if (ho_users === -1) {
        setModalData(ERROR.DATA_LOAD_ERROR);
        setModal(true);
      } else if (branch_users > -1 && branch_users < 2) {
        setNewBranch(true);
      } else {
        setModalData(ERROR.BRANCH_USER_LIMIT);
        setModal(true);
        console.log(ERROR.BRANCH_USER_LIMIT);
      }
    } else {
      setModalData(ERROR.WRONG_SBS_CODE);
      setModal(true);
      setNewBranch(false);
    }
  };

  const processResponse = (errors, action) => {
    return errors?.map((error, index) => (
      <CListGroupItem key={index} accent={action} color={action}>
        {error}
      </CListGroupItem>
    ));
  };

  const clearSelectValue = () => {
    if (selectBranchRef !== undefined) {
      selectFiRef.current?.select?.clearValue();
    }

    if (selectBranchRef !== undefined) {
      selectBranchRef.current?.select?.clearValue();
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuthentication = () => {
    if (isAuthenticated) {
      history.push("/");
    }
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const onSubmit = async (e) => {
    e.preventDefault();

    setModalLoading(true);
    await sleep(2000);

    if (!employee_name || !password || !email || !designation || !department) {
      setModalLoading(false);
      return;
    } else {
      const financial_institute_type = 1;
      register(
        financial_institute_type,
        fi_id,
        branch_id,
        employee_name,
        password,
        designation,
        department,
        email,
        mobile,
        phone,
        report_type
      ).then((res) => {
        setModalLoading(false);
        if (res.status === undefined) {
          const response = res.response;
          if (response.status === 400) {
            let error;
            let errors = [];
            for (let key in response.data) {
              let err = response.data[key];
              err.map((val) => errors.push(val));
            }
            error = processResponse(errors, "danger");
            setResponseList(error);
            setIsResponse(true);
          } else if (response.status === 500) {
            let resMsg;
            let responseMsg = [];
            const msg = ERROR.SERVER_ERROR;
            setModalData(msg);
            setModal(true);

            responseMsg.push(msg);
            resMsg = processResponse(responseMsg, "danger");
            setResponseList(resMsg);
            setIsResponse(true);
          } else {
            let resMsg;
            let responseMsg = [];
            const msg = ERROR.OTHER_ERROR;
            setModalData(msg);
            setModal(true);

            responseMsg.push(msg);
            resMsg = processResponse(responseMsg, "danger");
            setResponseList(resMsg);
            setIsResponse(true);
          }
        } else {
          if (res.status === 201) {
            e.target.reset();
            setFormData({
              ...formData,
              employee_name: "",
              password: "",
              confirm_password: "",
              designation: "",
              department: "",
              email: "",
              mobile: "",
              phone: "",
              sbs_code: "",
              report_type: "",
              // fi_id: "",
              branch_id: "",
            });

            clearSelectValue();

            setBranch(false);
            setHo(false);
            setSbsCode(false);
            setNewBranch(false);
            setReportTypeBranchChecked(false);
            setReportTypeHOChecked(false);
            let resMsg;
            let responseMsg = [];
            const msg =
              "Registration successful.\nYour username is " +
              res.data.username +
              ".\nPlease contact Head Office admin user for your user activation.";
            setModalData(msg);
            setModal(true);

            responseMsg.push(msg);
            resMsg = processResponse(responseMsg, "success");
            setResponseList(resMsg);
            setIsResponse(true);
            if (report_type === "ho_end_usr") {
              loadUserCount(fi_id, 0);
            } else {
              loadUserCount(fi_id, branch_id);
            }
          } else {
            let resMsg;
            let responseMsg = [];
            const msg = ERROR.OTHER_ERROR;
            setModalData(msg);
            setModal(true);

            responseMsg.push(msg);
            resMsg = processResponse(responseMsg, "danger");
            setResponseList(resMsg);
            setIsResponse(true);
          }
        }
      });
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const response = (
    <CCol>
      <CCard>
        <CCardHeader>
          Registration
          <small> Status</small>
        </CCardHeader>
        <CCardBody>
          <CListGroup accent>{responseList}</CListGroup>
        </CCardBody>
      </CCard>
    </CCol>
  );

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  method="post"
                  className="form-horizontal"
                  onSubmit={onSubmit}
                >
                  <h1>Registration Form</h1>
                  <p className="text-muted">Create your account</p>
                  {isResponse ? response : null}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="fi_id">Bank / NBFI</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <Select
                        ref={selectFiRef}
                        name="fi_id"
                        id="fi_id"
                        options={institutes}
                        onChange={onChangeFI}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Report Type</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio1"
                          name="report_type"
                          checked={reportTypeBranchChecked}
                          value="br_end_usr"
                          onChange={onChangeReportTypeBranch}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio1"
                        >
                          Branch End User
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio2"
                          name="report_type"
                          checked={reportTypeHOChecked}
                          value="ho_end_usr"
                          onChange={onChangeReportTypeHO}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio2"
                        >
                          Head Office End User
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>

                  {branch && (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="branch_id">Branch</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <Select
                          ref={selectBranchRef}
                          name="branch_id"
                          id="branch_id"
                          options={branches}
                          onChange={onChangeBranchId}
                        />
                      </CCol>
                    </CFormGroup>
                  )}

                  {sbsCode && (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="rit_frequency">SBS Code</CLabel>
                      </CCol>
                      <CCol xs="9" md="6">
                        <CInput
                          id="sbs_code"
                          name="sbs_code"
                          type="text"
                          placeholder="SBS Code"
                          value={sbs_code}
                          onChange={onChange}
                        />
                      </CCol>
                      <CCol xs="3" md="3">
                        <CButton
                          type="button"
                          color="primary"
                          block
                          onClick={checkSbsCode}
                        >
                          Check
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  )}

                  {(ho || newBranch) && (
                    <CFormGroup row>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          required
                          type="text"
                          name="employee_name"
                          placeholder="Employee Name"
                          autoComplete="username"
                          value={employee_name}
                          onChange={onChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          required
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          value={password}
                          onChange={onChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          required
                          type="password"
                          name="confirm_password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                          value={confirm_password}
                          onChange={onChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-tag" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          required
                          type="text"
                          name="designation"
                          placeholder="Designation"
                          autoComplete="designation"
                          value={designation}
                          onChange={onChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-window-maximize" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          required
                          type="text"
                          name="department"
                          placeholder="Department/Desk"
                          autoComplete="department"
                          value={department}
                          onChange={onChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          required
                          type="text"
                          name="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={onChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-mobile" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          name="mobile"
                          placeholder="Mobile"
                          autoComplete="mobile"
                          value={mobile}
                          onChange={onChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-1">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-phone" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          autoComplete="phone"
                          value={phone}
                          onChange={onChange}
                        />
                      </CInputGroup>
                    </CFormGroup>
                  )}
                  <CButton type="submit" color="success" block>
                    Create Account
                  </CButton>
                </CForm>
                <CRow>
                  <CCol xs="12" className="text-right mt-3">
                    <p>
                      User already esists? &nbsp;
                      <CLink to="/login" color="primary" active tabIndex={-1}>
                        Login
                      </CLink>
                    </p>
                  </CCol>
                </CRow>
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
      </CContainer>

      <CModal
        size="sm"
        show={modalLoading}
        backdrop={true}
        onClose={() => setModalLoading(false)}
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
    </div>
  );
};

Register.propTypes = {
  loadInstitutes: PropTypes.func.isRequired,
  loadBranches: PropTypes.func.isRequired,
  loadInstituteUserCount: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  institute: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  institute: state.institute,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  loadInstitutes,
  loadBranches,
  loadInstituteUserCount,
  register,
})(Register);
