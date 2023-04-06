export enum PUBLIC_ROUTE {
  LOGIN = '/login',
}
export enum GUEST_ROUTE {
  DASHBOARD = '/guest/dashboard',
}

export enum ADMIN_ROUTE {
  DASHBOARD = '/admin/dashboard',
  CREATE_EVENT = '/admin/event/create',
  UPDATE_EVENT = '/admin/event/update/:id',
  EVENT_DETAIL = '/admin/event/:id',
  UPDATE_USER = '/admin/event/:id/user/:userId',
  USER_STATUS = '/admin/user-status',
  UPLOAD_USER = '/admin/upload-user',
  USER_MANAGE = '/admin/user-manage',
}

export enum ADMIN_SUB_ROUTE {
  EVENT_DETAIL = '/admin/event',
  UPDATE_EVENT = '/admin/event/update',
}

export enum OWNER_ROUTE {
  DASHBOARD = '/owner/dashboard',
  EVENT_DETAIL = '/owner/event/:id',
}

export enum OWNER_SUB_ROUTE {
  EVENT_DETAIL = '/owner/event',
}
