import React, { useState } from "react";
import axios from "axios";
import { queryApi } from "sec-api";
import { useDispatch } from "react-redux";
import { updateUserInput } from "../../redux/apiSlice";

const HomeInput = ({ updateInitialSubmit }) => {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateUserInput({ userInput: input }));
    updateInitialSubmit();
  };
  return (
    <>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            handleClick(e);
          }
        }}
        className="home-input"
        placeholder="endpoint, enter."
      />
      <button
        onClick={handleClick}
        disabled={!input}
        className="home-input-btn"
      >
        &#x2191;
      </button>
    </>
  );
};

export default HomeInput;
