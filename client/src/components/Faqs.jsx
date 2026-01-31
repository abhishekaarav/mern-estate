import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I list my property on PrimeSpace?",
      answer:
        "Listing your property is easy! Simply create an account, click on 'Create Listing', fill in the property details, upload high-quality images, and set your price. Our team reviews each listing to ensure quality and accuracy before it goes live.",
    },
    {
      question: "Are there any fees for buyers or renters?",
      answer:
        "No, browsing and contacting property owners is completely free for buyers and renters. We only charge a small commission to property sellers when a successful transaction is completed through our platform.",
    },
    {
      question: "How can I contact a property owner?",
      answer:
        "Once you find a property you're interested in, click on 'Contact Landlord' or 'Contact Owner' button on the listing page. You'll be able to send a direct message to the property owner. Make sure you're logged in to use this feature.",
    },
    {
      question: "What makes PrimeSpace different from other platforms?",
      answer:
        "PrimeSpace offers a curated selection of verified properties, transparent pricing with no hidden fees, 24/7 customer support, and an easy-to-use interface. We also provide detailed property information, virtual tours, and a secure messaging system.",
    },
    {
      question: "Can I schedule property viewings through the platform?",
      answer:
        "Yes! After contacting the property owner through our messaging system, you can coordinate viewing schedules directly. Some premium listings also offer virtual tour options that you can access anytime.",
    },
    {
      question: "How are property prices determined?",
      answer:
        "Property owners set their own prices based on market value, location, amenities, and property condition. We provide market insights and comparable listings to help both buyers and sellers make informed decisions about pricing.",
    },
    {
      question: "Is my personal information secure on PrimeSpace?",
      answer:
        "Absolutely! We use industry-standard encryption and security measures to protect your personal information. Your contact details are only shared when you choose to contact a property owner, and we never sell your data to third parties.",
    },
    {
      question: "What should I do if I encounter a problem with a listing?",
      answer:
        "If you notice any issues with a listing, such as incorrect information or suspicious activity, please use the 'Report' button on the listing page or contact our support team at support@primespace.com. We investigate all reports promptly.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2942] w-14 h-14 rounded-xl flex items-center justify-center shadow-xl">
              <FaQuestionCircle className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Find answers to common questions about buying, selling, and renting
            properties on PrimeSpace
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border-2 border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 group"
              >
                <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1e3a5f] transition-colors pr-4">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-[#1e3a5f] text-lg flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer Content */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 sm:px-8 pb-5 sm:pb-6 pt-0">
                  <div className="border-t-2 border-slate-100 pt-4">
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-br from-[#1e3a5f] to-[#0f2942] rounded-2xl p-8 sm:p-10 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Still Have Questions?
            </h3>
            <p className="text-slate-200 text-base sm:text-lg mb-6">
              Our support team is here to help you 24/7
            </p>
            <a
              href="mailto:support@primespace.com"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#1e3a5f] px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
