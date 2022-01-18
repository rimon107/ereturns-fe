import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CInput,
  CFormGroup,
  CLabel,
  CCardFooter,
  CModal,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { changePassword } from "../../actions/user";
import { logout } from '../../actions/auth';


const ChangePassword = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { current_password, new_password, confirm_password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    let data = {};
    data['current_password'] = current_password;
    data['new_password'] = new_password;
    data['confirm_password'] = confirm_password;

    dispatch(changePassword(data));
    
    setFormData({ ...formData, 
      current_password: "",
      new_password: "",
      confirm_password: ""
   });

  setModal(true);

  };

  const closeModal = ()=>{
    setModal(false);
    dispatch(logout());
  }

  return (
    <>
      <CRow>
        <CCol lg={5}>
        <CForm id="chabge_password_form" method="post" onSubmit={onSubmit}>
          <CCard>
            <CCardHeader>
              Change 
              <small> Password</small>
            </CCardHeader>
            <CCardBody>
                
                <CFormGroup row>
                  <CCol md="5">
                    <CLabel htmlFor="password">Current Password</CLabel>
                  </CCol>
                  <CCol xs="9" md="6">
                    <CInput required type="password" id="current_password" name="current_password" value={current_password} onChange={onChange}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="5">
                    <CLabel htmlFor="password">New Password</CLabel>
                  </CCol>
                  <CCol xs="9" md="6">
                    <CInput required type="password" id="new_password" name="new_password" value={new_password} onChange={onChange}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="5">
                    <CLabel htmlFor="password">ConfirmPassword</CLabel>
                  </CCol>
                  <CCol xs="9" md="6">
                    <CInput required type="password" id="confirm_password" name="confirm_password" value={confirm_password} onChange={onChange}/>
                  </CCol>
                </CFormGroup>
                
            </CCardBody>
            <CCardFooter>
                  <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> 
            </CCardFooter>
          </CCard>
          </CForm>
        </CCol>
      </CRow>
      <CModal
        size="sm"
        show={modal}
        onClose={closeModal}
        centered={true}
      >
        <CModalBody>
          Password update successful. Please login again with the new password.
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={closeModal}
          >Ok</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ChangePassword
