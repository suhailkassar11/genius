import Image from 'next/image';

interface emptyprops{
    label:string
}

export const Empty=({label}:emptyprops)=>{
    return(
        <div className='flex h-full items-center flex-col'>
            <div className='relative h-72 w-72'>
                <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                src='/empty.webp'
                alt='empty'
                />
            </div>
            <h2>
                {label}
            </h2>
        </div>
    )
}