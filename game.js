console.log('Flappy Bird V0.01');

const sprites = new Image()
sprites.src = './assets/sprites.png'

const canvas = document.getElementById('game-canvas');
const contexto = canvas.getContext('2d');

const flappy = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 23,
    x: 10,
    y: canvas.height / 3,
    gravity: 0.25,
    speed: 0,
    draw() {
        contexto.drawImage(
            sprites,
            flappy.spriteX, flappy.spriteY, //Posição do sprite no arquivo.
            flappy.largura, flappy.altura, //tamanho do sprite na imagem
            flappy.x, flappy.y,
            flappy.largura, flappy.altura,
        );
    },
    flappyUpdate(){
        flappy.speed = flappy.speed + flappy.gravity;
        flappy.y = flappy.y + flappy.speed;
        console.log(flappy.speed);
    },
    flappyColid(){
        if(flappy.y + flappy.altura >= floor.y){
            flappy.y = floor.y - flappy.altura
        }
    }
}

const floor = {
    spriteX:0,
    spriteY:609,
    largura: 224,
    altura: 113,
    x: 0,
    y:canvas.height - 113,
    draw() {
        contexto.drawImage(
            sprites,
            floor.spriteX, floor.spriteY, //Posição do sprite no arquivo.
            floor.largura, floor.altura, //tamanho do sprite na imagem
            floor.x, floor.y,
            floor.largura, floor.altura,
        );

        contexto.drawImage(
            sprites,
            floor.spriteX, floor.spriteY, //Posição do sprite no arquivo.
            floor.largura, floor.altura, //tamanho do sprite na imagem
            (floor.x + floor.largura), floor.y,
            floor.largura, floor.altura,
        );
    }
}

const background = {
    spriteX:390,
    spriteY:0,
    largura: 276,
    altura: 205,
    x: 0,
    y:canvas.height - 205,
    draw() {
        contexto.fillStyle = '#70C5CE'
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, //Posição do sprite no arquivo.
            background.largura, background.altura, //tamanho do sprite na imagem
            background.x, background.y,
            background.largura, background.altura,
        );
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, //Posição do sprite no arquivo.
            background.largura, background.altura, //tamanho do sprite na imagem
            (background.x + background.largura), background.y,
            background.largura, background.altura,
        );
    }
}

const messageGetReady = {
    sx: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw(){
        contexto.drawImage(
            sprites,
            messageGetReady.sx, messageGetReady.sY,
            messageGetReady.w, messageGetReady.h,
            messageGetReady.x, messageGetReady.y,
            messageGetReady.w, messageGetReady.h
        )
    }
    
}

let activeScreen = {}

function changeScreen(newScreen) {
    activeScreen = newScreen
}

const screens = {
    START: {
        draw(){
            background.draw()
            floor.draw()
            flappy.draw()
            messageGetReady.draw()
        },
        click(){
            changeScreen(screens.GAME)
        },
        update(){

        },
    }
}

screens.GAME = {
    draw() {
        background.draw()
        floor.draw()
        flappy.draw()
    },
    update(){
        flappy.flappyUpdate()
        flappy.flappyColid()
    },
}

window.addEventListener('click', ()=> {
    if(activeScreen.click){
        activeScreen.click()
    }
} )

function loop() {
    activeScreen.draw()
    activeScreen.update()

    requestAnimationFrame(loop)
}

changeScreen(screens.START)
loop(30)

