<script src="./ControlPanel.vue.js"></script>
<style src="./ControlPanel.vue.css"></style>

<template>
    <div style="width: 100vw;height: 100vh;">
         <ViewScenes v-if="!isEditVR" :colorBackground="dominantColor" :device="deviceType" :universitySelected="university" :onChangeEditVR="changeToEditVR"/>
         <ViewScene v-if="isEditVR" :scene="sceneToEdit" :device="deviceType" :colorBackground="dominantColor" :facultyName="university.nameFaculty" :lastIdButtonRed="lastIdRedirect" :lastIdButtonInf="lastIdInformation" :changeLastIdRed="changeLastIdRed" :changeLastIdInfo="changeLastIdInfo" :changeToControlPanel="changeToControlPanel"/>
    </div>
</template>