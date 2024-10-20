import React, { useState } from "react";
import axios from "axios";
import { queryApi } from "sec-api";
import { useDispatch } from "react-redux";
import { updateUserInput } from "../../redux/apiSlice";

const HomeInput = () => {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateUserInput({ userInput: input }));
  };
  return (
    <div className="home-input-wrapper">
      <input
        type="text"
        value={input}
        onChange={handleInput}
        className="home-input"
      />
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default HomeInput;
