let fechainicio, fechafin;
let seleccion;
let datos; 

let buscar=document.getElementById("sinopsis");
buscar.addEventListener("blur",validaBuscar);
function validaBuscar(){
    regex=/^[a-zA-Z]+\s[a-zA-Z]+$/;
    if(!regex.test(buscar.value)){
           alert("Error: debe ingresar 2 palabras\n separadas por un espacio :)") ;
    }
}

let mostrar=document.getElementById('mostrar');
mostrar.addEventListener('click',mostrarPelisActor);

let ver=document.getElementById("ver3pelis");
ver.addEventListener('click',mostrarPelisNotas);


fetch('http://localhost:3000/movies.json')//es necesario la ruta completa
    .then(response => { 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();// Aquí se convierte automáticamente a JSON
        /*response.json() devuelve una promesa que resuelve con el cuerpo de la respuesta parseado como JSON. */
    })
    .then(data => {// Aquí `data` contiene los datos JSON obtenidos
        // Hacer algo con los datos JSON recibidos
        datos= data;
const table = document.createElement('table'); //crea la tabla
const headerRow = table.insertRow(0); //inserta la primera fila de cabecera
const headers = ['Título', 'Año', 'Duración']; //array con la info de la cabecera

// Agregar encabezados a la primera fila de la tabla
headers.forEach(headerText => {//itera cada celda de la cabecera headerText toma los valores del array
    const header = document.createElement('th');//crea la cabecera
    header.textContent = headerText;//añade titulo año y duracion en el contenido de la cabecera
    headerRow.appendChild(header);//añade la cabecera en la primera fila 
});

// Iterar sobre los datos y agregar cada película como una fila en la tabla
data.forEach(movie => {
    const row = table.insertRow(); //crea otra fila 
    const cells = [movie.title, movie.year, movie.duration];//el contenido de cada celda

    cells.forEach(cellText => {//itera en los objetos del archivo.json
        const cell = row.insertCell();//crea la celda
        cell.textContent = cellText; //le añade el contenido
    });
});
// Obtener el contenedor de la tabla por su ID
const tableContainer = document.getElementById('table-container1');
// Limpiar cualquier contenido existente dentro del contenedor
tableContainer.innerHTML = '';
// Agregar la tabla al contenedor
tableContainer.appendChild(table);
//ejercicio 2
const table2 = document.createElement('table'); 
const headerRow2 = table2.insertRow(0);//table2 para no insertar la cabecera en la 1° tabla 
const headers2 = ['Título','Nombre Actores', 'N° actores/actrices']; 

headers2.forEach(headerText2 => {
    const header2 = document.createElement('th');
    header2.textContent = headerText2;
    headerRow2.appendChild(header2);
});

data.forEach(movie => {
    const row2 = table2.insertRow(); 
    const cells2 = [movie.title, movie.actors, movie.actors.length];

    cells2.forEach(cellText => {
        const cell2 = row2.insertCell();
        cell2.textContent = cellText; 
    });
});

const tableContainer2 = document.getElementById('table-container2');
tableContainer2.innerHTML = '';
tableContainer2.appendChild(table2);

//ejercicio 3


//hay actores que se repiten en pelis asi que hay que eliminar esa repeticion
let actores = data.map(e => e.actors).flat(); // Obtener una lista plana de todos los actores
//console.log("actores: ", actores.length);
let actoresFiltrados = [...new Set(actores)]; // Crear un conjunto para eliminar duplicados y luego convertirlo de nuevo en un array
//console.log("Actores filtrados:", actoresFiltrados);

//Seleccion de actor 
 seleccion=document.getElementById('select');
actoresFiltrados.forEach(act=>{
        opcion=document.createElement('option');
        opcion.textContent=act;
        //opcion.value=''; // el valor lo ingresa el usuario
        seleccion.appendChild(opcion);
});

seleccion.addEventListener('change', actorElegido);
//console.log(seleccion.value);   
function actorElegido(){
  //  console.log(seleccion.value);
    const actorSeleccionado=seleccion.value;
    console.log("aqui si deberia mostrar el actor: ", actorSeleccionado);
}

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
function MatchSinopsis(){
        console.log("valor buscado:"+buscar.value);
        let titulospelis;
        let buscarofiltrar= document.getElementById("buscarofiltrar");
        let storyline= datos.map(e=>e.storyline).join(', ');
        //console.log("sinopsis: ",storyline);//tiene todas las storylines
        let storylinefiltrado;
        console.log("antes filtro: "+storyline);//storieline con las 2 palabras
        if (storyline.toUpperCase().includes(buscar.value.toUpperCase()))  {//funciona perfecto
            storylinefiltrado=datos.filter(e=>e.storyline.toUpperCase().includes(buscar.value.toUpperCase()));
            console.log("filtrado: "+storylinefiltrado);//storieline con las 2 palabras
            //primero filtramos las sinopsis que coinciden y de esas obtener el titulo
            titulospelis=datos.filter(e=>e.storyline.toUpperCase().includes(buscar.value.toUpperCase())).map(e=>e.title).join(', ');
            console.log("titulos pelis:" , titulospelis);
            buscarofiltrar.innerHTML=titulospelis;
            buscarofiltrar.style.display='inline';
            const resultado= document.getElementById("resultado");
            resultado.innerHTML='resultado: ';
            resultado.style.display='inline';
        }else{buscarofiltrar.innerHTML='No se encontro ningún resultado';
            buscarofiltrar.style.display='inline';}
    }

function mostrarPelisActor(){
    if(seleccion.value===''){
    console.log("no ha seleccionado ningun actor")       
    }else{
    console.log("actor seleccionado:", seleccion.value);
    //Mostrar las peliculas en que ha trabajado ese actor
    const pelisActor=document.getElementById('pelisActor');//donde se va a renderizar
    let pelisdeActor=[];
    let actoressinFiltro= datos.map(e=>{ 
        if(e.actors.flat().join(',').includes(seleccion.value)){//de todos los actores lo que incluyan al actor que me interesa
           pelisdeActor.push(e.title);//añade cada peli en el array de ese actor
           return true;
        }
        return false;}
        );
  pelisActor.textContent=pelisdeActor.join(', ');//renderizado
    pelisActor.style.display='inline';//en linea
    resultadoActor.textContent='resultado: ';
    resultadoActor.style.display='inline';
}
    }

function mostrarPelisNotas() {
    // Obtenemos las fechas de inicio y fin con objetos
    fechainicio = new Date(document.getElementById('fechainicio').value);
    fechafin = new Date(document.getElementById('fechafinal').value);
    // Validar si las fechas son válidas
    if (isNaN(fechainicio.getTime()) || isNaN(fechafin.getTime())) {
        alert("Error: Por favor, ingrese fechas válidas.");
        return;
    }
    // Filtramos las pelis por el rango de fechas
    const peliculasEnRango = datos.filter(e => {
        const releaseDate = new Date(e.releaseDate);
        return releaseDate >= fechainicio && releaseDate <= fechafin;
    });

    // Se calcula la media de puntuaciones de cada peli
    peliculasEnRango.forEach(pelicula => {
        const totalRatings = pelicula.ratings.reduce((acc, rating) => acc + rating, 0);
        //para no tener problema de ambito de variable es mejor crear una propiedad al objeto pelicula
        //de esa forma ya podemos usar esa propiedad para luego usarla en el ordenamiento
        pelicula.promedioRating = totalRatings / pelicula.ratings.length;
    });

    // Ordena las pels por la media de puntuaciones de mayor a menor
    peliculasEnRango.sort((a, b) => b.promedioRating - a.promedioRating);

    // Tomar las tres pelis con la media más alta
    const top3Peliculas = peliculasEnRango.slice(0, 3);

    // Mostrar los titulos y urls de los pósters de las tres pelis
    const listaTitulos = document.getElementById('titulos');
    listaTitulos.innerHTML = ''; // Limpiar contenido anterior

    top3Peliculas.forEach(pelicula => {
        const li = document.createElement('li');
        li.textContent = ` Título: ${pelicula.title} `;//agregamos algo de espacio
        const span = document.createElement('span');
        span.textContent = ` URL del póster: ${pelicula.posterurl}`;

        li.appendChild(span);//añadimos la url en cada elemento de la lista
        listaTitulos.appendChild(li);
    });
}//fin
