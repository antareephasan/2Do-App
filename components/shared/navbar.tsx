import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="px-5 md:px-10 py-2 flex flex-row justify-between bg-black h-12 w-full lg:w-[1280px]">
            <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={80}
                height={50}
            />
            <UserButton afterSignOutUrl="/sign-in" />
        </nav>
    );
}

export default Navbar;