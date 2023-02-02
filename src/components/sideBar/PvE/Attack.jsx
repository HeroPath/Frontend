import { useState } from "react";

const Attack = ({ id, initialState }) => {
  const [state, setState] = useState(initialState);
  return (
    <div
      id={id}
      style={{
        backgroundImage: `url(${require("../../img/utilities/sword.webp")})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        width: "12%",
        height: "22%",
        position: "absolute",
        transform: `rotate(${state.rotation}deg)`,
        left: state.x,
        top: state.y,
      }}
    />
  );
};
