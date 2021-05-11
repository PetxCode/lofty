import React, { useState, useEffect } from "react";
import Axios from "axios";

const url = "http://localhost:8080/api/getMultipleFiles";
const url1 = "https://jsonplaceholder.typicode.com/users";

const GetData = () => {
  const [newData, setNewData] = useState([]);

  const getAxios = async () => {
    const res = await Axios.get(url);
    setNewData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getAxios();
  }, []);

  return (
    <div>
      <div>Get Data1</div>
      <div>
        {newData.map((item, i) => (
          <div key={i}>
            <div> {item.title} </div>
            <div>
              {item.files.map((file) => (
                <img
                  alt={`http://localhost:8080/${file.fileName}`}
                  src={`http://localhost:8080/${file.filePath}`}
                  style={{
                    width: "150px",
                    height: "90px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetData;
