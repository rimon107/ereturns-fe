import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CLabel,
  CSelect,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CInputRadio,
  CLink,
  CModal,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { loadInstitutes, loadBranches, loadInstituteUserCount } from "../../../actions/institute";
import { register } from "../../../actions/auth";


const Register = () => {
  const dispatch = useDispatch();
  const institutes = useSelector(state => state.institute.institutes)
  const branches = useSelector(state => state.institute.branches)
  const users = useSelector(state => state.institute.users)

  const [branch, setBranch] = useState(false);
  const [ho, setHo] = useState(false);
  const [sbsCode, setSbsCode] = useState(false);
  const [newBranch, setNewBranch] = useState(false);

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

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const { employee_name, password, confirm_password, 
    designation, department, email, mobile, phone, sbs_code,
    report_type, fi_id, branch_id } = formData;

  const [reportTypeBranchChecked, setReportTypeBranchChecked] = useState(false);
  const [reportTypeHOChecked, setReportTypeHOChecked] = useState(false);

  useEffect(() => {
    dispatch(loadInstitutes());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loadBranch = async event => {
    event.preventDefault();
    dispatch(loadBranches(event.target.value))
  }

  const loadUserCount = async (fi_id, branch_id) => {
    dispatch(loadInstituteUserCount(fi_id, branch_id))
  }

  const initializeReportType = () => {
    setReportTypeBranchChecked(false);
    setReportTypeHOChecked(false);
  }

  const onChange = e => {
    if(e.target.name==="fi_id"){
      if(e.target.value!=="DEFAULT"){
        loadBranch(e)
        loadUserCount(e.target.value, 0)
        initializeReportType()
        setHo(false);
        setBranch(false);
      } else {
        initializeReportType()
        setHo(false);
        setBranch(false);
      }
    }
    if(e.target.name==="branch_id"){
      if(e.target.value!=="DEFAULT"){
        loadUserCount(fi_id, e.target.value)
        onChangeBranch(e)
        setNewBranch(false);
      } else {
        setSbsCode(false)
        setNewBranch(false);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onChangeReportTypeBranch = e => {
    if(!fi_id){
      setModalData("Please select Bank/NBFI first.")
      setModal(true)
    } else{
      setReportTypeBranchChecked(true);
      setReportTypeHOChecked(false);
      setHo(false);
      setBranch(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  const onChangeReportTypeHO = e => {

    if(!fi_id){
      setModalData("Please select Bank/NBFI first.")
      setModal(true)
    } else {

      setReportTypeBranchChecked(false);
      setReportTypeHOChecked(true);

      setBranch(false);
      setSbsCode(false);
      setNewBranch(false);

      const ho_users = users? users["ho_users"] : -1
      if(ho_users===-1){
        setModalData("Data is not loaded correctly. Please try again.")
        setModal(true)
      }
      else if(ho_users> -1 && ho_users < 6){
        setHo(true);
        setFormData({ ...formData, [e.target.name]: e.target.value });
      } else {
        setModalData("Head Office user limit exceeded.")
        setModal(true)
      }
    }
  }

  const onChangeBranch = e => {
    setSbsCode(true);
  }

  const checkSbsCode = e => {
    let branch_info = branches.filter( br => br.id.toString()===branch_id.toString())
    if(sbs_code===branch_info[0].code.slice(-4)){
      const branch_users = users["branch_users"]
      const ho_users = users? users["ho_users"] : -1
      if(ho_users===-1){
        setModalData("Data is not loaded correctly. Please try again.")
        setModal(true)
      }
      else if(branch_users > -1 && branch_users < 1){
        setNewBranch(true)
      } else {
        setModalData("Branch user limit exceeded.")
        setModal(true)
        console.log("Branch user limit exceeded.")
      }
    } else{
      setModalData("Wrong SBS Code. Please Contact With the Authenticated Person.")
      setModal(true)
      setNewBranch(false)
    }
  }

  const onSubmit = async e => {
    e.preventDefault();

    if(!employee_name || !password || !email || !designation || !department ){

      return;

    } else {

      const financial_institute_type = 1
      dispatch(register(financial_institute_type, fi_id, branch_id, employee_name, password, designation, 
        department, email, mobile, phone, report_type));

      e.target.reset();
      setFormData({ ...formData,
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

      setBranch(false);
      setHo(false);
      setSbsCode(false);
      setNewBranch(false);
      setReportTypeBranchChecked(false);
      setReportTypeHOChecked(false);

      setModalData("Registration successful. Please contact Head Office admin user for your user activation and username.")
      setModal(true)

    }
  };

  const closeModal = ()=>{
    setModal(false);
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm  method="post" className="form-horizontal" onSubmit={onSubmit}>
                  <h1>Registration Form</h1>
                  <p className="text-muted">Create your account</p>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="fi_id">Bank / NBFI</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom name="fi_id" id="fi_id" value={fi_id} onChange={onChange}>
                        <option value="DEFAULT" key="0">Please select</option>
                        {
                          institutes?.map( (x) => 
                            <option key={x.id} value={x.id}>{x.name}</option>
                          )
                        }
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Report Type</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio1" name="report_type" checked={reportTypeBranchChecked} value="br_end_usr" onChange={onChangeReportTypeBranch}/>
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Branch End User</CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio custom id="inline-radio2" name="report_type" checked={reportTypeHOChecked} value="ho_end_usr" onChange={onChangeReportTypeHO}/>
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Head Office End User</CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>

                  {branch &&
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="branch_id">Branch</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom name="branch_id" id="branch_id" value={branch_id} onChange={onChange}>
                      <option value="DEFAULT" key="0">Please select</option>
                      {
                        branches?.map( (x) => 
                          <option key={x.id} value={x.id}>{x.name}</option>
                        )
                      }
                      </CSelect>
                    </CCol>
                  </CFormGroup>
                  }

                  {sbsCode &&
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="rit_frequency">SBS Code</CLabel>
                    </CCol>
                    <CCol xs="9" md="6">
                      <CInput id="sbs_code" name="sbs_code" type="text" placeholder="SBS Code" value={sbs_code} onChange={onChange}/>
                    </CCol>
                    <CCol xs="3" md="3">
                      <CButton type="button" color="primary" block onClick={checkSbsCode}>Check</CButton>
                    </CCol>
                  </CFormGroup>
                  }

                  {(ho || newBranch) &&
                  <CFormGroup row>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput required type="text" name="employee_name" placeholder="Employee Name" autoComplete="username" value={employee_name} onChange={onChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput required type="password" name="password" placeholder="Password" autoComplete="new-password" value={password} onChange={onChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput required type="password" name="confirm_password" placeholder="Repeat password" autoComplete="new-password" value={confirm_password} onChange={onChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-tag" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput required type="text" name="designation" placeholder="Designation" autoComplete="designation" value={designation} onChange={onChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-window-maximize" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput required type="text" name="department" placeholder="Department/Desk" autoComplete="department" value={department} onChange={onChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput required type="text" name="email" placeholder="Email" autoComplete="email" value={email} onChange={onChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-mobile" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name="mobile" placeholder="Mobile" autoComplete="mobile" value={mobile} onChange={onChange}/>
                    </CInputGroup>
                    <CInputGroup className="mb-1">
                      <CInputGroupPrepend>
                      <CInputGroupText>
                          <CIcon name="cil-phone" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" name="phone" placeholder="Phone" autoComplete="phone" value={phone} onChange={onChange}/>
                    </CInputGroup>
                  </CFormGroup>
                  }
                  <CButton type="submit" color="success" block>Create Account</CButton>
                </CForm>
                <CRow>
                  <CCol xs="12" className="text-right mt-3">
                    <p>User already esists? &nbsp;
                      <CLink to="/login" color="primary" active tabIndex={-1}>Login</CLink>
                    </p>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CModal
          size="sm"
          show={modal}
          onClose={closeModal}
          centered={true}
        >
          <CModalBody>
            {modalData}
          </CModalBody>
          <CModalFooter>
            <CButton
              color="success"
              onClick={closeModal}
            >Ok</CButton>
          </CModalFooter>
        </CModal>
        
      </CContainer>
    </div>
  )
}

export default Register
