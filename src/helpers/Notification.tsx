import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import '../global/global-styles.css';

const MySwal = withReactContent(Swal);

type CallbackFunctionToButtonInForm = (value: any) => any;

export class Notification {
    async notify(type: SweetAlertIcon, title: string, _timer: number = 1500): Promise<void> {
        await MySwal.fire({
            timer: _timer,
            showConfirmButton: false,
            title: <p>{title}</p>,
            icon: type,
            buttonsStyling: false,
            timerProgressBar: true,
        });
    };
    async notifyAsForm (question: string, onYes: CallbackFunctionToButtonInForm , onNo: CallbackFunctionToButtonInForm) {
        await MySwal.fire({
          title: question,
          icon: 'question',
          showCancelButton: true,
          preConfirm: onYes,
          preDeny: onNo,
          customClass: {
            confirmButton: 'custom-button-color',
            cancelButton: 'custom-button-cancel-color',
          },
        });
      }

}
 


