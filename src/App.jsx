import React from "react";
import "./Pages/main.css";
import "typeface-roboto";
import { Provider } from "react-redux";
import configureStore from "./Store/configureStore.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Components/Router.jsx";

const { store, persistor } = configureStore();

class App extends React.Component {
  // history {..props}
  render() {
    return (
      <>
        {/* store imporditud store'i failist */}
        <ToastContainer
          enableMultiContainer
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <Provider store={store}>
          {/* andmete edastus */}
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default App;
