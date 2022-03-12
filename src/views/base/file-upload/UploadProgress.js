import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { size, toArray } from "lodash";
import UploadItem from "./UploadItem";
import { uploadRit } from "../../../actions/file";

const UploadProgress = (props) => {
  const dispatch = useDispatch();
  const { fileProgress } = props;
  const uploadedFileAmount = size(fileProgress);
  const data = useSelector((state) => state.file.data);

  useEffect(() => {
    const fileToUpload = toArray(fileProgress).filter(
      (file) => file.progress === 0
    );
    dispatch(uploadRit(fileToUpload, data));
  }, [uploadedFileAmount]); // eslint-disable-line react-hooks/exhaustive-deps

  return uploadedFileAmount > 0 ? (
    <CCard>
      <CCardHeader>
        Upload
        <small> Progress</small>
      </CCardHeader>
      <CCardBody>
        {size(fileProgress)
          ? toArray(fileProgress).map((file) => (
              <UploadItem key={file.id} file={file} />
            ))
          : null}
      </CCardBody>
    </CCard>
  ) : null;
};

const mapStateToProps = (state) => ({
  fileProgress: state.file.fileProgress,
});

export default connect(mapStateToProps)(UploadProgress);
