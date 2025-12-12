import React from 'react';
import BackButton from '../../../components/back_button/BackButton';

const PaymnetCanceled = () => {
    return (
        <div>
        <h1 className="text-3xl font-bold mb-5">Payment Canceled</h1>
            <BackButton link="/clubs" name="Back" color="black" />
        </div>
    );
};

export default PaymnetCanceled;