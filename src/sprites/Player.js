import Keyboard from '../utils/keyboard';
import CatBullet from './CatBullet';
import socket from '../client';

class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    this.shootSounds = [
      this.scene.sound.add('miau1', { loop: false }),
      this.scene.sound.add('miau2', { loop: false }),
      this.scene.sound.add('miau3', { loop: false }),
    ];

    this.deathSound = this.scene.sound.add('miau4', { loop: false });

    this.scene = config.scene;
    this.name = config.name;
    this.setOrigin(0.0);
    config.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setDepth(3);

    this.controls = new Keyboard(this, this.scene);
    this.animation = 'downStanding';
    this.firingAngle = 90;
    this.alive = true;
    this.catBullets = [];
    this.body.immovable = true;
    this.body.moves = false;
    this.direction = 's';
    this.move_time = 139;
    this.lastMove = Date.now();
    this.on('animationcomplete', this.animComplete, this);

    this.create();
  }

  create() {
    this.catBullets = this.scene.physics.add.group({
      classType: CatBullet,
      maxSize: 10,
    });
  }

  fireCat(noPush) {
    if (!this.scene) {
      console.log('Scene is undefined');
      return;
    }

    this.firingAngle = this.calculateAngle();
    this.shootSounds[Math.floor(Math.random() * this.shootSounds.length)].play();
    const bullet = new CatBullet(this.scene);
    this.catBullets.add(bullet);
    bullet.fire(this);

    !noPush && socket.emit('fire', { dir: this.direction, x: Math.floor(this.x / 16), y: Math.floor(this.y / 16) });
  }

  update() {
    this.controls.update();
  }

  playAnimation() {
    this.anims.play(this.animation, true);
  }

  animComplete(stop) {
    stop && this.anims.isPlaying && this.anims.stop();
    !this.alive && this.destroy();
  }

  die() {
    this.deathSound.play();
    this.alive = false;
  }

  calculateAngle() {
    if (this.direction === 'n') return 270;
    if (this.direction === 's') return 90;
    if (this.direction === 'e') return 0;
    return 180;
  }
}

export default Player;
