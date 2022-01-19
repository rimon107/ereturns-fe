import React, { lazy, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  CInputFile,
  CSelect,
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { loadRitFeatures, loadRitFrequency, uploadRit } from "../../actions/rit";
import { RIT_FEATURE_RESET } from "../../actiontypes";
import { validate } from "../../utils/validation";


// const DashboardWidgetsDropdown = lazy(() => import('../widgets/DashboardWidgetsDropdown.js'))

const DashboardBranch = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const frequency = useSelector(state => state.rit.frequency)
  const features = useSelector(state => state.rit.features)

  const [formData, setFormData] = useState({
    rit: "", 
    base_date: "", 
    prepared_by: "", 
    phone_number: ""
  });

  const [file, setFile] = useState(null);

  const { rit, base_date, prepared_by, phone_number } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch({ type: RIT_FEATURE_RESET });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(loadRitFrequency());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loadRit = async event => {
    event.preventDefault();
    dispatch(loadRitFeatures(event.target.value))
  }

  const onSubmit = async e => {
    
    e.preventDefault();
    const time = new Date(); 
    const date = base_date+"T"+time.getHours() + ":"+time.getMinutes() + ":"+time.getSeconds() + "+06:00";
    let form_data = new FormData();
    form_data.append('rit', rit);
    form_data.append('financial_institute_type', user.financial_institute_type.id);
    form_data.append('financial_institute', user.financial_institute.id);
    form_data.append('branch', user.branch.id);
    form_data.append('department', user.department.id);
    form_data.append('base_date', date);
    form_data.append('file', file, file.name);
    form_data.append('uploaded_by', user.id);
    form_data.append('status', 1);
    form_data.append('prepared_by', prepared_by);
    form_data.append('phone', phone_number);


    validate(file)
    // dispatch(uploadRit(form_data));



    e.target.reset();
    setFormData({ ...formData, 
      base_date: "", 
      prepared_by: "", 
      phone_number: "" 
    });

    // setLoading(false)
  };

  return (
    <>
      {/* <DashboardWidgetsDropdown /> */}
      <CRow>
        <CCol lg={9}>
        <CForm id="upload_form" method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={onSubmit}>
          <CCard>
            <CCardHeader>
              Upload
              <small> File</small>
            </CCardHeader>
            <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="rit_frequency">RIT Frequency</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={'DEFAULT'} custom name="rit_frequency" id="rit_frequency" onChange={loadRit}>
                      <option value="DEFAULT" key="0" disabled={true}>Please select</option>
                      {
                        frequency?
                        Object.keys(frequency).map(function(key) {
                          return <option value={key} key={key}>{frequency[key]}</option>
                        }):""
                      }
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="rit">RIT Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect defaultValue={'DEFAULT'} custom name="rit" id="rit"  onChange={onChange}>
                    <option value="DEFAULT" key="0" disabled={true}>Please select</option>
                      {
                        features?.map( (x) => 
                          <option key={x.id} value={x.id}>{x.name}</option>
                        )
                      }
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="base_date">Reporting Base Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" value={base_date} onChange={onChange} id="base_date" name="base_date" />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CLabel col md="3" htmlFor="file">File input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file" onChange={(e)=>{setFile(e.target.files[0])}} name="file" />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prepared_by">Prepared By</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="prepared_by" name="prepared_by" value={prepared_by} onChange={onChange}/>
                    {/* <CFormText>This is a help text</CFormText> */}
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone_number">Phone Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="phone_number" name="phone_number" value={phone_number} onChange={onChange} />
                    {/* <CFormText>This is a help text</CFormText> */}
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

export default DashboardBranch
