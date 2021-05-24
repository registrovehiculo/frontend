<template>
  <div>
    <div class="container">
      <p
        class="has-text-centered margin-top-30"
        style="font-size: 32px; font-weight: 700"
      >
        Manual de usuario
      </p>
      <hr />
      <section>
        <div class="columns is-centered">
          <div class="column">
            <b-tabs size="is-large" position="is-centered">
              <b-tab-item label="Transporte">
                <ul>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo obtener los usuarios que están registro de vehículo
                    que no estan en el sistema Infogesti?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez logeado aparecera la página principal, el usuario
                    deberá elegir primeramente la ciudad por la cual desea
                    comparar los datos. Para esto elige el país, seguido de la
                    provincia y la cuidad como última opción.
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte1.png" />
                  </li>
                  <li style="font-size: 18px">
                    En el menú desplegable “Acciones...”, seleccionar la opción
                    <span style="color: #d60000"
                      >Contribuyentes que están en Registro Vehiculo que no en
                      InfoGesti</span
                    >
                    (opcion 1)
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte2.png" />
                  </li>
                  <li style="font-size: 18px">
                    Hacer click en el boton
                    <span style="color: #d60000">Buscar</span> mostrando la
                    resultados, tardando de 10 a 25 seg en dependencia del
                    tamaño de la base de datos. <br />
                    Nota: El botón estará deshabilitado si no se ha seleccionado
                    las opciones anteriores.
                  </li>
                  <li
                    class="has-text-centered margin-top-30"
                    style="font-size: 18px"
                  >
                    Quedando de la siguiente forma:
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte3.png" />
                  </li>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo obtener los usuarios que están en ambos sistemas con
                    informaciones diferentes
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez seleccionado la ciudad seleccionar:
                    <span style="color: #d60000">
                      Contribuyentes que estan en ambos registros con
                      informaciones diferentes</span
                    >
                    (opcion 2)
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte7.png" />
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Seleccionar el criterio de busqueda, ya sea por chapas
                    diferentes o nombres distintos. Hacer click en el botón
                    <span style="color: #d60000">Buscar</span>. <br />Nota: El
                    botón buscar estará deshabilitado si no se ha seleccionado
                    las opciones.
                  </li>
                  <div class="level">
                    <li class="level-left has-text-centered margin-top-30">
                      <img src="~/static/transporte8.png" />
                    </li>
                    <li class="level-right has-text-centered margin-top-30">
                      <img src="~/static/transporte9.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo obtener los usuarios que coinciden sus informaciones?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez seleccionado la ciudad seleccionar
                    <span style="color: #d60000"
                      >Contribuyentes totalmente coincidentes</span
                    >
                    (opción 3)
                  </li>
                  <div class="level">
                    <li class="level-left has-text-centered margin-top-30">
                      <img src="~/static/transporte10.png" />
                    </li>
                    <li class="level-right has-text-centered margin-top-30">
                      <img src="~/static/transporte11.png" />
                    </li>
                  </div>
                  <li class="margin-top-30" style="font-size: 18px">
                    Hacer click en el boton
                    <span style="color: #d60000">Buscar</span> el cual mostrará
                    la tabla con los resultados, tardando de 10 a 25 seg en
                    dependencia del tamaño de la base de datos. Nota: El botón
                    botón estará deshabilitado si no se ha seleccionado las
                    opciones anteriores.
                  </li>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo obtener los usuarios que están en InfoGesti que no
                    están en Registro Transporte?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez seleccionado la ciudad seleccionar
                    <span style="color: #d60000">
                      Contribuyentes que están en Infogesti que no están en
                      Tranporte</span
                    >
                    (opción 4)
                  </li>
                  <div class="level">
                    <li class="level-left has-text-centered margin-top-30">
                      <img src="~/static/transporte12.png" />
                    </li>
                    <li class="level-right has-text-centered margin-top-30">
                      <img src="~/static/transporte13.png" />
                    </li>
                  </div>
                  <li class="margin-top-30" style="font-size: 18px">
                    Hacer click en el botón Buscar el cual mostrará la tabla con
                    los resultados, tardando de 10 a 25 seg en dependencia del
                    tamaño de la base de datos. Nota: El botón estará
                    deshabilitado si no se ha seleccionado las opciones
                    anteriores.
                  </li>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo buscar un usuario en la base de datos?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez obtenido los datos deseados, el usuario podra buscar
                    un usuario en especifíco filtrando por el dpa, chapa, número
                    del motor, número de carroseria, marca del motor, numero de
                    identidad, nombre y dirección respectivamente.
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte4.png" />
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Si el usuario desea buscar un usuario en todo la base de
                    datos de Registro de transporte, el usuario deberá escribir
                    el nombre en la parte superior izquierda
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte5.png" />
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    El buscador le facilitará al usuario el autocompletamiento
                    para una mejor experiencia de búsqueda. Una vez encontrado
                    hacer click sobre el nombre para mostar detalles del mismo.
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte6.png" />
                  </li>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo exportar los datos a una tabla excel?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez que se ha mostrado los datos el usuario podrá
                    exportarlos a una tabla de excel. Para esto hacer click en
                    el botón de
                    <span style="color: #d60000"> exportar</span> donde
                    desplegable en la derecha de la pantalla. Hacer click en
                    documento excel. Nota: El botón de exportar estará
                    deshabilitado si no hay datos que exportar.
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte14.png" />
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/transporte15.png" />
                  </li>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo salir o desloguearse del sistema?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para salir el usuario debera hacer click sobre su nombre de
                    usuario en la parte superior derecha. Se mostrará un menú
                    desplegable, hacer click en salir la cual lo direccionará a
                    la pagina de bienvenida .
                  </li>
                  <li class="has-text-centered margin-top-30 margin-bottom-60">
                    <img src="~/static/transporte16.png" />
                  </li>
                </ul>
              </b-tab-item>
              <b-tab-item label="Embarcaciones">
                <ul>
                  <li
                    class="has-text-centered font-size-3 margin-top-30"
                    style="font-weight: 700"
                  >
                    ¿Cómo acceder al sistema?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez logeado aparecera la página principal. El usuario
                    deberá elegir en la parte superior derecha la opción
                    <span style="color: #0855f5;">Cambiar a embarcación.</span>
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion1.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion2.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar todos los propietarios?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5">Mostrar todos</span> (opción
                    1). El cual auto seguido le mostrará al usuario una tabla
                    con todos los propietarios de la base de datos de capitanía.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion3.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion4.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar todos los propietarios con más de una
                    embarcación de la base de datos de capitanía.?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios de más de una embarcación</span
                    >
                    (opción 2). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios de más de una embarcación.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion5.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion6.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar propietarios con igual númer de identidad y
                    nombres diferentes.?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios con igual número de identidad y
                      nombres diferentes</span
                    >
                    (opción 3). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios con igual númer de
                    identidad y nombres diferentes.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion7.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion8.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar propietarios que no están registrados en el
                    InfoGesti?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios que no están registrados en el
                      InfoGesti</span
                    >
                    (opción 4). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios que no están registrados en
                    el InfoGesti.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion9.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion10.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar propietarios que están en el InfoGesti y no
                    están en la base de datos de Capitanía?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios que están registrados en el
                      InfoGesti</span
                    >
                    (opción 5). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios que están en el InfoGesti y
                    no están en la base de datos de Capitanía.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion11.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion12.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar propietarios que están en ambos sistemas con
                    embarcaciones distintas?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios que están en ambos sistemas con
                      embarcaciones distintas</span
                    >
                    (opción 6). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios que están en ambos sistemas
                    con embarcaciones distintas.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion13.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion14.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar propietarios que están en ambos sistemas con
                    capitanía distintas?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios que están en ambos sistemas con
                      capitanía distintas</span
                    >
                    (opción 7). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios que están en ambos sistemas
                    con capitanía distintas.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion15.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion16.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar propietarios que están en ambos sistemas con
                    basificaciones distintas?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios que están en ambos sistemas con
                      basificaciones distintas</span
                    >
                    (opción 8). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios que están en ambos sistemas
                    con basificaciones distintas.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion17.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion18.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo mostrar propietarios que están en ambos sistemas con
                    registros distintos?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Para ello hacer click en el menú desplegable
                    <span style="color: #0855f5">Acciones...</span>. <br />
                    Elegir:
                    <span style="color: #0855f5"
                      >Mostrar propietarios que están en ambos sistemas con
                      registros distintos</span
                    >
                    (opción 9). El cual auto seguido le mostrará al usuario una
                    tabla con todos los propietarios que están en ambos sistemas
                    con registros distintos.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion19.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion20.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo exportar los datos a una tabla de excel?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    Una vez que se haya elegido la opción en el menú
                    <span style="color: #0855f5">Acciones...</span>. aparecerá
                    un boton <span style="color: #0855f5">Exportar</span>. a su
                    derecha. Hacer click sobre este.
                  </li>
                  <div class="level">
                    <li class="has-text-centered margin-top-30 level-left">
                      <img src="~/static/embarcacion21.png" />
                    </li>
                    <li class="has-text-centered margin-top-10 level-right">
                      <img src="~/static/embarcacion22.png" />
                    </li>
                  </div>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo buscar propietario en la base de datos de Capitanía?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    El usuario deberá seleccionar “Mostrar todos” en el menú
                    acciones. Aparecerá una tabla con todos los propietarios.
                    Podrá buscarlos por provincias, número identidad, nombre,
                    número de registro, embarcaciones, capitanía o basificación
                    respectivamente.
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/embarcacion23.png" />
                  </li>
                  <li
                    class="has-text-centered font-size-3"
                    style="font-weight: 700"
                  >
                    ¿Cómo Salir o desloguearse del sistema?
                  </li>
                  <li class="margin-top-30" style="font-size: 18px">
                    En la parte superior derecha hacer click sobre el nombre,
                    aparecerá un menú; hacer click en
                    <span style="color: #0855f5">salir</span>.
                  </li>
                  <li class="has-text-centered margin-top-30">
                    <img src="~/static/embarcacion24.png" />
                  </li>
                </ul>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
