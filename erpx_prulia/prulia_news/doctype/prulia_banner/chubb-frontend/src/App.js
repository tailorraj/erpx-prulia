import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PersonalAccidentInsurance from './components/PersonalAccidentInsurance/PersonalAccidentInsurance';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalInformation from './components/PersonalInformation/PersonalInformation';
import Home from './components/Homepage/home';
import Form from './components/Form/form';
import Declaration from './components/Declaration/Declaration';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainInsured: false,
      spouse: false,
      child: false,
      childs: 0,
      childsArr: [],
    }
  }

  getChecked = (ev, name) => {
    this.setState({
      [name]: this.state[name] ? false : true
    }, () => {
      // console.log(this.state[name])
    })
  }

  gettingValues = (ev, name) => {
    console.log(ev.target)
    if (name === "childs") {
      let childsArr = []
      for (let i = 0; i < ev.target.value; i++) {
        childsArr.push(i)
      }
      this.setState({
        childsArr,
        [name]: ev.target.value
      })
    } else {
      this.setState({
        [name]: ev.target.value
      }, () => {
        // console.log(this.state[name])
      })
    }
  }

  render() {
    return (
      <div>
        <Router>

          <Route
            path="/personal-accident-insurance"
            render={() => <PersonalAccidentInsurance
              gettingValues={this.gettingValues}
              getChecked={this.getChecked}
              state={this.state}
            />} />

          <Route
            path="/personal-information"
            render={() => <PersonalInformation
              state={this.state}
              gettingValues={this.gettingValues}
              getChecked={this.getChecked}
            />} />

          <Route
            exact path="/"
            render={() => <Home
              state={this.state}
            />} />

          <Route
            exact path="/proposal-form"
            render={() => <Form
              state={this.state}
            />} />

          <Route
            exact path="/declaration"
            render={() => <Declaration
              state={this.state}
              gettingValues={this.gettingValues}
              getChecked={this.getChecked}
            />} />



        </Router>
      </div>
    );
  }
}

export default App;