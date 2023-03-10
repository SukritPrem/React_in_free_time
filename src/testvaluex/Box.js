import React from "react";

export default function Box(props) {
  console.log(props.id);
  const styles = {
    backgroundColor: props.on ? "#222222" : "transparent"
  };

  return (
    <div
      style={styles}
      className="box"
      onClick={() => props.toggle(props.id)}
    ></div>
  );
}
