let i = 1;

export default class Woods extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Woods'});
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
    const y = this.cameras.main.height / 2;
    
    this.add.image(x, y, 'woods');

    this.hoodgirl = this.add.sprite(-150, 400, 'hoodgirl', 'idle001.png');
    this.oldman = this.add.sprite(800, 400, 'oldman', 'idle001.png');
    this.farmzombie = this.add.sprite(800, 400, 'farmzombie', 'idle001.png');


    this.dialogue = this.cache.json.get('dialogue');

    this.styledbox = this.add.image(0, 0, 'styledbox');

    this.cutflesh = this.sound.add('cutflesh');

    this.section = 1;
    this.keySpace = true;
    this.keyA = false;


    // let text = this.add.text(x, y, 'TESTING PLS');
    this.currentDialogue = this.dialogue.woods.startnarration;
    this.text = this.add.text(x, 150, this.currentDialogue[0], {
      wordWrap: { width: 390 }
    });
    this.text.setOrigin(0.5, 0.5);
    this.text.setDepth(1);


    this.container = this.add.container(x, 150, this.styledbox);
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

    // oldman runs in to scene
    this.omRunOn = this.tweens.add({
      targets: this.oldman,
      x: 500,
      ease: 'power1',
      duration: 2200,
      repeat: 0,
      paused: true
    });

    // oldman runs out of scene
    this.omRunOff = this.tweens.add({
      targets: this.oldman,
      x: -150,
      ease: 'power1',
      duration: 2200,
      repeat: 0,
      paused: true
    });
     
    // zombie walks in to scene
    this.fzWalkOn = this.tweens.add({
      targets: this.farmzombie,
      x: 500,
      ease: 'power1',
      duration: 2500,
      repeat: 0,
      paused: true
    });
 



    // DEFINING ANIMATIONS

    // Hoodgirl animations:

    // Hoodgirl idle infinite loop
    this.anims.create({
      key: 'hgidle',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    });

    // Hoodgirl walking loops twice
    this.anims.create({
      key: 'hgwalking',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'walking00',
        suffix: '.png',
        start: 1,
        end: 24
      }),
      frameRate: 20,
      repeat: 1
    });

    // Hoodgirl attack once
    this.anims.create({
      key: 'hgattack',
      frames: this.anims.generateFrameNames('hoodgirl', { 
        prefix: 'attack00', 
        suffix: '.png',
        start: 1,
        end: 12 
      }), 
      frameRate: 20,
      repeat: 0
    });

    // Hoodgirl hurt once
    this.anims.create({
      key: 'hghurt',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'hurt00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 0
    });

    // Hoodgirl dying once
    this.anims.create({
      key: 'hgdying',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'dying00',
        suffix: '.png',
        start: 1,
        end: 15
      }),
      frameRate: 20,
      repeat: 0
    });

    // Hoodgirl evade run animation
    this.anims.create({
      key: 'hgrunning',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'running00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 0
    });

    
    // Oldman idle infinite loop
    this.anims.create({
      key: 'omidle',
      frames: this.anims.generateFrameNames('oldman', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    });

    // Oldman walking loops twice
    this.anims.create({
      key: 'omrunning',
      frames: this.anims.generateFrameNames('oldman', {
        prefix: 'running00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 3
    });


    // Farmzombie animations:

    // farmzombie idle infinite loop
    this.anims.create({
      key: 'fzidle',
      frames: this.anims.generateFrameNames('farmzombie', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 10,
      repeat: -1
    });

    // farmzombie walking loops twice
    this.anims.create({
      key: 'fzwalking',
      frames: this.anims.generateFrameNames('farmzombie', {
        prefix: 'walking00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 20,
      repeat: 2
    });

    // farmzombie attack once
    this.anims.create({
      key: 'fzattack',
      frames: this.anims.generateFrameNames('farmzombie', {
        prefix: 'attack00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 0
    });

    // farmzombie hurt once
    this.anims.create({
      key: 'fzhurt',
      frames: this.anims.generateFrameNames('farmzombie', {
        prefix: 'hurt00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 20,
      repeat: 0
    });

    // farmzombie dying once
    this.anims.create({
      key: 'fzdying',
      frames: this.anims.generateFrameNames('farmzombie', {
        prefix: 'dying00',
        suffix: '.png',
        start: 1,
        end: 15
      }),
      frameRate: 20,
      repeat: 0
    });

    // farmzombie evade running (just duplicate of walking with repeat 0)
    this.anims.create({
      key: 'fzrunning',
      frames: this.anims.generateFrameNames('farmzombie', {
        prefix: 'walking00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 30,
      repeat: 0
    });




    // CALLING ANIMATIONS
    this.hoodgirl.on('animationcomplete', () => {
      this.hoodgirl.play('hgidle');
    });

    this.oldman.on('animationcomplete', () => {
      this.oldman.play('omidle');
    });

    // this.hoodgirl.on('animationupdate', () => {
    //   if (this.hoodgirl.anims.currentAnim.key === 'hgwalking' && this.hoodgirl.anims.currentFrame.index === 2) {
    //     console.log("this is frame 2");
    //   }
    // })

    this.farmzombie.on('animationcomplete', () => {
      this.farmzombie.play('fzidle');
    });

    // this.farmzombie.on('animationcomplete', () => {
    //   // the zombie will idle on animation complete unless it just completed the dying animation
    //   if (this.farmzombie.anims.currentAnim.key == 'fzdying') {
    //       textcontainer2.visible = true;
    //       textcontainer2.add(text);
    //       text.visible = true;
    //       storyText9.visible = false;
    //       this.farmzombie.anims.pause(); // pauses the zombie on the last frame of the dying animation
    //   } else {
    //       farmzombie.play('fzidle');
    //   }
    // });


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
        this.text.setText(this.currentDialogue[i]);
        i++;
      } else {
        switch(this.section) {
        case 1:
          this.scene.start('Tavern');
          this.keySpace = false;
          this.container.visible = false;
          this.text.visible = false;
          this.oldman.anims.play('omrunning', true);
          this.omRunOn.restart();
          this.hoodgirl.anims.play('hgwalking', true);
          this.hgWalkOn.restart();
          this.currentDialogue = this.dialogue.woods.dialogue;
          i = 1;
          setTimeout(() => {
            this.keySpace = true;
            this.container.visible = true;
            this.text.visible = true;
            this.text.setText(this.currentDialogue[0]);
            this.section = 2;
          } ,2700);
          break;
        case 2:
          this.keySpace = false;
          this.container.visible = false;
          this.text.visible = false;
          this.omRunOff.restart();
          this.oldman.anims.play('omrunning', true);
          this.currentDialogue = this.dialogue.woods.endnarration;
          i = 1;
          setTimeout(() => {
            this.keySpace = true;
            this.container.visible = true;
            this.text.visible = true;
            this.text.setText(this.currentDialogue[0]);
            this.section = 3;
            this.oldman.anims.pause();
          }, 2700);
          break;
        case 3:
          this.keySpace = false;
          this.keyA = true;
          this.container.visible = false;
          this.text.visible = false;
          this.farmzombie.anims.play('fzwalking', true);
          this.fzWalkOn.restart();
        }
      }
    }
    this.hgAttack();
  }


  hgAttack() {
    const A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    if (Phaser.Input.Keyboard.JustDown(A) && this.keyA) {
      this.cutflesh.play();
      this.hoodgirl.anims.play('hgattack');
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