<script src="./ViewScenes.vue.js"></script>
<style src="./ViewScenes.vue.css"></style>

<template>
    <div class="addNewScene" v-if="enterToAddSceneBool">
        <div class="content">
            <h2 :style="`background-color:${colorBackground};`">{{ isEditNameScene!=0?"Nuevo Nombre De Escena":"Nombre De La Escena" }}</h2>
            <input :style="`background-color:${colorBackground};`" v-model="newNameScene" type="text" />
            <button v-on:click="isEditNameScene === 0?enterToSceneToEdit():editNameSceneChange()">{{isEditNameScene?"Guardar":"Continuar"}}</button>
            <button v-on:click="isEditNameScene === 0?cancelToAddScene():enterToAddSceneBool=false;" style="background-color: rgb(75, 6, 6);">Cancelar</button>
        </div>
    </div>
    <div class="deleteVoidScene" v-if="deleteVoidScene">
        <div class="content">
            <h2 :style="`background-color:${colorBackground};`">{{ stateVoidDelete === 0?"¿Esta Seguro De Vaciar La Escena?":"¿Esta Seguro De Eliminar La Escena?" }}</h2>
            <button v-on:click="stateVoidDelete === 0?enterToVoidCompleteScene():enterToDeleteCompleteScene()">{{stateVoidDelete === 0?"Vaciar":"Eliminar"}}</button>
            <button v-on:click="this.deleteVoidScene = false;" style="background-color: rgb(5, 65, 5);">Cancelar</button>
        </div>
    </div>
    <HeaderViewScenes :logoUrl="universitySelected.logoFaculty" :nameFaculty="universitySelected.nameFaculty" :aumentVist="incrementCameraY" :dismissVist="decrementCameraY" :aumentDesp="incrementCameraZ" :dismissDesp="decrementCameraZ" :resetCamera="resetCamera" />
    <a-scene embedded style="width: 100%; height: 100%;">
      <!-- Cámara con vista desde arriba -->
      <a-entity id="cameraRing" rotation="0 0 0" position="0 0 0">
        <a-camera id="camera" look-controls="enabled:false;" wasd-controls="enabled:false;" raycaster="objects: .clickable" rotation="-90 0 0">
            <a-cursor material="opacity: 0;" position="0 3 0" raycaster="objects: .clickable" fuse="false"></a-cursor>
        </a-camera>
      </a-entity>
      <!-- Suelo -->
        <a-entity v-if="universitySelected.listEscenes.length === 0">
            <a-plane 
                id="planeNew"
                color="#328216" 
                rotation="-90 0 0" 
                position="0 1 0"
                width="0.35" 
                height="0.2"
                class="clickable"
                mouse-interaction
                >
                <a-text 
                    value="Agregar Nueva Escena" 
                    align="center" 
                    position="0 0 0.01" 
                    width="0.5">
                </a-text>
            </a-plane>
        </a-entity>

        <a-entity v-if="universitySelected.listEscenes.length >= 1" position="0 1 0">
            <a-plane
            v-for="escenes in universitySelected.listEscenes"
            :id="`object-scene-${escenes.idEscene}`"
            :key="escenes.idEscene"
            :ref="`entityRef-${escenes.idEscene}`"
            color="white"
            rotation="-90 0 0"
            :position="positionsScenes.idScene === escenes.idEscene?positionsScenes.position:'0 0 0'"
            width="0.35"
            height="0.2"
            @loaded="()=>onEsceneLoaded(escenes)"
            mouse-interaction>
            <a-image
                :src="escenes.imageScene"
                width="0.35"
                height="0.2"
                position="0 0 0.001">
            </a-image>
            <a-plane
                :id="`object-${escenes.idEscene}`"
                color="black"
                opacity="0.45"
                width="0.35"
                height="0.2"
                position="0 0 0.002"
                class="hover">
            </a-plane>
            <a-text
                :id="`object-${escenes.idEscene}`"
                :value="escenes.nameScene"
                color="white"
                align="center"
                position="0 0 0.003"
                width="0.65"
                class="hover">
            </a-text>
            <a-entity v-if="escenes.listButtonRed.length >= 1">
                <a-entity 
                        v-for="buttonRed in escenes.listButtonRed" 
                        :key="`red-${buttonRed.idButtonRedirect}`" 
                        :position="buttonRed.horientationButton === 'Left'?'-0.9 0 0':buttonRed.horientationButton === 'Right'?'0.56 0 0':buttonRed.horientationButton === 'Center'?'0.5 -0.03 0':buttonRed.horientationButton === 'Behind'?'0.5 -0.03 0':''">
                    <a-plane
                        color="white"
                        width="0.05"
                        height="0.15"
                        :position="buttonRed.horientationButton === 'Left'?'0.56 0 0':buttonRed.horientationButton === 'Right'?'0.56 0 0':buttonRed.horientationButton === 'Center'?'0.5 -0.03 0':buttonRed.horientationButton === 'Behind'?'0.5 -0.03 0':''"
                        :rotation="buttonRed.horientationButton === 'Left'?'0 0 90':buttonRed.horientationButton === 'Right'?'0 0 -90':buttonRed.horientationButton === 'Center'?'0 0 0':buttonRed.horientationButton === 'Behind'?'0 0 0':''">
                    </a-plane>
                    <a-triangle
                        color="white"
                        vertex-a="0 0.1 0"
                        vertex-b="-0.05 0 0"
                        vertex-c="0.05 0 0"
                        position="0.5 0 0"
                        :rotation="buttonRed.horientationButton === 'Left'?'0 0 90':buttonRed.horientationButton === 'Right'?'0 0 -90':buttonRed.horientationButton === 'Center'?'0 0 0':buttonRed.horientationButton === 'Behind'?'0 0 0':''">
                    </a-triangle>
                    <a-circle
                        :id="`addInButtonRed-${buttonRed.idButtonRedirect}`"
                        v-if="Object.keys(buttonRed.pageToSender).length === 0"
                        color="rgb(5, 65, 5)"
                        radius="0.05"
                        position="0.28 -0.004 0"
                        class="clickable">
                        <a-text
                            :id="`addInButtonRed-${buttonRed.idButtonRedirect}`"
                            value="+"
                            position="0 -0 0"
                            color="white"
                            align="center"
                            scale="0.35 0.35 0.35">
                        </a-text>
                    </a-circle>
                </a-entity>
            </a-entity>
            <a-entity position="0 0.08 0.004" v-if="universitySelected.listEscenes.length >= 1" :key="`images-${escenes.idEscene}`">
                <a-image
                :id="`editScene-${escenes.idEscene}`"
                :key="`editScene-${escenes.idEscene}`"
                :src="require('@/assets/icon_edit_scene.png')"
                width="0.025"
                height="0.025"
                position="0.005 -0.005 0"
                class="clickable">
                </a-image>
                <a-image
                :id="`editNameScene-${escenes.idEscene}`"
                :key="`editNameScene-${escenes.idEscene}`"
                :src="require('@/assets/icon_edit_name_scene.png')"
                width="0.027"
                height="0.027"
                position="0.045 -0.005 0"
                class="clickable">
                </a-image>
                <a-image
                :id="`voidScene-${escenes.idEscene}`"
                :key="`voidScene-${escenes.idEscene}`"
                :src="require('@/assets/icon_void_scene.png')"
                width="0.027"
                height="0.025"
                position="0.085 -0.005 0"
                class="clickable">
                </a-image>
                <a-image
                :id="`deleteScene-${escenes.idEscene}`"
                :key="`deleteScene-${escenes.idEscene}`"
                :src="require('@/assets/icon_delete_scene.png')"
                width="0.025"
                height="0.025"
                position="0.127 -0.006 0"
                class="clickable">
                </a-image>
                <a-circle
                    :id="`stateScene-${escenes.idEscene}`"
                    :color="escenes.imageScene != '' && escenes.listButtonRed.length != 0 ? 'rgb(88, 255, 88)':escenes.imageScene != ''? 'rgb(255, 251, 41)' : 'rgb(255, 101, 101)'"
                    radius="0.005"
                    position="0.16 0.003 0"
                    class="clickable">
                </a-circle>
            </a-entity>
            </a-plane>
        </a-entity>

        <a-plane 
            id="plane"
            :color="colorBackground" 
            rotation="-90 0 0" 
            position="0 0 0"
            width="100" 
            height="100"
            class="clickable"
            mouse-interaction>
        </a-plane>
    </a-scene>
    <FooterViewScenes :functionMaxRestSee="incrementCameraYMax" :functionMaxPlusSee="decrementCameraYMax"/>
</template>