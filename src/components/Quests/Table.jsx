const Table = ({ quests, focus, setNameQuest, setFocus }) => {
  let questNumber = 1;

  return (
    <table className="quests-tables">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Target</th>
          <th>Req NPC</th>
          <th>Req User</th>
        </tr>
      </thead>
      <tbody>
        {quests?.map((quest, index) => (
          <tr
            key={index}
            className={`${focus === index ? "active" : ""} ${
              quest.npcKillAmount === quest.quest.npcAmountNeed && quest.userKillAmount === quest.quest.userAmountNeed
                ? "questComplete"
                : ""
            }`}
            onClick={() => {
              setNameQuest(quest.quest.name);
              setFocus(index);
            }}
          >
            <td>{questNumber++}</td>
            <td>{quest.quest.name}</td>
            <td>{quest.quest.nameNpcKill}</td>
            {quest.npcKillAmount >= 0 ? (
              <>
                <td>
                  {quest.npcKillAmount} / {quest.quest.npcAmountNeed}
                </td>
                <td>
                  {quest.userKillAmount} / {quest.quest.userAmountNeed}
                </td>
              </>
            ) : (
              <>
                <td>{quest.quest.npcAmountNeed}</td>
                <td>{quest.quest.userAmountNeed}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
