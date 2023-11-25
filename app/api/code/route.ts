import {OpenAI} from 'openai';
import {NextResponse} from 'next/server';
import { auth } from "@clerk/nextjs";
import { CheckApiLimit, IncreaseApiLimit } from '@/lib/api-limit';



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const instructionMessage:OpenAI.Chat.ChatCompletionMessage={
    role:'assistant',
    content:"you are a code generator. you must answer only in markdown code snippets. use code comments for explanation"
}

export async function POST(
    req:Request
){
    try{
        const {userId}=auth()
        const body = await req.json()
        const {messages}=body

        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        if(!messages){
            return new NextResponse("Messages are required",{status:400});
        }
        const freeTrial=await CheckApiLimit()
        if(!freeTrial){
            return new NextResponse("You have exceeded your API limit for the day.",{status:403}) 
        }
        const response= await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[instructionMessage,...messages]
          });
          await IncreaseApiLimit()
          console.log(response)
        return NextResponse.json(response.choices[0].message);
    }catch(error){
        console.log("[  CODE_ERROR]",error);
        return new NextResponse("Internal error",{status:500});
    }
}
