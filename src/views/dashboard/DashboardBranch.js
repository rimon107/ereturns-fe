import React, { useEffect, useState } from 'react'
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
  CCardFooter,
  CListGroup,
  CListGroupItem,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { 
  loadRitFeatures, 
  loadRitFrequency, 
  uploadRit, 
  loadRitFileById,
  loadRitValidationDataByCode,
  useUploadForm
} from "../../actions/rit";
import { RIT_FEATURE_RESET, RIT_UPLOAD_RESET } from "../../actiontypes";
import { 
  basicValidation, 
  firstColumnValidate, 
  checkDateFormat, 
  checkCCY,
  checkFI,
  checkMeCoa,
  checkAmount,
  checkExchangeRate,
  checkOpenPositionLimit 
} from "../../utils/validation";
import { 
  DATE,
  CCY_ID,
  FI_ID,
  ME_COA,
  AMOUNT,
  EXCHANGE_RATE,
  OPEN_POSITION_LIMIT
 } from "../../utils/validationColumns";
import Papa from 'papaparse';


// const DashboardWidgetsDropdown = lazy(() => import('../widgets/DashboardWidgetsDropdown.js'))

const DashboardBranch = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const frequency = useSelector(state => state.rit.frequency)
  const features = useSelector(state => state.rit.features)
  const selected_rit = useSelector(state => state.rit.rit)
  const validation_data = useSelector(state => state.rit.validation_data)
  const uploaded_rit = useSelector(state => state.rit.uploaded_rit)

  const [formData, setFormData] = useState({
    rit_frequency: "", 
    rit: "", 
    base_date: "", 
    prepared_by: "", 
    phone_number: ""
  });

  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorList, setErrorList] = useState(null);
  const [modal, setModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressTime, setProgressTime] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const { rit_frequency, rit, base_date, prepared_by, phone_number } = formData;

  const onChange = e => {
    if(e.target.name==="rit_frequency"){
      if(e.target.value!=="DEFAULT"){
        loadRit(e)
      }
    }
    if(e.target.name==="rit"){
      if(e.target.value!=="DEFAULT"){
        loadRitDetails(e)
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    
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

  const loadRitDetails = async event => {
    event.preventDefault();
    dispatch(loadRitFileById(event.target.value))
    dispatch(loadRitValidationDataByCode(event.target.value))
  }
 
  const showError = (data) => {
    console.log("show error")
  }

  const { isSuccess, uploadForm, progress } = useUploadForm();

  const finalSubmit = () => {
    console.log("final submit")
    const time = new Date(); 
    const date = base_date+"T"+time.getHours() + ":"+time.getMinutes() + ":"+time.getSeconds() + "+06:00";
    let form_data = new FormData();
    form_data.append('rit', rit);
    form_data.append('financial_institute_type', user.financial_institute_type.id);
    form_data.append('financial_institute', user.financial_institute.id);
    form_data.append('branch', user.branch.id);
    form_data.append('department', user.department);
    form_data.append('base_date', date);
    form_data.append('file', file, file.name);
    form_data.append('uploaded_by', user.id);
    form_data.append('status', 1);
    form_data.append('prepared_by', prepared_by);
    form_data.append('phone', phone_number);

    // dispatch(uploadRit(form_data));
    dispatch(uploadForm(form_data));
    console.log(progress);
    setProgressTime(progress)

    // setFile(null);

    // e.target.reset();
    // setFormData({ ...formData, 
    //   base_date: "", 
    //   prepared_by: "", 
    //   phone_number: "" 
    // });
  }

  const processError = errors => {
    return errors?.map((error, index) => 
              <CListGroupItem key={index} accent="danger" color="danger">{error}</CListGroupItem>
            )

  }

  const checkInitialValidation = () => {

    let result = {}
    let errors = []
    let error_msg;
    let is_valid = true;

    if(!rit_frequency){
      is_valid = false
      error_msg = "Please select RIT Frequency."
      errors.push(error_msg)
    } else {
      if(rit_frequency.toString()==="DEFAULT"){
        is_valid = false
        error_msg = "Please select RIT Frequency."
        errors.push(error_msg)
      }
    }

    if(!rit){
      is_valid = false
      error_msg = "Please select RIT Name."
      errors.push(error_msg)
    } else {
      if(rit.toString()==="DEFAULT"){
        is_valid = false
        error_msg = "Please select RIT Name."
        errors.push(error_msg)
      }
    }

    if(!base_date){
      is_valid = false
      error_msg = "Please select Reporting Date."
      errors.push(error_msg)
    }

    if(!file){
      is_valid = false
      error_msg = "Please upload file."
      errors.push(error_msg)
    } else {
      if(file.size >= 1024*1024*1024){
        error_msg = "File size is too large. Please upload files below 1GB!."
        errors.push(error_msg)
      }
    }

    if(!prepared_by){
      is_valid = false
      error_msg = "Please provide Prepared By Name"
      errors.push(error_msg)
    }

    if(!phone_number){
      is_valid = false
      error_msg = "Please provide Mobile/Phone no."
      errors.push(error_msg)
    } else {
      const format = new RegExp(/^\d+$/)
      if(!format.test(phone_number.toString())){
        is_valid = false
        error_msg = "Please provide valid Mobile/Phone no."
        errors.push(error_msg)
      }
    }

    result["is_valid"] = is_valid
    result["errors"] = errors
    
    return result
  }

  const progressTimer = () => {
    let counter = 1;
    let end_counter = 1;

    // 317963006
    console.log(file.size.toString())
    console.log(file.size.toString().length)

    const size_length = file.size.toString().length
    let speed;
    if(size_length<6){
      speed = 1
    } else if(size_length>=6 && size_length<=7) {
      speed = 10
    }
    else if(size_length>7) {
      speed = 10
    }
    const divide_by = Math.pow(10, (size_length-1))
    const step = Math.ceil(file.size/divide_by)
    console.log(step)
    
    const step_time = speed * 100

    const timeout = 600000
    const start_time = performance.now();
    let end_time;

    const interval = setInterval(() => {
        end_counter++
        if(end_counter%step===0){
          counter++
          console.log("counter: "+counter)
          setProgressTime(counter)
        }

        console.log(uploaded_rit)
        if(uploaded_rit){
          clearInterval(interval);
          setProgressTime(0)
          setShowProgress(false)
          if(uploaded_rit.status===0){
            setUploadStatus("error")
          } else {
            setUploadStatus("success")
          }
        }

        end_time = performance.now();
        if(end_time-start_time>timeout) {
          clearInterval(interval);
          setProgressTime(0)
          setShowProgress(false)
          setUploadStatus("error")
        }
    }, step_time);
  }

  const notFound = (column) => {
    console.log("Validation is not implemented for column "+column+" yet.")
  }

  const onSubmit = async e => {
    e.preventDefault();

    setUploadStatus(null)
    dispatch({ type: RIT_UPLOAD_RESET })
    setShowProgress(true)
    finalSubmit()
    // progressTimer()

    // e.preventDefault();
    // setIsError(false)

    // let errors;

    // const init_result = checkInitialValidation()
    // if(!init_result.is_valid){
    //   setIsError(true)
    //   errors = processError(init_result.errors)
    //   setErrorList(errors)
    // } else {
    //   setIsError(false)
    
    //   const data = basicValidation(user.financial_institute.code, 
    //     user.branch.code, selected_rit, base_date, file)

    //   // console.log(data)
    //   if(!data.is_valid) {
    //     setIsError(true)
    //     errors = processError(data.errors)
    //     setErrorList(errors)
    //   } else {
    //     setIsError(false)
    //     let error_list = []

    //     if(!selected_rit.validate) {
    //       Papa.parse(file, {
    //         complete: function(results) {
    //           let is_valid = true
    //           let result = {}
    //           const data = results.data

    //           let first_column_result = firstColumnValidate(user.financial_institute.code,
    //             user.branch.code, selected_rit, data[0])
    //           if(!first_column_result.is_valid) {
    //             is_valid = false
    //             error_list.push(...first_column_result.errors)
    //           }

    //           const columns = data[1]
    //           const validate_data = data.slice(2,data.length+1)

    //           columns.forEach((element, index) => {
    //             if(element.toString()===DATE) {
    //               const date_result = checkDateFormat(base_date, index, validate_data)
    //               if(!date_result.is_valid) {
    //                 is_valid = false
    //                 error_list.push(...date_result.errors)
    //               }
    //             }
    //             if(element.toString()===CCY_ID) {
    //               const ccy_result = checkCCY(index, validate_data, validation_data["currency"])
    //               if(!ccy_result.is_valid) {
    //                 is_valid = false
    //                 error_list.push(...ccy_result.errors)
    //               }
    //             }
    //             if(element.toString()===FI_ID) {
    //               const fi_result = checkFI(user.financial_institute.code, index, validate_data)
    //               if(!fi_result.is_valid) {
    //                 is_valid = false
    //                 error_list.push(...fi_result.errors)
    //               }
    //             }
    //             if(element.toString()===ME_COA) {
    //               const mecoa_result = checkMeCoa(index, validate_data, validation_data["coa"])
    //               if(!mecoa_result.is_valid) {
    //                 is_valid = false
    //                 error_list.push(...mecoa_result.errors)
    //               }
    //             }
    //             if(element.toString()===AMOUNT) {
    //               const amount_result = checkAmount(index, validate_data)
    //               if(!amount_result.is_valid) {
    //                 is_valid = false
    //                 error_list.push(...amount_result.errors)
    //               }
    //             }
    //             if(element.toString()===EXCHANGE_RATE) {
    //               const exchange_rate_result = checkExchangeRate(index, validate_data)
    //               if(!exchange_rate_result.is_valid) {
    //                 is_valid = false
    //                 error_list.push(...exchange_rate_result.errors)
    //               }
    //             }
    //             if(element.toString()===OPEN_POSITION_LIMIT) {
    //               const open_position_limit_result = checkOpenPositionLimit(index, validate_data)
    //               if(!open_position_limit_result.is_valid) {
    //                 is_valid = false
    //                 error_list.push(...open_position_limit_result.errors)
    //               }
    //             }
    //           })

    //           if(is_valid){
    //             setIsError(false)
    //             finalSubmit()
    //           } else {
    //             setIsError(true)
    //             errors = processError(error_list)
    //             setErrorList(errors)
    //             showError(result)
    //           }

    //         }
    //       });
    //     } else {
    //       finalSubmit()
    //     }
    //   }
    // }
  }

  const error = (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Error
            <small> List</small>
          </CCardHeader>
          <CCardBody>
            <CListGroup accent>
              {errorList}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )

  const uploadSuccess = (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Upload
            <small> Status</small>
          </CCardHeader>
          <CCardBody>
            <CListGroup accent>
              <CListGroupItem accent="success" color="success">Upload Successful.</CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )

  const uploadError = (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
          Upload
            <small> Status</small>
          </CCardHeader>
          <CCardBody>
            <CListGroup accent>
              <CListGroupItem accent="danger" color="danger">Upload Unsuccessful. Please try again.</CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )

  return (
    <>
      {
        isError? error : null
      }
      {
        uploadStatus? uploadStatus==="success"? uploadSuccess: uploadError : null
      }
      {
        showProgress?
        <CCard>
        <CCardHeader>
          Upload
          <small> Progress</small>
        </CCardHeader>
        <CCardBody>
          <CProgress animated value={progressTime} className="mb-3" />
        </CCardBody>
      </CCard> : null
      }
      <CRow>
        <CCol lg={9}>
        <CForm id="upload_form" method='POST' encType="multipart/form-data" className="form-horizontal" onSubmit={onSubmit}>
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
                    <CSelect defaultValue={'DEFAULT'} custom name="rit_frequency" id="rit_frequency" onChange={onChange}>
                      <option value="DEFAULT" key="0" disabled={false}>Please select</option>
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
                    <option value="DEFAULT" key="0" disabled={false}>Please select</option>
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
                    <CLabel htmlFor="base_date">Reporting Date</CLabel>
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
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone_number">Phone Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="phone_number" name="phone_number" value={phone_number} onChange={onChange} />
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
