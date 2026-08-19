import { useQuery } from '@tanstack/react-query'
import React from 'react'

const AssignRiders = () => {
    const {} = useQuery({
        queryKey : ['parcels' , 'pending_pickup'] , 
        queryFn : async ()
    })
  return (
    <div>

    </div>
  )
}

export default AssignRiders