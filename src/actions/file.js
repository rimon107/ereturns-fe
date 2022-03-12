import api from "../utils/api";
import { FILE_UPLOAD, RIT_UPLOADED, RIT_UPLOAD_ERROR } from "../actiontypes";

export const setUploadData = (data) => async (dispatch, getState) => {
  console.log("setUploadData");
  dispatch({
    type: FILE_UPLOAD.DATA,
    payload: data,
  });
};

export const setUploadFile = (file) => async (dispatch, getState) => {
  console.log("setUploadFile");
  dispatch({
    type: FILE_UPLOAD.SET,
    payload: file,
  });
};

export const setUploadFileProgress =
  (id, progress) => async (dispatch, getState) => {
    dispatch({
      type: FILE_UPLOAD.PROGRESS,
      payload: {
        id,
        progress,
      },
    });
  };

export const successUploadFile = (id) => async (dispatch, getState) => {
  dispatch({
    type: FILE_UPLOAD.SUCCESS,
    payload: id,
  });
};

export const failureUploadFile = (id) => async (dispatch, getState) => {
  dispatch({
    type: FILE_UPLOAD.FAILURE,
    payload: id,
  });
};

export const resetUploadFileProgress = () => async (dispatch, getState) => {
  dispatch({
    type: FILE_UPLOAD.RESET,
  });
};

// Upload Rit
export const uploadRit = (files, data) => async (dispatch, getState) => {
  const token = getState().auth.access;
  files.forEach(async (_file) => {
    const file = _file.file;

    let form_data = new FormData();
    form_data.append("rit", data["rit"]);
    form_data.append(
      "financial_institute_type",
      data["financial_institute_type"]
    );
    form_data.append("financial_institute", data["financial_institute"]);
    form_data.append("branch", data["branch"]);
    form_data.append("department", data["department"]);
    form_data.append("base_date", data["base_date"]);
    form_data.append("file", file);
    form_data.append("uploaded_by", data["uploaded_by"]);
    form_data.append("status", data["status"]);
    form_data.append("prepared_by", data["prepared_by"]);
    form_data.append("phone", data["phone"]);

    try {
      await api
        .post("rit/upload/", form_data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progress) => {
            const { loaded, total } = progress;
            const percentageProgress = Math.floor((loaded / total) * 100);
            dispatch(setUploadFileProgress(_file.id, percentageProgress));
          },
        })
        .then((response) => {
          if (response.status === undefined) {
            const resp = response.response;
            if (resp.status === 500 || resp.status === 400) {
              dispatch(failureUploadFile());
              dispatch({
                type: RIT_UPLOAD_ERROR,
              });
            }
          } else {
            dispatch(successUploadFile(_file.id));
            dispatch(resetUploadFileProgress());
            dispatch({
              type: RIT_UPLOADED,
              payload: response.data,
            });
          }
        });
    } catch (err) {
      dispatch(failureUploadFile(_file.id));
      dispatch({
        type: RIT_UPLOAD_ERROR,
      });
    }
  });
};
