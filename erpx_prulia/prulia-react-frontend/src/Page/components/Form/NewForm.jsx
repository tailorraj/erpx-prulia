import React, { Component } from 'react'
import "./form.css"
import Axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
export default class form extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = { final_data:{new_line: 0, port_in: 0 ,change_plan: 0 ,package_price: 0,price:0 ,device_cost:0,} ,telco:[] ,data:false, 
      
        last_4_1: '',
        last_4_2:'',
        last_4_3:'',
        last_4_4:'',
        change_mobile:'',
        port_in_mobile_no:'',
        sub_line_nric: '',
      
      
      };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.input=this.input.bind(this)
        this.plan=this.plan.bind(this)
        this.device=this.device.bind(this)
        // this.submit=this.submit.bind(this)
      Axios.get('/api/resource/PRULIA%20Telco?fields=[%22*%22]',{
        withCredentials:true
      })
      .then(res=>{
        this.setState({
          telco:res.data.data
        })
        console.log(res.data.data)
      })
      .catch(err=>{
        console.log(err)
      })
      }  
    
      Number(e){
        if(!isNaN(e.target.value))
        this.setState({
          final_data:{...this.state.final_data,[e.target.name]:e.target.value},
          [e.target.name]:e.target.value,
          data:true
        
       })
       console.log(e.target.value);
       console.log(this.state);
        
       }
       NumberNRIC(e){
        if(/^([\d -]+)$/.test(e.target.value))
        {
          var str = e.target.value;
          
          console.log(str.length)
          if(str.charAt(str.length-1)=="-")
          str= str.slice(0,str.length-1);
          console.log(str)
          console.log("..")
          str = str.split("-").join("")
        console.log(str)
       var res = str.slice(0, 6);
       
         var res1 = str.slice(6, 8);
       
       var res2 = str.slice(8, 12);
       
       var cal
       
       if(str.length <= 6 )
        cal = res 
         else if ( str.length === 6 )
         cal = res 
        
        else if ( str.length > 6 && str.length<8)
         cal = res + "-" +res1
         
           else if ( str.length === 8 )
         cal = res + "-" +res1 
        
        else 
         cal = res + "-" + res1 + "-"+res2

         this.setState({
          final_data:{...this.state.final_data,[e.target.name]:cal},
          [e.target.name]:cal,
          data:true
        
       })

        }
        else{
          if(e.target.value){
     
          }
          else
          this.setState({
            final_data:{...this.state.final_data,[e.target.name]:""},
            [e.target.name]:"",
            data:true
          
         })
         
        }
        
     
        
       }
      handleChange() {
       if(this.state.final_data.new_line ==0){
        this.setState({
          final_data:{...this.state.final_data,new_line: 1,}
          

      })
       }
       else{
        this.setState({
          final_data:{...this.state.final_data,new_line: 0,}
          
        

      })
       }

      }
    
      handleChange2() {
        if(this.state.final_data.port_in ==0){
          this.setState({
            final_data:{...this.state.final_data,port_in: 1,}
          
  
        })
         }
         else{
          this.setState({
            final_data:{...this.state.final_data,port_in: 0}
          
  
        })
      }
    }
    
      handleChange3() {
        if(this.state.final_data.change_plan ==0){
          this.setState({
            final_data:{...this.state.final_data,change_plan: 1,}
  
        })
         }
         else{
          this.setState({
            final_data:{...this.state.final_data,change_plan: 0,}
  
        })
      }
    }
      plan(data){
        Axios.get(`/api/resource/PRULIA%20Telco%20Package%20Plan/${data}`,{
             withCredentials:true
        })
        .then(res=>{
             this.setState({
              final_data:{...this.state.final_data,telco_package_plan:res.data.data.name,package_price:res.data.data.planprice}
            })
             console.log(res)
             this.pricing();
        })
        
   }

 
    


   device(data){
        Axios.get(`/api/resource/PRULIA%20Telco%20Devices/${data}`,{
             withCredentials:true
        })
        .then(res=>{
             this.setState({
              final_data:{...this.state.final_data, device:res.data.data.name,device_cost:res.data.data.price}
             })
             console.log(res)
             this.pricing()
        })
        
   }
   input(e){
    this.setState({
      final_data:{...this.state.final_data, [e.target.name]:e.target.value}
     ,     data:true
    })
 
    

   }
  
   submit = (data) => this.props.get(data);

   pricing(){
       
    var sum= Number(this.state.final_data.device_cost)+Number(this.state.final_data.package_price);
    console.log(sum)
    this.setState({
            final_data :{...this.state.final_data,price:sum}
          })
          
   }
  
      render() {
     
        const togglecheck1 = this.state.final_data.new_line  ==1 ? '' : 'hidden-check1';
        const togglecheck2 = this.state.final_data.port_in ==1 ? '' : 'hidden-check2';
        const togglecheck3 = this.state.final_data.change_plan ==1 ? '' : 'hidden-check3';
        return  <div className="form-style-6">
        <form>
           
{/* <label htmlFor="">Telco Package Plan</label>
<select list="telco-package-plan" onChange={(e)=>{this.plan(e.target.value)}} >
<option selected >No Plan</option>
{
this.props.plan.map(item=>(
  <option value={item.name}>{item.package_title}</option>
))}
</select> */}

<label htmlFor="">Device</label>
<select   onChange={(e)=>{this.device(e.target.value)}}  >
<option selected >No Device</option>
{this.props.device.map(item=>(
  <option value={item.name}>{item.device_name}</option>
))}
 </select>
<label htmlFor="">Sub Line Name</label>
    <input type="text" name='sub_line_name' onChange={this.input} />
    <label htmlFor="">Sub Line NRIC</label>
    <input type="text"  name='sub_line_nric' maxlength="14" onInput={this.NumberNRIC.bind(this)}  value={this.state.sub_line_nric}/>
    
    <div>
        <div className='form-box'>
        <input type="checkbox" id="chk1"className="chk11" checked={ this.state.final_data.new_line } onChange={ this.handleChange } />
        <label>New Line</label>
        <div className={ togglecheck1 }>
  <label htmlFor="">Telco Number Prefix</label>      
  <input type="text" defaultValue={this.state.final_data.telco_prefix} name='telco_prefix' onChange={this.input} />
{/* <datalist id="telco-number-prefix">
{
this.props.plan.map(item=>(
  <option value={item.name}>{item.name}</option>
))}
</datalist>     */}
<label htmlFor="">Last 4 Numbers Opt 1</label>
<input type="text" maxlength="4"    name='last_4_1'  onInput={this.Number.bind(this)} value={this.state.last_4_1}/>
            <label htmlFor="">Last 4 Numbers Opt 2</label>
            <input type="text" maxlength="4"   name='last_4_2'  onInput={this.Number.bind(this)} value={this.state.last_4_2}/>
            <label htmlFor="">Last 4 Numbers Opt 3</label>
            <input type="text" maxlength="4"    name='last_4_3'  onInput={this.Number.bind(this)} value={this.state.last_4_3}/>
            <label htmlFor="">Last 4 Numbers Opt 4</label>
            <input type="text" maxlength="4"    name='last_4_4'  onInput={this.Number.bind(this)} value={this.state.last_4_4}/>
            
        </div>
        </div>
       <div className='form-box'>
        
        <input type="checkbox" id="chk2" className="chk11" checked={ this.state.final_data.port_in } onChange={ this.handleChange2 } />
        <label>Port in</label>
        <div className={ togglecheck2 }>
                <label htmlFor="">Port In For</label>
                <input list="Port-In-For" type="text"  name='port_in_for' onChange={this.input}  />
              <datalist id="Port-In-For">
              
              <option value="My Own Number">My Own Number
              </option><option value="Not My Number">Not My Number
              </option>
               </datalist>
                <label htmlFor="">Current Telco</label>
                <input list="Current Telco" type="text"   name='current_telco' onChange={this.input} />
              <datalist id="Current Telco">
            
              {this.state.telco.length==0?<></>:
                this.state.telco.map(item=>(
                 <option value={item.telco_name}>{item.telco_name}</option>
                ))}
             
                </datalist>


                <label htmlFor="">Mobile Number</label>
                <input type="text"  name='port_in_mobile_no' maxlength="10" onInput={this.Number.bind(this)} value={this.state.port_in_mobile_no} />
             
             </div>
             </div>

             <div className='form-box'>
               
       
            <input type="checkbox" id="chk3" className="chk11" checked={ this.state.final_data.change_plan } onChange={ this.handleChange3 } />
              <label>Change Plan</label>
              <div className={ togglecheck3 }>     <label htmlFor="">Change of Plan For</label>
              <input list="Change-of" type="text"  name='change_plan_for' onChange={this.input} />
              <datalist id="Change-of">
            
                
                <option value="My Own Number">My Own Number
              </option><option value="Not My Number">Not My Number
              </option>
              </datalist>
                <label htmlFor="">Current Type of Plan</label>
                <input list="tp" type="text"  name='current_type_plan' onChange={this.input} />
              <datalist id="tp">
              
                <option value="PostPaid">PostPaid
              </option><option value="Prepaid">Prepaid
              </option>
                </datalist>
                <label htmlFor="">Mobile Number</label>
                <input type="text" maxlength="10" name='change_mobile'  onInput={this.Number.bind(this)} value={this.change_mobile} />
              </div>
        </div>
     </div>
    
    <Link to='/telco/order'>    <input type="button" style={{backgroundColor:`${localStorage.getItem("theme_color")}`}} defaultValue="Add Subline" onClick={()=> {
                    this.submit({...this.state })

}
    } /></Link>
  </form>
    </div>;
      }
}

