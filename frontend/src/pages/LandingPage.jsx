import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
// import "../../public/landimg.png"

import { useAuthContext } from "../context/AuthContext"; // Assuming you have an auth context
import NavBar from "../components/NavBar";

const LandingPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  // Assuming this comes from your auth context

  // faq working

  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data
  const faqData = [
    {
      question: "What is GitStash?",
      answer:
        "GitStash is a GitHub profile analyzer that provides detailed insights and statistics about GitHub profiles, contributions, and followers etc.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply click the 'Get Started' button, log in with your GitHub account, and start exploring profiles right away!",
    },
    {
      question: "Is GitStash free to use?",
      answer:
        "Yes, GitStash is completely free to use for basic profile analysis.",
    },
    {
      question: "Can I analyze any GitHub profile?",
      answer:
        "Yes, you can analyze any public GitHub profile and view their statistics, basic details, and contributions.",
    },
    {
      question: "Are my id and password disclosed to the application owner by signup?",
      answer:
        "No, there is no way to disclose them by the user, authentication works different.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleGetStarted = () => {
    if (authUser) {
      navigate("/home");
    } else {
      navigate("/signup");
    }
  };

  /* <div class="relative h-full w-full bg-white"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div></div> */

  return (
    <>
      <NavBar />
      <div className=" top-0 -z-10 w-full h-full flex flex-col items-center justify-center bg-white px-5">
        <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <a
          href="https://github.com/Navneetdadhich/GitStash"
          className="cursor-pointer z-99 sm:translate-y-[45%] translate-y-[25%]"
        >
          <button className="text-black h-7 w-40 border-1 border-black rounded-full border-b-2 cursor-pointer z-99 mt-10 m-5 flex items-center justify-center gap-2 bg-white">
            Star on Github <FaArrowTrendUp />
          </button>
        </a>
        <div className="max-w-5xl text-center space-y-8 z-99 sm:translate-y-[20%] translate-y-[10%]">
          <h1 className="sm:text-7xl text-5xl font-bold bg-gradient-to-br from-slate-900 to-zinc-400 bg-clip-text text-transparent mb-4">
            Welcome to GitStash
          </h1>
          <p className="sm:text-lg text-sm text-gray-600 mb-10">
            A fancy github stats and profile analyser. It provides a seamless
            and efficient
            <br /> way to explore Github profiles with a user-friendly
            interface.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleGetStarted}
              className="w-40 text-md px-6 py-3 bg-black shadow-xl rounded-full hover:bg-gray-800 transition-colors cursor-pointer mt-5"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* mid page */}

      <div className="relative top-0 -z-10 sm:h-screen w-full py-16 bg-white ">
      <div class="absolute bottom-auto left-auto right-0 top-0 sm:h-[500px] sm:w-[500px] h-[300px] w-[300px] sm:-translate-x-[170%] -translate-x-[10%] translate-y-[30%] sm:translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[70px]"></div>


      <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-60vw z-99">
        <img 
          src="/landimg2.png" 
          alt="Landing illustration" 
          className="w-full h-auto max-w-[800px] mx-auto object-contain border-2 border-gray-300 shadow-lg rounded-2xl"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-6 ">
        <h2 className="sm:text-4xl text-3xl font-bold text-gray-800">
          Analyze GitHub Profiles
        </h2>
        <p className="sm:text-lg text-sm text-gray-600">
          Get detailed insights about any GitHub profile including contributions, repositories, and more.
        </p>
        {/* Add more content as needed */}
      </div>
    </div>
  </div>
      </div>

      

      <div className="relative top-0 -z-10 sm:h-full w-full h-screen py-4 bg-white text-black">
      <div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>


        <div className="max-w-2xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-gray-300/10 rounded-lg shadow-md backdrop-filter backdrop-blur-sm "
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <FaChevronDown
                    className={`transform transition-transform duration-200 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

         
        </div>

        <div className="bg-white text-black text-center">
        <div className="relative z-10 mb-4">
        <p className="text-center text-gray-400 text-md sm:translate-y-20">Made by <a href="https://github.com/Navneetdadhich" className="text-gray-600 font-semibold"> Navneet </a>
        </p>
        <p className="text-center text-gray-400 text-sm sm:translate-y-20">GitStash @2025
        </p>

        </div>
        <div className="relative overflow-hidden"> 
          <h1 className="text-[5rem] sm:text-[18rem] font-bold bg-gradient-to-r from-gray-50 to-black bg-clip-text text-transparent select-none transform translate-y-10 sm:translate-y-40 opacity-40 shadow-lg">GitStash</h1>
        </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
