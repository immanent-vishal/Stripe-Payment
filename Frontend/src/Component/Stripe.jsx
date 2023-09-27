import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Stripe() {

  const navigate = useNavigate();


  async function buttonHandler(){
    try {

      const result = await axios.post("http://10.1.2.45:8585/create-checkout-session");
      if(result){
        console.log(location);
       navigate();
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
  <>
    <h1>Hello</h1>


    <button onClick={buttonHandler}>Make Payment</button>


  </>
  )
}
