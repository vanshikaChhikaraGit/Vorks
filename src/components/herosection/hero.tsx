"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { TextAnimate } from "../magicui/text-animate";
import ServiceAvatar from "../ui/ServiceAvatar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Arrow } from "@radix-ui/react-context-menu";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative h-full w-full overflow-hidden dark:bg-gray-900 bg-[#EBEDE8] py-20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 -z-0">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "absolute inset-0 h-full w-full skew-y-12",
          )}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-2 text-center">
        {/* //top avatars */}
        <div className="flex justify-between">
          <ServiceAvatar
            src="/garden.png"
            alt="laundry"
            className="-mt-6 motion-safe:animate-pulse md:-mt-8"
          ></ServiceAvatar>
          <ServiceAvatar
            src="/electrician.png"
            alt="laundry"
            className="motion-safe:animate-pulse"
          ></ServiceAvatar>
        </div>
        {/* middle content  */}
        <h1 className="mb-3 dark:text-purple-500 flex flex-wrap justify-center gap-x-2 gap-y-1 font-bold tracking-tight text-pretty break-normal text-[#004838] text-2xl md:text-5xl lg:text-6xl">
          One tool to{" "}
          <span className="rounded-md border-b-8 dark:border-white border-[#E2FB6C]">book</span>{" "}
          services and grow your work
        </h1>
        <h2 className="mt-2 dark:text-white/80 text-sm font-normal tracking-tight text-pretty break-normal md:text-lg lg:text-xl">
          Vorks is a platform that connects customers with local service
          providers and offers one-tap booking.
        </h2>
        <div>
          <Link href={'/sign-up'}  className="dark:bg-purple-500 inline-flex items-center p-2 border rounded-lg text-lg font-semibold text-white justify-center mt-4 bg-[#004838] hover:cursor-pointer hover:bg-green-900">
          
            Explore{" "}
            <ArrowRight className="shrink-0" size={15}></ArrowRight>{" "}
          </Link >
        </div>
        {/* bottom avatars  */}
        <div className="mt-12 flex justify-between -space-x-3">
          <ServiceAvatar
            src="/repair.png"
            alt="user1"
            className="mt-1 motion-safe:animate-pulse md:mt-4"
          ></ServiceAvatar>

          <ServiceAvatar
            src="/car.png"
            alt="user1"
            className="-mt-3 motion-safe:animate-pulse md:-mt-6"
          ></ServiceAvatar>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
