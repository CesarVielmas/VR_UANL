<script src="./HomeControlPanel.vue.js"></script>
<style src="./HomeControlPanel.vue.css"></style>

<template>
    <LoaderControlPanel v-if="!loadData" :methodExitOn="completeData"/>
    <ControlPanel v-if="loadData"/>
</template>