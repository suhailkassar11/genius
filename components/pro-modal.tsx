'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
  import {LayoutDashboard,MessageSquare,ImageIcon,VideoIcon,MusicIcon,Code,Check, Zap} from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Card } from "./ui/card";
import { UseProModal } from "@/hooks/use-pro-modal";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";


  const tools=[
        {
            label:'Dashboard',
            icon: LayoutDashboard,
            href:'/dashboard',
            color:'text-sky-500',
            bgColor:'text-sky-700/10'
        },
        {
            label:'Conversation',
            icon: MessageSquare,
            href:'/conversation',
            color:'text-violet-500',
            bgColor:'text-violet-700/10',
        },
        {
            label:'Image Generation',
            icon: ImageIcon,
            href:'/image',
            color:'text-pink-500',
            bgColor:'text-pink-700/10'
        },
        {
            label:'Video Generation',
            icon: VideoIcon,
            href:'/video',
            color:'text-orange-500',
            bgColor:'text-orange-700/10'
        },
        {
            label:'Music Generation',
            icon: MusicIcon,
            href:'/music',
            color:'text-emerald-500',
            bgColor:'text-emerald-700/10'
        },
        {
            label:'Code Generation',
            icon: Code,
            href:'/code',
            color:'text-green-500',
            bgColor:'text-green-700/10'
        },
  ]


export const ProModal=()=>{
    const proModal=UseProModal()

    const [loading,setLoading]=useState(false)
    const onSubscribe=async()=>{
        try {
            setLoading(true)
            const response=await axios.get("/api/stripe")
            window.location.href= response.data.url;
        } catch (error) {
            console.log("STRIPE_CLIENT_ERROR");
        }finally{
            setLoading(false)
        }
    }
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle className="flex gap-x-2 justify-center items-center gap-y-4 pb-2">Upgrade to genius <Badge variant="premium">pro</Badge>
                    </DialogTitle>
                    <DialogDescription>
                       {tools.map((tool,index)=>(
                        <Card
                        key={index}
                        className="flex justify-between border-0"
                        >
                            <div className="flex gap-x-4 items-center  ">
                                <div className={cn("p-2 w-fit rounded-md ",tool.bgColor)}>
                                    <tool.icon className={cn("h-4 w-4",tool.color)} />
                                </div>
                                <div className="text-lg font-semibold">
                                    {tool.label}
                                </div>
                            </div>
                                <Check/>
                        </Card>
                       ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onSubscribe} className="gap-x-2" variant="premium">
                        Upgrade
                        <Zap className="w-4 h-4 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}