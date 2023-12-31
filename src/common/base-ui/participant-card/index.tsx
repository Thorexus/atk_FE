import { TestStatusEnum } from 'modules/data-contractor';
import User from 'modules/user/model/user';
import ParticipantCardLoading from './loading';
import ApproveAtkDrawer from '../drawer/approve-atk-drawer';
import { useState } from 'react';
import Event from 'modules/event/model/event';
import Icon from '../icon-component';
import { AppIconEnum } from '../icon-component/viewmodel';
import DeleteUserDrawer from '../drawer/delete-user-drawer';
import { useNavigate, useParams } from 'react-router-dom';
import { ParticipantCardActionButton } from './action-button';

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

      <>
        {user.getReuploadAtkImage() ? (
          <ParticipantCardActionButton
            user={user}
            setIsReupload={setIsReupload}
            reupload={true}
            setApproveAtkDrawerOpen={setApproveAtkDrawerOpen}
            atkImage={user.getReuploadAtkImage()}
            atkStatus={user.getReuploadAtkStatus() as TestStatusEnum}
          />
        ) : (
          <ParticipantCardActionButton
            user={user}
            setIsReupload={setIsReupload}
            reupload={false}
            setApproveAtkDrawerOpen={setApproveAtkDrawerOpen}
            atkImage={user.getAtkImage()}
            atkStatus={user.getStatus()}
          />
        )}
      </>

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
