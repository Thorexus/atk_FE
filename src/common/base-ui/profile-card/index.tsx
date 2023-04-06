import User from 'modules/user/model/user';
import RoleBadge from './role-badge';
import { useState } from 'react';
import ProfileImageUploadDrawer from '../drawer/profile-image-upload-drawer';

type ProfileCardProps = {
  userInfo: User;
};

const ProfileCard = ({ userInfo }: ProfileCardProps) => {
  const [uploadProfileImageDrawerOpen, setUploadProfileImageDrawerOpen] =
    useState(false);

  return (
    <div className="drop-shadow-large relative mb-6 flex items-center gap-x-4 rounded-lg bg-white p-3">
      {userInfo.getImage() ? (
        <img
          src={userInfo.getImage()}
          alt={userInfo.getName()}
          className="aspect-square w-[120px] rounded-full bg-neutral-300 object-cover"
        />
      ) : (
        <div
          className="aspect-square w-[120px] rounded-full bg-neutral-300"
          onClick={() => setUploadProfileImageDrawerOpen(true)}
        />
      )}

      <div>
        <p className="font-semibold">{userInfo.getFullName()}</p>
        <p className="mb-1 text-xs">{userInfo.getEmail()}</p>
        <p className="text-xs text-neutral-600">{userInfo.getPhoneNumber()}</p>
      </div>

      <RoleBadge role={userInfo.getRole()} />

      <ProfileImageUploadDrawer
        isOpen={uploadProfileImageDrawerOpen}
        setIsOpen={setUploadProfileImageDrawerOpen}
      />
    </div>
  );
};

export default ProfileCard;
