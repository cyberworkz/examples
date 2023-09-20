export interface AuditEvent {
  userId: string;
  timeStamp: Date;
  ip: string;
  service: string;
  event: string;
}
