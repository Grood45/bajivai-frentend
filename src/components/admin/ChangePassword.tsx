"use client";
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
} from "@chakra-ui/react";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";

import adduser from "../assets/addnewuser.png";
import { FormEvent, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import changePassword from "../../assetuser/changePassword.png";
import { useDispatch, useSelector } from "react-redux";
import { FaUserLock } from "react-icons/fa";
import Image from "next/image";
import { sendPatchRequest } from "@/api/api";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { logoutAsync } from "@/app/redux-arch/adminauth/auth.slice";
const initialCredential = {
  old_password: "",
  new_password: "",
  re_password: "",
};
function ChangePassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adminPasswordLoading, setAdminPasswordLoading] =
    useState<Boolean>(false);
  const [credential, setCredential] = useState<any>(initialCredential);
  const toast = useToast();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
  };
  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();

    const payload = credential;

    setAdminPasswordLoading(true);

    try {
      const response = await sendPatchRequest(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/reset-password/${1}`,
        payload
      );
      toast({
        title: response.message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setCredential(initialCredential);
      setAdminPasswordLoading(false);
      dispatch(logoutAsync({ name: "token" }));
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    setAdminPasswordLoading(false);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="text-sm  p-[6px] gap-1 px-2 rounded-md bg-red-600   text-white font-semibold flex items-center"
      >
        <FaUserLock color="white" />
        Change Password
      </button>
      <Modal size={["sm", "sm"]} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-[#061437] text-white">
          <ModalCloseButton />
          <ModalBody>
            <div className=" flex flex-col items-center justify-center mt-5">
              <div className="flex items-center flex-col">
                <Image className="w-[60px]" src={changePassword} alt="" />
                <p className="text-sm mt-4 font-bold">
                  Please Change Your Password
                </p>
                <p className="text-sm font-medium">
                  Enter your Password to make this change
                </p>
              </div>
              <div className="w-[100%] mt-6">
                <form onSubmit={handleUpdatePassword}>
                  <div className="mb-4 flex flex-col gap-4">
                  <div>
                      <label
                        className="block mb-1 font-semibold text-sm"
                        htmlFor="password"
                      >
                      Old  Password:
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-3 text-black py-1 outline-none border rounded-md"
                          id="password"
                          name="old_password"
                          value={credential.old_password}
                          onChange={handlePasswordChange}
                          required
                        />
                       
                      </div>
                    </div>
                    <div>
                      <label
                        className="block mb-1 font-semibold text-sm"
                        htmlFor="password"
                      >
                       New Password:
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-3 py-1 text-black outline-none border rounded-md"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="new_password"
                          value={credential.new_password}
                onChange={handlePasswordChange}
                          required
                        />
                        <button
                          className="absolute top-0 right-0 mr-2 mt-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          {showPassword ? (
                            <IoEyeSharp
                              cursor={"pointer"}
                              fontSize="20px"
                              color="gray"
                            />
                          ) : (
                            <IoEyeOffSharp
                              cursor={"pointer"}
                              fontSize="20px"
                              color="gray"
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label
                        className="block mb-1 font-semibold text-sm"
                        htmlFor="confirm_password"
                      >
                        Confirm New Password:
                      </label>
                      <div className="relative">
                        <input
                          className="w-full px-3 py-1 text-black  outline-none border rounded-md"
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirm_password"
                          name="re_password"
                          value={credential.re_password}
                onChange={handlePasswordChange}
                          required
                        />
                        <button
                          className="absolute top-0 right-0 mr-2 mt-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          type="button"
                        >
                          {showConfirmPassword ? (
                            <IoEyeSharp
                              cursor={"pointer"}
                            //   onClick={() => setEyeShow(false)}
                              fontSize="20px"
                              color="gray"
                            />
                          ) : (
                            <IoEyeOffSharp
                              cursor={"pointer"}
                            //   onClick={() => setEyeShow(true)}
                              fontSize="20px"
                              color="gray"
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col my-5 mt-6 gap-5 justify-between">
                    <button
                      className={` w-[100%] text-white bg-green-500 px-4 font-semibold py-[6px] rounded-md`}
                      type="submit"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-red-500 font-semibold  w-[100%] py-[6px] rounded-md mr-2"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangePassword;
