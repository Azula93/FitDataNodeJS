
// IMAGEMES IMC
const imclow = '/public/assets/img (18).webp';
const imcOK = '/public/assets/img (14).webp';
const imcBad = '/public/assets/img (16).webp';
const imcError = '/public/assets/img (19).webp';
// // IMAGENES IMC

// // IMAGENES ICC
const imagenMujerOk = '/public/assets/img (14).webp';
const imagenMujerbad = '/public/assets/img (16).webp';
const imagenHombreOk = '/public/assets/img (15).webp';
const imagenHombreBad = '/public/assets/img (17).webp';
const iccimgError = '/public/assets/img (19).webp';
// // IMAGENES ICC

// LIMITAR NUMERO
function limitarNumero(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
    document.getElementById('errorMensaje').textContent = 'Máximo 3 dígitos permitidos.';
    document.getElementById('errorMensajeTalla').textContent = 'Máximo 3 dígitos permitidos.';
    document.getElementById('errorMensajePeso').textContent = 'Máximo 3 dígitos permitidos.';
    document.getElementById('errorMensajeEdad').textContent = 'Máximo 2 dígitos permitidos.';
    document.getElementById('errorMensajePPM').textContent = 'Máximo 3 dígitos permitidos.';
    document.getElementById('errorMensajeH').textContent = 'Máximo 2 dígitos permitidos.';
  } else {
    document.getElementById('errorMensaje').textContent = '';
    document.getElementById('errorMensajeTalla').textContent = '';
    document.getElementById('errorMensajePeso').textContent = '';
    document.getElementById('errorMensajeEdad').textContent = '';
    document.getElementById('errorMensajePPM').textContent = '';
    document.getElementById('errorMensajeH').textContent = '';
  }
}
// FIN LIMITAR NUMERO



// calcula IMC
document.getElementById('imc-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const peso = parseFloat(document.getElementById('peso').value);
  const talla = parseFloat(document.getElementById('talla').value);
  const formulaImc = (peso / (talla * talla)).toFixed(2);

  let resultImc = '';
  let errorImc = '';

  switch (true) {

    case formulaImc < 18.5:
      resultImc = `Tu IMC es <b> ${formulaImc} </b> Esto se clasifica como:<p class="pb-4 fs-4 text-center text-warning"> <b>BAJO PESO</b></p> <img class="img-fluid w-50 text-center" src="${imclow}" alt="imclow">`;
      break;

    case formulaImc >= 18.5 && formulaImc <= 24.9:
      resultImc = `Tu IMC es <b> ${formulaImc} </b> Esto se clasifica como: <p class="pb-4 fs-4 text-center text-success"> <b>PESO NORMAL</b> </p> <img class="img-fluid w-50 text-center" src="${imcOK}" alt="ImagenOK">`;
      break;

    case formulaImc >= 25 && formulaImc <= 29.9:
      resultImc = `Tu IMC es <b> ${formulaImc} </b> Esto se clasifica como: <p class="pb-4 fs-4 text-center text-warning"><b>SOBREPESO</b></p> <img class="img-fluid w-50 text-center" src="${imcBad}" alt="imcBad">`;
      break;

    case formulaImc >= 30 && formulaImc <= 34.9:
      resultImc = `Tu IMC es <b> ${formulaImc} </b> Esto se clasifica como:<p class="pb-4 fs-4 text-center text-danger"> <b>OBESIDAD GRADO I</b> </p><img class="img-fluid w-50 text-center" src="${imcBad}" alt="imcBad">`;
      break;

    case formulaImc >= 35 && formulaImc <= 39.9:
      resultImc = `Tu IMC es <b> ${formulaImc} </b> Esto se clasifica como: <p class="pb-4 fs-4 text-center text-danger"><b>OBESIDAD GRADO II</b></p> <img class="img-fluid w-50 text-center" src="${imcBad}" alt="imcBad">`;
      break;

    case formulaImc >= 40:
      resultImc = `Tu IMC es <b> ${formulaImc} </b> Esto se clasifica como: <p class="pb-4 fs-4 text-center text-danger"> <b> OBESIDAD GRADO III</b></p> <img class="img-fluid w-50 text-center" src="${imcBad}" alt="imcBad">`;
      break;

    default:
      resultImc = `<p class="pt-3 fs-4 text-center text-danger"><b>ERROR! <br> Ingresa los datos de manera correcta</br></p> <img class="img-fluid w-50 text-center" src="${imcError}" alt="imcError">`

  }
  document.getElementById('resultImc').innerHTML = resultImc;
  document.getElementById("errorImc").innerHTML = errorImc;
  // document.getElementById('generate-pdf').style.display = 'block';

  try {
    const response = await fetch('/guardar-imc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  imc: formulaImc }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar el resultado del IMC.');
    }

    console.log('Resultado del IMC guardado exitosamente.');
  } catch (error) {
    console.error('Error:', error);
  }
   

});

// calcula ICC
document.getElementById('icc-form').addEventListener('submit',async function (e) {
  e.preventDefault();

  //  Toma los datos ingresados en el genero
  const opciones = document.getElementsByName("genero");
  let Generoseleccionado = "";

  for (const opcion of opciones) {
    if (opcion.checked) {
      Generoseleccionado = opcion.value;
      break; // Sale del bucle tan pronto como se encuentra una opción seleccionada
    }
  }

  let cintura = document.getElementById("cintura").value;
  let cadera = document.getElementById("cadera").value;
  const formulaIcc = (cintura / cadera).toFixed(2);

  let resultadoIcc = "";
  let errorIcc = '';

  switch (true) {

    // CASOS MUJERES 
    case formulaIcc < 0.85 && Generoseleccionado === "mujer":
      resultadoIcc = `<p class="fs-4 text-center">Tu ICC es <b> ${formulaIcc} </b> Esto se clasifica como:<p class="pb-4 fs-4 text-center text-success"><b> SIN RIESGO CARDIOVASCULAR</b></p> <img class="img-fluid w-50 text-center" src="${imagenMujerOk}" alt="ImagenOK"></p>`;
      break;

    case formulaIcc > 0.85 && Generoseleccionado === "mujer":
      resultadoIcc = `<p class="fs-4 text-center">Tu ICC es <b> ${formulaIcc} </b> Esto se clasifica como: <p class="pb-4 fs-4 text-center text-danger"><b> CON RIESGO CARDIOVASCULAR</b></p> <img class="img-fluid w-50 text-center" src="${imagenMujerbad}" alt="Imagenbad"></p>`;
      break;

    // CASOS HOMBRES
    case formulaIcc < 0.94 && Generoseleccionado === "hombre":
      resultadoIcc = `<p class="fs-4 text-center">Tu ICC es <b> ${formulaIcc} </b> Esto se clasifica como: <p class="pb-4 fs-4 text-center text-success"> <b>SIN RIESGO CARDIOVASCULAR </b></p> <img class="img-fluid w-50 text-center" src="${imagenHombreOk}" alt="ImagenOK"></p>`;
      break;

    case formulaIcc > 0.94 && Generoseleccionado === "hombre":
      resultadoIcc = `<p class="fs-4 text-center">Tu ICC es <b> ${formulaIcc} </b> Esto se clasifica como: <p class="pb-4 fs-4 text-center text-danger"><b> CON RIESGO CARDIOVASCULAR </b></p> <img class="img-fluid w-50 text-center" src="${imagenHombreBad}" alt="Imagenbad"></p>`;
      break;

    default:
      resultadoIcc = `<p class="fs-4 text-center text-danger fw-bold">ERROR! <br> Verifica que hayas ingresado los datos de manera correcta</b></p> <img class="img-fluid w-50 text-center" src="${iccimgError}" alt="ImagenError">`
  }
  document.getElementById('resultIcc').innerHTML = resultadoIcc;
  document.getElementById("errorIcc").innerHTML = errorIcc;
  // document.getElementById('generate-pdf').style.display = 'block';

  try {
    const response = await fetch('/guardar-datos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  icc: formulaIcc }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar el resultado del IcC.');
    }

    console.log('Resultado del IMC guardado exitosamente.');
  } catch (error) {
    console.error('Error:', error);
  }
  
});


