import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router'
import { useAxiousSecoure } from '../../hook/useAxiousSecoure';
import LoadingDashboard from '../../utilits/LoadingDashboard';

export const TrackParcel = () => {
    const { id } = useParams();
    const axiosInstence = useAxiousSecoure();
    console.log(id)

    const { data: trackingParcel = [], isLoading } = useQuery({
        queryKey: ['trackingId', id],
        queryFn: async () => {
            const result = await axiosInstence.get(`/trackId/${id}/status`);
            return result.data;
        }
    })
    console.log(trackingParcel)
    if (isLoading) {
        return <LoadingDashboard></LoadingDashboard>
    }
    return (
        <div className='min-h-[50vh] w-full my-20 flex justify-center flex-col items-center mx-auto'>
            <h1 className='text-2xl md:text-5xl text-secondary font-bold text-center my-5'>Tracking Your Parcel </h1>
            <ul className="timeline timeline-vertical lg:timeline-horizontal">
                {trackingParcel.map(res => <li key={res._id}>
                    <div className="timeline-start">{new Date(res.createAt).toDateString()}</div>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box uppercase">{res.statusDetails}</div>
                    <hr />
                </li>)}

            </ul>
        </div>
    )
}
