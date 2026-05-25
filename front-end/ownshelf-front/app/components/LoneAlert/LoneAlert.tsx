"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    alertEmitter,
    AlertPayload,
} from "@/app/utils/AlertEmitter";
import { CircleAlert, CircleX, CircleCheck } from "lucide-react";

export default function InlineAlert() {
    const [alert, setAlert] =
        useState<AlertPayload | null>(null);

    const [visible, setVisible] =
        useState(false);

    useEffect(() => {
        const unsubscribe =
            alertEmitter.on((payload) => {
                setAlert(payload);

                requestAnimationFrame(() => {
                    setVisible(true);
                });

                setTimeout(() => {
                    setVisible(false);

                    setTimeout(() => {
                        setAlert(null);
                    }, 300);
                }, 3000);
            });

        return unsubscribe;
    }, []);

    if (!alert) return null;

    const styles = {
        success:
            "bg-green-500/10 border-green-500 text-green-400",

        warning:
            "bg-yellow-500/10 border-yellow-500 text-yellow-400",

        error:
            "bg-red-500/10 border-red-500 text-red-400",
    };

    return (
        <div
        className={`
        w-full

        px-4
        py-3

        rounded-xl
        border

        ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }

        ${styles[alert.type]}
      `}
        >
            <div className="flex items-center justify-center">
                {alert.type == 'warning' && <CircleAlert size={36} className="pr-3" />}
                {alert.type == 'error' && <CircleX size={36} className="pr-3" />}
                {alert.type == 'success' && <CircleCheck size={36} className="pr-3" />}
                {alert.message}
            </div>
        </div>
    );
}