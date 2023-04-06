import BottomDrawer, { BaseBottomDrawerProps } from '../bottom-drawer';
import ButtonGroup from 'common/base-ui/buttons/button-group';
import FieldAtkStatusDropdown from 'common/base-ui/field/field-atk-status-dropdown';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import { Form } from 'react-final-form';
import { useViewModel } from './viewmodel';
import Event from 'modules/event/model/event';
import User from 'modules/user/model/user';

type ApproveAtkDrawerProps = BaseBottomDrawerProps & {
  user: User;
  event: Event;
  fetchParentData?: () => void;
  setIsOpen: (value: boolean) => void;
};

const ApproveAtkDrawer = (props: ApproveAtkDrawerProps) => {
  const { handleApproveAtk } = useViewModel({
    user: props.user,
    event: props.event,
    fetchParentData: props.fetchParentData,
    setIsOpen: props.setIsOpen,
  });

  return (
    <BottomDrawer {...props} containerClassName="flex flex-col">
      <SectionTitle
        title={`ผลการตรวจ ของ ${props.user.getFullName()}`}
        className="mb-2"
      />

      <img
        src={props.user.getAtkImage()}
        alt={props.user.getFullName()}
        className="mb-6 aspect-[1/1.25] h-full w-full"
      />

      <Form
        onSubmit={handleApproveAtk}
        render={({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit} className="mb-4">
            <FieldAtkStatusDropdown name="atkStatus" />

            <ButtonGroup
              confirmButtonTitle="ยืนยัน"
              confirmButtonClick={() => null}
              cancelButtonTitle="ยกเลิก"
              cancelButtonClick={() => props.setIsOpen(false)}
              isLoading={submitting}
              confirmButtonType="submit"
              confirmButtonDisable={!values.atkStatus}
            />
          </form>
        )}
      />
    </BottomDrawer>
  );
};

export default ApproveAtkDrawer;