"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
 
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};
 
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
        {(active === item) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={transition}
            className="absolute top-[calc(100%_+_0.8rem] right-1/2 transform -translate-x-1/2 pt-4 z-50"
          >
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-gray-100 dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl max-h-[80vh] overflow-y-auto"
            >
              <ScrollArea className="h-[calc(100vh-10rem)] pb-10 overflow-y-auto">
                  <motion.div
                  layout
                  className="w-max h-full p-4"
                  >
                  {children}
                  </motion.div>
              </ScrollArea>
            </motion.div>
          </motion.div>
        )}
    </div>
  );
};
 
export const Menuu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  onClick
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  onClick?: () => void;
}) => {
  return (
    <Link href={`/category/${href}`} className="flex space-x-2 hover:scale-105 bg-inherit" onClick={onClick}>
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
