import ButtonGroup from 'common/base-ui/buttons/button-group';
import { ADMIN_SUB_ROUTE } from 'common/constants/route-path';
import Event from 'modules/event/model/event';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { detailModalType } from '../../viewmodel';
import { VariantEnum } from 'common/types/component';
import { ButtonContainerEnum } from 'common/base-ui/buttons/button';

const AdminActionButton = ({
  event,
  setViewType,
}: {
  event: Event;
  setViewType: (value: detailModalType) => void;
}) => {
  const navigate = useNavigate();

  return (
    <ButtonGroup
      confirmButtonTitle="รายชื่อผู้เข้าร่วม"
      confirmButtonClick={() =>
        navigate(`${ADMIN_SUB_ROUTE.EVENT_DETAIL}/${event.getId()}`)
      }
      cancelButtonTitle="ลบอีเวนท์"
      cancelButtonClick={() => setViewType('remove')}
      cancelButtonVariant={VariantEnum.ERROR}
      cancelButtonContainer={ButtonContainerEnum.OUTLINE}
      className="flex-col-reverse"
    />
  );
};

export default AdminActionButton;
