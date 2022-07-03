import React from "react";

const PvPBattle = () => {
  return (
    <div className="battle">
      <div className="battle--usercard">
        {profile.aclass && (
          <UserCard
            key={profile.username}
            username={profile.username}
            aclass={profile.aclass}
            hp={profile.hp}
            maxHp={profile.maxHp}
            experience={profile.experience}
            experienceToNextLevel={profile.experienceToNextLevel}
            level={profile.level}
          />
        )}
      </div>
      {/* <div className="battle--usercard">
        <NpcCard />
      </div> */}

      <div className="rounds--console">
        <div className="history-box">
          {battleData?.map((rounds) => (
            <ul key={i++} className="round">
              <h6>Round: {rounds.round}</h6>
              <div>
                <li>
                  {profile.username} has attacked {npcName} for {rounds.userDmg}{" "}
                  damage. ({npcName} has {rounds.NpcLife} life)
                </li>
                <li>
                  {npcName} has attacked {profile.username} for {rounds.npcDmg}
                  damage. ({profile.username} has {rounds.userLife} life)
                </li>
              </div>
            </ul>
          ))}
          {winnerBattle && (
            <ul className="round winner">
              <h6>Final</h6>
              <div>
                <li>Winner: {winnerBattle.win}</li>
                <li>Loser: {winnerBattle.lose}</li>
                {winnerBattle.userExperienceGain && (
                  <li>Experience gained: {winnerBattle.userExperienceGain}</li>
                )}
                <li>Gold won: {winnerBattle.goldAmountWin}</li>
                {winnerBattle.diamondsAmonutWin && (
                  <li>Diamond won: {winnerBattle.diamondsAmonutWin}</li>
                )}
                {winnerBattle.levelUp === true && (
                  <li>
                    Congratulations, you have reached level {profile.level}
                  </li>
                )}
              </div>
            </ul>
          )}
        </div>
        <a href="/profile" className="button--links links m-2 pe-5 ps-5">
          Profile
        </a>
      </div>
    </div>
  );
};

export default PvPBattle;
