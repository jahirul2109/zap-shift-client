import React from 'react'
import { Link } from 'react-router'

export const PaymentCancel = () => {
  return (
    <div>
      PaymentCancel
      <Link to='/dashboard/my-parcel'><button className='btn text-black btn-primary'>Try agin</button></Link>
      </div>
  )
}
