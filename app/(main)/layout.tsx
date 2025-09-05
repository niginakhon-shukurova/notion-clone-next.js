"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { redirect, useRouter } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { Navigation } from "./_components/navigation";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
        router.push("/");
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) {
        return (
        <div className="h-full flex items-center justify-center">
            <Spinner size="lg" />
        </div>
        );
    }

    if (!isSignedIn) {
        return redirect("/"); 
    }

    return (
        <div className="h-full flex dark:bg-[#1f1F1F]">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">
            <SearchCommand/>
            {children}
        </main>
        </div>
    );
    };

export default MainLayout;
