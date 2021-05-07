
import Column from "./column";
import "./style.css"

import React, { Component } from 'react'

export default class subline_table extends Component {
constructor(props){
    super(props)
   global.add=0

   this.pricing()
   this.props.get(global.add)
}
pricing(){
    this.props.sub_line.map(data=>{
        console.log(data.price)
        global.add=global.add+Number(data.price)
    })
}

	render() {
		const Subline = this.props.sub_line
        console.log(Subline);
      
        console.log(global.add)
       
		return (
			<div class="row ml-3">
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-3 custom-md-3">
				
                    <div class="row border-bottom ">
						<div class="col-md-12 font-weight-bold">
                        Information
						</div>
					</div>
				
					<div class="row subline_border">
						<div class="col-md-12">
                        Telco Package Plan
						</div>
					</div>
					<div class="row subline_border" style={{minHeight:"50px"}}>
						<div class="col-md-12">
                        Device
						</div>
					</div>
					<div class="row subline_border">
						<div class="col-md-12">
                        Sub Line Name
						</div>
					</div>
					<div class="row subline_border">
						<div class="col-md-12">
                        Sub Line NRIC
						</div>
					</div>
					<div class="row mb-0">
						<div class="col-md-12">
                           
        <div class="row mb-0 ">
            <div class="col-md-12">
            <div class="row font-weight-bold subline_border" >
                    <div class="col-md-12 ">
                    New Line

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                     Last 4 Numbers Opt 1

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
					 Last 4 Numbers Opt 2

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                        Last 4 Numbers Opt 3

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                        Last 4 Numbers Opt 4

                    </div>
                </div>
            </div>
        </div>

						</div>
					</div>

					<div class="row ">
            <div class="col-md-12">
            <div class="row  font-weight-bold subline_border" >
                    <div class="col-md-12 ">
                    Port In

                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12" >
                   
Port In For
                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                    Current Telco
                    </div>
                </div>
                <div class="row subline_border">
                    <div class="col-md-12">
                    Mobile Number

                    </div>
                </div>
            </div>
        </div>

		<div class="row ">
            <div class="col-md-12">
            <div class="row font-weight-bold subline_border" >
                    <div class="col-md-12">
                    Change Plan

                    </div>
                </div>
                <div class="row  subline_border">
                    <div class="col-md-12">
                        
Change of Plan For
                    </div>
                </div>
                <div class="row  subline_border">
                    <div class="col-md-12">
                    Current Type of Plan
                    </div>
                </div>
                <div class="row  subline_border">
                    <div class="col-md-12">
                    Mobile Number
                    </div>
                </div>


            </div>
        </div>
        <div class="row border-bottom ">
						<div class="col-md-12 ">
                       Price
						</div>
					</div>
				</div>











				<div class="col-md-9  d-flex p-0 custom-md-9">
				
					


{Subline.map((data,index)=>(
    
	<Column sub_line={data} Index={index} key={index} />
    

))
    
}










                    
					
				</div>
              
			</div>
		</div>
        <br/>
                <br/>
                <div class="row ">
                    <div class="col-md-12">
                    <b>Total Price of Subline</b>: <p className="ml-5 d-inline-block"> {global.add}</p>

                    </div>
                </div>
	</div>
		)
	}
}


