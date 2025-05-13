import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
const App = () => {
    const is2xl = window.matchMedia("(min-width: 1536px)").matches;
    const isXL = window.matchMedia("(min-width: 1280px)").matches;
    const isLG = window.matchMedia("(min-width: 1024px)").matches;
    const isMD = window.matchMedia("(min-width: 768px)").matches;
    const isSM = window.matchMedia("(min-width: 640px)").matches;
    
    const [showContent, setShowContent] = useState(false);
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.to(".vi-mask-group", {
            rotate: 10,
            duration: 2,
            ease: "power4.easeInOut",
            transformOrigin: "50% 50%",
        }).to(".vi-mask-group", {
            scale: 10,
            duration: 2,
            delay: -1.8,
            ease: "power4.easeInOut",
            transformOrigin: "50% 50%",
            opacity: 0,
            onUpdate: function () {
                if (this.progress() >= 0.9) {
                    document.querySelector(".svg").remove();
                    setShowContent(true);
                    this.kill();
                }
            },
        });
    });

    useGSAP(() => {
        if (!showContent) return;

        gsap.to(".main", {
            scale: 1,
            rotate: 0,
            duration: 2,
            delay: "-1",
            ease: "Expo.easeInOut",
        });
        gsap.to(".sky", {
            scale: 1.1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });
        gsap.to(".bg", {
            scale: 1.1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });
        gsap.to(".character", {
            scale: is2xl ? 1 : isXL ?  .5 : 1.1,
            x: "-50%",
            bottom: is2xl? "-40%": isXL ? "-60%" : isLG ? "-50%" : isMD ? "-60%" : "-30%",
            // bottom: isXL ? "-40%" : "-60%",
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });
        gsap.to(".text", {
            scale: 1,
            rotate: 0,
            duration: 2,
            delay: "-.8",
            ease: "Expo.easeInOut",
        });

        const main = document.querySelector(".main");

        main?.addEventListener("mousemove", (e) => {
            const xMove = (e.clientX / window.innerWidth - 0.3) * 40; // -20 to 20
            gsap.to(".imagesdiv .text-wrapper", {
                x: xMove * 10,
            });
            gsap.to(".sky", {
                x: xMove * 0.4,
            });
            gsap.to(".bg", {
                x: xMove * 1.7,
            });
        });
    }, [showContent]);

    return (
        <>
            <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
                <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <mask id="viMask">
                            <rect width="100%" height="100%" fill="black" />
                            <g className="vi-mask-group">
                                <text
                                    x="50%"
                                    y="50%"
                                    fontSize= {isSM ? "50" : "250" }
                                    textAnchor="middle"
                                    fill="white"
                                    dominantBaseline="middle"
                                    fontFamily="Arial Black"
                                >
                                    VI
                                </text>
                            </g>
                        </mask>
                    </defs>
                    <image
                        href="./bg.png"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid slice"
                        mask="url(#viMask)"
                    />
                </svg>
            </div>
            {showContent && (
                <div className="main w-full rotate-[-10deg] scale-[1.7]">
                    <div className="landing overflow-x-hidden relative w-full h-screen bg-black ">
                        <div className="Navbar absolute top-0 left-0 w-full z-[10] py-10 lg:px-10 px-5  ">
                            <div className="logo flex gap-7">
                                <div className="lines flex flex-col gap-2">
                                    <div className="line1 w-13 h-1 bg-white "></div>
                                    <div className="line2 w-8 h-1 bg-white "></div>
                                    <div className="line3 w-5 h-1 bg-white "></div>
                                </div>
                                <h3 className="text-3xl -mt-2 leading-none text-white">
                                    Rockstar
                                </h3>
                            </div>
                        </div>

                        <div className="imagesdiv w-full h-screen  relative overflow-hidden ">
                            <img
                                className="sky absolute scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                                src="./sky.png"
                                alt=""
                            />
                            <img
                                className="bg absolute scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover "
                                src="./bg.png"
                                alt=""
                            />
                            <div className="text-wrapper absolute top-1/4 lg:top-12 left-1/2 -translate-x-1/2 ">
                                <div className="text text-white flex flex-col gap-1 scale-[1.2] rotate-[-10deg]">
                                    <h1 className="text-6xl md:text-[8rem] leading-none -ml-10  lg:-ml-20">
                                        grand
                                    </h1>
                                    <h1 className="text-6xl md:text-[8rem] leading-none  ml-10 lg:ml-35">
                                        theft
                                    </h1>
                                    <h1 className="text-6xl md:text-[8rem] leading-none  -ml-10 lg:-ml-20">
                                        auto
                                    </h1>
                                </div>
                            </div>
                            <img
                                className="character scale-[1.2] rotate-[-20deg] absolute    -bottom-[170%] left-1/2 -translate-x-1/2   "
                                src="./girlbg.png"
                                alt=""
                            />
                        </div>
                        <div className="btmbar text-white absolute bottom-0 left-0 w-full py-5 px-5  lg:py-10 lg:px-10 bg-gradient-to-t from-black to-transparent">
                            <div className="flex lg:gap-4 gap-2 -ml-2 items-center ">
                                <i className="text-2xl ri-arrow-down-line"></i>
                                <h3 className="tet-lg font-[Helvetica_Now_Display]">
                                    Scroll Down
                                </h3>
                            </div>
                            <img
                                className="lg:h-[65px] h-[45px] absolute top-1 lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                src="./ps5.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className=" w-full h-auto lg:h-screen flex  items-center justify-center bg-black">
                        <div className="cntr w-full h-full lg:h-[80%] flex flex-col lg:flex-row  text-white">
                            <div className="limg h-[50%] lg:h-full w-full lg:w-1/2 relative mt-10 ">
                                <img
                                    className="lg:absolute lg:h-full lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                                    src="./imag.png"
                                    alt=""
                                />
                            </div>
                            <div className="rg w-full lg:w-[30%] py-5 px-5 lg:px-0">
                                <h1 className="text-6xl">Still Running</h1>
                                <h1 className="text-6xl">Not hunting</h1>
                                <p className="mt-10 text-md font-[Helvetica_Now_Display]">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Aut recusandae, vel,
                                    exercitationem veniam cumque neque vero at
                                    eligendi amet est nobis. Blanditiis,
                                    doloremque!
                                </p>
                                <p className="mt-3 text-md font-[Helvetica_Now_Display]">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Unde impedit reiciendis
                                    molestias doloremque?Lorem ipsum dolor sit
                                    amet consectetur adipisicing elit. Nam,
                                    commodi!
                                </p>
                                <p className="mt-3 text-md font-[Helvetica_Now_Display]">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Voluptas fugiat, facere
                                    deleniti ipsum neque ducimus dolorum? Nisi
                                    tempore ex officiis fuga ratione similique
                                    suscipit neque quibusdam!
                                </p>
                                <button className="bg-yellow-500 px-5 py-5 text-3xl text-black mt-10 cursor-pointer">
                                    {" "}
                                    Download Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
