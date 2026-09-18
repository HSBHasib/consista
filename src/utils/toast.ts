import { goeyToast } from "goey-toast";
import { GoeyToastInstance } from "@/types/toast.type";

const typedGoeyToast = goeyToast as unknown as GoeyToastInstance;

export const toast = {
  success: (msg: string): void => {
    typedGoeyToast.success?.(msg);
  },
  error: (msg: string): void => {
    typedGoeyToast.error?.(msg);
  },
  info: (msg: string): void => {
    typedGoeyToast.info?.(msg);
  },
};

