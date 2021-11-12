console.log('Flappy Bird V0.01');

const hitSound = new Audio()
hitSound.src = './assets/Sounds/efeitos_hit.wav'

const sprites = new Image()
sprites.src = './assets/sprites.png'

const canvas = document.getElementById('game-canvas');
const contexto = canvas.getContext('2d');

function flappyColide(flappyBird, floor){
    const flappyY = globals.flappy.y + globals.flappy.altura
    const floorY = floor.y
    if(flappyY >= floorY){
        return true
    }
        return false
}

function createFlappy(){
    const flappy = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 23,
        x: 10,
        y: canvas.height / 3,
        jump: 4.6,
        jumping(){
            console.log('Devo Pular')
            console.log('[antes]', flappy.speed)
            flappy.speed =- flappy.jump;
            console.log('[depois]', flappy.speed)
        },
        gravity: 0.25,
        speed: 0,
        flappyUpdate(){
            if(flappyColide(flappy, floor)){
                console.log('Colidiu')
                hitSound.play()
                changeScreen(screens.START)
    
                return;
            }
    
            flappy.speed = flappy.speed + flappy.gravity;
            flappy.y = flappy.y + flappy.speed;
        },
        draw() {
            contexto.drawImage(
                sprites,
                flappy.spriteX, flappy.spriteY, //Posição do sprite no arquivo.
                flappy.largura, flappy.altura, //tamanho do sprite na imagem
                flappy.x, flappy.y,
                flappy.largura, flappy.altura,
            );
        },
    }
    return flappy;
};

const floor = {
    spriteX:0,
    spriteY:609,
    largura: 224,
    altura: 113,
    x: 0,
    y:canvas.height - 113,
    // floorUpdate(){
    //     floor.x -= 1
    // },
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

//
// TELA
//

const globals = {}
let activeScreen = {}

function changeScreen(newScreen) {
    activeScreen = newScreen

    if(activeScreen.inicialize){
        activeScreen.inicialize();
    }
}

const screens = {
    START: {
        inicialize() {
            globals.flappy = createFlappy()
        },

        draw(){
            background.draw()
            floor.draw()
            globals.flappy.draw()
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
    draw(){
        background.draw()
        floor.draw()
        globals.flappy.draw()
    },

    click(){
        globals.flappy.jumping()
    },

    update(){
        globals.flappy.flappyUpdate()
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
loop()