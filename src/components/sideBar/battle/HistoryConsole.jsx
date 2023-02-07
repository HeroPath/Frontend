import React from "react";

const HistoryConsole = ({ profile, stage, winnerBattle, finishBattle, npcName }) => {
  let i = 1;

  return (
    <div className="rounds--console">
      <div className="history-box">
        {stage.length >= 1 &&
          stage?.map((rounds) => (
            <ul key={i++} className="round">
              <h6>Round: {rounds.round}</h6>
              <div>
                {rounds.AttackerLife !== 0 && (
                  <li>
                    {profile.username} attacked {npcName} for {rounds.AttackerDmg.toLocaleString()} dmg. ({npcName}{" "}
                    life: {rounds.NpcLife.toLocaleString()})
                  </li>
                )}

                {rounds.NpcLife !== 0 && (
                  <li>
                    {npcName} attacked {profile.username} for {rounds.NpcDmg.toLocaleString()} dmg. ({profile.username}{" "}
                    life: {rounds.AttackerLife.toLocaleString()})
                  </li>
                )}
              </div>
            </ul>
          ))}
        {finishBattle && winnerBattle && (
          <ul className="round winner">
            <h6>Final</h6>
            <div>
              <li>Winner: {winnerBattle.Win}</li>
              <li>Loser: {winnerBattle.Lose}</li>
              {winnerBattle.ExperienceWin && <li>Experience gained: {winnerBattle.ExperienceWin.toLocaleString()}</li>}
              {winnerBattle.GoldWin && <li>Gold won: {winnerBattle.GoldWin.toLocaleString()}</li>}

              {winnerBattle.DiamondsWin && <li>Diamond won: {winnerBattle.DiamondsWin}</li>}
              {winnerBattle.LevelUP === true && <li>Congratulations, you have reached level {profile.level}</li>}
            </div>
          </ul>
        )}
      </div>
      <div className="rounds--console--buttons">
        <a href="/profile" className="button--links links">
          Profile
        </a>
        <a href="/zone" className="button--links links">
          Zone
        </a>
      </div>
    </div>
  );
};

export default HistoryConsole;
