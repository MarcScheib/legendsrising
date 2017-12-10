export class NotificationServiceStub {
  message: string = '';

  danger(message: string): void {
    this.message = message;
  }
}
