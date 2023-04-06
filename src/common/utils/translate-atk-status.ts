import { TestStatusEnum } from 'modules/data-contractor';

export const translateAtkStatus = (status: TestStatusEnum) => {
  switch (status) {
    case TestStatusEnum.NEGATIVE:
      return 'ไม่พบเชื้อ';
    case TestStatusEnum.POSITIVE:
      return 'ติดเชื้อ';
  }
};
