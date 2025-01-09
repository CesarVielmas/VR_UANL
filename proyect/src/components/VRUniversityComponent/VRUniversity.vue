<script src="./VRUniversity.vue.js"></script>
<style src="./VRUniversity.vue.css"></style>

<template>
  <div v-if="allDataScenes.length === 0" style="height:100vh;width:100vw;">
    <LoadingApart v-if="!completeInformation" :completeInformation="completeInformationLoading" :completeInformationFunction="loadingReady"/>
    <div v-if="completeInformation" class="completeInformation" :style="changeEnd?`animation: opacityAnimation 2s reverse ease-out;background-color:${backgroundColorLoader};`:`background-color:${backgroundColorLoader};`">
      <div class="divImageLogoAnimation" style="margin-left: auto;margin-right: auto;text-align: center;">
            <img class="imageLogoAnimation" :src="imageLoader" alt="imageLogoAnimation"/>
      </div>
      <div class="imageLogoUniversity" >
        <img :src="require('@/assets/uanl_logo.png')"/>
        <hr class="hrDiv" :style="opacityLoading?'animation: opacityAnimation 2s ease-out forwards;':'opacity:0;'"/>
        <h1 class="tittleText" :style="opacityLoading?'animation: opacityAnimation 2s ease-out forwards;':'opacity:0;'">Recorrido Virtual</h1>
      </div>
    </div>
  </div>
  <div v-if="allDataScenes.length != 0 && Object.keys(this.actualScene).length > 0">
    <div id="sceneContainer" v-if="!changeSceneBool">
       <!-- Configuración para Desktop -->
    <a-scene v-if="deviceType === 'Desktop'" :key="actualScene.NameScene" vr-mode-ui="enabled: true" style="position: relative; width: 100vw; height: 100vh">
      <a-entity id="cameraRig" position="0 0 0">
        <a-camera id="mainCamera" look-controls="enabled:true;" wasd-controls="enabled:false;">
          <a-cursor raycaster="objects: .clickable" fuse="false" material="color: white; shader: flat" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"></a-cursor>
        </a-camera>
      </a-entity>
      <a-sky id="skyElement" :src="actualScene.ImageScene" rotation="0 0 0" animation__pixelate="property: material.pixelSize; to: 100; dur: 1500; easing: easeInOutQuad; startEvents: pixelate"></a-sky>

      <a-entity id="areaButtons" raycaster="objects: .clickable" v-if="actualScene.ListButtonsRedirect.length > 0">
        <a-entity raycaster="objects: .clickable" cursor="fuse: false; rayOrigin: mouse"></a-entity>
        <a-entity
          v-for="(element, index) in actualScene.ListButtonsRedirect"
          :key="element.Id"
          :ref="'arrowModel-' + index"
          gltf-model="url(/direction_arrow/scene.gltf)"
          :scale="`${element.ButtonLarge} ${element.ButtonHigh} ${element.ButtonWidth}`"
          :position="`${element.PositionX} ${element.PositionY} ${element.PositionZ}`"
          :rotation="`${element.RotationSideY} ${element.RotationSideX} ${element.RotationSideZ}`"
          class="clickable"
          v-on:click="() => changeScene(element)"
          @model-loaded="()=>loadModelsButtonsRedirect(index)"
          @mouseenter="onMouseEnterButtonRedirect(index)" 
          @mouseleave="onMouseLeaveButtonRedirect(index)">
        </a-entity>

        <a-image 
          v-for="(element, index) in actualScene.ListButtonsRedirect" 
          :key="'tooltip-' + element.Id" 
          :id="'tooltip-' + index" 
          :position="`${element.PositionX} ${element.PositionY + 1.1} ${element.PositionZ}`" 
          :rotation="element.HorientationButton === 'Right'?'0 -90 0':element.HorientationButton === 'Left'?'0 90 0':element.HorientationButton === 'Behind'?'0 -180 0':'0 0 0'"
          v-bind:src="allScenes.find(scene => scene.NamePositionScene === element.PageToSender)?.ImageScene || require('@/assets/not_found_scene.png')"
          width="2" 
          height="1.3" 
          opacity="0"
          visible="false">
        </a-image>

        <a-text 
          v-for="(element, index) in actualScene.ListButtonsRedirect" 
          :key="'tooltip-text-' + element.Id" 
          :id="'tooltip-text-' + index" 
          :position="`${element.PositionX} ${element.PositionY + 0.75} ${element.PositionZ}`" 
          :rotation="element.HorientationButton === 'Right'?'0 -90 0':element.HorientationButton === 'Left'?'0 90 0':element.HorientationButton === 'Behind'?'0 -180 0':'0 0 0'"
          v-bind:value="allScenes.find(scene => scene.NamePositionScene === element.PageToSender)?.NameScene || 'Lo sentimos parece que no existe una escena siguiente aqui'" 
          color="#FFF" 
          align="center" 
          width="2" 
          opacity="0"
          visible="false">
        </a-text>


      </a-entity>
      
      <VRInformationPanel v-for="(element,index) in actualScene.ListButtonsInformation" v-bind:key="index" :scale="`${element.ButtonLarge} ${element.ButtonHigh} ${element.ButtonWidth}`" :position="`${element.PositionX} ${element.PositionY} ${element.PositionZ}`" :rotation="`${element.RotationSideY} ${element.RotationSideX} ${element.RotationSideZ}`" :methodClick="changeInformation" :typeColorOpen="backgroundColorLoader" :typeColorClose="dominantColor" :textInformation="element.TextInformation" :imageOptional="element.OptionalImage" />
    </a-scene>

    <!-- Configuración para Mobile y Tablet -->
    <a-scene v-if="deviceType === 'Mobile' || deviceType === 'Tablet'" :key="actualScene.NameScene" vr-mode-ui="enabled: false" style="position: relative; width: 100vw; height: 100vh">
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
      <a-sky id="skyElement" :src="actualScene.ImageScene" rotation="0 0 0" animation__pixelate="property: material.pixelSize; to: 100; dur: 1500; easing: easeInOutQuad; startEvents: pixelate"></a-sky>

      <a-entity id="areaButtons" raycaster="objects: .clickable" v-if="actualScene.ListButtonsRedirect.length > 0">
        <a-entity raycaster="objects: .clickable"></a-entity>
        <a-entity
          v-for="(element, index) in actualScene.ListButtonsRedirect"
          :key="element.Id"
          :ref="'arrowModel-' + index"
          gltf-model="url(/direction_arrow/scene.gltf)"
          :scale="`${element.ButtonLarge} ${element.ButtonHigh} ${element.ButtonWidth}`"
          :position="`${element.PositionX} ${element.PositionY} ${element.PositionZ}`"
          :rotation="`${element.RotationSideY} ${element.RotationSideX} ${element.RotationSideZ}`"
          class="clickable"
          v-on:click="() => changeScene(element)"
          @model-loaded="()=>loadModelsButtonsRedirect(index)"
          @mouseenter="onMouseEnterButtonRedirect(index)" 
          @mouseleave="onMouseLeaveButtonRedirect(index)">
        </a-entity>

        <a-image 
          v-for="(element, index) in actualScene.ListButtonsRedirect" 
          :key="'tooltip-' + element.Id" 
          :id="'tooltip-' + index" 
          :position="`${element.PositionX} ${element.PositionY + 1.1} ${element.PositionZ}`" 
          :rotation="element.HorientationButton === 'Right'?'0 -90 0':element.HorientationButton === 'Left'?'0 90 0':element.HorientationButton === 'Behind'?'0 -180 0':'0 0 0'"
          v-bind:src="allScenes.find(scene => scene.NamePositionScene === element.PageToSender)?.ImageScene || require('@/assets/not_found_scene.png')"
          width="2" 
          height="1.3" 
          opacity="0"
          visible="false">
        </a-image>

        <a-text 
          v-for="(element, index) in actualScene.ListButtonsRedirect" 
          :key="'tooltip-text-' + element.Id" 
          :id="'tooltip-text-' + index" 
          :position="`${element.PositionX} ${element.PositionY + 0.75} ${element.PositionZ}`" 
          :rotation="element.HorientationButton === 'Right'?'0 -90 0':element.HorientationButton === 'Left'?'0 90 0':element.HorientationButton === 'Behind'?'0 -180 0':'0 0 0'"
          v-bind:value="allScenes.find(scene => scene.NamePositionScene === element.PageToSender)?.NameScene || 'Lo sentimos parece que no existe una escena siguiente aqui'" 
          color="#FFF" 
          align="center" 
          width="2" 
          opacity="0"
          visible="false">
        </a-text>


      </a-entity>
      
      <VRInformationPanel v-for="(element,index) in actualScene.ListButtonsInformation" v-bind:key="index" :scale="`${element.ButtonLarge} ${element.ButtonHigh} ${element.ButtonWidth}`" :position="`${element.PositionX} ${element.PositionY} ${element.PositionZ}`" :rotation="`${element.RotationSideY} ${element.RotationSideX} ${element.RotationSideZ}`" :methodClick="changeInformation" :typeColorOpen="backgroundColorLoader" :typeColorClose="dominantColor" :textInformation="element.TextInformation" :imageOptional="element.OptionalImage" />
    </a-scene>


    <!-- Configuración para VR -->
    <a-scene v-if="deviceType === 'VR'" vr-mode-ui="enabled: true" style="position: relative; width: 100vw; height: 100vh">
      <a-entity position="0 0 0">
        <a-camera look-controls="enabled:true;" wasd-controls="enabled:false;">
          <a-cursor raycaster="objects: .clickable" fuse="true" fuse-timeout="1500" material="color: white; shader: flat" geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"></a-cursor>
        </a-camera>
      </a-entity>
      <a-sky :src="actualScene.ImageScene" rotation="0 0 0"></a-sky>

      <a-entity id="areaButtons" raycaster="objects: .clickable" v-if="actualScene.ListButtonsRedirect.length > 0">
        <a-entity raycaster="objects: .clickable" cursor="fuse: false; rayOrigin: mouse"></a-entity>
        <a-entity
          v-for="(element, index) in actualScene.ListButtonsRedirect"
          :key="element.Id"
          :ref="'arrowModel-' + index"
          gltf-model="url(/direction_arrow/scene.gltf)"
          :scale="`${element.ButtonLarge} ${element.ButtonHigh} ${element.ButtonWidth}`"
          :position="`${element.PositionX} ${element.PositionY} ${element.PositionZ}`"
          :rotation="`${element.RotationSideY} ${element.RotationSideX} ${element.RotationSideZ}`"
          class="clickable"
          v-on:click="() => changeScene(element)"
          @model-loaded="()=>loadModelsButtonsRedirect(index)"
          @mouseenter="onMouseEnterButtonRedirect(index)" 
          @mouseleave="onMouseLeaveButtonRedirect(index)">
        </a-entity>

        <a-image 
          v-for="(element, index) in actualScene.ListButtonsRedirect" 
          :key="'tooltip-' + element.Id" 
          :id="'tooltip-' + index" 
          :position="`${element.PositionX} ${element.PositionY + 0.7} ${element.PositionZ - 0.2}`" 
          v-bind:src="allScenes.find(scene => scene.NamePositionScene === element.PageToSender)?.ImageScene || require('@/assets/not_found_scene.png')"
          width="1" 
          height=".8" 
          opacity="0"
          visible="false">
        </a-image>

        <a-text 
          v-for="(element, index) in actualScene.ListButtonsRedirect" 
          :key="'tooltip-text-' + element.Id" 
          :id="'tooltip-text-' + index" 
          :position="`${element.PositionX} ${element.PositionY + 0.45} ${element.PositionZ - 0.1}`" 
          v-bind:value="allScenes.find(scene => scene.NamePositionScene === element.PageToSender)?.NameScene || 'Lo sentimos parece que no existe una escena siguiente aqui'" 
          color="#FFF" 
          align="center" 
          width="0.8" 
          opacity="0"
          visible="false">
        </a-text>
      </a-entity>
      
      <VRInformationPanel v-for="(element,index) in actualScene.ListButtonsInformation" v-bind:key="index" :scale="`${element.ButtonLarge} ${element.ButtonHigh} ${element.ButtonWidth}`" :position="`${element.PositionX} ${element.PositionY} ${element.PositionZ}`" :rotation="`${element.RotationSideY} ${element.RotationSideX} ${element.RotationSideZ}`" :methodClick="changeInformation" :typeColorOpen="backgroundColorLoader" :typeColorClose="dominantColor" :textInformation="element.TextInformation" :imageOptional="element.OptionalImage" />
    </a-scene>
    </div>
  </div>
</template>