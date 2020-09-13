import React from 'react'
import './PersonalInformation.scss'
import {withRouter, Link} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import axios from 'axios';

const memberDetailsMap = {
    'full_name': 'mainInsuredName',
    'email': 'mainInsuredEmail',
    'nric_number': 'mainInsuredNric',
    'cell_number': 'mainInsuredMobileNo',
    'gender': 'mainInsuredGender',

};

class PersonalInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeChild: 0,
        }
    }

    goBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        getMemberDetails().then(data => {
            Object.keys(data).forEach(key => {
                if (memberDetailsMap[key]) {

                    this.props.gettingValues({
                        target: {
                            value: data[key]
                        }
                    }, memberDetailsMap[key])
                }
            });
        }).catch(e => {
            console.error(e);
            // window.alert('Please login to continue');
            // window.location.href = '/';
           // let data =  {
           //      "creation": "2018-12-11 14:15:53.482815",
           //      "send_password_update_notification": 0,
           //      "membership_fee": 0,
           //      "full_name": "Nicole Sherzinger",
           //      "owner": "yapnicole93@gmail.com",
           //      "user_status": "Active",
           //      "modified_by": "Administrator",
           //      "new_password": "",
           //      "prudential_id": "0000001",
           //      "highest_qualification": "SPM",
           //      "office_number": "",
           //      "branch": "Damansara Intan",
           //      "docstatus": 0,
           //      "email": "yapnicole93@gmail.com",
           //      "home_phone": "",
           //      "meal_option": "Non-Vegetarian",
           //      "fax_number": "",
           //      "logout_all_sessions": 0,
           //      "promo_year": 0,
           //      "nric_number": "888888-88-8888",
           //      "doctype": "PRULIA Member",
           //      "user_id": "yapnicole93@gmail.com",
           //      "register_acknowledgement": 1,
           //      "school": "",
           //      "name": "0000001",
           //      "idx": 5,
           //      "cell_number": "6019-999 99999",
           //      "field_of_study": "",
           //      "gender": "Female",
           //      "region": "Central3",
           //      "modified": "2020-07-25 11:20:44.905880",
           //      "profile_photo": "/files/person.png",
           //      "race": "",
           //      "shirt_size": "M",
           //      "position": "QL",
           //      "resign_year": 0
           //  };
           //
           //  Object.keys(data).forEach(key => {
           //      if (memberDetailsMap[key]) {
           //
           //          this.props.gettingValues({
           //              target: {
           //                  value: data[key]
           //              }
           //          }, memberDetailsMap[key])
           //      }
           //  });
        });

        function getMemberDetails() {
            return axios.get('/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.mobile_member_login').then(data => {
                return data && data.data && data.data.message;
            });
        }
    }

    childActive = i => {
        this.setState({
            activeChild: i
        })
    }

    render() {
        return (
            <div className='personalInfoDiv'>
                <div className='topDiv'>
                    <svg
                        onClick={this.goBack}
                        style={{cursor: 'pointer'}}
                        width='1em'
                        height='1em'
                        viewBox='0 0 16 16'
                        className='bi bi-chevron-left'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                        />
                    </svg>
                    <p>Personal Information</p>
                </div>
                <div className='mainForm'>
                    {/* <div className="second">
                    <p>Complete Your Personal Details</p>
                    <Form.Check
                        type="radio"
                        label="Buy for myself"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                    />
                    <Form.Check
                        type="radio"
                        label="Buy for others"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                    />
                </div> */}

                    {this.props.state.mainInsured && (
                        <div className='mainInsured'>
                            <p>Main Insured</p>
                            <div className='inputGroup'>
                                <label>Full Name as per NRIC</label>
                                <input
                                    type='text'
                                    name='mainInsuredName'
                                    value={this.props.state.mainInsuredName}
                                    onChange={e => this.props.gettingValues(e, 'mainInsuredName')}
                                />
                            </div>

                            <div className='inputGroup two'>
                                <label>Email</label>
                                <input
                                    type='email'
                                    value={this.props.state.mainInsuredEmail}
                                    onChange={e =>
                                        this.props.gettingValues(e, 'mainInsuredEmail')
                                    }
                                />
                            </div>

                            <div className='inputGroup two three'>
                                <label>NRIC</label>
                                <input
                                    type='text'
                                    value={this.props.state.mainInsuredNric}
                                    onChange={e => this.props.gettingValues(e, 'mainInsuredNric')}
                                />
                            </div>

                            <div className='inputGroup two three'>
                                <label>Mobile Number</label>
                                <input
                                    type='text'
                                    value={this.props.state.mainInsuredMobileNo}
                                    onChange={e =>
                                        this.props.gettingValues(e, 'mainInsuredMobileNo')
                                    }
                                />
                            </div>

                            <div className='inputGroup two three'>
                                <label>Date of Birth</label>
                                <input
                                    type='date'
                                    value={this.props.state.mainInsuredBirthDate}
                                    onChange={e =>
                                        this.props.gettingValues(e, 'mainInsuredBirthDate')
                                    }
                                />
                            </div>

                            <div className='inputGroup two three'>
                                <label>Gender</label>
                                <div className='radioDiv'>
                                    <Form.Check
                                        type='radio'
                                        label='Male'
                                        name='formHorizontalRadios'
                                        id='formHorizontalRadios1'
                                        value='Male'
                                        onChange={e =>
                                            this.props.gettingValues(e, 'mainInsuredGender')
                                        }
                                    />
                                    <Form.Check
                                        type='radio'
                                        label='Female'
                                        name='formHorizontalRadios'
                                        id='formHorizontalRadios2'
                                        value='Female'
                                        onChange={e =>
                                            this.props.gettingValues(e, 'mainInsuredGender')
                                        }
                                    />
                                </div>
                            </div>

                            <div className='inputGroup two three'>
                                <label>Marital Status</label>
                                <div className='radioDiv'>
                                    <Form.Check
                                        type='radio'
                                        label='Married'
                                        name='formHorizontalRadios2'
                                        id='formHorizontalRadios3'
                                        value='married'
                                        onChange={e =>
                                            this.props.gettingValues(e, 'mainInsuredStatus')
                                        }
                                    />
                                    <Form.Check
                                        type='radio'
                                        label='Single'
                                        name='formHorizontalRadios2'
                                        id='formHorizontalRadios4'
                                        value='single'
                                        onChange={e =>
                                            this.props.gettingValues(e, 'mainInsuredStatus')
                                        }
                                    />
                                    <Form.Check
                                        type='radio'
                                        label='Others'
                                        name='formHorizontalRadios2'
                                        id='formHorizontalRadios5'
                                        value='others'
                                        onChange={e =>
                                            this.props.gettingValues(e, 'mainInsuredStatus')
                                        }
                                    />
                                </div>
                            </div>

                            <div className='inputGroup two'>
                                <label>Address</label>
                                <input
                                    type='text'
                                    value={this.props.state.mainInsuredAddress}
                                    onChange={e =>
                                        this.props.gettingValues(e, 'mainInsuredAddress')
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {this.props.state.spouse && (
                        <div className='mainInsured'>
                            <p>Spouse</p>
                            <div className='inputGroup'>
                                <label>Full Name as per NRIC</label>
                                <input
                                    type='text'
                                    value={this.props.state.spouseName}
                                    onChange={e => this.props.gettingValues(e, 'spouseName')}
                                />
                            </div>

                            <div className='inputGroup two three'>
                                <label>NRIC</label>
                                <input
                                    type='number'
                                    value={this.props.state.spouseNric}
                                    onChange={e => this.props.gettingValues(e, 'spouseNric')}
                                />
                            </div>

                            <div className='inputGroup two three'>
                                <label>Date of Birth</label>
                                <input
                                    type='date'
                                    value={this.props.state.spouseBirthDate}
                                    onChange={e => this.props.gettingValues(e, 'spouseBirthDate')}
                                />
                            </div>
                        </div>
                    )}

                    {this.props.state.child && (
                        <div className='childMain'>
                            <div className='tabs'>
                                {Array.apply(null, {length: this.props.state.childs}).map((a, i) => {
                                    return (
                                        <div
                                            className={this.state.activeChild === i ? 'active' : ''}
                                            onClick={() => this.childActive(i)}
                                            key={'tab' + i}
                                        >
                                            Child {i + 1}
                                        </div>
                                    )
                                })}
                            </div>
                            {Array.apply(null, {length: this.props.state.childs}).map((a, i) => {
                                return (
                                    <>
                                        <div
                                            style={
                                                this.state.activeChild !== i
                                                    ? {display: 'none'}
                                                    : {display: 'flex'}
                                            }
                                            className='inputGroup'
                                            key={'name' + i}
                                        >
                                            <label>Full Name as per NRIC</label>
                                            <input
                                                type='text'
                                                value={this.props.state[`childName${i}`]}
                                                onChange={e =>
                                                    this.props.gettingValues(e, `childName${i}`)
                                                }
                                            />
                                        </div>
                                        <div
                                            style={
                                                this.state.activeChild !== i
                                                    ? {display: 'none'}
                                                    : {display: 'flex'}
                                            }
                                            className='inputGroup'
                                            key={'dob' + i}
                                        >
                                            <label>Date of Birth</label>
                                            <input
                                                type='date'
                                                value={this.props.state[`childBirthDate${i}`]}
                                                onChange={e =>
                                                    this.props.gettingValues(e, `childBirthDate${i}`)
                                                }
                                            />
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    )}

                    <div className='terms'>
                        <div className='content'>
                            <Form.Check
                                value={this.props.state.spouse}
                                size='lg'
                                type='checkbox'
                            />
                            {/*I am a Malaysian or a permanent resident of Malaysia. In the event*/}
                            {/*I have opted to purchase the coverage for my spouse and/or*/}
                            {/*child(ren), I hereby confirm that my spouse and/or my child is a*/}
                            {/*Malaysia or a permanent resident of Malaysia, as the case may be.*/}
                            Eligible child are over 30 days of age and under 19 years of age (or 23 years of age if a
                            fulltime student at a recognized school, college or university).
                        </div>
                    </div>

                    <Link to='/declaration' style={{textDecoration: 'none'}}>
                        <button className='next'>NEXT</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(PersonalInformation)
