import React from "react";

//bootstrap column 
function Col(props) {
  const size = props.size
    .split(" ")
    .map(size => "col-" + size)
    .join(" ");

  return <div className={size} {...props} />;
}

export default Col;