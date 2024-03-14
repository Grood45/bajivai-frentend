import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { RiMenu2Fill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { FaHome, FaInstagram } from "react-icons/fa";
import { GiCard10Hearts } from "react-icons/gi";
import { MdSportsEsports } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { GiDiamondTrophy } from "react-icons/gi";
import { MdLibraryBooks } from "react-icons/md";
import { MdCasino } from "react-icons/md";
import { useRouter } from "next/navigation";
import { GiSloth } from "react-icons/gi";
import { AiOutlineTable } from "react-icons/ai";
import { MdSportsCricket } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { GiCardJackSpades } from "react-icons/gi";
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { BsWhatsapp } from "react-icons/bs";
import { ImFire } from "react-icons/im";

import { CiFacebook } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { manageSideBar_Fn } from "@/app/redux-arch/fetures/nav-slice";
import { AppDispatch, useAppSelector } from "@/app/redux-arch/store";
import { useDispatch } from "react-redux";
function MobileSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const btnRef: any = useRef();
  const dispatch = useDispatch<AppDispatch>();
  const { showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
  const sidebardata = [
    {
      id: 1,
      title: "Home",
      img: <FaHome fontSize="25px" />,
      route: "/home",
      type: 1,
    },
    {
      id: 2,
      title: "Casino",
      img: <GiCard10Hearts fontSize="25px" />,
      route: "",
      type: 2,
    },
    {
      id: 3,
      title: "Sport",
      img: <MdSportsEsports fontSize="25px" />,
      route: "",
      type: 3,
    },
    {
      id: 4,
      title: "Promotion",
      img: <GiDiamondTrophy fontSize="25px" />,
      route: "/promotion",
    },
    {
      id: 5,
      title: "Refer & Earn",
      img: <FaUsers fontSize="25px" />,
      route: "refer&earn",
    },
  ];

  const sport = [
    {
      id: 1,
      title: "Cricket",
      icon: <MdSportsCricket fontSize="25px" />,
      route: "",
      type: 1,
    },
    {
      id: 2,
      title: "Live Casino",
      icon: <GiCardJackSpades fontSize="25px" />,
      route: "",
      type: 2,
    },

    {
      id: 3,
      title: "Sports Book",
      icon: <IoIosFootball fontSize="25px" />,
      route: "",
      type: 3,
    },
    {
      id: 3,
      title: "Slots Game",
      icon: <GiSloth fontSize="25px" />,
      route: "",
      type: 5,
    },
    {
      id: 3,
      title: "Table Game",
      icon: <AiOutlineTable fontSize="25px" />,
      route: "",
      type: 4,
    },
    {
      id: 3,
      title: "Hot Game",
      icon: <ImFire fontSize="25px" />,
      route: "",
      type: 6,
    },
  ];
  const others = [
    {
      id: 1,
      title: "Language",
      icon: <MdOutlineLanguage fontSize="25px" />,
      route: "",
      type:""
    },
    {
      id: 2,
      title: "FAQ",
      icon: <FaQuestionCircle fontSize="25px" />,
      route: "",
      type:""
    },

    {
      id: 3,
      title: "Live Chat",
      icon: <IoChatboxEllipsesSharp fontSize="25px" />,
      route: "",
      type:""
    },
  ];

  const media = [
    {
      id: 1,
      icon: <BsWhatsapp fontSize="25px" />,
    },
    {
      id: 2,
      icon: <CiFacebook fontSize="30px" />,
    },
    {
      id: 3,
      icon: <FaInstagram fontSize="25px" />,
    },
  ];
  const handleNavigate = (route: any, type: any) => {
    if (type == 1) {
      router.push(route);
      dispatch(manageSideBar_Fn({ type: "changeType", value: type }));
    }
    if (route == "") {
      dispatch(manageSideBar_Fn({ type: "changeType", value: type }));
    }
    router.push(route);

    onClose();
  };
  return (
    <>
      <RiMenu2Fill ref={btnRef} fontSize="25px" onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="bg-[#212632]">
          <RiMenu3Fill
            onClick={onClose}
            fontSize="25px"
            color="white"
            className="absolute top-5 right-4"
          />
          <DrawerHeader className="text-white">
            <img
              className=" w-[100px]  "
              src={
                "https://i.ibb.co/8zdgQ5R/Screenshot-2024-02-05-at-12-24-54-AM-removebg-preview.png"
              }
            />
          </DrawerHeader>
          <div className="w-[100%] h-[1px] bg-gray-400"></div>
          <DrawerBody>
            <div className="flex flex-col mt-4    ">
              {sidebardata?.map((item) => {
                return (
                  <div
                    onClick={() => handleNavigate(item.route, item.type)}
                    key={item.id}
                    className="flex hover:bg-gray-600 p-2 pl-4 rounded-lg hover:text-white text-[#fff] font-bold text-sm items-center gap-6"
                  >
                    <span className="text-[#E9AB0F]">{item.img}</span>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-[100%] h-[1px] mt-4 bg-gray-400"></div>
            <p className="text-gray-300 mt-4  text-[15px] font-bold">Games</p>
            <div className="flex flex-col  mt-1  ">
              {sport?.map((item) => {
                return (
                  <div
                    onClick={() => handleNavigate(item.route, item.type)}
                    key={item.id}
                    className="flex hover:bg-gray-600 p-2 pl-4 rounded-lg hover:text-white text-[#fff] font-bold text-sm items-center gap-6"
                  >
                    <span className="text-[#E9AB0F]">{item.icon}</span>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-[100%] h-[1px] mt-4 bg-gray-400"></div>
            <p className="text-gray-300 mt-4  text-[15px] font-bold">Others</p>
            <div className="flex flex-col  mt-1  ">
              {others?.map((item) => {
                return (
                  <div
                  onClick={() => handleNavigate(item.route, item.type)}
                    key={item.id}
                    className="flex hover:bg-gray-600 p-2 pl-4 rounded-lg hover:text-white text-[#fff] font-bold text-sm items-center gap-6"
                  >
                    <span className="text-[#E9AB0F]">{item.icon}</span>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>

            <div className="w-[100%] h-[1px] mt-4 bg-gray-400"></div>
            <p className="text-gray-300 mt-4  text-[15px] font-bold">Social</p>
            <div className="flex  gap-1 mt-1  ">
              {media?.map((item) => {
                return (
                  <Link
                    href=""
                    key={item.id}
                    className="flex hover:bg-gray-600 p-2 pl-4 rounded-lg hover:text-white text-[#fff] font-bold text-sm items-center gap-6"
                  >
                    <span className="text-white">{item.icon}</span>
                  </Link>
                );
              })}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default MobileSidebar;
