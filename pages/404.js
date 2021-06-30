import { useRouter } from 'next/router';
import React,{useEffect} from 'react'

export default function NotFound() {

    const router = useRouter()

    useEffect(() => {
        console.log("error.........")
        setTimeout(() => {
            router.push("/")
        }, 3000);
    }, [])

    return (
        <div>
            <h1>oops!</h1>
        </div>
    )
}
