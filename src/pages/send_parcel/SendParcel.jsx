import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    FiUser,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useAxiousSecoure } from "../../hook/useAxiousSecoure";

const SendParcel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const data = useLoaderData();
    const { handleSubmit, reset, register, watch, formState: { errors } } = useForm()
    const selectSenderRegion = watch("senderRegion")
    const selectReciverRegion = watch("reciverRegion")
    const parcelType = watch("parcelType")

    const axiousInstence = useAxiousSecoure()


    const regionDuplicate = data.map(d => d.region);
    const regions = [...new Set(regionDuplicate)];

    const handelDristictSelect = (region) => {
        const regionBaseDistrict = data.filter(d => d.region === region);
        const districts = regionBaseDistrict.map(district => district.district)
        return districts
    }

    const handelForm = (formData) => {
        const isDocument = formData.parcelType === "document";
        const isSameDistrict = formData.senderDistrict === formData.reciverDistrict;
        const weight = parseFloat(formData.weight);
        const exrtaWeight = weight - 3;

        let cost = 0;
        let deliveryCost = 0;
        let overWeightCost = 0;
        let extraCost = 0;

        if (isDocument) {
            deliveryCost = isSameDistrict ? 60 : 80;
            cost = deliveryCost;

        } else {
            if (weight < 3) {
                deliveryCost = isSameDistrict ? 110 : 150;
                cost = deliveryCost;
            }
            else {
                deliveryCost = isSameDistrict ? 110 : 150;
                overWeightCost = exrtaWeight * 40;
                if (!isSameDistrict) {
                    extraCost = 40
                }
                cost = deliveryCost + overWeightCost + extraCost;
            }
        }
        formData.cost = cost;
        formData.payment = 'pay'
        // console.log("cost", cost, "deliveryCost", deliveryCost)
        Swal.fire({
            title: "Are you agree this cost?",
            html: `
    <div style="text-align: left;">
      <table style="width: 100%; border-collapse: collapse;">
        
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            Delivery Charge
          </td>
          <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #eee;">
            $${deliveryCost}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            Over Weight Charge
          </td>
          <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #eee;">
            $${overWeightCost}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
            Extra Charge 
          </td>
          <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #eee;">
            $${extraCost}
          </td>
        </tr>

        <tr>
          <td style="padding: 12px 0; font-weight: 700;">
            Total Amount
          </td>
          <td style="padding: 12px 0; text-align: right; font-weight: 700;">
            $${cost}
          </td>
        </tr>

      </table>
    </div>
  `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, agree it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiousInstence.post("/parcels", formData)
                    .then(res => {
                        if (res.data.acknowledged) {
                            navigate('/dashboard/my-parcel')
                            Swal.fire({
                                title: "Done!",
                                text: "Rider is comming soon.",
                                icon: "success"
                            });
                        }
                    })
            }

        });

    }
    return (
        <div className=" my-10 mx-auto bg-white rounded-2xl p-6 md:p-10">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-[#073b43]">
                Send A Parcel
            </h1>

            <form onSubmit={handleSubmit(handelForm)} className="mt-8">

                {/* Parcel Details */}
                <div>
                    <h2 className="text-base font-semibold text-[#073b43]">
                        Enter your parcel details
                    </h2>

                    <div className="border-t border-gray-200 mt-4 pt-5">

                        {/* Radio */}
                        <div className="flex gap-6 mb-6">

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="parcelType"
                                    value="document"
                                    defaultChecked
                                    className="radio radio-success"
                                    {...register("parcelType")}
                                />
                                <span>Document</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="parcelType"
                                    value="non-document"
                                    className="radio radio-success"
                                    {...register("parcelType")}
                                />
                                <span>Non-Document</span>
                            </label>

                        </div>

                        {/* Parcel Name + Weight */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Parcel Name <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Parcel Name"
                                    className={`input input-bordered w-full ${errors.parcelName ? "input-error" : ""}`}
                                    {...register("parcelName", {
                                        required: "Name is required",
                                    })}
                                />
                                {errors.parcelName && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.parcelName.message}
                                    </p>
                                )}
                            </div>
                            {/* Weight */}
                            <div>
                                <label className="label">
                                    <span className="label-text ">
                                        Parcel Weight (KG) {parcelType === "document" ? "" : <span className="text-xl text-red-600">*</span>}
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    placeholder="Parcel Weight (KG)"
                                    className={`input input-bordered w-full ${errors.weight && parcelType !== "documnet" ? "input-error" : ""}`}
                                    {...register("weight", {
                                        required: parcelType === "document" ? false : "Weight is Must be Required", min: {
                                            value: 1,
                                            message: "Weight is Must be Positive"
                                        }
                                    })}
                                />
                                {errors.weight && (
                                    <p className="text-red-500">
                                        {errors.weight.message}
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>


                {/* Sender + Receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

                    {/* ================= SENDER ================= */}
                    <div>

                        <h3 className="text-base font-semibold text-[#073b43] mb-4">
                            Sender Details
                        </h3>

                        <div className="space-y-4">

                            {/* Sender Name */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Sender Name <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="SenderName"
                                        defaultValue={user.displayName}
                                        className={`input input-bordered w-full pl-10 ${errors.senderName ? "input-error" : ""}`}
                                        {...register("senderName", {
                                            required: "Please enter your name",
                                        })}
                                    />
                                    {errors.senderName && (
                                        <p className="text-error text-xs mt-1">
                                            {errors.senderName.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            {/* Sender Address */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Pickup Address <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className={`input input-bordered w-full pl-10 ${errors.senderAddress ? "input-error" : ""}`}
                                        {...register("senderAddress", {
                                            required: "Address is required",
                                        })}
                                    />
                                    {errors.senderAddress && (
                                        <p className="text-error text-xs mt-1">
                                            {errors.senderAddress.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Sender Email */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Sender Email <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="email"
                                        readOnly
                                        placeholder="Email address"
                                        className={`input input-bordered w-full pl-10 ${errors.senderEmail ? "input-error" : ""}`}
                                        defaultValue={user.email}
                                        {...register("senderEmail", {
                                            required: "Email is required",
                                        })}
                                    />
                                    {errors.senderEmail && (
                                        <p className="text-error text-xs mt-1">
                                            {errors.senderEmail.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            {/*Sender  Phone */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Sender Phone No <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="tel"
                                        placeholder="Sender Phone No"
                                        className={`input input-bordered w-full pl-10 ${errors.senderMobile ? "input-error" : ""}`}
                                        {...register("senderMobile", {
                                            required: "Mobile number is required",
                                            pattern: {
                                                value: /^01[3-9]\d{8}$/,
                                                message: "Enter a valid 11 digit mobile number",
                                            },
                                        })}
                                    />
                                    {errors.senderMobile && (
                                        <p className="text-error text-xs mt-1">
                                            {errors.senderMobile.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            {/* Sender Region */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Your Region <span className="text-red-500">*</span>
                                    </span>
                                </label>
                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${errors.senderRegion ? "input-error" : ""}`}
                                    {...register("senderRegion", {
                                        required: "Rigion is required"
                                    })}
                                >
                                    <option value="" disabled>
                                        Select your Region
                                    </option>
                                    {
                                        regions.map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
                                {errors.senderRegion && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.senderRegion.message}
                                    </p>
                                )}
                            </div>

                            {/* Sender District */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Your District <span className="text-red-500">*</span>
                                    </span>
                                </label>
                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${errors.senderDistrict ? "input-error" : ""}`}
                                    {...register("senderDistrict", {
                                        required: "Please Select District"
                                    })}
                                >
                                    <option value="" disabled>
                                        Select your District
                                    </option>
                                    {
                                        handelDristictSelect(selectSenderRegion).map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
                                {errors.senderDistrict && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.senderDistrict.message}
                                    </p>
                                )}
                            </div>


                            {/* Pickup Instruction */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Pickup Instruction
                                    </span>
                                </label>

                                <textarea
                                    placeholder="Pickup Instruction"
                                    className="textarea textarea-bordered w-full h-32"
                                    {...register("pickupInstrc")}
                                />
                            </div>

                        </div>
                    </div>


                    {/* ================= RECEIVER ================= */}
                    <div>

                        <h3 className="text-base font-semibold text-[#073b43] mb-4">
                            Receiver Details
                        </h3>

                        <div className="space-y-4">

                            {/* Receiver Name */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Receiver Name <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Receiver Name"
                                        className={`input input-bordered w-full pl-10 ${errors.reciverName ? "input-error" : ""}`}
                                        {...register("reciverName", {
                                            required: "Name is empty"
                                        })}
                                    />
                                    {errors.reciverName && (
                                        <p className="text-error text-xs mt-1">
                                            {errors.reciverName.message}
                                        </p>
                                    )}

                                </div>
                            </div>


                            {/* Receiver Address */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Receiver Address <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className={`input input-bordered w-full pl-10 ${errors.reciverAdderss ? "input-error" : ""}`}
                                        {...register("reciverAdderss", {
                                            required: "Address is required",
                                        })}
                                    />
                                    {errors.reciverAdderss && (
                                        <p className="text-error text-xs mt-1">
                                            {errors.reciverAdderss.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Reciver Email */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Reciver Email
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="input input-bordered w-full pl-10"
                                        {...register("reciverEmail")}
                                    />
                                </div>
                            </div>


                            {/* Receiver Contact */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Receiver Contact No <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="tel"
                                        placeholder="Sender Phone No"
                                        className={`input input-bordered w-full pl-10 ${errors.reciverMobile ? "input-error" : ""}`}
                                        {...register("reciverMobile", {
                                            required: "Reciver mobile number is required",
                                            pattern: {
                                                value: /^01[3-9]\d{8}$/,
                                                message: "Enter a valid 11 digit mobile number",
                                            },
                                        })}
                                    />
                                    {errors.reciverMobile && (
                                        <p className="text-error text-xs mt-1">
                                            {errors.reciverMobile.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            {/* Reciver Region */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Reciver Region <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${errors.reciverRegion ? "input-error" : ""}`}
                                    {...register("reciverRegion", {
                                        required: " Region is required"
                                    })}
                                >
                                    <option value="" disabled>
                                        Select Reciver Region
                                    </option>
                                    {
                                        regions.map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
                                {errors.reciverRegion && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.reciverRegion.message}
                                    </p>
                                )}
                            </div>

                            {/* Reciver District */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Reciver   District <span className="text-red-500">*</span>
                                    </span>
                                </label>

                                <select
                                    defaultValue=""
                                    className={`select select-bordered w-full ${errors.reciverDistrict ? "input-error" : ""}`}
                                    {...register("reciverDistrict", {
                                        required: "Please Select Dristict "
                                    })}
                                >
                                    <option value="" disabled>
                                        Select Reciver District
                                    </option>
                                    {
                                        handelDristictSelect(selectReciverRegion).map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
                                {errors.reciverDistrict && (
                                    <p className="text-error text-xs mt-1">
                                        {errors.reciverDistrict.message}
                                    </p>
                                )}
                            </div>


                            {/* Delivery Instruction */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Delivery Instruction
                                    </span>
                                </label>

                                <textarea
                                    placeholder="Delivery Instruction"
                                    className="textarea textarea-bordered w-full h-32"
                                    {...register("deliveryInstr")}
                                />
                            </div>

                        </div>
                    </div>

                </div>


                {/* Bottom */}
                <div className="mt-6">

                    <p className="text-sm text-gray-600 mb-5">
                        * Pickup Time 4pm-7pm Approx.
                    </p>

                    <button
                        type="submit"
                        className="btn bg-lime-400 hover:bg-lime-500 border-none text-[#073b43]"
                    >
                        Proceed to Confirm Booking
                    </button>

                </div>

            </form>
        </div>
        // </div>
    );
};

export default SendParcel;