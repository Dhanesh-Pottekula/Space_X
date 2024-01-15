"use client"
import Link from 'next/link'
import {useRouter} from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  router.push("/profile/Profilepage");
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}