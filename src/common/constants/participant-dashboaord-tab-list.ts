import { TestStatusEnum } from 'modules/data-contractor';

export const participantDashboardTabList = [
  { label: 'ทั้งหมด', value: TestStatusEnum.ALL },
  { label: 'ยังไม่ได้ตรวจ', value: TestStatusEnum.NOT_FOUND },
  { label: 'ยังไม่ได้ส่งผล', value: TestStatusEnum.NOT_UPLOAD },
  { label: 'ไม่พบเชื้อ', value: TestStatusEnum.NEGATIVE },
  { label: 'ติดเชื้อ', value: TestStatusEnum.POSITIVE },
];
