import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import {
  fetchUserDataAsync,
  loginAsync,
  removeUserDataAsync,
} from "@/app/redux-arch/userauth/auth.slice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchGetRequest, sendPostRequest } from "@/api/api";
import { FormEvent, useEffect, useState } from "react";
import { LogoAndFav } from "../../../utils/typescript.module";
import Image from "next/image";
import { useRouter } from "next/navigation";
//   import loginimg from "../../assetuser/win.jpg";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill, RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

import { HiPhoneArrowUpRight } from "react-icons/hi2";
import { logoutAsync } from "@/app/redux-arch/adminauth/auth.slice";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
function SignUpModal({title}:{title:any}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const router = useRouter();
  const toast = useToast();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setNumber] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [goNext, setGoNext] = useState(false);

  const handleNext = (e: any) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast({
        title: "Password are not Matched",
        status: "warning",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      setGoNext(true);
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = {
        username: username,
        email: email,
        first_name: "",
        last_name: "",
        phone: phoneNumber || "",
        otpless_token: "tokenstfggyjtrytfgh6r6fttfyt46dytiytyghbyuijhiy7",
        password: password,
        type: "register",
      };
      let ans = await dispatch(loginAsync(payload));

      if (ans.payload.success) {
        toast({
          title: ans.payload.message,
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        });

        setUsername("");
        setNumber("");
        setEmail("");
        setPassword("");
        onClose();
      } else {
        toast({
          title: ans.payload.message,
          status: "error",
          duration: 2000,
          position: "top",
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast({
        description: `${err?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleClose=()=>{
    setGoNext(false)
    onClose()
  }
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePassword1 = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      <button
        className={`px-1   ${title!=="Register"?"w-[250px] py-3":"w-[100px]"} justify-end text-white p-[6px] font-bold bg-blue-500 text-xs md:text-[14px] rounded-[6px]`}
        onClick={onOpen}
      >
        {title}
      </button>

      <Modal size={{ base: "sm", md: "sm" }} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="p-0 bg-gray-900 h-[550px]"
          style={{
            padding: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            borderRadius: "10px",
          }}
        >
          <ModalHeader className="text-white">Register</ModalHeader>
          <RxCross2
            onClick={handleClose}
            fontSize="25px"
            className="absolute top-4 cursor-pointer right-4"
            color="white"
          />
          <div className="w-[90%] m-auto h-[1px] bg-gray-500 mt-5"></div>

          <ModalBody
            style={{ padding: "0px", borderRadius: "10px" }}
            className=" bg-gray-900"
          >
            <div className="flex flex-col z-50 -mt-5  items-center  md:rounded-lg rounded-tl-[20px] rounded-tr-[20px]  justify-center ">
              <div className=" p-8 rounded w-[100%]">
                {!goNext ? (
                  <form onSubmit={handleNext}>
                    <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      UserName <span className="text-red-500">*</span>
                    </p>
                    <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1  border-gray-500    border">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className=" p-[5px] w-[100%] text-xs font-medium text-white rounded-[6px] pl-3  bg-gray-900 outline-none  "
                        placeholder="Enter your username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      Password <span className="text-red-500">*</span>
                    </p>
                    <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1 bg-gray-900 border-gray-500 border">
                      <input
                        type={showPassword ? "text" : "password"} // Show/hide password based on showPassword state
                        id="password"
                        name="password"
                        className="p-[5px] w-full text-xs text-white font-medium bg-gray-900 pl-3 outline-none rounded-[6px]"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {/* Button to toggle password visibility */}
                      <button
                        type="button"
                        className="focus:outline-none w-[30px] -ml-6 "
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? (
                          <IoEyeOutline fontSize="20px" color="white" />
                        ) : (
                          <IoEyeOffOutline fontSize="20px" color="white" />
                        )}
                      </button>
                    </div>
                    <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      Confirm Password <span className="text-red-500">*</span>
                    </p>
                    <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1 bg-gray-900 border-gray-500 border">
                      <input
                        type={showConfirmPassword ? "text" : "password"} // Show/hide password based on showPassword state
                        id="password"
                        name="confirmpassword"
                        className="p-[5px] w-full text-xs font-medium text-white bg-gray-900 pl-3 outline-none rounded-[6px]"
                        placeholder="Enter confirm password"
                        required
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {/* Button to toggle password visibility */}
                      <button
                        type="button"
                        className="focus:outline-none w-[30px] -ml-6 "
                        onClick={handleTogglePassword1}
                      >
                        {showConfirmPassword ? (
                          <IoEyeOutline fontSize="20px" color="white" />
                        ) : (
                          <IoEyeOffOutline fontSize="20px" color="white" />
                        )}
                      </button>
                    </div>
                    <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      Currency <span className="text-red-500">*</span>
                    </p>
                    <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1  border-gray-500    border">
                      <select
                        id="username"
                        name="username"
                        className=" p-[5px] w-[100%] text-xs font-medium text-white rounded-[6px] pl-3  bg-gray-900 outline-none  "
                        value={""}
                      >
                        <option>BDT</option>
                        <option>INR</option>
                      </select>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      className="w-full  mt-5 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                    >
                      Next
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignup}>
                    <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      Email <span className="text-red-500">*</span>
                    </p>
                    <div className="mb-4 flex mt-[6px] items-center rounded-[8px]    p-1 border-gray-500   bg-gray-900  border">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className=" p-[5px] w-[100%] text-xs font-medium rounded-[6px] pl-3 bg-gray-900 text-white outline-none  "
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      Phone Number <span className="text-red-500">*</span>
                    </p>
                    <div className="mb-4 flex items-center mt-[6px] w-[100%] rounded-[8px] border-gray-500 p-1   bg-gray-900 border">
                      {/* <HiPhoneArrowUpRight fontSize="20px" color="gray" /> */}
                      <input
                        type="number"
                        id="number"
                        name="number"
                        className="outline-none  p-[5px] text-white w-full text-xs font-medium bg-gray-900 pl-3  rounded-[6px] "
                        placeholder="Enter your number"
                        value={phoneNumber}
                        required
                        autoComplete="current-password"
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </div>
                    <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      Refferal Code{" "}
                    </p>
                    <div className="mb-4 flex items-center mt-[6px] w-[100%] rounded-[8px] border-gray-500 p-1   bg-gray-900 border">
                      {/* <HiPhoneArrowUpRight fontSize="20px" color="gray" /> */}
                      <input
                        type="number"
                        id="number"
                        name="number"
                        className="outline-none  p-[5px] text-white w-full text-xs font-medium bg-gray-900 pl-3  rounded-[6px] "
                        placeholder="Enter refferal code"
                        value={""}
                      />
                    </div>
                    <div className="flex items-center mt-3 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        required
                        className="mr-2"
                      />
                      <label htmlFor="terms" className="text-xs">
                        I agree to the{" "}
                        <a href="#" className="text-yellow-500 underline">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                    {/* Login Button */}

                    <button
                      type="submit"
                      className="w-full  mt-5 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                    >
                      {loading ? <Spinner color="red.500" /> : "SignUp"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignUpModal;
