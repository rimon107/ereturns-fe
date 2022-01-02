import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

const Login = ({ login, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

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
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput name="username"
                        value={username}
                        onChange={onChange}
                        required type="text"
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
                      <CInput type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                  <CRow>
                    <CCol xs="12" className="text-right">
                      <CLink to="/register" color="primary" active tabIndex={-1}>Register</CLink>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-4 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    {/* <h2>Notice</h2> */}
                    <ul class="list-group">
                      <li class="h3 list-group-item"><b>Notice</b></li>
                      <li class="list-group-item list-group-item-danger">** Do not upload ISS form-3 and 4 until further instruction is given from integrated Supervision Management Department of Bangladesh Bank .</li>
                      <li class="list-group-item list-group-item-danger">Branches of Banks and NBFIs are requested to contact with their respective Head office admin if they face any problem while uploading data.</li>
                      <li class="list-group-item list-group-item-dark">For uploading any csv file, Banks and NBFIs have to download the required <b>RITs</b> and updated <b>Reference File</b> from this Web Portal. </li>
                      <li class="list-group-item list-group-item-success">For technical problem please contact to: <b><a href="mailto:support.edw@bb.org.bd">support.edw@bb.org.bd</a></b> </li>
                    </ul>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
// export default Login
