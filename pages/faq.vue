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
                Lorem ipsum dolor sit amet.
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
