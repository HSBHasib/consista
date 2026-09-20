import { goeyToast } from "goey-toast";
import type { GooeyToastOptions } from "goey-toast";

const defaultOptions: Partial<GooeyToastOptions> = {
  timing: { displayDuration: 4000 },
};

export const toast = {
  success: (msg: string, options?: Partial<GooeyToastOptions>): string | number => {
    return goeyToast.success(msg, { ...defaultOptions, ...options });
  },
  error: (msg: string, options?: Partial<GooeyToastOptions>): string | number => {
    return goeyToast.error(msg, { ...defaultOptions, ...options });
  },
  info: (msg: string, options?: Partial<GooeyToastOptions>): string | number => {
    return goeyToast.info(msg, { ...defaultOptions, ...options });
  },
  warning: (msg: string, options?: Partial<GooeyToastOptions>): string | number => {
    return goeyToast.warning(msg, { ...defaultOptions, ...options });
  },
};
