import React, { useState, useEffect } from "react";
import { app } from "../base";
import firebase from "firebase";
import { Alert, Button, Input } from "antd";
import world from "./country.json";
import GetData from "./GetData";

const memories = app.firestore().collection("dropdown");

const Moving = () => {
  const [pustIt, setPustIt] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [study, setStudy] = useState([
    { id: 1, name: "ReactJS" },
    { id: 1, name: "MongoDB" },
    { id: 1, name: "NodeJS" },
    { id: 1, name: "Javascript" },
  ]);

  const [arr, setArr] = useState([
    { id: 1, name: "king" },
    { id: 2, name: "master" },
    { id: 3, name: "lisa" },
    { id: 4, name: "ion" },
    { id: 5, name: "jim" },
    { id: 6, name: "gowtham" },
    { id: 1, name: "jam" },
    { id: 1, name: "lol" },
    { id: 2, name: "kwick" },
    { id: 3, name: "april" },
    { id: 7, name: "sss" },
    { id: 8, name: "brace" },
    { id: 8, name: "peiter" },
    { id: 5, name: "hey" },
    { id: 6, name: "mkl" },
    { id: 9, name: "melast" },
    { id: 9, name: "imlast" },
    { id: 10, name: "glow" },
    { id: 11, name: "king" },
    { id: 12, name: "glow" },
  ]);
  const [comp, setComp] = useState([]);

  const word = require("./country.json");

  const [wordy, setWordy] = useState(world);

  const pustUp = async () => {
    await memories.doc().set({
      memory: pustIt,
      createdAt: Date.now().toString(),
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    alert(`your selection: ${pustIt} has been update`);
    setPustIt("game");
  };

  const getUnique = (arr, comp) => {
    // store the comparison  values in array
    const unique = arr
      .map((e) => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  };

  // console.log(getUnique(arr, "id"));

  const getUniqueName = getUnique(arr, "name");

  return (
    <div
      style={{
        marginLeft: "50px",
      }}
    >
      <select
        value={pustIt}
        onChange={(e) => {
          setPustIt(e.target.value);
        }}
      >
        <option value="game"> game </option>

        <option value="laptop"> laptop </option>

        <option value="mouse"> mouse </option>

        <option value="tv"> tv </option>
      </select>
      <Button
        onClick={() => {
          console.log(pustIt);
          pustUp();
        }}
      >
        {" "}
        Push{" "}
      </Button>

      <div>
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          {world.world.map(({ id, country }) => (
            <option key={id} value={country}>
              {country}
            </option>
          ))}
        </select>
        <Button
          onClick={() => {
            console.log(country);
          }}
        >
          Enter
        </Button>
      </div>

      <div>
        <select
          value={name}
          onChange={(e) => {
            setArr(e.target.value);
          }}
        >
          {getUniqueName.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>

        <Button
          onClick={() => {
            console.log(name);
          }}
        >
          Enter
        </Button>
      </div>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <GetData />
      </div>
    </div>
  );
};

export default Moving;
