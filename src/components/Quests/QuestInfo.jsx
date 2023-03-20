const QuestInfo = ({ focus }) => {
  console.log(focus);
  return (
    <div className="quest-info">
      <div className="divDescription">
        <h3>Description:</h3>
        <div className="scrollable-content">
          <label>{focus.quest.description}</label>
        </div>
      </div>
      <div className="divRequeriments">
        <h5>REQUERIMENTS</h5>
        <div>
          <label>Amount NPC: </label>

          <span>
            {focus.npcKillAmount >= 0 && focus.npcKillAmount + "/"}
            {focus.quest.npcAmountNeed}
          </span>
        </div>
        <div>
          <label>User NPC:</label>
          <span>
            {focus.userKillAmount >= 0 && focus.userKillAmount + "/"}
            {focus.quest.userAmountNeed}
          </span>
        </div>
      </div>

      <div className="divRewards">
        <h5>REWARDS</h5>
        <div className="rewards">
          <div>
            <img className="me-2" src={require(`../../img/utilities/xp.webp`)} />
            <label>{focus.quest.giveExp}</label>
          </div>
          <div>
            <img className="me-2" src={require(`../../img/utilities/gold.webp`)} />
            <label>{focus.quest.giveGold.toLocaleString()}</label>
          </div>
          <div>
            <img className="me-2" src={require(`../../img/utilities/diamond.webp`)} />
            <label>{focus.quest.giveDiamonds.toLocaleString()}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestInfo;
