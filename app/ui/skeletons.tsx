import { Skeleton } from "@/components/ui/skeleton";

export function EventCardsSkeleton (){
    return (
        <div className='overflow-y-auto w-full no-scrollbar'>
            <EventCardSkeleton/>
            <EventCardSkeleton/>
            <EventCardSkeleton/>
            <EventCardSkeleton/>
            <EventCardSkeleton/>
            <EventCardSkeleton/>
            <EventCardSkeleton/>
            <EventCardSkeleton/>
        </div>
    )
}

export function EventCardSkeleton (){
    return (
        <Skeleton className='m-3 flex h-[48px] grow items-center justify-between gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-rose-100 hover:text-rose-600 md:flex-none md:justify-start md:p-2 md:px-3'>
            <div className='flex flex-row flex-1'>
                <Skeleton className="w-4 h-4 mr-2"/>
                <Skeleton className="w-[100px] h-[20px] md:block"/>
            </div>
            <div className='flex'>
                <Skeleton className="w-[100px] h-[20px]"/>
            </div>
        </Skeleton>
    )
}

export function EventSummarySkeleton() {
    return (
    <div className=''>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-col align-center mb-3'> 
                <Skeleton className="w-[200px] h-[20px]"/>
                <Skeleton className="w-[200px] h-[20px]"/>
                <Skeleton className="w-[200px] h-[20px]"/>
                <Skeleton className="w-[200px] h-[20px]"/>
                <Skeleton className="w-[200px] h-[20px]"/>
            </div>
        </div>
        <hr/>
        <div className='my-3 text-md'>
            <Skeleton className="w-full h-[100px]"/>
        </div>
    </div>
    );
}