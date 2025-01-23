<script src="./SideBarViewScene.vue.js"></script>
<style src="./SideBarViewScene.vue.css"></style>

<template>
    <div class="sideBar">
        <div class="content" :style="!isOnHidden?'animation: slideIn 0.5s forwards;':'animation: slideOut 0.5s forwards;'">
            <h2 class="tittlePropertys" :style="`background-color:${background};`">Propiedades Del Boton</h2>
            
            <div class="div">
                <h3 class="tittle">Largo Del Boton</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="0.250" max="2.500" step="0.01" :value="isButtonRed?buttonOnEditRed.buttonLarge:buttonOnEditInf.buttonLarge" @input="updateButtonValue('buttonLarge', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="0.250" max="2.500" step="0.01" :value="isButtonRed?buttonOnEditRed.buttonLarge:buttonOnEditInf.buttonLarge" @input="updateButtonValue('buttonLarge', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Altura Del Boton</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-2.500" max="2.500" step="0.01" :value="isButtonRed?buttonOnEditRed.buttonHigh:buttonOnEditInf.buttonHigh" @input="updateButtonValue('buttonHigh', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-2.500" max="2.500" step="0.01" :value="isButtonRed?buttonOnEditRed.buttonHigh:buttonOnEditInf.buttonHigh" @input="updateButtonValue('buttonHigh', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Ancho Del Boton</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-1.500" max="1.500" step="0.01" :value="isButtonRed?buttonOnEditRed.buttonWidth:buttonOnEditInf.buttonWidth" @input="updateButtonValue('buttonWidth', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-1.500" max="1.500" step="0.01" :value="isButtonRed?buttonOnEditRed.buttonWidth:buttonOnEditInf.buttonWidth" @input="updateButtonValue('buttonWidth', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Coordenada En X</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-15.000" max="15.000" step="0.01" :value="isButtonRed?buttonOnEditRed.positionX:buttonOnEditInf.positionX" @input="updateButtonValue('positionX', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-15.000" max="15.000" step="0.01" :value="isButtonRed?buttonOnEditRed.positionX:buttonOnEditInf.positionX" @input="updateButtonValue('positionX', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Coordenada En Y</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-5.000" max="0.800" step="0.01" :value="isButtonRed?buttonOnEditRed.positionY:buttonOnEditInf.positionY" @input="updateButtonValue('positionY', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-5.000" max="0.800" step="0.01" :value="isButtonRed?buttonOnEditRed.positionY:buttonOnEditInf.positionY" @input="updateButtonValue('positionY', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Coordenada En Z</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-15.000" max="15.000" step="0.01" :value="isButtonRed?buttonOnEditRed.positionZ:buttonOnEditInf.positionZ" @input="updateButtonValue('positionZ', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-15.000" max="15.000" step="0.01" :value="isButtonRed?buttonOnEditRed.positionZ:buttonOnEditInf.positionZ" @input="updateButtonValue('positionZ', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Rotacion En X</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-360.000" max="360.000" step="10" :value="isButtonRed?buttonOnEditRed.rotationSideX:buttonOnEditInf.rotationSideX" @input="updateButtonValue('rotationSideX', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-360.000" max="360.000" step="10" :value="isButtonRed?buttonOnEditRed.rotationSideX:buttonOnEditInf.rotationSideX" @input="updateButtonValue('rotationSideX', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Rotacion En Y</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-360.000" max="360.000" step="10" :value="isButtonRed?buttonOnEditRed.rotationSideY:buttonOnEditInf.rotationSideY" @input="updateButtonValue('rotationSideY', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-360.000" max="360.000" step="10" :value="isButtonRed?buttonOnEditRed.rotationSideY:buttonOnEditInf.rotationSideY" @input="updateButtonValue('rotationSideY', $event)" />
            </div>
            
            <div class="div">
                <h3 class="tittle">Rotacion En Z</h3>
                <input class="number" type="number" :style="`border: thin solid ${background};`" min="-360.000" max="360.000" step="10" :value="isButtonRed?buttonOnEditRed.rotationSideZ:buttonOnEditInf.rotationSideZ" @input="updateButtonValue('rotationSideZ', $event)" />
                <input class="bar" :style="`accent-color:${background};`" type="range" min="-360.000" max="360.000" step="10" :value="isButtonRed?buttonOnEditRed.rotationSideZ:buttonOnEditInf.rotationSideZ" @input="updateButtonValue('rotationSideZ', $event)" />
            </div>

            <button class="buttonSave" v-on:click="onSaveButton">Guardar</button>
            <button class="buttonCancel" v-on:click="onCancelButton">Cancelar</button>
        </div>
    </div>
</template>