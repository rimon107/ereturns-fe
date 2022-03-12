import { FILE_UPLOAD, LOGOUT_SUCCESS } from "../actiontypes";
import { modifyFiles } from "../utils/file";

const initialState = {
  data: null,
  fileProgress: {},
};

export const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOAD.SET:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          ...modifyFiles(state.fileProgress, action.payload),
        },
      };
    case FILE_UPLOAD.DATA:
      return {
        ...state,
        data: action.payload,
      };
    case FILE_UPLOAD.PROGRESS:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload.id]: {
            ...state.fileProgress[action.payload.id],
            progress: action.payload.progress,
          },
        },
      };
    case FILE_UPLOAD.SUCCESS:
      return {
        ...state,
        fileProgress: {
          ...state.fileProgress,
          [action.payload]: {
            ...state.fileProgress[action.payload],
            status: 1,
          },
        },
      };
    // case FILE_UPLOAD.FAILURE:
    // return {
    //   ...state,
    //   fileProgress: {
    //     ...state.fileProgress,
    //     [action.payload]: {
    //       ...state.fileProgress[action.payload],
    //       status: 0,
    //       progress: 0,
    //     },
    //   },
    // }
    case FILE_UPLOAD.FAILURE:
    case FILE_UPLOAD.RESET:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        data: null,
        fileProgress: {},
      };
    default:
      return state;
  }
};
