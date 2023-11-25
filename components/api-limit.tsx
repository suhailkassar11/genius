'use client';

import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constant";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { UseProModal } from "@/hooks/use-pro-modal";

interface userApiLimitProps{
    apiLimitCount:number
}

export const ApiLimitPro=({apiLimitCount}:userApiLimitProps)=>{
    const proModal=UseProModal()
    return (
        <div>
            <div>
                <Card className="bg-white/10 border-0">
                    <CardContent className="py-6">
                        <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount}/{MAX_FREE_COUNTS} your chance 
                        </p>
                
                        <Progress className="h-2" value={(apiLimitCount/MAX_FREE_COUNTS)*100}/>
                        </div>
                    <Button onClick={proModal.onOpen} className="w-full"  variant="premium">
                        Upgrade
                        <Zap className="fill-white w-4 h-4 ml-2"/>
                    </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}