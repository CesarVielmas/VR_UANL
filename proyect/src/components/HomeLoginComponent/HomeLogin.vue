<script src="./HomeLogin.vue.js"></script>
<style src="./HomeLogin.vue.css"></style>

<template>
    <div v-if="editNowScene != 0 && editNowScene <5" style="position:relative;height: 100vh;width: 100vw;">
        <button v-if="editNowScene === 1" class="buttonGigantAnimation" :style="`background-color:${this.backgroundNewVR};`"></button>
        <div v-if="editNowScene > 1" style="height: 100%;width: 100%;" :style="editNowScene === 4?`animation: opacityAnimation 2s ease-out reverse forwards;background-color:${this.backgroundNewVR};`:`background-color:${this.backgroundNewVR};`">
            <div v-if="editNowScene >= 2" class="imageMovementAnimation" >
                <img :src="addNewLogoFaculty[0]" alt="newLogoFaculty"/>
            </div>
            <div v-if="editNowScene >= 3" class="contentVRActive">
                <img :src="require('@/assets/uanl_logo.png')" alt="imageLogoAnimation2" />
                <hr/>
                <h1>Panel De Control</h1>
            </div>
        </div>
    </div>
    <div v-if="addNewVR || editNewVR" class="addNewVR">
        <div class="content">
            <h1 class="tittle">{{ addNewVR?'Añadir Nueva Facultad':'Editar Facultad Actual'}}</h1>
            <div class="division" :style="deviceType === 'Desktop'?'height: 50%;':'height:30%;margin-top:14%;'">
                <h2 class="subTittle">Imagen De La Facultad</h2>
                <h3 class="miniTittle">Trate de hacer que la facultad tenga un buen angulo y sea visible</h3>
                <div class="imageView" v-on:click="onClickImageFaculty">
                    <img v-if="addNewImageFaculty.length != 0" :src="addNewImageFaculty[0]" alt="imageFaculty" />
                    <button v-if="addNewImageFaculty === ''" v-on:click="onClickImageFaculty">+</button>
                    <input ref="fileFaculty" type="file" @change="handleFileUploadFaculty" accept="image" style="visibility: hidden;"/>
                </div>
                <p class="error" v-if="imageFacultyError" :style="imageFacultyError?'animation: movementAnimation .5s ease-out forwards;':''">Favor De Agregar Una Imagen Valida</p>
            </div>
            <div class="division" :style="deviceType === 'Desktop'?'height: 50%;':'height:30%;margin-top:14%;'">
                <h2 class="subTittle">Logo De La Facultad</h2>
                <h3 class="miniTittle">Trate de seleccionar un logo alusivo a la facultad y sin fondo</h3>
                <div class="imageView" v-on:click="onClickImageLogo">
                    <img v-if="addNewLogoFaculty.length != 0" :src="addNewLogoFaculty[0]" alt="imageLogoFaculty" ref="iconLogoPng" />
                    <button v-if="addNewLogoFaculty === ''" v-on:click="onClickImageLogo">+</button>
                    <input ref="fileLogo" type="file" @change="handleFileUploadLogo" accept="image/png" style="visibility: hidden;"/>
                </div>
                <p class="error" v-if="logoFacultyError" :style="logoFacultyError?'animation: movementAnimation .5s ease-out forwards;':''">Favor De Agregar Una Imagen Valida</p>
            </div>
            <div class="division" :style="deviceType === 'Desktop'?'height: 30%;':'height:30%;margin-top:12%;'">
                <h2 class="subTittle">Abreviatura De La Facultad</h2>
                <h3 class="miniTittle">Asegurese que la abreviacion sea correcta, pues esta se mostrara en las tarjetas</h3>
                <input class="inputText" v-model="addNewNameFaculty" @input="onValidateText" />
                <img class="icon" :src="require('@/assets/abbreviature_icon.png')" />
                <hr class="hr" />
                <p class="error" v-if="nameFacultyError" :style="nameFacultyError?'animation: movementAnimation 1s ease-out forwards;':''">Favor de agregar una abreviatura</p>
            </div>
            <div class="division" :style="deviceType === 'Desktop'?'height: 30%;':'height:30%;margin-top:-15%;'">
                <h2 class="subTittle">Nombre Completo De La Facultad</h2>
                <h3 class="miniTittle">Asegurese que el nombre completo este bien definido y correctamente escrito</h3>
                <input class="inputText" v-model="addNewNameCompleteFaculty" @input="onValidateText" />
                <img class="icon" :src="require('@/assets/university_icon.png')" />
                <hr class="hr" />
                <p class="error" v-if="nameCompleteFacultyError" :style="nameCompleteFacultyError?'animation: movementAnimation 1s ease-out forwards;':''">Favor de agregar un nombre completo</p>
            </div>
            
            <button :class="!imageFacultyError && !logoFacultyError && !nameFacultyError && !nameCompleteFacultyError?'buttonSave':'buttonDisable'" v-on:click="onSaveNewVRComplete">{{ addNewVR?'Agregar Facultad':'Editar Facultad'}}</button>
            <button class="buttonCancel" style="background-color: rgb(58, 6, 6);" v-on:click="onCancelNewVRComplete">Cancelar</button>
        </div>
    </div>
    <div v-if="checkSesion" class="loader">
        <div class="content" v-if="statusSesion === 0 || statusSesion === 1">
            <p class="tittle">{{ textValidUser }}</p>
            <p class="subtittle">Esto Puede Tardar Un Momento</p>
            <img class="image" :src="require('@/assets/loader_icon.gif')"/>
        </div>

        <div class="content" v-if="statusSesion === 2">
            <p class="tittle">Bienvenido {{ userName }}</p>
            <p class="subtittle">Validado Con Exito</p>
            <img class="image" style="animation: logoAnimationScaler .7s ease-out;" :src="require('@/assets/sucess_icon.png')"/>
        </div>

        <div class="content" v-if="statusSesion === 3">
            <p class="tittle">{{ textErrorUser }}</p>
            <p class="subtittle">Intentelo De Nuevo</p>
            <img class="image" style="animation: logoAnimationScaler .7s ease-out;" :src="require('@/assets/cross_icon.png')"/>
        </div>
    </div>
    <div class="principalDiv" v-if="statusSesion != 4">
        <div class="content" :style="adminLevel != 0?'animation: sliceAnimation 1s ease-out forwards;':adminLevel === 0 && statusSesion === -1?'animation: sliceAnimationReverse 1s ease-out forwards;':''">
            <div class="divImage">
                <img src="../../assets/uanl_logo.png" class="imageLogo"/>
            </div>
            <div v-if="componentCreated">
                <hr class="hrDiv" style="animation: opacityAnimation 1s ease-out forwards;"/>
                <h1 class="tittleText" style="animation: opacityAnimation 1s ease-out forwards;">Panel De Control</h1>
                <div style="position: relative;">
                    <input class="inputUserName" v-model="userName" style="animation: opacityAnimation 1s ease-out forwards;" type="text" placeholder="Ingrese El Usuario" />
                    <img class="iconInputUserName" :src="require('@/assets/icon_user.png')" alt="iconUser" />
                    <hr class="hrInputUserName"/>
                </div>

                <div style="position: relative;">
                    <input class="inputUserPassword" v-model="userPassword" style="animation: opacityAnimation 1s ease-out forwards;" type="password" placeholder="Ingrese La Contraseña" />
                    <img class="iconInputUserPassword" :src="require('@/assets/icon_password.png')" alt="iconPassword" />
                    <hr class="hrInputUserPassword"/>
                </div>
                <button :class="userName.length > 0 && userPassword.length > 7?'buttonContinueActive':'buttonContinueInactive'" v-on:click="onClickCheckSesion" style="animation: opacityAnimation 1s ease-out forwards;">Iniciar Sesion</button>
            </div>
        </div>
    </div>
    <div class="principalCards" v-if="statusSesion === 4 && editNowScene <= 1">
        <div class="content" style="animation: opacityAnimation 2s ease-out forwards;">
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
                <universityCard style="text-align: start;" v-for="(element,index) in pageCardsActual" :key="index" :timerWait="index" :lastElement="element === arrayExampleCards[arrayExampleCards.length-1]" :typeDisp="deviceType" :methodPosition="positionAsign" :methodOnEditVR="onClickEditVR" :methodOnDeleteVR="onClickDeleteVR" :methodOnAddVR="onAddNewVR" :typeVRComponent="1" :university="element" />
            </div>
        </div>
    </div>
</template>