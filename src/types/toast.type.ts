export type ToastFunction = (msg: string) => void;

export interface GoeyToastInstance {
  success?: ToastFunction;
  error?: ToastFunction;
  info?: ToastFunction;
}
