import socket from '../client';

class PlayerKeyboard {
  constructor(player, scene) {
    this.player = player;
    this.scene = scene;
    // game.input.keyboard.createCursorKeys()
    // creates object with keys codes as follows:
    // 16: true | shift
    // 32: true | spacebar
    // 37: true | left arrow
    // 38: true | up arrow
    // 39: true | right arrow
    // 40: true | down arrow
    // so we have to disable every other input exept arrows
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keyboard = scene.input.keyboard;
    scene.input.keyboard.removeKey(16);

    this.lastSend = Date.now();
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.player.fireCat();
    }

    if (Date.now() - this.lastSend < this.player.move_time) return;

    if (this.keyboard.checkDown(this.cursors.left, this.player.move_time)) {
      if (this.player.direction !== 'w' && this.isNotMoving()) {
        this.updateRotate('w', 'leftStanding');
        return;
      }
      this.lastSend = Date.now();
      socket.emit('move', { dir: 'w' });
    } else if (this.keyboard.checkDown(this.cursors.right, this.player.move_time)) {
      if (this.player.direction !== 'e' && this.isNotMoving()) {
        this.updateRotate('e', 'rightStanding');
        return;
      }
      this.lastSend = Date.now();
      socket.emit('move', { dir: 'e' });
    }

    if (this.keyboard.checkDown(this.cursors.down, this.player.move_time)) {
      if (this.player.direction !== 's' && this.isNotMoving()) {
        this.updateRotate('s', 'downStanding');
        return;
      }
      this.lastSend = Date.now();
      socket.emit('move', { dir: 's' });
    } else if (this.keyboard.checkDown(this.cursors.up, this.player.move_time)) {
      if (this.player.direction !== 'n' && this.isNotMoving()) {
        this.updateRotate('n', 'upStanding');
        return;
      }
      this.lastSend = Date.now();
      socket.emit('move', { dir: 'n' });
    }
  }

  updateRotate(dir, animation) {
    this.player.animation = animation;
    this.player.direction = dir;
    this.player.playAnimation(true);
    socket.emit('turn', { dir });
  }

  isNotMoving() {
    return this.player.animation !== 'left' && this.player.animation !== 'right'
        && this.player.animation !== 'up' && this.player.animation !== 'down';
  }
}

export default PlayerKeyboard;
