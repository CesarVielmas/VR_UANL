<script src="./ViewScenes.vue.js"></script>
<style src="./ViewScenes.vue.css"></style>

<template>
    <div class="addNewScene" v-if="enterToAddSceneBool">
        <div class="content">
            <h2 :style="`background-color:${colorBackground};`">Nombre De La Escena</h2>
            <input :style="`background-color:${colorBackground};`" v-model="newNameScene" type="text" />
            <button v-on:click="enterToSceneToEdit">Continuar</button>
            <button v-on:click="cancelToAddScene" style="background-color: rgb(75, 6, 6);">Cancelar</button>
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
            <!-- Fondo con la imagen -->
            <a-plane
            id="object"
            color="white"
            rotation="-90 0 0"
            position="0 0 0"
            width="0.35"
            height="0.2"
            class="clickable"
            mouse-interaction>
            <!-- Imagen de fondo -->
            <a-image
                :src="universitySelected.listEscenes[0].imageScene"
                width="0.35"
                height="0.2"
                position="0 0 0.001">
            </a-image>
            <!-- Capa negra semitransparente -->
            <a-plane
                color="black"
                opacity="0.45"
                width="0.35"
                height="0.2"
                position="0 0 0.002">
            </a-plane>
            <!-- Texto -->
            <a-text
                :value="universitySelected.listEscenes[0].nameScene"
                color="white"
                align="center"
                position="0 0 0.003"
                width="0.65">
            </a-text>
            <!-- Iconos en la parte superior (editar escena, editar nombre ,vaciar escena, eliminar escena,estado de la escena)-->
            <a-entity position="0 0.08 0.004">
                <a-image
                :src="require('@/assets/icon_edit_scene.png')"
                width="0.025"
                height="0.025"
                position="0.005 -0.005 0">
                </a-image>
                <a-image
                :src="require('@/assets/icon_edit_name_scene.png')"
                width="0.027"
                height="0.027"
                position="0.045 -0.005 0">
                </a-image>
                <a-image
                :src="require('@/assets/icon_void_scene.png')"
                width="0.027"
                height="0.025"
                position="0.085 -0.005 0">
                </a-image>
                <a-image
                :src="require('@/assets/icon_delete_scene.png')"
                width="0.025"
                height="0.025"
                position="0.127 -0.006 0">
                </a-image>
                <a-circle
                    :color="universitySelected.listEscenes[0].imageScene != '' && universitySelected.listEscenes[0].listButtonRed.length != 0 ? 'rgb(88, 255, 88)':universitySelected.listEscenes[0].imageScene != ''? 'rgb(255, 251, 41)' : 'rgb(255, 101, 101)'"
                    radius="0.005"
                    position="0.16 0.003 0">

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