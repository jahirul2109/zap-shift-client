import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure'

export const PaymentSuccess = () => {
    const axiosInstence = useAxiousSecoure();
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id");
    console.log(sessionId);
    useEffect(() => {
        axiosInstence.patch(`/payment-verification?session_id=${sessionId}`)
    }, [sessionId, axiosInstence])
    return (
        <div>PaymentSuccess</div>
    )
}
