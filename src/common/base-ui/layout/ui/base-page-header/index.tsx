import { LinkButton } from 'common/base-ui/buttons/link-button';
import { useContextAuthManager } from '../../../../authentication/index';
import { DateTime } from 'luxon';
import { AppIconEnum } from 'common/base-ui/icon-component/viewmodel';

type BasePageHeaer = {
  action: 'root' | 'child';
  onBack?: () => void;
};

const BasePageHeader = ({ action, onBack }: BasePageHeaer) => {
  const { logout } = useContextAuthManager();

  const dateNow = DateTime.now().setLocale('TH').toFormat('dd/MM/yyyy');

  return (
    <div className="mb-4 flex items-center justify-between">
      {action === 'root' ? (
        <>
          <p className="text-xs leading-[19px]">{`วันที่ ${dateNow}`}</p>
          <LinkButton title="ออกจากระบบ" onClick={() => logout()} />
        </>
      ) : (
        <LinkButton
          title="กลับหน้าหลัก"
          onClick={() => (onBack ? onBack() : null)}
          icon={AppIconEnum.ANGLE_LEFT}
        />
      )}
    </div>
  );
};

export default BasePageHeader;
