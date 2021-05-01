import React, { Component } from 'react'
import Axios from 'axios'
import Carousel from "./components/Carousel";
import "./test.css"
export default class getpage extends Component {
  constructor(props){
    super(props)
    this.state={
      data:[],
      plan:[],
      devices:[]

    };
    const telco  = this.props.data.location.hash.split("#/")[1];;
    console.log(telco);
  //   Axios.get(`/api/resource/PRULIA%20Telco/PTEL001`,{
     
  //     headers:{
  //       // "Access-Control-Allow-Origin": "*",
  //       // 'Access-Control-Allow-Credentials':true
       
  //     }
  //     ,
  //     withCredentials: true,

  // })
  
  //   .then(res=>{
  //     console.log(res.data.data.telco_photo_slider)
  //     this.setState({
  //       data:res.data.data.telco_photo_slider
  //     })
  //   })
  //   Axios.get(`/api/resource/PRULIA%20Telco%20Package%20Plan/?filters=[["telco_name","=","PTEL001"]]&fields=["*"]`,{
  //     headers:{
  //       // 'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //     ,withCredentials:true
  //   })
  //   .then(res=>{
  //     console.log(res.data.data)
  //     this.setState({
  //       plan:res.data.data
  //     })
  //   })
  //   Axios.get(`/api/resource/PRULIA%20Telco%20Devices/?filters=[["telco_name","=","PTEL001"]]&fields=["*"]`,{
  //     headers:{
  //       // 'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //     ,withCredentials:true
  //   })
  //   .then(res=>{  
  //     console.log(res.data.data)
  //     this.setState({
  //       devices:res.data.data
  //     })
  //   })
   }
  render() {
    const {data,plan,devices}=this.state
    return (
      <div>
this
<Carousel id={this.props} />
this
{/* 
        {data.map(data=>(
          <div>
            <img src={`http://167.99.77.197/${data.t_photo}`} class="d-block img-fluid" id='caroimg' alt="..."/>
          </div>
        ))}
        {plan.map(data=>(
          <div>
           <h2>{data.package_title}</h2>
           <h2 class='bg-white' id='rm'>{data.package_sub_title2}</h2>
          </div>
        ))}
        {devices.map(data=>(
          <div>
             <p class="card-title font-weight-bold " dangerouslySetInnerHTML={{__html:data.device_content}}></p>
          </div>
        ))} */}
      </div>
    )
  }
}
