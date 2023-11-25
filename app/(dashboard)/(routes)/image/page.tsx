'use client';

import Heading from "@/components/heading";
import { Download, ImageIcon, MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form,FormControl,FormField,FormItem } from "@/components/ui/form";
import { amount, formSchema, resolution } from "./constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import {useRouter} from 'next/navigation'
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import { UseProModal } from "@/hooks/use-pro-modal";


const Conversation=()=>{
  const proModal=UseProModal()
    const [images,setImages]=useState<string[]>([])
    const router=useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: "",
          amount:'1',
          resolution:"512*512"
        },
      })

      const isLoading = form.formState.isSubmitting;

      const onSubmit=async(values: z.infer<typeof formSchema>)=>{
        try {

          setImages([])
          console.log(values)
          const response = await axios.post("/api/image",values)
          const urls=response.data.map((image:{url:string})=>image.url)
          setImages(urls)
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
            title="Image Generation"
            description="Generate image with Jarvis"
            icon=  {ImageIcon}   
            iconColor="text-pink-500"
            bgColor="bg-pink-500/10"
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
                        <FormItem className="col-span-12 lg:col-span-6" > 
                            <FormControl>
                                <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="generate image of a red car" {...field} />
                            </FormControl>
                        </FormItem>
                     )}
                    />
                    <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <Select 
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue defaultValue={field.value}/>
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {amount.map((option)=>(
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                    <FormField
                          control={form.control}
                          name="resolution"
                          render={({ field }) => (
                            <FormItem>
                              <Select 
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue defaultValue={field.value}/>
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {resolution.map((option)=>(
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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
              {images.length===0 && !isLoading &&(
                  <div >
                    <Empty label="No image generated!"/>
                  </div>
              )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8" >
                  {images.map((src)=>(
                    <Card
                      key={src}
                      className="rounded-lg overflow-hidden"
                    >
                      <div className="relative aspect-square">
                       <Image 
                        fill
                        alt="Image"
                        src={src}
                       />
                      </div>
                      <CardFooter className="p-2">
                        <Button onClick={()=>window.open(src)} variant="secondary" className="w-full">
                            <Download className="h-4 w-4 mr-2"/>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
            </div>
           </div>
        </div>
    )
}
export default Conversation;