<script src="./VRInformationPanel.vue.js"></script>
<style src="./VRInformationPanel.vue.css"></style>
<template>
    <!-- Modelo inicial que se muestra cuando el panel está cerrado -->
    <a-entity 
      v-if="!isPanelOpen"
      gltf-model="url(/information/scene.gltf)"
      ref="PanelClose"
      :position="position"
      scale="0 0 0"
      rotation="0 0 0"
      class="clickable"
      @model-loaded="loadModelButtonInformation"
      v-on:click="openPanel"
      :animation="`property: scale; to: ${scale}; dur: 1000; easing: easeOutElastic`"
      :animation__rotate="`property: rotation; to:${rotation}; dur: 1000; easing: easeOutSine`">
    </a-entity>

    <!-- Panel de información (cerrado o abierto) -->
    <a-entity id="infoPanel" v-if="isPanelOpen" :position="panelPosition" rotation="0 0 0" :animation__rotate="`property: rotation; to:${panelRotation}; dur: 1000; easing: easeOutSine`">
      <a-entity 
        gltf-model="url(/picture_frame/scene.gltf)"
        ref="PanelOpen"
        scale="0.001 0.001 0.001"
        position="-.4 -1 -0.7"
        @model-loaded="loadModelButtonInformation"
        :animation="`property: scale; to: ${scaleEntityPanelOpen}; dur: 500; easing: easeOutElastic`">
      </a-entity>

      <!-- Imagen del panel (si la hay) -->
      <a-entity 
        :geometry="'primitive: plane; width: 1.1; height: 0.7;'"
        :material="'src: ' + imageOptional" 
        rotation="0 90 0"
        position="-.2 0.25 0.0001">
      </a-entity>

      <!-- Texto descriptivo -->
      <a-entity 
        :text="`value: ${textInformation}; color: white; align: center; wrapCount: 30;`" 
        rotation="0 90 0"
        position="0 -0.2 0.01">
      </a-entity>

      <!-- Botón de cerrar -->
      <a-entity 
        id="closeButton"
        geometry="primitive: circle; radius: 0.1;" 
        material="color: red; opacity: 0.9;" 
        rotation="0 90 0"
        position="0.1 0.59 -.54" 
        class="clickable"
        v-on:click="closePanel">
        <a-entity 
          text="value: X; color: white; align: center; width: 1.5;" 
          position="0 0 0.01">
        </a-entity>
      </a-entity>
    </a-entity>
</template>