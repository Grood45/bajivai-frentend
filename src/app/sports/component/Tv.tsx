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
  } from '@chakra-ui/react'
import { MdLiveTv } from 'react-icons/md'

import { RxCross2 } from "react-icons/rx";

export default function Tv({eventid}:{eventid:any}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <MdLiveTv onClick={onOpen} cursor="pointer" fontSize={"25px"} color="white" />
        <Modal size={{base:'sm', md: 'md' }}  isOpen={isOpen} onClose={onOpen}>

          <ModalOverlay />
         
          <ModalContent className='p-0 lg:fixed lg:right-6 rounded-2xl' >
         

            <ModalBody style={{padding:'0px',borderRadius:'14px'}}>
            <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... p-[1px] rounded-2xl ">
          
            <div className='h-[255px] rounded-[14px] p-2 bg-[#030712] lg:h-[270px]'>
            <p className='text-red-500 font-bold text-lg '>Live Tv</p>
            <div className="absolute rounded-[50%] border bg-[#F3AF06] h-[40px] w-[40px] flex items-center justify-center  top-3 right-5">
            <RxCross2 style={{cursor:'pointer'}}  color="white" fontSize={"25px"} onClick={onClose} />
 
            </div>
            <iframe src={`https://nlivetv.lagaikhaipro.com/rtv.php?eventId=${eventid}`} width="100%" height="100%" frameBorder="0" allowFullScreen ></iframe>

            </div>
            </div>
            </ModalBody>
  
          
          </ModalContent>
         
        </Modal>
      </>
    )
  }