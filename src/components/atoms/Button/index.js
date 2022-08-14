import React from "react";

const Button = ({ title, loading }) => {
  return loading ? (
    <button className="btn disable" type="submit">
      loading ...
    </button>
  ) : (
    <button className="btn" type="submit">
      {title}
    </button>
  );
};

export default Button;
