
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');

            try {
                const response = await fetch(`/eliminar-dato/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el dato.');
                }

                // Eliminar la fila de la tabla
                document.getElementById(`data-row-${id}`).remove();

                // Opcional: Mostrar un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Dato eliminado!',
                    text: 'El dato ha sido eliminado exitosamente.',
                });

            } catch (error) {
                console.error('Error:', error);

                // Opcional: Mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el dato.',
                });
            }
        });
    });
});
