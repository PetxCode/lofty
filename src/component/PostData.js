import React from "react";
import axios from "axios";

const url = "http://localhost:8080/api/multipleFiles";

const PostData = () => {
  const [postData, setPostData] = React.useState("");

  const postDataNow = async () => {
    const res = await axios.post(url);
  };

  return <div></div>;
};

export default PostData;
