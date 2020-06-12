import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";

import { getData } from "./api";
import './app.css';

import { Routing } from './routing';

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData().then(setData);
}, []);
  return (
    <BrowserRouter>
      <Routing data={data}/>
    </BrowserRouter>
  );
}
