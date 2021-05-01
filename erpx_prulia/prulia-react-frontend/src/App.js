import React,{useState} from 'react'
import {BrowserRouter as Router,Route,Link, Switch} from 'react-router-dom';
import Home from "./Page/Home"
import Nav from "./Page/navbar";
import Order from "./Page/OrderComponent";
import Last from './Page/Thankyoupage'
import Pdf from "./Page/components/PDFform/PdfForm";
export default function App() {
  return (
    <Router>      
      <Nav /> 
     
      <Switch>
        <Route exact path="/telco/order"  render={() => <Order />}/>
        <Route exact path="/download"  render={() => <Last />}/>
        <Route exact path="/preview" component={Pdf} />
        <Route path="/:telco"  component={() =><Home />} />
        <Route exact path='/'  component={() => <div>please select a telco</div>}/>
        </Switch> 
        </Router>
  )
}
