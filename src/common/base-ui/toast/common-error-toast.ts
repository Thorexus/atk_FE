import { toaster } from './toaster';

export const commonErrortoast = () => {
  return toaster('error', 'เกิดข้อผิดพลาด', 'กรุณาลองใหม่อีกครั้ง');
};
