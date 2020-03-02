import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private toastr: ToastrService
  ) { }

  showToaster(message: string, type: string) {

    return this.toastr[type](message, 'Mensaje', {
      timeOut: 1000
    });
    // this.toastr.success('Hello', 'Im a message');
    // this.toastr.show('Hello', 'Im a message');
    // this.toastr.error('Hello', 'Im a message');
    // this.toastr.info('Hello', 'Im a message');
    // this.toastr.warning('Hello', 'Im a message');
  }

  // Alert Messages
  public getAlertMsg(data: string, type: string) {

    const successful = 'correctamente';
    const missed = 'incompletos';

    let msg = null;
    let toastType = null;

    switch (type) {
      case 'create':
        msg = data + ' creado ' + successful;
        toastType = 'success';
        break;
      case 'added':
        msg = data + ' agregado ' + successful;
        toastType = 'success';
        break;
      case 'update':
        msg = data + ' actualizado ' + successful;
        toastType = 'success';
        break;
      case 'delete':
          msg = data + ' eliminado ' + successful;
          toastType = 'warning';
          break;
      case 'max':
          msg = data + ' 10 productos máximo ';
          toastType = 'error';
          break;
      case 'error':
          msg = data + ' datos ' + missed;
          toastType = 'error';
          break;
      case 'server':
          msg = data + ' intente más tarde';
          toastType = 'error';
          break;
      case 'internet':
          msg = 'no estas conectado a' + data;
          toastType = 'warning';
          break;
      default:
    }

    return this.showToaster(msg, toastType);
  }

}
