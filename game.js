console.log('Flappy Bird V0.01');

const sprites = new Image()
sprites.src = './assets/sprites.png'

const canvas = document.getElementById('game-canvas');
const contexto = canvas.getContext('2d');

let flappy = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: canvas.height / 2,
    desenha() {
        contexto.drawImage(
            sprites,
            flappy.spriteX, flappy.spriteY, //Posição do sprite no arquivo.
            flappy.largura, flappy.altura, //tamanho do sprite na imagem
            flappy.x, flappy.y,
            flappy.largura, flappy.altura,
        );
    }
}

let floor = {
    spriteX:0,
    spriteY:609,
    largura: 224,
    altura: 113,
    x: 0,
    y:canvas.height - 113,
    desenha() {
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

let background = {
    spriteX:390,
    spriteY:0,
    largura: 276,
    altura: 205,
    x: 0,
    y:canvas.height - 205,
    desenha() {
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
function loop() {
    background.desenha()
    floor.desenha()
    flappy.desenha()
    requestAnimationFrame(loop)

    // flappy.y = flappy.y + 1
}
loop(30)

