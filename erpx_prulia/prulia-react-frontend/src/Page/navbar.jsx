import React from 'react'
// import Cookies from 'js-cookie';

export default function navbar() {
    return (
      <div style={{ paddingLeft:"20px", background: "linear-gradient(90deg, #ff6961 0%, #ff6961 50%, #f3b047 100%)"}}>
      <a href="/#/smartPartner" >
<i class="arrow"></i><p class="oo"style={{display:"inline-block", marginLeft: "22px", fontSize:"15px"}}>Smart Partners</p>
</a>
</div>
      //   <nav className="navbar navbar-expand-lg navbar-light bg-light gradient" >
      //   <a className="navbar-brand" href="/">
      //    <img src="http://167.99.77.197/css/images/PruliaImage.png" style={{width:"40px"}} alt=""/>
      //   </a>
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarSupportedContent"
      //     aria-controls="navbarSupportedContent"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon" />
      //   </button>
      //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <a className="nav-link" href="/#/news">
      //           News
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="/#/event">
      //           Events
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="/#/training">
      //           Training
      //         </a>
      //       </li>
      //       <li className="nav-item active">
      //         <a className="nav-link" href="/#/smartPartner">
      //           Smart Partners <span className="sr-only">(current)</span>
      //         </a>
      //       </li>
      //     </ul>
      //     <div className=" my-2 my-lg-0">
      //       <p>Welcome, {Cookies.get("full_name")}</p>
      //     </div>
      //   </div>
      // </nav>
    )
}
