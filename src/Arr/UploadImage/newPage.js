import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { app } from "../../base";

const up = app.firestore().collection("image");

const NewPage = () => {
  const { id } = useParams();
  const [getDetails, setGetDetails] = useState();

  const getDetailData = async () => {
    const dataFile = await up.doc(id).get();
    setGetDetails(dataFile.data());
    console.log(getDetails);
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <div>
      <div>Details Page</div>
      <div>id: {id}</div>

      <div> {getDetails && getDetails.title} </div>
    </div>
  );
};

export default NewPage;
