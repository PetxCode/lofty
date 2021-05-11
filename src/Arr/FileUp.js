import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { app } from "../base";

const push = app.firestore().collection("places");
const FileUp = () => {
  const [saveFile, setSaveFile] = useState("");
  const [getFile, setGetFile] = useState([]);

  const onPush = async () => {
    await push.doc().set({
      file: saveFile,
      createdAt: Date.now().toString(),
    });
    setSaveFile("Home");
  };

  const getData = async () => {
    await push.onSnapshot((snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({ ...doc.data(), id: doc.id });
      });
      setGetFile(r);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>This is the push file</div>
      <div>
        <select
          value={saveFile}
          onChange={(e) => {
            setSaveFile(e.target.value);
          }}
        >
          <option value="Home">Home</option>
          <option value="School">School</option>
          <option value="Church">Church</option>
          <option value="Market">Market</option>
          <option value="Classes">Classes</option>
        </select>
        <Button
          onClick={() => {
            console.log(saveFile);
            onPush();
          }}
        >
          Submit
        </Button>
      </div>
      <div>
        {getFile.map(({ file, id }) => (
          <div key={id}>
            <div> {file} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUp;
