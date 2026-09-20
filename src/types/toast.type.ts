import type { GooeyToastOptions } from "goey-toast";

export type ToastFunction = (msg: string, options?: Partial<GooeyToastOptions>) => string | number;
