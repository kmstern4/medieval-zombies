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
  init(data) {
    this.char = data.char;
    this.weap = data.weap;
  }

  /**
   *  Used to declare game assets to be loaded using the loader plugin API.
   *
   *  @protected
   */
  preload() {
    // player idle infinite loop
    this.anims.create({
      key: 'pidle',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    });

    // player walking loops twice
    this.anims.create({
      key: 'pwalking',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'walking00',
        suffix: '.png',
        start: 1,
        end: 24
      }),
      frameRate: 20,
      repeat: 1
    });

    // player hurt once
    this.anims.create({
      key: 'phurt',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'hurt00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 0
    });

    // player dying once
    this.anims.create({
      key: 'pdying',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'dying00',
        suffix: '.png',
        start: 1,
        end: 15
      }),
      frameRate: 20,
      repeat: 0
    });

    // player evade run animation
    this.anims.create({
      key: 'prunning',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'running00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 0
    });

    // player basic attack
    this.anims.create({
      key: 'pattack',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'attack00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: 0
    });

    // player jump attack
    this.anims.create({
      key: 'pjump',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'jump00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 25,
      repeat: 0
    });

    // player running attack needs tween
    this.anims.create({
      key: 'prunattack',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'runattack00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 15,
      repeat: 0
    });

    // player throw weapon
    this.anims.create({
      key: 'pthrow',
      frames: this.anims.generateFrameNames(this.char, {
        prefix: 'throw00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 15,
      repeat: 0
    });



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
        this.scene.start('Woods', { char: this.char, weap: this.weap });
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
