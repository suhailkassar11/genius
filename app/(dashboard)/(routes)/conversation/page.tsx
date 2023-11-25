'use client';

import Heading from "@/components/heading";
import { MessagesSquare } from "lucide-react";
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
import { UseProModal } from "@/hooks/use-pro-modal";

const Conversation=()=>{
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
          const response = await axios.post("/api/conversation",{
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
            title="conversation"
            description="our most advanced conversation"
            icon=  {MessagesSquare}   
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
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
                          <p>
                          {message.content}
                          </p>

                        </div>
                      ))}
                </div>
            </div>
           </div>
        </div>
    )
}
export default Conversation;