"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import coin from "../../../../asset/rupees.png";
import pimg from "../../../../asset/profile/Frame 24 1.png";
import { useParams, useSearchParams } from "next/navigation";
import { DepositTransaction } from "../../../../../utils/typescript.module";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";
import { CircularProgress, useToast } from "@chakra-ui/react";
const MainComponent = () => {
  const [depositData, setDepositData] = useState<DepositTransaction>();
  const [loading, setLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>();
  const { id } = useParams();
  const toast = useToast();
  console.log(id);

  const getDepositDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/get-single-deposit/${id}?`;
    try {
      let response = await fetchGetRequest(url);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      console.log(data, "deposite single in compnonet");
      if (receivedData) {
        setDepositData(receivedData);
      }
      setLoading(false);
      console.log(data);
    } catch (error: any) {
      toast({
        description: `${error.data.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getDepositDetails();
  }, []);

  const approvedDeposit = async () => {
    setDepositLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/update-single-deposit/${id}?`;
    try {
      const updatedata = { status: "approved" };

      let response = await sendPatchRequest(url, updatedata);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      console.log(data, "update single in compnonet");
      if (receivedData) {
        setDepositData(receivedData);
        toast({
          description: `Approved Succesfully`,
          status: "success",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      }
      setDepositLoading(false);
      console.log(data);
    } catch (error: any) {
      toast({
        description: `${error.message}`,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
      setDepositLoading(false);
    }
  };
  const rejectDeposit = async () => {
    setLoading1(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transaction/update-single-deposit/${id}?`;
    try {
      const updatedata = { status: "reject" };

      let response = await sendPatchRequest(url, updatedata);
      const data = response.data;
      const receivedData: DepositTransaction = response.data;
      console.log(data, "update single in compnonet");
      if (receivedData) {
        setDepositData(receivedData);
        toast({
          description: `Reject Succesfully`,
          status: "warning",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
      setLoading1(false);
      console.log(data);
    } catch (error: any) {
      toast({
        description: `${error.data.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading1(false);
      console.log(error);
    }
  };

  const handleApproved = () => {
    approvedDeposit();
  };

  const handleReject = () => {
    rejectDeposit();
  };

  return (
    <div className=" w-[95%] lg:w-[80%] flex flex-col lg:flex-row gap-8 mt-8  m-auto">
      <div className="flex w-[90%] m-auto lg:w-[35%] flex-col gap-2 ">
        <div
          style={{
            background:
              "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
          }}
          className="w-[90%] flex m-auto  relative items-center justify-center rounded-[20px]  h-[190px]"
        >
          <p className="text-white absolute left-3 top-3 text-xs font-bold ">
            Deposit Via {depositData?.method}
          </p>
          <img
            src={depositData?.method_url}
            className="w-[90px] rounded-[50%] h-[90px]"
            alt=""
          />
        </div>

        <div
          style={{
            background:
              "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
          }}
          className=" p-1  rounded-[20px] w-[100%]"
        >
          <p className="text-white p-3  text-xs font-bold ">Deposit Bill</p>
          <div className="flex flex-col   mt-2">
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Date</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.initiated_at}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">
                Transaction Number
              </p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.transaction_id}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Username</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.username}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Method</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.method}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Amount</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.deposit_amount}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Wallet Amount</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.wallet_amount}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">After Deposit</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.after_deposit}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Payable</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.payable}
              </p>
            </div>
            <div className="flex justify-between w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-medium text-xs">Status</p>
              <button
                className={`text-[#fff] p-[4px] px-2 rounded-lg ${
                  depositData?.status === "pending"
                    ? "bg-[#CEB352]"
                    : depositData?.status === "approved"
                    ? "bg-[green]"
                    : "bg-[red]"
                } font-medium text-[10px]`}
              >
                {depositData?.status}
              </button>
            </div>

            {/* if status is rejected then */}
            <div className="flex flex-col gap-1 w-[100%] p-3 border-t border-gray-600">
              <p className="text-[#fff] font-bold text-sm">Admin Response</p>
              <p className="text-[#fff] font-medium text-xs">
                {depositData?.admin_response}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background:
            "linear-gradient(to bottom, rgba(6, 11, 40, 0.94), rgba(10, 14, 35, 0.49))",
        }}
        className=" w-[100%] lg:w-[45%] p-3 rounded-[20px] h-[100%]  "
      >
        <p className="text-white p-3  text-xs font-bold ">
          User Deposite Information
        </p>
        <div className="flex flex-col gap-4 mt-3">
          <div className="text-xs p-3 text-white flex flex-col gap-1">
            <label className="text-[10px] font-medium">Old Psssword</label>
            <div className="w-[80%] flex justify-between items-center  border outline-none bg-[#05183A] rounded-xl p-3">
              <p>123121231231232</p>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    d="M15.7496 12.2622V16.987C15.7496 20.9244 14.1746 22.4994 10.2372 22.4994H5.51235C1.57496 22.4994 0 20.9244 0 16.987V12.2622C0 8.32477 1.57496 6.74982 5.51235 6.74982H10.2372C14.1746 6.74982 15.7496 8.32477 15.7496 12.2622Z"
                    fill="white"
                  />
                  <path
                    d="M16.9896 0H12.2647C8.79627 0 7.16963 1.23082 6.83076 4.20627C6.75986 4.82876 7.2754 5.3436 7.90191 5.3436H10.2397C14.9646 5.3436 17.1583 7.53729 17.1583 12.2622V14.6C17.1583 15.2265 17.6731 15.742 18.2956 15.6712C21.2711 15.3322 22.5019 13.7056 22.5019 10.2372V5.51235C22.5019 1.57496 20.9269 0 16.9896 0Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className=" ">
            <p className="text-white   text-xs font-bold ">Deposit Slip</p>
            <div className="w-[100%] mt-3  rounded-sm">
              <img
                src={depositData?.deposit_slip}
                className="w-[100%] max-h-[400px]"
                alt=""
              />
            </div>

            {/* if status is pending then */}
            {depositData?.status === "pending" && (
              <div className="pl-3 mt-4 flex w-[100%] justify-between">
                <button
                  disabled={depositLoading || loading1}
                  onClick={handleApproved}
                  className="text-[#fff] p-[6px] px-2 rounded-lg bg-[#46F2099E] font-semibo;d text-xs"
                >
                  {depositLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size={"16px"}
                      color="orange.600"
                    />
                  ) : (
                    "Approved"
                  )}
                </button>

                <button
                  disabled={depositLoading || loading1}
                  onClick={handleReject}
                  className="text-[#fff] p-[6px] px-3 rounded-lg bg-[#FF2222B5] font-semibold text-xs"
                >
                  {loading1 ? (
                    <CircularProgress
                      isIndeterminate
                      color="orange.600"
                      size={"16px"}
                    />
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
