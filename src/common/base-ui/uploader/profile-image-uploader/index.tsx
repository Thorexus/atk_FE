import React from 'react';
import Icon from '../../icon-component';
import { AppIconEnum } from '../../icon-component/viewmodel';
import isEmpty from 'lodash/isEmpty';

type ProfileImageUploaderProps = {
  file: FileList;
  onChange: React.Dispatch<React.SetStateAction<FileList>>;
};

const ProfileImageUploader = ({
  file,
  onChange,
}: ProfileImageUploaderProps) => {
  return (
    <label className="grid place-content-center rounded-lg border border-dashed border-warning-500 bg-warning-50 p-2">
      <Icon
        icon={AppIconEnum.USER_CIRCLE}
        className="mb-2 text-neutral-300"
        customIconSize={42}
      />
      <p className="font-semibold text-sm text-warning-500">
        {isEmpty(file) ? 'เลือกรูปโปรไฟล์' : file.item(0)?.name}
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

export default ProfileImageUploader;
