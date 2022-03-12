import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
// import { uploadRit } from "../../actions/rit";


const AddUser = () => {
  // const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)

  const [formData, setFormData] = useState({
    user_name: "",
    password: "",
    confirm_password: "",
    designation: "",
    department: "",
    email: "",
    mobile: "",
  });

  const { user_name, password, confirm_password, designation, department, email, mobile } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    
    e.preventDefault();
    // const time = new Date(); 
    // const date = base_date+"T"+time.getHours() + ":"+time.getMinutes() + ":"+time.getSeconds() + "+06:00";
    let form_data = new FormData();
    form_data.append('financial_institute_type', user.financial_institute_type.id);
    form_data.append('financial_institute', user.financial_institute.id);
    form_data.append('branch', user.branch.id);
    // form_data.append('department', user.department.id);
    // form_data.append('base_date', date);
    // form_data.append('file', file, file.name);
    // form_data.append('uploaded_by', user.id);
    // form_data.append('status', 1);
    // form_data.append('prepared_by', prepared_by);
    // form_data.append('phone', phone_number);

    // dispatch(uploadRit(form_data));

    e.target.reset();
    setFormData({ ...formData, 
      user_name: "",
      password: "",
      confirm_password: "",
      designation: "",
      department: "",
      email: "",
      mobile: ""
   });

  };

  return (
    <>
      <CRow>
        <CCol lg={9}>
        <CForm id="upload_form" method="post" className="form-horizontal" onSubmit={onSubmit}>
          <CCard>
            <CCardHeader>
              Create 
              <small> Admin User</small>
            </CCardHeader>
            <CCardBody>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="user_name">Username</CLabel>
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
                    <CLabel htmlFor="confirm_password">Re-Type Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="confirm_password" name="confirm_password" value={confirm_password} onChange={onChange}/>
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
                    <CLabel htmlFor="mobile">Mobile No.</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="mobile" name="mobile" value={mobile} onChange={onChange}/>
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
    </>
  )
}

export default AddUser
