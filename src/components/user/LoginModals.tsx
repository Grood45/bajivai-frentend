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
function LoginModal({ ID }: { ID: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showForget, setShowForget] = useState(true);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [loadingSendEmail, setLoadinSend] = useState(false);
  const [loadingSubmitOtp, setLoadingSubmitOtp] = useState(false);
  const [loadingUpdatePassword, setLoadinUpdatePassword] = useState(false);

  const toast = useToast();

  const [displayName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setEmailOrUsername] = useState("");
  const [phoneNumber, setNumber] = useState<string>();
  const [showotp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [otp, setOtp] = useState<any>("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload: any = {
        username: username,
        password: password,
        otpless_token: "tokenstfggyjtrytfgh6r6fttfyt46dytiytyghbyuijhiy7",
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
      toast({
        description: `${err?.message}`,
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    dispatch(removeUserDataAsync());
  };

  // const handleUser = async (userData: any, type: any) => {
  //   let payload = {
  //     username: displayName,
  //     email: userData?.email,
  //     first_name: userData?.displayName.split(" ")[0],
  //     last_name: userData?.displayName.split(" ")[1],
  //     phone: userData?.phoneNumber || phoneNumber,
  //     otpless_token: userData?.accessToken,
  //     password: password,
  //     img_url: userData.photoURL,
  //     uid: userData.uid,
  //     type: type,
  //   };
  //   let response = await dispatch(loginAsync(payload));
  //   if (response.payload.data && response.payload.success) {
  //     toast({
  //       description: response.payload.message || "Successful",
  //       status: "success",
  //       position: "top",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     // router.push(response.payload.redirect);
  //   }
  //   return;
  // };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e: any) => {
    e.preventDefault();
    try {
      setLoadinSend(true);
      const payload = {
        email: email,
      };
      let response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/send-reset-otp`,
        payload
      );
      toast({
        title: response?.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setShowOtp(true);
      setLoadinSend(false);
    } catch (err: any) {
      setLoadinSend(false);

      toast({
        title: err?.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleSubmitOtp = async () => {
    try {
      setLoadingSubmitOtp(true);
      const payload = {
        userEnteredOTP: otp,
        email: email,
        newPassword: newPassword,
      };
      let response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verify-otp-and-reset`,
        payload
      );
      toast({
        title: "Otp Verified",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setShowResetPassword(true);
      setLoadingSubmitOtp(false);
    } catch (err: any) {
      setLoadingSubmitOtp(false);

      toast({
        title: err?.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setLoadinUpdatePassword(true);
      const payload = {
        userEnteredOTP: otp,
        email: email,
        newPassword: newPassword,
      };
      let response = await sendPostRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verify-otp-and-reset`,
        payload
      );
      toast({
        title: "Password  Update Successfully",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setShowResetPassword(false);
      setShowOtp(false);
      setShowForget(true);
      setLoadinUpdatePassword(false);
    } catch (err: any) {
      setLoadinUpdatePassword(false);

      toast({
        title: err?.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleClose=()=>{
    onClose()
  }
  return (
    <>
      {ID === 1 && (
        <button
          className="px-1 w-[100px] md:w-[100px] justify-end text-white  p-[6px] font-bold bg-[#DCA029] text-xs md:text-[14px] rounded-[6px]"
          onClick={onOpen}
        >
          Login
        </button>
      )}

      {ID === 2 && (
        <p onClick={() => handleLogout()} className="text-xs  font-medium">
          Logout
        </p>
      )}

      <Modal
        size={{ base: "sm", md: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
      >
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
             <ModalHeader className="text-white">Login</ModalHeader>
        <RxCross2 onClick={handleClose} fontSize="25px"  className="absolute cursor-pointer  top-4 z-10 right-4" color="white" />
        <div className="w-[90%] m-auto h-[1px] bg-gray-500 mt-5"></div>
          <ModalBody
            style={{ padding: "0px", borderRadius: "10px" }}
            className=" "
          >
              
              <div className="flex flex-col z-50 -mt-5  items-center md:rounded-lg rounded-tl-[20px] rounded-tr-[20px]  justify-center ">
                {/* Form Container */}

                {showForget ? (
                  <div className=" p-8  rounded w-[100%]">
                    {/* Username and Password Form */}
                    <form onSubmit={handleLogin}>
                      <div className="flex items-start   -mt-5 justify-center">
                      </div>
                      <p className="font-semibold flex items-center text-gray-300 text-sm mt-8">
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
                          onChange={(e) => setEmailOrUsername(e.target.value)}
                        />
                      </div>
                      <p className="font-semibold flex items-center text-gray-300 text-sm mt-3">
                      Password <span className="text-red-500">*</span>
                    </p>

                      <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1  border-gray-500    border">
                        <input
                          type={showPassword ? "text" : "password"} // Show/hide password based on showPassword state
                          id="password"
                          name="password"
                          className=" p-[5px] w-[100%] text-xs font-medium text-white rounded-[6px] pl-3  bg-gray-900 outline-none  "
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
                      <div className="flex justify-between">
                        <p className="text-xs text-white text-right">
                          <span
                            onClick={() => setShowForget(false)}
                            className="text-blue-600 cursor-pointer underline font-semibold"
                          >
                            Forget Passoword
                          </span>{" "}
                        </p>
                        {/* <p className="text-xs text-white text-right">
                            Not account ?{" "}
                            <span
                              className="text-blue-600 cursor-pointer underline font-semibold"
                            >
                              Signup
                            </span>{" "}
                          </p> */}
                      </div>

                      {/* Login Button */}
                      <button
                        type="submit"
                        className="w-full  mt-5 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                      >
                        {loading ? <Spinner color="red.500" /> : "Login"}
                      </button>
                    </form>

                    {/* Additional Instructions */}
                    <div className="flex justify-between mt-2 m-auto p-1 gap-3 w-[100%]">
                      <div className="w-[100%]">
                        {/* <button
                            onClick={googleAuth}
                            className=" border w-[100%] font-semibold text-white duration-500 ease-in-out hover:bg-gray-800  rounded-lg p-1 px-3 flex justify-center items-center gap-2"
                          >
                            <FcGoogle fontSize="22px" />
                            Google
                          </button> */}
                      </div>

                      {/* <div className="w-[100%]">
                          <button className=" border w-[100%] bg-slate-100 duration-500 ease-in-out hover:bg-gray-300 font-semibold rounded-lg p-1 px-3 flex justify-center items-center gap-2">
                            <RiFacebookCircleFill color="blue" fontSize="25px" />
                            Facebook
                          </button> */}
                      {/* </div> */}
                    </div>
                  </div>
                ) : (
                  <div className=" p-8 rounded w-[100%]">
                    {/* Username and Password Form */}
                    {!showotp ? (
                      <form onSubmit={handleForgotPassword}>
                        <div className="flex items-start  -mt-5 justify-center">
                        </div>
                        <p className="font-semibold flex items-center text-gray-300 text-sm mt-10">
                    Email <span className="text-red-500">*</span>
                    </p>
                    <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1  border-gray-500    border">
                       
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className=" p-[5px] w-[100%] text-xs font-medium text-white rounded-[6px] pl-3  bg-gray-900 outline-none  "
                            placeholder="Enter your register email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full  mt-1 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                        >
                          {loadingSendEmail ? (
                            <Spinner color="red.500" />
                          ) : (
                            "Send Reset Email"
                          )}
                        </button>
                      </form>
                    ) : (
                      <>
                        {!resetPassword ? (
                          <div>
                            
                            <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1  border-gray-500    border">
                             
                              <input
                                type="text"
                                id="otp"
                                name="otp"
                                className=" p-[5px] w-[100%] text-xs font-medium text-white rounded-[6px] pl-3  bg-gray-900 outline-none  "
                                placeholder="Enter your otp"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                              />
                            </div>
                            <button
                              onClick={handleSubmitOtp}
                              className="w-full  mt-1 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                            >
                              {loadingSubmitOtp ? (
                                <Spinner color="red.500" />
                              ) : (
                                "Verify"
                              )}
                            </button>
                          </div>
                        ) : (
                          <div>
                           <div className="mb-4 flex mt-[6px] items-center rounded-[8px] p-1  border-gray-500    border">
                            
                              <input
                                type="text"
                                id="newpassword"
                                name="newpassword"
                                className=" p-[5px] w-[100%] text-xs font-medium text-white rounded-[6px] pl-3  bg-gray-900 outline-none  "
                                placeholder="Enter your new password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            </div>
                            <button
                              onClick={handleUpdatePassword}
                              className="w-full  mt-1 text-white p-2 text-sm font-semibold bg-[#DCA029] rounded-lg"
                            >
                              {loadingUpdatePassword ? (
                                <Spinner color="red.500" />
                              ) : (
                                "Update"
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    )}

                    {/* Additional Instructions */}
                  </div>
                )}
              </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
