import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RoutesContainer from "./RoutesContainer";
import { Toaster } from "react-hot-toast";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#837F7F",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: "green",
              color: "#fff",
            },
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "red",
              color: "#fff",
            },
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
      <RoutesContainer />
    </div>
  );
}

export default App;
