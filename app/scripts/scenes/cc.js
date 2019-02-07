export default class CC extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'CC'});
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

    const title = this.scene.get('Title');

    this.adventurestinger = this.sound.add('adventurestinger', { volume: 0.3 });
    
    this.choose = this.add.image(x, 180, 'choose');

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

    hoodgirl.on('pointerup', () => {
      title.rhythmloop.stop();
      this.scene.start('Letter', { 
        char: 'hoodgirl', 
        weap: 'stick', 
        noises: 'impact', 
        head: 'hghead',
        zombie: 'farmzombie'
      });
    });

    hoodboy.on('pointerup', () => {
      this.adventurestinger.play();
      title.rhythmloop.stop();
      this.scene.start('Letter', { 
        char: 'hoodboy', 
        weap: 'sword', 
        noises: 'cutflesh', 
        head: 'hbhead',
        zombie: 'farmzombie'
      });
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
