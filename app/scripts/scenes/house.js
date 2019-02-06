let i = 1;

export default class House extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({ key: 'House' });
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

    this.add.image(x, y, 'house');

    this.hoodgirl = this.add.sprite(-150, 400, 'hoodgirl', 'idle001.png');
    this.child = this.add.sprite(800, 400, 'child', 'idle001.png');

    this.dialogue = this.cache.json.get('dialogue');

    this.styledbox = this.add.image(0, 0, 'textbox');

    this.section = 1;
    this.keySpace = true;
    this.keyA = false;


    // let text = this.add.text(x, y, 'TESTING PLS');
    this.currentDialogue = this.dialogue.house.penterhouse;
    this.text = this.add.text(x, 400, this.currentDialogue[0].text, {
      wordWrap: { width: 390 }
    });
    this.text.setOrigin(0.5, 0.5);
    this.text.setDepth(1);
    this.phead = this.add.image(160, 400, this.head);
    this.phead.setDepth(1);
    this.phead.visible = false;
    this.childhead = this.add.image(160, 400, 'childhead');
    this.childhead.setDepth(1);
    this.childhead.visible = false;


    this.container = this.add.container(x, 400, this.styledbox);
    this.container.setSize(400, 100);

    // TWEENS

    // tween to make player walk in to scene
    this.hgWalkOn = this.tweens.add({
      targets: this.hoodgirl,
      x: 150,
      ease: 'power1',
      duration: 2500,
      repeat: 0,
      paused: true
    });

    // child walk in to scene
    this.cWalkOn = this.tweens.add({
      targets: this.child,
      x: 500,
      ease: 'power1',
      duration: 2200,
      repeat: 0,
      paused: true
    });

    // DEFINING ANIMATIONS

    // child idle infinite loop
    this.anims.create({
      key: 'cidle',
      frames: this.anims.generateFrameNames('child', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    });

    // child walking loops twice
    this.anims.create({
      key: 'cwalking',
      frames: this.anims.generateFrameNames('child', {
        prefix: 'walking00',
        suffix: '.png',
        start: 1,
        end: 24
      }),
      frameRate: 30,
      repeat: 2
    });

    // CALLING ANIMATIONS

    this.hoodgirl.on('animationcomplete', () => {
      this.hoodgirl.play('hgidle');
    });

    this.child.on('animationcomplete', () => {
      this.child.play('cidle');
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
        if (this.currentDialogue[i].char === 'hero') {
          console.log(this.text);
          this.phead.visible = true;
          this.childhead.visible = false;
        } else if (this.currentDialogue[i].char === 'child') {
          this.childhead.visible = true;
          this.phead.visible = false;
        }
        i++;
      } else {
        switch (this.section) {
          case 1:
            this.hoodgirl.anims.play('hgwalking', true);
            this.hgWalkOn.restart();
            this.keySpace = false;
            this.container.visible = false;
            this.text.visible = false;
            this.currentDialogue = this.dialogue.house.childenterhouse;
            setTimeout(() => {
              this.child.anims.play('cwalking', true);
              this.cWalkOn.restart();
              i = 1;
              this.keySpace = true;
              this.container.visible = true;
              this.text.visible = true;
              this.text.setText(this.currentDialogue[0].text);
              this.section = 2;
            }, 2700);
            break;
        case 2:
          this.keySpace = false;
          this.container.visible = false;
          this.text.visible = false;
          this.currentDialogue = this.dialogue.house.dialogue;
          i = 1;
          setTimeout(() => {
            this.keySpace = true;
            this.container.visible = true;
            this.text.style.wordWrapWidth = 320;
            this.text.setX(360);
            this.childhead.visible = true;
            this.text.visible = true;
            this.text.setText(this.currentDialogue[0].text);
            this.section = 3;
          }, 2000);
          break;
        case 3:
          this.keySpace = false;
          this.container.visible = false;
          this.childhead.visible = false;
          this.text.visible = false;
          this.keySpace = true;
          setTimeout(() => {
          this.scene.start('Temple' , { char: this.char, weap: this.weap, noises: this.noises, head: this.head, zombie: 'woodzombie' });
          }, 2000); 
        }
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