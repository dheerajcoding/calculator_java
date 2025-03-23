import { useState } from "react";
import "./CalculatorApp.css";

export default function CalculatorApp() {
  const [display, setDisplay] = useState("");
  const [customButtons, setCustomButtons] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "C", "="]);
  const [builderButtons, setBuilderButtons] = useState([]);

  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("");
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

   const handleDragStart = (e, btn) => {
    e.dataTransfer.setData("text/plain", btn);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedButton = e.dataTransfer.getData("text/plain");
    setBuilderButtons((prev) => [...prev, droppedButton]);
  };

  const handleDelete = (index) => {
    setBuilderButtons(builderButtons.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <h1 className="heading">Calculator App</h1>
    <br></br>
  <div className="calculator-container">
      {/* Calculator Buttons (Left Side) */}
      
      <div className="buttons-section">
       
        {customButtons.map((btn, index) => (
          <button
            key={index}
            className="calc-button" draggable="true"
            onDragStart={(e) => handleDragStart(e, btn)}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      
      </div>
      {/* Calculator Builder & Output (Right Side) */}
      <div className="builder-section" onDrop={handleDrop} 
      onDragOver={handleDragOver}>
        {/* Output Screen */}
        <div className="output-screen">
          {display || "0"}
        </div>
        <div className="dropped-buttons">
  {builderButtons.map((btn, index) => (
    <div key={index} className="builder-button-container">
      <button className="calculate-button" onClick={() => handleClick(btn)}>
        {btn}
      </button>
      <button className="delete-button" onClick={() => handleDelete(index)}>✖</button>
    </div>
  ))}
</div>

        </div>
      </div>
     
   
    </>
  );
}
