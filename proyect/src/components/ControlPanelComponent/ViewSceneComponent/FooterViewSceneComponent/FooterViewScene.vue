<script src="./FooterViewScene.vue.js"></script>
<style src="./FooterViewScene.vue.css"></style>

<template>
    <div class="footerView" :style="onOpenOptions ? 'left:32%;':'left:49%;'">
        <div class="buttonOpen" v-on:click="onOpenOptions = !onOpenOptions" :style="onOpenOptions ? `animation: rotateButtonOpen 0.5s forwards;background-color: rgb(87, 11, 11);` : `animation: rotateButtonClose 0.5s forwards;background-color: ${background};`">
            <h2>{{ onOpenOptions?"-":"+" }}</h2>
        </div>
        <div class="content" :style="onOpenOptions? `animation: incrementWidth 0.5s forwards;background-color: ${background};` : `animation: decrementWidth 0.5s forwards;background-color: ${background};`">
            <div style="margin-left: 8%;" v-on:click="()=>{createButtonInformation();onOpenOptions=false;}">
                <img :src="require('@/assets/icon_information_button.png')" alt="iconInformation" />
                <h2>Boton De Informacion</h2>
            </div>
            <div v-on:click="()=>{createButtonRedirect();onOpenOptions=false;}">
                <img :src="require('@/assets/icon_redirect_button.png')" alt="iconRedirect" />
                <h2>Boton De Redireccion</h2>
            </div>
            <div v-on:click="()=>{deleteButton();onOpenOptions=false;}">
                <img :src="require('@/assets/icon_delete_button.png')" alt="iconDelete" />
                <h2>Eliminar Boton</h2>
            </div>
            <div v-on:click="()=>{changeBackgroundImage();onOpenOptions=false;}">
                <img :src="require('@/assets/icon_change_background.png')" alt="iconBackground" />
                <h2>Cambiar Fondo</h2>
            </div>
            <div v-on:click="()=>{changeToPanelControl();onOpenOptions=false;}">
                <img :src="require('@/assets/icon_panel_control.png')" alt="iconControlPanel" />
                <h2>Panel De Control</h2>
            </div>
        </div>
    </div>
</template>