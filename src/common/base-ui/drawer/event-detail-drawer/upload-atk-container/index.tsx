import AtkUploader from 'common/base-ui/uploader/atk-uploader';
import ButtonGroup from 'common/base-ui/buttons/button-group';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import { useViewModel } from './viewmodel';
import Event from 'modules/event/model/event';
import { detailModalType } from '../viewmodel';

type UploadAtkContainerProps = {
  setViewType: (value: detailModalType) => void;
  event: Event;
  setIsOpen: (value: boolean) => void;
};

const UploadAtkContainer = ({
  setViewType,
  event,
  setIsOpen,
}: UploadAtkContainerProps) => {
  const { file, setFile, isUploading, handleUploadAtk } = useViewModel({
    event,
    setIsOpen,
  });

  return (
    <div className="flex w-full flex-col gap-y-6">
      <SectionTitle title="อัพโหลดผลตรวจ" />
      <AtkUploader file={file} onChange={setFile} />
      <ButtonGroup
        confirmButtonTitle="อัพโหลด"
        confirmButtonClick={handleUploadAtk}
        cancelButtonTitle="ยกเลิก"
        cancelButtonClick={() => setViewType('detail')}
        // confirmButtonVariant={VariantEnum.ERROR}
        // confirmButtonContainer={ButtonContainerEnum.OUTLINE}
        isLoading={isUploading}
      />
    </div>
  );
};

export default UploadAtkContainer;
