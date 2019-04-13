export default class Gameover extends Phaser.Scene {

  // assigning key Gameover to reference this scene
  constructor() {
    super({key: 'Gameover'});
  }

  // data required when initializing the scene
  init(data) {
    // name of scene where death happened
    this.currentScene = data.currentScene;
  }

  // setting up game objects on screen
  create() {

    // calling function to resize canvas to fit window
    window.addEventListener('resize', resize);
    resize();

    // center of x axis of canvas
    const x = this.cameras.main.width / 2;

    // adding You Died text image
    this.add.image(x, 170, 'youdied');

    // adding Retry text image
    this.retry = this.add.image(x, 340, 'retry');
    // making Retry be a clickable object
    this.retry.setInteractive();
    // when Retry is clicked
    this.retry.on('pointerup', () => {
      // getting the scene where death occured
      const woods = this.scene.get(this.currentScene);
      // restarting scene where death occured
      woods.scene.restart();
      // turning the Game Over scene off
      this.scene.sleep();
    });
  }
}

// function to resize Canvas along with browser window size
function resize() {
  let canvas = document.querySelector('canvas'), width = window.innerWidth, height = window.innerHeight;
  let wratio = width / height, ratio = canvas.width / canvas.height;

  if (wratio < ratio) {
    canvas.style.width = width + 'px';
    canvas.style.height = (width / ratio) + 'px';
  } else {
    canvas.style.width = (height * ratio) + 'px';
    canvas.style.height = height + 'px';
  }
}