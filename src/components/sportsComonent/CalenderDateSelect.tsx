import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function DateRangePicker() {
  // State for start date and end date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Handler for start date change
  const handleStartDateChange = (event: any) => {
    const formattedDate = event.target.value;
    setStartDate(formattedDate);
  };

  // Handler for end date change
  const handleEndDateChange = (event: any) => {
    const formattedDate = event.target.value;
    setEndDate(formattedDate);
  };

  // Handler for form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    // You can perform further actions here, such as passing the dates to another component or making an API call.
    await deletePreviousMatch();
  };

  const deletePreviousMatch = async () => {
    setLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/match/delete-previous-match?`;
    const ConvertDate = (date: any) => {
      console.log(date, "date");
      let year = date.split("-")[0];
      let month = Number(date.split("-")[1]);
      let day = Number(date.split("-")[2]);
      let finalDate = `${month}/${day}/${year} 12:00:00 AM`;
      return finalDate;
    };

    console.log(ConvertDate(startDate), ConvertDate(endDate));

    if (startDate) {
      url += `start_date=${ConvertDate(startDate)}`;
    }
    if (endDate) {
      url += `&end_date=${ConvertDate(endDate)}`;
    }
    try {
      let response = await axios.delete(url);
      const data = response;
      toast({
        description: "Delete successfully.",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    } catch (error: any) {
      toast({
        description: `${error?.data?.message || error?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-center flex flex-col gap-2">
        <div>
        <label className="mr-2 text-sm font-semibold text-[#E91E63]">
          Start Date:
          <input
            className="border-2"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </label>
        <span className="font-bold">To</span> 
        <label className="ml-2 text-sm font-semibold text-[#E91E63]">
          End Date:
          <input
            className="border-2"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </label>
        </div>
               <Button
          type="submit"
          isLoading={loading}
          className=" bg-[#E91E63] text-xs text-white  my-3 m-auto "
        >
          Delete Match
        </Button>{" "}
      </form>
    </div>
  );
}

export default DateRangePicker;
