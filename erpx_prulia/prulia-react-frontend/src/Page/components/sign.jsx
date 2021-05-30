import React, { Component } from 'react'
import Popup from "reactjs-popup";
import SignaturePad from 'react-signature-canvas'



export default class sign extends Component {
    constructor(props){
        super(props)
        this.state={
            trimmedDataURL: null  
        }
        this.clear = this.clear.bind(this)
        this.trim = this.trim.bind(this)
    }
 
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
 
  trim = () => {
    this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png')})
      console.log(this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png'));
      this.props.get(this.sigPad.getTrimmedCanvas()
      .toDataURL('image/png'))
      
  }
  render () {
    let {trimmedDataURL} = this.state
    return <div  >
                   <Popup
                    trigger={
                      <button type="button" class="btn btn-secondary" id="orderbutton" >
                      Change Signature
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div>
                      
                        <button
                          class="btn"
                          id="popclose"
                          onClick={() => {
                            close();
                          }}
                        >
                          X
                        </button>
                        
                  
                        <div className="siganture-pad">
        <SignaturePad penColor='black' canvasProps={{width: 250, height: 250}}
          ref={(ref) => { this.sigPad = ref }} />
      </div>
      <div>
        <button type="button"  onClick={this.clear}>
          Clear
        </button>
        <button type="button" onClick={()=>{this.trim()
        close();
        }}>
          save
        </button>
      </div>
                
                    </div>
                    )}
                  </Popup>

      
      <div className="signatur_pre">
      CAPTURED SIGNATURE
      {trimmedDataURL
        ? <img  src={trimmedDataURL} alt="" />
        : this.props.data ? <img  src={this.props.data} alt="" />:null}
    </div>
    </div>
  }
}
