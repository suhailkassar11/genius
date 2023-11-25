import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface headingProps{
    title:string,
    description:string,
    iconColor?:string,
    bgColor?:string,
    icon:LucideIcon
}
const Heading=({title,description,iconColor,bgColor,icon:Icon}:headingProps)=>{
    return (
        <>
            <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
               <div className={cn("p-2 w-fit rounded-md",bgColor)}>
                <Icon className={cn("h-10 w-10",iconColor)}/>
               </div>
               <div>
                <h2 className="font-bold text-3xl">
                {title}
                </h2>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
               </div>
            </div>
        </>
    )
}
export default Heading