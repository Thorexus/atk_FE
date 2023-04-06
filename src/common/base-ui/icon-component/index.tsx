import { css, cx } from '@emotion/css';
import { AppIconEnum, appIconMapping } from './viewmodel';
import { BaseComponentProps } from 'common/constants/base-component';

export enum IconSizeEnum {
  SMALL = 'small',
  LARGE = 'large',
}

type IconProps = BaseComponentProps & {
  icon: AppIconEnum;
  width?: number;
  height?: number;
  iconSize?: IconSizeEnum;
  customIconSize?: number;
};

const Icon = ({
  className,
  icon,
  width,
  height,
  iconSize = IconSizeEnum.SMALL,
  customIconSize,
}: IconProps) => {
  const defaultIconSize = iconSize === IconSizeEnum.SMALL ? '16' : '24';

  return (
    <i
      className={cx(
        className,
        css`
          > svg {
            width: ${customIconSize || width || defaultIconSize}px;
            height: ${customIconSize || height || defaultIconSize}px;
            margin-right: auto;
            margin-left: auto;
          }
        `,
      )}>
      {appIconMapping[icon]}
    </i>
  );
};

export default Icon;
