
import PrivateRoute from "@/components/admin/PrivateRoute";
import { SportsSideBar } from "@/components/sportsComonent/SportsSidebar";
import SidebarNavbar from "@/components/user/SidebarNavbar";

import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

 
  return (
    <html lang="en">
       <PrivateRoute>

      <body className={inter.className}>
        <div  className=" flex  w-[100%] bg-[white]">
            <div className="sticky left-0"><SportsSideBar /></div>
        
              <div className=" ml-[13%] w-[84%]">{children}</div>

          
        </div>
      </body>
      </PrivateRoute>

    </html>
  );
}
