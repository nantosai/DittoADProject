import React from "react";
import Feature from "./Feature";

function App() {
  return (
    <div className="App">
      <header style={headerStyle}>
        <h1>Car Painting Appointment System</h1>
      </header>
      <main style={mainStyle}>
        <Feature />
      </main>
      <footer style={footerStyle}>
        <p>© {new Date().getFullYear()} Car Painting Service. All rights reserved.</p>
      </footer>
    </div>
  );
}

const headerStyle = {
  backgroundColor: "#2E3B4E",
  color: "#FFFFFF",
  padding: "20px",
  textAlign: "center",
};

const mainStyle = {
  padding: "20px",
  display: "flex",
  justifyContent: "center",
};

const footerStyle = {
  marginTop: "20px",
  backgroundColor: "#2E3B4E",
  color: "#FFFFFF",
  padding: "10px",
  textAlign: "center",
};

export default App;
