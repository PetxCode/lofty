import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { app } from "../base";

const blog = app.firestore().collection("blog");
const DetailedPage = () => {
  const { id } = useParams();

  const [lib, setLib] = useState([]);

  const getData = async () => {
    const blogData = await blog.doc(id).get();
    setLib(blogData.data());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>Here is the Detailed Page: {id}</div>

      <div>
        <img
          src={lib.avatar}
          alt=""
          style={{
            width: "500px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
      <div>{lib && lib.title}</div>
      <div>{lib && lib.story}</div>
    </div>
  );
};

export default DetailedPage;
