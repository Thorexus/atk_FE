import AtkUploader from 'common/base-ui/uploader/atk-uploader';
import ButtonGroup from 'common/base-ui/buttons/button-group';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import { useViewModel } from './viewmodel';
import Event from 'modules/event/model/event';
import { detailModalType } from '../viewmodel';

type UpdateAtkContainerProps = {
  setViewType: (value: detailModalType) => void;
  event: Event;
  setIsOpen: (value: boolean) => void;
};

const UpdateAtkContainer = ({
  setViewType,
  event,
  setIsOpen,
}: UpdateAtkContainerProps) => {
  const { file, setFile, isUploading, handleUpdateAtk } = useViewModel({
    event,
    setIsOpen,
  });

  return (
    <div className="flex w-full flex-col gap-y-6">
      <SectionTitle title="แก้ไขผลตรวจ" />
      <AtkUploader file={file} onChange={setFile} />
      <ButtonGroup
        confirmButtonTitle="อัพโหลด"
        confirmButtonClick={handleUpdateAtk}
        cancelButtonTitle="ยกเลิก"
        cancelButtonClick={() => setViewType('detail')}
        isLoading={isUploading}
      />
    </div>
  );
};

export default UpdateAtkContainer;
