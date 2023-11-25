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
        const response= await replicate.run(
          "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
          {
            input: {
              prompt
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
