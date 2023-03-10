import { useState } from "react";

export default function ButtonHooksComponent() {
  const [isClicked, setIsClicked] = useState(false);

  let cssProperties = {};
  let btnText = "Click me!";
  if (isClicked) {
    btnText = "Hello World!";
    cssProperties["--btn-bg-color"] = "#1780cc";
    cssProperties["--btn-color"] = "#ff9900";
  }

  return (
    <>
      <div className="container" style={cssProperties}>
        <h2>Using React Hooks:</h2>
        <button
          className="btn"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          {btnText}
        </button>
      </div>
      <div className="maintest">
        <div className="test">
          <div>x</div>
          <div>x</div>
          <div>x</div>
          <div>x</div>
        </div>
      </div>
    </>
  );
}
