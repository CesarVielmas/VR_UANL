<script src="./ControlPanel.vue.js"></script>
<style src="./ControlPanel.vue.css"></style>

<template>
    <div style="width: 100vw;height: 100vh;">
         <ViewScenes :colorBackground="dominantColor" :device="deviceType" :universitySelected="university"/>
    </div>
</template>