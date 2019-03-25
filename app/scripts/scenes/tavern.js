let i = 1;
export default class Tavern extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Tavern'});
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
    
    this.add.image(x, y, 'tavern');

    this.player = this.add.sprite(-150, 240, this.char, 'idle001.png');

    this.dialogue = this.cache.json.get('dialogue');

    this.styledbox = this.add.image(0, 0, 'textbox');

    this.section = 1;
    this.keySpace = true;
    this.keyA = false;


    // let text = this.add.text(x, y, 'TESTING PLS');
    this.currentDialogue = this.dialogue.tavern.pentertavern;
    this.text = this.add.text(x, 400, this.currentDialogue[0].text, {
      wordWrap: { width: 390 }
    });
    this.text.setOrigin(0.5, 0.5);
    this.text.setDepth(1);

    this.container = this.add.container(x, 400, this.styledbox);
    this.container.setSize(400, 100);

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

    // tween to make player walk off screen into house
    this.pWalkOff = this.tweens.add({
      targets: this.player,
      x: 700,
      ease: 'power1',
      duration: 2200,
      repeat: 0,
      paused: true
    });

    // CALLING ANIMATIONS

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
          this.keySpace = false;
          this.container.visible = false;
          this.text.visible = false;
          this.player.anims.play('pwalking', true);
          this.pWalkOn.restart();
          setTimeout(() => {
            this.currentDialogue = this.dialogue.tavern.startnarration;
            this.keySpace = true;
            this.container.visible = true;
            this.text.visible = true;
            this.text.setText(this.currentDialogue[0].text);
            this.section = 2;
          } ,2700);
          break;
        case 2:
          this.keySpace = false;
          this.container.visible = false;
          this.text.visible = false;
          this.keySpace = true;
          // hgwalk off screen
          this.pWalkOff.restart();
          this.player.anims.play('pwalking', true);
          setTimeout(() => {
            this.scene.start('Title', { char: this.char, weap: this.weap, noises: this.noises, head: this.head });
          }, 2700);
        }
      }
    }
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