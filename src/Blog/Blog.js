import React, { useState, useEffect, useContext } from "react";
import { app } from "../base";
import moment from "moment";
import { Link } from "react-router-dom";
import { AppContext } from "../StateManagement/StateManagement";

const blog = app.firestore().collection("blog");
const Blog = () => {
  const [postBlog, setPostBlog] = useState([]);
  const { store } = useContext(AppContext);

  const getData = async () => {
    await blog.onSnapshot((snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({ ...doc.data(), id: doc.id });
      });
      setPostBlog(r);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      style={{
        marginTop: "40px",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Read all blog : {store}
      </div>
      <div>
        {postBlog.map(({ id, avatar, title, story, createdAt, timer }) => (
          <div key={id}>
            <div>
              <Link to={`/${id}`}>
                <img
                  src={avatar}
                  alt={title}
                  style={{
                    width: "300px",
                    height: "250px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "300px",
              }}
            >
              <div
                style={{
                  marginLeft: "40px",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginRight: "40px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {moment(timer).fromNow()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
