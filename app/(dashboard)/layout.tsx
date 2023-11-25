

import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { GetApiLimitCount } from "@/lib/api-limit"


const DashboardLayout=async({
    children,
  }: {
    children: React.ReactNode
  })=> {

    const apiLimitCount=await GetApiLimitCount()

    return (  
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0  md:w-72 bg-gray-900">
           <Sidebar apiLimitCount={apiLimitCount} />
        </div>
           <main className="md:pl-72">
            <Navbar/>
           {children}
           </main>
      </div>   
    )
  }

export default DashboardLayout