console.log('Flappy Bird V0.01');

let frames = 0
const hitSound = new Audio()
hitSound.src = './assets/Sounds/efeitos_hit.wav'
hitSound.volume = 0.1

const sprites = new Image()
sprites.src = './assets/sprites.png'

const canvas = document.getElementById('game-canvas');
const contexto = canvas.getContext('2d');

function flappyColide(flappyBird, floor) {
    const flappyY = globals.flappy.y + globals.flappy.altura
    const floorY = floor.y
    if (flappyY >= floorY) {
        return true
    }
    return false
}

function createFlappy() {
    const flappy = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 23,
        x: 10,
        y: canvas.height / 3,
        jump: 4.6,
        jumping() {
            // console.log('Devo Pular')
            // console.log('[antes]', flappy.speed)
            flappy.speed = -flappy.jump;
            // console.log('[depois]', flappy.speed)
        },
        gravity: 0.25,
        speed: 0,
        flappyUpdate() {
            if (flappyColide(flappy, globals.floor)) {
                console.log('Colidiu')
                hitSound.play()
                changeScreen(screens.START)

                return;
            }

            flappy.speed = flappy.speed + flappy.gravity;
            flappy.y = flappy.y + flappy.speed;
        },

        moves: [{
                spriteX: 0,
                spriteY: 0,
            },
            {
                spriteX: 0,
                spriteY: 26,
            },
            {
                spriteX: 0,
                spriteY: 52,
            },
            {
                spriteX: 0,
                spriteY: 26,
            },
        ],
        atualFrame: 0,
        updateFrame() {
            const frameInterval = 10;
            const passInterval = frames % frameInterval === 0
            // console.log(passInterval); 

            if (passInterval) {
                const increaseBase = 1;
                const increase = flappy.atualFrame + increaseBase;
                const baseRepeat = flappy.moves.length;
                flappy.atualFrame = increase % baseRepeat;
            }


            // console.log('[Frame]', frames);
            // console.log('[Frame atual]', flappy.atualFrame)

        },
        draw() {
            flappy.updateFrame()
            const {
                spriteX,
                spriteY
            } = flappy.moves[flappy.atualFrame];

            contexto.drawImage(
                sprites,
                spriteX, spriteY, //Posição do sprite no arquivo.
                flappy.largura, flappy.altura, //tamanho do sprite na imagem
                flappy.x, flappy.y,
                flappy.largura, flappy.altura,
            );
        },
    }
    return flappy;
};

function floorCreator() {
    const floor = {
        spriteX: 0,
        spriteY: 609,
        largura: 224,
        altura: 113,
        x: 0,
        y: canvas.height - 113,
        // floorUpdate(){
        //     floor.x -= 1
        // },
        update() {
            const floorMove = 1;
            const repetWhen = floor.largura / 2;
            const movimentation = floor.x - floorMove

            floor.x = movimentation % repetWhen;
        },
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
    return floor
}

const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 205,
    x: 0,
    y: canvas.height - 205,
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
    draw() {
        contexto.drawImage(
            sprites,
            messageGetReady.sx, messageGetReady.sY,
            messageGetReady.w, messageGetReady.h,
            messageGetReady.x, messageGetReady.y,
            messageGetReady.w, messageGetReady.h
        )
    }

}

function createTubes() {
    const tubes = {
        largura: 52,
        altura: 400,
        floor: {
            spriteX: 0,
            spriteY: 169,
        },
        sky: {
            spriteX: 52,
            spriteY: 169,
        },
        space: 80,
        draw() {
            tubes.pars.forEach(function (par) {
                const spaceBtnTubes = 90;
                const randomY = par.y;

                const tubeSkyX = par.x;
                const tubeSkyY = randomY;

                // [Cano do ceu]
                contexto.drawImage(
                    sprites,
                    tubes.sky.spriteX, tubes.sky.spriteY,
                    tubes.largura, tubes.altura,
                    tubeSkyX, tubeSkyY,
                    tubes.largura, tubes.altura,
                )



                // Cano do Chão
                const tubeFloorX = par.x;
                const tubeFloorY = tubes.altura + spaceBtnTubes + randomY;
                contexto.drawImage(
                    sprites,
                    tubes.floor.spriteX, tubes.floor.spriteY,
                    tubes.largura, tubes.altura,
                    tubeFloorX, tubeFloorY,
                    tubes.largura, tubes.altura,
                )

                par.tubeSky = {
                    x: tubeSkyX,
                    y: tubes.altura + tubeSkyY,
                }

                par.tubeFloor = {
                    x: tubeFloorX,
                    y: tubeFloorY,
                }
            })
        },
        hasCollidedFlappy(par) {
            const headFlappy = globals.flappy.y;
            const footFlappy = globals.flappy.y - globals.flappy.altura;

            if ((globals.flappy.x + globals.flappy.largura) >= par.x) {
                if (headFlappy <= par.tubeSky.y) {
                    // console.log("Bateu no cano");
                    return true;
                }
                if (footFlappy >= par.tubeSky.y) {
                    return true
                }
            } else {
                return false
            }
        },

        pars: [],
        update() {
            const pass100Frames = frames % 100 === 0;
            if (pass100Frames) {
                // console.log('Passou 100 frames');
                tubes.pars.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                }, )
            }

            tubes.pars.forEach(function (par) {
                par.x = par.x - 2

                if (tubes.hasCollidedFlappy(par)) {
                    console.log("Você perdeu")
                    changeScreen(screens.START)
                }

                if (par.x <= -canvas.width) {
                    tubes.pars.shift();
                }
            })
        },
    }
    return tubes
}

//
// TELA
//

const globals = {}
let activeScreen = {}

function changeScreen(newScreen) {
    activeScreen = newScreen

    if (activeScreen.inicialize) {
        activeScreen.inicialize();
    }
}

const screens = {
    START: {
        inicialize() {
            globals.flappy = createFlappy()
            globals.floor = floorCreator()
            globals.tubes = createTubes()
        },

        draw() {
            background.draw()
            globals.floor.draw()
            globals.flappy.draw()
            messageGetReady.draw()
        },

        click() {
            changeScreen(screens.GAME)
        },

        update() {
            globals.floor.update();

        },
    }
}

screens.GAME = {
    draw() {
        background.draw()
        globals.tubes.draw()
        globals.floor.draw()
        globals.flappy.draw()
    },

    click() {
        globals.flappy.jumping()
    },

    update() {
        globals.flappy.flappyUpdate()
        globals.floor.update()
        globals.tubes.update()
    },
}

window.addEventListener('click', () => {
    if (activeScreen.click) {
        activeScreen.click()
    }
})

function loop() {
    activeScreen.draw()
    activeScreen.update()

    frames = frames + 1
    requestAnimationFrame(loop)
}

changeScreen(screens.START)
loop()