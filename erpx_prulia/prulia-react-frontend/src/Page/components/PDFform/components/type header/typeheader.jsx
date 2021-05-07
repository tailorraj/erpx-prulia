import React, { Component } from 'react'

export default class Typeheader extends Component {
     render() {
          return (
               <div className="pdf-section-header-container">
                  <span className="pdf-section-header" >{this.props.header}</span>  
                  {
                       this.props.require==="true"?<span className="pdfRequire">*Required</span>:null
                  }
                  
               </div>
          )
     }
}
