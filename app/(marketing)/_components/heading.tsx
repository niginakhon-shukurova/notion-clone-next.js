"use client";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/spinner";

export const Heading = () => {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected Workspace where <br />
        better, faster work happens
      </h3>
      <div className="w-full flex items-center justify-center">
        {!isLoaded ? (
          <Button disabled>
           <Spinner /> 
          </Button>
        ) : isSignedIn ? (
        
          <Button asChild>
            <Link href="/documents">
              Enter Jotion
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button>
              Get Jotion free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};