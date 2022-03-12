import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import CIcon from '@coreui/icons-react';
import { updateUser } from "../../actions/user";


const UserUpdate = ({match}) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const users = useSelector(state => state.user.users)
  const user = users?.find( user => user.id.toString() === match.params.id)

  const [modal, setModal] = useState(false);

  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    designation: "",
    department: "",
    email: "",
    mobile: "",
    phone: "",
  });

  const { user_name, password, designation, department, email, mobile, phone } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  useEffect(() => {
    if(user) {
      setFormData({ ...formData, 
        user_name: user.name,
        designation: user.designation,
        department: user.department,
        email: user.email,
        mobile: user.mobile,
        phone: user.phone,
      });
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async e => {
    e.preventDefault();

    let data = {};
    data['name'] = user_name;
    data['designation'] = designation;
    data['department'] = department;
    data['email'] = email;
    data['mobile'] = mobile;
    data['phone'] = phone;

    if(password){
      data['password'] = password;
    }

    dispatch(updateUser(user.id, data));
    
    setFormData({ ...formData, 
      user_name: "",
      password: "",
      designation: "",
      department: "",
      email: "",
      mobile: "",
      phone: ""
   });

  setModal(true);

  };

  

  const closeModal = ()=>{
    setModal(false);
    history.push('/users')
  }

  return (
    <>
      <CRow>
        <CCol lg={9}>
        <CForm id="upload_form" method="post" className="form-horizontal" onSubmit={onSubmit}>
          <CCard>
            <CCardHeader>
              Update 
              <small> User</small>
            </CCardHeader>
            <CCardBody>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="user_name">Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="user_name" name="user_name" value={user_name} onChange={onChange}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password" name="password" value={password} onChange={onChange}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="designation">Designation</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="designation" name="designation" value={designation} onChange={onChange}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="department">Department/Desk</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="department" name="department" value={department} onChange={onChange}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="email" name="email" value={email} onChange={onChange}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="mobile">Mobile</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="mobile" name="mobile" value={mobile} onChange={onChange}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone">Phone</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="phone" name="mobile" value={phone} onChange={onChange}/>
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
          User Update Successful.
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

export default UserUpdate


