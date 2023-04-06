import User from 'modules/user/model/user';
import BottomDrawer, { BaseBottomDrawerProps } from '../bottom-drawer';
import ConfirmationDrawerContainer from '../confirmation-drawer-container';
import { useViewModel } from './viewmodel';

type DeleteUserDrawerProps = BaseBottomDrawerProps & {
  user: User;
  fetchParentData?: () => void;
  setIsOpen: (value: boolean) => void;
};

const DeleteUserDrawer = (props: DeleteUserDrawerProps) => {
  const { handleRemoveEvent, isRemovingUser } = useViewModel({
    user: props.user,
    setIsOpen: props.setIsOpen,
    fetchParentData: props.fetchParentData,
  });

  return (
    <BottomDrawer {...props} containerClassName="flex flex-col">
      <ConfirmationDrawerContainer
        title="ยืนยันการลบผู้ใช้งาน"
        message={`แน่ใจว่าต้องการลบผู้ใช้งาน? \n เมือยืนยัน ผู้ใช้งานจะถูกลบออกจากระบบ`}
        confirmButtonTitle="ยืนยัน"
        confirmButtonClick={() => handleRemoveEvent()}
        cancelButtonTitle="ยกเลิก"
        cancelButtonClick={() => props.setIsOpen(false)}
        isLoading={isRemovingUser}
      />
    </BottomDrawer>
  );
};

export default DeleteUserDrawer;
