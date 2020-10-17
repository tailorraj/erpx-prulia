import React from 'react'
import './Declaration.scss'
import {withRouter} from 'react-router-dom'
import {Form} from 'react-bootstrap'
import {CustomInput} from "../../helpers";
import {Formik} from 'formik';
import moment from "moment";
import SignatureCanvas from "react-signature-canvas";

class Declaration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    goBack = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.props.gettingValues({
            target: {
                value: this.props.state.mainInsuredName
            }
        }, 'accountHolderName');

        this.props.gettingValues({
            target: {
                value: 'Credit Card'
            }
        }, 'payment_method');
    }

    render() {
        return (
            <div className='declarationMain'>
                <div className='topDiv'>
                    <svg
                        style={{cursor: 'pointer'}}
                        onClick={this.goBack}
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
                    <p>Declaration & Privacy Notice</p>
                </div>
                <div className='declarationForm'>
                    <Formik enableReinitialize={true}
                            initialValues={{
                                ...this.props.state
                            }}
                            validate={values => {
                                const errors = {};

                                console.log(values);

                                if (!values.declaration) errors.declaration = 'Please check the box!';

                                if (!values.privacyNotice) errors.privacyNotice = 'Please check the box!';

                                if (!values.paymentInstruction) errors.paymentInstruction = 'Please check the box!';

                                if (!values.accountHolderName) errors.accountHolderName = 'Name is required';

                                if (!values.payment_method) errors.payment_method = 'Payment method is required';

                                if (!values.issuing_bank) errors.issuing_bank = 'Issuing bank is required';

                                if (!values.card_number) errors.card_number = 'Card number is required';

                                if (!values.card_expiry) errors.card_expiry = 'Expiry date is required';
                                else if (
                                    !/^(0[1-9]|1[0-2])\/?(([0-9]{4})$)/g.test(values.card_expiry) ||
                                    parseInt(values.card_expiry.split('/').pop()) < parseInt(moment().year())
                                ) {
                                    errors.card_expiry = 'Invalid expiry date';
                                }

                                if (this.state.mainSign) {
                                    if (this.state.mainSign.isEmpty()) errors.main_sign = 'Signature is required';
                                    else {
                                        this.props.gettingValues({
                                            target: {
                                                value: this.state.mainSign.toDataURL()
                                            }
                                        }, 'main_sign');
                                    }
                                }

                                if (this.state.cardSign) {
                                    if (this.state.cardSign.isEmpty()) errors.card_sign = 'Signature is required';
                                    else {
                                        this.props.gettingValues({
                                            target: {
                                                value: this.state.cardSign.toDataURL()
                                            }
                                        }, 'card_sign');
                                    }
                                }


                                Object.keys(values).forEach(key => {
                                    this.props.gettingValues({
                                        target: {
                                            value: values[key]
                                        }
                                    }, key);
                                });

                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                console.log(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                                this.props.history.push('/proposal-form');
                            }}
                    >
                        {({
                              values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="flexDiv">
                                    <Form.Check
                                        name="declaration"
                                        value={values.declaration}
                                        size="lg"
                                        type="checkbox"
                                        onChange={handleChange}
                                    />
                                    <div className='content'>
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
                                <span className="error">
                                    {errors.declaration && errors.declaration}
                                </span>
                                <hr/>
                                <div className="flexDiv">
                                    <Form.Check
                                        name="privacyNotice"
                                        value={values.privacyNotice}
                                        size="lg"
                                        type="checkbox"
                                        onChange={handleChange}
                                    />
                                    <div className='content'>
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
                                <span className="error">
                                    {errors.privacyNotice && errors.privacyNotice}
                                </span>
                                <hr/>
                                <div className="flexDiv">
                                    <Form.Check
                                        name="paymentInstruction"
                                        value={values.paymentInstruction}
                                        size="lg"
                                        type="checkbox"
                                        onChange={handleChange}
                                    />
                                    <div className='content'>
                                        <h6>Payment Instruction</h6>
                                        <p>
                                            I authorise Chubb to debit my account or credit card on a
                                            monthly/yearly basis for payment of the premium stated below.
                                        </p>
                                    </div>

                                </div>

                                <span className="error">
                                    {errors.paymentInstruction && errors.paymentInstruction}
                                </span>
                                <hr/>

                                <p className='iConfirm'>
                                    I confirm that this product is suitable for me and meets my
                                    insurance needs, financial objectives and priority and hereby agree
                                    to purchase this product. Where I have opted to purchase the
                                    coverage for my spouse and/or my child(ren), I further confirm that
                                    this product is suitable for them and meets their insurance needs,
                                    financial objectives and priority and hereby agree to purchase this
                                    product for their benefit.
                                </p>

                                {values.paymentInstruction && (
                                    <div className="paymentDetails">
                                        <div className="inputGroup">
                                            <label>Name of Account Holder or Credit Card Holder</label>
                                            <input
                                                type="text"
                                                name="accountHolderName"
                                                value={values.accountHolderName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <span className="error">
                                                {errors.accountHolderName && touched.accountHolderName && errors.accountHolderName}
                                            </span>
                                        </div>

                                        <div className="second">
                                            <label>Total Premium Payable</label>
                                            <div className='secondFlex'>
                                                <Form.Check
                                                    type="radio"
                                                    label="Credit Card"
                                                    name="payment_method"
                                                    value="Credit Card"
                                                    checked={values.payment_method === 'Credit Card'}
                                                    onChange={handleChange}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Debit Card"
                                                    name="payment_method"
                                                    value="Debit Card"
                                                    checked={values.payment_method === 'Debit Card'}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className='secondFlex'>
                                                <Form.Check
                                                    type="radio"
                                                    label="Visa"
                                                    name="payment_method"
                                                    value="Visa"
                                                    checked={values.payment_method === 'Visa'}
                                                    onChange={handleChange}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Mastercard"
                                                    name="payment_method"
                                                    value="Mastercard"
                                                    checked={values.payment_method === 'Mastercard'}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <span className="error">
                                                {errors.payment_method && touched.payment_method && errors.payment_method}
                                            </span>

                                            <div className='secondFlex two'>
                                                <div className='inputGroup second'>
                                                    <label>Issuing Bank</label>
                                                    <input
                                                        type='text'
                                                        name="issuing_bank"
                                                        value={this.props.state.issuing_bank}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="error">
                                                        {errors.issuing_bank && touched.issuing_bank && errors.issuing_bank}
                                                    </span>
                                                </div>
                                                <div className='inputGroup'>
                                                    <label>Card No.</label>
                                                    <CustomInput
                                                        type="text"
                                                        name="card_number"
                                                        mask="9999-9999-9999-9999"
                                                        value={this.props.state.card_number}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="error">
                                                        {errors.card_number && touched.card_number && errors.card_number}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="secondFlex two">
                                                <div className='inputGroup second'>
                                                    <label>Card Expiry (MM/YYYY)</label>
                                                    <CustomInput
                                                        type="text"
                                                        name="card_expiry"
                                                        mask="99/9999"
                                                        value={this.props.state.card_expiry}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="error">
                                                        {errors.card_expiry && touched.card_expiry && errors.card_expiry}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='total'>
                                                Total Premium Payable RM &nbsp;
                                                <span>{this.props.state.total}</span>
                                            </div>

                                            <div className='signDiv'>
                                                <div className='group'>
                                                    <div className='sign'><SignatureCanvas ref={(ref) => {
                                                        this.state.cardSign = ref
                                                    }} canvasProps={{
                                                        width: '340px',
                                                        height: '100%',
                                                        className: 'sigCanvas'
                                                    }}>
                                                    </SignatureCanvas></div>
                                                    <label>Signature of Card Holder
                                                        <button
                                                            onClick={this.state.cardSign && this.state.cardSign.clear()}>Clear
                                                        </button>
                                                    </label>
                                                    <span className="error">
                                                        {errors.card_sign && errors.card_sign}
                                                    </span>
                                                </div>
                                                <div className='group'>
                                                    <div className='sign'><SignatureCanvas ref={(ref) => {
                                                        this.state.mainSign = ref
                                                    }} canvasProps={{
                                                        width: '340px',
                                                        height: '100%',
                                                        className: 'sigCanvas'
                                                    }}>
                                                    </SignatureCanvas></div>
                                                    <label>Signature of Main Insured Person
                                                        <button
                                                            onClick={this.state.mainSign && this.state.mainSign.clear()}>Clear
                                                        </button>
                                                    </label>
                                                    <span className="error">
                                                        {errors.main_sign && errors.main_sign}
                                                    </span>
                                                </div>

                                                <button type="submit"
                                                        disabled={isSubmitting}
                                                        style={{textDecoration: 'none'}}
                                                        className="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </form>
                        )}
                    </Formik>

                    {/*<div className='flexDiv'>*/}
                    {/*    <Form.Check*/}
                    {/*        defaultChecked={this.props.state.declaration}*/}
                    {/*        value={this.props.state.declaration}*/}
                    {/*        onChange={e => this.props.getChecked(e, 'declaration')}*/}
                    {/*        size='lg'*/}
                    {/*        type='checkbox'*/}
                    {/*    />*/}
                    {/*    <div className='content'>*/}
                    {/*        <h6>Declaration</h6>*/}
                    {/*        <p>*/}
                    {/*            I agree that the statements and declarations contained in this*/}
                    {/*            proposal form will be relied upon by Chubb to decide whether to*/}
                    {/*            accept this insurance. I understand that Chubb needs to deal*/}
                    {/*            with my personal data to administer my Policy and offer me*/}
                    {/*            insurance products and services. To achieve these purposes, I*/}
                    {/*            allow Chubb to collect, use and disclose my personal data to*/}
                    {/*            selected third parties in or outside Malaysia, in accordance*/}
                    {/*            with Chubb’s Personal Data Protection Notice, which is found in*/}
                    {/*            Chubb’s website at www.chubb.com/my-privacy. I may contact Chubb*/}
                    {/*            for access to or correction of my personal data, or for any*/}
                    {/*            other queries or complaints.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<hr/>*/}
                    {/*<div className='flexDiv'>*/}
                    {/*    <Form.Check*/}
                    {/*        defaultChecked={this.props.state.privacyNotice}*/}
                    {/*        value={this.props.state.privacyNotice}*/}
                    {/*        onChange={e => this.props.getChecked(e, 'privacyNotice')}*/}
                    {/*        size='lg'*/}
                    {/*        type='checkbox'*/}
                    {/*    />*/}
                    {/*    <div className='content'>*/}
                    {/*        <h6>Privacy Notice</h6>*/}
                    {/*        <p>*/}
                    {/*            I understand that Chubb needs to deal with my personal data to*/}
                    {/*            administer my Policy and offer me insurance products and*/}
                    {/*            services. To achieve these purposes, I allow Chubb to collect,*/}
                    {/*            use and disclose my personal data to selected third parties in*/}
                    {/*            or outside Malaysia, in accordance with Chubb’s Personal Data*/}
                    {/*            Protection Notice, which is found in Chubb’s website at*/}
                    {/*            www.chubb.com/my-privacy. I may contact Chubb for access to or*/}
                    {/*            correction of my personal data, or for any other queries or*/}
                    {/*            complaints.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<hr/>*/}
                    {/*<div className='flexDiv'>*/}
                    {/*    <Form.Check*/}
                    {/*        defaultChecked={this.props.state.paymentInstruction}*/}
                    {/*        value={this.props.state.paymentInstruction}*/}
                    {/*        onChange={e => this.props.getChecked(e, 'paymentInstruction')}*/}
                    {/*        size='lg'*/}
                    {/*        type='checkbox'*/}
                    {/*    />*/}
                    {/*    <div className='content'>*/}
                    {/*        <h6>Payment Instruction</h6>*/}
                    {/*        <p>*/}
                    {/*            I authorise Chubb to debit my account or credit card on a*/}
                    {/*            monthly/yearly basis for payment of the premium stated below.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<p className='iConfirm'>*/}
                    {/*    I confirm that this product is suitable for me and meets my*/}
                    {/*    insurance needs, financial objectives and priority and hereby agree*/}
                    {/*    to purchase this product. Where I have opted to purchase the*/}
                    {/*    coverage for my spouse and/or my child(ren), I further confirm that*/}
                    {/*    this product is suitable for them and meets their insurance needs,*/}
                    {/*    financial objectives and priority and hereby agree to purchase this*/}
                    {/*    product for their benefit.*/}
                    {/*</p>*/}
                    {/*{this.props.state.paymentInstruction && (*/}
                    {/*    <div className='paymentDetails'>*/}
                    {/*        <div className='inputGroup'>*/}
                    {/*            <label>Name of Account Holder or Credit Card Holder</label>*/}
                    {/*            <input*/}
                    {/*                type='text'*/}
                    {/*                defaultValue='Robert Tan Keng Yong'*/}
                    {/*                value={this.props.state[`accountHolderName`]}*/}
                    {/*                onChange={e =>*/}
                    {/*                    this.props.gettingValues(e, `accountHolderName`)*/}
                    {/*                }*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*        <div className='second'>*/}
                    {/*            <label>Total Premium Payable</label>*/}
                    {/*            <div className='secondFlex'>*/}
                    {/*                <Form.Check*/}
                    {/*                    defaultChecked={this.props.state.creditCard}*/}
                    {/*                    value={this.props.state.creditCard}*/}
                    {/*                    onChange={e => this.props.getChecked(e, 'creditCard')}*/}
                    {/*                    size='lg'*/}
                    {/*                    type='checkbox'*/}
                    {/*                    label='Credit Card'*/}
                    {/*                />*/}
                    {/*                <Form.Check*/}
                    {/*                    className='two'*/}
                    {/*                    defaultChecked={this.props.state.masterCard}*/}
                    {/*                    value={this.props.state.masterCard}*/}
                    {/*                    onChange={e => this.props.getChecked(e, 'masterCard')}*/}
                    {/*                    size='lg'*/}
                    {/*                    type='checkbox'*/}
                    {/*                    label='Mastercard'*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className='secondFlex'>*/}
                    {/*                <Form.Check*/}
                    {/*                    defaultChecked={this.props.state.debitCard}*/}
                    {/*                    value={this.props.state.debitCard}*/}
                    {/*                    onChange={e => this.props.getChecked(e, 'debitCard')}*/}
                    {/*                    size='lg'*/}
                    {/*                    type='checkbox'*/}
                    {/*                    label='Debit Card'*/}
                    {/*                />*/}
                    {/*                <Form.Check*/}
                    {/*                    className='two'*/}
                    {/*                    defaultChecked={this.props.state.rhb}*/}
                    {/*                    value={this.props.state.rhb}*/}
                    {/*                    onChange={e => this.props.getChecked(e, 'rhb')}*/}
                    {/*                    size='lg'*/}
                    {/*                    type='checkbox'*/}
                    {/*                    label='RHB'*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className='secondFlex'>*/}
                    {/*                <Form.Check*/}
                    {/*                    defaultChecked={this.props.state.visa}*/}
                    {/*                    value={this.props.state.visa}*/}
                    {/*                    onChange={e => this.props.getChecked(e, 'visa')}*/}
                    {/*                    size='lg'*/}
                    {/*                    type='checkbox'*/}
                    {/*                    label='VISA'*/}
                    {/*                />*/}
                    {/*                <Form.Check*/}
                    {/*                    className='two'*/}
                    {/*                    defaultChecked={this.props.state.maybank}*/}
                    {/*                    value={this.props.state.maybank}*/}
                    {/*                    onChange={e => this.props.getChecked(e, 'mayBank')}*/}
                    {/*                    size='lg'*/}
                    {/*                    type='checkbox'*/}
                    {/*                    label='Maybank'*/}
                    {/*                />*/}
                    {/*            </div>*/}

                    {/*            <div className='secondFlex two'>*/}
                    {/*                <div className='inputGroup second'>*/}
                    {/*                    <label>Issuing Bank</label>*/}
                    {/*                    <input*/}
                    {/*                        type='text'*/}
                    {/*                        defaultValue='Maybank'*/}
                    {/*                        value={this.props.state[`issuing_bank`]}*/}
                    {/*                        onChange={e => this.props.gettingValues(e, `issuing_bank`)}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*                <div className='inputGroup'>*/}
                    {/*                    <label>Card No.</label>*/}
                    {/*                    <input*/}
                    {/*                        type='text'*/}
                    {/*                        defaultValue='1234 5678 4455 8877'*/}
                    {/*                        value={this.props.state[`card_number`]}*/}
                    {/*                        onChange={e => this.props.gettingValues(e, `card_number`)}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className='secondFlex two'>*/}
                    {/*                <div className='inputGroup second'>*/}
                    {/*                    <label>Card Expiry</label>*/}
                    {/*                    <input*/}
                    {/*                        type='date'*/}
                    {/*                        className='date'*/}
                    {/*                        value={this.props.state[`expiry`]}*/}
                    {/*                        onChange={e => this.props.gettingValues(e, `expiry`)}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className='total'>*/}
                    {/*                Total Premium Payable RM &nbsp; <span>560.09</span>*/}
                    {/*            </div>*/}
                    {/*            <div className='signDiv'>*/}
                    {/*                <div className='group'>*/}
                    {/*                    <div className='sign'>Sign Here</div>*/}
                    {/*                    <label>Signature of Card Holder</label>*/}
                    {/*                </div>*/}
                    {/*                <div className='group'>*/}
                    {/*                    <div className='sign'>Sign Here</div>*/}
                    {/*                    <label>Signature of Main Insured Person</label>*/}
                    {/*                </div>*/}

                    {/*                <Link*/}
                    {/*                    to='/proposal-form'*/}
                    {/*                    style={{textDecoration: 'none'}}*/}
                    {/*                    className='submit'*/}
                    {/*                >*/}
                    {/*                    /!* <button > *!/*/}
                    {/*                    Submit*/}
                    {/*                    /!* </button> *!/*/}
                    {/*                </Link>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        )
    }
}

export default withRouter(Declaration)
