"use client";

import { useState } from "react";
import { addSkillPoint } from "@/store/slice";
import { useDispatch, useSelector } from "react-redux";

export default function Test() {
  const [test, setTest] = useState("");

  const data = useSelector((state) => state.Slice.userData);
  const dispatch = useDispatch();

  const addSkill = () => {
    dispatch(addSkillPoint(test));
  };

  return (
    <div>
      <h2>Testing</h2>
      <h4>{data}</h4>
      <input type="text" value={test} onChange={(e) => setTest(e.target.value)} />
      <button onClick={addSkill}> Enviar </button>
    </div>
  );
}
