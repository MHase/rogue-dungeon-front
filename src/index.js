import Phaser from 'phaser';
import { Boot, Game } from './scenes';
import '../assets/styles/index.scss';

const config = {
  type: Phaser.AUTO,
  parent: 'fear-game',
  width: 400,
  height: 400,
  pixelArt: true,
  antialias: false,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: [
    Boot,
    Game,
  ],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
