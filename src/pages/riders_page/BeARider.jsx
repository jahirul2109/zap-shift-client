import React from "react";
import { useForm } from "react-hook-form";
import { FaMotorcycle } from "react-icons/fa";
import { useLoaderData } from "react-router";
import ridersImg from '../../assets/riders.svg'
import useAuth from "../../hook/useAuth";
import { useAxiousSecoure } from "../../hook/useAxiousSecoure";
import Swal from "sweetalert2";

const BeARider = () => {
    const { user } = useAuth();
    const axiousInstence = useAxiousSecoure();
    const data = useLoaderData();
    const duplicateRigion = data.map(region => region.region);
    const regions = [...new Set(duplicateRigion)];
    // console.log("rigon", regions)
    // console.log(data)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const selectedRigeion = watch("region")

    const districts = data.filter(res => res.region === selectedRigeion);

    const onSubmit = (data) => {
        // console.log(data)
        axiousInstence.post('/riders', data)
            .then(res => {
                // console.log(res.data)
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: "Application Submitted Successfully !",
                        text: "Thank you for applying. Your rider application is currently pending. We'll get in touch with you within 3 days",
                        icon: "success",
                        draggable: true
                    });
                    reset()
                }
            })
            .catch(err => {
                if (err.response?.status === 409) {
                    Swal.fire({
                        icon: "error",
                        title: "Already Aplied",
                        text: `${err.response.data.message}`,
                    });
                    return;
                }
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `${err.message}`
                });
            })
    };

    return (
        <div className="min-h-screen py-10">

            <div className="w-full  bg-base-100 rounded-2xl shadow-sm p-6 md:p-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* ================= LEFT SIDE ================= */}
                    <div className="w-full max-w-xl">

                        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                            Be a Rider
                        </h1>

                        <p className="text-sm text-base-content/60 mb-8 max-w-lg">
                            Join our rider community and start delivering parcels
                            with us. Fill up the form below to become a rider.
                        </p>


                        <h2 className="text-xl font-bold mb-5">
                            Tell us about yourself
                        </h2>


                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >

                            {/* Name */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Full Name <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    placeholder="Your Name"
                                    className={`input input-bordered w-full ${errors.name ? "input-error" : ""
                                        }`}
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />

                                {errors.name && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>


                            {/* Email */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Email <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <input
                                    type="email"
                                    readOnly
                                    placeholder="Your Email"
                                    defaultValue={user?.email}
                                    // readOnly
                                    className={`input input-bordered w-full ${errors.email ? "input-error" : ""
                                        }`}
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                />

                                {errors.email && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>


                            {/* Phone */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Phone <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <input
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    className={`input input-bordered w-full ${errors.phone ? "input-error" : ""
                                        }`}
                                    {...register("phone", {
                                        required: "Phone number is required",
                                    })}
                                />

                                {errors.phone && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>


                            {/* Region */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Your Region <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <select
                                    className={`select select-bordered w-full ${errors.region ? "select-error" : ""
                                        }`}
                                    defaultValue=""
                                    {...register("region", {
                                        required: "Please select your region",
                                    })}
                                >
                                    <option value="" disabled>
                                        Select your region
                                    </option>

                                    {
                                        regions.map((region, index) => <option value={region} key={index}>{region}</option>)
                                    }
                                </select>

                                {errors.region && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.region.message}
                                    </p>
                                )}
                            </div>


                            {/* District */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Your District <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <select
                                    className={`select select-bordered w-full ${errors.district ? "select-error" : ""
                                        }`}
                                    defaultValue=""
                                    {...register("district", {
                                        required: "Please select your district",
                                    })}
                                >
                                    <option value="" disabled>
                                        Select your district
                                    </option>
                                    {
                                        districts.map((district, index) => <option key={index}>{district.district}</option>)
                                    }

                                </select>

                                {errors.district && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.district.message}
                                    </p>
                                )}
                            </div>


                            {/* NID */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        NID <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Your NID Number"
                                    className={`input input-bordered w-full ${errors.nid ? "input-error" : ""
                                        }`}
                                    {...register("nid", {
                                        required: "NID is required",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Only numbers are allowed"
                                        }
                                    })}
                                />

                                {errors.nid && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.nid.message}
                                    </p>
                                )}
                            </div>


                            {/* Bike Brand */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Bike Brand
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Your Bike Brand"
                                    className="input input-bordered w-full"
                                    {...register("bikeBrand")}
                                />
                            </div>


                            {/* Bike Registration */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Bike Registration Number <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Bike Registration Number"
                                    className="input input-bordered w-full"
                                    {...register("bikeRegistration", {
                                        required: "Bike Registion Number is Required"
                                    })}
                                />

                                {errors.bikeRegistration && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.bikeRegistration.message}
                                    </p>
                                )}
                            </div>


                            {/* Driving License */}
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Driving License <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Your Driving License Number"
                                    className="input input-bordered w-full"
                                    {...register("drivingLicense", {
                                        required: "Driving License is Must Required"
                                    })}
                                />
                                {errors.drivingLicense && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.drivingLicense.message}
                                    </p>
                                )}
                            </div>


                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn btn-primary text-secondary w-full mt-3"
                            >
                                <FaMotorcycle />
                                Submit
                            </button>

                        </form>
                    </div>


                    {/* ================= RIGHT SIDE ================= */}
                    <div className="hidden lg:flex justify-center items-center">

                        <div className="w-full max-w-md">
                            <img
                                src={ridersImg}
                                alt="Rider"
                                className="w-full h-auto object-contain"
                            />

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default BeARider;