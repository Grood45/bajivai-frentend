"use client";

import { FaPersonSnowboarding } from "react-icons/fa6";
import { BiFootball } from "react-icons/bi";

import { TbCricket } from "react-icons/tb";

import { BiSolidFlagCheckered } from "react-icons/bi";

import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  Badge,
  extendTheme,
  ChakraProvider,
  Box,
  Button,
  Checkbox,
  Icon,
  Divider,
  Text,
  Progress,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import axios from "axios";
import { fetchGetRequest, sendPatchRequest } from "@/api/api";

// import { useSearchParams } from "react-router-dom";
declare module "csstype" {
  interface Properties {
    "--chakra-colors-blue-500"?: string;
  }
}
function DashboardTable() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [selectedMatches, setSelectedMatches] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [allData, setAllData] = useState<any>([]);
  const [betCategory, setBetCategory] = useState<any>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setquery] = useState<any>("");
  const [result, setResult] = useState<any>("");
  const [pagination, setPagination] = useState<any>({});
  const totalPages = allData?.pagination?.totalPages || 0; // Replace with your total number of pages
  const toast = useToast();
  const getAlldashboardDetails = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/bet/get-all-bet-for-result?page=${currentPage}&limit=20`;
    if (search) {
      url += `&search=${search}`;
    }
    if (betCategory) {
      url += `&bet_category=${betCategory}`;
    }

    try {
      let response = await fetchGetRequest(url);
      const data = response;
      setAllData(data);
      setPagination(data.pagination);
      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      getAlldashboardDetails();
    }, 700);

    return () => clearTimeout(id);
  }, [currentPage, search, betCategory]);


  const data = [
    {
      title: "Odds Bets",
      value: allData?.totalOdds || 0,
      icon: BiFootball,
      bg1: "#FEA21F",
      name: "odds",
    },
    {
      title: "Bookmaker Bets",
      value: allData?.totalBookmaker || 0,
      icon: BiSolidFlagCheckered,
      bg1: "#29292C",
      name: "bookmaker",
    },
    {
      title: "Fancy Bets",
      value: allData?.totalFancy || 0,
      icon: TbCricket,
      bg1: "#E12C6C",
      name: "fancy",
    },

    {
      title: "Toss Bets",
      value: allData?.totaToss || 0,
      icon: FaPersonSnowboarding,
      bg1: "#EC4C49",
      name: "toss",
    },
  ];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelect = (e: any, _id: any) => {
    const value = e.target.checked;

    // Check if the checkbox is checked or unchecked
    if (value) {
      // If checked, add the _id to the selectedMatches array
      setSelectedMatches((prev: any) => [...prev, _id]);
    } else {
      // If unchecked, remove the _id from the selectedMatches array
      setSelectedMatches((prev: any) => prev.filter((id: any) => id !== _id));
    }
  };
  const handleSelectAll = () => {
    // Check if all checkboxes are currently selected
    const allSelected = selectedMatches.length === allData.data.length;

    if (allSelected) {
      // Deselect all checkboxes
      setSelectedMatches([]);
    } else {
      // Select all checkboxes by creating an array of all _ids
      const allMatchIds = allData.data.map((row: any) => row._id);
      setSelectedMatches(allMatchIds);
    }
  };

  const handleResult = (_id: any, res: any) => {
    if (_id) {
      setSelectedMatches((prev: any) => [_id]);
    }

    setResult(res);
    onOpen();
  };

  const handleConfirmResult = async () => {
    let payload = { user_ids: selectedMatches, answer: result };
    try {
      let response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/result/update-fancy-toss-result`,
        payload
      );
      toast({
        description: response.message,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      getAlldashboardDetails();
      onClose();
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error?.data?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };
  return (
    <Box>
      <Box>
        <Flex
          as="nav"
          justify="space-between"
          align={"center"}
          padding="1rem"
          paddingLeft="2rem"
          bg={"none"}
          color="white"
          rounded={"lg"}
        >
          <Box className="mt-5">
            <Text className={"text-gray-500 font-medium"}>
              Pages / <span className={`text-gray-600`}>Sport Admin </span>
            </Text>
            <Text
              className={`font-bold text-[#344767] text-left text-lg sm:text-lg `}
            >
              Sport Admin
            </Text>
          </Box>
        </Flex>
      </Box>
      <div className="   gap-6 p-2 ">
        <div
          className={`grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-auto gap-6 p-6`}
        >
          {data.map((item, index) => (
            <Box
              className=""
              key={index}
              p="10px"
              gap={2}
              bg={"#FFFFFF"}
              borderRadius="16px"
              height={"170px"}
              width={"100%"}
              boxShadow="rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
              justifyContent="space-between"
              position={"relative"}
              mb="1rem"
            >
              <Box
                bg={item.bg1}
                boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
                position="relative"
                top="-7"
                left="0"
                width={"65px"}
                height={"65px"}
                rounded={"xl"}
                justifyContent={"center"}
                alignItems={"center"}
                p={"4"}
              >
                <Icon as={item.icon} fill={"white"} boxSize={6} color="white" />
              </Box>

              <Box
                justifyContent={"space-between"}
                className={` absolute top-2 right-4`}
                color={"black"}
              >
                <Text className={`text-gray-500`}>{item.title}</Text>
                <Text className={`font-bold text-[#344767] text-2xl`}>
                  {item.value}
                </Text>
              </Box>
              <Box className={`mt-[10px]  flex flex-col `}>
                <Divider />
                <Divider />

                <Button
                  style={{ backgroundColor: "white" }}
                  size={"10px"}
                  onClick={() => setBetCategory(item.name)}
                  className={`border mt-[10px] border-gray-600  w-[45%] p-2  font-bold cursor-pointer`}
                >
                  View ALL
                </Button>
              </Box>
            </Box>
          ))}
        </div>
      </div>

      <Box
        boxShadow="rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
        p={5}
        m={"4"}
        bg={"white"}
        rounded={"lg"}
        width={"100%"}
      >
        <Box className="flex justify-between mb-6">
          <Input
            width="50%"
            placeholder={"search"}
            value={search}
            onChange={(e) => setquery(e.target.value)}
            className="w-[400px] p-2"
          />
          <Box className="flex gap-2">
            <button
              onClick={() => handleResult("", "win")}
              disabled={selectedMatches.length == 0}
              className="px-2 rounded-lg w-[70px] text-white font-semibold text-[12px] bg-[#4CAF50] "
            >
              WIN
            </button>
            <button
              onClick={() => handleResult("", "lose")}
              disabled={selectedMatches.length == 0}
              className="px-2 rounded-lg w-[70px] text-white font-semibold text-[12px] bg-[#F44335] "
            >
              LOSS
            </button>
            <button
              onClick={() => handleResult("", "refund")}
              disabled={selectedMatches.length == 0}
              className="px-2 rounded-lg w-[90px] text-white font-semibold text-[12px] bg-[#FB8C00] "
            >
              REFUND
            </button>
          </Box>
        </Box>
        <div className="container overflow-scroll w-[100%]">
          {loading && (
            <Progress size="xs" isIndeterminate colorScheme="#e91e63" />
          )}
          <Table
            variant="striped"
            colorScheme="primary"
            className="table table-hover bet-table"
          >
            <Thead bg="primary" className=" bg-[#E91E63]">
              <Tr>
                <Td>
                  <Checkbox
                    size={"lg"}
                    style={{
                      "--chakra-colors-blue-500": "blue-500",
                      // border: "1px solid green",
                    }}
                    isChecked={selectedMatches.length === allData?.data?.length}
                    onChange={handleSelectAll}
                  />
                </Td>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  DATE
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  USER
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  SPORT
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  LEAGUE
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  MATCH
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  Questions
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  Rate, Yes/No
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  INVAST AMOUNT
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  WIN AMOUNT
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  LOSS AMOUNT
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  BET TYPE
                </Th>

                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  BET CATEGORY
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  RESULT
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  TEAM
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  STATELMENT
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!loading &&
                allData?.data?.length &&
                allData.data.map((row: any, index: any) => (
                  <Tr
                    key={index}
                    className={` ${
                      row.bet_type === "lay" ? "bg-[#E99CAD]" : "bg-[#6AADDC]"
                    } hover:bg-[#E99CAD]`}
                  >
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <div className="flex gap-6">
                        {row.bet_category !== "odds" &&
                          row.bet_category !== "bookmaker" && (
                            <Checkbox
                              size={"lg"}
                              // defaultChecked
                              style={{
                                "--chakra-colors-blue-500": "#e91e63",
                                border: "1px solid #e91e63",
                              }}
                              onChange={(e) => handleSelect(e, row._id)}
                              isChecked={selectedMatches.includes(row._id)}
                              disabled={row.result !== "pending"}
                            />
                          )}
                      </div>
                    </Td>
                    <Td>{row.updated_at}</Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.username}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.sport}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.league_name}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.match_name}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {!row.question?"N/A":row.question}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      rate Yes/no
                    </Td>

                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.stake}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.rate * row.stake}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.stake}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.bet_type}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.bet_category}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.status}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.team}
                    </Td>
                    <Td style={{ whiteSpace: "nowrap", textTransform: "none" }}>
                      {row.status === "pending" &&
                      (row.bet_category === "toss" ||
                        row.bet_category === "fancy") ? (
                        <Box className="flex gap-2">
                          <button
                            onClick={() => handleResult(row._id, "win")}
                            className="p-[6px] rounded-lg w-[70px] text-[#4CAF50] border border-[#4CAF50] font-bold text-[12px] bg-[white] "
                          >
                            WIN
                          </button>
                          <button
                            onClick={() => handleResult(row._id, "lose")}
                            className="p-[6px] rounded-lg w-[70px] text-[#F44335] border border-[#F44335] font-bold text-[12px] bg-[white] "
                          >
                            LOSS
                          </button>
                          <button
                            onClick={() => handleResult(row._id, "refund")}
                            className="p-2 rounded-lg w-[90px] text-[#FB8C00] border border-[#FB8C00] font-bold text-[12px] bg-[white] "
                          >
                            REFUND
                          </button>
                        </Box>
                      ) : row.status === "pending" &&
                        (row.bet_category === "bookmaker" ||
                          row.bet_category === "odds") ? (
                        <Badge
                          fontWeight={"bold"}
                          margin={"auto"}
                          color="white"
                          colorScheme="red"
                          bg={"red"}
                          width={"30px"}
                          alignItems={"center"}
                          textAlign={"center"}
                          display={"flex"}
                        >
                          N/A
                        </Badge>
                      ) : (
                        <Badge
                          fontWeight={"bold"}
                          margin={"auto"}
                          color="white"
                          colorScheme="green"
                          bg={"green"}
                          width={"72px"}
                          alignItems={"center"}
                          textAlign={"center"}
                          display={"flex"}
                        >
                          DECLAIRED
                        </Badge>
                      )}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
        {data && data.length > 0 && (
          <div className="text-[16px] flex m-auto justify-end gap-3 align-middle items-center p-6">
            <span className="ag-paging-row-summary-panel">
              <span>{(currentPage - 1) * 20 || 1}</span> to{" "}
              <span>{20 * currentPage}</span> of{" "}
              <span>{pagination.totalItems}</span>
            </span>
            <span className="">
              <Button
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px]"
                disabled={currentPage == 1}
                onClick={() => setCurrentPage(1)}
                style={{ backgroundColor: "#e91e63", color: "white" }}
              >
                {"First"}
              </Button>
              <Button
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px] mr-1"
                // ref="btPrevious"
                onClick={() => handlePrevPage()}
                disabled={currentPage == 1}
                style={{ backgroundColor: "#e91e63", color: "white" }}
              >
                {"<"}
              </Button>
              Page <span>{currentPage}</span> of{" "}
              <span>{pagination.totalPages}</span>
              <Button
                onClick={() => handleNextPage()}
                type="button"
                disabled={currentPage == pagination.totalPages}
                className="ml-1 disabled:text-gray-400 text-[20px]"
                style={{ backgroundColor: "#e91e63", color: "white" }}
              >
                {">"}
              </Button>
              <Button
                onClick={() => setCurrentPage(pagination.totalPages)}
                type="button"
                className="ml-1 disabled:text-gray-400 text-[20px]"
                disabled={currentPage == pagination.totalPages}
                style={{ backgroundColor: "#e91e63", color: "white" }}
              >
                {"Last"}
              </Button>
            </span>
          </div>
        )}
      </Box>
      <ConfirmModal
        handleConfirmResult={handleConfirmResult}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
}

export default DashboardTable;

function ConfirmModal({
  handleConfirmResult,
  onOpen,
  isOpen,
  onClose,
}: {
  handleConfirmResult: any;
  onOpen: any;
  isOpen: any;
  onClose: any;
}) {
  const cancelRef = React.useRef<any>();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Result Declaire?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want declaire the result ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleConfirmResult}>
              Confirm
            </Button>
            <Button colorScheme="red" ml={3} onClick={onClose}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
