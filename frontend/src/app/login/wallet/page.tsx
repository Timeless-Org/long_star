"use client";

import { Button } from "@components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginLoginWallet() {
  const router = useRouter();
  const { login, authenticated, logout, user } = usePrivy();

  const changeNextPage = async () => {
    if (user?.wallet && user.wallet.address) {
      router.push("/login/code");
      return;
    }
  };

  return (
    <div className="container flex items-center justify-center h-screen bg-black w-full">
      <div className="flex flex-col justify-between h-screen w-full">
        <div></div>
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/static/img/banner/long_star_yellow.jpg"
            alt="long star"
            width={300}
            height={300}
          />
          <p className="text-white text-center w-full px-5 mt-5">
            LongStar is a Social Fi platform that enables creators to get native
            yield from their followers via social tokens.
          </p>
        </div>
        <div className="flex flex-col mb-10 w-full px-5">
          <Button
            variant="bgYellow"
            className="w-full h-12 rounded-full"
            onClick={authenticated ? changeNextPage : login}
          >
            {authenticated ? "Proceed" : "Create a wallet"}
          </Button>
          <Button
            variant="bgBlack"
            className={`${authenticated ? "flex" : "hidden"} w-full h-12 mt-4`}
            onClick={logout}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
