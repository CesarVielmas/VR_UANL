<script src="./FooterViewScenes.vue.js"></script>
<style src="./FooterViewScenes.vue.css"></style>

<template>
    <div class="deleteAll" v-if="onOpenDeleteAll">
        <div class="content">
            <h2 :style="`background-color:${colorBackground};`">¿Esta Seguro De Eliminar Todas Las Escenas?</h2>
            <button v-on:click="()=>{functionDeleteAllScenes();onOpenDeleteAll = false;}" style="background-color: rgb(75, 6, 6);">Aceptar</button>
            <button v-on:click="()=>{onOpenDeleteAll = false;}">Cancelar</button>
        </div>
    </div>
    <div class="footer" :style="onOpenOptions ? 'left:32%;':'left:49%;'">
        <div class="buttonOpen" v-on:click="onOpenOptions = !onOpenOptions" :style="onOpenOptions ? 'animation: rotateButtonOpen 0.5s forwards;background-color: rgb(87, 11, 11);' : 'animation: rotateButtonClose 0.5s forwards;background-color: rgb(7, 61, 28);'">
            <h2>{{ onOpenOptions?"-":"+" }}</h2>
        </div>
        <div class="content" :style="onOpenOptions? 'animation: incrementWidth 0.5s forwards;' : 'animation: decrementWidth 0.5s forwards;'">
            <div style="margin-left: 8%;" v-on:click="functionMaxRestSee">
                <img :src="require('@/assets/icon_zoom_in.png')" alt="iconDeleteAll" />
                <h2>Alejamiento Maximo</h2>
            </div>
            <div v-on:click="functionMaxPlusSee">
                <img :src="require('@/assets/icon_zoom_out.png')" alt="iconDeleteAll" />
                <h2>Acercamiento Maximo</h2>
            </div>
            <div v-on:click="()=>{onOpenDeleteAll = true;}">
                <img :src="require('@/assets/delete_icon.png')" alt="iconDeleteAll" />
                <h2>Vaciar Escenas</h2>
            </div>
            <div v-on:click="functionOnChangeScenes">
                <img :src="require('@/assets/icon_change.png')" alt="iconDeleteAll" />
                <h2>Intercambiar Escenas</h2>
            </div>
            <div v-on:click="functionOnPreview">
                <img :src="require('@/assets/icon_previus_vr.png')" alt="iconDeleteAll" />
                <h2>Vista Previa</h2>
            </div>
        </div>
    </div>
</template>