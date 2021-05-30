import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Plancompo extends Component {
     render() {
          return (
               
                    <div class="card" id='cardplan'>
                    <div class='card-header' id='cardhed' style={{backgroundColor:`${localStorage.getItem("theme_color")}`}} >
                    <h2 class='text-white'>{this.props.data.package_title}</h2>
                    <h5 class='bg-white' id='rm'>{this.props.data.package_sub_title1}</h5>
                    <h6> {this.props.data.strike===0?this.props.data.package_sub_title2:
                    <del>{this.props.data.package_sub_title2}</del>
                    }
                         </h6>
                    </div>          
                    <div className="plan-body-container" dangerouslySetInnerHTML={{__html:this.props.data.package_content}}>
                         
                    </div>
                    <br/>
                    <div></div>
               {this.props.data.plan_pkg_subline==1?<div ><p style={{color:"red"}}>* Subline is allowed <br/> price: RM  {this.props.data.sub_price} <br/> </p><span dangerouslySetInnerHTML={{__html:this.props.data.sub_desc}}></span></div>:<p style={{color:"red"}}>* Subline NOT allowed for this package</p>}
                    <div class='card-footer bg-white'>
                    <Link to='/telco/order'> <button type="button" class="btn " id='planbutton' onClick={()=>{localStorage.setItem("plan_pkg",this.props.data.package_title); localStorage.setItem("plan_pkg_id",this.props.data.name); localStorage.setItem("plan_pkg_subline",this.props.data.plan_pkg_subline) }} style={{backgroundColor:`${localStorage.getItem("theme_color")}`}}>Select</button></Link>
                    </div>
                    </div>
               
          )
     }
}
