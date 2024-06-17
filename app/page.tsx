import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="m-auto justify-center items-center">
        <Image
          src = "/lotus.png"
          width={200}
          height={36}
          alt="logo"
        />
        <div className="flex flex-col justify-center items-center">
          <p className='m-auto text-3xl font-bold'>Labangon</p>
          <p className='m-auto text-xl'>Wellness Hub</p>
          <Link
            href={"/dashboard/"}
          >
            <Button
              className='w-full my-5 justify-center flex h-10 items-center rounded-lg bg-rose-500 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
            >
              Go To Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
