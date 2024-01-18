import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="mt-2 px-5 md:px-10 py-3 rounded-lg flex flex-row justify-between bg-black  w-full lg:max-w-[1280px]">
            <Image
                src="/assets/images/todo_logo.svg"
                alt="logo"
                height={50}
                width={50}
                className="w-auto h-auto"
            />
            <UserButton afterSignOutUrl="/sign-in" />
        </nav>
    );
}

export default Navbar;