import { AuditEvent } from './audit.event';

export class AuditService {
  pushEvent(event: AuditEvent) {
    // tslint:disable-next-line:no-console
    console.log(event);

    // DO something with the event; push on a SQS queue
  }
}
