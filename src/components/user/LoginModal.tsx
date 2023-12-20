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
} from "@chakra-ui/react";
import ModalComponent from "./subcomponent/LoginModal";
import { removeUserDataAsync } from "@/app/redux-arch/userauth/auth.slice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

function LoginModal({ ID }: { ID: any }) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const handleLogout = () => {
    dispatch(removeUserDataAsync());
    onOpen();
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {ID === 1 && (
        <button
          className="px-3 justify-end text-white  p-1 font-semibold bg-[#DCA029] text-[16px] rounded-[8px]"
          onClick={onOpen}
        >
          Signup/Login
        </button>
      )}

      {ID === 2 && (
        <p onClick={() => handleLogout()} className="text-xs  font-medium">
          Logout
        </p>
      )}

      <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="p-0"
          style={{ padding: "0px", paddingLeft: "0px", paddingRight: "0px" }}
        >
          <ModalBody style={{ padding: "0px" }}>
            <ModalComponent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;
