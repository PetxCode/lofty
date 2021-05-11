import { Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { app } from "../base";
import firebase from "firebase";

const blog = app.firestore().collection("blog");
const PostBlog = () => {
  const [postBlog, setPostBlog] = useState([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [img, setImg] = useState(null);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImg(await fileRef.getDownloadURL());
  };

  const pushUpload = async () => {
    await blog.doc().set({
      title,
      story,
      avatar: img,
      createdAt: Date.now().toLocaleString(),
      time: Date.now().toString(),
      timer: firebase.firestore.FieldValue.serverTimestamp(),
    });
    window.location.reload();
  };

  return (
    <div>
      <div>Post Blog</div>
      <div
        style={{
          width: "300px",
        }}
      >
        <Input type="file" onChange={uploadImage} />
        <Input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{
            marginTop: "20px",
          }}
        />
        <Input
          type="text"
          placeholder="story"
          value={story}
          onChange={(e) => {
            setStory(e.target.value);
          }}
          style={{
            marginTop: "20px",
          }}
        />
        <Button disabled={false} onClick={pushUpload}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PostBlog;
