// index.js
const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

};
var game = new Phaser.Game(config);
var ball; // pelota
var hole; //agujero
let keyA; //tecla A 
let keyS; // tecla S
let keyD; // tecla D
let keyW; // tecla W
var score = 0;
var scoreText;

function preload() {
    this.load.image('screen-bg', 'img/screen-bg.png');
    this.load.image('h', 'img/element-h.png');
    this.load.image('w', 'img/element-w.png');
    this.load.spritesheet('ball',
        'img/ball.png', { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image('hole', 'img/hole.png')
}

function create() {
    // usar teclas
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // mover hacia la izquierda
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); // mover hacia abajo
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // mover hacia la derecha 
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // mover hacia arriba
    // plataforma
    tope = this.physics.add.staticGroup();
    this.add.image(160, 240, 'screen-bg');
    ball = this.physics.add.sprite(160, 400, 'ball');
    ball.setCollideWorldBounds(true);

    hole = this.physics.add.staticGroup();
    hole.create(160, 50, 'hole');
    tope.create(50, 150, 'h');
    tope.create(200, 150, 'w');
    tope.create(160, 350, 'w');
    this.physics.add.collider(ball, tope);
    this.physics.add.overlap(ball, hole, finish, null, this);

    //puntaje
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '14px', fill: '#fff' });

    score += 10;
    scoreText.setText('Puntaje: ' + score);

}

function update() {
    //mover pelota
    if (keyA.isDown) {
        ball.setVelocityX(-160);

    } else if (keyS.isDown) {
        ball.setVelocityY(160);

    } else if (keyD.isDown) {
        ball.setVelocityX(160);

    } else if (keyW.isDown) {
        ball.setVelocityY(-160);
    }


}

function finish(ball, hole) {
    this.physics.pause();
    ball.setTint(0xff0000);
    ball.diableBody(true, true);
    alert('Ganaste');

    gameOver = true;

}

function reload() {
    location.reload();
}