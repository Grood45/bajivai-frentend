"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Badge,
  extendTheme,
  ChakraProvider,
  Box,
  Button,
  Flex,
  Text,
  Checkbox,
  useToast,
  Progress,
  Spinner,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { fetchGetRequest, sendDeleteRequest, sendPatchRequest, sendPostRequest } from "@/api/api";
import DateRangePicker from "./CalenderDateSelect";
import axios from "axios";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});

const theme = extendTheme({
  breakpoints,
});

function CompetitionTable() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);
  const [search, setSearch] = useState<any>("");
  const [index, setIndex] = useState<any>("");
  const [matches, setMatches] = useState<any>([]);
  const [leagues, setLeagues] = useState<any>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
const [deleteLoading,setDeleteLoading]=useState(false)
const [deleteAllLoading,setDeleteAllLoading]=useState(false)

const [selectedDeleteMatches, setSelectDelete] = useState<any>([]);

  const totalPages: any = pagination.totalPages; // Replace with your total number of pages
  const toast = useToast();

  const GetAllMatches = async () => {
    setLoading(true);
    let url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/match/get-all-match?page=${currentPage}&limit=${20}`;
    if (search) {
      url += `&name=${search}`;
    }

    try {
      const response = await fetchGetRequest(url);
      setMatches(response.data);
      setPagination(response.pagination);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Fetch Data.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleStatus = async (match: any, match_id: any, index: any) => {
    setIndex(index);
    let status = match.status == true ? false : true;
    setLoading(true);
    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/update-match-status/${match_id}`
      );
      setLoading(false);
      const updatedData = matches.map((ele: any) => {
        if (match_id === ele.match_id) {
          ele.status = status;
          return ele;
        } else {
          return ele;
        }
      });
      setLoading(false);
      setMatches(updatedData);
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    let id: any;
    id = setTimeout(() => {
      GetAllMatches();
    }, 700);
    return () => clearTimeout(id);
  }, [currentPage, search]);

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

  const handleImage = async (imageurl: any, league: any,value:string) => {
    const id = league.match_id;
    try {
      const payload = {
        first_team_logo:imageurl,
      };
      const payload1 = {
        second_team_logo: imageurl,
      };
      let final=value==="0"?payload:payload1
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/update-team-logo/${id}`,final
      );
      const updatedData = matches.map((ele: any) => {
        if (league.match_id === ele.match_id) {
          ele = response.data;
          return ele;
        } else {
          return ele;
        }
      });
      setMatches(updatedData);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Update Status.",
        description: `${error.data.error}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleImageUrlChange = async (event: any, row: any,value:string) => {
    const file = event.target.files[0];

    if (file) {
      const imageurl = await handleImageUpload(file);
      handleImage(imageurl, row,value);
    }
  };

  const handleImageUpload = async (file: File) => {
    setImageLoading(true);
    const formData = new FormData();
    formData.append("post_img", file);
    try {
      const response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/image-url`,
        formData
      );
      if (response.url) {
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setImageLoading(false);
        return response.url;
      }
    } catch (error: any) {
      toast({
        title: error?.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setImageLoading(false);
      return null;
    }
  };

  const handleSelect = (e: any, _id: any) => {
    const value = e.target.checked;

    // Check if the checkbox is checked or unchecked
    if (value) {
      // If checked, add the _id to the selectedMatches array
      setSelectDelete((prev: any) => [...prev, _id]);
    } else {
      // If unchecked, remove the _id from the selectedMatches array
      setSelectDelete((prev: any) => prev.filter((id: any) => id !== _id));
    }
  };

  const handleSelectAll = () => {
    // Check if all checkboxes are currently selected
    const allSelected = selectedDeleteMatches.length === matches.length;

    if (allSelected) {
      // Deselect all checkboxes
      setSelectDelete([]);
    } else {
      // Select all checkboxes by creating an array of all _ids
      const allMatchIds = matches.map((row: any) => row.match_id);
      setSelectDelete(allMatchIds);
    }
  };


  const handleDeleteMatch = async (match_id: any) => {
    setDeleteLoading(true);
    try {
        let payload: any = { match_ids: [match_id] };
        console.log(payload, "payload");
        let response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/match/delete-previous-match`, { data: payload });
        toast({
            title: response?.data?.message,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
        setDeleteLoading(false);
        
        // Update matches after deletion
        const updatedMatches = matches.filter((match: any) => {
          return match.match_id !== match_id; // Use strict comparison
        });
        console.log(updatedMatches,"updatematch")
        setMatches(updatedMatches);
    } catch (err: any) {
        setDeleteLoading(false);
        console.log(err, "err");
        toast({
            title: err?.data?.message,
            status: "error",
            duration: 2000,
            isClosable: true,
        });
    }
};

const handleDeleteSelectedMatch=async()=>{
  setDeleteLoading(true);
  if(selectedDeleteMatches.length===0){
    return  toast({
      title: "select a match",
      status: "warning",
      duration: 2000,
      isClosable: true,
  });
  }
  try {
      let payload: any = { match_ids: selectedDeleteMatches };
      console.log(payload, "payload");
      let response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/match/delete-previous-match`, { data: payload });
      toast({
          title: response?.data?.message,
          status: "success",
          duration: 2000,
          isClosable: true,
      });
      setDeleteLoading(false);
      
      // Update matches after deletion
      const updatedMatches = matches.filter((match: any) => !selectedDeleteMatches.includes(match.match_id));

      console.log(updatedMatches,"updatematch")
      setMatches(updatedMatches);
  } catch (err: any) {
      setDeleteLoading(false);
      console.log(err, "err");
      toast({
          title: err?.data?.message,
          status: "error",
          duration: 2000,
          isClosable: true,
      });
  }
}
  return (
    <ChakraProvider theme={theme}>
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
              Pages / <span className={`text-gray-600`}>Competition </span>
            </Text>
            <Text
              className={`font-bold text-[#344767] text-left text-lg sm:text-lg `}
            >
              Competition
            </Text>
          </Box>
        </Flex>
      </Box>

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
            onChange={(e) => setSearch(e.target.value)}
          />
          <Box className="flex gap-2">
          <Button
onClick={handleDeleteSelectedMatch}
          className=" bg-[#E91E63] text-xs text-white  my-3 m-auto "
        >
         {deleteAllLoading? <Spinner color='red.500' />:"Delete Match"} 
        </Button>{" "}

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
            <Thead bg="primary" className=" bg-[#344767]">
              <Tr>
              <Td>
                <Checkbox
                  size={"lg"}
                  style={{
                    "--chakra-colors-blue-500": "blue-500",
                    // border: "1px solid green",
                  }}
                  isChecked={selectedDeleteMatches.length === matches.length}
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
                    borderRight: "1px solid #ccc",
                  }}
                >
                  MATCH ID
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  SPORT NAME
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  LEAQUE NAME
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                    width:'100px'

                  }}
                >
                  Team A Logo
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                    width:'100px'
                  }}
                >
                  Team B Logo
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  COMPETITION NAME
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  OPEN DATE
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  STATUS
                </Th>
                <Th
                  scope="col"
                  color="white"
                  style={{
                    textTransform: "none",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    borderRight: "1px solid #ccc",
                  }}
                >
                  Delete
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {matches?.map((row: any, dex: any) => {
                return (
                  <Tr
                    key={dex}
                    className={` ${
                      dex % 2 === 0 ? "bg-[#ECECEC]" : "bg-[#FFFFFF]"
                    } hover:bg-[#ECECEC] text-[10px]  font-semibold`}
                  >
                    <Td
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    <div className="flex gap-6">
                      <Checkbox
                        size={"lg"}
                        // defaultChecked
                        style={{
                          "--chakra-colors-blue-500": "#e91e63",
                          border: "1px solid #e91e63",
                        }}
                        onChange={(e) => handleSelect(e, row.match_id)}
                        isChecked={selectedDeleteMatches.includes(row.match_id)}
                      />
                    </div>
                  </Td>
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.match_id}
                    </Td>
                    <Td
                      style={{
                        whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.sport_id == 4
                        ? "Cricket"
                        : row?.sport_id == 1
                        ? "Scoccer"
                        : "Tennis"}
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.league_name}
                    </Td>

                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <div className="w-[150px]">
                        <input
                          type="file"
                          onChange={(e) => handleImageUrlChange(e, row,"0")}
                        />
                        {row?.first_team_logo !== "" && (
                          <div >
                            <img
                              src={row?.first_team_logo || ""}
                              alt=""
                              className="h-[40px] w-[40px] border-none"
                            />
                          </div>
                        )}
                      </div>
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <div className="w-[150px]">
                   <input type="file"  onChange={(e)=>handleImageUrlChange(e,row,"1")} />
      {row?.second_team_logo!=="" && (
        <div>
          <img src={row?.second_team_logo||""} alt="Selected Image" className="h-[40px] w-[40px]" />
        </div>
      )}
    </div>
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.match_name}
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {row?.open_date}
                    </Td>

                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <Button
                        isLoading={loading && index == dex}
                        onClick={() => handleStatus(row, row.match_id, dex)}
                        style={{
                          padding: "10px",
                          borderRadius: "10px",
                          width: "70px",
                          fontWeight: "bold",
                          fontSize: "12px",
                          backgroundColor: "white",
                          color: row?.status === true ? "#76BF79" : "#e34b4b",
                          border: `1px solid ${
                            row?.status === true ? "#76BF79" : "#e34b4b"
                          }`,
                        }}
                      >
                        {row?.status === true ? "Active" : "InActive"}
                      </Button>
                    </Td>
                    <Td
                      style={{
                        // whiteSpace: "nowrap",
                        textTransform: "none",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <Button
                        onClick={() => handleDeleteMatch(row.match_id)}
                        style={{
                          padding: "0px",
                          borderRadius: "10px",
                          width: "70px",
                          fontWeight: "bold",
                          fontSize: "12px",
                          backgroundColor: "red",
                          
                          color:"white",
                        }}
                      >
                        {deleteLoading ? <Spinner color='red.500' /> : "Delete"}
                      </Button>
                    </Td>
                  </Tr>
                  
                );
              })}
            </Tbody>
          </Table>
        </div>
        {matches && matches.length > 0 && (
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
              style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
            >
              {"First"}
            </Button>
            <Button
              type="button"
              className="ml-1 disabled:text-gray-400 text-[20px] mr-1"
              // ref="btPrevious"
              onClick={() => handlePrevPage()}
              disabled={currentPage == 1}
              style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
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
              style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
            >
              {">"}
            </Button>
            <Button
              onClick={() => setCurrentPage(pagination.totalPages)}
              type="button"
              className="ml-1 disabled:text-gray-400 text-[20px]"
              disabled={currentPage == pagination.totalPages}
              style={{ backgroundColor: "#e91e63", color: "white",fontSize:'12px' }}
            >
              {"Last"}
            </Button>
            
          </span>
        </div>
      )}


      </Box>
    </ChakraProvider>
  );
}

export default CompetitionTable;
