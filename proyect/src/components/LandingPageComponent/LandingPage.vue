<script src="./LandingPage.vue.js"></script>
<style src="./LandingPage.vue.css"></style>
<template>
<div v-if="!startVR[0]">
    <div class="principalDiv" v-if="!toSelectUniversity">
        <div class="content" :style="clickContinue == 1?'animation: opacityAnimation 2s ease-out forwards;':clickContinue== 2?'animation: sliceAnimation 1s ease-out forwards;':clickContinue ==3?'animation: sliceAnimationReverse 1s ease-out forwards;':''">
            <div class="divImage">
                <img src="../../assets/uanl_logo.png" class="imageLogo"/>
            </div>
            <div v-if="componentCreated">
                <hr class="hrDiv" style="animation: opacityAnimation 1s ease-out forwards;"/>
                <h1 class="tittleText" style="animation: opacityAnimation 1s ease-out forwards;">Recorrido Virtual</h1>
                <button class="buttonContinue" v-on:click="onClickContinue" style="animation: opacityAnimation 1s ease-out forwards;"><span>Continuar</span>  <img alt="image_arrow_right" src="../../assets/icon_right.png"/></button>
                <button class="buttonBack" style="animation: opacityAnimation 1s ease-out forwards;"><img alt="image_arrow_left" src="../../assets/icon_left.png" />   <span>Regresar</span></button>
            </div>
        </div>
    </div>
    <div class="selectDiv" v-else-if="toSelectUniversity">
        <div class="content" :style="clickContinue == 2?'animation: opacityAnimation 2s ease-out forwards;':clickContinue== 1?'animation: sliceAnimation 1s ease-out forwards;':''">
            <div class="divBackContinueDesktop" v-if="deviceType=='Desktop'">
                <button class="buttonBack" v-on:click="onButtonBack"><img alt="image_arrow_back" src="../../assets/icon_left.png"/> <span>{{ textBack }}</span></button>
                <h1 class="tittleSelect">Seleccione La Facultad</h1>
                <button class="buttonNext" v-if="textNext.length != 0" v-on:click="onButtonNext"><span>{{ textNext }}</span> <img alt="image_arrow_back" src="../../assets/icon_right.png"/></button>
            </div>
            <div class="divBackContinueMobile" v-if="deviceType=='Mobile'">
                <button 
                    class="buttonBack"
                    :class="{
                        'opacity-animation': topButtonsAlign > 0,
                        'opacity-animation-reverse': topButtonsAlign === -1,
                        'hidden': topButtonsAlign === 0
                    }"
                    :style="topButtonsAlign > 0 ? `top: ${topButtonsAlign}px;` : ''"
                    v-on:click="onButtonBack"><img alt="image_arrow_back" src="../../assets/icon_left.png"/> <span>{{ textBack }}</span></button>
                <h1 class="tittleSelect">Seleccione La Facultad</h1>
                <button 
                    class="buttonNext"
                    :class="{
                        'opacity-animation': topButtonsAlign > 0,
                        'opacity-animation-reverse': topButtonsAlign === -1,
                        'hidden': topButtonsAlign === 0
                    }"
                    :style="topButtonsAlign > 0 ? `top: ${topButtonsAlign}px;` : ''"
                    v-if="textNext.length != 0"
                    v-on:click="onButtonNext"><span>{{ textNext }}</span> <img alt="image_arrow_back" src="../../assets/icon_right.png"/></button>
            </div>
            <div v-if="cardsApper" :class="isLastElement?'alignCenter':''" :style="cardsApperAnimation?'animation: opacityAnimation 1s reverse ease-out forwards;':''">
                <universityCard style="text-align: start;" v-for="(element,index) in pageCardsActual" :key="index" :timerWait="index" :lastElement="element === arrayExampleCards[arrayExampleCards.length-1]" :typeDisp="deviceType" :methodPosition="positionAsign" :methodOnStartVR="onClickStartVR" :university="element" :typeVRComponent="0" />
            </div>
        </div>
    </div>
</div>

<div v-if="startVR[0] && !enterVRComponent" :style="enterAnimationVRStartOut?'animation: opacityAnimation 2s reverse ease-out forwards;z-index:1;':'z-index:2;'">
    <div class="selectDivTransition" :style="`background-color:${startVR[2]};height:100vh;widht:100vw;`">
        <div class="divImageLogoAnimation" style="margin-left: auto;margin-right: auto;text-align: center;">
            <img class="imageLogoAnimation" :src="startVR[3]" alt="imageLogoAnimation"/>
        </div>
        <div class="divImageLogoAnimation2" style="margin-left: auto;margin-right: auto;text-align: center;" :style="enterAnimationVRStart?'animation: opacityAnimation 2s ease-out forwards;':''">
            <img class="imageLogoAnimation2" src="../../assets/uanl_logo.png" alt="imageLogoAnimation2" />
            <hr class="hrDiv"/>
            <h1 class="tittleText">Recorrido Virtual</h1>
        </div>
    </div>
</div>
</template>