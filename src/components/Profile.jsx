import React, {useEffect} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "./styles/styles.css";
import war from "./class/war.jpg";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const cookies = new Cookies();
    const headers = {
        "content-type": "application/json",
        Authorization: "Bearer " + cookies.get("token"),
    };
    const [profile, setProfile] = React.useState({});
    const navigate = useNavigate();

    async function handleData() {
        await axios
            .get("http://localhost:8000/api/v1/users/profile", {headers})
            .then(async (response) => {
                if (response.status === 200) {
                    setProfile(response.data);
                }
            });
    }

    async function handleSubmit(e) {
        e.preventDefault();

    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div className="profile">
            <h1 className="titleProfile">Character stats</h1>
            <section className="firstSection">
                <div className="firstSection--card">
                    <label>{profile.username}</label>
                    <img src={war} width="250px" height="315px"/>
                    <label>
                        ☼{profile.gold} || ♦{profile.diamond}
                    </label>
                    <label>Level: {profile.level}</label>
                    <label>Class: {profile.aclassName}</label>
                    <label>Role: {profile.roleName}</label>
                    <label>
                        Hp: {profile.hp}/{profile.maxHp}
                    </label>
                    <label>
                        Exp: {profile.experience}/{profile.experienceToNextLevel}
                    </label>
                </div>
                <button className="firstSection--arrow">➤</button>
            </section>
            <section className="secondSection">
                <div className="secondSection--title">
                    <h3>Stats</h3>
                </div>
                <div className="secondSection--form">
                    <label>Skill points: {profile.freeSkillPoints}</label>
                    <label>Strength (STR): {profile.strength}</label>
                    <label>Dexterity (DEX): {profile.dexterity}</label>
                    <label>Vitality (INT): {profile.vitality}</label>
                    <label>Intelligence: {profile.intelligence}</label>
                    <label>Critical Chance: {profile.luck}%</label>
                    <label>
                        Min/Max DMG: {profile.minDmg}/{profile.maxDmg}
                    </label>
                    <div>
                        <button>Add stats</button>
                    </div>
                </div>
            </section>
            <form onSubmit={handleSubmit}>
                <button className="btn btn-dark m-2" type="submit" onClick={async () => {
                    await axios
                        .post("http://localhost:8000/api/v1/users/attack-npc/2", {headers})
                        .then((response) => {
                            console.log(response);
                            if (response.status === 200) {
                                // navigate("/playervsnpc");
                            }
                        }).catch((error) => {
                            console.log(error)
                        });
                }}>
                    PvE
                </button>
            </form>
        </div>
    );
};

export default Profile;
