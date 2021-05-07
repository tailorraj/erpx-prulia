
import React, { Component } from 'react'

// import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

import Content from './content';
import PageTemplate from './components/pagebreak';
import Axios from 'axios'
import Cookies from 'js-cookie';
import { Link, Router, Redirect } from "react-router-dom"
import { saveAs } from '@progress/kendo-file-saver';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

// import html2pdf from 'html2pdf.js'

import html2pdf from "html2pdf-fix-jspdf";

export default class PdfForm extends Component {
   componentWillMount(){
    window.scrollTo(0,0);

   }

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            pdf: '',
           
            oldState:this.props.location.Data.oldState!==undefined?this.props.location.Data.oldState:{}
        }
        this.setState(
          {
            oldState:{...this.state.oldState, data: {
              ...this.state.oldState.data,
  
            }},
          },()=>{console.log("this is happening")}
        )
        this.PostData=this.PostData.bind(this)
        this.submit=this.submit.bind(this)
        this.uploadFiles=this.uploadFiles.bind(this)
    }

    PostData() {
    
  
            Axios.post(`/api/resource/PRULIA%20Telco%20Connect/`,{prudential_id: this.state.oldState.memberData.prudential_id, 
              telco_id: localStorage.getItem("telco"), ...this.state.oldState.data,}, {
              withCredentials: true,
            })
              .then((res) => {
                console.log(res);
                localStorage.setItem("tcon_id", res.data.data.name); //imp
                console.log(res.data);
              })
              .then(() => {
                this.uploadFiles();
              });
          
        
      }

      
  uploadFiles() {
    const {
      files_photo,
      files_nric_back,
      files_nric_front,
      files_application_form,
    } = this.state.oldState;

    if (files_photo.length != 0 && files_photo.length > 0) {
      
      let photo = new FormData();
      photo.append("cmd", "uploadfile");
      photo.append("doctype", "PRULIA Telco Connect");
      photo.append("filename", Date.now() + files_photo[0].name);
      photo.append("docname", localStorage.getItem("tcon_id"));
      photo.append("from_form", 1);
      photo.append("filedata", files_photo[0].base64);

      Axios.post(`/api/method/uploadfile`, photo, { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.setState({
            oldState:{...this.state.oldState , final_data: {
              ...this.state.oldState.final_data,
              photo: res.data.message.file_url,
            }},
          });
        })
        .catch((err) => console.log(err));
    }

    if (files_nric_back.length != 0 && files_nric_back.length > 0) {
    
      let nric_back = new FormData();
      nric_back.append("cmd", "uploadfile");
      nric_back.append("doctype", "PRULIA Telco Connect");
      nric_back.append("filename", Date.now() + files_nric_back[0].name);
      nric_back.append("docname", localStorage.getItem("tcon_id"));
      nric_back.append("from_form", 1);
      nric_back.append("filedata", files_nric_back[0].base64);
 

      // photo.append('data',files_photo[0].base64)
      Axios.post(`/api/method/uploadfile`, nric_back, { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.setState({
            oldState:{...this.state.oldState , final_data: {
                ...this.state.oldState.final_data,
        
              nric_back: res.data.message.file_url,
            }},
          });
        })
        .catch((err) => console.log(err));
    }

    if (files_nric_front.length != 0 && files_nric_front.length > 0) {
    
      let nric_front = new FormData();
      nric_front.append("cmd", "uploadfile");
      nric_front.append("doctype", "PRULIA Telco Connect");
      nric_front.append("filename", Date.now() + files_nric_front[0].name);
      nric_front.append("docname", localStorage.getItem("tcon_id"));
      nric_front.append("from_form", 1);
      nric_front.append("filedata", files_nric_front[0].base64);

      Axios.post(`/api/method/uploadfile`, nric_front, {
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          this.setState({
              oldState:{...this.state.oldState , final_data: {
              ...this.state.oldState.final_data,
              nric_front: res.data.message.file_url,
              }},
          });
        })
        .catch((err) => console.log(err));
    }
    if (
      files_application_form.length != 0 &&
      files_application_form.length > 0
    ) {
      
      let application_form = new FormData();
      application_form.append("cmd", "uploadfile");
      application_form.append("doctype", "PRULIA Telco Connect");
      application_form.append("filename",localStorage.getItem("tcon_id") + Date.now() + ".pdf");
      application_form.append("docname", localStorage.getItem("tcon_id"));
      application_form.append("from_form", 1);
      application_form.append("filedata", files_application_form);
      Axios.post(`/api/method/uploadfile`, application_form, {
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          this.setState(
            {
                oldState:{...this.state.oldState , final_data: {
            ...this.state.oldState.final_data,
                application_form: res.data.message.file_url,
              }},
            },
            () => {
               
              this.pricing();
            }
          );
        })
        .catch((err) => console.log(err));
    }
  }
  submit() {
   
    Axios.put(
      `/api/resource/PRULIA%20Telco%20Connect/${localStorage.getItem(
        "tcon_id"
      )}`,
      { ...this.state.oldState.final_data },
      {
        withCredentials: true,
      }
    )
      .then((res) => {
          console.log(res);
        localStorage.setItem("pdf", res.data.data.application_form);
      })
      .then(() => {
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pricing() {
    const { sub_line } = this.state.oldState;

    this.setState(
      {
        oldState:{...this.state.oldState , final_data: {
            ...this.state.oldState.final_data, sub_line }},
      },
      () => {
    console.log(this.state);
    const { final_data } = this.state.oldState;
    var sum = 0;
    var devicePrice= final_data.device_cost?Number(final_data.device_cost):0;
    var planPrice= final_data.package_price?Number(final_data.package_price):0;
    sum = sum + devicePrice + planPrice;

    console.log(sum);
    final_data.sub_line
      ? final_data.sub_line.map((res) => {
          console.log(res.price);
          sum = sum + Number(res.price);
        })
      : (sum = sum + 0);
    console.log(sum);
    this.setState({
        oldState:{...this.state.oldState , final_data: {
            ...this.state.oldState.final_data,
        total_price: sum,
      }},
    },()=>{
        this.submit();
    });
    });
   
  }


    render() {
        if (this.state.redirect === true) return <Redirect to="/download" />;

        console.log(this.state);
        return (
            <div>
            <center>  <button type='button' className="btn btn-primary mt-3" 
                    onClick={() => {
                        const element = document.getElementById('element-to-print')
                        this.html2pdfcustom(element);
                    }}>
                    SAVE AND EXPORT
                </button> </center>  
                <div className="pdfformwrapper" >
                 
                    <Content credit_card={this.props.location.Data.credit_card} planprice={this.props.location.Data.planprice} deviceprice={this.props.location.Data.deviceprice} max_subline={this.props.location.Data.max_subline} files_nric_back={this.props.location.Data.files_nric_back} files_nric_front={this.props.location.Data.files_nric_front} files_photo={this.props.location.Data.files_photo} signature={this.props.location.Data.signature} sub_line={this.props.location.Data.sub_line} full_name_nric={this.props.location.Data.full_name_nric} memberData={this.props.location.Data.memberData} />
                </div>
            </div>
        )
    }

    html2pdfcustom = (element) => {
        console.log("here");
        var opt = {
            margin: [0, 0, 0, 0],
            filename: 'some.pdf',
            image: { type: 'jpeg', quality: 5 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: "portrait", unit: "pt", format: "a4" }
        };
          var exporter = html2pdf().from(element).set(opt).toPdf();
        // html2pdf().from(element).set(opt).save();
        
          exporter.output("datauristring").then(function (pdf, item) { 
           localStorage.setItem("pdf",pdf);
        })
        .then(()=>{
            this.setState({
                oldState:{...this.state.oldState ,files_application_form:localStorage.getItem("pdf") }
            },()=>{
                console.log(this.state.oldState);
                localStorage.removeItem("pdf");
             this.PostData();
            });
 


        });

    }
}

