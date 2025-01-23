<script src="./ViewScene.vue.js"></script>
<style src="./ViewScene.vue.css"></style>

<template>
    <div style="height: 100%;width: 100%;">
        <SideBarViewScene v-if="isEditingButton" :background="colorBackground" :cancelPropertysButton="onCancelEditPropertysButton" :savePropertysButton="onSaveEditPropertysButton" :buttonOnEditRed="buttonRedirectEdit" :buttonOnEditInf="buttonInformationEdit" />
        <a-scene v-if="device === 'Desktop'" :key="scene.nameScene" vr-mode-ui="enabled: true" style="position: relative; width: 100%; height: 100%">
        <a-entity id="cameraRig" position="0 0 0">
            <a-camera id="mainCamera" look-controls="enabled:true;" wasd-controls="enabled:false;">
                <a-cursor raycaster="objects: .clickable" fuse="false" material="color: white; shader: flat" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"></a-cursor>
            </a-camera>
        </a-entity>
        <a-sky
            id="skyElement"
            :src="scene.imageScene || ''"
            :color="!scene.imageScene ? '#FFFFFF' : ''"
            rotation="0 0 0"></a-sky>
        <a-image 
            v-if="!scene.imageScene" 
            position="0.2 1.6 -1.1" 
            :src="require('@/assets/not_have_image_scene.webp')" 
            look-at="#mainCamera" 
            class="clickable"
            v-on:click="onChangeImageScene">
        </a-image>
        <input type="file" ref="sceneAddImage" @change="handleFileUploadScene" accept="image" style="visibility: hidden;" />
        <a-entity id="areaButtons" raycaster="objects: .clickable" v-if="scene.listButtonRed.length > 0">
            <a-entity raycaster="objects: .clickable" cursor="fuse: false; rayOrigin: mouse"></a-entity>
            <a-entity
            v-for="(element, index) in scene.listButtonRed"
            :key="element.idButtonRedirect"
            :ref="'arrowModel-' + index"
            gltf-model="url(/direction_arrow/scene.gltf)"
            :scale="`${element.buttonLarge} ${element.buttonHigh} ${element.buttonWidth}`"
            :position="`${element.positionX} ${element.positionY} ${element.positionZ}`"
            :rotation="`${element.rotationSideY} ${element.rotationSideX} ${element.rotationSideZ}`"
            class="clickable"
            v-on:click="() =>{}"
            @model-loaded="()=>loadModelsButtonsRedirect(index)"
            @mouseenter="onMouseEnterButtonRedirect(index)" 
            @mouseleave="onMouseLeaveButtonRedirect(index)">
            </a-entity>

            <a-image 
            v-for="(element, index) in scene.listButtonRed" 
            :key="'tooltip-' + element.idButtonRedirect" 
            :id="'tooltip-' + index" 
            :position="`${element.positionX} ${element.positionY + 1.1} ${element.positionZ}`" 
            :rotation="element.horientationButton === 'Right'?'0 -90 0':element.horientationButton === 'Left'?'0 90 0':element.horientationButton === 'Behind'?'0 -180 0':'0 0 0'"
            v-bind:src="element.pageToSender?.imageScene || require('@/assets/not_found_scene.png')"
            width="2" 
            height="1.3" 
            opacity="0"
            visible="false">
            </a-image>

            <a-text 
            v-for="(element, index) in scene.listButtonRed" 
            :key="'tooltip-text-' + element.idButtonRedirect" 
            :id="'tooltip-text-' + index" 
            :position="`${element.positionX} ${element.positionY + 0.75} ${element.positionZ}`" 
            :rotation="element.horientationButton === 'Right'?'0 -90 0':element.horientationButton === 'Left'?'0 90 0':element.horientationButton === 'Behind'?'0 -180 0':'0 0 0'"
            v-bind:value="element.pageToSender?.nameScene || 'Lo sentimos parece que no existe una escena siguiente aqui'" 
            color="#FFF" 
            align="center" 
            width="2" 
            opacity="0"
            visible="false">
            </a-text>


        </a-entity>
        
        <VRInformationPanelView v-for="(element,index) in scene.listButtonInfo" v-bind:key="index" :scale="`${element.buttonLarge} ${element.buttonHigh} ${element.buttonWidth}`" :position="`${element.positionX} ${element.positionY} ${element.positionZ}`" :rotation="`${element.rotationSideY} ${element.rotationSideX} ${element.rotationSideZ}`" :methodClick="changeInformation" :typeColorOpen="backgroundColorLoader" :typeColorClose="dominantColor" :textInformation="element.textInformation" :imageOptional="element.optionalImage" />
        </a-scene>

        <a-scene v-if="device === 'Mobile' || device === 'Tablet'" :key="actualScene.nameScene" vr-mode-ui="enabled: false" style="position: relative; width: 100%; height: 100%">
        <a-entity id="cameraRig" position="0 0 0">
        <!-- Cámara con look-controls habilitados para mover la vista con el dispositivo -->
            <a-camera id="mainCamera" look-controls="enabled: true; magicWindowTrackingEnabled: true;" wasd-controls="enabled: false;">
            <a-cursor 
                raycaster="objects: .clickable" 
                fuse="false" 
                material="color: white; shader: flat" 
                geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03">
            </a-cursor>
            </a-camera>
        </a-entity>
        <a-sky id="skyElement" :src="actualScene.imageScene" rotation="0 0 0"></a-sky>

        <a-entity id="areaButtons" raycaster="objects: .clickable" v-if="actualScene.listButtonRed.length > 0">
            <a-entity raycaster="objects: .clickable"></a-entity>
            <a-entity
            v-for="(element, index) in actualScene.listButtonRed"
            :key="element.idButtonRedirect"
            :ref="'arrowModel-' + index"
            gltf-model="url(/direction_arrow/scene.gltf)"
            :scale="`${element.buttonLarge} ${element.buttonHigh} ${element.buttonWidth}`"
            :position="`${element.positionX} ${element.positionY} ${element.positionZ}`"
            :rotation="`${element.rotationSideY} ${element.rotationSideX} ${element.rotationSideZ}`"
            class="clickable"
            v-on:click="() => changeScene(element)"
            @model-loaded="()=>loadModelsButtonsRedirect(index)"
            @mouseenter="onMouseEnterButtonRedirect(index)" 
            @mouseleave="onMouseLeaveButtonRedirect(index)">
            </a-entity>

            <a-image 
            v-for="(element, index) in actualScene.listButtonRed" 
            :key="'tooltip-' + element.idButtonRedirect" 
            :id="'tooltip-' + index" 
            :position="`${element.positionX} ${element.positionY + 1.1} ${element.positionZ}`" 
            :rotation="element.horientationButton === 'Right'?'0 -90 0':element.horientationButton === 'Left'?'0 90 0':element.horientationButton === 'Behind'?'0 -180 0':'0 0 0'"
            v-bind:src="element.pageToSender?.imageScene || require('@/assets/not_found_scene.png')"
            width="2" 
            height="1.3" 
            opacity="0"
            visible="false">
            </a-image>

            <a-text 
            v-for="(element, index) in actualScene.listButtonRed" 
            :key="'tooltip-text-' + element.idButtonRedirect" 
            :id="'tooltip-text-' + index" 
            :position="`${element.positionX} ${element.positionY + 0.75} ${element.positionZ}`" 
            :rotation="element.horientationButton === 'Right'?'0 -90 0':element.horientationButton === 'Left'?'0 90 0':element.horientationButton === 'Behind'?'0 -180 0':'0 0 0'"
            v-bind:value="element.pageToSender?.nameScene || 'Lo sentimos parece que no existe una escena siguiente aqui'"  
            color="#FFF" 
            align="center" 
            width="2" 
            opacity="0"
            visible="false">
            </a-text>


        </a-entity>
        
        <VRInformationPanelView v-for="(element,index) in actualScene.listButtonInfo" v-bind:key="index" :scale="`${element.buttonLarge} ${element.buttonHigh} ${element.buttonWidth}`" :position="`${element.positionX} ${element.positionY} ${element.positionZ}`" :rotation="`${element.rotationSideY} ${element.rotationSideX} ${element.rotationSideZ}`" :methodClick="changeInformation" :typeColorOpen="backgroundColorLoader" :typeColorClose="dominantColor" :textInformation="element.textInformation" :imageOptional="element.optionalImage" />
        </a-scene>

        <FooterViewScene :background="colorBackground" :createButtonRedirect="onCreateButtonRedirect" :createButtonInformation="onCreateButtonInformation" :deleteButton="onDeleteButton" :changeBackgroundImage="onChangeImageScene" :changeToPanelControl="()=>{}"  />
    </div>
</template>