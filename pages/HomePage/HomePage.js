import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Singlecard from "./Singlecard";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setorder] = useState(1);
  const [data, setData] = useState([]);
  const [filtering, setfiltering] = useState("");
  const getSellerProducts = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/service?role=buyer&query=${search}&order=${order}&filter=${filtering}`, {
        headers: {
          authorization: localStorage.getItem("helperApp"),
        },
      });
      setData(res.data);
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getSellerProducts();
    console.log(search);
    console.log(filtering);
  }, [search, order, filtering]);
  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} mt={"15px"}>
        <Input type={"text"} border={"1px solid black"} placeholder={"...Search Item"} w={"40%"} onChange={(e) => setSearch(e.target.value)} />
        <Select w={"auto"} onChange={(e) => setorder(Number(e.target.value))}>
          <option value="1">Low to High</option>
          <option value="-1">High to Low</option>
        </Select>
        <Select w={"auto"} onChange={(e) => setfiltering(e.target.value)}>
          <option value="management">management</option>
          <option value="computer">Computer</option>
          <option value="design & arts">Design and arts</option>
          <option value="construction">Construction</option>
          <option value="engineering">Engineering</option>
          <option value="languages">languages</option>
          <option value="legal service">legal service</option>
          <option value="marketing">marketing</option>
          <option value="social work">social work</option>
          <option value="sports">sports</option>
          <option value="transport">transport</option>
          <option value="retail & customer">retail & customer</option>
          <option value="other">other</option>
        </Select>
      </Box>
      {data.map((elem) => (
        <Singlecard key={elem._id} elem={elem} />
      ))}
    </Box>
  );
};

export default HomePage;
