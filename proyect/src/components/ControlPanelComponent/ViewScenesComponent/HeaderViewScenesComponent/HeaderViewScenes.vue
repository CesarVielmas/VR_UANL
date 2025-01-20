<script src="./HeaderViewScenes.vue.js"></script>
<style src="./HeaderViewScenes.vue.css"></style>

<template>
    <div class="header">
        <div class="logoFaculty">
            <img :src="logoUrl" alt="imageFaculty" />
            <h2>{{ nameFaculty }}</h2>
        </div>
        <div class="buttonsActions">
            <div class="buttonsZoom">
                <h2>Vista Area</h2>
                <div class="plus" v-on:click="aumentVist">
                    <h2>+</h2>
                </div>
                <div class="rest" v-on:click="dismissVist">
                    <h2>-</h2>
                </div>
            </div>
            <div class="buttonsDesp">
                <h2>Desplazar</h2>
                <div class="plus" v-on:click="aumentDesp">
                    <h2>+</h2>
                </div>
                <div class="rest" v-on:click="dismissDesp">
                    <h2>-</h2>
                </div>
            </div>
            <div class="buttonsResponse">
                <button class="reset" v-on:click="resetCamera">Resetear Vista</button>
                <button class="return">Regresar</button>
                <button class="save">Guardar</button>
            </div>
        </div>
    </div>
    <div class="information">
        <ul>
            <li class="infoOne"><p>Escena Completa</p></li>
            <li class="infoTwo"><p>Escena Sin Redireccion</p></li>
            <li class="infoThree"><p>Escena Incompleta</p></li>
        </ul>
    </div>
    <div class="buttonsDirection">
        <div class="directionLeft">
            <img src="../../../../assets/icon_left.png" alt="iconLeft" />
        </div>
        <div class="directionRight">
            <img src="../../../../assets/icon_right.png" alt="iconRight" />
        </div>
    </div>
</template>