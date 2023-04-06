import isEmpty from 'lodash/isEmpty';
import Icon from '../../icon-component';
import { AppIconEnum } from '../../icon-component/viewmodel';

type AtkUploaderProps = {
  file: FileList;
  onChange: React.Dispatch<React.SetStateAction<FileList>>;
};

const AtkUploader = ({ file, onChange }: AtkUploaderProps) => {
  return (
    <label className="grid place-content-center rounded-lg border border-dashed border-warning-500 bg-warning-50 p-2">
      <Icon
        icon={AppIconEnum.THERMOMETER}
        className="mb-2 text-neutral-300"
        customIconSize={42}
      />
      <p className="font-semibold text-sm text-warning-500">
        {isEmpty(file) ? 'เลือกรูปผลตรวจ' : file.item(0)?.name}
      </p>

      <input
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={e => {
          if (e.target.files) {
            onChange(e.target.files);
          }
        }}
      />
    </label>
  );
};

export default AtkUploader;
