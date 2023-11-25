'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import {LayoutDashboard,MessageSquare,ImageIcon,VideoIcon,MusicIcon,Code,Settings} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ApiLimitPro } from './api-limit';

const montserrat=Montserrat({
    weight:"600",
    subsets:['latin']
});

const routes=[
    {
        label:'Dashboard',
        icon: LayoutDashboard,
        href:'/dashboard',
        color:'text-sky-500'
    },
    {
        label:'Conversation',
        icon: MessageSquare,
        href:'/conversation',
        color:'text-violet-500'
    },
    {
        label:'Image Generation',
        icon: ImageIcon,
        href:'/image',
        color:'text-pink-500'
    },
    {
        label:'Video Generation',
        icon: VideoIcon,
        href:'/video',
        color:'text-orange-700'
    },
    {
        label:'Music Generation',
        icon: MusicIcon,
        href:'/music',
        color:'text-emerald-500'
    },
    {
        label:'Code Generation',
        icon: Code,
        href:'/code',
        color:'text-green-700'
    },
    {
        label:'Settings',
        icon: Settings,
        href:'/settings',
      
    },
    
]

interface apiLimitProps{
    apiLimitCount:number
}

const Sidebar = ({apiLimitCount=0}:apiLimitProps) => {
    const pathname=usePathname()
  return (
    <div className="text-white space-y-4 py-4 flex flex-col h-full bg-[#111827]">
      <div className='px-3 py-2 flex-1'>
        <Link href="/dashboard" className='flex items-center pl-3 mb-14'>
            <div className='relative w-11 h-11 mr-4'>
                <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    src='/logo.png'
                    alt='logo'
                />
            </div>
            <h1 className={cn('font-bold text-2xl',montserrat.className)}>Jarvis</h1>
        </Link>
        <div className='space-y-1 '>
           {routes.map((route)=>(
            <Link href={route.href} key={route.href} className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 hover:scale-105 transform transition-transform duration-300 rounded-lg',pathname===route.href?'text-white bg-white/10':'text-zinc-00')} >
                <div className='flex flex-1 item-center gap-1 '>
                    <route.icon className={cn('h-5 w-5',route.color)}/>
                    {route.label}
                </div>
            </Link>
           ))}
        </div>
      </div>
      <ApiLimitPro apiLimitCount={apiLimitCount}/>
    </div>
  )
}

export default Sidebar
