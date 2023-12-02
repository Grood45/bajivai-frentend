"use client";

import { fetchGetRequest } from "@/api/api";
import { Button, Input, Select, Switch } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Rules } from "../../../../utils/typescript.module";

const MainComponent = () => {
  const [counntry, setCountry] = useState("");
  const [rules,setRules]=useState<Rules>()



  useEffect(() => {
    const fetchGeneralSetting = async () => {
      try {
        const data = await fetchGetRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rules/get-rules/652a38fb2a2e359a326f3cd3`);
        
        setRules(data.data); 
        console.log(data.data,'fetching data')
        console.log(rules,'in general component')
      } catch (error) {
        
        console.error("Error fetching general:", error);
      }
    };

    fetchGeneralSetting();
  }, []);







  const handleCountry = (e: any) => {
    setCountry(e.target.value);
  };

  const [selectedColor, setSelectedColor] = useState("#003FA7");

  const handleColorChange = (e: any) => {
    setSelectedColor(e.target.value);
  };

 

  return (
    <div className="p-4">
      <p className="font-semibold text-white text-lg">General Setting</p>
      <div className=" rounded-[8px] px-5 py-6 bg-[#0F1535] mt-4 w-[100%]  ">
        <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Site Title</p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Baji Live"
              value={rules?.title}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Currency</p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="currency"
              value={rules?.currency}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Currency Symbol
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="currency symbol"
              // value="&#8377;"
              value={rules?.currency_symbol}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">Timezone</p>
            <Select
              style={{ outline: "none", border: "2px solid #003FA7" }}
              onChange={handleCountry}
              color={"white"}
              placeholder="Select a time zone"
              value={rules?.timezone}              
            >
              <option value="Asia/Dhaka">Asia/Dhaka</option>
              
              <option value="Asia/Dubai">Asia/Dubai</option>
              <option value="Asia/Colombo">Asia/Colombo</option>
              {/* Add more options here if needed */}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-4">
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Site Base Color
            </p>
            <div className="outline-none border-2 flex items-center rounded-md border-[#003FA7]  text-sm">
              <input
                type="color"
                value={rules?.color}
                onChange={handleColorChange}
                className="w-[80px]"
              />

              <span className="text-white pl-3  p-[7px]">{selectedColor}</span>
            </div>
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Bet Minimum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Bet Minimum Limit"
              type="number"
              value={rules?.bet_min}
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Bet Maximum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Bet Maximum Limit"
              value={rules?.bet_max}
              type="number"
              className="outline-none text-white text-sm"
            />
          </div>
        </div>

        <div className="flex grid-cols-1 md:grid-cols-2 mt-6 gap-4">
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Withdraw Minimum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Withdraw Minimum Limit"
             value={rules?.withdraw_min}
              type="number"
              className="outline-none text-white text-sm"
            />
          </div>
          <div className="flex w-[100%] flex-col gap-2">
            <p className="text-gray-400 text-xs text-semibold">
              Withdraw Maximum Limit
            </p>
            <Input
              style={{ outline: "none", border: "2px solid #003FA7" }}
              placeholder="Withdraw Maximum Limit"
              type="number"
              value={rules?.withdraw_max}
              className="outline-none text-white text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-6 gap-4">
        
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                  Force Secure Password
                </p>
                <Switch
                  isChecked={rules?.force_secure_password === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                Agree policy
                </p>
                <Switch
                  isChecked={rules?.agree_policy === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                User Registration
                </p>
                <Switch
                  isChecked={rules?.user_registration
                    === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                Force SSL
                </p>
                <Switch
                  isChecked={rules?.force_ssl
                    === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                Email Verification
                </p>
                <Switch
                  isChecked={rules?.email_verification
                    === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                Email Notification
                </p>
                <Switch
                  isChecked={rules?.email_notification
                    === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                SMS Verification
                </p>
                <Switch
                  isChecked={rules?.sms_verfication
                    === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                SMS Notification
                </p>
                <Switch
                  isChecked={rules?.sms_notification
                    === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
              <div className="flex w-[100%] flex-col gap-2">
                <p className="text-gray-400 text-xs text-semibold">
                Strong Password
                </p>
                <Switch
                  isChecked={rules?.strong_password
                    === true ? true : false}
                  colorScheme="blue"
                  size="lg"
                />
              </div>
          
        </div>

        <Button
          style={{
            backgroundColor: "#003FA7",
            marginTop: "15px",
            color: "white",
          }}
          className="w-[100%] rounded-lg"
        >
          Save Change
        </Button>
      </div>
    </div>
  );
};

export default MainComponent;
