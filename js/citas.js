// Definimos variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
let editar 

class citas {
    constructor(){
        this.citas = []  // this es un apuntador
    }

    // agregar una cita
    agregarCita(cita){
        this.citas = [...this.citas,cita]
        console.log(this.citas)
    }

    eliminarCita(id){
        this.citas = this.citas.filter(i=>i.id !== id)

    }

    editarCita(citaAct){
        this.citas = this.citas.map(i => i.id === citaAct.id ? citaAct : i)
        //sintaxis 
        // condicion: +> condicion - ? true - : false
    }
}

class useri{
    imprimirAlerta(mensaje,tipo){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'text-white',
            'col-12')

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }

        // vamos a regresar el mensaje
        divMensaje.textContent = mensaje

        document.querySelector('#contenido').insertBefore(divMensaje,
            document.querySelector('.agregar-cita'))


            setTimeout(()=>{
                divMensaje.remove()
            }, 3000)
    }
//imprimiendo citas del arreglo
    imprimirCitas({citas}){
        this.limpiarHTML()
        citas.forEach(i => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = i 
            //creando html
            const divCita = document.createElement('div')
            divCita.classList.add('cita', 'p-3')

            //agregar textos
            const mascotaTexto = document.createElement('h2')
            mascotaTexto.classList.add('card-title', 'font-weight-bolder')
            mascotaTexto.textContent = mascota

            const propietarioTexto = document.createElement('p')
            propietarioTexto.textContent = 'Propietario: ' + propietario

            const telefonoTexto = document.createElement('p')
            telefonoTexto.textContent = 'Telefono: ' + telefono

            const fechaTexto = document.createElement('p')
            fechaTexto.textContent = 'Fecha: ' + fecha

            const horaTexto = document.createElement('p')
            horaTexto.textContent = 'Hora: ' + hora

            const sintomasTexto = document.createElement('p')
            sintomasTexto.textContent = 'Sintomas: ' + sintomas

            divCita.dataset.id = id

            //agregando boton de eliminar a la cita agendada
            const btnEliminar = document.createElement('button')
            //asignando clase (CSS)
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2')
            //agregando el svg del boton
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

            //agregando el evento del boton eliminar
            btnEliminar.onclick = ()=> eliminarCita(id)  

            //agregando boton de editar a la cita agendada
            const btnEditar = document.createElement('button')
            //asignando clase (CSS)
            btnEditar.classList.add('btn', 'btn-info')
            //agregando el svg del boton
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            //agregando el evento del boton editar
            btnEditar.onclick = ()=>cargarEdicion(i)

            //esto para imprimir los datos de la cita agendada
            divCita.appendChild(mascotaTexto)
            divCita.appendChild(propietarioTexto)
            divCita.appendChild(telefonoTexto)
            divCita.appendChild(fechaTexto)
            divCita.appendChild(horaTexto)
            divCita.appendChild(sintomasTexto)
            //Imprimiendo los botones de editar y eliminar
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            contenedorCitas.appendChild(divCita)
        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}


// Eventos
eventos() //recuerda inicializar
function eventos(){
    mascotaInput.addEventListener('input', datosCitas)
    propietarioInput.addEventListener('input', datosCitas)
    telefonoInput.addEventListener('input', datosCitas)
    fechaInput.addEventListener('input', datosCitas)
    horaInput.addEventListener('input', datosCitas)
    sintomasInput.addEventListener('input', datosCitas)
    formulario.addEventListener('submit', nuevaCita)
    
}

// // Crear objeto para guardar la info de los inputs

const citasObj ={
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// instanciacion
const administrarCitas = new citas()
const ui = new useri()

function datosCitas(e){
    //console.log(e.target.name); //name para evr si estas capturado el mismo elemento
    citasObj[e.target.name] = e.target.value //.value para que agregue el value
     console.log(citasObj);  //pruebaa que guarda el dato en la propiedad del obj que quieres
}

function nuevaCita(e){
    //validar campos vacios y agregar una nueva cita
    e.preventDefault()

    // extraccion de la info
    const {mascota, propietario, telefono, fecha, hora, sintomas} = 
    citasObj

    // validar
    if(mascota==='' || propietario==='' || telefono==='' ||
    fecha===''|| hora==='' || sintomas===''){
            //console.log('Todos los campos son obligatorios')
            ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        }else if(editar){
            //editar
            //console.log('editar')
            editar = false
            formulario.querySelector('button[type=submit]').textContent = 'Crear Cita'
            administrarCitas.editarCita({...citasObj})
            ui.imprimirAlerta('Se ha actualizado la cita correctamente')
            ui.imprimirCitas(administrarCitas)
        }else{
            // console.log('campos llenos')
            citasObj.id = Date.now()
             console.log(citasObj);
            
            administrarCitas.agregarCita({...citasObj})
            ui.imprimirAlerta('Se ha agendado su cita satisfactoriamente')
            ui.imprimirCitas(administrarCitas)
    }

    formulario.reset()
    reiniciarObjeto()
    console.log(citasObj);
    

    function reiniciarObjeto(){
        citasObj.mascota = ''
        citasObj.propietario = ''
        citasObj.telefono = ''
        citasObj.fecha = ''
        citasObj.hora = ''
        citasObj.sintomas = ''
        citasObj.id = ''
    }
}

//funcion de eliminar citas desde los botones en las citas agendadas
function eliminarCita(id){
    administrarCitas.eliminarCita(id)
    // mensaje de lo que se ha hecho
    ui.imprimirAlerta('La cita se ha eliminado correctamente')
    //eliminando
    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(citaObjeto){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = citaObjeto

    //llenar los inputs con la informacion del div donde estoy editando
    mascotaInput.value = mascota
    propietarioInput.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    //llenar el objeto
    citasObj.mascota = mascota
    citasObj.propietario = propietario
    citasObj.fecha = fecha
    citasObj.hora = hora
    citasObj.sintomas = sintomas
    citasObj.telefono = telefono
    citasObj.id = id

    formulario.querySelector('button[type=submit]').textContent = 'Actualizar'

    //console.log(citasObj);
    editar = true
}