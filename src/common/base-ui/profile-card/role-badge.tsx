import { cx } from '@emotion/css';
import { UserRoleEnum } from 'modules/user/dao/user.dao';

type RoleBadgeProps = {
  role: UserRoleEnum;
};

const RoleBadge = ({ role }: RoleBadgeProps) => {
  return role !== UserRoleEnum.GUEST ? (
    <span
      className={cx(
        role === 'admin' ? 'bg-primary-700' : 'bg-[#E1C165]',
        'absolute top-3 right-4 rounded-lg px-2 font-medium text-2xs text-white',
      )}>
      {role === UserRoleEnum.ADMIN ? 'ผู้ดูแลระบบ' : 'ผู้จัดงาน'}
    </span>
  ) : null;
};

export default RoleBadge;
