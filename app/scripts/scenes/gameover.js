export default class Gameover extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Gameover'});
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(data) {
    this.currentScene = data.currentScene;
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {

    window.addEventListener('resize', resize);
    resize();

    const x = this.cameras.main.width / 2;
    // const y = this.cameras.main.height / 2;

    this.add.image(x, 170, 'youdied');
    this.retry = this.add.image(x, 340, 'retry');

    this.retry.setInteractive();
    this.retry.on('pointerup', () => {
      const woods = this.scene.get(this.currentScene);
      // console.log(woods);
      woods.scene.restart();
      this.scene.sleep();
      // this.scene.start(this.currentScene);
      // console.log(this.currentScene);
    });
  }
}

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