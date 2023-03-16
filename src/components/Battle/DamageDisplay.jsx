import { forwardRef } from "react";

const DamageDisplay = forwardRef(({ isUser, value }, ref) => {
  const left = isUser ? "76%" : "34%";
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        backgroundColor: "transparent",
        color: "#ff1744",
        padding: "0",
        borderRadius: "0",
        fontSize: "60px",
        fontWeight: "bold",
        textShadow: "3px 3px #333",
        opacity: 0,
        left,
        top: "15%",
      }}
    >
      {value}
    </div>
  );
});

export default DamageDisplay;
