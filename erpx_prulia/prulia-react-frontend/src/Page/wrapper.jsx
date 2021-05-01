import React, { Component } from 'react'
import Order from "./Order";
import Pdf from "./components/PDFform/PdfForm";
export default class wrapper extends Component {
    constructor(){
        super();
        this.state = {
            v:false
        }
    }
    render() {
        const Re ={
            false:<Order onPreview={(data)=>{this.setState({v:!this.state.v,data:data})}}/>,
            true:<Pdf data={this.state.data} onPreview={()=>{this.setState({v:!this.state.v})}}/>}
        return (
            <div>
                {Re[this.state.v]}
            </div>
        )
    }
}
