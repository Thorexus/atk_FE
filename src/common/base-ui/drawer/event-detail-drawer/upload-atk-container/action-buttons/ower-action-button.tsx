import { OWNER_SUB_ROUTE } from 'common/constants/route-path';
import Event from 'modules/event/model/event';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'common/base-ui/buttons/button';

const OwnerActionButton = ({ event }: { event: Event }) => {
  const navigate = useNavigate();

  return (
    <Button
      title="รายชื่อผู้เข้าร่วม"
      onClick={() =>
        navigate(`${OWNER_SUB_ROUTE.EVENT_DETAIL}/${event.getId()}`)
      }
      className="w-full"
    />
  );
};

export default OwnerActionButton;
