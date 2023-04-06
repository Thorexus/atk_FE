import ProfileImageUploader from 'common/base-ui/uploader/profile-image-uploader';
import BottomDrawer, { BaseBottomDrawerProps } from '../bottom-drawer';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import { useViewModel } from './viewmodel';
import ButtonGroup from 'common/base-ui/buttons/button-group';

type ProfileImageUploadDrawerProps = BaseBottomDrawerProps;

const ProfileImageUploadDrawer = (props: ProfileImageUploadDrawerProps) => {
  const { handleUploadProfileImage, file, setFile, isUploading } = useViewModel(
    {
      isOpen: props.isOpen,
      setIsOpen: props.setIsOpen,
    },
  );

  return (
    <BottomDrawer {...props} containerClassName="flex flex-col gap-y-6">
      <SectionTitle title="อัพโหลดรูปโปรไฟล์" className="mb-0" />
      <ProfileImageUploader file={file as FileList} onChange={setFile} />
      <ButtonGroup
        confirmButtonTitle="อัพโหลด"
        confirmButtonClick={() => handleUploadProfileImage()}
        cancelButtonTitle="ยกเลิก"
        cancelButtonClick={() => props.setIsOpen(false)}
        isLoading={isUploading}
      />
    </BottomDrawer>
  );
};

export default ProfileImageUploadDrawer;
