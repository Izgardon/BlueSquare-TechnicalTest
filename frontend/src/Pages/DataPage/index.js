import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DataPage = () => {
  const [userDetails, setUserDetails] = useState({});

  const { state } = useLocation();

  useEffect(() => {
    setUserDetails(state);
    console.log(userDetails);
  }, [userDetails]);

  return <div>DataPage</div>;
};
