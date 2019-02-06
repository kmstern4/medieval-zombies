export default class Title extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Title'});
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(/* data */) {
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

    const x = this.cameras.main.width / 2;
    
    window.addEventListener('resize', resize);
    resize();
    
    this.rhythmloop = this.sound.add('rhythmloop');
    this.rhythmloop.play({
      volume: 0.5,
      loop: true
    });

    this.titletext = this.add.image(x, 170, 'titletext');

    this.start = this.add.image(x, 340, 'start');

    this.start.setInteractive();
    this.start.on('pointerup', () => {
      this.rhythmloop.stop();
      this.scene.start('CC');
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
