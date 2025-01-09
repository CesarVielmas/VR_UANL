<script src="./HomePage.vue.js"></script>
<style src="./HomePage.vue.css"></style>
<template>
      <LoadingApart v-if="!completeInformation" :completeInformation="completeInformationLoading" :completeInformationFunction="loadingReady"/>
      <LandingPage v-if="completeInformation"/>
</template>

