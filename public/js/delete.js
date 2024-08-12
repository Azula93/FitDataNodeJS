document.addEventListener('DOMContentLoaded', () => {
    const eliminarBtns = document.querySelectorAll('.btn-eliminar');

    eliminarBtns.forEach(btn => {
        btn.addEventListener('click', async (event) => {
            const userId = event.target.getAttribute('data-id');

            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¡Este dato será eliminado!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/eliminar-dato/${userId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });

                    if (response.ok) {
                        Swal.fire(
                            'Eliminado',
                            'El dato ha sido eliminado.',
                            'success'
                        ).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el dato.',
                            'error'
                        );
                    }
                } catch (error) {
                    Swal.fire(
                        'Error',
                        'Ocurrió un error al eliminar el dato.',
                        'error'
                    );
                }
            }
        });
    });
});
