<script src="./UniversityCard.vue.js"></script>
<style src="./UniversityCard.vue.css"></style>
<template>
        <div v-if="typeVRComponent === 1 && clickEditVR" class="divEdit">
                <div class="contentEdit">
                        <h2 class="tittleEdit">¿Que Desea Editar?</h2>
                        <button class="buttonEdit" v-on:click="()=>{let toneBackground = getTone(this.dominantColor,85,60);clickEditVR=false;methodOnEditVR({timerWait,toneBackground,university})}">Panel De Control</button>
                        <button class="buttonEdit" v-on:click="()=>{clickEditVR = false;methodOnAddVR(university);}">Editar Facultad</button>
                </div>
        </div>
        <div v-if="typeVRComponent === 1 && clickDeleteVR" class="divDelete">
                <div class="contentDelete">
                        <h2 class="tittleDelete">¿Esta Seguro De Eliminar Esta Facultad?</h2>
                        <button class="buttonDelete" style="background-color:rgb(99, 5, 5);" v-on:click="()=>{let toneBackground = getTone(this.dominantColor,85,60);methodOnDeleteVR({timerWait,toneBackground,university});clickDeleteVR=false;}">Eliminar Facultad</button>
                        <button class="buttonCancel" v-on:click="clickDeleteVR = false;">Cancelar</button>
                </div>
        </div>
        <div class="card" :class="clickStartVR?'cardExitPlay':''" v-if="enterAnimation && dominantColor!= ''" :ref="(timerWait == 5 || lastElement) && typeDisp =='Mobile'?'CardUniversity':''" :style="lastElement && typeDisp =='Mobile' && typeVRComponent === 1?'animation: slideDownFadeInAnimation 1s ease-out forwards;':(timerWait == 5 || lastElement) && typeDisp =='Mobile'?'animation: slideDownFadeInAnimation 1s ease-out forwards;margin-bottom:50%;':'animation: slideDownFadeInAnimation 1s ease-out forwards;'">
                <div class="informationCard" :style="styleBackground">
                        <img :src="university.logoFaculty" alt="university_fime_image" class="imageUniversityLogo" />
                        <h2 class="tittleUniversity">{{ university.nameFaculty }}</h2>
                        <h2 class="nameUniversity">{{ university.nameCompleteFaculty }}</h2>
                        <h3 class="virtualRecord">Recorrido Virtual</h3>
                </div>
                <div class="overlayImage"></div>
                <img :src="university.imageFaculty" alt="universityImage" class="imageUniversity" />
                <button class="playUniversity" v-if="typeVRComponent===0" :style="styleButton" v-on:click="()=>{let toneBackground = getTone(this.dominantColor,85,60);methodOnStartVR({timerWait,toneBackground,university});clickStartVR=true}"><img v-if="!clickStartVR" src="../../assets/icon_play.png" alt="imagePlay" /></button>
                <button class="editUniversity" v-if="typeVRComponent===1" :style="styleButton" v-on:click="clickEditVR = true;"><img v-if="!clickStartVR" :src="require('@/assets/edit_icon.png')" alt="imageEdit" /></button>
                <button class="deleteUniversity" v-if="typeVRComponent===1 && !clickStartVR" style="background-color: red;" v-on:click="clickDeleteVR = true;"><img :src="require('@/assets/delete_icon.png')" alt="imageDelete" /></button>
                <p v-if="typeVRComponent === 1 && (university.listEscenes.length === 0 || university.listEscenes === null)" class="absoluteTextScenes">Universidad Vacia De Escenas</p>
        </div>
        
        <div class="card" :ref="(timerWait == 5 || lastElement) && typeDisp =='Mobile'?'CardUniversity':''" v-if="lastElement && typeVRComponent === 1 && enterAnimation" :style="typeDisp == 'Mobile'?'margin-bottom:50%;animation: slideDownFadeInAnimation 1s ease-out forwards;':'animation: slideDownFadeInAnimation 1s ease-out forwards;'">
                <div class="content">
                        <h2 :style="typeDisp === 'Desktop'?'text-align:center;':''">Añadir Nueva Facultad</h2>
                        <div></div>
                        <button v-on:click="()=>{let toneBackground = getTone(this.dominantColor,85,60);methodOnAddVR();}">+</button>
                </div>
        </div>
</template>