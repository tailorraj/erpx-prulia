import React, { Component } from 'react'

export default class checkbox extends Component {
     render() {
          return (
              
                   <div class="form-check">
                        {this.props.checked===undefined?
                    <input class="form-check-input" type="checkbox" value={this.props.answer}  id="defaultCheck1" style={{background:"#f1f4ff"}}  />:
                    <input class="form-check-input" type="checkbox" value={this.props.answer}  id="defaultCheck1" style={{background:"#f1f4ff"}} checked /> }
                    <label class="form-check-label" for="defaultCheck1">
                    {this.props.header}
                    </label>
                    </div> 
              
          )
     }
}
