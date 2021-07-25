import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesPage from './screens/MoviesPage'
import { FirebaseAppProvider } from "reactfire";
import { createStore } from "redux";
import allReducers from "./redux/indexReducers"
import { Provider } from "react-redux";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

var firebaseConfig = {
  apiKey: "AIzaSyBIKxSA4ofOGxMNn4Eh6oSwCyT0z8PYIlg",
  authDomain: "top10movies-c3c84.firebaseapp.com",
  projectId: "top10movies-c3c84",
  storageBucket: "top10movies-c3c84.appspot.com",
  messagingSenderId: "330323595306",
  appId: "1:330323595306:web:18489e892e8718aeee7353",
  measurementId: "G-XDCSRT9HW3"
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        {/* <App /> */}
        <MoviesPage />
      </FirebaseAppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
