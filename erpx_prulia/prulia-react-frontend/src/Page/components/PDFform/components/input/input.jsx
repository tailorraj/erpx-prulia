import React, { Component } from 'react'
import '../style.css'
export default class input extends Component {
     render() {
          return (
            
                   <div class="form-group row input-row">
                    <label for="inputEmail3" class="col-sm-5  col-form-label custom-sm-5">{this.props.header}</label>
                    <div class="col-sm-7  pdfInputWrapper custom-sm-7">
                   
                    <span  className="pdfInput" >{this.props.answer}</span>
                    </div>
                    </div>
              
          )
     }
}
