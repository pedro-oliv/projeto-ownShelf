"use client";

import { useLoading } from "@/app/utils/contexts/LoadingContext";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

interface LoadingOverlayProps {
    text?: string;
}

export default function LoadingOverlay({
    text = "Carregando...",
}: LoadingOverlayProps) {

    const { loading } = useLoading();

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);

    if (!loading) return null;

    return (
        <div
            className="
        fixed
        inset-0
        z-[9999]

        flex
        items-center
        justify-center

        bg-white/10
        backdrop-blur-[2.5px]
      "
        >
            <div
                className="
          flex
          flex-col
          items-center
          gap-4
          px-8
          py-6
        "
            >
                <LoaderCircle
                    className="
            animate-spin
            text-orange-500
          "
                    size={78}
                />

                <p className="text-white text-sm">
                    {text}
                </p>
            </div>
        </div>
    );
}