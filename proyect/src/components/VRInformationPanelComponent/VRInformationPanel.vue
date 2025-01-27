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
        position="0 -8 -7"
        @model-loaded="loadModelButtonInformation"
        :animation="`property: scale; to: ${scaleEntityPanelOpen}; dur: 500; easing: easeOutElastic`">
          <!-- Imagen del panel (si la hay) -->
          <a-entity 
            :geometry="`primitive: plane; width: 160; height: 150;`"
            :material="'src: ' + imageOptional" 
            rotation="0 90 0"
            position="10 95 98">
          </a-entity>

          <!-- Texto descriptivo -->
          <a-entity 
            :text="`value: ${textInformation}; color: white; align: center; width: 160; wrapCount: 40;`" 
            rotation="0 90 0"
            position="10 205 98">
          </a-entity>

          <!-- Botón de cerrar -->
          <a-entity 
            id="closeButton"
            :geometry="`primitive: circle; radius:15`" 
            material="color: red; opacity: 1;" 
            rotation="0 90 0"
            position="18 245 1" 
            class="clickable"
            v-on:click="closePanel">
            <a-entity 
              :text="`value: X; color: white; align: center; width:200`" 
              position="0 0 0.01">
            </a-entity>
          </a-entity>
      </a-entity>
    </a-entity>
</template>