import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLazyGetDataQuery } from "../../redux/testingApi";

const HomeApiResults = () => {
  const userInput = useSelector((state) => state.userInput.userInput);
  const [trigger, { data, isSuccess }] = useLazyGetDataQuery();
  const rowRef = useRef([]);
  const columnRef = useRef(null);
  const handleIndApiWrapper = (idx) => {
    console.log(rowRef.current[idx]);
  };
  const [columnNames, setColumnNames] = useState([]);
  useEffect(() => {
    if (userInput !== "") {
      trigger(userInput);
    }
  }, [userInput]);
  useEffect(() => {
    if (data) {
      // alter width to each be the same size according to largest child
      const maxWidth = Math.max(
        ...rowRef.current.map((child) => child.offsetWidth)
      );
      rowRef.current.forEach((child) => {
        child.style.width = `${maxWidth}px`;
      });
      // return all column names
      const addColumnNames = (obj) => {
        for (const key in obj) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            addColumnNames(obj[key]);
          } else {
            setColumnNames((prev) => [...prev, key]);
          }
        }
      };
      addColumnNames(data[0]);
      // column ref is equal to row ref
      columnRef.current.style.width = `${maxWidth}px`;
    }
  }, [isSuccess]);
  return (
    <div className="home-api-results-wrapper">
      {data && (
        <div className="column-names-wrapper" ref={columnRef}>
          {columnNames?.map((name, idx) => {
            return (
              <div className="column-name-ind-wrapper">
                <p key={idx} style={{ color: "white" }}>
                  {name}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {data &&
        data?.map((item, idx) => {
          return (
            <div
              className="api-ind-wrapper"
              ref={(el) => (rowRef.current[idx] = el)}
              onClick={() => handleIndApiWrapper(idx)}
              key={`wrapper ${idx}`}
            >
              <div
                className="api-ind-overflow-wrapper"
                style={{
                  backgroundColor:
                    idx % 2 === 1 ? "rgb(15,15,15)" : "rgb(25,25,25)",
                }}
              >
                <ApiResults item={item} key={idx} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

const ApiResults = ({ item }) => {
  return (
    <>
      {Object.entries(item).map(([key, value]) =>
        typeof value === "object" ? (
          <ApiResults item={value} key={key} />
        ) : (
          <div className="key-value-wrapper" key={value}>
            <p style={{ color: "white" }}>{value}</p>
          </div>
        )
      )}
    </>
  );
};

export default HomeApiResults;
