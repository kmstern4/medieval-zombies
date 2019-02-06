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
   *  Used to declare game assets to be loaded using the loader plugin API.
   *
   *  @protected
   */
  preload() {
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
  const y = this.cameras.main.height / 2;

  // background image
  this.add.image(x, y, 'gameover');

  const labelGO = this.add.text(x, 200, 'Click here to RETRY', {
    font: '30px Lucida Console',
    color: 'green',
    stroke: 'black',
    strokeThickness: 6
  });

  labelGO.setOrigin(0.5, 0.5);
  labelGO.setInteractive();
  labelGO.on('pointerup', () => {
    const woods = this.scene.get(this.currentScene);
    console.log(woods);
    woods.scene.restart();
    this.scene.sleep();
  // this.scene.start(this.currentScene);
  // console.log(this.currentScene);
  });
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {
  }

  /**
   *  Called after a scene is rendered. Handles rendenring post processing.
   *
   *  @protected
   */
  render() {
  }

  /**
   *  Called when a scene is about to shut down.
   *
   *  @protected
   */
  shutdown() {
  }

  /**
   *  Called when a scene is about to be destroyed (i.e.: removed from scene
   *  manager). All allocated resources that need clean up should be freed up
   *  here.
   *
   *  @protected
   */
  destroy() {
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