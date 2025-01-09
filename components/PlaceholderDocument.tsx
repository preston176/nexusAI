"use client"

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { FrownIcon, PlusCircleIcon } from 'lucide-react'
import useSubscription from '@/hooks/useSubscription';

function PlaceholderDocument() {
    const router = useRouter();
    const { isOverFileLimit } = useSubscription();
    const handleClick = () => {
        // check if user is FREE tier and if they are over the file upload limit
        if (isOverFileLimit) {
            router.push("/dashboard/upgrade")
        } else {
            router.push("/dashboard/upload")
        }

    }


    return (
        <Button onClick={handleClick} className='flex flex-col items-center w-64 h-80  justify-center rounded-xl bg-gray-200 drop-shadow-md text-gray-400'>
            {
                isOverFileLimit ? (
                    <FrownIcon className='h-16 w-16' />
                ) : (
                    <PlusCircleIcon className='h-16 w-16' />
                )
            }
            <p className='font-semibold'>
                {isOverFileLimit ? "Upgrade to add more documents" : " Add a Document"}
            </p>
        </Button>
    )
}

export default PlaceholderDocument