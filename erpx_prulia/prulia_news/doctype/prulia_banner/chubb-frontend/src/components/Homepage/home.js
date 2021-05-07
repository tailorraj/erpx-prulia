import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  render() {
    return (
      <div className="Home-div">
        <nav className="navbar">
          <div className="nav-div">
            <div className="hide">
              <i class="fas fa-angle-left"></i>
              <ul>
                <li><a>LOGO</a></li>
                <li><a>News</a></li>
                <li><a>Events</a></li>
                <li><a>Training</a></li>
                <li><a>Smart Partner</a></li>
              </ul>
            </div>
            <div className="fb-nav hide">
              <a><i class="fab fa-facebook-f "></i></a>
            </div>
          </div>
        </nav>
        <div className="banner-div">
          <div className="banner container" >
            <div className="banner-text">
              <h2>CHUBB<sup>®</sup> </h2>
              <h4>Smart Partner</h4>
            </div>

          </div>
          <div className="mob-blur">
            <div className="round">
              <div className="inner-round">
                <i class="fas fa-user-friends"></i>

              </div>
            </div>
            <div className="mob-pic">

            </div>
            <div>
              <h4>
                CHUBB
          </h4>
            </div>

          </div>

        </div>
        <div className="chubb">
          <h2>CHUBB</h2>

        </div>
        <div className="package">
          <h2>CHUBB
            <sup>®</sup>
          </h2>
          <p>Please Select the Package yoou want to purchase from CHUBB:</p>
          <div className="package-div">
            <Link to='/personal-accident-insurance' style={{ textDecoration: "none", color: "black" }}>
              <div className="pckg">
                <h6>Personal Accident Insurance (PA)</h6>
              </div>
            </Link>
            <Link to='/personal-accident-insurance' style={{ textDecoration: "none", color: "black" }}>
              <div className="pckg">
                <h6>Professional Idemnity</h6>
              </div>
            </Link>

          </div>
        </div>

        <div className="footer">
          <div className="footerItem">
            <i class="fas fa-home"></i>
          Home
          </div>
          <div className="footerItem">
            <i class="fas fa-user-circle"></i>
          Profile

          </div>
          <div className="footerItem">
            <i class="fas fa-award"></i>
          Event
          </div>
          <div className="footerItem">
            <i class="fas fa-file-alt"></i>
          Training
          </div>
          <div className="footerItem">
            <i class="fas fa-tv"></i>
          News
          </div>
          <div className="footerItem">
            <i class="fas fa-user-friends"></i>
          Partner

          </div>
          <div className="footerItem">
            <i class="fas fa-question"></i>
          Feedback

          </div>

        </div>

      </div>
    );
  }
}

export default Home;