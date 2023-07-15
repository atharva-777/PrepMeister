import Login from "./login/page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="justify-center items-center text-center m-40">
    <h1 className="text-4xl font-bold">Welcome to Nextjs Authentication System</h1>
    <br />
    <Link href='/login'>Have an account ? Sign In</Link>
    <br /><br />
    <Link href='/signup'>New user ? Sign Up</Link>
    </div>
  );
}
