import {OpenAI} from 'openai';
import {NextResponse} from 'next/server';
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";
import { CheckApiLimit, IncreaseApiLimit } from '@/lib/api-limit';
const replicate = new Replicate ({
    auth: process.env.REPLICATE_API_TOKEN!,
  });

export async function POST(
    req:Request
){
    try{
        const {userId}=auth()
        const body = await req.json()
        const {prompt}=body

        if(!userId){
            return new NextResponse("userID is Unauthorized",{status:401});
        }
        if(!prompt){
            return new NextResponse("prompt is Unauthorized",{status:401});
        }
    
        const freeTrial=await CheckApiLimit()
        if(!freeTrial){
            return new NextResponse("You have exceeded your API limit for the day.",{status:403}) 
        }
        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                prompt_a: prompt
              }
            }
          );
          await IncreaseApiLimit()
        return NextResponse.json(response);
    }catch(error){
        console.log("[  CONVERSATION_ERROR]",error);
        return new NextResponse("Internal error",{status:500});
    }
}
