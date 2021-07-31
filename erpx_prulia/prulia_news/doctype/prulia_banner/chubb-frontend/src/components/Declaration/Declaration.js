import React from "react";
import "./Declaration.scss";
import { withRouter, Link } from "react-router-dom";
import { Form } from "react-bootstrap";

class Declaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="daclarationMain">
        <div className="topDiv">
          <svg
            style={{ cursor: "pointer" }}
            onClick={this.goBack}
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-chevron-left"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <p>Declaration & Privacy Notice</p>
        </div>
        <div className="declarationForm">
          <div className="flexDiv">
            <Form.Check
              defaultChecked={this.props.state.declaration}
              value={this.props.state.declaration}
              onChange={e => this.props.getChecked(e, "declaration")}
              size="lg"
              type="checkbox"
            />
            <div className="content">
              <h6>Declaration</h6>
              <p>
                I agree that the statements and declarations contained in this
                proposal form will be relied upon by Chubb to decide whether to
                accept this insurance. I understand that Chubb needs to deal
                with my personal data to administer my Policy and offer me
                insurance products and services. To achieve these purposes, I
                allow Chubb to collect, use and disclose my personal data to
                selected third parties in or outside Malaysia, in accordance
                with Chubb’s Personal Data Protection Notice, which is found in
                Chubb’s website at www.chubb.com/my-privacy. I may contact Chubb
                for access to or correction of my personal data, or for any
                other queries or complaints.
              </p>
            </div>
          </div>
          <hr />
          <div className="flexDiv">
            <Form.Check
              defaultChecked={this.props.state.privacyNotice}
              value={this.props.state.privacyNotice}
              onChange={e => this.props.getChecked(e, "privacyNotice")}
              size="lg"
              type="checkbox"
            />
            <div className="content">
              <h6>Privacy Notice</h6>
              <p>
                I understand that Chubb needs to deal with my personal data to
                administer my Policy and offer me insurance products and
                services. To achieve these purposes, I allow Chubb to collect,
                use and disclose my personal data to selected third parties in
                or outside Malaysia, in accordance with Chubb’s Personal Data
                Protection Notice, which is found in Chubb’s website at
                www.chubb.com/my-privacy. I may contact Chubb for access to or
                correction of my personal data, or for any other queries or
                complaints.
              </p>
            </div>
          </div>
          <hr />
          <div className="flexDiv">
            <Form.Check
              defaultChecked={this.props.state.paymentInstruction}
              value={this.props.state.paymentInstruction}
              onChange={e => this.props.getChecked(e, "paymentInstruction")}
              size="lg"
              type="checkbox"
            />
            <div className="content">
              <h6>Payment Instruction</h6>
              <p>
                I authorise Chubb to debit my credit card for payment of the
                premium stated below.
              </p>
            </div>
          </div>
          <p className="iConfirm">
            I confirm that this product is suitable for me and meets my
            insurance needs, financial objectives and priority and hereby agree
            to purchase this product. Where I have opted to purchase the
            coverage for my spouse and/or my child(ren), I further confirm that
            this product is suitable for them and meets their insurance needs,
            financial objectives and priority and hereby agree to purchase this
            product for their benefit.
          </p>
          {this.props.state.paymentInstruction && (
            <div className="paymentDetails">
              <div className="inputGroup">
                <label>Name of Account Holder or Credit Card Holder</label>
                <input
                  type="text"
                  defaultValue="Robert Tan Keng Yong"
                  value={this.props.state[`accountHolderName`]}
                  onChange={e =>
                    this.props.gettingValues(e, `accountHolderName`)
                  }
                />
              </div>
              <div className="second">
                <label>Total Premium Payable</label>
                <div className="secondFlex">
                  <Form.Check
                    defaultChecked={this.props.state.creditCard}
                    value={this.props.state.creditCard}
                    onChange={e => this.props.getChecked(e, "creditCard")}
                    size="lg"
                    type="checkbox"
                    label="Credit Card"
                  />
                  <Form.Check
                    className="two"
                    defaultChecked={this.props.state.masterCard}
                    value={this.props.state.masterCard}
                    onChange={e => this.props.getChecked(e, "masterCard")}
                    size="lg"
                    type="checkbox"
                    label="Mastercard"
                  />
                </div>
                <div className="secondFlex">
                  <Form.Check
                    defaultChecked={this.props.state.debitCard}
                    value={this.props.state.debitCard}
                    onChange={e => this.props.getChecked(e, "debitCard")}
                    size="lg"
                    type="checkbox"
                    label="Debit Card"
                  />
                  <Form.Check
                    className="two"
                    defaultChecked={this.props.state.rhb}
                    value={this.props.state.rhb}
                    onChange={e => this.props.getChecked(e, "rhb")}
                    size="lg"
                    type="checkbox"
                    label="RHB"
                  />
                </div>
                <div className="secondFlex">
                  <Form.Check
                    defaultChecked={this.props.state.visa}
                    value={this.props.state.visa}
                    onChange={e => this.props.getChecked(e, "visa")}
                    size="lg"
                    type="checkbox"
                    label="VISA"
                  />
                  <Form.Check
                    className="two"
                    defaultChecked={this.props.state.maybank}
                    value={this.props.state.maybank}
                    onChange={e => this.props.getChecked(e, "mayBank")}
                    size="lg"
                    type="checkbox"
                    label="Maybank"
                  />
                </div>
                <div className="secondFlex two">
                  <div className="inputGroup second">
                    <label>Issuing Bank</label>
                    <input
                      type="text"
                      defaultValue="Maybank"
                      value={this.props.state[`issuingBank`]}
                      onChange={e => this.props.gettingValues(e, `issuingBank`)}
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Card No.</label>
                    <input
                      type="text"
                      defaultValue="1234 5678 4455 8877"
                      value={this.props.state[`cardNo`]}
                      onChange={e => this.props.gettingValues(e, `cardNo`)}
                    />
                  </div>
                </div>
                <div className="secondFlex two">
                  <div className="inputGroup second">
                    <label>Card Expiry</label>
                    <input
                      type="date"
                      className="date"
                      value={this.props.state[`expiry`]}
                      onChange={e => this.props.gettingValues(e, `expiry`)}
                    />
                  </div>
                  <div className="inputGroup second">
                    <label>Date</label>
                    <input
                      type="date"
                      className="date"
                      value={this.props.state[`cardDate`]}
                      onChange={e => this.props.gettingValues(e, `cardDate`)}
                    />
                  </div>
                </div>
                <div className="total">
                  Total Premium Payable RM &nbsp; <span>560.09</span>
                </div>
                <div className="signDiv">
                  <div className="group">
                    <div className="sign">Sign Here</div>
                    <label>Signature of Card Holder</label>
                  </div>
                  <div className="group">
                    <div className="sign">Sign Here</div>
                    <label>Signature of Main Insured Person</label>
                  </div>

                  <Link
                    to="/proposal-form"
                    style={{ textDecoration: "none" }}
                    className="submit"
                  >
                    {/* <button > */}
                    Submit
                    {/* </button> */}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Declaration);
