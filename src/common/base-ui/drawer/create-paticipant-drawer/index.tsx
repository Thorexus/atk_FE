import ExcelUploader from 'common/base-ui/uploader/excel-uploader';
import BottomDrawer, { BaseBottomDrawerProps } from '../bottom-drawer';
import ButtonGroup from 'common/base-ui/buttons/button-group';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import { useViewModel } from './viewmodel';
import Event from 'modules/event/model/event';

type CreateParticipantDrawerProsp = BaseBottomDrawerProps & {
  event: Event;
  fetchParentData: () => void;
  action?: 'create' | 'update';
};

const CreatePaticipantDrawer = (props: CreateParticipantDrawerProsp) => {
  const { handleCreateParticipant, file, setFile, isUploading } = useViewModel({
    event: props.event,
    isOpen: props.isOpen,
    setIsOpen: props.setIsOpen,
    fetchParentData: props.fetchParentData,
  });

  return (
    <BottomDrawer {...props} containerClassName="flex flex-col gap-y-6">
      <SectionTitle
        title={
          props.action === 'create' ? 'เพิ่มผู้เข้าร่วม' : 'แก้ไขผู้เข้าร่วม'
        }
        className="mb-0"
      />
      <ExcelUploader file={file as FileList} onChange={setFile} />
      <ButtonGroup
        confirmButtonTitle={
          props.action === 'create' ? 'เพิ่มผู้เข้าร่วม' : 'แก้ไขผู้เข้าร่วม'
        }
        confirmButtonClick={() => handleCreateParticipant()}
        cancelButtonTitle="ยกเลิก"
        cancelButtonClick={() => props.setIsOpen(false)}
        isLoading={isUploading}
      />
    </BottomDrawer>
  );
};

export default CreatePaticipantDrawer;
