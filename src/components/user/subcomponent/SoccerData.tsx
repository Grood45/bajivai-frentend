"use client";
import React, { useEffect, useState } from "react";

import football from "../../../assetuser/other/football.png";
import teams from "../../../assetuser/other/team.png";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { Match } from "../../../../utils/typescript.module";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { IoIosFootball } from "react-icons/io";
import soccer from "../../../assetuser/other/Soccer_ball.svg.png";
import getTeamShortName from "../../../../utils/getTeamShortName";
import { useAppSelector } from "@/app/redux-arch/store";
interface SoccerDataProps {
  soccerData: Match[] | undefined;
}

interface Odds {
  sid: number;
  psid: number;
  odds: number;
  otype: string;
  oname: string;
  tno: number;
  size: number;
}

interface Section {
  sid: number;
  sno: number;
  gstatus: string;
  gscode: number;
  nat: string;
  odds: Odds[];
}

interface GameData {
  gmid: number;
  ename: string;
  etid: number;
  cid: number;
  cname: string;
  iplay: boolean;
  stime: string;
  tv: boolean;
  bm: boolean;
  f: boolean;
  f1: boolean;
  oid: number;
  iscc: number;
  mid: number;
  mname: string;
  status: string;
  rc: number;
  gscode: number;
  m: number;
  gtype: string;
  section: Section[];
}

const SoccerData = ({
  setgameCounts,
  matchFilter,
}: {
  setgameCounts?: any;
  matchFilter?: any;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagnation, setPagination] = useState({});
  const [data, setData] = useState<String[]>([]);
  const [matchData, setMatchData] = useState<GameData[]>([]);
  const [seeAll, setSeeAll] = useState<Boolean>(false);
  const [isRunningMatchId, setIsRunningMatchId] = useState<String>("");
  const [isRunningTeamName, setIsRunningTeamName] = useState<String>("");
  const [limit, setLimit] = useState(false);
  const toast = useToast();

  const FetchData = async () => {
    try {
      // user id then match_id we have to pass here
      const response = await fetchGetRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/get-soccer-match?page=${currentPage}&limit=100000000`
      );
      const data = response.data;
      setData(data);
      console.log(data,"soccer")

      setPagination(response.pagination);
    } catch (error: any) {
      toast({
        description: error || "d",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    socket.on("connect", () => {
    });

    socket.on("Data", (data) => {
      if (data) {
        setMatchData(data?.t1 || []);
      }
    });

    socket.on("disconnect", () => {
    });
    socket.emit("startDataFetching", 1);

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    FetchData();
  }, [currentPage]);

  const handleNextClick = () => {
    setCurrentPage((pre) => pre + 1);
  };
  const handlePrevClick = () => {
    setCurrentPage((pre) => pre - 1);
  };


const finalData:any=[]

  useEffect(() => {
    const finaldata = matchData &&
    matchData.length > 0 &&
    matchData.map((item: any) => {
      let matchItem: any = data.find(
        (ele: any) => ele.match_id == item.gmid
      );
      if(matchItem!==undefined){
        finalData.push(matchItem)

      }
    });
  
    console.log(finalData,"finalData")
    const countMatches = matchData.reduce((count, item:any) => {
      const matchItem = data.find((ele:any) => ele.match_id == item.gmid && item.iplay === true);
      if (matchItem !== undefined) {
        count++;
      }
      return count;
    }, 0);
 
      let upcommingCount = finalData?.length-countMatches;
      setgameCounts((prev: any) => {
        return {
          ...prev,
          soccerLiveCount: countMatches,
          soccerUpcomingCount: upcommingCount,
          // Update other counts accordingly
        };
      });

    console.log(matchData,"matchdata")

    
  }, [matchData]);


  let newData =
    matchFilter === "Inplay"
      ?matchData.length>0&& matchData?.filter((item: any) => item.iplay === true)
      : matchFilter === "Upcoming"
      ?matchData.length>0&& matchData?.filter((item: any) => item.iplay === false)
      : matchData;

  const [isRunning, setIsRunning] = useState(false);
  const handleMouseOver = (team: String, match_id: String) => {
    setIsRunning(true);
    setIsRunningMatchId(match_id);
    setIsRunningTeamName(team);
  };
  const handleMouseOut = () => {
    setIsRunning(false);
    setIsRunningMatchId("");
    setIsRunningTeamName("");
  };

  const { showSideBar2, showSideBar1, theme } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );

  return (
    <div>
      <div className="w-[100%]">
        {/* football card map  */}

        {matchFilter == "Soccer" ? (
          <>
            <div className="flex px-2 md:px-0 justify-between">
              <div className="flex items-center gap-2">
                <Image src={soccer} alt="" className="w-[30px] h-[30px]" />
                <p
                  className={`text-md font-semibold ${
                    theme ? "text-black" : "text-white"
                  }`}
                >
                  Soccer
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[5px] p-[1px] flex gap-3">
                <button
                  onClick={() => setLimit(!limit)}
                  style={{ border: "1px solid rgba(68, 68, 68, 0.86)" }}
                  className="bg-[#212632] text-white p-1 md:p-[6px] text-[10px] md:text-xs font-medium rounded-[5px]"
                >
                  {limit ? "See all" : "Hide"}
                </button>
              </div>
            </div>
            <div
              className={` m-auto w-[100%]
                 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3
            sm:w-[100wh] mt-[16px]  `}
            >
              {matchData.length>0 &&
                matchData.slice(0, limit ? 9 : 100).map((item: any) => {
                  let matchItem = data.find(
                    (ele: any) => ele.match_id == item.gmid
                  );
                  let team1 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[0]
                      : item.ename.split("-")[0];
                  let team2 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[1]
                      : item.ename.split("-")[1];
                  return (
                    <>
                      {/* {data.includes(item.gmid as any) && ( */}
                      {matchItem && (
                        <Link key={item.id} href={`/sports/${item.gmid}/1`}>
                          <div
                            className={`bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] w-[100%]  
                           rounded-[10px] md:rounded-[16px] `}
                          >
                            <div
                              style={{ border: "0.5px solid #444" }}
                              className="flex flex-col gap-7 p-2 md:p-3 w-[100%] min-h-[260px] justify-between  rounded-[10px] md:rounded-[16px] bg-[#212632]"
                            >
                              <div className="flex flex-col w-[100%]  gap-3">
                                <div className="flex justify-between w-[100%]  ">
                                  <div className="flex items-center w-[85%] gap-4  sm:gap-4">
                                    {item.iplay === true ? (
                                      <button className="px-2 text-[8px] md:text-[10px] rounded-[4px] p-[2px] bg-red-600">
                                        Live
                                      </button>
                                    ) : (
                                      <button className="px-2 text-[8px] md:text-[10px] rounded-[4px] p-[2px] bg-green-600">
                                        UpComing
                                      </button>
                                    )}

                                    <div className="marquee-container  w-[80px] text-center">
                                      <p
                                        className={`marquee-text  text-xs w-[60px]  ${
                                          isRunning &&
                                          isRunningTeamName == item.cname &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(item.cname, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {item.cname}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[1px] rounded-[50%] ">
                                    <Image
                                      src={teams}
                                      alt="teams"
                                      className="h-[100%] rounded-[50%] w-[100%]"
                                    />
                                  </span>
                                </div>

                                <div className="flex justify-between mt-4  gap-4 sm:gap-2 ">
                                  <div className="w-[100%] flex  justify-between items-center   ">
                                    <div className="flex flex-col items-center gap-1">
                                      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[2px] rounded-[50%] ">
                                        <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                          {getTeamShortName(team1)}
                                        </p>
                                      </span>
                                      <div className="marquee-container">
                                        <p
                                          className={`marquee-text text-center  text-xs w-[80px] ${
                                            isRunning &&
                                            isRunningTeamName == team1 &&
                                            item.gmid == isRunningMatchId
                                              ? "running"
                                              : ""
                                          }`}
                                          onMouseOver={() =>
                                            handleMouseOver(team1, item.gmid)
                                          }
                                          onMouseOut={() => handleMouseOut()}
                                        >
                                          {team1}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="w-[30%] flex items-center justify-center -mt-2">
                                      <svg
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 14 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <line
                                          y1="-0.5"
                                          x2="16.5642"
                                          y2="-0.5"
                                          transform="matrix(0.790995 -0.611822 0.605038 0.796197 0.897827 11.9054)"
                                          stroke="white"
                                        />
                                        <path
                                          d="M13.3449 6.45271C13.3449 9.46415 10.5585 11.9054 7.12136 11.9054C3.6842 11.9054 0.897827 9.46415 0.897827 6.45271C0.897827 3.44126 3.6842 1 7.12136 1C10.5585 1 13.3449 3.44126 13.3449 6.45271Z"
                                          fill="#DCA029"
                                        />
                                        <path
                                          d="M13.3449 6.45271C13.3449 9.46415 10.5585 11.9054 7.12136 11.9054C3.6842 11.9054 0.897827 9.46415 0.897827 6.45271C0.897827 3.44126 3.6842 1 7.12136 1C10.5585 1 13.3449 3.44126 13.3449 6.45271Z"
                                          stroke="black"
                                        />
                                        <path
                                          d="M3.59291 5.79447L5.15817 8.33505L5.19417 8.32534L5.45462 5.29223L6.15405 5.10355L5.74411 8.97834L4.95897 9.19015L2.89519 5.9827L3.59291 5.79447ZM7.65338 4.52262L7.51302 9.06724L6.9696 9.21384L7.10996 4.66922L7.65338 4.52262ZM10.2512 5.03305C10.1999 4.88637 10.105 4.78699 9.96643 4.73491C9.82905 4.68253 9.66607 4.68177 9.4775 4.73264C9.34492 4.7684 9.23593 4.81925 9.1505 4.88519C9.06507 4.95112 9.0053 5.02544 8.97118 5.10817C8.93707 5.19089 8.92981 5.27678 8.94941 5.36585C8.96666 5.43961 8.99819 5.49912 9.04399 5.54435C9.09094 5.58927 9.14801 5.62289 9.21519 5.6452C9.28209 5.66637 9.35394 5.68007 9.43073 5.68631C9.50751 5.69255 9.58392 5.69461 9.65997 5.69247L10.0085 5.68667C10.1484 5.68203 10.2856 5.68972 10.4203 5.70975C10.5561 5.72948 10.682 5.76658 10.798 5.82106C10.9152 5.87522 11.0157 5.95166 11.0995 6.05035C11.1833 6.14905 11.2431 6.27505 11.279 6.42835C11.3275 6.63582 11.3176 6.8327 11.2494 7.01897C11.1809 7.20409 11.0576 7.36785 10.8795 7.51025C10.7022 7.65119 10.4731 7.75958 10.1919 7.83543C9.91877 7.90911 9.67166 7.93044 9.45058 7.89941C9.23064 7.86807 9.04497 7.78582 8.89356 7.65267C8.7433 7.51921 8.63611 7.33614 8.572 7.10347L9.19771 6.93467C9.23569 7.05554 9.29738 7.14795 9.3828 7.2119C9.46822 7.27586 9.56878 7.31367 9.6845 7.32534C9.80136 7.3367 9.92608 7.3245 10.0586 7.28874C10.1969 7.25143 10.3132 7.198 10.4075 7.12845C10.5027 7.05744 10.5712 6.97646 10.6132 6.8855C10.6548 6.7934 10.6643 6.69647 10.6418 6.59473C10.6191 6.50283 10.5744 6.434 10.5078 6.38825C10.441 6.34134 10.3554 6.31051 10.2511 6.29576C10.1477 6.27955 10.0294 6.27226 9.89612 6.2739L9.47244 6.27792C9.16578 6.281 8.91067 6.22913 8.7071 6.1223C8.50441 6.01401 8.37342 5.83308 8.31414 5.5795C8.26537 5.37087 8.27866 5.17307 8.35401 4.9861C8.43051 4.79882 8.5558 4.63575 8.72987 4.49689C8.90368 4.35687 9.11344 4.25372 9.35915 4.18744C9.6083 4.12023 9.83682 4.10514 10.0447 4.14218C10.2535 4.17775 10.4297 4.25828 10.5732 4.38375C10.7165 4.50807 10.8131 4.66947 10.8632 4.86795L10.2512 5.03305Z"
                                          fill="white"
                                        />
                                      </svg>
                                    </div>

                                    <div className="flex flex-col mt-1 items-center gap-1">
                                      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[2px] rounded-[50%] ">
                                        <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                          {getTeamShortName(team2)}
                                        </p>
                                      </span>
                                      <div className="marquee-container">
                                        <p
                                          className={`marquee-text text-center text-xs w-[80px] ${
                                            isRunning &&
                                            isRunningTeamName == team2 &&
                                            item.gmid == isRunningMatchId
                                              ? "running"
                                              : ""
                                          }`}
                                          onMouseOver={() =>
                                            handleMouseOver(team2, item.gmid)
                                          }
                                          onMouseOut={() => handleMouseOut()}
                                        >
                                          {team2}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex text-white justify-between text-[9px] w-[90%] m-auto sm:w-[100%]">
                                <div className="flex  gap-2">
                                  <button className="px-2 p-1 bg-[#0096FF] w-[50px] rounded-[6px]">
                                    {item.section[1].odds[0].odds}
                                  </button>
                                  <button className="px-2 p-1 bg-[#FF6A8A] w-[50px] rounded-[6px]">
                                    {item.section[1].odds[1].odds}
                                  </button>
                                </div>
                                <div className="flex  gap-2">
                                  <button className="px-2 p-1 bg-[#0096FF] w-[50px] rounded-[6px]">
                                    {item.section[2].odds[1].odds}
                                  </button>
                                  <button className="px-2 p-1 bg-[#FF6A8A] w-[50px] rounded-[6px]">
                                    {item.section[2].odds[0].odds}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <button className="w-[100%] flex justify-center gap-1 items-center text-[10px] md:text-xs p-2 bg-[#DCA029] rounded-[10px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="19"
                                    viewBox="0 0 18 19"
                                    fill="none"
                                  >
                                    <path
                                      d="M1.73584 6.51318V13.2438L8.29834 17.1089V10.4097L1.73584 6.51318Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M9.39209 17.1089L15.9546 13.2438V6.51318L9.39209 10.4097V17.1089Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M15.4077 5.625L8.84521 1.79688L2.28271 5.625L8.84521 9.45312L15.4077 5.625Z"
                                      fill="white"
                                    />
                                  </svg>{" "}
                                  <span>Place Bet</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <div className="flex px-2 md:px-0 justify-between">
              <div className="flex items-center gap-2">
                <Image src={soccer} alt="" className="w-[30px] h-[30px]" />
                <p
                  className={`text-md font-semibold ${
                    theme ? "text-black" : "text-white"
                  }`}
                >
                  Soccer
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-[5px] p-[1px] flex gap-3">
                <button
                  onClick={() => setSeeAll(!seeAll)}
                  style={{ border: "1px solid rgba(68, 68, 68, 0.86)" }}
                  className="bg-[#212632] text-white  p-1 md:p-[6px] text-[10px] md:text-xs font-medium rounded-[5px]"
                >
                  {!seeAll ? "See all" : "Hide"}
                </button>
              </div>
            </div>
            <div
              className={` m-auto w-[100%]  ${
                !seeAll
                  ? "sm:overflow-scroll"
                  : "grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              }  sm:w-[100wh] mt-[16px] flex flex-col sm:flex-row gap-2 `}
            >
              {newData &&
                newData.map((item: any) => {
                  let matchItem = data.find(
                    (ele: any) => ele.match_id == item.gmid
                  );

                  let team1 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[0]
                      : item.ename.split("-")[0];
                  let team2 =
                    item.ename.split("v").length > 1
                      ? item.ename.split("v")[1]
                      : item.ename.split("-")[1];
                  return (
                    <>
                      {/* {data.includes(item.gmid as any) && ( */}
                      {matchItem && (
                        <Link key={item.id} href={`/sports/${item.gmid}/1`}>
                          <div
                            className={`bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] w-[100%]  ${
                              !seeAll ? "lg:w-[270px]" : "w-[100%] "
                            } rounded-[10px] md:rounded-[16px] `}
                          >
                            <div
                              style={{ border: "0.5px solid #444" }}
                              className="flex flex-col gap-7 p-2 md:p-3 w-[100%] min-h-[260px] justify-between  rounded-[10px] md:rounded-[16px] bg-[#212632]"
                            >
                              <div className="flex flex-col w-[100%]  gap-3">
                                <div className="flex justify-between w-[100%]  ">
                                  <div className="flex items-center w-[85%] gap-4  sm:gap-4">
                                    {item.iplay === true ? (
                                      <button className="px-2 text-[8px] md:text-[10px] rounded-[4px] p-[2px] bg-red-600">
                                        Live
                                      </button>
                                    ) : (
                                      <button className="px-2 text-[8px] md:text-[10px] rounded-[4px] p-[2px] bg-green-600">
                                        UpComing
                                      </button>
                                    )}

                                    <div className="marquee-container  w-[80px] text-center">
                                      <p
                                        className={`marquee-text  text-xs w-[60px]  ${
                                          isRunning &&
                                          isRunningTeamName == item.cname &&
                                          item.gmid == isRunningMatchId
                                            ? "running"
                                            : ""
                                        }`}
                                        onMouseOver={() =>
                                          handleMouseOver(item.cname, item.gmid)
                                        }
                                        onMouseOut={() => handleMouseOut()}
                                      >
                                        {item.cname}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[1px] rounded-[50%] ">
                                    <Image
                                      src={teams}
                                      alt="teams"
                                      className="h-[100%] rounded-[50%] w-[100%]"
                                    />
                                  </span>
                                </div>

                                <div className="flex justify-between mt-4  gap-4 sm:gap-2 ">
                                  <div className="w-[100%] flex  justify-between items-center   ">
                                    <div className="flex flex-col items-center gap-1">
                                      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[2px] rounded-[50%] ">
                                        <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                          {getTeamShortName(team1)}
                                        </p>
                                      </span>
                                      <div className="marquee-container">
                                        <p
                                          className={`marquee-text text-center  text-xs w-[80px] ${
                                            isRunning &&
                                            isRunningTeamName == team1 &&
                                            item.gmid == isRunningMatchId
                                              ? "running"
                                              : ""
                                          }`}
                                          onMouseOver={() =>
                                            handleMouseOver(team1, item.gmid)
                                          }
                                          onMouseOut={() => handleMouseOut()}
                                        >
                                          {team1}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="w-[30%] flex items-center justify-center -mt-2">
                                      <svg
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 14 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <line
                                          y1="-0.5"
                                          x2="16.5642"
                                          y2="-0.5"
                                          transform="matrix(0.790995 -0.611822 0.605038 0.796197 0.897827 11.9054)"
                                          stroke="white"
                                        />
                                        <path
                                          d="M13.3449 6.45271C13.3449 9.46415 10.5585 11.9054 7.12136 11.9054C3.6842 11.9054 0.897827 9.46415 0.897827 6.45271C0.897827 3.44126 3.6842 1 7.12136 1C10.5585 1 13.3449 3.44126 13.3449 6.45271Z"
                                          fill="#DCA029"
                                        />
                                        <path
                                          d="M13.3449 6.45271C13.3449 9.46415 10.5585 11.9054 7.12136 11.9054C3.6842 11.9054 0.897827 9.46415 0.897827 6.45271C0.897827 3.44126 3.6842 1 7.12136 1C10.5585 1 13.3449 3.44126 13.3449 6.45271Z"
                                          stroke="black"
                                        />
                                        <path
                                          d="M3.59291 5.79447L5.15817 8.33505L5.19417 8.32534L5.45462 5.29223L6.15405 5.10355L5.74411 8.97834L4.95897 9.19015L2.89519 5.9827L3.59291 5.79447ZM7.65338 4.52262L7.51302 9.06724L6.9696 9.21384L7.10996 4.66922L7.65338 4.52262ZM10.2512 5.03305C10.1999 4.88637 10.105 4.78699 9.96643 4.73491C9.82905 4.68253 9.66607 4.68177 9.4775 4.73264C9.34492 4.7684 9.23593 4.81925 9.1505 4.88519C9.06507 4.95112 9.0053 5.02544 8.97118 5.10817C8.93707 5.19089 8.92981 5.27678 8.94941 5.36585C8.96666 5.43961 8.99819 5.49912 9.04399 5.54435C9.09094 5.58927 9.14801 5.62289 9.21519 5.6452C9.28209 5.66637 9.35394 5.68007 9.43073 5.68631C9.50751 5.69255 9.58392 5.69461 9.65997 5.69247L10.0085 5.68667C10.1484 5.68203 10.2856 5.68972 10.4203 5.70975C10.5561 5.72948 10.682 5.76658 10.798 5.82106C10.9152 5.87522 11.0157 5.95166 11.0995 6.05035C11.1833 6.14905 11.2431 6.27505 11.279 6.42835C11.3275 6.63582 11.3176 6.8327 11.2494 7.01897C11.1809 7.20409 11.0576 7.36785 10.8795 7.51025C10.7022 7.65119 10.4731 7.75958 10.1919 7.83543C9.91877 7.90911 9.67166 7.93044 9.45058 7.89941C9.23064 7.86807 9.04497 7.78582 8.89356 7.65267C8.7433 7.51921 8.63611 7.33614 8.572 7.10347L9.19771 6.93467C9.23569 7.05554 9.29738 7.14795 9.3828 7.2119C9.46822 7.27586 9.56878 7.31367 9.6845 7.32534C9.80136 7.3367 9.92608 7.3245 10.0586 7.28874C10.1969 7.25143 10.3132 7.198 10.4075 7.12845C10.5027 7.05744 10.5712 6.97646 10.6132 6.8855C10.6548 6.7934 10.6643 6.69647 10.6418 6.59473C10.6191 6.50283 10.5744 6.434 10.5078 6.38825C10.441 6.34134 10.3554 6.31051 10.2511 6.29576C10.1477 6.27955 10.0294 6.27226 9.89612 6.2739L9.47244 6.27792C9.16578 6.281 8.91067 6.22913 8.7071 6.1223C8.50441 6.01401 8.37342 5.83308 8.31414 5.5795C8.26537 5.37087 8.27866 5.17307 8.35401 4.9861C8.43051 4.79882 8.5558 4.63575 8.72987 4.49689C8.90368 4.35687 9.11344 4.25372 9.35915 4.18744C9.6083 4.12023 9.83682 4.10514 10.0447 4.14218C10.2535 4.17775 10.4297 4.25828 10.5732 4.38375C10.7165 4.50807 10.8131 4.66947 10.8632 4.86795L10.2512 5.03305Z"
                                          fill="white"
                                        />
                                      </svg>
                                    </div>

                                    <div className="flex flex-col mt-1 items-center gap-1">
                                      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... flex items-center justify-center h-[40px] w-[40px] p-[2px] rounded-[50%] ">
                                        <p className="rounded-[50%] text-black text-xs w-[100%] h-[100%] flex items-center justify-center bg-orange-200 p-1">
                                          {getTeamShortName(team2)}
                                        </p>
                                      </span>
                                      <div className="marquee-container">
                                        <p
                                          className={`marquee-text text-center text-xs w-[80px] ${
                                            isRunning &&
                                            isRunningTeamName == team2 &&
                                            item.gmid == isRunningMatchId
                                              ? "running"
                                              : ""
                                          }`}
                                          onMouseOver={() =>
                                            handleMouseOver(team2, item.gmid)
                                          }
                                          onMouseOut={() => handleMouseOut()}
                                        >
                                          {team2}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex text-white justify-between text-[9px] w-[90%] m-auto sm:w-[100%]">
                                <div className="flex  gap-2">
                                  <button className="px-2 p-1 bg-[#0096FF] w-[50px] rounded-[6px]">
                                    {item.section[1].odds[0].odds}
                                  </button>
                                  <button className="px-2 p-1 bg-[#FF6A8A] w-[50px] rounded-[6px]">
                                    {item.section[1].odds[1].odds}
                                  </button>
                                </div>
                                <div className="flex  gap-2">
                                  <button className="px-2 p-1 bg-[#0096FF] w-[50px] rounded-[6px]">
                                    {item.section[2].odds[1].odds}
                                  </button>
                                  <button className="px-2 p-1 bg-[#FF6A8A] w-[50px] rounded-[6px]">
                                    {item.section[2].odds[0].odds}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <button className="w-[100%] flex justify-center gap-1 items-center text-[10px] md:text-xs p-2 bg-[#DCA029] rounded-[10px]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="19"
                                    viewBox="0 0 18 19"
                                    fill="none"
                                  >
                                    <path
                                      d="M1.73584 6.51318V13.2438L8.29834 17.1089V10.4097L1.73584 6.51318Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M9.39209 17.1089L15.9546 13.2438V6.51318L9.39209 10.4097V17.1089Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M15.4077 5.625L8.84521 1.79688L2.28271 5.625L8.84521 9.45312L15.4077 5.625Z"
                                      fill="white"
                                    />
                                  </svg>{" "}
                                  <span>Place Bet</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </>
                  );
                })}
            </div>
          </>
        )}

        {/* <div className="grid w-[95%] m-auto sm:w-[100%] mt-[16px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {matchData &&
            matchData.map((item: CricketData) => {
              return (
                <>
                  
                  <Link key={item.gmid} href={`/sports/${item.gmid}/4`}>
                    <div
                      style={{ border: "0.5px solid #444" }}
                      className="flex flex-col gap-7 p-2 md:p-3 w-[100%] min-h-[260px] justify-between  rounded-[10px] md:rounded-[16px] bg-[#212632]"
                    >
                      <div className="flex flex-col w-[100%]  gap-3">
                        <div className="flex justify-between w-[100%]  ">
                          <div className="flex flex-col w-[85%] gap-4  sm:gap-2">
                            <p className="  text-[18px] sm:text-[14px] font-bold text-white">
                               League Name
                            </p>
                            <div className="flex justify-between ">
                              <p className=" text-[12px] sm:text-[10px] text-[#FFF]">
                                Date:
                                {item.eventName.split(" / ")[1].split("  ")[0]}
                              </p>
                              <p className="text-[12px] sm:text-[10px]  text-[#FFF]">
                                Time:
                                {item.eventName.split(" / ")[1].split("  ")[1]}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <Image src={teams} alt="teams" />
                          </div>
                        </div>
                        <div className="flex justify-between mt-2 sm:mt-0 items-center gap-4 sm:gap-2 ">
                          <p className="text-[13px] sm:text-[11px] flex gap-1  font-semibold text-white">
                            <span className="mt-[2px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M1.68542 9.27603C1.63953 9.53898 1.89722 9.74448 2.12433 9.62722L4.70718 8.29115L7.28944 9.62722C7.51655 9.74448 7.77424 9.53898 7.72835 9.27662L7.24002 6.47537L9.31219 4.48785C9.50634 4.30189 9.40632 3.96195 9.14627 3.92523L6.26454 3.51304L4.97958 0.950464C4.95511 0.898519 4.91649 0.854631 4.86822 0.8239C4.81994 0.793169 4.764 0.776855 4.70688 0.776855C4.64977 0.776855 4.59382 0.793169 4.54555 0.8239C4.49728 0.854631 4.45866 0.898519 4.43418 0.950464L3.14923 3.51363L0.267495 3.92583C0.00803298 3.96254 -0.0925747 4.30248 0.100992 4.48844L2.17375 6.47597L1.68542 9.27721V9.27603ZM4.57127 7.63733L2.40261 8.75901L2.81093 6.41556C2.82049 6.36161 2.81675 6.30613 2.80003 6.25398C2.78331 6.20183 2.75412 6.15462 2.71503 6.11648L1.00528 4.47601L3.38928 4.13488C3.43864 4.12738 3.48546 4.10794 3.52573 4.07824C3.566 4.04853 3.59852 4.00944 3.6205 3.96432L4.706 1.79794L5.79268 3.96432C5.81466 4.00944 5.84718 4.04853 5.88745 4.07824C5.92772 4.10794 5.97454 4.12738 6.0239 4.13488L8.4079 4.47541L6.69815 6.11589C6.65897 6.15409 6.62973 6.2014 6.613 6.25366C6.59628 6.30592 6.59258 6.36152 6.60225 6.41556L7.01057 8.75901L4.84191 7.63733C4.79997 7.61556 4.75348 7.60421 4.7063 7.60421C4.65911 7.60421 4.61321 7.61556 4.57127 7.63733Z"
                                  fill="#949498"
                                />
                              </svg>
                            </span>


                            {item.eventName.split(" / ")[0]}
                          </p>
                          {item.inPlay == "True" ? (
                            <button className="px-2 text-[8px] md:text-[10px] rounded-[4px] p-[2px] bg-red-600">
                              Live
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="flex text-white justify-between text-[9px] w-[90%] m-auto sm:w-[100%]">
                        <div className="flex  gap-2">
                          <button className="px-2 p-1 bg-[#0096FF] rounded-[6px]">
                            {item.back1}
                          </button>
                          <button className="px-2 p-1 bg-[#FF6A8A] rounded-[6px]">
                            {item.lay1}
                          </button>
                        </div>
                        <div className="flex  gap-2">
                          <button className="px-2 p-1 bg-[#0096FF] rounded-[6px]">
                            {item.back11}
                          </button>
                          <button className="px-2 p-1 bg-[#FF6A8A] rounded-[6px]">
                            {item.lay11}
                          </button>
                        </div>
                      </div>

                      <div>
                        <button className="w-[100%] mb-3 flex justify-center gap-1 items-center text-[10px] md:text-xs p-2 bg-[#DCA029] rounded-[10px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                          >
                            <path
                              d="M1.73584 6.51318V13.2438L8.29834 17.1089V10.4097L1.73584 6.51318Z"
                              fill="white"
                            />
                            <path
                              d="M9.39209 17.1089L15.9546 13.2438V6.51318L9.39209 10.4097V17.1089Z"
                              fill="white"
                            />
                            <path
                              d="M15.4077 5.625L8.84521 1.79688L2.28271 5.625L8.84521 9.45312L15.4077 5.625Z"
                              fill="white"
                            />
                          </svg>{" "}
                          <span>Place Bet</span>
                        </button>
                      </div>
                    </div>
                  </Link>
                 
                </>
              );
            })}
        </div> */}
      </div>
    </div>
  );
};

export default SoccerData;
