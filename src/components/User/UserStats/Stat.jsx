const Stat = ({ firstStatName, FirstStatValue, secondStatName, secondStatValue, handleClickAddSkill }) => {
  return (
    <div className="userstats--stats">
      <div className="userstats--labels">
        <div className="userstats--firstStat">
          <label>{firstStatName}:</label>
          <span>{FirstStatValue}</span>
        </div>
        <div className="userstats--secondStat">
          <label>{secondStatName}:</label>
          <span>{secondStatValue}</span>
        </div>
      </div>

      <div className="userstats--add--form">
        <a
          className="links"
          onClick={() => {
            handleClickAddSkill(firstStatName);
          }}
        >
          +
        </a>
      </div>
    </div>
  );
};

export default Stat;
