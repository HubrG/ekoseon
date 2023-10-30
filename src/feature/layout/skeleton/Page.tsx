"use client";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { LottieDisplayOnSSR } from '@/src/feature/layout/lottie/LottieDisplayOnSSR'

const Loading = (props: any) => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full mt-20 min-h-[70vh] px-5 items-center flex justify-center">
      <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
        <Progress value={progress} className="w-[100%]" />
        <div className="flex items-center w-full space-x-2">
          <div className="h-2.5 bg-app-200 rounded-full dark:bg-app-700 w-32"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-24"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-full"></div>
        </div>
        <div className="flex items-center w-full space-x-2 max-w-[480px]">
          <div className="h-2.5 bg-app-200 rounded-full dark:bg-app-700 w-full"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-full"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-24"></div>
        </div>
        <div className="flex items-center w-full space-x-2 max-w-[400px]">
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-full"></div>
          <div className="h-2.5 bg-app-200 rounded-full dark:bg-app-700 w-80"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-full"></div>
        </div>
        <div className="flex items-center w-full space-x-2 max-w-[480px]">
          <div className="h-2.5 bg-app-200 rounded-full dark:bg-app-700 w-full"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-full"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-24"></div>
        </div>
        <div className="flex items-center w-full space-x-2 max-w-[440px]">
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-32"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-24"></div>
          <div className="h-2.5 bg-app-200 rounded-full dark:bg-app-700 w-full"></div>
        </div>
        <div className="flex items-center w-full space-x-2 max-w-[360px]">
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-full"></div>
          <div className="h-2.5 bg-app-200 rounded-full dark:bg-app-700 w-80"></div>
          <div className="h-2.5 bg-app-300 rounded-full dark:bg-app-600 w-full"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
