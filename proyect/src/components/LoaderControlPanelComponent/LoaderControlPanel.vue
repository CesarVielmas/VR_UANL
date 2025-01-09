<script src="./LoaderControlPanel.vue.js"></script>
<style src="./LoaderControlPanel.vue.css"></style>

<template>
    <LoadingApart v-if="!completeInformation" :completeInformation="completeInformationLoading" :completeInformationFunction="loadingReady"/>
    <div v-if="completeInformation" class="divLoadingComplete" :style="onOpacityAll?`background-color:${backgroundColor};animation: opacityAnimation 2s reverse ease-out forwards;`:backgroundColor != ''?`background-color:${backgroundColor};`:''">
        <div class="logoAnimation">
            <img :src="require('@/assets/example_university_card_image.png')" alt="logoUniversity" />
        </div>

        <div class="uanlAnimation" :style="backgroundColor != ''?`margin-top: 5vh;`:''">
            <img :src="require('@/assets/uanl_logo.png')" alt="imageLogoAnimation2" />
            <div style="animation: opacityAnimation 2s ease-out forwards;">
                <hr/>
                <h1>Panel De Control</h1>
            </div>
        </div>
    </div>
</template>