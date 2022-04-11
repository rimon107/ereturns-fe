import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
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
  CCardFooter,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  loadRitFeatures,
  loadRitFrequency,
  loadRitDetailsByCode,
  loadRitValidationDataByCode,
} from "../../actions/rit";
import { setUploadFile, setUploadData } from "../../actions/file";
import {
  RIT_FEATURE_RESET,
  RIT_UPLOAD_RESET,
  RIT_FILE_RESET,
  RIT_VALIDATION_RESET,
  FILE_UPLOAD,
} from "../../actiontypes";
import { basicValidation, dataValidation } from "../../utils/validation";
import UploadProgress from "../base/file-upload/UploadProgress";
import UploadSuccessError from "../base/file-upload/UploadSuccessError";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const DashboardBranch = ({
  auth: { user },
  rit: { frequency, features, selected_rit, validation_data },
  loadRitFeatures,
  loadRitFrequency,
  loadRitDetailsByCode,
  loadRitValidationDataByCode,
  setUploadFile,
  setUploadData,
}) => {
  const dispatch = useDispatch();
  const selectRitRef = useRef();
  const selectFrequencyRef = useRef();
  const [formData, setFormData] = useState({
    rit_frequency: null,
    rit: null,
    base_date: "",
    prepared_by: "",
    phone_number: "",
  });

  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorList, setErrorList] = useState(null);
  const [modal, setModal] = useState(false);

  const { rit_frequency, rit, base_date, prepared_by, phone_number } = formData;

  const onChange = (e) => {
    if (e.target.name === "rit") {
      if (e.target.value !== "DEFAULT") {
        loadRitDetails(e);
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeFrequency = (e) => {
    const name = "rit_frequency";
    if (e !== null) {
      loadRit(e.value);
    }
    setFormData({ ...formData, [name]: e ? e.value : null });
  };

  const onChangeFeature = (e) => {
    const name = "rit";

    if (e !== null) {
      loadRitDetails(e.value);
    }

    setFormData({ ...formData, [name]: e ? e.value : null });
  };

  useEffect(() => {
    dispatch({ type: RIT_FEATURE_RESET });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadRitFrequency();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch({ type: RIT_UPLOAD_RESET });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadRit = (value) => {
    clearRitValue();
    loadRitFeatures(value);
  };

  const loadRitDetails = (value) => {
    setModal(true);
    loadRitDetailsByCode(value);
    loadRitValidationDataByCode(value).then((res) => setModal(false));
  };

  const clearRitValue = () => {
    if (selectRitRef !== undefined) {
      selectRitRef.current.select.clearValue();
    }

    if (selectFrequencyRef !== undefined) {
      selectFrequencyRef.current.select.clearValue();
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const finalSubmit = async (e) => {
    console.log("final submit");
    setModal(false);
    const time = new Date();
    const date =
      base_date +
      "T" +
      time.getHours() +
      ":" +
      time.getMinutes() +
      ":" +
      time.getSeconds() +
      "+06:00";

    let data = {};
    data["rit"] = selected_rit.id;
    data["financial_institute_type"] = user.financial_institute_type.id;
    data["financial_institute"] = user.financial_institute.id;
    data["branch"] = user.branch.id;
    data["department"] = user.department;
    data["base_date"] = date;
    data["uploaded_by"] = user.id;
    data["status"] = 1;
    data["prepared_by"] = prepared_by;
    data["phone"] = phone_number;

    setUploadData(data);
    setUploadFile(file);

    e.target.reset();
    setFormData({
      ...formData,
      rit_frequency: null,
      rit: null,
      base_date: "",
      prepared_by: "",
      phone_number: "",
    });

    clearRitValue();

    setFile(null);
    setIsError(false);
    setErrorList(null);
    dispatch({
      type: RIT_FEATURE_RESET,
    });
    dispatch({
      type: RIT_FILE_RESET,
    });
    dispatch({
      type: RIT_VALIDATION_RESET,
    });
  };

  const processError = (errors) => {
    return errors?.map((error, index) => (
      <CListGroupItem key={index} accent="danger" color="danger">
        {error}
      </CListGroupItem>
    ));
  };

  const checkInitialValidation = () => {
    let result = {};
    let errors = [];
    let error_msg;
    let is_valid = true;

    if (!rit_frequency) {
      is_valid = false;
      error_msg = "Please select RIT Frequency.";
      errors.push(error_msg);
    } else {
      if (rit_frequency.toString() === "DEFAULT") {
        is_valid = false;
        error_msg = "Please select RIT Frequency.";
        errors.push(error_msg);
      }
    }

    if (!rit) {
      is_valid = false;
      error_msg = "Please select RIT Name.";
      errors.push(error_msg);
    } else {
      if (rit.toString() === "DEFAULT") {
        is_valid = false;
        error_msg = "Please select RIT Name.";
        errors.push(error_msg);
      }
    }

    if (!base_date) {
      is_valid = false;
      error_msg = "Please select Reporting Date.";
      errors.push(error_msg);
    }

    if (!file) {
      is_valid = false;
      error_msg = "Please upload a file.";
      errors.push(error_msg);
    } else {
      const _file = file[0];
      if (!_file) {
        is_valid = false;
        error_msg = "Please upload a file.";
        errors.push(error_msg);
      } else {
        if (_file.size >= 1024 * 1024 * 1024) {
          error_msg = "File size is too large. Please upload files below 1GB!.";
          errors.push(error_msg);
        }
      }
    }

    if (!prepared_by) {
      is_valid = false;
      error_msg = "Please provide Prepared By Name";
      errors.push(error_msg);
    }

    if (!phone_number) {
      is_valid = false;
      error_msg = "Please provide Mobile/Phone no.";
      errors.push(error_msg);
    } else {
      const format = new RegExp(/^\d+$/);
      if (!format.test(phone_number.toString())) {
        is_valid = false;
        error_msg = "Please provide valid Mobile/Phone no.";
        errors.push(error_msg);
      }
    }

    result["is_valid"] = is_valid;
    result["errors"] = errors;

    return result;
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: RIT_UPLOAD_RESET });
    dispatch({ type: FILE_UPLOAD.RESET });

    setModal(true);

    await sleep(2000);

    setIsError(false);
    let errors;
    const init_result = checkInitialValidation();

    if (!init_result.is_valid) {
      setIsError(true);
      errors = processError(init_result.errors);
      setErrorList(errors);
      setModal(false);
    } else {
      setIsError(false);

      const _file = file[0];
      const data = basicValidation(
        user.financial_institute.id,
        user.branch.id,
        selected_rit,
        base_date,
        _file
      );

      if (!data.is_valid) {
        setIsError(true);
        errors = processError(data.errors);
        setErrorList(errors);
        setModal(false);
      } else {
        setIsError(false);
        if (selected_rit.validate) {
          await dataValidation(
            user,
            _file,
            base_date,
            selected_rit,
            validation_data,
            (result) => {
              if (result["is_valid"]) {
                setIsError(false);
                finalSubmit(e);
              } else {
                setIsError(true);
                errors = processError(result["errors"]);
                setErrorList(errors);
                setModal(false);

                e.target.reset();
                setFormData({
                  ...formData,
                  rit_frequency: null,
                  rit: null,
                  base_date: "",
                  prepared_by: "",
                  phone_number: "",
                });

                clearRitValue();

                setFile(null);
                // setIsError(false);
                // setErrorList(null);
                dispatch({
                  type: RIT_FEATURE_RESET,
                });
                dispatch({
                  type: RIT_FILE_RESET,
                });
                dispatch({
                  type: RIT_VALIDATION_RESET,
                });
              }
            }
          );
        } else {
          finalSubmit(e);
        }
      }
    }
  };

  const error = (
    <CCol>
      <CCard>
        <CCardHeader>
          Error
          <small> List</small>
        </CCardHeader>
        <CCardBody>
          <CListGroup accent>{errorList}</CListGroup>
        </CCardBody>
      </CCard>
    </CCol>
  );

  return (
    <>
      <UploadProgress />

      <CRow>
        <CCol lg={7}>
          <CForm
            id="upload_form"
            method="POST"
            encType="multipart/form-data"
            className="form-horizontal"
            onSubmit={onSubmit}
          >
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
                    <Select
                      ref={selectFrequencyRef}
                      name="rit_frequency"
                      id="rit_frequency"
                      options={frequency}
                      onChange={onChangeFrequency}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="rit">RIT Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <Select
                      ref={selectRitRef}
                      name="rit"
                      id="rit"
                      options={features}
                      onChange={onChangeFeature}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="base_date">Reporting Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="date"
                      value={base_date}
                      onChange={onChange}
                      id="base_date"
                      name="base_date"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CLabel col md="3" htmlFor="file">
                    File input
                  </CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile
                      id="file"
                      name="file"
                      onChange={(e) => {
                        setFile(e.target.files);
                      }}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="prepared_by">Prepared By</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="prepared_by"
                      name="prepared_by"
                      value={prepared_by}
                      onChange={onChange}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="phone_number">Phone Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="phone_number"
                      name="phone_number"
                      value={phone_number}
                      onChange={onChange}
                    />
                  </CCol>
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary">
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
              </CCardFooter>
            </CCard>
          </CForm>
        </CCol>
        {isError ? error : null}
        <UploadSuccessError />
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
    </>
  );
};

DashboardBranch.propTypes = {
  loadRitFeatures: PropTypes.func.isRequired,
  loadRitFrequency: PropTypes.func.isRequired,
  loadRitDetailsByCode: PropTypes.func.isRequired,
  loadRitValidationDataByCode: PropTypes.func.isRequired,
  setUploadFile: PropTypes.func.isRequired,
  setUploadData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  rit: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  rit: state.rit,
});

export default connect(mapStateToProps, {
  loadRitFeatures,
  loadRitFrequency,
  loadRitDetailsByCode,
  loadRitValidationDataByCode,
  setUploadFile,
  setUploadData,
})(DashboardBranch);
