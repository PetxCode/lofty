import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { app } from "../base";

const up = app.firestore().collection("image");
const Image = () => {
  const [img, setImg] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [title, setTitle] = useState("");

  const bringImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    setImg(await fileRef.getDownloadURL());
  };

  const uploadFile = async () => {
    await up.doc().set({
      title,
      avatar: img,
      createdAt: Date.now().toLocaleString(),
    });
  };

  const getData = async () => {
    await up.onSnapshot((snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({ ...doc.data(), id: doc.id });
      });
      setFileData(r);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        margin: "20px",
      }}
    >
      <div>Import Image</div>
      <div>
        <Input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{
            width: "300px",
          }}
        />
        <Input
          type="file"
          placeholder="Enter Title"
          onChange={bringImage}
          style={{
            width: "300px",
          }}
        />
      </div>
      <Button
        onClick={() => {
          uploadFile();
        }}
      >
        Submit
      </Button>

      <div>
        <div>
          {fileData.map(({ id, avatar, title }) => (
            <div key={id}>
              <div>{title}</div>
              <Link
                style={{
                  cursor: "pointer",
                }}
                to={`/${id}`}
              >
                <img
                  src={avatar}
                  alt={title}
                  style={{
                    width: "200px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    // cursor: "pointer",
                  }}
                />{" "}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Image;
