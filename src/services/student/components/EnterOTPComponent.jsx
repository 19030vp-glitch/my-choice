import React, { useState, useEffect, useRef } from 'react';

const EnterOTPComponent = ({ otp, setOtp, onOTPEntered = false }) => {
    const inputRefs = useRef([]);

    const handleOtpChange = (index, value) => {
        const sanitizedValue = value.replace(/\D/g, '');
        const digit = sanitizedValue.charAt(0);
        const otpArray = otp.split('');
        otpArray[index] = digit;
        let joinedOTP = otpArray.join('')
        setOtp(() => joinedOTP);

        // if (joinedOTP.length > 6) {
        //     if (onOTPEntered) {
        //         onOTPEntered()
        //     }
        // }



        // Move focus to the next input or back to the previous input
        if (digit) {
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                inputRefs.current[index].blur();
            }
        } else {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };


    useEffect(() => {
        // Set the initial focus on the first input
        if (otp.length === 0) {
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }
    }, [otp]);

    return (
        <div className="flex items-center justify-center">
            <div className="space-x-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                        key={index}
                        required
                        type="number"
                        className={`w-10 h-10 px-2 py-2 text-center rounded-md text-2xl font-semibold focus:ring focus:ring-blue-300 outline-none ${otp[index] ? 'border-2 border-blue-300' : 'border-blue-100 border-2'}`}
                        maxLength="1"
                        value={otp[index] || ''}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        ref={(inputRef) => (inputRefs.current[index] = inputRef)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EnterOTPComponent;
