import { useState } from "react";
import {
    FaHistory,
    FaBullseye,
    FaTrophy,
    FaUsers,
} from "react-icons/fa";

const aboutData = {
    Story: {
        icon: <FaHistory />,
        content:
            "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination on time, every time.",
    },
    Mission: {
        icon: <FaBullseye />,
        content:
            "Our mission is to provide fast, secure, and affordable delivery services across Bangladesh. We aim to simplify logistics by using technology that connects customers and delivery partners efficiently.",
    },
    Success: {
        icon: <FaTrophy />,
        content:
            "Thousands of satisfied customers, nationwide delivery coverage, and continuous innovation have helped us become one of the trusted courier services in Bangladesh.",
    },
    "Team & Others": {
        icon: <FaUsers />,
        content:
            "Our passionate team works around the clock to ensure every parcel is delivered safely. Together, we believe in teamwork, transparency, and exceptional customer support.",
    },
};

const About = () => {
    const [activeTab, setActiveTab] = useState("Story");
    console.log(aboutData['Success'].content)

    return (
        <section className="my-10 md:my-14">
            <div className="  bg-white rounded-3xl shadow-lg p-8 md:p-12">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-primary mb-3">About Us</h2>

                <p className="text-gray-500 max-w-2xl leading-7 mb-10">
                    Enjoy fast, reliable parcel delivery with real-time tracking and
                    hassle-free service. From personal packages to business shipments,
                    we deliver on time, every time.
                </p>

                {/* Tabs */}
                <div role="tablist" className="tabs tabs-border mb-6">
                    {
                        Object.keys(aboutData).map(tab => (
                            <button
                                key={tab}
                                role="tab"
                                onClick={() => setActiveTab(tab)}
                                className={`tab gap-2 ${activeTab === tab ? "tab-active text-primary font-semibold" : ""}`}
                            >
                                {aboutData[tab].icon}
                                {tab}
                            </button>
                        ))
                    }
                </div>

                {/* Content */}
                <div className="space-y-6 text-gray-600 leading-8">
                    <p>{aboutData[activeTab].content}</p>

                    <p>
                        Our focus has always been customer satisfaction. We continue to
                        improve our delivery network by adopting modern technology,
                        expanding our coverage, and ensuring every shipment is handled with
                        care from pickup to delivery.
                    </p>

                    <p>
                        Whether you're sending a personal parcel or managing business
                        logistics, our goal is to make delivery simple, fast, and
                        dependable.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;