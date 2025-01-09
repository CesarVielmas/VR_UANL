<script src="./SceneView.vue.js"></script>
<style src="./SceneView.vue.css"></style>

<template>
  <div>
    <div v-if="isClient">
      <a-scene
        vr-mode-ui="enabled: true"
        embedded
        style="position: relative; width: 100vw; height: 100vh"
      >
        <a-entity position="0 0 0">
          <a-camera
            look-controls="enabled: true; touchEnabled: true; magicWindowTrackingEnabled: true"
            wasd-controls="enabled: false"
          >
            <a-cursor
              raycaster="objects: .clickable"
              fuse="true"
              fuse-timeout="1500"
              material="color: white; shader: flat"
              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              animation__scale="property: scale; to: 2 2 2; easing: easeInOutQuad; dur: 300; startEvents: fuse-start"
              animation__scale_reverse="property: scale; to: 1 1 1; easing: easeInOutQuad; dur: 300; startEvents: fuse-end"
            ></a-cursor>
          </a-camera>
        </a-entity>

        <!-- Skybox con la imagen del área actual -->
        <a-sky
          :src="infoData.area[currentArea].image"
          :rotation="infoData.area[currentArea].areRot"
        ></a-sky>

        <!-- Botones de área -->
        <a-entity id="areaButtons" raycaster="objects: .clickable">
          <a-entity
            v-for="(button, index) in areaButtons"
            :key="index"
            :id="button.id"
            class="clickable"
            :button-handler="`area: ${button.id}; type: area`"
            geometry="primitive: plane; width: 0.5; height: 0.3"
            scale="2 2 2"
            :material="{ color: 'black', opacity: 0.5 }"
            :position="button.position"
            :text="`value: ${button.text}; align: center; color: white; width: 2`"
            face-camera
          ></a-entity>
        </a-entity>

        <!-- Botones de info -->
        <a-entity id="infoButtons" raycaster="objects: .clickable">
          <a-entity
            v-for="(infoButton, index) in infoButtons"
            :key="index"
            :id="infoButton.id"
            class="clickable"
            :button-handler="`area: ${infoButton.id}; type: info`"
            geometry="primitive: plane; width: 0.5; height: 0.3"
            scale="2 2 2"
            :material="{ color: 'black', opacity: 0.5 }"
            :position="infoButton.position"
            :text="`value: ${infoButton.text}; align: center; color: white; width: 2`"
            face-camera
          ></a-entity>
        </a-entity>

        <!-- Panel de información -->
        <a-entity v-if="currentPanel" :position="panelPosition">
          <a-entity
            :geometry="`primitive: plane; width: ${currentPanel.panWidth}; height: ${currentPanel.panHeight};`"
            :material="`color: #333; opacity: 0.5`"
            :text="`value: ${currentPanel.description}; color: white; align: left; anchor: center; wrapCount: 30; width: 1.5; xOffset: -.2; zOffset: 0.005;`"
            face-camera
          >
            <a-entity
              v-if="currentPanel.panelImage"
              :geometry="`primitive: plane; width: 1.0; height: 1.0`"
              :material="{ src: currentPanel.panelImage, color: 'white' }"
              position="1.5 0 0.1"
            ></a-entity>
          </a-entity>
        </a-entity>
      </a-scene>
    </div>
  </div>
</template>