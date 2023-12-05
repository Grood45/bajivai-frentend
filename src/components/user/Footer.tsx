"use client";

import React, { useEffect, useState } from "react";
import googlepay from "../../assetuser/other/Google_Pay_Logo_(2020).svg.png";
import phonepay from "../../assetuser/other/PhonePe_Logo.svg.png";
import upi from "../../assetuser/other/upi.png";
import paytm from "../../assetuser/other/Paytm_logo.jpg";
import Image from "next/image";
import linense1 from "../../assetuser/payment/license1.png";
import linense2 from "../../assetuser/payment/license2.png";
import linense3 from "../../assetuser/payment/license3.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { useAppSelector } from "@/app/redux-arch/store";
import themeChange from "@/theme";
import { SiPhonepe } from "react-icons/si";
import { LogoAndFav } from "../../../utils/typescript.module";
import { fetchGetRequest } from "@/api/api";
import { useToast } from "@chakra-ui/react";
const Footer = () => {
  const { showSideBar2, showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  const [logoAndFav, setLogoAndFav] = useState<LogoAndFav>();
  const toast = useToast();
  const handleGetLogoAndFav = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logofav/get-logo-fav/6532c132ed5efb8183a66703`
      );
      setLogoAndFav(response.data);
    } catch (error: any) {
      toast({
        title: error.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleGetLogoAndFav();
  }, []);

  return (
    <div
      className={`w-[100%] p-4 flex flex-col justify-between gap-2 ${
        theme
          ? `text-[${themeChange.light.textColor1}]`
          : `text-[${themeChange.dark.textColor1}]`
      }  ${
        theme ? `bg-[${themeChange.light.bg1}]` : `bg-[${themeChange.dark.bg1}]`
      } shadow-2xl rounded-[12px]`}
    >
      <div className="w-[100%] p-4 flex justify-between gap-10 rounded-[12px] ">
        <div className="w-[100%]  flex flex-col gap-2">
          <div className="hidden  lg:contents">
            <div className=" border-none">
              <img
                className=" w-[170px] "
                src={logoAndFav?.logo}
              />
            </div>
          </div>
          <div className="text-sm ">
            <span className="text-[15px] font-bold"> bajilive</span> is the best
            platform for live and uninterrupted online betting for sports, Live
            24hr betting with a wide spectrum of sports such as Cricket, Soccer,
            Horse Racing, Kabaddi,{" "}
            <span className="text-[15px] font-bold">Aviator Predictor</span>,
            Hockey, Basketball,{" "}
            <span className="text-[15px] font-bold">Andar Bahar Game</span> and
            many more.{" "}
            <span className="text-[15px] font-bold"> webiste name</span> is a
            resourceful online betting provider with competitive odds on in -
            play and upcoming matches. Popular casino games like Blackjack,
            Poker or READ MORE
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-evenly gap-2">
          <div className="flex gap-[6px] flex-col">
            <p className="text-sm text-yellow-600 ">
              Accepted Modes Of Payments
            </p>
            <div className="flex gap-3 w-[100%]  ">
              <Image
                src={phonepay}
                className="w-[80px] cursor-pointer h-[20px]"
                alt=""
              />
              <Image
                src={googlepay}
                className="w-[80px] cursor-pointer h-[20px]"
                alt=""
              />
              <Image
                src={paytm}
                className="w-[80px] cursor-pointer rounded-lg h-[20px]"
                alt=""
              />
              <Image
                src={upi}
                className="w-[80px] cursor-pointer h-[20px]"
                alt=""
              />
            </div>
          </div>
          <div className=" w-[100%] flex justify-between">
            <div className="flex gap-[6px] w-[100%] flex-col">
              <p className="text-sm text-yellow-600 ">License</p>
              <div className="flex gap-2 ">
                <Image src={linense1} alt="" />
                <Image src={linense2} alt="" />
                <Image src={linense3} alt="" />
              </div>
            </div>
            <div className="flex gap-[6px] w-[100%] flex-col">
              <p className="text-sm text-yellow-600 ">Contact US</p>
              <div className="flex items-center gap-2 ">
                <FcGoogle fontSize="40px" />
                <FaFacebook fontSize="35px" />
                <RiWhatsappFill color="green.400" fontSize="40px" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-400">
        © Copyright 2010 - 2023 BajiLive
      </p>
    </div>
  );
};

export default Footer;
