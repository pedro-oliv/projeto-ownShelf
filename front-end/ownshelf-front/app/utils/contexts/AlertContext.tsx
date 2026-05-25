"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import { CircleAlert, CircleX, CircleCheck } from 'lucide-react'

type AlertType = "success" | "warning" | "error";

interface AlertData {
    message: string;
    type: AlertType;
}

interface AlertContextType {
    showAlert: (
        message: string,
        type?: AlertType
    ) => void;
}

const AlertContext = createContext({} as AlertContextType);

export function AlertProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [alert, setAlert] = useState<AlertData | null>(
        null
    );
    const [visible, setVisible] = useState<boolean>(false);

    function showAlert(
        message: string,
        type: AlertType = "success"
    ) {
        setAlert({ message, type });

        requestAnimationFrame(() => {
            setVisible(true);
        });

        setTimeout(() => {
            setVisible(false);

            setTimeout(() => {
                setAlert(null);
            }, 300);
        }, 4000);
    }

    const colors = {
        success:
      "bg-green-500/10 border-green-500 text-green-400",

    warning:
      "bg-yellow-500/10 border-yellow-500 text-yellow-400",

    error:
      "bg-red-500/10 border-red-500 text-red-400",
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alert && (
                <div
                    className={`
            fixed
            flex
            top-5
            left-1/2
            -translate-x-1/2
            px-6
            py-3
            rounded-xl
            border-2
            shadow-2xl
            transition-all
            z-50
            w-xl

            ${visible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-5"
                        }

            ${colors[alert.type]}
          `}
                >
                    <div className="flex items-center justify-center">
                        {alert.type == 'warning' && <CircleAlert size={36} className="pr-3" />}
                        {alert.type == 'error' && <CircleX size={36} className="pr-3" />}
                        {alert.type == 'success' && <CircleCheck size={36} className="pr-3" />}
                        {alert.message}
                    </div>
                </div>
            )}
        </AlertContext.Provider>
    );
}

export function useAlert() {
    return useContext(AlertContext);
}