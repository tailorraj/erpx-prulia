import React , {useState} from 'react'
import Axios from 'axios';



const Input=(answer)=><span className="pdfInput" >{answer?answer:<span>N/A</span>}</span>

export default function Column(props) {

    const [Telco, setTelco] = useState("")
    
    const [Device, setDevice] = useState("")
    
    const [Plan, setPlan] = useState("")
if (props.sub_line.telco_name)
{Axios.get(`/api/resource/PRULIA%20Telco/${props.sub_line.telco_name}?fields=["telco_name","name"]`,{withCredentials:true}).then((res)=>{
        setTelco(res.data.data.telco_name)
    })}
    if (props.sub_line.device)
{Axios.get(`/api/resource/PRULIA%20Telco%20Devices/${props.sub_line.device}?fields=["device_name"]`,{withCredentials:true}).then((res)=>{
    setDevice(res.data.data.device_name)
})}
if (props.sub_line.telco_package_plan)
{
 Axios.get(`/api/resource/PRULIA%20Telco%20Package%20Plan/${props.sub_line.telco_package_plan}?fields=["package_title"]`,{withCredentials:true}).then((res)=>{
    setPlan(res.data.data.package_title)
})


}


console.log(props);

    return (
        <div class="col-md-3 add-column custom-md-3">
              <div class="row border-bottom">
						<div class="col-md-12 font-weight-bold">
                       Line {props.Index + 1}
						</div>
					</div>
        {/* <div class="row subline_border">
            <div class="col-md-12">
                 
         { Input(Telco)}
            </div>
        </div> */}
        <div class="row subline_border">
            <div class="col-md-12">
               {Input(Plan)}
            </div>
        </div>
        <div class="row subline_border" style={{minHeight:"50px"}}>
            <div class="col-md-12">
               {Input(Device)}
            </div>
        </div>
    
        <div class="row subline_border">
            <div class="col-md-12">
               {Input(props.sub_line.sub_line_name)}
            </div>
        </div>
        <div class="row subline_border">
            <div class="col-md-12">
               {Input(props.sub_line.sub_line_nric)}
            </div>
        </div>

        <div class="row newline-column mb-0">
            <div class="col-md-12">
            <div class="row" >
                    <div class="col-md-12" style={{height:'17px',minHeight:'17px'}}>
                

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                {Input(props.sub_line.last_4_1)}

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                    {Input(props.sub_line.last_4_2)}

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                    {Input(props.sub_line.last_4_3)}

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                  
                    {Input(props.sub_line.last_4_4)}

                    </div>
                </div>
            </div>
        </div>


   
        <div class="row .row-column-3">
            <div class="col-md-12">
            <div class="row" >
                    <div class="col-md-12" style={{height:'17px',minHeight:'17px'}}>
                   

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                   

{Input(props.sub_line.port_in_for)}
                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                    
                    {Input(props.sub_line.current_telco)}
                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                   
                    {Input(props.sub_line.port_in_mobile_no)}

                    </div>
                </div>
            </div>
        </div>

       
        <div class="row .row-column-3">
            <div class="col-md-12">
            <div class="row" >
                    <div class="col-md-12" style={{height:'17px',minHeight:'17px'}}>
                

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                        

{Input(props.sub_line.change_plan_for)}

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                  
           
{Input(props.sub_line.current_type_plan)}
                   
                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                    
                    
{Input(props.sub_line.change_mobile)}
                    
                    </div>
                </div>
            
                
            </div>


        </div>
        <div class="row border-bottom ">
						<div class="col-md-12 ">
                        {Input(props.sub_line.price)}
						</div>
					</div>
    </div>
    )
}
