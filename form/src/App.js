import React from "react";
import Board from "./components/board/Board";
const App = () => {
  const [formData, setFormData] = React.useState([]);
  React.useEffect(() => {
    if (localStorage.getItem("formData")) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
    }
  }, []);
  return (
    <div>
      <Board formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default App;
