'use client';

import Heading from "@/components/heading";
import { CodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,FormControl,FormField,FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import {useRouter} from 'next/navigation'
import {OpenAI} from 'openai';
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatart";
import { BotAvatar } from "@/components/bot-avatar";
import Markdown from 'react-markdown';
import { UseProModal } from "@/hooks/use-pro-modal";



const Code=()=>{
  const proModal=UseProModal()
    const [messages,setMessages]=useState<OpenAI.Chat.ChatCompletionMessage[]>([])
    const router=useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
        },
      })

      const isLoading = form.formState.isSubmitting;

      const onSubmit=async(values: z.infer<typeof formSchema>)=>{
        try {
          const userMessage:OpenAI.Chat.ChatCompletionMessage={
            content:values.prompt,
            role:'assistant'
          };
          const newMessages=[...messages,userMessage];
          const response = await axios.post("/api/code",{
            messages:newMessages,
          })
          setMessages((current)=>[...current,userMessage,response.data]);
          form.reset();
        } catch (error:any) {
         if(error?.response?.status===403) {
          proModal.onOpen()
         }
        }finally{
          router.refresh()
        }
      }

    return (
        <div>
           <Heading
            title="Code Generation"
            description="our most advanced code generative AI"
            icon=  {CodeIcon}   
            iconColor="text-green-500"
            bgColor="bg-green-700/10"
           />
           <div className="px-4 lg:px-8">
            <div>
              <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full p-4 border rounded-lg px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                >
                    <FormField
                     name="prompt"
                     render={({field})=>(
                        <FormItem className="col-span-12 lg:col-span-10" > 
                            <FormControl>
                                <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="please write your message" {...field} />
                            </FormControl>
                        </FormItem>
                     )}
                    />
                    <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                        Generate
                    </Button>
                </form>
              </Form>
            </div>
            <div className="space-y-4 mt-4">
              {isLoading && (
                <div>
                  <Loader/>
                </div>
              )}
              {messages.length===0 && !isLoading &&(
                  <div>
                    <Empty label="No conversation occur!"/>
                  </div>
              )}
                <div className="flex flex-col-reverse">
                      {messages.map((message)=>(
                        <div
                        key={message.content}
                        className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role==='assistant'?'bg-white border border-black/10':"bg-muted")}
                        >
                         {message.role==='assistant'?<UserAvatar/>:<BotAvatar/>}
                         <Markdown
                          components={{
                            pre:({node,...props})=>(
                              <div className="w-full overflow-auto my-2 bg-black text-white p-2 rounded-lg">
                                <pre {...props}/>
                              </div>
                            ),
                            code:({node,...props})=>(
                              <code className="bg-black/10 rounded-lg p-1"{...props}/>
                            )
                          }}
                          className="text-sm leading-7 overflow-hidden"
                         >
                          {message.content}
                         </Markdown>

                        </div>
                      ))}
                </div>
            </div>
           </div>
        </div>
    )
}
export default Code;