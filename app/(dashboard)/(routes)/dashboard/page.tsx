'use client';

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import {MessagesSquareIcon,VideoIcon,MusicIcon,ImageIcon,Code, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const DashboardPage = () => {
  const router=useRouter()
  const tools=[
    {
      label:'Conversation',
      icon:MessagesSquareIcon,
      color:'text-violet-500',
      bgColor:'bg-violet-500/10',
      href:"/conversation"
    },
    {
      label:'Image Generation',
      icon: ImageIcon,
      href:'/image',
      bgColor:'bg-pink-500/10',
      color:'text-pink-500'
  },
  {
      label:'Video Generation',
      icon: VideoIcon,
      href:'/video',
      bgColor:'bg-orange-500/10',
      color:'text-orange-700'
  },
  {
      label:'Music Generation',
      icon: MusicIcon,
      href:'/music',
      bgColor:'bg-emerald-500/10',
      color:'text-emerald-500'
  },
  {
      label:'Code Generation',
      icon: Code,
      href:'/code',
      bgColor:'bg-green-500/10',
      color:'text-green-700'
  },
  ]
  return (
    <div>
      <div className='mb-8 space-y-4'>
        <h2 className='text-center md:text-4xl text-2xl font-bold'>
            Explore the Power of Ai
        </h2>
        <p className='text-center md:text-lg text-sm text-muted-foreground font-light'>
          check with the smartest ai chat with the Jarvis
        </p>
        <div className='px-4 md:px-20 lg:px-32 space-y-3 '>
          {tools.map((tool)=>(
            <Card 
              onClick={()=>router.push(tool.href)}
              key={tool.href}
              className='p-4 border-black/5 items-center flex justify-between hover:shadow-md transition cursor-pointer '
            >
              <div className='flex items-center gap-x-4'>
                <div className={cn('p-2 w-fit rounded-md',tool.bgColor)}>
                    {<tool.icon className={cn("w-8 h-8",tool.color)}/>}
                </div>
                <div className='font-semibold '>
                  {tool.label}
                </div>
              </div>
              <ArrowRight/>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
