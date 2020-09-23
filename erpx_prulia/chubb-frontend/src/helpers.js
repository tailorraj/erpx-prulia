import InputMask from "react-input-mask";
import React from "react";

export const memberDetailsMap = (childNum) => {
    let key_pair = {
        mainInsuredBirthDate: "dob",
        mainInsuredEmail: "email",
        mainInsuredGender: "gender",
        mainInsuredMobileNo: "cell_number",
        mainInsuredName: "full_name",
        mainInsuredNric: "nric_number",
        mainInsuredStatus: "marital_status",
        mainInsuredAddress: 'address',
        mainInsuredPostcode: 'postcode',

        spouseName: 'spouse_name',
        spouseNric: 'spouse_nric_number',
        spouseBirthDate: 'spouse_dob',

        acknowledge_child: 'acknowledge_child'
    };

    for (let i = 0; i < childNum; i++) {
        key_pair[`childName${i}`] = `child_name${i}`;
        key_pair[`childBirthDate${i}`] = `child_dob${i}`;
    }

    return key_pair;
};

export const CustomInput = props => (
    <InputMask {...props}>{inputProps => <input {...inputProps} />}</InputMask>
);