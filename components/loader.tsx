import Image from 'next/image';

export const Loader=()=>{
    return(
        <div className='flex h-full items-center flex-col'>
            <div className='relative h-12 w-12 animate-spin'>
                <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                src='/logo.png'
                alt='logo'
                />
            </div>
            <h2 className='font-semibold'>
                jarvis is thinking
            </h2>
        </div>
    )
}