import { TestStatusEnum } from 'modules/data-contractor';
import User from 'modules/user/model/user';
import Button, { ButtonContainerEnum } from '../buttons/button';
import { VariantEnum } from 'common/types/component';
import ParticipantCardLoading from './loading';
import ApproveAtkDrawer from '../drawer/approve-atk-drawer';
import { useState } from 'react';
import Event from 'modules/event/model/event';
import Icon from '../icon-component';
import { AppIconEnum } from '../icon-component/viewmodel';
import DeleteUserDrawer from '../drawer/delete-user-drawer';
import { useNavigate, useParams } from 'react-router-dom';

type ParticipantCardProps = {
  user: User;
  event: Event;
  fetchParentData?: () => void;
  useActionButton?: boolean;
};

const ParticipantCard = ({
  user,
  event,
  fetchParentData,
  useActionButton = false,
}: ParticipantCardProps) => {
  const [approveAtkDrawerOpen, setApproveAtkDrawerOpen] = useState(false);
  const [deleteUserDrawerOpen, setDeleteUserDrawerOpen] = useState(false);
  const [isReupload, setIsReupload] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="relative flex w-full flex-col gap-y-3 rounded-lg border border-neutral-300 p-3">
      <div className="flex items-center gap-x-2">
        {user.getImage() ? (
          <img
            src={user.getImage()}
            alt={user.getName()}
            className="h-[60px] w-[60px] rounded-full"
          />
        ) : (
          <div className="h-[60px] w-[60px] rounded-full bg-neutral-300" />
        )}

        <div className="flex flex-col gap-y-1">
          <div>
            <p className="font-semibold">{user.getFullName()}</p>
            <p className="text-xs">{user.getEmail()}</p>
          </div>
          <p className="font-medium text-xs text-neutral-600">
            {user.getPhoneNumber()}
          </p>
        </div>
      </div>

      {user.getReuploadAtkStatus() === TestStatusEnum.NOT_FOUND &&
      user.getReuploadAtkImage() ? (
        <Button
          title="ตรวจสอบผลอีกครั้ง"
          container={ButtonContainerEnum.SECONDARY}
          onClick={() => {
            setIsReupload(true);
            setApproveAtkDrawerOpen(true);
          }}
          className="w-full"
        />
      ) : (
        <Button
          title="ตรวจสอบผล"
          container={ButtonContainerEnum.SECONDARY}
          onClick={() => {
            setIsReupload(false);
            setApproveAtkDrawerOpen(true);
          }}
          className="w-full"
        />
      )}

      {(user.getReuploadAtkStatus() === TestStatusEnum.NOT_FOUND &&
        !user.getReuploadAtkImage()) ||
      (user.getStatus() === TestStatusEnum.NOT_FOUND && !user.getAtkImage()) ? (
        <Button
          title="ยังไม่ได้ส่งผลตรวจ"
          container={ButtonContainerEnum.SECONDARY}
          variant={VariantEnum.NEUTRAL}
          onClick={() => null}
          className="w-full"
          disabled
        />
      ) : null}

      {user.getReuploadAtkStatus() === TestStatusEnum.POSITIVE ||
      user.getStatus() === TestStatusEnum.POSITIVE ? (
        <Button
          title="ติดเชื้อ"
          container={ButtonContainerEnum.OUTLINE}
          variant={VariantEnum.ERROR}
          onClick={() => null}
          className="w-full"
          disabled
        />
      ) : null}

      {user.getReuploadAtkStatus() === TestStatusEnum.NEGATIVE ||
      user.getStatus() === TestStatusEnum.NEGATIVE ? (
        <Button
          title="ไม่พบเชื้อ"
          container={ButtonContainerEnum.OUTLINE}
          variant={VariantEnum.SUCCESS}
          onClick={() => null}
          className="w-full"
          disabled
        />
      ) : null}

      {useActionButton ? (
        <div className="absolute top-[5px] right-2 flex flex-col items-center gap-y-2 p-2">
          <button
            type="button"
            onClick={() =>
              navigate(`/admin/event/${params.id}/user/${user.getId()}`)
            }>
            <Icon
              icon={AppIconEnum.PEN}
              customIconSize={16}
              className="text-warning-400"
            />
          </button>
          <button type="button" onClick={() => setDeleteUserDrawerOpen(true)}>
            <Icon
              icon={AppIconEnum.TRASH_ALT}
              customIconSize={16}
              className="text-error-400"
            />
          </button>
        </div>
      ) : null}

      <ApproveAtkDrawer
        isOpen={approveAtkDrawerOpen}
        setIsOpen={setApproveAtkDrawerOpen}
        user={user}
        event={event}
        fetchParentData={fetchParentData}
        isReupload={isReupload}
      />

      <DeleteUserDrawer
        user={user}
        isOpen={deleteUserDrawerOpen}
        setIsOpen={setDeleteUserDrawerOpen}
        fetchParentData={fetchParentData}
      />
    </div>
  );
};

ParticipantCard.Loading = () => <ParticipantCardLoading />;

export default ParticipantCard;
