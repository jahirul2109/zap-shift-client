import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { map } from 'leaflet';
export const Coverage = () => {
    const position = [23.6850, 90.3563];
    const [warehouse, setWarehouse] = useState([]);
    const [search, setSearch] = useState(null);
    const locationRef = useRef();
    useEffect(() => {
        fetch('/warehouses.json')
            .then(res => res.json())
            .then(result => {
                console.log(result)
                setWarehouse(result)
            })
    }, [])

    const handelSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value;
        const currenLocation = warehouse.find(center => center.district.toLowerCase().includes(location.toLowerCase()))
        if (currenLocation) {
            setSearch([currenLocation.latitude, currenLocation.longitude]);
            locationRef.current.flyTo([currenLocation.latitude, currenLocation.longitude], 12)

        }

    }
    return (
        <div className='bg-white px-8 py-5 w-full mx-auto  md:py-10 rounded-2xl my-10 space-y-5 md:space-y-10'>
            <h1 className='text-5xl font-bold  text-secondary'>We are avaiable in 64 districts</h1>
            <form onSubmit={handelSearch}>
                <label className="input bg-[#ECF3FA]">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" name='location'  placeholder="Search" />
                </label>
            </form>
            <div>
                <h1 className='text-secondary text-2xl font-bold my-5 md:my-8'>We are deliver almost all over Bangladesh</h1>
                <MapContainer
                    ref={locationRef}
                    center={position}
                    zoom={7}
                    scrollWheelZoom={false}
                    className='w-full h-[80vh] z-10'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {
                        warehouse.map(mark => (
                            <Marker position={[mark.latitude, mark.longitude]}>
                                <Popup>
                                    <strong>{mark.district}</strong> <br />
                                    Service Center : {mark.covered_area.join(" ,")}
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
        </div>
    )
}
