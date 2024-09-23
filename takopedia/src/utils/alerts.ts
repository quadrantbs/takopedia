import Swal from 'sweetalert2';

export function showError(message: string) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  });
}

export function showLoading() {
  Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
}

export function hideLoading() {
  Swal.close();
}

export function showSuccess(message: string) {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
}
