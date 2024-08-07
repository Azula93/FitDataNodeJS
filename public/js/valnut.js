// // IMAGENES GET
const getResultImg = "/public/assets/img (12).webp";
const imgMacro = "/public/assets/img (22).webp";
// // IMAGENES GET
// import {combineFormData}  from './datoscombinados';

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


function obtenerSeleccion(name) {
  const opciones = document.getElementsByName(name);
  for (const opcion of opciones) {
    if (opcion.checked) {
      console.log(opcion.value);
      return opcion.value;
    }
  }
  return ""; // Por defecto, devuelve una cadena vacía si no se selecciona ninguna opción
}

function GeneroSeleccionado() {
  return obtenerSeleccion("genero");
}

function factorActividad() {
  return obtenerSeleccion("factorActividad");
}

function EleccionDeporte() {
  return obtenerSeleccion("Deportista");
}

// calcula GET
document.getElementById('imc-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  // Obtener los datos seleccionados
  const factorActividad = obtenerSeleccion("factorActividad");
  const Generoseleccionado = obtenerSeleccion("genero");

  let resultadoGet = "";
  let errorGet = '';

  const talla = parseInt(document.getElementById("talla").value);
  const peso = parseInt(document.getElementById("peso").value);
  const edad = parseInt(document.getElementById("edad").value);

  // FORMULAS
  const formulaHombresSedentario = (66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 1.2;
  const formulaHombresLeve = (66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 1.55;
  const formulaHombresModerada = (66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 1.8;
  const formulaHombresIntensa = (66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 2.1;

  const formulaMujeresSedentaria = (655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.2;
  const formulaMujeresLeve = (655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.56;
  const formulaMujeresModerada = (655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.64;
  const formulaMujeresIntensa = (655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.82;

  switch (true) {
    // Casos mujeres
    case Generoseleccionado === 'mujer' && factorActividad === "Menos de 3 horas semanales":
      resultadoGet = `Tu gasto energético total es de <b> ${Math.round(formulaMujeresSedentaria)} </b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;
    case Generoseleccionado === 'mujer' && factorActividad === "3 Horas semanales":
      resultadoGet = `Tu gasto energético total es de  <b> ${Math.round(formulaMujeresLeve)} </b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;
    case Generoseleccionado === 'mujer' && factorActividad === "6 Horas semanales":
      resultadoGet = `Tu gasto energético total es de <b> ${Math.round(formulaMujeresModerada)}</b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;
    case Generoseleccionado === 'mujer' && factorActividad === "4-5 horas Diarias":
      resultadoGet = `Tu gasto energético total es de <b> ${Math.round(formulaMujeresIntensa)}</b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;

    // Casos hombres
    case Generoseleccionado === 'hombre' && factorActividad === "Menos de 3 horas semanales":
      resultadoGet = `Tu gasto energético total es de <b> ${Math.round(formulaHombresSedentario)}</b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;
    case Generoseleccionado === 'hombre' && factorActividad === "3 Horas semanales":
      resultadoGet = `Tu gasto energético total es de <b> ${Math.round(formulaHombresLeve)}</b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;
    case Generoseleccionado === 'hombre' && factorActividad === "6 Horas semanales":
      resultadoGet = `Tu gasto energético total es de <b> ${Math.round(formulaHombresModerada)}</b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;
    case Generoseleccionado === 'hombre' && factorActividad === "4-5 horas Diarias":
      resultadoGet = `Tu gasto energético total es de <b> ${Math.round(formulaHombresIntensa)}</b> kcal <img class="rounded mx-auto d-block img-fluid w-50" src="${getResultImg}" alt="ImagenOK">`;
      break;

    default:
      resultadoGet = `<p class="textoGetResult text-danger"> Ingresa los datos correspondientes!☝️</p>`;

  }
  document.getElementById('resultGet').innerHTML = resultadoGet;
  document.getElementById("errorGet").innerHTML = errorGet;
  // document.getElementById('generate-pdf').style.display = 'block';

  try {
    const response = await fetch('/guardar-imc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  get: resultadoGet }),
    });

    if (!response.ok) {
      throw new Error('Error al guardar el resultado del IMC.');
    }

    console.log('Resultado del IMC guardado exitosamente.');
  } catch (error) {
    console.error('Error:', error);
  }
});


// calcula MACRONUTRIENTES
document.getElementById('macro-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // Funcion para calcular los macronutientes en Gramos

  let errorMacro = '';
  let macronutrientesGr = '';


  const talla = parseInt(document.getElementById("talla").value);
  const peso = parseInt(document.getElementById("peso").value);
  const edad = parseInt(document.getElementById("edad").value);

  const factorActividad = obtenerSeleccion("factorActividad");
  const Generoseleccionado = obtenerSeleccion("genero");
  const Deporteseleccionado = obtenerSeleccion("Deportista");


  // FORMULA HOMBRES GET
  let formulaHombresSedentario = ((66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 1.2);
  let formulaHombresLeve = (66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 1.55;
  let formulaHombresModerada = (66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 1.8;
  let formulaHombresIntensa = ((66.5 + 13.75 * peso + 5.0 * talla - 6.78 * edad) * 2.1);

  // FORMULAS PORCENTAJES HOMBRES DEPORTISTAS
  let GrChosHombresSed = ((formulaHombresSedentario) * 0.50 / 4);
  let GrProtHombreSed = ((formulaHombresSedentario) * 0.25 / 4);
  let GrGrasasHombreSed = ((formulaHombresSedentario) * 0.25 / 9);

  let GrChosHombreLeve = ((formulaHombresLeve) * 0.50 / 4);
  let GrProtHombreLeve = ((formulaHombresLeve) * 0.25 / 4);
  let GrGrasasHombreLeve = ((formulaHombresLeve) * 0.25 / 9);


  let GrChosHombreMod = ((formulaHombresModerada) * 0.50 / 4);
  let GrProtHombreMod = ((formulaHombresModerada) * 0.25 / 4);
  let GrGrasasHombreMod = ((formulaHombresModerada) * 0.25 / 9);

  let GrChosHombreInt = ((formulaHombresIntensa) * 0.50 / 4);
  let GrProtHombreInt = ((formulaHombresIntensa) * 0.25 / 4);
  let GrGrasasHombreInt = ((formulaHombresIntensa) * 0.25 / 9);

  // FORMULAS PORCENTAJES HOMBRES NODEPORTISTAS
  let GrChosHombresSedND = ((formulaHombresSedentario) * 0.60 / 4);
  let GrProtHombreSedND = ((formulaHombresSedentario) * 0.25 / 4);
  let GrGrasasHombreSedND = ((formulaHombresSedentario) * 0.15 / 9);

  let GrChosHombreLeveND = ((formulaHombresLeve) * 0.60 / 4);
  let GrProtHombreLeveND = ((formulaHombresLeve) * 0.25 / 4);
  let GrGrasasHombreLeveND = ((formulaHombresLeve) * 0.15 / 9);

  let GrChosHombreModND = ((formulaHombresModerada) * 0.60 / 4);
  let GrProtHombreModND = ((formulaHombresModerada) * 0.25 / 4);
  let GrGrasasHombreModND = ((formulaHombresModerada) * 0.15 / 9);

  let GrChosHombreIntND = ((formulaHombresIntensa) * 0.60 / 4);
  let GrProtHombreIntND = ((formulaHombresIntensa) * 0.25 / 4);
  let GrGrasasHombreIntND = ((formulaHombresIntensa) * 0.15 / 9);


  // FORMULA MUJERES GET
  let formulaMujeresSedentaria = ((655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.2);
  let formulaMujeresLeve = ((655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.56);
  let formulaMujeresModerada = ((655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.64);
  let formulaMujeresIntensa = ((655 + 9.56 * peso + 1.85 * talla - 4.68 * edad) * 1.82);


  // FORMULAS PORCENTAJES MUJERES DEPORTISTAS
  let GrChosMujerSed = ((formulaMujeresSedentaria) * 0.50 / 4);
  let GrProtMujerSed = ((formulaMujeresSedentaria) * 0.25 / 4);
  let GrGrasasMujerSed = ((formulaMujeresSedentaria) * 0.25 / 9);

  let GrChosMujerLeve = ((formulaMujeresLeve) * 0.50 / 4);
  let GrProtMujerLeve = ((formulaMujeresLeve) * 0.25 / 4);
  let GrGrasasMujerLeve = ((formulaMujeresLeve) * 0.25 / 9);

  let GrChosMujerMod = ((formulaMujeresModerada) * 0.50 / 4);
  let GrProtMujerMod = ((formulaMujeresModerada) * 0.25 / 4);
  let GrGrasasMujerMod = ((formulaMujeresModerada) * 0.25 / 9);

  let GrChosMujerInt = ((formulaMujeresIntensa) * 0.50 / 4);
  let GrProtMujerInt = ((formulaMujeresIntensa) * 0.25 / 4);
  let GrGrasasMujerInt = ((formulaMujeresIntensa) * 0.25 / 9);

  // FORMULAS PORCENTAJES MUJERES NO DEPORTISTAS
  let GrChosMujerSedND = ((formulaMujeresSedentaria) * 0.60 / 4);
  let GrProtMujerSedND = ((formulaMujeresSedentaria) * 0.25 / 4);
  let GrGrasasMujerSedND = ((formulaMujeresSedentaria) * 0.15 / 9);

  let GrChosMujerLeveND = ((formulaMujeresLeve) * 0.60 / 4);
  let GrProtMujerLeveND = ((formulaMujeresLeve) * 0.25 / 4);
  let GrGrasasMujerLeveND = ((formulaMujeresLeve) * 0.15 / 9);

  let GrChosMujerModND = ((formulaMujeresModerada) * 0.60 / 4);
  let GrProtMujerModND = ((formulaMujeresModerada) * 0.25 / 4);
  let GrGrasasMujerModND = ((formulaMujeresModerada) * 0.15 / 9);

  let GrChosMujerIntND = ((formulaMujeresIntensa) * 0.60 / 4);
  let GrProtMujerIntND = ((formulaMujeresIntensa) * 0.25 / 4);
  let GrGrasasMujerIntND = ((formulaMujeresIntensa) * 0.15 / 9);

  switch (true) {

    // CASOS MUJERES DEPORTISTAS
    case Deporteseleccionado === 'Deportista' && factorActividad === 'Menos de 3 horas semanales' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerSed)} gr</b> ,<br>
        Tu requerimiento de Proteinas es <b>${Math.round(GrProtMujerSed)}gr</b>,<br>
        Tu requerimiento de Grasas es <b>${Math.round(GrGrasasMujerSed)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'Deportista' && factorActividad === '3 Horas semanales' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerLeve)}gr</b>,<br>
          Tu requerimiento de Proteinas es<b> ${Math.round(GrProtMujerLeve)}gr</b>,<br>
          Tu requerimiento de Grasas es <b>${Math.round(GrGrasasMujerLeve)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'Deportista' && factorActividad === '6 Horas semanales' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerMod)}gr</b>,<br>
          Tu requerimiento de Proteinas es <b>${Math.round(GrProtMujerMod)}gr</b>,<br>
          Tu requerimiento de Grasas es <b>${Math.round(GrGrasasMujerMod)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'Deportista' && factorActividad === '4-5 horas Diarias' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerInt)}gr</b>,<br>
            Tu requerimiento de Proteinas es <b>${Math.round(GrProtMujerInt)}gr</b>,<br>
            Tu requerimiento de Grasas <b>es ${Math.round(GrGrasasMujerInt)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    // CASOS MUJERES NO DEPORTISTAS
    case Deporteseleccionado === 'No deportista' && factorActividad === 'Menos de 3 horas semanales' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerSedND)}gr</b>,<br>
           Tu requerimiento de Proteinas es <b>${Math.round(GrProtMujerSedND)}gr</b>,<br>
           Tu requerimiento de Grasas es <b>${Math.round(GrGrasasMujerSedND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'No deportista' && factorActividad === '3 Horas semanales' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerLeveND)}gr</b>,<br>
           Tu requerimiento de Proteinas es <b>${Math.round(GrProtMujerLeveND)}gr</b>,<br>
           Tu requerimiento de Grasas es <b>${Math.round(GrGrasasMujerLeveND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'No deportista' && factorActividad === '6 Horas semanales' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerModND)}gr</b>,<br>
            Tu requerimiento de Proteinas es <b>${Math.round(GrProtMujerModND)}gr</b>,<br>
            Tu requerimiento de Grasas es <b>${Math.round(GrGrasasMujerModND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'No deportista' && factorActividad === '4-5 horas Diarias' && Generoseleccionado === 'mujer':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosMujerIntND)}gr</b>,<br>
         Tu requerimiento de Proteinas es <b>${Math.round(GrProtMujerIntND)}gr</b>,<br>
         Tu requerimiento de Grasas es <b>${Math.round(GrGrasasMujerIntND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    // CASOS HOMBRES DEPORTISTAS
    case Deporteseleccionado === 'Deportista' && factorActividad === 'Menos de 3 horas semanales' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombresSed)}gr</b>,<br>
         Tu requerimiento de Proteinas es <b>${Math.round(GrProtHombreSed)}gr</b>,<br>
         Tu requerimiento de Grasas es <b>${Math.round(GrGrasasHombreSed)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'Deportista' && factorActividad === '3 Horas semanales' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombreLeve)}gr</b>,<br>
          Tu requerimiento de Proteinas es<b> ${Math.round(GrProtHombreLeve)}gr</b>,<br>
          Tu requerimiento de Grasas es<b> ${Math.round(GrGrasasHombreLeve)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'Deportista' && factorActividad === '6 Horas semanales' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombreMod)}gr</b>,<br>
            Tu requerimiento de Proteinas es <b>${Math.round(GrProtHombreMod)}gr</b>,<br>
            Tu requerimiento de Grasas es <b>${Math.round(GrGrasasHombreMod)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'Deportista' && factorActividad === '4-5 horas Diarias' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombreInt)}gr</b>,<br>
           Tu requerimiento de Proteinas es <b>${Math.round(GrProtHombreInt)}gr</b>,<br>
           Tu requerimiento de Grasas es <b>${Math.round(GrGrasasHombreInt)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    //  CASOS HOMBRES NO DEPORTISTAS
    case Deporteseleccionado === 'No deportista' && factorActividad === 'Menos de 3 horas semanales' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombresSedND)}gr</b>,<br>
            Tu requerimiento de Proteinas es <b>${Math.round(GrProtHombreSedND)}gr</b>,<br>
            Tu requerimiento de Grasas es <b>${Math.round(GrGrasasHombreSedND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'No deportista' && factorActividad === '3 Horas semanales' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombreLeveND)}gr</b>,<br>
              Tu requerimiento de Proteinas es <b>${Math.round(GrProtHombreLeveND)}gr</b>,<br>
              Tu requerimiento de Grasas es <b>${Math.round(GrGrasasHombreLeveND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'No deportista' && factorActividad == '6 Horas semanales' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombreModND)}gr</b>,<br>
            Tu requerimiento de Proteinas es <b>${Math.round(GrProtHombreModND)}gr</b>,<br>
            Tu requerimiento de Grasas es <b>${Math.round(GrGrasasHombreModND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    case Deporteseleccionado === 'No deportista' && factorActividad === '4-5 horas Diarias' && Generoseleccionado === 'hombre':
      macronutrientesGr = `Tu requerimiento de Carbohidratos es <b>${Math.round(GrChosHombreIntND)}gr</b>,<br>
            Tu requerimiento de Proteinas es <b>${Math.round(GrProtHombreIntND)}gr</b>,<br>
            Tu requerimiento de Grasas es <b>${Math.round(GrGrasasHombreIntND)}gr</b> <img class="rounded mx-auto d-block img-fluid w-50" src="${imgMacro}" alt="ImagenOK">`;
      break;

    default:
      macronutrientesGr = `<p class="textoGetResult text-danger"> Puedes realizar el cálculo cuando ingreses todos los datos solicitados 
          en la sección del GET ☝️</p>`
  }
  document.getElementById('resultMacro').innerHTML = macronutrientesGr;
  document.getElementById("errorMacro").innerHTML = errorMacro;
  document.getElementById('generate-pdf').style.display = 'block';
});

