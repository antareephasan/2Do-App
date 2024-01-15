import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <SignUp />
    </div>
  )
}