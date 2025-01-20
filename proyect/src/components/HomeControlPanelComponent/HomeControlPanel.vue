<script src="./HomeControlPanel.vue.js"></script>
<style src="./HomeControlPanel.vue.css"></style>

<template>
    <LoaderControlPanel v-if="!loadData" :methodExitOn="completeData" :facultyName="facultyAbbreviation"/>
    <ControlPanel v-if="loadData" :university="universitySelected" :uniqueUniversity="isUniqueUniversity"/>
</template>