export enum NotificationStatus {
  Message = 0,
  Warning,
  Error
}

export type Notification = {
  message: string;
  status: NotificationStatus;
}
