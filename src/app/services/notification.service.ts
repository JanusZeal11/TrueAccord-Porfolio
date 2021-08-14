import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notification, NotificationStatus } from '../types/notification.type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  subject: BehaviorSubject<Notification> = new BehaviorSubject<Notification>({ message: '', status: NotificationStatus.Message })

  constructor() { }

  public Add(note: Notification): void {
    this.subject.next(note);
  }

  public Read(): Observable<Notification> {
    return this.subject.asObservable();
  }
}
