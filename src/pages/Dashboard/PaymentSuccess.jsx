import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure'

export const PaymentSuccess = () => {
    const axiosInstence = useAxiousSecoure();
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({})
    const sessionId = searchParams.get("session_id");
    // console.log(paymentInfo.TransactionId);
    // console.log(paymentInfo)
    useEffect(() => {
        axiosInstence.patch(`/payment-verification?session_id=${sessionId}`)
            .then(res => {
                setPaymentInfo({
                    TransactionId: res.data.TransactionId,
                    trackingId: res.data.trackingId
                })
            })
    }, [sessionId, axiosInstence])
    return ( 
        <div>
            <h1 className="text-xl">Payment Successfull</h1>
            <p>Transaction ID : <span className='text-blue underline'> {paymentInfo.TransactionId}</span></p>
            <p>Parcel Tracking ID : <span className='text-blue underline'> {paymentInfo.trackingId}</span></p>
        </div>
    )
}
