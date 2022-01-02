import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import StateLoader from "./utils/statePersist"
import throttle from 'lodash/throttle';

const stateLoader = new StateLoader();

const middleware = [thunk];

const store = createStore(
  rootReducer,
  stateLoader.loadState(),
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(throttle(() => {
  stateLoader.saveState(store.getState());
}, 1000));


export default store;
