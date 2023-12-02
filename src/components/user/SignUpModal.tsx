import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Collapse,
  Flex,
  Spacer,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  Stack,
} from "@chakra-ui/react";

import React,{useState} from "react";
import cancel from "../../assetuser/authsocial/CANCLE.png";
import Image from "next/image";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import gogole from "../../assetuser/authsocial/google.png";
import facebook from "../../assetuser/authsocial/facebook.png";
function SignUpModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [emailshow, setEmailShow] = useState(true);
  const [phoneshow, setPhoneShow] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleShowEmail = () => {
    setEmailShow(true);
    setPhoneShow(false);
  };
  const handleShowPhone = () => {
    setEmailShow(false);
    setPhoneShow(true);
  };

  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };

  const handlePromoCodeChange = (event: any) => {
    setPromoCode(event.target.value);
  };

  
  const applyPromoCode = () => {
    // Add logic to apply the promo code here
    // console.log("Promo code applied:", promoCode);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="bg-[#EAAB0F] text-[black] text-sm p-[6px] px-4 rounded-[5px] "
      >
        Sign Up
      </button>
      <Modal  size={{base:'full',lg:'3xl'}}  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent  style={{padding:'0px'}}>
          <ModalBody style={{padding:'0px',backgroundColor:'#212632'}}>
            <div>
              <div className="w-[100%] rounded-[8px] bg-[#212632]  flex">
                <div className=" hidden lg:contents">
                  <div className="w-[50%] h-[100vh] lg:h-[600px] rounded-[5px] object-cover auth-bg"></div>
                </div>
                <div  className="flex flex-col w-[100%] lg:w-[50%] pb-[50px] h-[100vh] lg:h-[600px] justify-between">
                  <div className="w-[100%] ">
                  <div className=" w-[100%] lg:pb-0   flex flex-col  ">
                  <div className="flex justify-end">
                   
                      <svg
              onClick={onClose}

                  cursor={"pointer"}
                  width="40"
                  height="25"
                  viewBox="0 0 40 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H20C31.0457 0 40 8.95431 40 20V25H20C8.95431 25 0 16.0457 0 5V0Z"
                    fill="#EAAB0F"
                  />
                  <line
                    y1="-1"
                    x2="17.8443"
                    y2="-1"
                    transform="matrix(0.728288 0.685271 -0.75454 0.656254 12.1129 8.19092)"
                    stroke="black"
                    stroke-width="2"
                  />
                  <line
                    y1="-1"
                    x2="17.6965"
                    y2="-1"
                    transform="matrix(0.67785 -0.7352 0.80052 0.599306 14.2448 20.0854)"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
                  </div>
                  <div className="w-[90%] flex flex-col gap-4   mx-auto">
                    <p className=" font-bold text-white text-xl">
                      Sign Up
                    </p>
                    <div className="flex justify-between text-[#D9D9D9] text-sm font-bold ">
                      <div
                        onClick={handleShowEmail}
                        className={`w-[48%] bg-[#2E3543] cursor-pointer rounded-[8px]  ${
                          emailshow ? "border-b-4 border-[#FDB80AD4]" : ""
                        } flex justify-center  items-center p-2`}
                      >
                        Email
                      </div>
                      <div
                        onClick={handleShowPhone}
                        className={`w-[48%] cursor-pointer  bg-[#2E3543] ${
                          phoneshow ? "border-b-4 border-[#FDB80AD4]" : ""
                        } flex justify-center rounded-[8px]  items-center p-2`}
                      >
                        Phone Number
                      </div>
                    </div>
                    {emailshow && (
                      <div className="flex flex-col  mt-2 md:mt-0 gap-1">
                        <label className="font-medium text-white text-sm ">
                          Email
                        </label>
                        <input
                          className="p-[6px] text-white h-[45px] w-[100%] border-[#D9D9D9C7] rounded-[6px] text-sm outline-none bg-[#15191F] "
                          placeholder="Enter your email"
                        />
                      </div>
                    )}

                    {phoneshow && (
                      <div className="flex flex-col  mt-2 md:mt-0 gap-1">
                        <label className="font-medium text-white text-sm ">
                          Phone Number
                        </label>
                        <input
                          type="number"
                          className="p-[6px] text-white h-[45px] w-[100%] border-[#D9D9D9C7] rounded-[6px] text-sm outline-none bg-[#15191F] "
                          placeholder="Enter your phone number"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <label className="font-medium text-white text-sm">
                        Password
                      </label>
                      <InputGroup className="flex items-center">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="p-[6px] text-white h-[45px] w-[100%] border-[#D9D9D9C7] rounded-[6px] text-sm outline-none bg-[#15191F]"
                          placeholder="Enter your password"
                        />
                        <InputRightElement width="3rem">
                          <IconButton
                            color={"white"}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                            onClick={togglePasswordVisibility}
                            size="lg"
                            colorScheme=""
                            bgColor="none"
                            marginTop={"15px"}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <Flex alignItems="center">
                          <Text className="font-semibold flex gap-1 items-center text-white text-sm">
                            Enter Referral/Promo Code{" "}
                            <MdOutlineKeyboardArrowDown
                              cursor="pointer"
                              onClick={toggleInputVisibility}
                              color="yellow"
                              fontSize="20px"
                            />
                          </Text>
                          <Spacer />
                        </Flex>
                        <Collapse in={isInputVisible}>
                          <Box mt={2} className="flex items-center gap-3">
                            <Input
                              type="text"
                              placeholder="promo code"
                              value={promoCode}
                              onChange={handlePromoCodeChange}
                              className="w-[30%]"
                            />
                            <Button
                              mt={2}
                              size="sm"
                              colorScheme="teal"
                              bgColor="green"
                              onClick={applyPromoCode}
                            >
                              Apply
                            </Button>
                          </Box>
                        </Collapse>
                      </div>
                      <div>
                        <Stack
                          spacing={[1, 3]}
                          direction={["column", "column"]}
                        >
                          <Checkbox
                            size="md"
                            colorScheme="yellow"
                            color={"yellow"}
                            defaultChecked
                          >
                            <p className="text-xs text-white">
                              I agree to the{" "}
                              <span className="text-[#FFBD16]">
                                User Agreement
                              </span>{" "}
                              & confirm i am at I east 18 yeard old
                            </p>
                          </Checkbox>
                          <Checkbox
                            size="md"
                            colorScheme="yellow"
                            color={"yellow"}
                            defaultChecked
                          >
                            <p className="text-xs text-white">
                              I agree to receive marketing promotions from
                              Website name
                            </p>
                          </Checkbox>
                        </Stack>
                      </div>
                      <div>
                        <Button
                          colorScheme=""
                          className="text-[#15191F] font-bold text-sm p-3 w-[100%] bg-[#FEB90A] rounded-[10px]"
                        >
                          Sign Up
                        </Button>
                        <p className="text-xs mt-2 ml-1 font-medium text-white">
                          Already have an account!{" "}
                          <span className="text-[#FFBD16]">
                            Sign in
                          </span>
                        </p>
                      </div>
                     
                    </div>
                  </div>
                </div>
                  </div>
                  <div className="w-[90%] m-auto">
                  <div >
                        <Flex alignItems="center" mt={4}>
                          <Divider flex="1" borderColor="gray.400" />
                          <Text
                            mx={2}
                            fontWeight="bold"
                            fontSize="sm"
                            color="gray"
                          >
                            Or Login with
                          </Text>
                          <Divider flex="1" borderColor="gray" />
                        </Flex>
                      </div>

                      <div className="flex justify-between text-[#D9D9D9] text-sm font-normal ">
                        <div
                          className={`w-[45%] bg-[#2E3543] cursor-pointer rounded-[10px]  flex justify-center  items-center p-2`}
                        >
                          <Image src={gogole} alt="" />
                        </div>
                        <div
                          className={`w-[45%] cursor-pointer  bg-[#2E3543]  flex justify-center rounded-[10px]  items-center p-2`}
                        >
                          <Image src={facebook} alt="" />
                        </div>
                      </div>
                  </div>
                </div>
               
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignUpModal;
