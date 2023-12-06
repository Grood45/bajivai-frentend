"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../asset/logo.png";
import "../usermanage/usermanage.css";
import { TbCoin } from "react-icons/tb";
import { SlScreenDesktop } from "react-icons/sl";
import { BiSolidWalletAlt } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";
import { VscUnverified } from "react-icons/vsc";
import { BsSearch } from "react-icons/bs";
import coin from "../../../asset/rupees.png";
import pimg from "../../../asset/profile/Frame 24 1.png";
import Link from "next/link";
import { fetchGetRequest } from "@/api/api";
import {
  DepositTransaction,
  TransactionsCount,
} from "../../../../utils/typescript.module";
import { Button, CircularProgress, Progress, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { getTimeAgo } from "../../../../utils/getTimeInDetail";

const MainComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allDeposit, setAllDeposit] = useState<DepositTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState("all");
  const [search, setSearch] = useState<string>("");
  const [transactionCount, aetTransactionCount] = useState<TransactionsCount>();
  const toast = useToast();
  const params = useParams();
  const getAllDepositDetails = async () => {
    setLoading(true);
    // let url = `http://localhost:8090/api/transaction/get-all-deposit?page=1&limit=10`;
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-all-deposit?page=1&limit=10`;

    if (transactionType) {
      url += `&transaction_type=${transactionType}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    // alert(url)
    try {
      let response = await fetchGetRequest(url);
      setAllDeposit(response.data);
      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      getAllDepositDetails();
    }, 700);
    return () => clearTimeout(id);
  }, [currentPage, transactionType]);

  const handleFilter = (name: string) => {
    setTransactionType(name);
  };

  const data1 = [
    {
      id: 1,
      title: "All Deposit",
      balance: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        transactionCount?.allTransaction || 0
      ),
      name: "all",
      profit: "+53%",
      icon: <BiSolidWalletAlt fontSize={"20px"} color="white" />,
    },
    {
      id: 2,
      title: "Pending Deposit",
      balance: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        transactionCount?.pendingTransaction || 0
      ),

      name: "pending",
      profit: "+5%",
      icon: <AiOutlineGlobal fontSize={"20px"} color="white" />,
    },
    {
      id: 3,
      title: "Successful Deposit",
      name: "approved",
      balance: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        transactionCount?.approvedTransaction || 0
      ),
      profit: "",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
    {
      id: 4,
      title: "Reject Deposit",
      name: "reject",
      balance: loading ? (
        <CircularProgress isIndeterminate color="orange.600" size={"16px"} />
      ) : (
        transactionCount?.rejectTransaction || 0
      ),
      profit: "+5%",
      icon: <VscUnverified fontSize={"20px"} color="white" />,
    },
  ];

  return (
    <div className=" ">
      {/* four-card */}
      <div className="flex flex-col  lg:flex-row justify-between  items-center">
        <div className=" grid grid-cols-1  lg:grid-cols-2  w-[100%]   gap-4 mt-[30px] justify-between">
          {data1.map((item) => {
            return (
              <div
                onClick={() => setTransactionType(item.name)}
                key={item.id}
                style={{
                  background:
                    item.id === 1
                      ? "linear-gradient(127deg, rgba(147, 255, 9, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)"
                      : item.id === 2
                      ? "linear-gradient(127deg, #FFD702 34.81%, rgba(26, 31, 55, 0.50) 91.2%)"
                      : item.id === 3
                      ? "linear-gradient(127deg, rgba(147, 255, 9, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%)"
                      : item.id === 4
                      ? "linear-gradient(127deg, rgba(210, 0, 0, 0.74) 28.26%, rgba(26, 31, 55, 0.50) 91.2%"
                      : undefined,
                }}
                className={`p-3 w-[100%] cursor-pointer  rounded-[8px] flex items-center justify-between`}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white text-xs font-medium ">
                    {item.title}
                  </p>
                  <div className="flex text-white items-center text-sm font-semibold gap-4">
                    <div className="flex items-center gap-2">
                      <Image src={coin} alt="" className="h-[15px] w-[15px]" />
                      <p>{item.balance}</p>
                    </div>
                    {/* <span className="text-[black] text-xs">{item.profit}</span> */}
                  </div>
                </div>
                <span
                  className={`rounded-[30%]  p-2  bg-[#0075FF] flex items-center justify-center `}
                >
                  {item.icon}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 mt-5  justify-between items-center w-[100%]">
          <div className="input-group w-[100%] lg:w-[70%]">
            <input
              type="email"
              className={`input text-white text-sm`}
              id="Email"
              name="Email"
              placeholder="Select the range..........."
            />
            <button className={`button--submit flex items-center text-white`}>
              <BsSearch color="white" fontSize="20px" />
            </button>
          </div>

          <div className="input-group  w-[100%] lg:w-[70%]">
            <input
              type="email"
              className={`input text-white text-sm `}
              id="Email"
              name="Email"
              value={search}
              placeholder="Search the keyword..........."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={`button--submit flex items-center text-white`}>
              <BsSearch color="white" fontSize="20px" />
            </button>
          </div>
        </div>
      </div>

      {/* table */}
 

      <div className="hidden md:contents">
        <div
          style={{
            background:
              "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
          }}
          className="h-[100%] rounded-[16px] p-3  w-[100%]  mt-8 "
        >
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <p className="text-white font-semibold text-sm pb-2 pt-2 text-left">
            All Deposit Details
          </p>
          <table className="w-[100%] ">
            <tr className="text-center p-2   border-b h-[30px] border-gray-600 text-[10px] font-bold text-[#A0AEC0]">
              <th className="text-left">Geteway / Trx</th>
              <th>Initiated</th>
              <th>User/UserId</th>
              <th>Deposite Amount</th>
              <th>Wallet Balance</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
            {allDeposit.length>0 &&
              allDeposit.map((item) => 
    
                  <tr
                    key={item._id}
                    className="text-left  h-[60px] m-auto  border-b border-gray-600 text-xs text-white"
                  >
                    <td>
                      <div className="flex flex-col gap-[2px]  ">
                        <p>{item.method}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {item.transaction_id}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-[2px] ">
                        <p>{item.initiated_at}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {getTimeAgo(item.initiated_at)}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-[2px] ">
                        <p>{item.username}</p>
                        <p className="text-xs  text-[#A0AEC0] ">
                          {item.user_id}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col text-center gap-[2px]">
                        <p className="text-[16px] ">
                          <span>&#8377;</span> {item.deposit_amount} +{" "}
                          <span className="text-xs text-red-500 ">
                            {item.bonus}
                          </span>
                        </p>
                        <p className="text-xs  text-[#A0AEC0]  ">
                          {item.deposit_amount + item.bonus} INR
                        </p>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex   justify-center text-center items-center gap-2">
                        <Image
                          src={coin}
                          alt=""
                          className="h-[15px] w-[15px]"
                        />
                        <span>{item.wallet_amount}</span>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col items-center justify-between gap-[4px]  ">
                        <button
                          className={`py-[4px] px-1 m-auto rounded-[4px]   ${
                            item.status == "approved"
                              ? "bg-[#01B574]"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {item.status}
                        </button>
                        <p className="text-[10px] text-center  text-[#A0AEC0] ">
                          {getTimeAgo(item.initiated_at)}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className=" flex justify-end">
                        <Link
                          key={item._id}
                          href={`/admin/depositmanage/${item._id}`}
                        >
                          <SlScreenDesktop
                            cursor="pointer"
                            color="white"
                            fontSize="20px"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                
              )}
          </table>
        </div>
      </div>


      {/* card show instead of table    */}



      <div className=" contents md:hidden pb-4 ">
        <p className="text-white font-bold text-md mt-8">All Deposit details</p>
        <div className="flex flex-col gap-4 mt-2">
          {allDeposit &&
            allDeposit.map((item) => {
              return (
                <div
                  key={item._id}
                  style={{
                    background:
                      "linear-gradient(127deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%",
                  }}
                  className=" p-2 flex flex-col gap-3 rounded-[20px] w-[100%]"
                >
                  <div className="flex items-center justify-between  w-[100%] ">
                    <p className="text-white p-3  text-xs font-bold ">
                      User Details
                    </p>
                    <button className="text-[#fff] h-[20px] px-2 p-1 rounded-lg bg-green-600 font-medium text-[10px]">
                      Online
                    </button>
                  </div>
                  <div className="flex  justify-start gap-4">
                    <img
                      src={item.deposit_slip}
                      alt="logo"
                      className="h-[50px] rounded-[50%] border border-[#A0AEC0]  w-[50px]"
                    />
                    <div className="flex gap-[2px] flex-col ">
                      <p className="text-white">{item.username}</p>
                      <p className="text-xs  text-[#A0AEC0] ">{item.user_id}</p>
                    </div>
                  </div>

                  <div className="flex flex-col  ">
                    <div className="flex gap-3 w-[100%] p-3 ">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Getway:-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {item.method}{" "}
                        <span className="text-[#A0AEC0] text-[10px]">
                          {item.transaction_id}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Initiated :-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        {item.initiated_at.split(" ")[0]}{" "}
                        <span className="text-[#A0AEC0] text-[10px]">
                          {item.initiated_at.split(" ")[1]}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-4 w-[100%] p-3 ">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Deposit Amount :-
                      </p>
                      <p className="text-[#fff] font-medium text-xs">
                        ${item.deposit_amount}
                      </p>
                    </div>

                    <div className="flex gap-4 w-[100%] p-3">
                      <p className="text-[#A0AEC0] font-medium text-xs">
                        Balance:-
                      </p>
                      <div className="flex justify-center items-center gap-2">
                        <Image
                          src={coin}
                          alt=""
                          className="h-[15px] w-[15px]"
                        />
                        <p className="text-white text-xs">
                          {item.wallet_amount}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end p-3">
                      <Link
                        key={item._id}
                        href={`/admin/depositmanage/${item._id}`}
                      >
                        <button className="p-[6px] px-2 text-xs text-white rounded-[4px] bg-none border ">
                          View All
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
