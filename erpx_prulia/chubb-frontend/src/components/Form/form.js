import React from "react";
import "./form.scss";
import { withRouter } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import axios from "axios";

window.moment = moment;

const makePDF = (elementId) => {
    let pages = ["#page1", "#page2", "#page3", "#page4"];
    let tasks = pages.map((page) => {
        let el = document.querySelector(page);

        return html2canvas(el);
    });

    return Promise.all(tasks).then((canvases) => {
        let pdf = new jsPDF({
            orientation: "p",
            unit: "pt",
            format: "a4",
        });

        canvases.forEach((canvas, index) => {
            const imgData = canvas.toDataURL("image/jpeg");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            const padding = 40;

            if (index > 0) {
                pdf.addPage();
                pdf.setPage(index + 1);
            }

            pdf.addImage(
                canvas.toDataURL("image/jpeg"),
                "JPEG",
                padding,
                padding,
                pdfWidth - padding * 2,
                pdfHeight - padding * 2
            );
        });

        pdf.save('test.pdf');

        return pdf.output("datauristring");
    });
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // comment this in prod, used for testing

        // let data = {
        //     member: "0000001",
        //     total: 556.5,
        //     mainInsured: true,
        //     spouse: true,
        //     card_sign:
        //         "data:image/png;base64,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",
        //     child: true,
        //     childs: 1,
        //     childsArr: [],
        //     memberDetails: {},
        //     mainInsuredBirthDate: "1990-01-01",
        //     mainInsuredEmail: "yapnicole93@gmail.com",
        //     mainInsuredGender: "Female",
        //     mainInsuredMobileNo: "6019-999 99999",
        //     mainInsuredName: "Nicole Sherzinger",
        //     mainInsuredNric: "900101-88-8888",
        //     mainInsuredStatus: "Married",
        //     mainInsuredAddress: "abc",
        //     mainInsuredPostcode: "111111",
        //     main_sign:
        //         "data:image/png;base64,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",
        //     spouseName: "abc",
        //     spouseNric: "901010-88-8888",
        //     spouseBirthDate: "1990-10-10",
        //     acknowledge_child: true,
        //     childName0: "abc",
        //     childBirthDate0: "2012-12-12",
        //     accountHolderName: "Nicole Sherzinger",
        //     payment_method: "Credit Card",
        //     declaration: true,
        //     privacyNotice: true,
        //     paymentInstruction: true,
        //     issuing_bank: "maybank",
        //     card_number: "1111-1111-1111-1111",
        //     card_expiry: "12/2023",
        // };

        // Object.keys(data).forEach((key) => {
        //     this.props.gettingValues(
        //         {
        //             target: {
        //                 value: data[key],
        //             },
        //         },
        //         key
        //     );
        // });
    }

    printElem = () => {
        setTimeout(() => {
            // this.props.history.push('/declaration')

            let data = {
                member: this.props.state.member,
                main_dob: this.props.state.mainInsuredBirthDate,
                main_email: this.props.state.mainInsuredEmail,
                main_gender: this.props.state.mainInsuredGender,
                main_cell_number: this.props.state.mainInsuredMobileNo,
                main_full_name: this.props.state.mainInsuredName,
                main_nric_number: this.props.state.mainInsuredNric,
                main_marital_status: this.props.state.mainInsuredStatus,
                main_address: this.props.state.mainInsuredAddress,
                main_postcode: this.props.state.mainInsuredPostcode,
                main_sign: this.props.state.main_sign,

                spouse_name: this.props.state.spouseName,
                spouse_nric_number: this.props.state.spouseNric,
                spouse_dob: this.props.state.spouseBirthDate,

                children_table: [],

                payment_method: this.props.state.payment_method,
                issuing_bank: this.props.state.issuing_bank,
                card_number: this.props.state.card_number,
                card_expiry: this.props.state.card_expiry,
                total: this.props.state.total,
                card_sign: this.props.state.card_sign,
            };

            makePDF().then((pdf_blob) => {
                Object.keys(this.props.state).forEach((key) => {
                    if (key.startsWith("childName")) {
                        data.children_table[getNum(key)] =
                            data.children_table[getNum(key)] || {};
                        data.children_table[
                            getNum(key)
                        ].full_name = this.props.state[key];
                    }

                    if (key.startsWith("childBirthDate")) {
                        data.children_table[getNum(key)] =
                            data.children_table[getNum(key)] || {};
                        data.children_table[getNum(key)].dob = this.props.state[
                            key
                        ];
                    }

                    function getNum(key) {
                        return parseInt(
                            key
                                .replace("childName", "")
                                .replace("childBirthDate", "")
                        );
                    }
                });

                return uploadFile(pdf_blob)
                    .then((res) => {
                        data.application_form =
                            res &&
                            res.data &&
                            res.data.message &&
                            res.data.message.file_url;
                        return submitApplication(data).then((res) => {
                            window.alert("Your application is now submitted.");
                            window.location.href = "/";
                        });
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            });

            function uploadFile(pdf_blob) {
                let form = new FormData();
                let filename = data.member + "_" + Date.now() + ".pdf";

                form.append("doctype", "PRULIA PA");

                form.append("is_private", 0);
                form.append("cmd", "uploadfile");
                form.append("from_form", 1);

                form.append("filename", filename);
                form.append("filedata", pdf_blob);

                return axios.post(getURL(), form);
            }

            function submitApplication(data) {
                return axios.post(
                    getURL() +
                        "api/method/erpx_prulia.prulia_pa.doctype.prulia_pa.prulia_pa.submit_application",
                    data
                );
            }

            function getURL() {
                return window.location.hostname.includes("localhost")
                    ? "http://167.99.77.197/"
                    : "/";
            }
        }, 500);
    };

    componentDidMount() {
        setTimeout(() => {
            try {
                this._componentDidMount();
            } catch (e) {
                console.error(e);
                window.alert("Please login to continue.");
                window.location.href = "/";
            }
        }, 500);
    }

    _componentDidMount() {
        // Main insured session
        let mainInsuredName = this.props.state.mainInsuredName;
        let mainInsuredEmail = this.props.state.mainInsuredEmail;
        let mainInsuredNric = this.props.state.mainInsuredNric;
        let mainInsuredMobileNo = this.props.state.mainInsuredMobileNo;
        let mainInsuredBirthDate = this.props.state.mainInsuredBirthDate;
        let mainInsuredGender = this.props.state.mainInsuredGender;
        let mainInsuredStatus = this.props.state.mainInsuredStatus;
        let mainInsuredAddress = this.props.state.mainInsuredAddress;
        let mainInsuredPostcode = this.props.state.mainInsuredPostcode;

        let mainInsuredNameDiv = document.getElementById("mainInsuredName");

        for (let i = 0; i < 43; i++) {
            mainInsuredNameDiv.innerHTML += `<div id="mainInsuredName${i}" class="box">${
                mainInsuredName[i] || ""
            }</div>`;
        }

        let mainInsuredAddressDiv = document.getElementById("address");

        for (let i = 0; i < 113; i++) {
            mainInsuredAddressDiv.innerHTML += `<div id="mainInsuredAddress${i}" class="box"></div>`;
        }
        if (mainInsuredAddress) {
            for (let i = 0; i < mainInsuredAddress.length; i++) {
                document.getElementById(`mainInsuredAddress${i}`).innerHTML =
                    mainInsuredAddress[i];
            }
        }
        mainInsuredAddressDiv.innerHTML += `<div class="postcode" ><p>Postcode / <i>Poskod<i/></p></div>`;
        for (let i = 0; i < 6; i++) {
            mainInsuredAddressDiv.innerHTML += `<div id="mainInsuredAddress${i}" class="box">${mainInsuredPostcode[i]}</div>`;
        }

        let mainInsuredNricDiv = document.getElementById("mainInsuredNric");

        for (let i = 0; i < 14; i++) {
            mainInsuredNricDiv.innerHTML += `<div id="mainInsuredNric${i}" class="box"></div>`;
        }
        if (mainInsuredNric) {
            mainInsuredNric = mainInsuredNric.toString();
            for (let i = 0; i < 14; i++) {
                document.getElementById(`mainInsuredNric${i}`).innerHTML =
                    mainInsuredNric[i];
            }
        }

        let mainInsuredBirthDateDiv = document.getElementById(
            "mainInsuredBirthDate"
        );
        for (let i = 0; i < 10; i++) {
            mainInsuredBirthDateDiv.innerHTML += `<div id="mainInsuredBirthDate${i}" class="box"></div>`;
        }
        if (mainInsuredBirthDate) {
            mainInsuredBirthDate = mainInsuredBirthDate.toString();
            for (let i = 0; i < 10; i++) {
                document.getElementById(`mainInsuredBirthDate${i}`).innerHTML =
                    mainInsuredBirthDate[i];
            }
        }

        let maleDiv = document.getElementById("male");
        let femaleDiv = document.getElementById("female");
        if (mainInsuredGender === "Male") {
            maleDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        } else if (mainInsuredGender === "Female") {
            femaleDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }

        let marriedDiv = document.getElementById("married");
        let singleDiv = document.getElementById("single");
        let othersDiv = document.getElementById("others");
        if (mainInsuredStatus === "married") {
            marriedDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        } else if (mainInsuredStatus === "single") {
            singleDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        } else if (mainInsuredStatus === "others") {
            othersDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }

        let phoneNoDiv = document.getElementById("phoneNo");
        for (let i = 0; i < 14; i++) {
            if (i !== 4) {
                phoneNoDiv.innerHTML += `<div id="phoneNo${i}" class="box"></div>`;
            } else {
                phoneNoDiv.innerHTML += `<div class="dash">-</div>`;
            }
        }
        if (mainInsuredMobileNo) {
            mainInsuredMobileNo = mainInsuredMobileNo.toString();
            for (let i = 0; i < 14; i++) {
                if (i !== 4) {
                    document.getElementById(`phoneNo${i}`).innerHTML =
                        mainInsuredMobileNo[i] || "";
                }
            }
        }

        let emailDiv = document.getElementById("emailDiv");

        for (let i = 0; i < 40; i++) {
            emailDiv.innerHTML += `<div id="emailDiv${i}" class="box"></div>`;
        }
        if (mainInsuredEmail) {
            for (let i = 0; i < mainInsuredEmail.length; i++) {
                document.getElementById(`emailDiv${i}`).innerHTML =
                    mainInsuredEmail[i];
            }
        }

        // Spouse and child session
        let spouseName = this.props.state.spouseName;
        let spouseNric = this.props.state.spouseNric;
        let spouseBirthDate = this.props.state.spouseBirthDate;
        let childs = this.props.state.childs;

        let spouseTrue = document.getElementById("spouseTrue");
        let childTrue = document.getElementById("childTrue");
        if (this.props.state.spouse) {
            spouseTrue.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }
        if (this.props.state.child) {
            childTrue.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }

        let spouseNameDiv = document.getElementById("spouseNameDiv");
        for (let i = 0; i < 43; i++) {
            spouseNameDiv.innerHTML += `<div id="spouseNameDiv${i}" class="box"></div>`;
        }
        if (spouseName) {
            for (let i = 0; i < spouseName.length; i++) {
                document.getElementById(`spouseNameDiv${i}`).innerHTML =
                    spouseName[i];
            }
        }

        let spouseNricDiv = document.getElementById("spouseNricDiv");
        for (let i = 0; i < 14; i++) {
            spouseNricDiv.innerHTML += `<div id="spouseNricDiv${i}" class="box"></div>`;
        }
        if (spouseNric) {
            spouseNric = spouseNric.toString();
            for (let i = 0; i < 14; i++) {
                document.getElementById(`spouseNricDiv${i}`).innerHTML =
                    spouseNric[i];
            }
        }

        let spouseBirthDateDiv = document.getElementById("spouseBirthDateDiv");
        if (spouseBirthDate) {
            for (let i = 0; i < 10; i++) {
                spouseBirthDateDiv.innerHTML += `<div id="spouseBirthDateDiv${i}" class="box"></div>`;
            }
            for (let i = 0; i < spouseBirthDate.length; i++) {
                document.getElementById(`spouseBirthDateDiv${i}`).innerHTML =
                    spouseBirthDate[i];
            }
        } else {
            for (let i = 0; i < 10; i++) {
                if (i === 4) {
                    spouseBirthDateDiv.innerHTML += `<div id="spouseBirthDateDiv${i}" class="box">-</div>`;
                } else if (i === 7) {
                    spouseBirthDateDiv.innerHTML += `<div id="spouseBirthDateDiv${i}" class="box">-</div>`;
                } else {
                    spouseBirthDateDiv.innerHTML += `<div id="spouseBirthDateDiv${i}" class="box"></div>`;
                }
            }
        }

        let noOfChilds = document.getElementById("noOfChilds");
        if (childs !== 0) {
            childs = childs.toString();
            console.log(childs);
            for (let i = 0; i < 2; i++) {
                if (childs.length === 1 && i === 0) {
                    noOfChilds.innerHTML += `<div id="noOfChilds${i}" class="box">0</div>`;
                    noOfChilds.innerHTML += `<div id="noOfChilds${
                        i + 1
                    }" class="box">${childs[0]}</div>`;
                } else if (childs.length > 1) {
                    noOfChilds.innerHTML += `<div id="noOfChilds${i}" class="box">${childs[i]}</div>`;
                }
            }
        } else {
            for (let i = 0; i < 2; i++) {
                noOfChilds.innerHTML += `<div id="noOfChilds${i}" class="box"></div>`;
            }
        }

        let childTable = document.getElementById("childTable");
        if (childs !== 0) {
            for (let i = 0; i < childs; i++) {
                childTable.innerHTML += `<tr>
        <td id="childTable${i}" class='name'>${
                    this.props.state[`childName${i}`]
                        ? this.props.state[`childName${i}`]
                        : ""
                }</td>
        <td>${
            this.props.state[`childBirthDate${i}`]
                ? this.props.state[`childBirthDate${i}`]
                : ""
        }</td>
        </tr>`;
            }
        } else {
            for (let i = 0; i < 4; i++) {
                childTable.innerHTML += `<tr>
          <td id="childTable${i}" class='name'></td>
          <td></td>
          </tr>`;
            }
        }

        // Card details
        let accountHolderNameDiv = document.getElementById(
            "accountHolderNameDiv"
        );
        let accountHolderName = this.props.state.accountHolderName;
        let payment_method = this.props.state.payment_method;

        let creditCard = payment_method === "Credit Card";
        let debitCard = payment_method === "Dedit Card";
        let masterCard = payment_method === "Master Card";
        let visa = payment_method === "Visa";

        for (let i = 0; i < 38; i++) {
            accountHolderNameDiv.innerHTML += `<div id="accountHolderNameDiv${i}" class="box"></div>`;
        }
        if (accountHolderName) {
            for (let i = 0; i < accountHolderName.length; i++) {
                document.getElementById(`accountHolderNameDiv${i}`).innerHTML =
                    accountHolderName[i];
            }
        }

        let creditCardDiv = document.getElementById("creditCardDiv");
        let debitCardDiv = document.getElementById("debitCardDiv");
        let masterCardDiv = document.getElementById("masterCardDiv");
        let visaDiv = document.getElementById("visaDiv");

        if (creditCard) {
            creditCardDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }
        if (debitCard) {
            debitCardDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }
        if (visa) {
            visaDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }
        if (masterCard) {
            masterCardDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
        }

        let issuing_bankDiv = document.getElementById("issuing_bankDiv");
        let issuing_bank = this.props.state.issuing_bank;

        for (let i = 0; i < 16; i++) {
            issuing_bankDiv.innerHTML += `<div id="issuing_bankDiv${i}" class="box"></div>`;
        }
        if (issuing_bank) {
            for (let i = 0; i < issuing_bank.length; i++) {
                document.getElementById(`issuing_bankDiv${i}`).innerHTML =
                    issuing_bank[i];
            }
        }

        let card_numberDiv = document.getElementById("card_numberDiv");
        let card_number = this.props.state.card_number;

        for (let i = 0; i < 19; i++) {
            if (i === 4 || i === 9 || i === 14) {
                card_numberDiv.innerHTML += `<div id="card_numberDiv${i}" class="dash">-</div>`;
            } else {
                card_numberDiv.innerHTML += `<div id="card_numberDiv${i}" class="box">${
                    card_number[i] || ""
                }</div>`;
            }
        }
        // if (card_number) {
        //   for (let i = 0; i < card_number.length; i++) {
        //     document.getElementById(`card_numberDiv${i}`).innerHTML =
        //       card_number[i]
        //   }
        // }

        let card_expiryDiv = document.getElementById("card_expiryDiv");
        let card_expiry = this.props.state.card_expiry;

        for (let i = 0; i < 5; i++) {
            if (i === 2) {
                card_expiryDiv.innerHTML += `<div id="card_expiryDiv${i}" class="dash">/</div>`;
            } else {
                card_expiryDiv.innerHTML += `<div id="card_expiryDiv${i}" class="box">${
                    card_expiry[i] || ""
                }</div>`;
            }
        }

        let paymentDateDiv = document.getElementById("paymentDateDiv");
        let paymentDate = moment().format("YYYY-MM-DD");

        for (let i = 0; i < 10; i++) {
            paymentDateDiv.innerHTML += `<div id="paymentDateDiv${i}" class="box">${
                paymentDate[i] || ""
            }</div>`;
        }

        let totalDiv = document.getElementById("totalDiv");
        let total = this.props.state.total.toFixed(2).toString();

        for (let i = 0; i < total.length; i++) {
            totalDiv.innerHTML += `<div id="totalDiv${i}" class="box">${
                total[i] || ""
            }</div>`;
        }

        document
            .getElementById("mainSign")
            .setAttribute("src", this.props.state.main_sign);
        document
            .getElementById("cardSign")
            .setAttribute("src", this.props.state.card_sign);

        this.printElem();
    }

    render() {
        return (
            <div id="form" className="form-main container">
                <div class="loader">
                    <div class="spinner">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="20" />
                        </svg>
                    </div>
                </div>
                <div className="info-div page1" id="page1">
                    <div className="heading-div">
                        <div className="heading">
                            <h3>
                                Personal Accident Insurance{" "}
                                <span>
                                    <i>Insurans Perlindungan Diri</i>
                                </span>
                            </h3>
                            <h6>
                                Proposal Form / <i>Borang Cadangan</i>
                            </h6>
                        </div>
                    </div>

                    <div className="information">
                        <div className="company-name">
                            <h3>
                                CHUBB<sup>®</sup>{" "}
                            </h3>
                        </div>
                        <div className="statements">
                            <p className="underLine">
                                <span className="bold">
                                    Statement Pursuant to Schedule 9 of
                                    Financial Services Act 2013{" "}
                                </span>{" "}
                                <br />
                                Kenyataan Mengikut Jadual 9 Akta Perkhidmatan
                                Kewangan 2013
                            </p>
                            <p>
                                (a) not to make a misrepresentation to Chubb
                                Insurance Malaysia Berhad (Chubb) when answering
                                any questions We ask in this proposal form;{" "}
                                <br />
                                <br />
                                (b) when renewing this Policy, not to make a
                                misrepresentation to Us in answering any
                                questions, or confirming or amending any matter
                                previously disclosed to Us in relation to this
                                Policy; and <br /> <br />
                                (c) to disclose to Us any matter, other than
                                what We have asked in (a) and (b) above, that
                                You know to be relevant to Our decision on
                                whether to accept the risk or not and the rates
                                and terms to be applied. <br /> <br />
                                Your duty to take reasonable care for the above
                                shall be based on what a reasonable person in
                                Your circumstances would have known. <br />{" "}
                                <br />
                                <i>
                                    Anda mempunyai kewajipan untuk mengambil
                                    langkah yang sewajarnya : <br /> <br />
                                    (a) untuk tidak membuat salah nyataan kepada
                                    Chubb Insurance Malaysia Berhad (Chubb)
                                    apabila menjawab apa-apa soalan yang Kami
                                    tanya di dalam borang cadangan ini;
                                    <br /> <br />
                                    (b) apabila memperbaharui Polisi ini, tidak
                                    membuat salah nyataan kepada Kami apabila
                                    menjawab apa-apa soalan, atau mengesahkan
                                    atau meminda apa-apa perkara yang telah
                                    didedahkan sebelum itu kepada Kami
                                    berhubungan dengan Polisi ini; dan
                                    <br /> <br />
                                    (c) untuk mendedahkan kepada Kami apa-apa
                                    perkara, selain daripada apa yang Kami
                                    kehendaki di (a) dan (b) di atas, yang Anda
                                    ketahui sebagai berkaitan dengan keputusan
                                    Kami sama ada untuk menerima risiko atau
                                    tidak dan kadar dan terma yang hendak
                                    dikenakan.
                                    <br /> <br />
                                    Kewajipan Anda untuk mengambil langkah yang
                                    sewajarnya untuk di atas adalah berdasarkan
                                    kepada apa yang orang yang mengalami keadaan
                                    Anda mungkin ketahui.
                                </i>
                                <br /> <br />
                            </p>
                            <p className="underLine">
                                <span className="bold">Note/ </span> <i>Nota</i>
                                :
                            </p>
                            <p>
                                Coverage requested in this Enrolment Form should
                                not be construed as an acceptance or commitment
                                on the part of the Insurer unless the same is
                                incorporated in the Policy evidencing such
                                cover. <br /> <br />
                                <i>
                                    Perlindungan yang dipohon di dalam Borang
                                    Pendaftaran ini tidak sepatutnya ditafsir
                                    sebagai penerimaan atau komitmen oleh
                                    Penanggung Insurans melainkan jika ia
                                    dinyatakan di dalam Polisi yang membuktikan
                                    perlindungan tersebut
                                    <br /> <br />
                                    *Chubb reserves the right to reject any
                                    application for this Policy without
                                    assigning any reasons thereof Enrolment /
                                    Renewal is strictly for Prulia Members Only.
                                    <br /> <br />
                                    *Chubb berhak menolak mana-mana permohonan
                                    untuk Polisi ini tanpa memberi apa-apa
                                    sebabnya.
                                    <br /> <br />
                                    Enrolment/Renewal is strictly for Prulia
                                    members only. / Pendaftaran/Pembaharuan
                                    adalah terhad kepada ahli Prulia sahaja{" "}
                                </i>{" "}
                                <br /> <br />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="page2 form-con" id="page2">
                    <div className="form">
                        <div className="indicate">
                            <p className="bold">Please indicate (✓)</p>
                            <div className="check check1">
                                <div className="box"></div>
                                <p>
                                    {" "}
                                    New / <i>Baru</i>
                                </p>
                            </div>
                            <div className="check check1">
                                <div className="box"></div>
                                <p>
                                    {" "}
                                    Existing / <i>Sedia Ada</i>{" "}
                                </p>
                            </div>
                            <div className="check check1">
                                <div className="box"></div>
                                <p>
                                    {" "}
                                    This is an annual auto-renewable policy{" "}
                                    <br />
                                    <i>
                                        Ini adalah polisi tahunan yang
                                        diperbaharui secara otomatik
                                    </i>{" "}
                                </p>
                            </div>
                        </div>
                        <div className="policy-dob">
                            <div className="policy">
                                <p>
                                    Master Policy No. / <i>No. Polisi Utama</i>
                                </p>
                                <div className="check">
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                </div>
                            </div>
                            <div className="dob">
                                <p>
                                    Date Of Birth / <i>Tarikh Lahir</i>
                                </p>
                                <div className="check">
                                    <div className="box">Y</div>
                                    <div className="box">Y</div>
                                    <div className="box">Y</div>
                                    <div className="box">Y</div>
                                    <div className="box">-</div>
                                    <div className="box">M</div>
                                    <div className="box">M</div>
                                    <div className="box">-</div>
                                    <div className="box">D</div>
                                    <div className="box">D</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-steps">
                            <ol>
                                <li>
                                    {" "}
                                    Please complete in CAPITAL LETTERS only. /{" "}
                                    <i>Sila isikan dengan HURUF BESAR sahaja</i>
                                    .
                                </li>
                                <li>
                                    {" "}
                                    Do Not strike unused space. /{" "}
                                    <i>
                                        Jangan pangkah bahagian yang tidak
                                        mempunyai maklumat
                                    </i>
                                    .
                                </li>
                                <li>
                                    Mark X for selected item. /{" "}
                                    <i>Tandakan X untuk setiap pilihan anda</i>.
                                </li>
                            </ol>
                        </div>
                        <div className="Detail-customer">
                            <p className="underLine">
                                <span className="bold">
                                    Details Of Main Insured Person
                                </span>{" "}
                                / Butir-butir Orang Tertanggung Utama
                            </p>
                            <div className="fullname">
                                <p>
                                    Full Name (as stated in NRIC) /{" "}
                                    <i>Nama Penuh (seperti di dalam K/P)</i>
                                </p>
                                <div
                                    id="mainInsuredName"
                                    className="check"
                                ></div>
                            </div>
                            <div className="newic-dob">
                                <div className="newIc">
                                    <p>
                                        New IC No. / <i>No. KP Baru</i>
                                    </p>
                                    <div
                                        id="mainInsuredNric"
                                        className="check"
                                    ></div>
                                </div>
                                <div className="dob">
                                    <p>
                                        Date Of Birth / <i>Tarikh Lahir</i>
                                    </p>
                                    <div
                                        id="mainInsuredBirthDate"
                                        className="check"
                                    >
                                        {/* <div className="box">D</div>
                                        <div className="box">D</div>
                                        <div className="box">-</div>
                                        <div className="box">M</div>
                                        <div className="box">M</div>
                                        <div className="box">-</div>
                                        <div className="box">Y</div>
                                        <div className="box">Y</div>
                                        <div className="box">Y</div>
                                        <div className="box">Y</div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="gender-status">
                                <div className="gender">
                                    <p>
                                        Gender / <i>Jantina</i>
                                    </p>
                                    <div className="check">
                                        <div id="male" className="box"></div>
                                        <p>
                                            Male / <i>Lelaki</i>
                                        </p>
                                        <div id="female" className="box"></div>
                                        <p>
                                            Female / <i>Perempuan</i>
                                        </p>
                                    </div>
                                </div>
                                <div className="status">
                                    <p>
                                        Marital Status /{" "}
                                        <i>Status Perkahwinan</i>
                                    </p>
                                    <div className="check">
                                        <div id="married" className="box"></div>{" "}
                                        <p>
                                            Married / <i>Berkahwin</i>
                                        </p>
                                        <div id="single" className="box"></div>{" "}
                                        <p>
                                            Single / <i>Bujang</i>
                                        </p>
                                        <div id="others" className="box"></div>{" "}
                                        <p>
                                            Others / <i>Lain-lain</i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="correspond-address">
                                <p>
                                    Correspondence Address /{" "}
                                    <i>Alamat Surat - Menyurat</i>
                                </p>
                                <div id="address" className="check"></div>
                            </div>
                            <div className="number">
                                <div className="check">
                                    <p>
                                        Tel No. / <i>No. Tel</i> <br />
                                        (House / <i>Rumah</i>)
                                    </p>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="dash">-</div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                </div>
                                <div id="phoneNo" className="check three">
                                    <p>
                                        Handphone No. /{" "}
                                        <i>No. Telefon Bimbit</i>
                                    </p>
                                    {/* <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='dash'>-</div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div> */}
                                </div>
                                <div className="check two">
                                    <p>
                                        Tel No. / <i>No. Tel</i> <br /> (Office/{" "}
                                        <i>Pejabat</i>)
                                    </p>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="dash">-</div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                </div>
                                <div className="check three">
                                    <p>
                                        Fax No. / <i>No. Faks</i>
                                    </p>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="dash">-</div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                    <div className="box"></div>
                                </div>
                            </div>
                            <div id="emailDiv" className="email">
                                <p>
                                    E-mail / <i>E-mail</i>
                                </p>
                                <div id="email" className="check">
                                    {/* <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div>
                  <div className='box'></div> */}
                                </div>
                            </div>
                            <div>
                                <p className="underLine">
                                    <span className="bold">
                                        Details Of Spouse
                                    </span>{" "}
                                    / <i>Butir-butir Pasangan</i>
                                </p>
                            </div>
                            <div className="detail-spouse">
                                <div>
                                    <p>
                                        Please indicate ( ✓ ) option to include{" "}
                                        <br />
                                        Sila tanda ( ✓ ) pilihan untuk
                                        memasukkan
                                    </p>
                                </div>
                                <div className="spouse">
                                    <div className="check">
                                        <div
                                            id="spouseTrue"
                                            className="box"
                                        ></div>
                                        <p>
                                            Spouse and / or <br />
                                            <i>Pasangan dan /atau</i>
                                        </p>
                                    </div>
                                </div>
                                <div className="child">
                                    <div className="check">
                                        <div
                                            id="childTrue"
                                            className="box"
                                        ></div>
                                        <p>
                                            Child / Children
                                            <br />
                                            <i>Anak / Anak-anak</i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="nric-name">
                                <p>
                                    Full Name (as stated in NRIC) /{" "}
                                    <i>Nama Penuh (seperti di dalam K/P)</i>
                                </p>
                                <div id="spouseNameDiv" className="check"></div>
                            </div>
                            <div className="icDob">
                                <div className="New-IC ">
                                    <p>
                                        New IC No. / <i>No. KP Baru</i>
                                    </p>
                                    <div
                                        id="spouseNricDiv"
                                        className="check"
                                    ></div>
                                </div>
                                <div className="dob">
                                    <p>
                                        Date of Birth / <i> Tarikh Lahir </i>
                                    </p>
                                    <div
                                        id="spouseBirthDateDiv"
                                        className="check"
                                    ></div>
                                </div>
                            </div>
                            <div className="children">
                                <p>
                                    Please provide no. of eligible children to
                                    be insured /{" "}
                                    <i>
                                        {" "}
                                        Sila beri no. anak-anak yang layak yang
                                        hendak dilindungi
                                    </i>
                                </p>
                                <div id="noOfChilds" className="check">
                                    {/* <div className='box'></div>
                  <div className='box'></div> */}
                                </div>
                            </div>
                            <table>
                                <thead className="yellow">
                                    <tr>
                                        <th className="name">
                                            {" "}
                                            <p>
                                                {" "}
                                                <span className="bold">
                                                    {" "}
                                                    Name{" "}
                                                </span>{" "}
                                                / <i>Nama </i>{" "}
                                            </p>
                                        </th>
                                        <th className="dateOfBirth">
                                            <p>
                                                <span className="bold">
                                                    Date Of Birth
                                                </span>{" "}
                                                / <i>Tarikh lahir </i>{" "}
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="childTable">
                                    {/* <tr>
                    <td className='name'></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className='name'></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className='name'></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className='name'></td>
                    <td></td>
                  </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="page3" id="page3">
                    <div className="schedule">
                        <p className="underLine">
                            <span className="bold">Details Of Spouse</span> /{" "}
                            <i>Butir-butir Pasangan </i>
                        </p>
                        <p>
                            Schedule Of Benefits / <i> Jadual Manfaat </i>
                        </p>
                        <table>
                            <thead className="yellow">
                                <tr>
                                    <th className="name">
                                        {" "}
                                        <p>
                                            {" "}
                                            <span className="bold">
                                                {" "}
                                                Benefits{" "}
                                            </span>{" "}
                                            / <i> Manfaat </i>{" "}
                                        </p>
                                    </th>
                                    <th className="dateOfBirth">
                                        <p>
                                            <span className="bold">
                                                Sum Insured
                                            </span>{" "}
                                            / <i>Jumlah Tertanggung </i>{" "}
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="name">
                                        {" "}
                                        <p>
                                            {" "}
                                            <span className="bold">
                                                {" "}
                                                Accidental Death & Permanent
                                                Disablement
                                            </span>{" "}
                                            <br />
                                            <i>
                                                Kematian & Hilang Upaya Kekal
                                                Akibat Kemalangan{" "}
                                            </i>{" "}
                                        </p>{" "}
                                    </td>
                                    <td>
                                        <p>
                                            <span className="bold">
                                                Main Insured & Spouse
                                            </span>{" "}
                                            <br />
                                            <i>
                                                Orang Tertanggung Utama &
                                                Pasangan RM 1,000,000 each /
                                                setiap orang
                                                <br />
                                                <br />
                                                <span className="bold">
                                                    Eligible Child
                                                </span>{" "}
                                                / Anak yang Layak RM 100,000
                                                each / setiap orang{" "}
                                            </i>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="name">
                                        <p>
                                            <span className="bold">
                                                Funeral Expenses{" "}
                                            </span>
                                            /<i> Perbelanjaan Pengebumian</i>
                                        </p>
                                    </td>
                                    <td>
                                        <p>RM 3,000</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="name">
                                        <p>
                                            <span className="bold">
                                                Accident Medical Expenses{" "}
                                            </span>{" "}
                                            /{" "}
                                            <i>
                                                {" "}
                                                Perbelanjaan Perubatan akibat
                                                Kemalangan
                                            </i>
                                        </p>
                                    </td>
                                    <td>
                                        <p>RM 5,000</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="table3">
                            <thead className="yellow">
                                <tr>
                                    <th className="name">
                                        {" "}
                                        <p>
                                            {" "}
                                            <span className="bold">
                                                Annual Premium inclusive of 6%
                                                GST{" "}
                                            </span>{" "}
                                            /{" "}
                                            <i>
                                                {" "}
                                                Premium Tahunan termasuk CBP 6%{" "}
                                            </i>{" "}
                                        </p>
                                    </th>
                                    <th className="dateOfBirth">
                                        <p>
                                            <span className="bold">
                                                Sum Insured
                                            </span>{" "}
                                            /<i> Jumlah Tertanggung</i>{" "}
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="name">
                                        {" "}
                                        <p>
                                            {" "}
                                            <span className="bold">
                                                {" "}
                                                Main Insured{" "}
                                            </span>
                                            /<i>
                                                {" "}
                                                Orang Tertanggung Utama
                                            </i>{" "}
                                        </p>{" "}
                                    </td>
                                    <td>
                                        <p>RM 265.00</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="name">
                                        <p>
                                            <span className="bold">
                                                Spouse{" "}
                                            </span>
                                            /<i> Pasangan</i>
                                        </p>
                                    </td>
                                    <td>
                                        <p>RM 265.00</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="name">
                                        <p>
                                            <span className="bold">
                                                Eligible Child{" "}
                                            </span>
                                            /<i> Anak yang Layaks</i>
                                        </p>
                                    </td>
                                    <td>
                                        <p>RM 26.50</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="page3-detail">
                        <p>
                            *GST (Goods & Services Tax) /{" "}
                            <i> CBP (Cukai Barangan & Perkhidmatan)</i> <br />
                            <br />
                            *Age limit : The plan shall cover eligible persons
                            who are not less than 18 years of age or more than
                            70 years of age (i.e. upon attainment of the
                            person’s 71st birthday). Eligible child are over 30
                            days of age and under 19 years of age (or 23 years
                            of age if a fulltime student at a recognized school,
                            college or university).
                            <br />
                            <br />
                            <i>
                                *Had umur : Pelan ini akan melindungi
                                orang-orang yang layak yang tidak kurang
                                daripada umur 18 tahun atau lebih daripada umur
                                70 tahun (iaitu apabila mencapai umur 71 tahun).
                                Anak yang layak adalah lebin daripada umur 30
                            </i>
                        </p>
                    </div>
                    <div className="payment-detail">
                        <p className="underLine">
                            <span className="bold">Payment Instruction</span> /
                            <i> Cara Bayaran</i>
                        </p>
                        <p>
                            I authorise Chubb to debit my account or credit card
                            on a monthly/yearly basis for payment of the premium
                            stated below.
                            <br />
                            <i>
                                Saya membenarkan Chubb untuk mendebit akaun saya
                                atau kad kredit untuk pembayaran premium yang
                                dinyatakan di bawah pada asas bulanan/tahunan.
                            </i>
                        </p>
                    </div>
                    <div className="accountholder">
                        <p>
                            Name of Account Holder or Credit Card Holder /
                            <i> Nama Pemegang Akaun atau Pemegang Kad Kredit</i>
                        </p>
                        <div id="accountHolderNameDiv" className="check"></div>
                    </div>
                    <div className="premiumpayment">
                        <p className="underLine">
                            <span className="bold">Total Premium Payable</span>{" "}
                            / Jumlah Premium yang Dibayar{" "}
                        </p>
                        <div className="payment-check">
                            <div className="check">
                                <div id="creditCardDiv" className="box"></div>
                                <p>Credit Card</p>
                            </div>
                            <div className="check">
                                <div id="visaDiv" className="box"></div>
                                <p>VISA</p>
                            </div>
                            <div className="check">
                                <div id="masterCardDiv" className="box"></div>
                                <p>Master Card</p>
                            </div>
                            <div id="issuing_bankDiv" className="check">
                                <p>Issuing Bank</p>
                                {/* <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div> */}
                            </div>
                        </div>
                        <div className="payment-check2">
                            <div className="check">
                                <div id="debitCardDiv" className="box"></div>
                                <p>Debit Card</p>
                            </div>
                            <div id="card_numberDiv" className="check">
                                <p className="cardno">Card No.</p>
                                {/* <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div> */}
                            </div>
                        </div>
                        <div className="paymentDate">
                            <div className="check" id="card_expiryDiv">
                                <p>Card Expiry</p>
                                {/*<div className='box'>D</div>*/}
                                {/*<div className='box'>D</div>*/}
                                {/*<div className='box'>/</div>*/}
                                {/*<div className='box'>M</div>*/}
                                {/*<div className='box'>M</div>*/}
                            </div>
                            <div className="check" id="paymentDateDiv">
                                <p>
                                    Date / <i>Tarikh</i>
                                </p>
                                {/*<div className='box'>D</div>*/}
                                {/*<div className='box'>D</div>*/}
                                {/*<div className='box'>/</div>*/}
                                {/*<div className='box'>M</div>*/}
                                {/*<div className='box'>M</div>*/}
                                {/*<div className='box'>/</div>*/}
                                {/*<div className='box'>Y</div>*/}
                                {/*<div className='box'>Y</div>*/}
                                {/*<div className='box'>Y</div>*/}
                                {/*<div className='box'>Y</div>*/}
                            </div>
                            <div className="check" id="totalDiv">
                                <p className="totalPremium">
                                    Total Premium Payable
                                </p>
                                <p className="rm">RM</p>
                                {/*<div className='box'></div>*/}
                                {/*<div className='box'></div>*/}
                                {/*<div className='box'></div>*/}
                                {/*<div className='box'></div>*/}
                                {/*<div className='box'></div>*/}
                                {/*<div className='box'></div>*/}
                                {/*<div className='box'></div>*/}
                            </div>
                        </div>
                        <div className="Sign">
                            <img id="cardSign" />
                            <p>
                                Signature of Card Holder /{" "}
                                <i> Tandatangan Pemegang Kad </i>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="page4" id="page4">
                    <div className="page4-div">
                        <div className="Declaration">
                            <p className="underLine">
                                <span className="bold"> Declaration </span>/{" "}
                                <i> Pengakuan </i>{" "}
                            </p>
                            <p>
                                I agree that the statements and declarations
                                contained in this proposal form will be relied
                                upon by Chubb to decide whether to accept this
                                insurance. I understand that Chubb needs to deal
                                with my personal data to administer my Policy
                                and offer me insurance products and services. To
                                achieve these purposes, I allow Chubb to
                                collect, use and disclose my personal data to
                                selected third parties in or outside Malaysia,
                                in accordance with Chubb’s Personal Data
                                Protection Notice, which is found in Chubb’s
                                website at www.chubb.com/my-privacy. I may
                                contact Chubb for access to or correction of my
                                personal data, or for any other queries or
                                complaints
                            </p>
                            <p>
                                {" "}
                                <i>
                                    Saya bersetuju bahawa kenyataan-kenyataan
                                    dan pengakuan-pengakuan di dalam borang
                                    cadangan ini akan digunapakai oleh Chubb
                                    untuk membuat keputusan sama ada untuk
                                    menerima insurans ini. Saya faham bahawa
                                    Chubb perlu berurusan dengan data peribadi
                                    saya untuk mentadbir Polisi saya dan
                                    menawarkan saya produk dan perkhidmatan
                                    insurans. Untuk mencapai tujuan-tujuan ini,
                                    saya membenarkan Chubb untuk mengumpul,
                                    mengguna dan memberi data peribadi saya
                                    kepada pihak ketiga terpilih yang terletak
                                    di dalam atau di luar Malaysia, selaras
                                    dengan Notis Perlindungan Data Peribadi
                                    Chubb, yang terdapat dalam laman web Chubb
                                    di www.chubb.com/my-privacy. Saya boleh
                                    menghubungi Chubb untuk mendapatkan atau
                                    membetulkan data peribadi saya, atau untuk
                                    sebarang pertanyaan atau aduan.
                                </i>{" "}
                            </p>
                        </div>
                        <div className="privacy">
                            <p className="underLine">
                                {" "}
                                <span className="bold">
                                    Privacy Notice
                                </span> / <i>Notis Privasi</i>{" "}
                            </p>
                            <p>
                                I understand that Chubb needs to deal with my
                                personal data to administer my Policy and offer
                                me insurance products and services. To achieve
                                these purposes, I allow Chubb to collect, use
                                and disclose my personal data to selected third
                                parties in or outside Malaysia, in accordance
                                with Chubb’s Personal Data Protection Notice,
                                which is found in Chubb’s website at
                            </p>
                            <p>
                                {" "}
                                <i>
                                    Saya faham bahawa Chubb perlu berurusan
                                    dengan data peribadi saya untuk mentadbir
                                    Polisi saya dan menawarkan saya produk dan
                                    perkhidmatan insurans. Untuk mencapai
                                    tujuan-tujuan ini, saya membenarkan Chubb
                                    untuk mengumpul, mengguna dan memberi data
                                    peribadi saya kepada pihak ketiga terpilih
                                    yang terletak di dalam atau di luar
                                    Malaysia, selaras dengan Notis Perlindungan
                                    Data Peribadi Chubb, yang terdapat dalam
                                    laman web Chubb di www.chubb.com/my-privacy.
                                    Saya boleh menghubungi Chubb untuk
                                    mendapatkan atau membetulkan data peribadi
                                    saya, atau untuk sebarang pertanyaan atau
                                    aduan.{" "}
                                </i>
                            </p>
                        </div>
                        <div className="page4Sign">
                            <div className="Sign">
                                <img id="mainSign" />
                                <p>
                                    Signature of Main Insured Person <br />{" "}
                                    <i>Tandatangan Orange Tertanggung Utama </i>
                                </p>
                            </div>
                            <div className="Sign">
                                <div>{moment().format("YYYY-MM-DD")}</div>
                                <p>
                                    Date / <i> Tarikh </i>
                                </p>
                            </div>
                        </div>
                        <div className="Notice">
                            <p className="underLine">
                                <span className="bold">Notice</span> /{" "}
                                <i> Notis </i>
                            </p>
                            <p>
                                For all intents and purpose where there is a
                                conflict or ambiguity as to the meaning in the
                                Bahasa Malaysia provision, it is hereby agreed
                                that the English version shall prevail.
                            </p>
                            <p>
                                <i>
                                    Bagi setiap tujuan dan maksud sekiranya
                                    terdapat konflik atau kekaburan berkenaan
                                    makna di dalam peruntukan Bahasa Malaysia,
                                    adalah dipersetujui bahawa versi Bahasa
                                    Inggeris akan digunakan.
                                </i>
                            </p>
                        </div>
                        <div className="contact">
                            <p className="underLine">
                                <span className="bold">Contact Us </span> /{" "}
                                <i>Hubungi Kami </i>
                            </p>
                            <ul>
                                <li>Chubb Insurance Malaysia Berhad</li>
                                <li>
                                    <i>
                                        (formerly known as ACE Jerneh Insurance
                                        Berhad) (9827-A)
                                    </i>
                                </li>
                                <li>
                                    (Licensed under the Financial Services Act
                                    2013 and regulated by Bank Negara Malaysia)
                                </li>
                                <li>Wisma Chubb</li>
                                <li>38 Jalan Sultan Ismail</li>
                                <li>50250 Kuala Lumpur</li>
                                <li>Malaysia</li>
                                <li>O +6 03 2058 3000</li>
                                <li>F +6 03 2058 3333</li>
                                <li>www.chubb.com/my</li>
                            </ul>
                        </div>
                        <div className="pdf-logo">
                            <h6>LOGO</h6>
                            <h3>
                                Chubb. Insured.<sup>SM</sup>
                            </h3>
                        </div>
                        <div className="copyright-pdf">
                            <p>
                                © 2016 Chubb. Coverages underwritten by one or
                                more subsidiary companies. Not all coverages
                                available in all jurisdictions. ACE®, Chubb®,
                                their respective logos and Chubb.Insured.SM are
                                protected trademarks of Chubb.{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Form);
