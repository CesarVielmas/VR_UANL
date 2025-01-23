<script src="./SideBarViewScene.vue.js"></script>
<style src="./SideBarViewScene.vue.css"></style>

<template>
    <div class="sideBar">
        <div class="content" :style="!isOnHidden?'animation: slideIn 0.5s forwards;':'animation: slideOut 0.5s forwards;'">
            <!-- ButtonLarge | ButtonHigh | ButtonWidth | PositionX | PositionY | PositionZ | RotationSideX | RotationSideY | RotationSideZ | HorientationButton | EsceneId | PageToSenderIdEscene -->
            <h2 class="tittlePropertys" :style="`background-color:${background};`">Propiedades Del Boton</h2>
            <div class="div">
                <h3 class="tittle">Largo Del Boton</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="0.250" max="2.500" step="0.01" />
                <input class="bar" :style="`accent-color:${background};`"  type="range" min="0.250" max="2.500" step="0.01" value="0.250"  />
            </div>
            <div class="div">
                <h3 class="tittle">Altura Del Boton</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-2.500" max="2.500" step="0.01" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-2.500" max="2.500" step="0.01" value="-2.500"  />
            </div>
            <div class="div">
                <h3 class="tittle">Ancho Del Boton</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-1.500" max="1.500" step="0.01" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-1.500" max="1.500" step="0.01" value="-1.500"  />
            </div>
            <div class="div">
                <h3 class="tittle">Coordenada En X</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-15.000" max="15.000" step="0.01" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-15.000" max="15.000" step="0.01" value="-15.000"  />
            </div>
            <div class="div">
                <h3 class="tittle">Coordenada En Y</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-5.000" max="0.800" step="0.01" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-5.000" max="0.800" step="0.01" value="-5.000"  />
            </div>
            <div class="div">
                <h3 class="tittle">Coordenada En Z</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-360.000" max="360.000" step="10" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-360.000" max="360.000" step="10" value="-360.000"  />
            </div>
            <div class="div">
                <h3 class="tittle">Rotacion En X</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-360.000" max="360.000" step="10" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-360.000" max="360.000" step="10" value="-360.000"  />
            </div>
            <div class="div">
                <h3 class="tittle">Rotacion En Y</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-360.000" max="360.000" step="10" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-360.000" max="360.000" step="10" value="-360.000"  />
            </div>
            <div class="div">
                <h3 class="tittle">Rotacion En Z</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-360.000" max="360.000" step="10" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-360.000" max="360.000" step="10" value="-360.000"  />
            </div>

            <button class="buttonSave" v-on:click="onSaveButton">Guardar</button>
            <button class="buttonCancel" v-on:click="onCancelButton">Cancelar</button>
        </div>
    </div>
</template>