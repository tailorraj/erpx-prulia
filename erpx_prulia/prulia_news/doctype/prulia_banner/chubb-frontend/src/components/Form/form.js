import React from "react";
import "./form.scss";
import { withRouter } from "react-router-dom";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  printElem = () => {
    window.print();
    setTimeout(() => {
      this.props.history.push("/declaration");
    }, 500);
  };

  componentDidMount() {
    // Main insured session
    let mainInsuredName = this.props.state.mainInsuredName;
    let mainInsuredEmail = this.props.state.mainInsuredEmail;
    let mainInsuredNric = this.props.state.mainInsuredNric;
    let mainInsuredMobileNo = this.props.state.mainInsuredMobileNo;
    let mainInsuredBirthDate = this.props.state.mainInsuredBirthDate;
    let mainInsuredGender = this.props.state.mainInsuredGender;
    let mainInsuredStatus = this.props.state.mainInsuredStatus;
    let mainInsuredAddress = this.props.state.mainInsuredAddress;

    let mainInsuredNameDiv = document.getElementById("mainInsuredName");

    for (let i = 0; i < 43; i++) {
      mainInsuredNameDiv.innerHTML += `<div id="mainInsuredName${i}" class="box"></div>`;
    }
    if (mainInsuredName) {
      for (let i = 0; i < mainInsuredName.length; i++) {
        document.getElementById(`mainInsuredName${i}`).innerHTML =
          mainInsuredName[i];
      }
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
      mainInsuredAddressDiv.innerHTML += `<div id="mainInsuredAddress${i}" class="box"></div>`;
    }

    let mainInsuredNricDiv = document.getElementById("mainInsuredNric");

    for (let i = 0; i < 14; i++) {
      if (i !== 6 || i !== 9) {
        mainInsuredNricDiv.innerHTML += `<div id="mainInsuredNric${i}" class="box"></div>`;
      }
    }
    if (mainInsuredNric) {
      mainInsuredNric = mainInsuredNric.toString();
      let j = 0;
      for (let i = 0; i < 14; i++) {
        if (i === 6) {
          document.getElementById(`mainInsuredNric${i}`).innerHTML = "-";
        } else if (i === 9) {
          document.getElementById(`mainInsuredNric${i}`).innerHTML = "-";
        } else {
          document.getElementById(`mainInsuredNric${i}`).innerHTML =
            mainInsuredNric[j];
          j = j + 1;
        }
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
    if (mainInsuredGender === "male") {
      maleDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
    } else if (mainInsuredGender === "female") {
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
    for (let i = 0; i < 10; i++) {
      if (i !== 3) {
        phoneNoDiv.innerHTML += `<div id="phoneNo${i}" class="box"></div>`;
      } else {
        phoneNoDiv.innerHTML += `<div class="dash">-</div>`;
      }
    }
    if (mainInsuredMobileNo) {
      mainInsuredMobileNo = mainInsuredMobileNo.toString();
      for (let i = 0; i < 10; i++) {
        if (i !== 3) {
          document.getElementById(`phoneNo${i}`).innerHTML =
            mainInsuredMobileNo[i];
        }
      }
    }

    let emailDiv = document.getElementById("emailDiv");

    for (let i = 0; i < 43; i++) {
      emailDiv.innerHTML += `<div id="emailDiv${i}" class="box"></div>`;
    }
    if (mainInsuredEmail) {
      for (let i = 0; i < mainInsuredEmail.length; i++) {
        document.getElementById(`emailDiv${i}`).innerHTML = mainInsuredEmail[i];
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
        document.getElementById(`spouseNameDiv${i}`).innerHTML = spouseName[i];
      }
    }

    let spouseNricDiv = document.getElementById("spouseNricDiv");
    for (let i = 0; i < 14; i++) {
      if (i !== 6 || i !== 9) {
        spouseNricDiv.innerHTML += `<div id="spouseNricDiv${i}" class="box"></div>`;
      }
    }
    if (spouseNric) {
      spouseNric = spouseNric.toString();
      let j = 0;
      for (let i = 0; i < 14; i++) {
        if (i === 6) {
          document.getElementById(`spouseNricDiv${i}`).innerHTML = "-";
        } else if (i === 9) {
          document.getElementById(`spouseNricDiv${i}`).innerHTML = "-";
        } else {
          document.getElementById(`spouseNricDiv${i}`).innerHTML =
            spouseNric[j];
          j = j + 1;
        }
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
          noOfChilds.innerHTML += `<div id="noOfChilds${i + 1}" class="box">${
            childs[0]
          }</div>`;
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
    let accountHolderNameDiv = document.getElementById("accountHolderNameDiv");
    let accountHolderName = this.props.state.accountHolderName;
    let creditCard = this.props.state.creditCard;
    let debitCard = this.props.state.debitCard;
    let masterCard = this.props.state.masterCard;
    let visa = this.props.state.visa;
    let rhb = this.props.state.rhb;
    let mayBank = this.props.state.mayBank;

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
    let rhbDiv = document.getElementById("rhbDiv");
    let mayBankDiv = document.getElementById("mayBankDiv");
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
    if (rhb) {
      rhbDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
    }
    if (mayBank) {
      mayBankDiv.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>`;
    }

    let issuingBankDiv = document.getElementById("issuingBankDiv");
    let issuingBank = this.props.state.issuingBank;

    for (let i = 0; i < 16; i++) {
      issuingBankDiv.innerHTML += `<div id="issuingBankDiv${i}" class="box"></div>`;
    }
    if (issuingBank) {
      for (let i = 0; i < issuingBank.length; i++) {
        document.getElementById(`issuingBankDiv${i}`).innerHTML =
          issuingBank[i];
      }
    }

    let cardNoDiv = document.getElementById("cardNoDiv");
    let cardNo = this.props.state.cardNo;

    for (let i = 0; i < 16; i++) {
      cardNoDiv.innerHTML += `<div id="cardNoDiv${i}" class="box"></div>`;
    }
    if (cardNo) {
      for (let i = 0; i < cardNo.length; i++) {
        document.getElementById(`cardNoDiv${i}`).innerHTML = cardNo[i];
      }
    }

    this.printElem();
  }

  render() {
    return (
      <div id="form" className="form-main container">
        <div className="info-div page1 ">
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
                  Statement Pursuant to Schedule 9 of Financial Services Act
                  2013{" "}
                </span>{" "}
                <br />
                Kenyataan Mengikut Jadual 9 Akta Perkhidmatan Kewangan 2013
              </p>
              <p>
                (a) not to make a misrepresentation to Chubb Insurance Malaysia
                Berhad (Chubb) when answering any questions We ask in this
                proposal form; <br />
                <br />
                (b) when renewing this Policy, not to make a misrepresentation
                to Us in answering any questions, or confirming or amending any
                matter previously disclosed to Us in relation to this Policy;
                and <br /> <br />
                (c) to disclose to Us any matter, other than what We have asked
                in (a) and (b) above, that You know to be relevant to Our
                decision on whether to accept the risk or not and the rates and
                terms to be applied. <br /> <br />
                Your duty to take reasonable care for the above shall be based
                on what a reasonable person in Your circumstances would have
                known. <br /> <br />
                <i>
                  Anda mempunyai kewajipan untuk mengambil langkah yang
                  sewajarnya : <br /> <br />
                  (a) untuk tidak membuat salah nyataan kepada Chubb Insurance
                  Malaysia Berhad (Chubb) apabila menjawab apa-apa soalan yang
                  Kami tanya di dalam borang cadangan ini;
                  <br /> <br />
                  (b) apabila memperbaharui Polisi ini, tidak membuat salah
                  nyataan kepada Kami apabila menjawab apa-apa soalan, atau
                  mengesahkan atau meminda apa-apa perkara yang telah didedahkan
                  sebelum itu kepada Kami berhubungan dengan Polisi ini; dan
                  <br /> <br />
                  (c) untuk mendedahkan kepada Kami apa-apa perkara, selain
                  daripada apa yang Kami kehendaki di (a) dan (b) di atas, yang
                  Anda ketahui sebagai berkaitan dengan keputusan Kami sama ada
                  untuk menerima risiko atau tidak dan kadar dan terma yang
                  hendak dikenakan.
                  <br /> <br />
                  Kewajipan Anda untuk mengambil langkah yang sewajarnya untuk
                  di atas adalah berdasarkan kepada apa yang orang yang
                  mengalami keadaan Anda mungkin ketahui.
                </i>
                <br /> <br />
              </p>
              <p className="underLine">
                <span className="bold">Note/ </span> <i>Nota</i>:
              </p>
              <p>
                Coverage requested in this Enrolment Form should not be
                construed as an acceptance or commitment on the part of the
                Insurer unless the same is incorporated in the Policy evidencing
                such cover. <br /> <br />
                <i>
                  Perlindungan yang dipohon di dalam Borang Pendaftaran ini
                  tidak sepatutnya ditafsir sebagai penerimaan atau komitmen
                  oleh Penanggung Insurans melainkan jika ia dinyatakan di dalam
                  Polisi yang membuktikan perlindungan tersebut
                  <br /> <br />
                  *Chubb reserves the right to reject any application for this
                  Policy without assigning any reasons thereof Enrolment /
                  Renewal is strictly for Prulia Members Only.
                  <br /> <br />
                  *Chubb berhak menolak mana-mana permohonan untuk Polisi ini
                  tanpa memberi apa-apa sebabnya.
                  <br /> <br />
                  Enrolment/Renewal is strictly for Prulia members only. /
                  Pendaftaran/Pembaharuan adalah terhad kepada ahli Prulia
                  sahaja{" "}
                </i>{" "}
                <br /> <br />
              </p>
            </div>
          </div>
        </div>
        <div className="page2 form-con">
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
                  This is an annual auto-renewable policy <br />
                  <i>
                    Ini adalah polisi tahunan yang diperbaharui secara otomatik
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
                  <div className="box">D</div>
                  <div className="box">D</div>
                  <div className="box">-</div>
                  <div className="box">M</div>
                  <div className="box">M</div>
                  <div className="box">-</div>
                  <div className="box">Y</div>
                  <div className="box">Y</div>
                  <div className="box">Y</div>
                  <div className="box">Y</div>
                </div>
              </div>
            </div>
            <div className="form-steps">
              <ol>
                <li>
                  {" "}
                  Please complete in CAPITAL LETTERS only. /{" "}
                  <i>Sila isikan dengan HURUF BESAR sahaja</i>.
                </li>
                <li>
                  {" "}
                  Do Not strike unused space. /{" "}
                  <i>Jangan pangkah bahagian yang tidak mempunyai maklumat</i>.
                </li>
                <li>
                  Mark X for selected item. /{" "}
                  <i>Tandakan X untuk setiap pilihan anda</i>.
                </li>
              </ol>
            </div>
            <div className="Detail-customer">
              <p className="underLine">
                <span className="bold">Details Of Main Insured Person</span> /
                Butir-butir Orang Tertanggung Utama
              </p>
              <div className="fullname">
                <p>
                  Full Name (as stated in NRIC) /{" "}
                  <i>Nama Penuh (seperti di dalam K/P)</i>
                </p>
                <div id="mainInsuredName" className="check"></div>
              </div>
              <div className="newic-dob">
                <div className="newIc">
                  <p>
                    New IC No. / <i>No. KP Baru</i>
                  </p>
                  <div id="mainInsuredNric" className="check"></div>
                </div>
                <div className="dob">
                  <p>
                    Date Of Birth / <i>Tarikh Lahir</i>
                  </p>
                  <div id="mainInsuredBirthDate" className="check">
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
                    <div id="male" className="box"></div>{" "}
                    <p>
                      Male / <i>Lelak</i>
                    </p>
                    <div id="female" className="box"></div>{" "}
                    <p>
                      Female / <i>Perempuan</i>
                    </p>
                  </div>
                </div>
                <div className="status">
                  <p>
                    Marital Status / <i>Status Perkahwinan</i>
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
                  Correspondence Address / <i>Alamat Surat - Menyurat</i>
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
                    Handphone No. / <i>No. Telefon Bimbit</i>
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
                    Tel No. / <i>No. Tel</i> <br /> (Office/ <i>Pejabat</i>)
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
                  <span className="bold">Details Of Spouse</span> /{" "}
                  <i>Butir-butir Pasangan</i>
                </p>
              </div>
              <div className="detail-spouse">
                <div>
                  <p>
                    Please indicate ( ✓ ) option to include <br />
                    Sila tanda ( ✓ ) pilihan untuk memasukkan
                  </p>
                </div>
                <div className="spouse">
                  <div className="check">
                    <div id="spouseTrue" className="box"></div>
                    <p>
                      Spouse and / or <br />
                      <i>Pasangan dan /atau</i>
                    </p>
                  </div>
                </div>
                <div className="child">
                  <div className="check">
                    <div id="childTrue" className="box"></div>
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
                  <div id="spouseNricDiv" className="check"></div>
                </div>
                <div className="dob">
                  <p>
                    Date of Birth / <i> Tarikh Lahir </i>
                  </p>
                  <div id="spouseBirthDateDiv" className="check"></div>
                </div>
              </div>
              <div className="children">
                <p>
                  Please provide no. of eligible children to be insured /{" "}
                  <i>
                    {" "}
                    Sila beri no. anak-anak yang layak yang hendak dilindungi
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
                        <span className="bold"> Name </span> / <i>Nama </i>{" "}
                      </p>
                    </th>
                    <th className="dateOfBirth">
                      <p>
                        <span className="bold">Date Of Birth</span> /{" "}
                        <i>Tarikh lahir </i>{" "}
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

        <div className="page3 ">
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
                      <span className="bold"> Benefits </span> /{" "}
                      <i> Manfaat </i>{" "}
                    </p>
                  </th>
                  <th className="dateOfBirth">
                    <p>
                      <span className="bold">Sum Insured</span> /{" "}
                      <i>Jumlah Tertanggung </i>{" "}
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
                        Accidental Death & Permanent Disablement
                      </span>{" "}
                      <br />
                      <i>
                        Kematian & Hilang Upaya Kekal Akibat Kemalangan{" "}
                      </i>{" "}
                    </p>{" "}
                  </td>
                  <td>
                    <p>
                      <span className="bold">Main Insured & Spouse</span> <br />
                      <i>
                        Orang Tertanggung Utama & Pasangan RM 1,000,000 each /
                        setiap orang
                        <br />
                        <br />
                        <span className="bold">Eligible Child</span> / Anak yang
                        Layak RM 100,000 each / setiap orang{" "}
                      </i>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="name">
                    <p>
                      <span className="bold">Funeral Expenses </span>/
                      <i> Perbelanjaan Pengebumian</i>
                    </p>
                  </td>
                  <td>
                    <p>RM 3,000</p>
                  </td>
                </tr>
                <tr>
                  <td className="name">
                    <p>
                      <span className="bold">Accident Medical Expenses </span> /{" "}
                      <i> Perbelanjaan Perubatan akibat Kemalangan</i>
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
                        Annual Premium inclusive of 6% GST{" "}
                      </span>{" "}
                      / <i> Premium Tahunan termasuk CBP 6% </i>{" "}
                    </p>
                  </th>
                  <th className="dateOfBirth">
                    <p>
                      <span className="bold">Sum Insured</span> /
                      <i> Jumlah Tertanggung</i>{" "}
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
                      <span className="bold"> Main Insured </span>/
                      <i> Orang Tertanggung Utama</i>{" "}
                    </p>{" "}
                  </td>
                  <td>
                    <p>RM 265.00</p>
                  </td>
                </tr>
                <tr>
                  <td className="name">
                    <p>
                      <span className="bold">Spouse </span>/<i> Pasangan</i>
                    </p>
                  </td>
                  <td>
                    <p>RM 265.00</p>
                  </td>
                </tr>
                <tr>
                  <td className="name">
                    <p>
                      <span className="bold">Eligible Child </span>/
                      <i> Anak yang Layaks</i>
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
              *Age limit : The plan shall cover eligible persons who are not
              less than 18 years of age or more than 70 years of age (i.e. upon
              attainment of the person’s 71st birthday). Eligible child are over
              30 days of age and under 19 years of age (or 23 years of age if a
              fulltime student at a recognized school, college or university).
              <br />
              <br />
              <i>
                *Had umur : Pelan ini akan melindungi orang-orang yang layak
                yang tidak kurang daripada umur 18 tahun atau lebih daripada
                umur 70 tahun (iaitu apabila mencapai umur 71 tahun). Anak yang
                layak adalah lebin daripada umur 30
              </i>
            </p>
          </div>
          <div className="payment-detail">
            <p className="underLine">
              <span className="bold">Payment Instruction</span> /
              <i> Cara Bayaran</i>
            </p>
            <p>
              I authorise Chubb to debit my credit card for payment of the
              premium stated below.
              <br />
              <i>
                Saya membenarkan Chubb untuk mendebit akaun saya atau kad kredit
                untuk pembayaran premium yang dinyatakan di bawah pada asas
                bulanan/tahunan.
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
              <span className="bold">Total Premium Payable</span> / Jumlah
              Premium yang Dibayar{" "}
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
              <div id="issuingBankDiv" className="check">
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
              <div className="check">
                <div id="rhbDiv" className="box"></div>
                <p>RHB</p>
              </div>
              <div className="check">
                <div id="mayBankDiv" className="box"></div>
                <p className="maybank">Maybank</p>
              </div>
              <div id="cardNoDiv" className="check">
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
              <div className="check">
                <p>Card Expiry</p>
                <div className="box">D</div>
                <div className="box">D</div>
                <div className="box">/</div>
                <div className="box">M</div>
                <div className="box">M</div>
              </div>
              <div className="check">
                <p>
                  Date / <i>Tarikh</i>
                </p>
                <div className="box">D</div>
                <div className="box">D</div>
                <div className="box">/</div>
                <div className="box">M</div>
                <div className="box">M</div>
                <div className="box">/</div>
                <div className="box">Y</div>
                <div className="box">Y</div>
                <div className="box">Y</div>
                <div className="box">Y</div>
              </div>
              <div className=" check">
                <p className="totalPremium">Total Premium Payable</p>
                <p className="rm">RM</p>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
              </div>
            </div>
            <div className="Sign">
              <p>
                Signature of Card Holder / <i> Tandatangan Pemegang Kad </i>
              </p>
            </div>
          </div>
        </div>
        <div className="page4">
          <div className="page4-div">
            <div className="Declaration">
              <p className="underLine">
                <span className="bold"> Declaration </span>/ <i> Pengakuan </i>{" "}
              </p>
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
                other queries or complaints
              </p>
              <p>
                {" "}
                <i>
                  Saya bersetuju bahawa kenyataan-kenyataan dan
                  pengakuan-pengakuan di dalam borang cadangan ini akan
                  digunapakai oleh Chubb untuk membuat keputusan sama ada untuk
                  menerima insurans ini. Saya faham bahawa Chubb perlu berurusan
                  dengan data peribadi saya untuk mentadbir Polisi saya dan
                  menawarkan saya produk dan perkhidmatan insurans. Untuk
                  mencapai tujuan-tujuan ini, saya membenarkan Chubb untuk
                  mengumpul, mengguna dan memberi data peribadi saya kepada
                  pihak ketiga terpilih yang terletak di dalam atau di luar
                  Malaysia, selaras dengan Notis Perlindungan Data Peribadi
                  Chubb, yang terdapat dalam laman web Chubb di
                  www.chubb.com/my-privacy. Saya boleh menghubungi Chubb untuk
                  mendapatkan atau membetulkan data peribadi saya, atau untuk
                  sebarang pertanyaan atau aduan.
                </i>{" "}
              </p>
            </div>
            <div className="privacy">
              <p className="underLine">
                {" "}
                <span className="bold">Privacy Notice</span> /{" "}
                <i>Notis Privasi</i>{" "}
              </p>
              <p>
                I understand that Chubb needs to deal with my personal data to
                administer my Policy and offer me insurance products and
                services. To achieve these purposes, I allow Chubb to collect,
                use and disclose my personal data to selected third parties in
                or outside Malaysia, in accordance with Chubb’s Personal Data
                Protection Notice, which is found in Chubb’s website at
              </p>
              <p>
                {" "}
                <i>
                  Saya faham bahawa Chubb perlu berurusan dengan data peribadi
                  saya untuk mentadbir Polisi saya dan menawarkan saya produk
                  dan perkhidmatan insurans. Untuk mencapai tujuan-tujuan ini,
                  saya membenarkan Chubb untuk mengumpul, mengguna dan memberi
                  data peribadi saya kepada pihak ketiga terpilih yang terletak
                  di dalam atau di luar Malaysia, selaras dengan Notis
                  Perlindungan Data Peribadi Chubb, yang terdapat dalam laman
                  web Chubb di www.chubb.com/my-privacy. Saya boleh menghubungi
                  Chubb untuk mendapatkan atau membetulkan data peribadi saya,
                  atau untuk sebarang pertanyaan atau aduan.{" "}
                </i>
              </p>
            </div>
            <div className="page4Sign">
              <div className="Sign">
                <p>
                  Signature of Main Insured Person <br />{" "}
                  <i>Tandatangan Orange Tertanggung Utama </i>
                </p>
              </div>
              <div className="Sign">
                <p>
                  Date / <i> Tarikh </i>
                </p>
              </div>
            </div>
            <div className="Notice">
              <p className="underLine">
                <span className="bold">Notice</span> / <i> Notis </i>
              </p>
              <p>
                For all intents and purpose where there is a conflict or
                ambiguity as to the meaning in the Bahasa Malaysia provision, it
                is hereby agreed that the English version shall prevail.
              </p>
              <p>
                <i>
                  Bagi setiap tujuan dan maksud sekiranya terdapat konflik atau
                  kekaburan berkenaan makna di dalam peruntukan Bahasa Malaysia,
                  adalah dipersetujui bahawa versi Bahasa Inggeris akan
                  digunakan.
                </i>
              </p>
            </div>
            <div className="contact">
              <p className="underLine">
                <span className="bold">Contact Us </span> / <i>Hubungi Kami </i>
              </p>
              <ul>
                <li>Chubb Insurance Malaysia Berhad </li>
                <li>
                  <i>
                    (formerly known as ACE Jerneh Insurance Berhad) (9827-A)
                  </i>
                </li>
                <li>
                  (Licensed under the Financial Services Act 2013 and regulated
                  by Bank Negara Malaysia)
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
                © 2016 Chubb. Coverages underwritten by one or more subsidiary
                companies. Not all coverages available in all jurisdictions.
                ACE®, Chubb®, their respective logos and Chubb.Insured.SM are
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
