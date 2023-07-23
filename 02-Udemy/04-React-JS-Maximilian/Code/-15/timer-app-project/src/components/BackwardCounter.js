import React from "react";
import useCounter from "../Hooks/use-counter";

import Card from "./Card";

const BackwardCounter = () => {
  const counter = useCounter(false);
  return <Card>{counter}</Card>;
};

export default BackwardCounter;
