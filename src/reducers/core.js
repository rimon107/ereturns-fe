import {
  SET
} from '../actiontypes';

const initialState = {
  sidebarShow: 'responsive'
}

export const coreReducer =  (state = initialState,  action)  =>  {
  switch (action.type) {
    case SET:
      // console.log(action.sidebarShow);
      // const payload = (action.sidebarShow==="responsive"? false:"responsive");
      // console.log(payload);
      const payload = action.sidebarShow;
      return {
        ...state,
        sidebarShow: payload
      };
    default:
      return state;
  }
}




