import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { app } from "./base";
import firebase from "firebase";

const memories = app.firestore().collection("Memories");

const Home = () => {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [thumbs, setThumbs] = useState(false);
  const [data, setData] = useState([]);

  const handleClick = async () => {
    await memories.doc().set({
      memory: text,
      thumb: done,
      createdAt: Date.now().toString(),
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText("");
  };

  const deleteThumbs = async (id) => {
    await memories.doc(id).delete();
  };

  const updateThumbs = async (id) => {
    await memories.doc(id).update({
      thumb: thumbs,
    });
  };

  const readData = async () => {
    await memories.onSnapshot((snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({ ...doc.data(), id: doc.id });
      });
      setData(r);
      console.log(data);
    });
  };

  useEffect(() => {
    readData();
  }, []);

  return (
    <div>
      <div>
        <div
          style={{
            width: "300px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            marginLeft: "40px",
          }}
        >
          <Input
            placeholder="Enter your Memories"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <Button
            style={{
              marginLeft: "10px",
            }}
            onClick={() => {
              handleClick();
              console.log("Tapped");
              console.log(text);
            }}
          >
            Enter
          </Button>
        </div>
      </div>

      <div
        style={{
          marginTop: "50px",
          marginLeft: "50px",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <div>Reading Back End</div>
        <div>
          {data.map(({ id, memory, thumb, timeStamp, createdAt }) => (
            <div
              key={id}
              style={{
                display: "flex",
                width: "500px",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setThumbs(!thumbs);
                  console.log("tapped: ", id);
                  // console.log(thumbs);
                  updateThumbs(id);
                }}
              >
                {thumb ? <div> ???? </div> : <div> ???? </div>}
              </div>
              <div> {memory} </div>
              <Button
                onClick={() => {
                  deleteThumbs(id);
                }}
              >
                {" "}
                Delete{" "}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
