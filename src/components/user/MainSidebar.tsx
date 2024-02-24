import React from 'react'
import SidebarNavbar from './SidebarNavbar'
import { useAppSelector } from '@/app/redux-arch/store';
import MobileSidebar from './MobileSidebar';

const MainSidebar = () => {

    const { showSideBar1, theme } = useAppSelector(
        (store) => store.combineR.NavStateReducer
      );
    
  return (
    <div>

    
    <div className="hidden lg:contents">
    <div className=" ">
      <SidebarNavbar identity={1} value={1} />
    </div>
  </div>

 
  
    
    </div>
  )
}

export default MainSidebar