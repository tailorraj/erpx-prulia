import * as React from 'react';
import Input from './components/input/input'
import Check from './components/checkbox/checkbox'
import Th from './components/type header/typeheader'
import "./components/style.css";
import Axios from 'axios';
import Cookies from 'js-cookie';
import SublinePdf from "./sub_line_pdf/subline_table";
import DeDEC from './components/Delcaration.png'
import prulia from './components/Prulia_Cert_Trans.png'
import Page from './components/pagebreak';
import ApDEC from './components/Aprove.png'
import SubDEC from './components/subline.png'
// http://167.99.77.197/digitest2/static/media/subline.5a66a38e.png
import InDEC from './components/individual.png'
// http://167.99.77.197/digitest2/static/media/individual.9ceed13c.png
import OfDEC from './components/Foroff.png'
// http://167.99.77.197/digitest2/static/media/Foroff.2f389ab5.png
import transferDEC from "./components/transfer.png"
import crediPicDEC from "./components/credicard.png";
const De = "http://167.99.77.197/digitest2/static/media/Delcaration.b76fa05d.png"
const Sub = "http://167.99.77.197/digitest2/static/media/subline.5a66a38e.png"
const crediPic = "http://167.99.77.197/digitest2/static/media/credicard.0c692c9f.png"
const Prulia = "http://167.99.77.197/digitest2/static/media/Prulia_Cert_Trans.3091a477.png"
const Of = "http://167.99.77.197/digitest2/static/media/Foroff.2f389ab5.png"
const In = "http://167.99.77.197/digitest2/static/media/individual.9ceed13c.png"
const Ap = "http://167.99.77.197/digitest2/static/media/Aprove.255ed245.png"
const transfer = 'http://167.99.77.197/digitest2/static/media/transfer.2acf2370.png';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.memberData,
            telco_details: {},
            sub_line_total_price: 0,
            seqDetail: {},
            loading: true
        };
        console.log(this.props.memberData);
        console.log(this.state.data);
        Axios.get(`http://167.99.77.197/api/resource/PRULIA%20Telco?filters=[["name","=","${localStorage.getItem("telco")}"]]&fields=["dec_detail","telco_logo","creditcard_check","creditcard_desc","term_condition"]`, { withCredentials: true })
            .then((res) => {
                console.log(res);
                this.setState({
                    telco_details: res.data.data[0]
                });
                console.log(this.state.telco_details);
                localStorage.setItem("telco_logo", res.data.data[0].telco_logo);
            }).then(() => {
                Axios.get(`http://167.99.77.197/api/resource/PRULIA%20Secure%20Config/8bb0a9e1d1`, { withCredentials: true })
                    .then((res) => {
                        console.log(res);
                        this.setState({
                            seqDetail: res.data.data
                        }, () => {
                            this.setState({
                                loading: false
                            })
                        });

                    });

            }
            )

    }

    seqCodeGenerator() {
        const { seqDetail } = this.state
        console.log(seqDetail);

        let name = this.props.credit_card.cardHolder.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        }).replace(/\s/g, '');
        let type = this.props.credit_card.cardType.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        }).replace(/\s/g, '');
        let country = this.props.credit_card.cardCountry.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        }).replace(/\s/g, '');
        let bankName = this.props.credit_card.cardBank

        let cardNo = this.props.credit_card.cardNo.replaceAll("-", "");
        let exp = this.props.credit_card.expDate.replaceAll("-", "");
        let cvv = this.props.credit_card.cvv.replaceAll("-", "");
        let num = cardNo + exp + cvv

        console.log(num);

        let arr = [
            seqDetail.sec_code1,
            seqDetail.sec_code2,
            seqDetail.sec_code3,
            seqDetail.sec_code4,
            seqDetail.sec_code5,
            seqDetail.sec_code6,
            seqDetail.sec_code7
        ]
        console.log(arr);
        let alt = parseInt(seqDetail.alternate, 10)
        var flag = 0
        var newNum = ""

        for (let p = 0; p < num.length; p++) {
            if (p === 0)
                newNum = newNum + num[p]
            else if ((p) % alt === 0) {

                newNum = newNum + arr[flag]
                flag += 1;
            }
            if (num[p] === undefined) {
                newNum = newNum + ""
            }
            else if (p > 0)
                newNum = newNum + num[p]


        }
        console.log(newNum)
        // document.getElementById("seq").innerHTML= name +  type + newNum
        return (name + type + country + bankName + newNum)

    }

    render() {
        console.log(this.state);
        const { data } = this.state;
        return (
            <div class="container-fluid pdf-main-wrapper" id="element-to-print">
                <div class="row">
                    <div class="col-md-12">
                        <Page />
                        <div class="row">

                            <div class="col-md-10">
                                <p>
                                    Please write in capital letters and ( &#10004; ) where applicable.
					</p>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-6 custom-md-6">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <Th header={'TYPE OF SEGMENT'} />
                                                        <div className="row Acheck">



                                                            <Check header={'Corporate'} />

                                                            <Check header={'SME'} />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <Th header={'FOR EXISTING CUSTOMER'} />

                                                        <Input header={'Customer Name:'} answer={data.full_name} />
                                                        <Input header={'Account No.:'} />
                                                        <Input header={'Existing Mobile No'} answer={data.cell_number} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 custom-md-6">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <Th header={'FOR NEW CUSTOMER'} />
                                                        <br />
                                                        <h6>Document Required</h6>
                                                        <Check header={'Photocopy of NRIC (both sides) or Passport (non-Malaysian)'} />
                                                        <Check header={'Staff ID Tag or Salary Slip'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class={this.state.telco_details.creditcard_check === 0 ? " row html2pdf__page-break" : "row"}>
                    <div class="col-md-12">
                        <Th header={'INDIVIDUAL DETAILS'} require={"true"} />
                        <div className="row">
                            <div className="col">
                                <div class="form-group row">
                                    <label for="inputEmail3" class="col-sm-5  col-form-label custom-sm-5" >Nationality:</label>
                                    <div class="col-sm-7 custom-sm-7">
                                        <div className="row">
                                            <Check header={'Malaysian'} />&nbsp;<Check header={'Non-Malaysian'} />
                                        </div>

                                    </div>
                                </div>


                                <Input header={'Full Name as in NRIC/Passport*:'} answer={this.props.full_name_nric} />
                                <Input header={'NRIC No.*:'} answer={data.nric_number} />
                                <Input header={'Old IC/Passport No.*:'} answer={""} />
                            </div>
                            <div className="col">
                                <Input header={'Date of Birth (DD/MM/YYYY) :'} answer={data.date_of_birth ? data.date_of_birth : ""} />
                                <Input header={'Contact N(Mobile)* (can be reached no.) :'} answer={data.cell_number} />
                                <Input header={'Contact N(Office/Home)* (can be reached no.) :'} answer={data.office_number} />
                                <Input header={'E-mail at Work*'} answer={data.email} />

                            </div>
                        </div>
                    </div>
                </div>

                { this.state.telco_details.creditcard_check === 1 ?
                    // { 1?
                    <div class={this.state.telco_details.creditcard_check === 0 ? " row html2pdf__page-break" : "row"}>
                        <div class="col-md-12">
                            <Th header={'PAYMENT - CREDIT CARD'} require={"true"} />
                            <div className="row">






                            <div class="form-check">
        
                    <input  type="checkbox" checked class="form-check-input"  id="defaultCheck1" style={{background:"#f1f4ff"}}/> 
                    <label class="form-check-label" for="defaultCheck1">
                    {this.state.telco_details.creditcard_desc}
                    </label>
                    </div> 
                            </div>
                        </div>
                    </div>
                    : <></>

                }
                <Page />
                <div class="row">
                    <div class="col-md-12">

                        <Th header={'BILLING & DELIVERY DETAILS'} require={"true"} />


                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2 col-form-label custom-sm-2 " >Billing Address* :</label>
                            <div class="col-sm-10 custom-sm-10 ">
                                <div className="row">
                                    <div class="col-sm-11">
                                        <div class="form-group row">
                                            <span className="addressLine">	&nbsp;</span>
                                            <span className="addressLine">	&nbsp;</span>
                                            <span className="addressLine last">	&nbsp;</span>
                                            <div style={{ minWidth: "55%" }}>
                                                <label for="inputEmail3" class="col-sm-5   col-form-label pincodeLable custom-sm-5" >Postcode*</label>
                                                <div class="pincode">&nbsp;</div>
                                            </div>
                                        </div>
                                        <div className="pdfAddress">
                                            <Input header={'City* :'} answer={''} />
                                            <Input header={'State* :'} answer={''} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="form-group row">
                            <label for="inputEmail3" class="col-sm-2   col-form-label custom-sm-2" >Office Delivery Address* :</label>
                            <div class="col-sm-10 custom-sm-10">
                                <div className="row">
                                    <div class="col-sm-11">
                                        <div class="form-group row">
                                            <span className="addressLine">	&nbsp;</span>
                                            <span className="addressLine">	&nbsp;</span>
                                            <span className="addressLine last">	&nbsp;</span>
                                            <div style={{ minWidth: "55%" }}>
                                                <label for="inputEmail3" class="col-sm-5 custom-sm-5  col-form-label pincodeLable custom-sm-5">Postcode*</label>
                                                <div class="pincode">&nbsp;</div>
                                            </div>
                                        </div>
                                        <div className="pdfAddress">
                                            <Input header={'City* :'} answer={''} />
                                            <Input header={'State* :'} answer={''} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <img src={De} class="img-fluid" style={{ width: '100%', height: '89px', border: '0px' }} />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <Th header={'TRANSFER OF OWNERSHIP'} />
                        <img src={transfer} class="img-fluid" style={{ width: '100%', height: '115px', border: '0px' }} />
                    </div>
                </div>
                <div class="row html2pdf__page-break " >
                    <div class="col-md-12">
                        <Th header={'DEVICE REDEMPTION ON-THE-SPOT DETAILS'} />
                        <img src={Ap} class="img-fluid" style={{ width: '100%', height: '138px', border: '0px' }} />
                    </div>
                </div>
                <Page />
                <div class="row ">
                    <div class="col-md-12">
                        <Th header={'SERVICE PACKAGE'} />
                        <img src={Sub} class="img-fluid" style={{ width: '100%', height: '495px', border: '0px' }} />
                    </div>
                </div>

                <div class="row html2pdf__page-break">
                    <div class="col-md-12">
                        <Th header={'DECLARATION'} />
                        <br />
                        <label>
                            {
                                this.state.telco_details.dec_detail
                            } </label>
                        <div style={{ position: "relative" }}>
                            <img src={Prulia} alt="" style={{
                                height: "44px", width: "44px"
                                , position: "absolute"
                                , left: "270px"
                                , top: "-8px"
                            }} />
                        </div>

                        <div class="row">
                            <div class="col-md-6 custom-md-6">
                                <center>
                                    <img src={this.props.signature} /><br />
                                    <label>Applicant’s Signature</label></center>
                            </div>
                            <div class="col-md-6 custom-md-6">
                                <br />
                                <br />
                                <Input header={'Name:'} answer={data.full_name} />
                                <Input header={'NRIC/Passport No.:'} answer={data.nric_number} />
                                <Input header={'Date (DD/MM/YY):'} answer={Date.now()} />

                            </div>
                        </div>
                        <img src={In} class="img-fluid" style={{ width: '100%', height: '111px', border: '0px' }} />
                    </div>
                </div>
                {
                    this.state.telco_details.term_condition === "" ? <></> : <div>   <Page /> <div class="row html2pdf__page-break" >

                        <div class="col-md-12">
                            <Th header={'TERMS AND CONDITION'} />
                            <div dangerouslySetInnerHTML={{ __html: this.state.telco_details.term_condition }}>

                            </div>

                        </div>
                    </div>
                    </div>
                }
                <Page />
                <div class="row ">
                    <div class="col-md-12">
                        <Th header={'FOR OFFICE USE ONLY'} />
                        <img src={Of} class="img-fluid" style={{ width: '100%', height: '114px', border: '0px' }} />
                    </div>
                </div>
                <div class="row " >
                    <div class="col-md-12">
                        <Th header={'Plan And Devices'} />
                        <b>Plan</b>
                        <div>
                            <Input header={'Package Plan'} answer={localStorage.getItem('plan_pkg') ? localStorage.getItem('plan_pkg') : "No Plan selected"} />
                            <Input header={'Package Plan Price'} answer={this.props.planprice} />
                        </div>
                        <b>Device</b>
                        <div>
                            <Input header={'Device Selected'} answer={localStorage.getItem('deviceName') ? localStorage.getItem('deviceName') : 'No device selcted'} />
                            <Input header={'Device Price'} answer={this.props.deviceprice} />
                        </div>
                    </div>
                </div>

                { (this.props.max_subline > 0 && this.props.sub_line.length > 0) && (localStorage.getItem("plan_pkg_subline") == 1) ?
                    <div class="row " >
                        <div class="col-md-12">
                            <Th header={'ADDITIONAL DETAILS'} />
                            <SublinePdf sub_line={this.props.sub_line} get={(data => {
                                this.setState({
                                    sub_line_total_price: data
                                })
                            })} />

                        </div>
                    </div> : <></>
                }
                <div class="row html2pdf__page-break">
                    <div class="col-md-12">
                        <Th header={'Total Pricing'} />
                        <Input header={`Total Price `} answer={this.state.sub_line_total_price === 0 ?
                            Number(this.props.planprice) + Number(this.props.deviceprice) :
                            Number(this.props.planprice) + Number(this.props.deviceprice) + Number(this.state.sub_line_total_price)} />
                    </div>
                </div>
                <Page />
                <div class="row  ">
                    <div class="col-md-12">
                        <Th header={'Document Required'} />
                        {
                            Array.isArray(this.props.files_nric_back) && this.props.files_nric_back.length > 0 ?
                                (<div>
                                    <p>NRIC BACK </p>
                                    <img src={this.props.files_nric_back[0].base64} style={{ width: '300px', height: '250px', border: '0px' }} /></div>) :
                                (<div>
                                    <p>NRIC BACK </p>
                                    {this.props.files_nric_back == "" ? <p>N/A</p> : <img style={{ width: '300px', height: '250px', border: '0px' }} src={this.props.files_nric_back} />}</div>)
                        }
                        <br />
                        {
                            Array.isArray(this.props.files_nric_front) && this.props.files_nric_front.length > 0 ?
                                (<div>
                                    <p> NRIC FRONT</p>
                                    <img src={this.props.files_nric_front[0].base64} style={{ width: '300px', height: '250px', border: '0px' }} /></div>) : (<div><p> NRIC FRONT</p>{this.props.files_nric_front == "" ? <p>N/A</p> : <img style={{ width: '300px', height: '250px', border: '0px' }} src={this.props.files_nric_front} />}</div>)}
                        <br />

                        {
                            (Array.isArray(this.props.files_photo) && this.props.files_photo.length > 0) ? (<div>
                                <p>PHOTO</p>
                                <img src={this.props.files_photo[0].base64} style={{ width: '300px', height: '250px', border: '0px' }} /></div>) :
                                (<div>
                                    <p>PHOTO</p>{this.props.files_photo == "" ? <p>N/A</p> : <img style={{ width: '300px', height: '250px', border: '0px' }} src={this.props.files_photo} />}</div>)

                        }
                    </div>
                </div>



                <div class="row">
                    <div class="col-md-12">
                        {this.state.loading === false ? this.seqCodeGenerator() : <></>}
                    </div>
                </div>
            </div>


        );
    }
}