import * as Icon from './unicons';

export enum AppIconEnum {
  ANGLE_LEFT = 'angle-left',
  USER_ALT = 'user-alt',
  CLIPBOARD_NOTES = 'clipboard-notes',
  CALENDAR_ALT = 'calendar-alt',
  CHECK = 'check',
  FILE_PLUS_ALT = 'file-plus-alt',
  THERMOMETER = 'thermometer',
  TRASH_ALT = 'trash-alt',
  USER_CIRCLE = 'user-circle',
  PEN = 'pen',
}

export const appIconMapping: Record<string, React.ReactNode> = {
  [AppIconEnum.ANGLE_LEFT]: <Icon.UilAngleLeft />,
  [AppIconEnum.USER_ALT]: <Icon.UilUsersAlt />,
  [AppIconEnum.CLIPBOARD_NOTES]: <Icon.UilClipboardNotes />,
  [AppIconEnum.CALENDAR_ALT]: <Icon.UilCalendarAlt />,
  [AppIconEnum.CHECK]: <Icon.UilCheck />,
  [AppIconEnum.FILE_PLUS_ALT]: <Icon.UilFilePlusAlt />,
  [AppIconEnum.THERMOMETER]: <Icon.UilThermometer />,
  [AppIconEnum.TRASH_ALT]: <Icon.UilTrashAlt />,
  [AppIconEnum.USER_CIRCLE]: <Icon.UilUserCircle />,
  [AppIconEnum.PEN]: <Icon.UilPen />,
};
