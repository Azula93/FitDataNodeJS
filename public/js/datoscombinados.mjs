export function combineFormData() {
       // Obtener los datos de los formularios
       const formData = {};

       // Formulario IMC
       const imcForm = document.getElementById('imc-form');
       if (imcForm) {
           const imcData = new FormData(imcForm);
           imcData.forEach((value, key) => {
               formData[key] = value;
           });
       }

       // Formulario ICC
       const iccForm = document.getElementById('icc-form');
       if (iccForm) {
           const iccData = new FormData(iccForm);
           iccData.forEach((value, key) => {
               formData[key] = value;
           });
       }

        // Formulario GET
        const getForm = document.getElementById('get-form');
        if (getForm) {
            const getData = new FormData(getForm);
            getData.forEach((value, key) => {
                formData[key] = value;
            });
        }
       // Puedes añadir más formularios aquí siguiendo el mismo patrón

       // Enviar los datos combinados al servidor
       fetch('/guardar-datos', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(formData),
       })
           .then(response => {
               if (!response.ok) {
                   throw new Error('Error al guardar los datos DATOS COMBIANDOS.');
               }
               return response.text();
           })
           .then(data => {
               console.log('Datos guardados:', data);
               // Aquí puedes agregar un mensaje de éxito o redirigir al usuario
           })
           .catch(error => {
               console.error('Error:', error);
           }); 
}