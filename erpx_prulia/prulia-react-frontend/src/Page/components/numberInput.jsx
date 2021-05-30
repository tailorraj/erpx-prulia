
  import React, { Component } from 'react'
  
  export default class numberInput extends Component {
      constructor(props) {
      super(props);
      this.state = {
        financialGoal: ''
      }
    }
    
    handleChange(evt) {
      const financialGoal = (evt.target.validity.valid) ? evt.target.value : this.state.financialGoal;
      
      this.setState({ financialGoal });
    }
    
    render() {
      return (
        <input type="text" pattern="[0-9]*" onInput={this.handleChange.bind(this)} value={this.state.financialGoal} />
      )
    }
  }
  
  