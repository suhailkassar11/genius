'use client';

import Heading from "@/components/heading";
import {VideoIcon} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,FormControl,FormField,FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import {useRouter} from 'next/navigation';
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UseProModal } from "@/hooks/use-pro-modal";

const Video=()=>{
  const proModal=UseProModal()
    const [video,setVideo]=useState<string>()
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
         
          setVideo(undefined)
          const response = await axios.post("/api/video",values)
          setVideo(response.data[0]);
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
            title="Videos"
            description="our most advanced Video generator Jarvis"
            icon=  {VideoIcon}   
            iconColor="text-orange-700"
            bgColor="bg-orange-500/10"
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
                     render={(
                      {field})=>(
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
              {!video&& !isLoading &&(
                  <div>
                    <Empty label="No Music generated!"/>
                  </div>
              )}
               {
                video &&(
                  <video controls className="w-full aspect-video mt-8 border rounded-lg bg-black">
                    <source src={video}/>
                  </video>
                )
               }
            </div>
           </div>
        </div>
    )
}
export default Video;