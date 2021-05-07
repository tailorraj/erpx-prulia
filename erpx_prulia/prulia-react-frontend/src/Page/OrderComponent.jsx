import React , {useEffect} from 'react'
import Order from "./Order";
import Axios from "axios"; 
import Cookies from "js-cookie";
export default function Test() {
  useEffect(() => {
    window.scrollTo(0,0)
  });
  return (
    <Order />
  )
}
