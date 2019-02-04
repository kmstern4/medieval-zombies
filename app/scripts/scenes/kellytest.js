export default class Kellytest extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Kellytest'});
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
    this.hoodgirl = this.add.sprite(200, 200, 'hoodgirl', 'idle001.png');
    this.stick = this.add.image(260, 220, 'stick');
    this.stick.visible = false;
    this.sword = this.add.image(510, 220, 'sword');
    this.sword.visible = false;

    this.hoodboy = this.add.sprite(450, 200, 'hoodboy', 'idle001.png');


    // TWEENS

    this.runattack = this.tweens.add({
      targets: this.hoodgirl,
      x: 300,
      ease: "power1",
      duration: 300,
      paused: true,
      yoyo: true 
    });

    this.stickThrow = this.tweens.add({
      targets: this.stick,
      x: 450,
      duration: 300,
      angle: 360,
      ease: 'power1',
      paused: true,
      yoyo: true
    });

    this.brunattack = this.tweens.add({
      targets: this.hoodboy,
      x: 550,
      ease: "power1",
      duration: 300,
      paused: true,
      yoyo: true 
    });

    this.swordThrow = this.tweens.add({
      targets: this.sword,
      x: 700,
      duration: 300,
      angle: 360,
      ease: 'power1',
      paused: true,
      yoyo: true
    });





  // ANIMATIONS

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'attack00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'jump00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 25,
      repeat: 0
    });

    this.anims.create({
      key: 'runattack',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'runattack00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'throw',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'throw00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('hoodgirl', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    });

    this.anims.create({
      key: 'battack',
      frames: this.anims.generateFrameNames('hoodboy', {
        prefix: 'attack00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'bjump',
      frames: this.anims.generateFrameNames('hoodboy', {
        prefix: 'jump00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 25,
      repeat: 0
    });

    this.anims.create({
      key: 'brunattack',
      frames: this.anims.generateFrameNames('hoodboy', {
        prefix: 'runattack00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'bthrow',
      frames: this.anims.generateFrameNames('hoodboy', {
        prefix: 'throw00',
        suffix: '.png',
        start: 1,
        end: 12
      }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'bidle',
      frames: this.anims.generateFrameNames('hoodboy', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    });
    
    this.hoodboy.on('animationcomplete', () => {
      this.hoodboy.anims.play('bidle');
    });

    this.hoodboy.anims.play('bidle');

    
    this.hoodgirl.on('animationcomplete', () => {
      this.hoodgirl.anims.play('idle');
    });

    this.hoodgirl.anims.play('idle');


  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {
    const keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    const keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    const keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    const keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    if (Phaser.Input.Keyboard.JustDown(keyA)) {
      this.hoodgirl.anims.play('attack');
      this.hoodboy.anims.play('battack');
    }
    if (Phaser.Input.Keyboard.JustDown(keyS)) {
      this.hoodgirl.anims.play('jump');
      this.hoodboy.anims.play('bjump');
    }
    if (Phaser.Input.Keyboard.JustDown(keyD)) {
      this.runattack.restart();
      this.hoodgirl.anims.play('runattack');
      this.brunattack.restart();
      this.hoodboy.anims.play('brunattack');
    }
    if (Phaser.Input.Keyboard.JustDown(keyF)) {
      this.hoodgirl.anims.play('throw');
      this.stick.visible = true;
      this.stickThrow.restart();
      this.hoodboy.anims.play('bthrow');
      this.sword.visible = true;
      this.swordThrow.restart();
      setTimeout(() => {
        this.stick.visible = false;
        this.sword.visible = false;
      }, 600);
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
