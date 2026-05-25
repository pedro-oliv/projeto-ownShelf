// alertEmitter.ts

export type AlertType =
  | "success"
  | "warning"
  | "error";

export interface AlertPayload {
  message: string;
  type: AlertType;
}

type Listener = (
  payload: AlertPayload
) => void;

class AlertEmitter {
  private listeners: Listener[] = [];

  on(listener: Listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(
        (l) => l !== listener
      );
    };
  }

  emit(payload: AlertPayload) {
    this.listeners.forEach((listener) =>
      listener(payload)
    );
  }
}

export const alertEmitter =
  new AlertEmitter();

export function dispatchAlert(
  message: string,
  type: AlertType = "error"
) {
  alertEmitter.emit({
    message,
    type,
  });
}