import {
  SET
} from '../actiontypes';

const initialState = {
  sidebarShow: 'responsive'
}

export const coreReducer =  (state = initialState,  action)  =>  {
  switch (action.type) {
    case SET:
      const payload = action.sidebarShow;
      return {
        ...state,
        sidebarShow: payload
      };
    default:
      return state;
  }
}




