"use client";

import { AppDispatch, RootState, useAppSelector } from "../redux-arch/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import CricketData from "@/components/user/subcomponent/CricketData";
import SoccerData from "@/components/user/subcomponent/SoccerData";
import TennisData from "@/components/user/subcomponent/TennisData";
import { HiMiniTrophy } from "react-icons/hi2";

import sportbar from "../../assetuser/other/10068 1.png";
import img1 from "../../assetuser/other/Akbar-Romeo-Walter.webp";
import img2 from "../../assetuser/other/Andar-Bahar.webp";
import { CircularProgress, Spinner, useToast } from "@chakra-ui/react";
import { GameProvider, LogoAndFav } from "../../../utils/typescript.module";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import themeChange from "@/theme";
import announ from "../../assetuser/other/dazzle-loudspeaker.gif";
import { SeamlessGame } from "../casino/MainComponent";
import { useRouter } from "next/navigation";
import sportBook from "../../assetuser/other/sportsbook.png";
import { GameCard } from "../casino/MainComponent";
import { LuFerrisWheel } from "react-icons/lu";
import { ImFire } from "react-icons/im";
import { LuCherry } from "react-icons/lu";
import cricket from "../../assetuser/new/scricket.png";
import tennis from "../../assetuser/new/stennis.png";
import soccer from "../../assetuser/new/ssccer.png";
import casino1 from "../../assetuser/new/casino1.jpeg";
import casino2 from "../../assetuser/new/casino2.jpg";
import casino3 from "../../assetuser/new/casino3.jpg";
import casino4 from "../../assetuser/new/casino4.jpg";
import casino5 from "../../assetuser/new/casino5.jpeg";
import casino6 from "../../assetuser/new/casino6.jpg";
import casino7 from "../../assetuser/new/casino7.jpeg";
import deposit from "../../assetuser/deposit (1).png";
import withdral from "../../assetuser/withdrawal.png";
import refer from "../../assetuser/refer.png";

import { AllGameType, SportsGameType } from "../../../utils/providerData";
import { manageSideBar_Fn } from "../redux-arch/fetures/nav-slice";
import Link from "next/link";
import PamentModel from "@/components/user/PamentModel";
const MainComponent = () => {
  const [active, setCategoryActive] = useState<number>(1);
  const [matchFilter, setMatchFilter] = useState<String>("All");
  const [gameType, setGameType] = useState<String>("");
  const dispatch = useDispatch<AppDispatch>();
  const [provider, setProvider] = useState<any>([]);
  const [gameCounts, setgameCounts] = useState<any>(0);
  const userAuth = useSelector((state: RootState) => state);

  const [loading, setLoading] = useState(false);
  const {
    token = "",
    otpless_token = "",
    username = "",
    first_name = "",
    last_name = "",
    email = "",
    exposure_limit = 0,
    amount = 0,
  } = userAuth?.combineR?.userAuth?.data?.data || {};
  const category = [
    {
      id: 1,
      title: "Cricket",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30px"
          height="30px"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 454 512.18"
        >
          <path
            stroke="white"
            fill="#ffffff"
            d="M17.86 27.54H44.8c2.12 0 3.86 1.73 3.86 3.85v253.67l-.68.67c-12.21 12.21-18.19 26.59-19.4 41.65-1.24 15.46 2.88 31.15 10.52 45.37 2.39 4.45 5.23 8.86 8.41 13.13l1.15 1.52v108.78h55.01v-70.95c7.18 1.8 14.49 2.55 21.76 2.06 4.37-.29 8.68-1.01 12.88-2.19v71.08h55.01V380.97l34.64-34.65v149.86h11.94c1.14 0 2.08.93 2.08 2.07v11.85c0 1.15-.94 2.08-2.08 2.08H2.08c-1.15 0-2.08-.93-2.08-2.08v-11.85c0-1.14.93-2.07 2.08-2.07h11.93V31.38c0-2.11 1.73-3.84 3.85-3.84zm295.83 73.63c3.67 18.02 21.33 34.93 38.66 38.64 2.41 4.51 6.26 9.05 11.31 14.1.95.94 1.43 2.22 1.43 3.5 0 1.2-.42 2.39-1.24 3.32L140.27 384.3c-10.94 10.93-26.53 9.6-40.7 1.82-5.98-3.28-11.71-7.69-16.77-12.82-5.07-5.14-9.48-11-12.8-17.17-8.32-15.5-9.7-32.99 2.85-45.54L293.09 90.35c.95-.96 2.23-1.43 3.5-1.43 1.28 0 2.55.47 3.5 1.43 4.82 4.82 9.23 8.47 13.6 10.82zm38.04 170.53c17.57 0 33.5 7.13 45.02 18.66 11.53 11.51 18.67 27.44 18.67 45.03 0 17.58-7.14 33.51-18.66 45.03l-.21.19c-11.52 11.41-27.36 18.46-44.82 18.46-6.94 0-13.61-1.11-19.86-3.16-.27-.06-.52-.15-.77-.26a63.634 63.634 0 0 1-24.39-15.24c-11.53-11.51-18.67-27.44-18.67-45.02 0-17.57 7.13-33.49 18.66-45.02l.02-.03c11.53-11.52 27.45-18.64 45.01-18.64zm-17.71 9.97c-.06.26-.14.52-.25.76l-1.48 3.27a3.574 3.574 0 0 1-4.72 1.78 3.54 3.54 0 0 1-1.96-2.26 56.639 56.639 0 0 0-13.86 10.17c-10.24 10.24-16.56 24.37-16.56 40 0 15.61 6.33 29.74 16.56 39.97.44.44.88.87 1.33 1.29.27-.14.55-.25.85-.32 1.91-.47 3.85.7 4.31 2.61.13.49.29 1.01.48 1.52.15.39.31.79.49 1.19 1.9 1.33 3.87 2.55 5.92 3.64-6.22-15.69-8.04-37.14-4.91-57.63 2.76-17.99 9.35-35.38 20.16-47.68-2.17.44-4.3 1.01-6.36 1.69zm-27.8 76.75c0-1.97 1.6-3.57 3.57-3.57 1.97 0 3.58 1.6 3.58 3.57 0 .94.08 2.04.21 3.09.14 1.08.35 2.16.58 3.04.5 1.9-.64 3.86-2.54 4.35-1.9.5-3.85-.63-4.35-2.53-.3-1.15-.56-2.54-.75-3.93-.19-1.47-.3-2.91-.3-4.02zm-1.26-21.37c.17-1.96 1.91-3.4 3.86-3.22 1.96.17 3.4 1.91 3.22 3.86-.03.44 0 1.53.08 2.78.09 1.5.25 3.14.4 4.25a3.56 3.56 0 0 1-3.06 4 3.56 3.56 0 0 1-4-3.05c-.18-1.29-.35-3.12-.46-4.76-.08-1.53-.12-2.98-.04-3.86zm3.64-22.5c.53-1.89 2.5-3 4.4-2.47 1.89.53 3 2.5 2.46 4.4-.14.52-.36 1.54-.57 2.68l-.71 4.15c-.29 1.95-2.1 3.3-4.05 3.02-1.95-.29-3.3-2.1-3.02-4.05l.77-4.45c.26-1.34.53-2.59.72-3.28zm8.03-20.02a3.574 3.574 0 0 1 4.72-1.78 3.57 3.57 0 0 1 1.78 4.72l-2.71 5.98a3.574 3.574 0 0 1-4.72 1.78c-1.79-.81-2.59-2.92-1.79-4.71l2.72-5.99zm26.7 96.78c.27-1.47 1.45-2.67 3-2.88a3.574 3.574 0 0 1 4.04 3.03l.09.45 1.27.02c15.53 0 29.6-6.26 39.81-16.38l.17-.19c10.23-10.23 16.56-24.36 16.56-39.97s-6.33-29.75-16.56-39.99a56.357 56.357 0 0 0-26.8-15.01l-.51.88a3.555 3.555 0 0 1-4.86 1.31 3.549 3.549 0 0 1-1.77-3.41c-1.97-.21-3.96-.33-5.99-.33-13.45 10.87-21.43 29.9-24.49 49.89-3.46 22.6-.64 46.22 7.66 60.67 2.71.84 5.51 1.48 8.38 1.91zm-8.98-17.54c-.29-1.95 1.05-3.78 3-4.07a3.585 3.585 0 0 1 4.07 3c.11.76.33 1.62.6 2.49.33 1.03.72 2.03 1.12 2.9.82 1.78.04 3.9-1.75 4.73-1.78.82-3.9.04-4.72-1.75-.55-1.18-1.06-2.48-1.46-3.73-.38-1.2-.68-2.43-.86-3.57zm-2.91-22.62a3.57 3.57 0 0 1 3.88-3.21c1.96.18 3.39 1.93 3.21 3.88-.08.87-.11 1.98-.07 3.11.03 1.07.13 2.16.28 3.06.32 1.94-.99 3.78-2.93 4.1-1.94.33-3.78-.99-4.1-2.93-.2-1.15-.32-2.57-.37-3.98-.04-1.43-.01-2.86.1-4.03zm.8-21.41c.36-1.94 2.23-3.2 4.17-2.84 1.93.37 3.2 2.24 2.83 4.18-.09.48-.17 1.55-.21 2.75-.05 1.5-.05 3.15-.01 4.28.07 1.96-1.47 3.62-3.43 3.68a3.555 3.555 0 0 1-3.68-3.43c-.05-1.27-.05-3.11.01-4.77.05-1.57.16-3.04.32-3.85zm5.8-22.04a3.574 3.574 0 0 1 4.62-2.03c1.83.72 2.74 2.79 2.03 4.62-.2.51-.51 1.5-.84 2.6l-1.11 4.08c-.47 1.91-2.41 3.07-4.32 2.6a3.575 3.575 0 0 1-2.6-4.33l1.2-4.36c.38-1.31.76-2.52 1.02-3.18zm9.94-19.14a3.553 3.553 0 0 1 4.86-1.31 3.55 3.55 0 0 1 1.31 4.85l-3.28 5.7a3.564 3.564 0 0 1-4.86 1.31 3.555 3.555 0 0 1-1.31-4.86l3.28-5.69zm-58.78-92.48a5.233 5.233 0 0 1 7.38 0c2.04 2.04 2.04 5.35 0 7.38L145.89 354.15c-2.04 2.04-5.35 2.04-7.38 0-2.04-2.03-2.04-5.34 0-7.38L289.2 196.08zM425.51 2.03l26.46 26.46a6.933 6.933 0 0 1 2.03 4.89c0 1.49-.49 3-1.49 4.27l-.53.62-25.53 25.53a6.897 6.897 0 0 1-4.9 2.03c-1.08 0-2.18-.27-3.18-.79-4.56 4.47-9.75 9.41-15.04 14.46-13.64 12.99-28.06 26.73-38.48 39.16-4.22 5.03-5.61 9.01-4.72 12.74 1.03 4.31 4.89 9.12 10.9 15.13 3 3.02 4.5 6.96 4.5 10.88 0 3.78-1.39 7.57-4.17 10.53L147.65 391.68c-14.81 14.8-35.04 13.48-53.09 3.57-6.85-3.76-13.4-8.8-19.18-14.65-5.75-5.84-10.76-12.51-14.55-19.54-10.37-19.31-11.77-41.44 4.64-57.85L285.71 82.97c3-3 6.95-4.49 10.88-4.49 3.94 0 7.89 1.49 10.88 4.49 5.87 5.86 10.67 9.54 15.02 10.55 3.81.87 7.8-.45 12.66-4.36 12.23-9.82 26.72-25.08 40.05-39.13 4.85-5.12 9.57-10.09 13.76-14.39-.52-1-.79-2.1-.79-3.19 0-1.51.5-3.02 1.5-4.28l.52-.61 25.54-25.53A6.968 6.968 0 0 1 420.62 0c1.51 0 3.02.51 4.27 1.5l.62.53zM53.72 9.34h43.03c2.44 0 4.44 2 4.44 4.44v.16h15.08c.75 0 1.4.63 1.4 1.41v6.69c0 .77-.63 1.4-1.4 1.4h-15.08v.17c0 2.44-2 4.44-4.44 4.44H53.72c-2.44 0-4.44-2-4.44-4.44v-.17H33.5c-.77 0-1.41-.63-1.41-1.4v-6.69c0-.78.63-1.41 1.41-1.41h15.78v-.16c0-2.44 2-4.44 4.44-4.44zm70.31 4.6h15.07v-.16c0-2.44 2-4.44 4.44-4.44h43.03c2.45 0 4.44 2 4.44 4.44v.16h15.79c.75 0 1.4.63 1.4 1.41v6.69c0 .77-.63 1.4-1.4 1.4h-15.79v.17a4.45 4.45 0 0 1-4.44 4.44h-43.03c-2.44 0-4.44-2-4.44-4.44v-.17h-15.07c-.77 0-1.41-.63-1.41-1.4v-6.69c0-.78.63-1.41 1.41-1.41zm73.14 13.6h26.94c2.12 0 3.85 1.73 3.85 3.85v75.53a38.251 38.251 0 0 0-6.17 5l-28.47 28.47V31.38c0-2.11 1.73-3.84 3.85-3.84zm-89.66 0h26.94a3.86 3.86 0 0 1 3.86 3.85V195.4l-34.64 34.65V31.38c0-2.11 1.73-3.84 3.84-3.84z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Live Casino",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33px"
          height="33px"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 478 512.152"
        >
          <path
            stroke="white"
            fill="#ffffff"
            d="M254.307 398.519l32.114 48.454c4.748 7.232 4.572 11.112-3.026 15.921l-32.176 20.155c-7.822 4.953-12.444 5.253-17.896-3.096l-34.934-53.028c-2.18-5.297-1.117-9.121 2.581-11.765l24.705-15.536c-22.866-13.303-40.768-25.333-53.155-37.951-10.38-10.579-16.959-21.533-19.388-33.842-5.777 2.054-11.981 3.503-18.392 4.405-11.601 1.635-23.9 1.483-35.596-.117-6.588 3.07-12.889 6.494-18.849 10.359-26.699 17.312-46.848 43.803-55.429 87.448l-1.297 7.831h89.161v-36.121a6.095 6.095 0 0112.191 0v98.324h227.647v-98.324a6.096 6.096 0 0112.192 0v36.121h88.271l-4.288-23.042c-7.159-35.243-28.901-58.304-56.19-73.771-6.96-3.944-14.286-7.405-21.833-10.453-6.27.581-12.643.836-18.947.739-9.336-.142-18.533-1.041-27.008-2.78-2.527 12.056-9.052 22.824-19.259 33.223-12.034 12.258-29.283 23.967-51.223 36.821l.024.025zm-90.502-75.477c1.584 11.176 7.289 21.079 16.754 30.725 12.419 12.652 31.173 24.919 55.436 38.817 2.297-.731 4.591-.886 6.888-.488 23.85-13.7 42.31-25.825 54.584-38.329 8.746-8.91 14.277-18.044 16.315-28.195a77.82 77.82 0 01-6.941-2.621c-16.476 11.885-44.936 17.782-72.316 17.454-27.084-.325-53.505-6.793-66.848-19.625l-.057-.054a59.507 59.507 0 01-3.815 2.316zm12.025-9.008c11.648 10.361 34.76 15.605 58.821 15.896 23.061.277 46.693-4.029 61.803-12.763-.48-.344-.953-.691-1.413-1.047-10.349-8.021-15.53-19.357-11.946-34.53-14.539 11.939-29.409 18.044-44.724 18.176-16.003.143-32.4-6.237-49.334-19.274-.072 14.321-5.076 25.345-13.207 33.542zM44.636 299.577c20.776-1.688 35.012-13.365 44.699-30.236 16.412-28.601 18.564-67.362 20.675-100.065 4.073-63.182 8.475-131.348 80.242-160.36A122.435 122.435 0 01224.22.586c24.803-2.426 50.117 2.688 71.972 15.199 21.862 12.516 40.275 32.435 51.262 59.594l.034.092c21.591 53.501 4.866 107.694 32.467 173.125 11.914 28.242 29.226 49.019 53.432 50.981a1.816 1.816 0 011.499 2.594c-4.165 11.327-21.19 20.079-42.427 24.906a178.417 178.417 0 016.096 3.298c30.121 17.072 54.148 42.689 62.115 82.055l17.23 92.531a6.076 6.076 0 01-5.976 7.172l-465.828.019a6.096 6.096 0 01-5.913-7.576l12.743-76.982c9.305-47.378 31.407-76.279 60.749-95.308a151.708 151.708 0 016.737-4.123c-18.596-5.44-33.296-14.766-37.344-26.172a1.815 1.815 0 011.107-2.313l.461-.101zm230.3-122.517a8.699 8.699 0 00-.401 2.546c0 4.733 3.856 8.591 8.592 8.591 4.732 0 8.588-3.858 8.588-8.591a8.353 8.353 0 00-.874-3.783 56.026 56.026 0 0111.346 2.48c1.634.533 3.319-.533 3.774-2.404.46-1.83-.493-3.78-2.099-4.313-6.184-2.029-12.409-3.02-18.555-3.02-6.153 0-12.299 1.032-18.331 3.054-1.603.534-2.559 2.449-2.105 4.32.457 1.83 2.18 2.896 3.783 2.363a60.95 60.95 0 016.045-1.663c.574-.113.442-.246.237.42zm-53.404 77.878c-2.531-.893-3.846-3.701-2.906-6.238.937-2.53 3.704-3.846 6.238-2.905 10.361 3.723 20.398 3.53 30.665-.376a4.907 4.907 0 016.282 2.811 4.909 4.909 0 01-2.812 6.285c-12.387 4.718-24.976 4.916-37.467.423zm-2.303-102.488c7.452 2.789 9.014 9.014 4.852 11.339-4.887 2.755-11.039-1.331-15.813-2.858-12.454-3.976-27.267-4.43-37.998 2.29-2.861 1.799-5.764 4.121-8.742 6.913 1.107-3.934 2.82-7.525 5.303-10.693 10.813-13.595 37.963-14.4 52.398-6.991zm41.941 0c-7.449 2.789-9.011 9.014-4.853 11.339 4.891 2.755 11.04-1.331 15.808-2.858 12.45-3.976 27.232-4.43 38.003 2.29 2.862 1.799 5.765 4.121 8.74 6.913-1.104-3.934-2.824-7.525-5.307-10.693-10.806-13.595-37.956-14.4-52.391-6.991zm-82.51 26.752c-.947-.297-1.751-1.095-2.089-2.237-.533-1.83.313-3.818 1.915-4.427 12.296-4.811 24.819-4.467 37.114 0 1.606.572 2.48 2.521 1.988 4.355-.495 1.829-2.218 2.826-3.818 2.252a62.687 62.687 0 00-6.108-1.836c.186.732.303 1.527.303 2.297 0 4.733-3.859 8.591-8.595 8.591-4.733 0-8.588-3.858-8.588-8.591 0-1.189.227-2.297.647-3.288a44.683 44.683 0 00-9.254 2.19c-1.133.397-2.285 1.079-3.515.694zM295.725 263.7c37.878-41.894 44.45-75.67 33.249-131.513-26.371-12.223-43.617-39.089-52.454-79.456-10.557 76.853-104.934 73.553-128.667 87.537 0 48.292-3.694 70.744 21.455 110.632 3.332 5.291 6.582 10.396 10.51 14.63 31.712 34.196 85.933 29.914 115.907-1.83zM19.379 463.055l-6.115 36.905h99.466v-36.905H19.379zM364.76 499.96h99.85l-6.868-36.905H364.76v36.905zm-114.762-95.348c.11.602.17 1.227.17 1.861 0 5.699-4.619 10.318-10.317 10.318-5.695 0-10.314-4.619-10.314-10.318 0-.634.056-1.259.167-1.861 5.689 2.751 12.516 2.587 20.294 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Sports",
      icon: "",
      icon2: <HiMiniTrophy fontSize="30px" color="white" />,
    },
    {
      id: 4,
      title: "Table",
      icon: "",
      icon2: <LuFerrisWheel fontSize="30px" color="white" />,
    },
    {
      id: 5,
      title: "Slots",
      icon: "",
      icon2: <LuCherry fontSize="30px" color="white" />,
    },
    {
      id: 6,
      title: "Hote Game",
      icon: "",
      icon2: <ImFire fontSize="30px" color="white" />,
    },
    // {
    //   id: 7,
    //   title: "Promotion",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="28"
    //       height="29"
    //       viewBox="0 0 28 29"
    //       fill="none"
    //     >
    //       <path
    //         d="M25.7899 14.5801V22.9816C25.7899 26.0762 23.152 28.5826 19.8951 28.5826H8.10567C4.84883 28.5826 2.21094 26.0762 2.21094 22.9816V14.5801C2.21094 13.81 2.8741 13.1798 3.68462 13.1798H6.58778C7.39831 13.1798 8.06146 13.81 8.06146 14.5801V18.9769C8.06146 20.0131 8.66567 20.9653 9.62357 21.4554C10.0509 21.6794 10.5225 21.7914 11.0088 21.7914C11.5688 21.7914 12.1288 21.6374 12.6151 21.3293L14.0151 20.4612L15.312 21.2873C16.2109 21.8614 17.3604 21.9314 18.3183 21.4413C19.2909 20.9513 19.8951 20.0131 19.8951 18.9629V14.5801C19.8951 13.81 20.5583 13.1798 21.3688 13.1798H24.3162C25.1267 13.1798 25.7899 13.81 25.7899 14.5801Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M28 7.57852V8.97878C28 10.5191 27.2189 11.7793 25.0526 11.7793H2.94737C0.692632 11.7793 0 10.5191 0 8.97878V7.57852C0 6.03824 0.692632 4.77802 2.94737 4.77802H25.0526C27.2189 4.77802 28 6.03824 28 7.57852Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M13.4666 4.7799H5.33185C4.8308 4.26181 4.84553 3.46367 5.37606 2.95957L7.46869 0.971212C8.01395 0.453118 8.9129 0.453118 9.45817 0.971212L13.4666 4.7799Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M22.6533 4.7799H14.5186L18.527 0.971212C19.0722 0.453118 19.9712 0.453118 20.5165 0.971212L22.6091 2.95957C23.1396 3.46367 23.1543 4.26181 22.6533 4.7799Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M16.9048 13.1798C17.7153 13.1798 18.3785 13.81 18.3785 14.5801V18.9629C18.3785 20.0831 17.0669 20.7552 16.0943 20.1251L14.768 19.285C14.2816 18.9769 13.648 18.9769 13.1469 19.285L11.7616 20.1531C10.789 20.7692 9.49219 20.0971 9.49219 18.9909V14.5801C9.49219 13.81 10.1553 13.1798 10.9659 13.1798H16.9048Z"
    //         fill="white"
    //       />
    //     </svg>
    //   ),
    // },
  ];

  console.log(active, "active");
  const sportbardata = [
    {
      id: 1,
      img: cricket,
      link: "https://bewithsport.betskyexch.com/#/sport/4",
    },
    {
      id: 2,
      img: tennis,
      link: "https://bewithsport.betskyexch.com/#/sport/2",
    },
    {
      id: 3,
      img: soccer,
      link: "https://bewithsport.betskyexch.com/#/sport/1",
    },
  ];

  const casinodata = [
    {
      id: 1,
      img: casino1,
      link: "https://bewithsport.betskyexch.com/#/sport/4",
    },
    {
      id: 2,
      img: casino2,
      link: "https://bewithsport.betskyexch.com/#/sport/2",
    },
    {
      id: 3,
      img: casino3,
      link: "https://bewithsport.betskyexch.com/#/sport/1",
    },
    {
      id: 4,
      img: casino4,
      link: "https://bfsiz6.bikimex.net/player/webMain.jsp?dm=1&title=1&hall=-1&sgt=0",
    },
    {
      id: 5,
      img: casino5,
      link: "https://bewithsport.betskyexch.com/#/sport/2",
    },
    {
      id: 6,
      img: casino6,
      link: "https://bewithsport.betskyexch.com/#/sport/1",
    },
    {
      id: 7,
      img: casino7,
      link: "https://bewithsport.betskyexch.com/#/sport/1",
    },
  ];

  const router = useRouter();

  const handleGetProvider = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinoprovider/get-provider?`;
    try {
      const response = await fetchGetRequest(url);
      setProvider(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // const handleFilter = (category: string, id: number) => {
  //   setMatchFilter(category);
  //   setCategoryActive(id);
  //   router.push("/sports");
  // };

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 4;
  const totalCards = sportdata.length;

  const { showSideBar1, theme,type } = useAppSelector(
    (store) => store.combineR.NavStateReducer
  );
console.log(type,"tupe")
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
    Promise.all([handleGetLogoAndFav(), handleGetProvider()])
      .then(([logoAndFavResult, providerResult]) => {})
      .catch((error) => {});
  }, []);

  const handleActive = (value: any) => {
    dispatch(manageSideBar_Fn({ type: "changeType", value: value }));
    
  };

  const handleGame = async (game: GameProvider) => {
    if (!token || !otpless_token) {
      toast({
        title: "Please login first.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      Portfolio: game,
      IsWapSports: false,
      Username: username,
      IsGetAll: "false",
      CompanyKey: "01E731A7A9564EAB917CA1BEC8EA63CE",
      ServerId: "568Win-TEST11",
    };
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/casinogame/login-casino`,
        payload
      );
      const data = response.data;
      // setData(response.data);
      let url = `https:${data.url}`;
      router.push(url);
    } catch (error: any) {
      toast({
        title: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const [activeCategory, setActiveCategory] = useState("All Game");
  const [activeCategorySlot, setActiveCategorySlot] = useState("All Game");
  const [activeCategoryHot, setActiveCategoryHot] = useState("All Game");

  const categories = [
    "All Game",
    "EvolutionGaming",
    "SexyBaccarat",
    "AsiaGaming",
    "SaGaming",
    "PragmaticPlayCasino",
    "BigGaming",
    "Green Dragon",
    "OGLive",
    "WE Casino",
  ];

  const categoriesSlot = [
    "All Game",
    "JiLiGaming",
    "KingMaker",
    "PGSoft",
    "AFBGaming",
    "Rich88",
    "CQNine",
    "Yggdrasil",
    "JokerGaming",
    "FlowGamingHub",
    "RedTiger",
    "ArcadiaGaming",
    "RelaxGaming",
    "MPoker",
    "YGR",
    "AdvantPlay",
    "Live22",
    "568WinGames",
    "TCGaming",
  ];

  const categoriesHot = [
    "All Game",
    "ION Live Casino",
    "Allbet",
    "World Match",
    "SBO Slot",
    "WM",
    "MicroGaming",
    "CQNineLC",
    "Sv388Cockfighting",
    "MicroGaming LiveCasino",
    "Habanero",
    "FunkyGames",
  ];

  const handleCategoryClick = (category: any) => {
    setActiveCategory(category);
  };
  const handleCategoryClickSlot = (category: any) => {
    setActiveCategorySlot(category);
  };

  const handleCategoryClickHot = (category: any) => {
    setActiveCategoryHot(category);
  };

  return (
    <div
      className={` flex flex-col gap-5 ${
        theme
          ? `text-[${themeChange.light.textColor1}]`
          : `text-[${themeChange.dark.textColor1}]`
      }  
      ${
        theme ? `bg-[${themeChange.light.bg2}]` : `bg-[${themeChange.dark.bg2}]`
      }
      `}
    >
      {/* announcement */}
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... -mt-[44px] lg:rounded-l-[8px] lg:rounded-r-[8px] lg:mt-[-20px] p-[2px] ml-[-3%] lg:ml-[0%] w-[106%] lg:w-[100%] ">
        <div className="flex w-[100%] items-center lg:rounded-l-[8px] lg:rounded-r-[8px] justify-between text-sm bg-[#D79C27]">
          <div className=" flex w-[8%] lg:w-[5%] justify-center   rounded-l-[8px] h-[100%]]">
            <Image className=" w-[30px] m-auto " src={announ} alt="" />
          </div>
          {/* @ts-ignore */}

          <marquee className={`w-[100%] text-[#212632] font-semibold  p-1`}>
            {logoAndFav?.marque || ""}
            {/* @ts-ignore */}
          </marquee>
          <div className="  rounded-r-[8px] w-[5%] p-2 h-[100%]"></div>
        </div>
      </div>

      {/* trending imges */}

      {/* after login */}
      <div className="md:hidden">
        <div className="flex  justify-between items-center mt-3 w-[100%]  ">
          <div className="w-[60%] flex flex-col gap-1 pl-3 text-white justify-center font-semibold  h-[100%] ">
            <p className="text-[16px]">{username}</p>
            <p className="text-sm">Exp : {exposure_limit}</p>
          </div>

          <div className="w-[80%] flex justify-between gap-2   ">
            <div className="flex flex-col  items-center  w-[100%]">
             
                <PamentModel code="4" heading="" />

              <p className="text-xs font-semibold text-white mt-2">Deposit</p>
            </div>

            <div className="flex flex-col items-center w-[100%]">
                <PamentModel code="5" heading="" />
              <p className="text-xs font-semibold text-white mt-2">withdraw</p>
            </div>
            <Link href="/refer&earn" className="flex flex-col items-center w-[100%]">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[8px] w-[100%]">
                <div className="flex flex-col gap-1 items-center rounded-[8px] p-2 bg-[#212632] w-[100%]">
                  <Image src={refer} alt="" className="h-[35px] w-[35px]" />
                </div>
              </div>
              <p className="text-xs font-semibold text-white mt-2">
                refer&earn
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* category button */}
      <div
        className={`flex gap-2 lg:gap-4 overflow-scroll  w-[100wh] font-semibold text-white ${
          theme ? "text-black" : "text-white"
        } `}
      >
        {category.map((item: any) => {
          return (
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... p-[1px] rounded-[12px] w-[100%]">
              <div
                onClick={() => handleActive(item.id)}
                className={` cursor-pointer ${
                  type === item.id ? "bg-yellow-600" : "bg-[#212632]"
                }  text-center lg:w-[100%] flex flex-col gap-1 items-center justify-center rounded-[12px] h-[70px] lg:h-[80px]  `}
              >
                {item.icon == "" ? item.icon2 : item.icon}
                <p className="font-medium w-[100px] lg:w-auto text-sm">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* //sport */}
      {type === 1 && (
        <div>
          <div className="grid  grid-cols-1 lg:grid-cols-3 justify-between gap-4">
            {sportbardata.map((item) => {
              return (
                <Link
                  href={item.link}
                  key={item.id}
                  className="w-[100%] cursor-pointer"
                >
                  <Image
                    src={item.img}
                    alt=""
                    className="w-[100%] h-[140px] lg:h-[160px] rounded-lg"
                  />
                </Link>
              );
            })}
          </div>

          <div className="md:contents hidden">
            {provider.length > 0 && (
              <div className="flex flex-col mt-5 gap-[40px]">
                {provider
                  .slice(13, 14)
                  .map(
                    (ele: any) =>
                      ele.status == true && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                        />
                      )
                  )}
              </div>
            )}
          </div>

          <div className="md:contents mt-3 hidden">
            {provider.length > 0 && (
              <div className="flex flex-col  gap-[40px]">
                {provider
                  .slice(12, 13)
                  .map(
                    (ele: any) =>
                      ele.status == true && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                        />
                      )
                  )}
              </div>
            )}
          </div>
        </div>
      )}

      {type === 2 && (
        <div className="grid  grid-cols-2  lg:grid-cols-3 justify-between gap-4">
          {casinodata.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.id}
                className="w-[100%] cursor-pointer"
              >
                <Image
                  src={item.img}
                  alt=""
                  className="w-[100%] h-[120px] lg:h-[160px] rounded-lg"
                />
              </Link>
            );
          })}
        </div>
      )}
      {type === 3 && (
        <div>
          <div className="">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Image src={sportBook} alt="" className="w-[35px] h-[35px]" />
                <p
                  className={`text-md font-semibold ${
                    theme ? "text-black" : "text-white"
                  }`}
                >
                  SportBook
                </p>
              </div>
            </div>
            <GameCard
              value={1}
              handleGame={handleGame}
              gameTypeData={SportsGameType}
            />
          </div>
        </div>
      )}

      {type === 4 && (
        <div>
          <div className="flex overflow-scroll w-[100wh] text-center mt-5  text-sm gap-2 text-white">
            {categories.map((category, index) => (
              <p
                key={index}
                className={` min-w-[150px] cursor-pointer font-bold ${
                  activeCategory === category
                    ? "border-b-[3px] rounded-lg border-yellow-600"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </p>
            ))}
          </div>
          <div className="mt-6">
            {loading ? 
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            :""}
            {provider.length > 0 && (
              <div className="flex flex-col gap-[40px]">
                {activeCategory === "All Game" &&
                  provider.map(
                    (ele: any) =>
                      ele.status === true &&
                      (ele.gpName === "EvolutionGaming" ||
                        ele.gpName === "SaGaming" ||
                        ele.gpName === "SexyBaccarat" ||
                        ele.gpName === "BigGaming" ||
                        ele.gpName === "Green Dragon" ||
                        ele.gpName === "PragmaticPlayCasino" ||
                        ele.gpName === "PlayTech Live Casino" ||
                        ele.gpName === "OGLive" ||
                        ele.gpName === "WE Casino" ||
                        ele.gpName === "AsiaGaming") && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                        />
                      )
                  )}
                {activeCategory !== "All Game" &&
                  provider.map(
                    (ele: any) =>
                      ele.status === true &&
                      ele.gpName === activeCategory && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                          activeCategory="All Game"
                        />
                      )
                  )}
              </div>
            )}
          </div>
        </div>
      )}

      {type === 5 && (
        <div>
          <div className="flex overflow-scroll w-[100wh] text-center mt-5  text-sm gap-2 text-white">
            {categoriesSlot.map((category, index) => (
              <p
                key={index}
                className={` min-w-[150px] cursor-pointer font-bold ${
                  activeCategorySlot === category
                    ? "border-b-[3px] rounded-lg border-yellow-600"
                    : ""
                }`}
                onClick={() => handleCategoryClickSlot(category)}
              >
                {category}
              </p>
            ))}
          </div>
          <div className="mt-6">
            {provider.length === 0 && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            )}
            {provider.length > 0 && (
              <div className="flex flex-col gap-[40px]">
                {activeCategorySlot === "All Game" &&
                  provider.map(
                    (ele: any) =>
                      ele.status === true &&
                      (ele.gpName === "CQNine" ||
                        ele.gpName === "JokerGaming" ||
                        ele.gpName === "Yggdrasil" ||
                        ele.gpName === "PGSoft" ||
                        ele.gpName === "FlowGamingHub" ||
                        ele.gpName === "JiLiGaming" ||
                        ele.gpName === "RedTiger" ||
                        ele.gpName === "ArcadiaGaming" ||
                        ele.gpName === "RelaxGaming" ||
                        ele.gpName === "MPoker" ||
                        ele.gpName === "AFBGaming" ||
                        ele.gpName === "YGR" ||
                        ele.gpName === "AdvantPlay" ||
                        ele.gpName === "Live22" ||
                        ele.gpName === "568WinGames" ||
                        ele.gpName === "Rich88" ||
                        ele.gpName === "KingMaker" ||
                        ele.gpName === "TCGaming") && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                        />
                      )
                  )}
                {activeCategorySlot !== "All Game" &&
                  provider.map(
                    (ele: any) =>
                      ele.status === true &&
                      ele.gpName === activeCategorySlot && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                          activeCategory="All Game"
                        />
                      )
                  )}
              </div>
            )}
          </div>
        </div>
      )}

      {type === 6 && (
        <div>
          <div className="flex overflow-scroll w-[100wh] text-center mt-5  text-sm gap-2 text-white">
            {categoriesHot.map((category, index) => (
              <p
                key={index}
                className={` min-w-[150px] cursor-pointer font-bold ${
                  activeCategoryHot === category
                    ? "border-b-[3px] rounded-lg border-yellow-600"
                    : ""
                }`}
                onClick={() => handleCategoryClickHot(category)}
              >
                {category}
              </p>
            ))}
          </div>
          <div className="mt-6">
            {provider.length === 0 && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            )}
            {provider.length > 0 && (
              <div className="flex flex-col gap-[40px]">
                {activeCategoryHot === "All Game" &&
                  provider.map(
                    (ele: any) =>
                      ele.status === true &&
                      (ele.gpName === "WM" ||
                        ele.gpName === "ION Live Casino" ||
                        ele.gpName === "World Match" ||
                        ele.gpName === "SBO Slot" ||
                        ele.gpName === "FunkyGames" ||
                        ele.gpName === "Allbet" ||
                        ele.gpName === "MicroGaming" ||
                        ele.gpName === "CQNineLC" ||
                        ele.gpName === "Sv388Cockfighting" ||
                        ele.gpName === "Habanero" ||
                        ele.gpName === "MicroGaming LiveCasino") && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                        />
                      )
                  )}
                {activeCategoryHot !== "All Game" &&
                  provider.map(
                    (ele: any) =>
                      ele.status === true &&
                      ele.gpName === activeCategoryHot && (
                        <SeamlessGame
                          gpName={ele.gpName}
                          id={ele.gpId}
                          key={ele.gpId}
                          activeCategory="All Game"
                        />
                      )
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
