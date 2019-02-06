export default class TestTitle extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'TestTitle'});
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

    this.rhythmloop = this.sound.add('rhythmloop');
    this.rhythmloop.play({
      volume: 0.5,
      loop: true
    });

    let hoodgirl = this.add.sprite(-100, 350, 'hoodgirl', 'idle001.png');
    let hoodboy = this.add.sprite(750, 350, 'hoodboy', 'idle001.png');

    hoodboy.scaleX = -1;

    this.tweens.add({
      targets: hoodgirl,
      x: 200,
      ease: 'power1',
      duration: 2500,
      repeat: 0
    });

    this.tweens.add({
      targets: hoodboy,
      x: 450,
      ease: 'power1',
      duration: 2500,
      flipX: true,
      repeat: 0
    });

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

    this.anims.create({
      key: 'hbwalking',
      frames: this.anims.generateFrameNames('hoodboy', {
        prefix: 'walking00',
        suffix: '.png',
        start: 1,
        end: 24
      }),
      frameRate: 20,
      repeat: 1
    });

    this.anims.create({
      key: 'hbidle',
      frames: this.anims.generateFrameNames('hoodboy', {
        prefix: 'idle00',
        suffix: '.png',
        start: 1,
        end: 18,
      }),
      repeat: -1,
      frameRate: 15
    });

    hoodgirl.play('hgwalking');
    hoodgirl.on('animationcomplete', function() {
      hoodgirl.play('hgidle');
      hoodgirl.setInteractive();
    });

    hoodboy.play('hbwalking');
    hoodboy.on('animationcomplete', function() {
      hoodboy.play('hbidle');
      hoodboy.setInteractive();
    });

    const label = this.add.text(x, 100, 'Medieval Zombies', {
      font: '64px Lucida Console',
      color: 'white',
      stroke: 'black',
      strokeThickness: 6
    });

    label.setOrigin(0.5, 0.5);

    const label2 = this.add.text(x, 200, 'Choose a character to get started!', {
      font: '30px Lucida Console',
      color: 'green',
      stroke: 'black',
      strokeThickness: 6
    });

    const townLabel = this.add.text(x, 450, 'Click here dumbass', {
      font: '20px Lucida Console',
      color: 'white',
      stroke: 'black',
      strokeThickness: 4
    });

    hoodgirl.on('pointerup', () => {
      this.rhythmloop.stop();
      this.scene.start('Letter', { 
        char: 'hoodgirl', 
        weap: 'stick', 
        noises: 'impact', 
        head: 'hghead',
      });
    });

    hoodboy.on('pointerup', () => {
      this.rhythmloop.stop();
      this.scene.start('Letter', { 
        char: 'hoodboy', 
        weap: 'sword', 
        noises: 'cutflesh', 
        head: 'hbhead' 
      });
    });

    label2.setOrigin(0.5, 0.5);

    townLabel.setOrigin(0.5, 0.5);
    townLabel.setInteractive();
    townLabel.on('pointerup', () => {
      this.rhythmloop.stop();
      this.scene.start('Town');
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
