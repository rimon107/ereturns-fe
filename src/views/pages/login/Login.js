import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CRow,
  CModal,
  CModalBody,
  CSpinner,
  CListGroupItem,
  CListGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";
import { ERROR } from "../../../utils/messages";

const Login = ({ login, isAuthenticated }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const [isResponse, setIsResponse] = useState(false);
  const [responseList, setResponseList] = useState(null);
  const [modal, setModal] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const processResponse = (errors, action) => {
    return errors?.map((error, index) => (
      <CListGroupItem key={index} accent={action} color={action}>
        {error}
      </CListGroupItem>
    ));
  };

  useEffect(() => {
    checkAuthentication();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuthentication = () => {
    if (isAuthenticated) {
      history.push("/");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setModal(true);
    await sleep(2000);

    if (!username) {
      let resMsg;
      let responseMsg = [];
      const msg = ERROR.USERNAME;
      responseMsg.push(msg);
      resMsg = processResponse(responseMsg, "danger");
      setResponseList(resMsg);
      setIsResponse(true);
      setModal(false);
      setModal(false);
      return;
    } else if (!password) {
      let resMsg;
      let responseMsg = [];
      const msg = ERROR.PASSWORD;
      responseMsg.push(msg);
      resMsg = processResponse(responseMsg, "danger");
      setResponseList(resMsg);
      setIsResponse(true);
      setModal(false);
      setModal(false);
      return;
    } else {
      login(username, password).then((res) => {
        if (res.status === undefined) {
          let error;
          let errors = [];
          const response = res.response;
          if (response.status === 401) {
            for (let key in response.data) {
              let err = response.data[key];
              errors.push(err);
            }
            error = processResponse(errors, "danger");
            setResponseList(error);
            setIsResponse(true);
            setModal(false);
            return;
          } else if (response.status === 500) {
            let resMsg;
            let responseMsg = [];
            const msg = ERROR.SERVER_ERROR;
            responseMsg.push(msg);
            resMsg = processResponse(responseMsg, "danger");
            setResponseList(resMsg);
            setIsResponse(true);
            setModal(false);
            return;
          } else {
            let resMsg;
            let responseMsg = [];
            const msg = ERROR.SERVER_ERROR;
            responseMsg.push(msg);
            resMsg = processResponse(responseMsg, "danger");
            setResponseList(resMsg);
            setIsResponse(true);
            setModal(false);
            return;
          }
        } else {
          setModal(false);
          history.push("/");
        }
      });
    }
  };

  const response = (
    <CRow className="mb-3">
      <CCol>
        <CListGroup accent>{responseList}</CListGroup>
      </CCol>
    </CRow>
  );

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody className="mt-5">
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {isResponse === true ? response : null}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  <CRow>
                    <CCol xs="12" className="text-right">
                      <CLink
                        to="/register"
                        color="primary"
                        active
                        tabIndex={-1}
                      >
                        Register
                      </CLink>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-4 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    {/* <h2>Notice</h2> */}
                    <ul className="list-group">
                      <li className="h3 list-group-item">
                        <b>Notice</b>
                      </li>
                      <li className="list-group-item list-group-item-danger">
                        ** Do not upload ISS form-3 and 4 until further
                        instruction is given from integrated Supervision
                        Management Department of Bangladesh Bank .
                      </li>
                      <li className="list-group-item list-group-item-danger">
                        Branches of Banks and NBFIs are requested to contact
                        with their respective Head office admin if they face any
                        problem while uploading data.
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        For uploading any csv file, Banks and NBFIs have to
                        download the required <b>RITs</b> and updated{" "}
                        <b>Reference File</b> from this Web Portal.{" "}
                      </li>
                      <li className="list-group-item list-group-item-success">
                        For technical problem please contact to:{" "}
                        <b>
                          <a href="mailto:support.edw@bb.org.bd">
                            support.edw@bb.org.bd
                          </a>
                        </b>{" "}
                      </li>
                    </ul>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <CModal
          size="sm"
          show={modal}
          backdrop={true}
          onClose={closeModal}
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
      </CContainer>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
// export default Login
