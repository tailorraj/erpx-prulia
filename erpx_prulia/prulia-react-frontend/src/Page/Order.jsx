import React, { Component, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Popup from "reactjs-popup";
import Pop from "./components/Form/Form";
import NewPop from "./components/Form/NewForm";
import swal from "sweetalert";
import FileBase64 from "react-file-base64";
import Sign from "./components/sign";
import { Link } from "react-router-dom";

export default class postpage extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      telco_data: {},
      sub_line: [],
      devices: [],
      plans: [],
      p_id: "",
      final_data: {
        reg_status: "Pending for approval",
      },
      credit_card: {
        cardHolder: "",
        cardNo: "",
        cardType: "",
        expDate: "",
        cvv: "",
        cardCountry: "",
        cardBank: "",
      },
      files_nric_front: [],
      files_photo: [],
      files_nric_back: [],
      files_application_form: "",
      files_t_signature: [],
      deviceSelected: {},
      numberInput: "",
      postInput: "",
      memberData: {},
      redirect: false,
      cost: {
        devicecost: 0,
        plancost: 0,
        subline: 0,
      },
    };
    Axios.get(
      `/api/resource/PRULIA%20Telco%20Connect/?filters=[["owner","=","${Cookies.get(
        "user_id"
      )}"],["telco_id","=","${localStorage.getItem("telco")}"]]&fields=["*"]`,
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res);
      if (res.data.data.length === 0) localStorage.setItem("tcon_id", "null");
      else localStorage.setItem("tcon_id", res.data.data[0].name);
    });

    Axios.get(
      `/api/resource/PRULIA%20Telco%20Devices/?filters=[["telco_id","=","${localStorage.getItem(
        "telco"
      )}"]]&fields=["*"]`,
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res);
      this.setState({
        devices: res.data.data,
      });
    });
    Axios.get(
      `/api/resource/PRULIA%20Telco%20Package%20Plan/?filters=[["telco_id","=","${localStorage.getItem(
        "telco"
      )}"]]&fields=["*"]`,
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res);
      this.setState({
        plans: res.data.data,
      });
    });
    Axios.get(
      `/api/resource/PRULIA%20Member?filters=[["owner","=","${Cookies.get(
        "user_id"
      )}"]]&fields=["*"]`,
      { withCredentials: true }
    )
      .then((res) => {
        console.log(res);
        this.setState({
          memberData: res.data.data[0],
          data:{...this.state.data,prudential_id: res.data.data[0].prudential_id,},
          final_data: {
            ...this.state.final_data,
            prudential_id: res.data.data[0].prudential_id,
            mailing_address: res.data.data[0].mailing_address,
          },
        });
        console.log(this.state.memberData);
      })
      .then(() => {
        Axios.get(
          `/api/resource/PRULIA%20Telco/${localStorage.getItem(
            "telco"
          )}?fields=["telco_name","name","max_subline","creditcard_check","creditcard_desc"]`,
          { withCredentials: true }
        ).then((res) => {
          this.setState({
            telco_data: res.data.data,
            final_data: {
              ...this.state.final_data,
              telco_name: res.data.data.telco_name,
            },
          });
          console.log(this.state.telco_data);
          console.log(res);
        });
        if (localStorage.getItem("tcon_id") === "null") {
          console.log(this.state);
          var data = {
            package_title: localStorage.getItem("plan_pkg"),
            cell_number: this.state.memberData.cell_number,
            full_name: this.state.memberData.full_name,
          };
          this.setState({
            data: data,
            sub_line: [],
            numberInput: data.cell_number,
          });
          console.log(data);
          this.device("null");
          var ll = localStorage.getItem("plan_pkg_id");
          this.plan(ll);
        } else
          Axios.get(
            `/api/resource/PRULIA%20Telco%20Connect/${localStorage.getItem(
              "tcon_id"
            )}`,
            {
              withCredentials: true,
            }
          ).then((res) => {
            if (
              res.data.data.length == 0 ||
              res.data.data.reg_status === "Rejected" ||
              res.data.data.reg_status === "Cancel"
            ) {
              console.log(res.data.data.reg_status);

              var data = {
                package_title: localStorage.getItem("plan_pkg"),
                cell_number: this.state.memberData.cell_number,
                full_name: this.state.memberData.full_name,
              };
              this.setState({
                data: data,
                sub_line: [],
                numberInput: data.cell_number,
              });
              this.device("null");
              var ll = localStorage.getItem("plan_pkg_id");
              this.plan(ll);
            } else if (res.data.data.reg_status === "Expired") {
              console.log("expired");

              var data = res.data.data;
              delete data.creation;
              delete data.doctype;
              delete data.idx;
              delete data.modified;
              delete data.modified_by;
              delete data.name;
              delete data.owner;
              delete data.reg_status;
              delete data.submit_date;
              delete data.telco_id;
              delete data.telco_name;
              delete data.telco_package_plan;
              data.package_title = localStorage.getItem("plan_pkg");
              data.cell_number = this.state.memberData.cell_number;
              data.full_name = this.state.memberData.full_name;
              console.log(data);
              //              Axios.post(`/api/resource/PRULIA%20Telco%20Connect/`,
              //              data,
              //               {withCredentials:true})
              //               .then((res)=>{
              //                 console.log(res);

              //                 this.setState({
              //                   data: res.data.data,
              //                   sub_line:res.data.data.sub_line ,
              //                   numberInput:res.data.data.cell_number
              //                   ,postInput:res.data.data.post_code,
              //                 });

              //                 res.data.data.telco_devices===""?this.device("null"):
              //                 this.device(res.data.data.telco_devices)
              //                 console.log(localStorage.getItem("plan_pkg_id"));
              //                 var ll=localStorage.getItem("plan_pkg_id")
              //                 this.plan(ll)
              // console.log(this.state);
              //                 localStorage.setItem("tcon_id",res.data.data.name);
              //               })
              // console.log(res.data);

              //  console.log(oldData);

              //             this.setState({
              //               data: {...this.state.data, oldData},
              //               sub_line: oldData.sub_line || [],
              //               numberInput:oldData.cell_number
              //               ,postInput:oldData.post_code
              //             });

              //             console.log(this.state);

              this.setState({
                data: data,
                sub_line: data.sub_line,
                numberInput: data.cell_number,
                postInput: data.post_code,
              });
              data.telco_devices === ""
                ? this.device("null")
                : this.device(data.telco_devices);
              console.log(localStorage.getItem("plan_pkg_id"));
              var ll = localStorage.getItem("plan_pkg_id");
              this.plan(ll);
              console.log(this.state);
            } else {
              console.log(res.data.data.reg_status);
              this.setState({
                data: {
                  reg_status: res.data.data.reg_status,
                  next_renew_date: res.data.data.next_renew_date,
                },
              });
            }
          });
      });

    this.input = this.input.bind(this);

    this.plan = this.plan.bind(this);
    this.device = this.device.bind(this);

    this.input = this.input.bind(this);
  }
  contact(e) {
    if (!isNaN(e.target.value))
      this.setState({
        final_data: { ...this.state.final_data, cell_number: e.target.value },
        numberInput: e.target.value,
      });
    console.log(e.target.value);
  }
  DateNow() {
    var date = new Date().toISOString();
    var yyyy = date.slice(0, 4);
    var mm = date.slice(5, 7);
    var dd = date.slice(8, 10);
    return yyyy + "-" + mm + "-" + dd;
  }
  postcode(e) {
    if (!isNaN(e.target.value))
      this.setState({
        final_data: { ...this.state.final_data, post_code: e.target.value },
        postInput: e.target.value,
      });
    console.log(e.target.value);
    // const postcode = !isNaN(e.target.value) ? e.target.value : this.state.postInput;
    //     this.setState({
    //        final_data:{...this.state.final_data,[e.target.name]:this.state.postInput}
    //     })
  }

  getFilesPhotos(files) {
    this.setState({
      files_photo: files,
    });
  }
  getFilesBACK(files) {
    this.setState({
      files_nric_back: files,
    });
  }

  getFilesFRONT(files) {
    this.setState({ files_nric_front: files });
  }

  getFilesAPPFORM(files) {
    this.setState({
      files_application_form: files,
    });
  }
  NumberCard(e) {
    if (/^([\d -]+)$/.test(e.target.value)) {
      var str = e.target.value;

      console.log(str.length);
      if (str.charAt(str.length - 1) === "-")
        str = str.slice(0, str.length - 1);

      console.log("..");
      str = str.split("-").join("");

      var res = str.slice(0, 4);

      var res1 = str.slice(4, 8);

      var res2 = str.slice(8, 12);
      var res3 = str.slice(12, 16);

      var cal;

      if (str.length <= 4) cal = res;
      else if (str.length === 4) cal = res;
      else if (str.length > 4 && str.length < 8) cal = res + "-" + res1;
      else if (str.length === 8) cal = res + "-" + res1;
      else if (str.length > 6 && str.length < 12)
        cal = res + "-" + res1 + "-" + res2;
      else if (str.length === 12) cal = res + "-" + res1 + "-" + res2;
      else cal = res + "-" + res1 + "-" + res2 + "-" + res3;
      console.log(cal);
      this.setState({
        credit_card: { ...this.state.credit_card, cardNo: cal },
      });
    } else {
      if (e.target.value) {
      } else
        this.setState({
          credit_card: { ...this.state.credit_card, cardNo: "" },
        });
    }
  }

  NumberExpireDate(e) {
    if (/^([\d -]+)$/.test(e.target.value)) {
      var str = e.target.value;

      if (str.charAt(str.length - 1) == "-") str = str.slice(0, str.length - 1);
      str = str.split("-").join("");
      console.log(str);
      var res = str.slice(0, 2);

      var res1 = str.slice(2, 4);

      //  var res2 = str.slice(8, 12);

      var cal;

      if (str.length <= 2) cal = res;
      else if (str.length === 2) cal = res;
      else if (str.length > 2 && str.length < 4) cal = res + "-" + res1;
      else if (str.length === 4) cal = res + "-" + res1;

      this.setState({
        credit_card: { ...this.state.credit_card, expDate: cal },
      });
    } else {
      if (e.target.value) {
      } else
        this.setState({
          credit_card: { ...this.state.credit_card, expDate: "" },
        });
    }
  }
  NumberCvv(e) {
    if (/^([\d ]+)$/.test(e.target.value)) {
      var str = e.target.value;

      console.log(str);

      var cal = str;

      this.setState({
        credit_card: { ...this.state.credit_card, cvv: cal },
      });
    } else {
      if (e.target.value) {
      } else
        this.setState({
          credit_card: { ...this.state.credit_card, cvv: "" },
        });
    }
  }
  input(e) {
    this.setState({
      final_data: { ...this.state.final_data, [e.target.name]: e.target.value },
    });
  }

  onlyNumbers(event) {
    console.log("this is called");
    return !isNaN(event.key);
  }

  plan(data) {
    console.log(data);

    const { plans } = this.state;
    console.log(plans);
    for (let i = 0; i < plans.length; i++) {
      console.log(plans[i].name);
      if (plans[i].name == data) {
        console.log("olalalal");
        this.setState({
          final_data: {
            ...this.state.final_data,
            package_price: plans[i].package_price,
            package_title: plans[i].package_title,
            telco_package_plan: plans[i].name,
          },
          cost: {
            ...this.state.cost,
            plancost: plans[i].package_price,
          },
        });
      }
    }
  }
  device(data) {
    console.log("device working");
    if (data === "null") {
      this.setState({
        final_data: {
          ...this.state.final_data,
          device_cost: 0,
        },
        deviceSelected: "null",
        cost: {
          ...this.state.cost,
          devicecost: 0,
        },
      });
      localStorage.setItem("deviceName", "");
    } else {
      const { devices } = this.state;
      console.log(devices);
      for (let i = 0; i < devices.length; i++) {
        if (devices[i].name === data) {
          localStorage.setItem("deviceName", devices[i].device_name);
          this.setState({
            final_data: {
              ...this.state.final_data,
              device_cost: devices[i].price,
              t_device_title: devices[i].device_title,
              telco_devices: devices[i].name,
            },
            deviceSelected: devices[i],
            cost: {
              ...this.state.cost,
              devicecost: devices[i].price,
            },
          });
        }
      }
    }
  }

  render() {
    const {
      data,
      sub_line,
      devices,
      plans,
      deviceSelected,
      credit_card,
    } = this.state;
    // console.log(sub_line);
    console.log(this.state);
    if (data.reg_status === "Pending for approval") {
      return (
        <div class="bgimg">
          <div class="middle">
            <h1>Pending for Approval</h1>
            <hr />
            <p>Try Again after some time</p>
          </div>
        </div>
      );
    } else if (data.reg_status === "Approved")
      return (
        <div class="bgimg">
          <div class="middle">
            <h1>Approved</h1>
            <hr />
            <p>{this.state.telco_data.next_renew_date}</p>
          </div>
        </div>
      );
    else {
      return (
        <div className="order-wrapper">
          <center>
            <h3 id="portinc">Your Order</h3>
          </center>
          <div
            id="detailscard"
            style={{
              border: `1px solid  ${localStorage.getItem("theme_color")}`,
            }}
          >
            <form>
              <div class="card formcard" id="detail1">
                <div class="card formcard" id="detail11">
                  <label
                    for="exampleFormControlInput1"
                    class="font-weight-bold"
                  >
                    Your Details
                  </label>

                  <label for="exampleFormControlTextarea1">Prudential Id</label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="text"
                    class="form-control"
                    name="prudential_id"
                    onChange={this.input}
                    defaultValue={this.state.final_data.prudential_id}
                    disabled
                  />

                  <label for="exampleFormControlTextarea1">Full Name</label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="text"
                    class="form-control"
                    name="full_name"
                    onChange={this.input}
                    defaultValue={data.full_name}
                    disabled
                  />
                  <label for="exampleFormControlTextarea1">
                    Contact Number
                  </label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="text"
                    class="form-control"
                    maxlength="10"
                    name="cell_number"
                    pattern="[0-9]*"
                    onInput={this.contact.bind(this)}
                    value={this.state.numberInput}
                  />

                  {/* <input style={{border:`1px solid  ${localStorage.getItem("theme_color")}`}}
           type="text"
           class="form-control"
           name="cell_number"
           onChange={this.input}
           defaultValue={data.cell_number}
         /> */}
                  <label for="exampleFormControlTextarea1">Telco Id</label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="text"
                    class="form-control"
                    name="telco_id"
                    onChange={this.input}
                    defaultValue={localStorage.getItem("telco")}
                    disabled
                  />

                  {/* // baadmei */}
                  <label for="exampleFormControlTextarea1">Telco Name</label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="text"
                    class="form-control"
                    name="telco_name"
                    onChange={this.input}
                    defaultValue={this.state.telco_data.telco_name}
                    disabled
                  />
                  <label for="exampleFormControlTextarea1">Company Name</label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="text"
                    class="form-control"
                    name="company_name"
                    onChange={this.input}
                    defaultValue={
                      data.company_name
                        ? data.company_name
                        : "Prudential Life Insurance Agency Association"
                    }
                  />
                  {/* <div class="row">
                    <div class="col">
                      <label for="exampleFormControlTextarea1">Country</label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        name="country"
                        onChange={this.input}
                        defaultValue={data.country}
                      />
                    </div>
                    <div class="col">
                      <label for="exampleFormControlTextarea1">State</label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        name="state"
                        onChange={this.input}
                        defaultValue={data.state}
                      />
                    </div>
                  </div> */}
                  {/* <div class="row">
                    <div class="col">
                      <label for="exampleFormControlTextarea1">City</label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        name="city"
                        onChange={this.input}
                        defaultValue={data.city}
                      />
                    </div>
                    <div class="col">
                      <label for="exampleFormControlTextarea1">PostCode</label>

                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        name="post_code"
                        maxlength="5"
                        onInput={this.postcode.bind(this)}
                        value={this.state.postInput}
                        // defaultValue={data.post_code}
                      />
                    </div>
                  </div> */}
               
                    
                      <label for="exampleFormControlTextarea1">Mailing Address</label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        name="city"
                        onChange={this.input}
                        defaultValue={this.state.final_data.mailing_address}
                      />
               
             
               
                </div>
              </div>
              {this.state.telco_data.creditcard_check === 1 ? (
                <div class="card formcard" id="detail1">
                  <div class="card formcard" id="detail11">
                    <label
                      for="exampleFormControlInput1"
                      class="font-weight-bold"
                    >
                      Credit Card Details
                    </label>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">
                        Cardholder Name
                      </label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="cardHolder"
                        onChange={(e) => {
                          this.setState({
                            credit_card: {
                              ...this.state.credit_card,
                              cardHolder: e.target.value,
                            },
                          });
                        }}
                        defaultValue={credit_card.cardHolder}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">
                        Credit Card No (Format : 9999-9999-9999-9999)
                      </label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="cardNo"
                        maxLength={19}
                        onInput={this.NumberCard.bind(this)}
                        value={credit_card.cardNo}
                        // onChange={ (e) =>  this.setState({
                        //   credit_card:{...this.state.credit_card, cardNo:e.target.value}
                        // })}
                        // defaultValue={credit_card.cardNo}
                      />
                    </div>
                    <div class="form-group">
                      <div className="d-flex">
                        <div className="radio checkbox-inline mr-4">
                          <label>
                            <input
                              id="master"
                              type="radio"
                              name="cardType"
                              value="Master Card"
                              onClick={(e) =>
                                this.setState({
                                  credit_card: {
                                    ...this.state.credit_card,
                                    cardType: e.target.value,
                                  },
                                })
                              }
                            />{" "}
                            Master Card
                          </label>
                        </div>
                        <div className="radio checkbox-inline">
                          <label>
                            <input
                              type="radio"
                              id="visa"
                              name="cardType"
                              value="Visa Card"
                              onClick={(e) =>
                                this.setState({
                                  credit_card: {
                                    ...this.state.credit_card,
                                    cardType: e.target.value,
                                  },
                                })
                              }
                            />{" "}
                            Visa Card
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">
                        Expiry Date (Format : 99-99)
                      </label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="expDate"
                        maxLength={5}
                        onInput={this.NumberExpireDate.bind(this)}
                        value={credit_card.expDate}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">
                        CVC/CVV2 (format : 999)
                      </label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        maxLength={"3"}
                        name="cvv"
                        onInput={this.NumberCvv.bind(this)}
                        value={credit_card.cvv}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">
                        Card Issuing Country
                      </label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="cardCountry"
                        onChange={(e) =>
                          this.setState({
                            credit_card: {
                              ...this.state.credit_card,
                              cardCountry: e.target.value,
                            },
                          })
                        }
                        value={credit_card.cardCountry}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">
                        Card Issuing Bank
                      </label>
                      <input
                        style={{
                          border: `1px solid  ${localStorage.getItem(
                            "theme_color"
                          )}`,
                        }}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        name="cardBank"
                        onChange={(e) =>
                          this.setState({
                            credit_card: {
                              ...this.state.credit_card,
                              cardBank: e.target.value,
                            },
                          })
                        }
                        defaultValue={credit_card.cardBank}
                      />
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value={this.props.answer}
                          id="defaultCheck1"
                          style={{ background: "#f1f4ff" }}
                        />
                        {this.state.telco_data.creditcard_desc}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div class="card formcard" id="detail1">
                <div class="card formcard" id="detail11">
                  <label
                    for="exampleFormControlInput1"
                    class="font-weight-bold"
                  >
                    NRIC
                  </label>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">
                      Full Name as in NRIC
                    </label>
                    <input
                      style={{
                        border: `1px solid  ${localStorage.getItem(
                          "theme_color"
                        )}`,
                      }}
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      name="full_name_nric"
                      onChange={this.input}
                      defaultValue={data.full_name_nric}
                    />
                  </div>

                  <div className="imagePreview row">
                    <div className="imagePreviewContainer">
                      <label>
                        Take a Photo of Original IC with Color <br /> (Front)
                      </label>
                      <br />
                      <FileBase64
                        multiple={true}
                        onDone={this.getFilesFRONT.bind(this)}
                      />
                      <br />
                      {this.state.files_nric_front.length > 0 ? (
                        <img src={this.state.files_nric_front[0].base64} />
                      ) : data.nric_front ? (
                        <img src={`http://167.99.77.197/${data.nric_front}`} />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="imagePreviewContainer">
                      <label>
                        Take a Photo of Original IC with Color
                        <br /> (Back)
                      </label>
                      <br />{" "}
                      <FileBase64
                        multiple={true}
                        onDone={this.getFilesBACK.bind(this)}
                      />
                      <br />
                      {this.state.files_nric_back.length > 0 ? (
                        <img src={this.state.files_nric_back[0].base64} />
                      ) : data.nric_back ? (
                        <img src={`http://167.99.77.197/${data.nric_back}`} />
                      ) : (
                        <></>
                      )}
                    </div>
                    <br />
                    <div className="imagePreviewContainer">
                      <label>Take Photo of Staff ID</label>
                      <br />
                      <FileBase64
                        multiple={true}
                        onDone={this.getFilesPhotos.bind(this)}
                      />
                      <br />
                      {this.state.files_photo.length > 0 ? (
                        <img src={this.state.files_photo[0].base64} />
                      ) : data.photo ? (
                        <img src={`http://167.99.77.197/${data.photo}`} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <br />
                </div>
              </div>

              <div class="card formcard" id="detail1">
                <div class="card formcard" id="detail11">
                  <label
                    for="exampleFormControlInput1"
                    class="font-weight-bold"
                  >
                    Plan And Devices
                  </label>
                  <h6 id="principalplan">Principal Plan Type</h6>
                  <select
                    required
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    class="custom-select custom-select-lg mb-3"
                    id="dropdownd"
                    name="package_title"
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.plan(e.target.value);
                    }}
                  >
                    {plans.length == 0 ? (
                      <></>
                    ) : (
                      plans.map((item) =>
                        item.package_title == data.package_title ? (
                          <option value={item.name} selected>
                            {item.package_title}
                          </option>
                        ) : (
                          <option value={item.name}>
                            {item.package_title}
                          </option>
                        )
                      )
                    )}
                  </select>
                  <label for="exampleFormControlTextarea1">Price (RM)</label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="number"
                    class="form-control"
                    value={this.state.final_data.package_price}
                    disabled
                  />
                  <br />
                  <h6 id="devicet">Devices</h6>
                  <select
                    required
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    class="custom-select custom-select-lg mb-3"
                    id="dropdownc"
                    name="telco_devices"
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.device(e.target.value);
                    }}
                  >
                    <option value="null" selected>
                      please select the value
                    </option>
                    {devices.length == 0 ? (
                      <></>
                    ) : (
                      devices.map((item) =>
                        item.name === data.telco_devices ? (
                          <option value={item.name} selected>
                            {item.device_name}
                          </option>
                        ) : (
                          <option value={item.name}>{item.device_name}</option>
                        )
                      )
                    )}
                  </select>
                  <div className="row" style={{ width: "100%" }}>
                    {/* data.t_device_title==''||data.t_device_title==null?<></>: */}
                    <div className="formdevice">
                      <div className="col">
                        {deviceSelected.device_photo != "null" ? (
                          <img
                            src={deviceSelected.device_photo}
                            className="img-fluid"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: deviceSelected.device_content,
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                  <label for="exampleFormControlTextarea1">Price (RM)</label>
                  <input
                    style={{
                      border: `1px solid  ${localStorage.getItem(
                        "theme_color"
                      )}`,
                    }}
                    type="number"
                    class="form-control"
                    value={this.state.final_data.device_cost}
                    disabled
                  />
                  <br />
                </div>
              </div>

              {localStorage.getItem("plan_pkg_subline") == 0 ? (
                <></>
              ) : (
                <div class="card formcard" id="detail11">
                  <label
                    for="exampleFormControlInput1"
                    class="font-weight-bold"
                  >
                    Subline
                  </label>
                  <p style={{ color: "red" }}>
                    *Only {this.state.telco_data.max_subline} Subline is Allowed{" "}
                  </p>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Plan</th>
                        <th scope="col">Device</th>
                        <th scope="col">Price (RM) </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub_line.length == 0 ? (
                        <></>
                      ) : (
                        sub_line.map((item, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.telco_package_plan}</td>
                            <td>{item.device}</td>
                            <td>{item.price}</td>
                            <td>
                              <Popup
                                trigger={
                                  <i
                                    class="fa fa-sort-desc"
                                    aria-hidden="true"
                                  ></i>
                                }
                                modal
                                nested
                              >
                                {(close) => (
                                  <center>
                                    <button
                                      class="btn"
                                      id="popclose"
                                      onClick={() => {
                                        close();
                                      }}
                                    >
                                      X
                                    </button>
                                    <Pop
                                      data={item}
                                      plan={plans}
                                      device={devices}
                                      get={(data) => {
                                        console.log(data);
                                        if (data.data == true) {
                                          this.setState(
                                            {
                                              sub_line: this.state.sub_line.map(
                                                (e, j) => {
                                                  if (j == index) {
                                                    return data.final_data;
                                                  } else return e;
                                                }
                                              ),
                                            },
                                            () => {
                                              console.log(this.state);
                                              const { sub_line } = this.state;
                                              this.setState({
                                                final_data: {
                                                  ...this.state.final_data,
                                                  sub_line,
                                                },
                                              });
                                              console.log(this.state);
                                              close();
                                            }
                                          );
                                        } else {
                                        }
                                      }}
                                    />
                                  </center>
                                )}
                              </Popup>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  {this.state.sub_line.length <
                  this.state.telco_data.max_subline ? (
                    <Popup
                      trigger={
                        <button
                          type="button"
                          class="btn btn-my-color btn-lg"
                          id="orderbutton"
                          style={{
                            backgroundColor: `${localStorage.getItem(
                              "theme_color"
                            )}`,
                            width: "200px",
                            margin: "auto",
                          }}
                        >
                          Add Subline
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <center>
                          <button
                            class="btn"
                            id="popclose"
                            onClick={() => {
                              close();
                            }}
                          >
                            X
                          </button>
                          <NewPop
                            plan={plans}
                            device={devices}
                            get={(data) => {
                              console.log(data);
                              if (data.data == true) {
                                if (
                                  this.state.sub_line.length <
                                  this.state.telco_data.max_subline
                                ) {
                                  this.state.sub_line.push(data.final_data);
                                  console.log(this.state);
                                  const { sub_line } = this.state;
                                  this.setState({
                                    final_data: {
                                      ...this.state.final_data,
                                      sub_line,
                                    },
                                  });
                                  console.log(this.state);
                                  close();
                                } else {
                                  swal(
                                    `Only ${this.state.telco_data.max_subline} subline Allowed `
                                  );
                                  close();
                                }
                              }
                            }}
                          />
                        </center>
                      )}
                    </Popup>
                  ) : (
                    <></>
                  )}

                  <br />
                </div>
              )}

              <div class="card signature-wrapper-main" id="detail11">
                <label for="exampleFormControlInput1" class="font-weight-bold">
                  SIGNATURE
                </label>

                <Sign
                  data={data.t_signature}
                  get={(data) => {
                    console.log(data);
                    this.setState({
                      final_data: {
                        ...this.state.final_data,
                        t_signature: data,
                      },
                    });
                  }}
                />
              </div>
            </form>
          </div>
          <br />
          <br />
          <center>
            <div>
              <Link
                to={{
                  pathname: "/preview",
                  Data: {
                    max_subline: this.state.telco_data.max_subline,
                    credit_card: this.state.credit_card,
                    files_nric_back:
                      this.state.files_nric_back.length > 0
                        ? this.state.files_nric_back
                        : data.nric_back
                        ? `http://167.99.77.197/${data.nric_back}`
                        : "",
                    files_nric_front:
                      this.state.files_nric_front.length > 0
                        ? this.state.files_nric_front
                        : data.nric_front
                        ? `http://167.99.77.197/${data.nric_front}`
                        : "",
                    files_photo:
                      this.state.files_photo.length > 0
                        ? this.state.files_photo
                        : data.photo
                        ? `http://167.99.77.197/${data.photo}`
                        : "",
                    memberData: this.state.memberData,
                    signature: this.state.final_data.t_signature
                      ? this.state.final_data.t_signature
                      : data.t_signature
                      ? data.t_signature
                      : " ",
                    full_name_nric: this.state.final_data.full_name_nric
                      ? this.state.final_data.full_name_nric
                      : data.full_name_nric
                      ? data.full_name_nric
                      : " ",
                    planprice: this.state.final_data.package_price,
                    deviceprice: this.state.final_data.device_cost,
                    sub_line: this.state.sub_line,
                    oldState: { ...this.state },
                  },
                }}
              >
                <button type="submit" class="btn btn-success btn-lg">
                  Preview
                </button>
              </Link>
            </div>
          </center>
          <br />
          <br />
        </div>
      );
    }
  }
}
