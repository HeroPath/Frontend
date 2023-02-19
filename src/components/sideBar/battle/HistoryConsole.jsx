import React from "react";
import { capitalizeFirstLetter } from "../../../functions/utilities";

const HistoryConsole = ({ username, level, stage, winnerBattle, finishBattle, npcName }) => {
  let i = 1;

  return (
    <div className="rounds--console">
      <div className="history-box">
        {finishBattle && winnerBattle && (
          <ul className="round winner">
            <h6>Final</h6>
            <div>
              <li>Winner: {capitalizeFirstLetter(winnerBattle.Win)}</li>
              <li>Loser: {capitalizeFirstLetter(winnerBattle.Lose)}</li>
              {winnerBattle.ExperienceWin && <li>Experience gained: {winnerBattle.ExperienceWin.toLocaleString()}</li>}
              {winnerBattle.GoldWin && <li>Gold won: {winnerBattle.GoldWin.toLocaleString()}</li>}

              {winnerBattle.DiamondsWin && <li>Diamond won: {winnerBattle.DiamondsWin}</li>}
              {winnerBattle.LevelUP === true && <li>Congratulations, you have reached level {level}</li>}
            </div>
          </ul>
        )}
        {stage.length >= 1 &&
          stage?.map((rounds) => (
            <ul key={i++} className="round">
              <h6>Round: {rounds.round}</h6>
              <div>
                {rounds.AttackerLife !== 0 && (
                  <li>
                    {username} attacked {npcName} for {rounds.AttackerDmg.toLocaleString()} dmg. ({npcName} life:{" "}
                    {rounds.NpcLife.toLocaleString()})
                  </li>
                )}

                {rounds.NpcLife !== 0 && (
                  <li>
                    {npcName} attacked {username} for {rounds.NpcDmg.toLocaleString()} dmg. ({username} life:{" "}
                    {rounds.AttackerLife.toLocaleString()})
                  </li>
                )}
              </div>
            </ul>
          ))}
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
