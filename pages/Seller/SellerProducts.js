import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleProduct from '../../components/singleProduct/SingleProduct'

export default function SellerProducts() {

  const [data, setData] = useState([])

  const getSellerProducts = async () => {

    try {
      let res = await axios.get('http://localhost:8000/service?role=seller', {
        headers: {
          authorization: localStorage.getItem('helperApp')
        }
      })
      setData(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  // console.log(data);

  useEffect(() => {
    getSellerProducts()
  }, []);

  return (
    <div style={{display: 'flex', flexDirection:'column', gap:'50px', marginTop:'5vh'}}>
      {
        data.map((ele, i) => {
          return <SingleProduct key={i} {...ele} />
        })
      }
    </div>
  )
}

