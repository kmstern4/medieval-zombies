let i = 1;
export default class Letter extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Letter'});
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

    window.addEventListener('resize', resize);
    resize();

    const x = this.cameras.main.width / 2;
    // const y = this.cameras.main.width / 2;

    this.dialogue = this.cache.json.get('dialogue');

    this.add.image(x, 150, 'letter');
    this.styledbox = this.add.image(0, 0, 'styledbox');


    // let text = this.add.text(x, y, "TESTING PLS");
    this.text = this.add.text(x, 350, this.dialogue.letter[0], {
      wordWrap: { width: 390 }
    });
    this.text.setOrigin(0.5, 0.5);
    this.text.setDepth(1);


    this.container = this.add.container(x, 350, this.styledbox);
    this.container.setSize(400, 100);
    // container.add(text);
    // container.visible = false;



    // function loadText() {
    //   setTimeout(function () {
    //     container.visible = true;
    //     container.add(text);
    //     text.setText(dialogue.letter[0]);
    //     text.setDepth(1);
    //   }, 500);
    // }
    
    // loadText();




  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {
    const keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    if (Phaser.Input.Keyboard.JustDown(keySpace)) {
      if (this.dialogue.letter[i] !== undefined) {
        this.text.setText(this.dialogue.letter[i]);
        i++;
      } else {
        this.scene.start('Woods');
      }
    }

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


