import React from "react";

const UserCard = ({
  username,
  aclass,
  hp,
  maxHp,
  experience,
  experienceToNextLevel,
  level,
}) => {
  return (
    <div className="userCard--card">
      <h4 className="p-1">{username}</h4>
      <img
        src={require("../img/class/mage.jpg")}
        width="250px"
        height="315px"
        alt=""
      />
      <label>
        Hp: {hp}/{maxHp}
      </label>
      <label>
        Exp: {experience}/{experienceToNextLevel}
      </label>
      <label>Level: {level}</label>
      <label>Class: {aclass.name}</label>
    </div>
  );
};

export default UserCard;
