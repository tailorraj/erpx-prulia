import React, { Component } from 'react'

export default class Thankyoupage extends Component {
    render() {
        return (
            <div class="bgimg">
      
            <div class="middle">
            <h1>Your Application has been submitted and send for review</h1>
              <hr />
              <a className="btn badge-primary" href={`http://167.99.77.197/${localStorage.getItem('pdf')}`} download onClick={()=>window.location.replace('http://167.99.77.197/#/smartPartner')}> Download your application</a>
            </div>
          
          </div>)
        
    }
}
