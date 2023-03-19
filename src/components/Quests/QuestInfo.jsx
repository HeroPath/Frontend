const QuestInfo = ({ focus }) => {
  return (
    <div className="quest-info">
      <div className="divDescription">
        <h3>Description:</h3>
        <div className="scrollable-content">
          <h5>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ipsam ea placeat cupiditate,
            accusantium tempora rerum ipsa, quaerat nam adipisci labore magnam voluptatum nemo commodi asperiores iusto
            velit? Tempore dolorem beatae atque eos omnis sequi sint inventore minus animi unde a iusto doloremque
            maxime aut error asperiores pariatur dicta nulla alias, ipsum magni doloribus earum hic iure. Praesentium
            sed unde vero amet porro quam eos distinctio reiciendis perspiciatis libero, odit placeat similique debitis
            non nihil atque dolore harum corporis enim quae iste commodi temporibus. Error odio consectetur obcaecati.
            Excepturi dolores facere mollitia distinctio vero similique fuga modi non perspiciatis eligendi!
          </h5>
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
