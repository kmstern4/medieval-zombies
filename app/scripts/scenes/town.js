let i = 1;

export default class Town extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Town'});
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
    this.noises = data.noises;
    this.head = data.head;
    this.zombie = data.zombie;
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
    this.add.image(x, y, 'woods');

    // Section VERY IMPORTANT******
    this.section = 1;

    // Adding Sprites
    this.player = this.add.sprite(-150, 240, this.char, 'idle001.png');

    // Dialogue JSON
    this.dialogue = this.cache.json.get('dialogue');

    // Keypress Variables
    this.keySpace = true;

    // Narration text and associated textbox
    this.textbox = this.add.image(0, 0, 'textbox');
    this.currentDialogue = this.dialogue.town.startnarration;
    this.text = this.add.text(x, 400, this.currentDialogue[0].text, {
      wordWrap: { width: 390 }
    });
    this.text.setOrigin(0.5, 0.5);
    this.text.setDepth(1);
    this.container = this.add.container(x, 400, this.textbox);
    this.container.setSize(400, 100);

    // this.input.keyboard.on('keydown', this.onKeyInput, this);

    // TWEENS

    // tween to make player walk in to scene
    this.pWalkOn = this.tweens.add({
      targets: this.player,
      x: 150,
      ease: 'power1',
      duration: 2500,
      repeat: 0,
      paused: true
    });

    // tween to make player walk off scene
    this.pWalkOff = this.tweens.add({
      targets: this.player,
      x: 700,
      ease: 'power1',
      duration: 2200,
      repeat: 0,
      paused: true
    });

    // ANIMATION EVENTS

    this.player.on('animationcomplete', () => {
      this.player.play('pidle');
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
    const space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    if (Phaser.Input.Keyboard.JustDown(space) && this.keySpace) {

      if (this.currentDialogue[i] !== undefined) {
        this.text.setText(this.currentDialogue[i].text);
        i++;
      } else {
        switch(this.section) {
        case 1:
          this.turnOn();
          this.currentDialogue = this.dialogue.town.startnarration;
          i = 1;
          this.turnOff();
          this.player.anims.play('pwalking', true);
          this.pWalkOn.restart();
          this.section = 2;
          // console.log(this.section);
          setTimeout(() => {
            this.currentDialogue = this.dialogue.town.entertown;
            this.turnOn();
          } ,2700);
          break;
        case 2:
          this.turnOff();
          this.player.anims.play('pwalking', true);
          this.pWalkOff.restart();
          setTimeout(() => {
            this.scene.start('House', { head: this.head, char: this.char, weap: this.weap, noises: this.noises, zombie: this.zombie });
          } ,2700);
          break;
        }
      }
    }
  }


  turnOff() {
    this.keySpace = false;
    this.container.visible = false;
    this.text.visible = false;
  }

  turnOn() {
    i = 1;
    this.keySpace = true;
    this.container.visible = true;
    this.text.visible = true;
    this.text.setText(this.currentDialogue[0].text);
  }

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