const Attack = ({ attackData }) => (
  <div
    style={{
      backgroundImage: `url(/img/utilities/sword.webp)`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      width: "8%",
      height: "15%",
      position: "absolute",
      transform: `rotate(${attackData.rotation}deg)`,
      left: attackData.x,
      top: attackData.y,
      opacity: attackData.opacity,
    }}
  />
);

export default Attack;
