import React, { Component } from "react";
import Caro from "./components/Carousel";
import {Link} from "react-router-dom"
import Plan from "./components/Plan";
import Device from "./components/DeviceCard";
import Axios from "axios";
import Cookies from "js-cookie"
export default class home extends Component {
  constructor(props) {
    super(props);
    const telco = window.location.href.split("#/")[1];
    console.log(telco);
    this.state = {
      plan: [],
      devices: [],
      telco:"",reg_status:"" ,next_renew_date:""
    };
this.setState({
    telco:telco
})
localStorage.setItem('telco',telco);

Axios.get(`/api/resource/PRULIA%20Telco%20Connect/?filters=[["owner","=","${Cookies.get('user_id')}"],["telco_id","=","${telco}"]]&fields=["*"]`,{
  withCredentials:true
})
.then(res=>{
  
  this.setState({
    reg_status:res.data.data[0].reg_status,
    next_renew_date:res.data.data[0].next_renew_date,
  })
  
  
 
});

console.log(this.state);




Axios.get(`/api/resource/PRULIA%20Telco/${localStorage.getItem("telco")}?fields=["theme_colour"]`,{withCredentials:true}).then((res)=>{
  console.log(res.data.data.theme_colour);
  localStorage.setItem('theme_color',res.data.data.theme_colour);
})
    Axios.get(`/api/resource/PRULIA%20Telco%20Package%20Plan/?filters=[["telco_id","=","${telco}"]]&fields=["*"]`,
      {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res.data.data);
      this.setState({
        plan: res.data.data,
      });
    });

    Axios.get(`/api/resource/PRULIA%20Telco%20Devices/?filters=[["telco_id","=","${telco}"]]&fields=["*"]`,
      {
        headers: {
        
        },
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res.data.data);
      this.setState({
        devices: res.data.data,
      });
    }
    );
  }
  render() {
    const { plan, devices,reg_status ,next_renew_date} = this.state;
    if(reg_status==="Pending for approval"){
      return(
       <div class="bgimg">
      
       <div class="middle">
         <h1>Pending for Approval</h1>
         <hr />
         <p>Try Again after some time</p>
       </div>
     
     </div>
      )
    }
    else if(reg_status==='Approved')
    return(
     <div class="bgimg">
      
     <div class="middle">
       <h1>Approved</h1>
       <hr />
       <p>{next_renew_date}</p>
     </div>
   
   </div>
    )
 
    else
    return (
      <div>
 <Caro />
 <div className="home-body">
        <div id="plan">
          <center>
            <h2 class="text-white" id="plant">
              Plans
            </h2>
          </center>
        </div>
        <center>
          <h4 class="text-dark" id="cplant">
            Choose Plans
          </h4>
          <div class="card-deck">
            {plan.map((res) => (
              <Plan data={res} devices={devices} />
            ))}
          </div>
        </center>
        <div id="plan">
          <center>
            <h3 class="text-white" id="dplant">
              Devices
            </h3>
          </center>
        </div>

        <div class="Devicecard-deck row" id="devicedeck">
          {devices.map((res) => (
            <Device data={res} />
          ))}
        </div>
        </div>
      </div>
    );
  }
}
