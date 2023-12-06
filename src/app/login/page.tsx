"use client";
import Carousel from "@/components/user/Carousel";
import RightSidebar from "@/components/user/RightSidebar";
import SidebarNavbar from "@/components/user/SidebarNavbar";
import TopNavbar from "@/components/user/TopNavbar";
import { AppDispatch, useAppSelector } from "../redux-arch/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { manageSideBar_Fn } from "../redux-arch/fetures/nav-slice";
import Image from "next/image";
import announcement from "../../assetuser/other/giphy 2.png";
import cricket from "../../assetuser/other/cricket.png";
import football from "../../assetuser/other/football.png";
import tennis from "../../assetuser/other/tennis.png";

import teams from "../../assetuser/other/team.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import sportbar from "../../assetuser/other/10068 1.png";
import trust from "../../assetuser/other/trustglobal.png";
import value from "../../assetuser/other/value.png";
import fair from "../../assetuser/other/fair.png";
import deposit from "../../assetuser/other/deposit.png";
import Link from "next/link";
import BottomNavbar from "@/components/user/BottomNavbar";
import CricketData from "@/components/user/subcomponent/CricketData";
import SoccerData from "@/components/user/subcomponent/SoccerData";
import TennisData from "@/components/user/subcomponent/TennisData";
import { LogoAndFav, Match } from "../../../utils/typescript.module";
import { fetchGetRequest } from "@/api/api";
import { getUserCookie } from "../redux-arch/userauth/auth.slice";
import { useToast } from "@chakra-ui/react";
import Footer from "@/components/user/Footer";
import themeChange from "@/theme";
import HCarousel from "../home/HCarousel";
import announ from '../../assetuser/other/dazzle-loudspeaker.gif'
import ModalComponent from "@/components/user/subcomponent/LoginModal";
const MainComponent = () => {
  const [active, setCategoryActive] = useState<number>(1);
  const [matchFilter, setMatchFilter] = useState<String>("all");
  const [gameType, setGameType] = useState<String>("");
  const [allMatch, setAllMatch] = useState<Match[]>();

  const dispatch = useDispatch<AppDispatch>();

  const getData = async () => {
    return await fetchGetRequest(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-all-match`
    );
  };

  const category = [
    {
      id: 1,
      title: "Inplay",
    },
    {
      id: 2,
      title: "Upcoming",
    },
    {
      id: 3,
      title: "Today",
    },
    {
      id: 4,
      title: "Tomarrow",
    },
  ];
  useEffect(() => {
    getData()
      .then((res) => {
        setAllMatch(res.data.data);
      })
      .catch((error) => {});
  }, []);

  const cricketData = allMatch && allMatch.filter((elm) => elm.sport_id == "4");
  const tennisData = allMatch && allMatch.filter((elm) => elm.sport_id == "2");
  const soccerData = allMatch && allMatch.filter((elm) => elm.sport_id == "1");

  const handleFilter = (category: string, id: number) => {
    setMatchFilter(category);
    setCategoryActive(id);
  };

  const sportdata = [
    {
      id: 1,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 2,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 3,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 4,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 5,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
    {
      id: 6,
      title: "One Day Internationl",
      data: "16/11/2024",
      time: "9:12",
      teamA: "South Africa",
      teamB: "India",
    },
  ];
  const sportbardata = [
    {
      id: 1,
      img: sportbar,
    },
    {
      id: 2,
      img: sportbar,
    },
    {
      id: 3,
      img: sportbar,
    },
    {
      id: 4,
      img: sportbar,
    },
    {
      id: 5,
      img: sportbar,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;
  const totalCards = sportdata.length;

  // const handleNextClick = () => {
  //   if (currentIndex + 1 < totalCards) {
  //     setCurrentIndex(currentIndex + 1);
  //   }
  // };

  // const handlePrevClick = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   }
  // };

  const toast = useToast();
  const [logoAndFav, setLogoAndFav] = useState<LogoAndFav>();
  const handleGetLogoAndFav = async () => {
    try {
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logofav/get-logo-fav/6532c132ed5efb8183a66703`
      );
      setLogoAndFav(response.data);
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    handleGetLogoAndFav();
  }, []);

  const { showSideBar1,theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <div className={` ${theme ?`text-[${themeChange.light.textColor1}]` : `text-[${themeChange.dark.textColor1}]`}  ${theme ?`bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`}`}>
      <div className="w-[100%]">
        <div className="sticky top-0 w-[100%] z-[1000]">
          <TopNavbar value={3} />
        </div>
        <div className="flex justify-between w-[100%]   px-2 py-5 lg:px-6">
          <div className="hidden lg:contents">
            <section className=" ">
              <SidebarNavbar identity={1} value={3} />
            </section>
          </div>

          {showSideBar1 && (
            <div className="contents lg:hidden">
              <div className=" fixed top-[64px]  left-0 z-[1000]  ">
                <SidebarNavbar identity={2} value={3} />
              </div>
            </div>
          )}

      <div>
       <ModalComponent/>
      </div>

          <div className="hidden lg:contents">
            <div className="   w-[20%]  ">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
