import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { connect } from "react-redux";

const UploadSuccessError = ({ uploaded_rit }) => {
  return uploaded_rit ? (
    uploaded_rit.status === 1 ? (
      <CCol>
        <CCard>
          <CCardHeader>
            Upload
            <small> Success</small>
          </CCardHeader>
          <CCardBody>
            <CListGroup accent>
              <CListGroupItem accent="success" color="suceess">
                RIT Uploaded successfully
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    ) : (
      <CCol>
        <CCard>
          <CCardHeader>
            Upload
            <small> Failed</small>
          </CCardHeader>
          <CCardBody>
            <CListGroup accent>
              <CListGroupItem accent="danger" color="danger">
                RIT Upload Failed due to internal server error. Please contact
                Bangladesh Bank System Admin.
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    )
  ) : null;
};

const mapStateToProps = (state) => ({
  uploaded_rit: state.rit.uploaded_rit,
});

export default connect(mapStateToProps)(UploadSuccessError);
