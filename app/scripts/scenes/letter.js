let i = 1;
let text;
let dialogue;
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

    dialogue = this.cache.json.get('dialogue');

    this.add.image(x, 150, 'letter');
    let styledbox = this.add.image(0, 0, 'styledbox');


    // let text = this.add.text(x, y, "TESTING PLS");
    text = this.add.text(x, 350, dialogue.letter[0], {
      wordWrap: { width: 390 }
    });
    text.setOrigin(0.5, 0.5);
    text.setDepth(1);


    let container = this.add.container(x, 350, styledbox);
    container.setSize(400, 100);
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
      text.setText(dialogue.letter[i]);
      i++;
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


