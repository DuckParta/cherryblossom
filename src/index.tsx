import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { Action, ThunkDispatch, configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/reducers';
import { useDispatch } from 'react-redux';
import { RootState } from './features/reducers';

const store = configureStore({ 
  reducer: rootReducer,
});

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
import App from './app/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
