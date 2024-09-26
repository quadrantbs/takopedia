import Swal from 'sweetalert2';

export function showSuccess(message: string) {
  return (
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      timer: 2000,
      showConfirmButton: false,
    })
  )
}
export function showLoading() {
  return (
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })
  )
}
export function showError(error: Error) {
  return (
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    })
  )
}
