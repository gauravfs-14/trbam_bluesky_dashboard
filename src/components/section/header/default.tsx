import React from "react";
import ThemeToggle from "../theme-toggle";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between mt-10 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold flex flex-col md:flex-row md:items-center gap-2">
        <span className="relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-extrabold">
            #TRBAM
          </span>
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-70"></span>
        </span>
        <span className="text-gray-800 dark:text-gray-200 mt-1 md:mt-0">
          Posts Dashboard
        </span>
      </h1>
      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Post analytics and insights
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
