const QuestInfo = ({ focus }) => {
  return (
    <div className="quest-info">
      <div className="divDescription">
        <h3>Description:</h3>
        <div className="scrollable-content">
          <h5>{focus.quest.description}</h5>
        </div>
      </div>
      <div className="divRewards">
        <h3>Rewards</h3>
        <div>
          <li>Experience: {focus.quest.giveExp}</li>
          <li>Gold: {focus.quest.giveGold}</li>
          <li>Diamond: {focus.quest.giveDiamonds}</li>
        </div>
      </div>
    </div>
  );
};

export default QuestInfo;
