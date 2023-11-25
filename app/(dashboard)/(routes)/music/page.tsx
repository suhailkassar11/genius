'use client';

import Heading from "@/components/heading";
import {MusicIcon } from "lucide-react";
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
import { UseProModal } from "@/hooks/use-pro-modal";

const Music=()=>{
  const proModal=UseProModal()
    const [music,setMusic]=useState<string>()
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
         
          setMusic(undefined)
          const response = await axios.post("/api/music",values)
          setMusic(response.data.audio);
          form.reset();
        }  catch (error:any) {
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
            title="Music"
            description="our most advanced Music generator Jarvis"
            icon=  {MusicIcon}   
            iconColor="text-green-700"
            bgColor="bg-green-500/10"
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
              {!music&& !isLoading &&(
                  <div>
                    <Empty label="No Music generated!"/>
                  </div>
              )}
               {
                music &&(
                  <audio controls className="w-full">
                    <source src={music}/>
                  </audio>
                )
               }
            </div>
           </div>
        </div>
    )
}
export default Music;