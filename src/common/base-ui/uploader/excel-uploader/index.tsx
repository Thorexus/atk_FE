import isEmpty from 'lodash/isEmpty';
import Icon from '../../icon-component';
import { AppIconEnum } from '../../icon-component/viewmodel';

type ExcelUploaderProps = {
  file: FileList;
  onChange: React.Dispatch<React.SetStateAction<FileList>>;
};

const ExcelUploader = ({ file, onChange }: ExcelUploaderProps) => {
  return (
    <label className="grid place-content-center rounded-lg border border-dashed border-warning-500 bg-warning-50 p-2">
      <Icon
        icon={AppIconEnum.FILE_PLUS_ALT}
        className="mb-2 text-neutral-300"
        customIconSize={42}
      />
      <p className="font-semibold text-sm text-warning-500">
        {isEmpty(file) ? 'เลือกไฟล์' : file.item(0)?.name}
      </p>

      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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

export default ExcelUploader;
