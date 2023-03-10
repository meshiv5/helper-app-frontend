import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleProduct from "../../components/singleProduct/SingleProduct";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { HStack, Spacer, Toast, useToast, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { EDITDETAILS } from "../../redux/authReducer/auth.actionTypes";
import { useRouter } from "next/router";
import styles from "../../styles/Seller/Seller.module.css";

export default function SellerProducts() {
  const [data, setData] = useState([]);
  const toast = useToast();
  const [del, setDel] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const getSellerProducts = async () => {
    try {
      let res = await axios.get(`${process.env.server}service?role=seller`, {
        headers: {
          authorization: localStorage.getItem("helperApp"),
        },
      });
      setData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  // console.log(data);

  useEffect(() => {
    getSellerProducts();
  }, [del]);

  const handleDelete = async (id) => {
    let res = await axios.delete(`${process.env.server}service/${id}`, {
      headers: {
        authorization: localStorage.getItem("helperApp"),
      },
    });
    if (res.data === "Service deleted") {
      setDel((c) => c + 1);
      toast({
        title: "Success.",
        description: "Service Successfully Deleted.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (ele) => {
    dispatch({ type: EDITDETAILS, payload: ele });
    router.push("/EditPost");
  };

  return (
    <div className={styles.back}>
      <div className={styles.parent} style={{ minHeight: "100vh" }}>
        {data.map((ele, i) => {
          return (
            <div key={i} style={{ backgroundColor: "white", borderRadius: "8px" }}>
              <HStack>
                <SingleProduct {...ele} />
                <Spacer />
                <VStack style={{ padding: "20px" }}>
                  <AiFillEdit onClick={() => handleEdit(ele)} />
                  <AiOutlineDelete onClick={() => handleDelete(ele._id)} />
                </VStack>
              </HStack>
            </div>
          );
        })}
      </div>
    </div>
  );
}
