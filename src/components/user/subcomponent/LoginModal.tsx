"use client";
import React, { useDebugValue, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { sendPostRequest } from "@/api/api";
import { getUserCookie, loginAsync } from "@/app/redux-arch/userauth/auth.slice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

const ModalComponent: React.FC = () => {
  const [open, setOpen] = useState<Boolean>(true);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://otpless.com/auth.js";
    script.async = true;
    // script.setAttribute("cid", "SZE48N3JS7F1NKUCNMURMIRBXHBL7SP2");
    document.getElementById("otpless-login-page")?.appendChild(script);
  }, []);
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  useEffect(() => {
    if (open) {
      // @ts-ignore
      window.otpless = (otplessUser) => {
        if (otplessUser.token) {
          let data = otplessUser;
          handleUser(data);
          return;
        }
      };
    }
  }, []);
  const toast = useToast();
  const [loading, setLoading] = useState<Boolean>(false);

  const handleUser = async (userData: any) => {
    let payload = {
      email: userData.email.email,
      first_name: userData?.email?.name?.split(" ")[0],
      last_name:
        userData?.email?.name?.split(" ")[userData?.email?.name.length - 1],
      phone: userData?.mobile?.number,
      otpless_token: userData?.token,
    };
    let response = await dispatch(loginAsync(payload));
    if (response.payload.data && response.payload.success) {
      toast({
        description: response.payload.message || "Successful",
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
      router.push(response.payload.redirect);
    }
    return;
  };


  return (
    <>
      <div id="otpless-login-page"></div>
    </>
  );
};

export default ModalComponent;
