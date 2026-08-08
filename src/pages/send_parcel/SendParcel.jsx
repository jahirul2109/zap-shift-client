import React from "react";
import { useForm } from "react-hook-form";
import {
    FiUser,
    FiPhone,
    FiMapPin,
} from "react-icons/fi";
import { useLoaderData } from "react-router";

const SendParcel = () => {
    const data = useLoaderData();
    const { handleSubmit, reset, register, watch, formState: { errors } } = useForm()
    // console.log(data)
    const regionDuplicate = data.map(d => d.region);
    const regions = [...new Set(regionDuplicate)];
    const selectSenderRegion = watch("senderRegion")
    const selectReciverRegion = watch("reciverRegion")

    const handelDristictSelect = (region) => {
        const regionBaseDistrict = data.filter(d => d.region === region);
        const districts = regionBaseDistrict.map(district => district.district)
        return districts
    }
    const handelForm = (formData) => {
        console.log(formData)
        const isDocument = formData.parcelType === "document";
        const isSameDistrict = formData.senderDistrict === formData.reciverDistrict;
        const weight = parseFloat(formData.weight);
        const exrtaWeight = weight - 3;

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        } else {
            if (weight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const charge = isSameDistrict ? 110 : 150;
                const extraCharge = isSameDistrict ? exrtaWeight * 40 : exrtaWeight * 40 + 40;
                cost = charge + extraCharge;
            }
        }

        console.log("cost", cost)


    }
    return (
        // <div className="min-h-screen bg-gray-100 ">
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

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Parcel Name
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    placeholder="Parcel Name"
                                    className="input input-bordered w-full"
                                    {...register("parcelName")}
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Parcel Weight (KG)
                                    </span>
                                </label>

                                <input
                                    type="number"
                                    placeholder="Parcel Weight (KG)"
                                    className="input input-bordered w-full"
                                    {...register("weight", {
                                        required: "Weight is Must be Required", min: {
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
                                        Sender Name
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="SenderName"
                                        className="input input-bordered w-full pl-10"
                                        {...register("senderName")}
                                    />
                                </div>
                            </div>


                            {/* Address */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Address
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="input input-bordered w-full pl-10"
                                        {...register("senderAddress")}
                                    />
                                </div>
                            </div>


                            {/* Phone */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Sender Phone No
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="tel"
                                        placeholder="Sender Phone No"
                                        className="input input-bordered w-full pl-10"
                                        {...register("senderMobile")}
                                    />
                                </div>
                            </div>


                            {/* Sender Region */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Your Region
                                    </span>
                                </label>

                                <select
                                    defaultValue=""
                                    className="select select-bordered w-full"
                                    {...register("senderRegion")}
                                >
                                    <option value="" disabled>
                                        Select your Region
                                    </option>
                                    {
                                        regions.map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
                            </div>

                            {/* Sender District */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Your District
                                    </span>
                                </label>

                                <select
                                    defaultValue=""
                                    className="select select-bordered w-full"
                                    {...register("senderDistrict")}
                                >
                                    <option value="" disabled>
                                        Select your District
                                    </option>
                                    {
                                        handelDristictSelect(selectSenderRegion).map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
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
                                        Receiver Name
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Receiver Name"
                                        className="input input-bordered w-full pl-10"
                                        {...register("reciverName")}
                                    />
                                </div>
                            </div>


                            {/* Receiver Address */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Receiver Address
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="input input-bordered w-full pl-10"
                                        {...register("reciverAdderss")}
                                    />
                                </div>
                            </div>


                            {/* Receiver Contact */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Receiver Contact No
                                    </span>
                                </label>

                                <div className="relative">
                                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="tel"
                                        placeholder="Receiver Contact No"
                                        className="input input-bordered w-full pl-10"
                                        {...register("reciverMobile")}
                                    />
                                </div>
                            </div>


                            {/* Reciver Region */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Reciver Region
                                    </span>
                                </label>

                                <select
                                    defaultValue=""
                                    className="select select-bordered w-full"
                                    {...register("reciverRegion")}
                                >
                                    <option value="" disabled>
                                        Select Reciver Region
                                    </option>
                                    {
                                        regions.map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
                            </div>

                            {/* Reciver District */}
                            <div>
                                <label className="label">
                                    <span className="label-text">
                                        Reciver   District
                                    </span>
                                </label>

                                <select
                                    defaultValue=""
                                    className="select select-bordered w-full"
                                    {...register("reciverDistrict")}
                                >
                                    <option value="" disabled>
                                        Select Reciver District
                                    </option>
                                    {
                                        handelDristictSelect(selectReciverRegion).map(((region, i) => <option key={i} value={region}>{region}</option>))
                                    }

                                </select>
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