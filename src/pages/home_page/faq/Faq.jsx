import React from 'react'
import { FaArrowUp, FaArrowRight } from "react-icons/fa6";
import { IoIosArrowForward } from 'react-icons/io';


export const Faq = () => {
    const faqs = [
        {
            id: 1,
            question: "How does this posture corrector work?",
            answer:
                "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
        },
        {
            id: 2,
            question: "Is it suitable for all ages and body types?",
            answer:
                "Yes. It is adjustable and designed to fit most body types comfortably.",
        },
        {
            id: 3,
            question: "Does it really help with back pain and posture improvement?",
            answer:
                "Regular use may help improve posture and reduce discomfort when combined with healthy habits.",
        },
        {
            id: 4,
            question: "Does it have smart features like vibration alerts?",
            answer:
                "Some models include vibration reminders to encourage proper posture.",
        },
        {
            id: 5,
            question: "How will I be notified when the product is back in stock?",
            answer:
                "You'll receive an email notification if you subscribe to stock alerts.",
        },
    ];

    return (

        <section className="py-20 bg-white rounded-xl my-5 md:my-10">
            <div className="max-w-6xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-secondary">
                        Frequently Asked Question (FAQ)
                    </h2>

                    <p className="max-w-2xl mx-auto mt-4 text-base-content">
                        Enhance posture, mobility, and well-being effortlessly with
                        Posture Pro. Achieve proper alignment, reduce pain, and strengthen
                        your body with ease!
                    </p>
                </div>

                {/* Accordions */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={faq.id} className="collapse collapse-arrow bg-white rounded-2xl shadow-md border border-base-300" name="my-accordion-det-1" open>
                                <summary className="collapse-title font-semibold">{faq.question} 
                                </summary>
                               
                            <div className="collapse-content text-sm">{faq.answer}</div>
                        </details>
                    ))}
                </div>

                {/* Button */}
                {/* <div className="flex justify-center mt-10">
                    <button className="btn rounded-full bg-primary hover:bg-lime-400 border-none text-black">
                        See More FAQ's
                        <span className="w-8 h-8 rounded-full bg-black text-white flex justify-center items-center">
                            <FaArrowRight size={14} />
                        </span>
                    </button>
                </div> */}

            </div>
        </section>
    )
}
