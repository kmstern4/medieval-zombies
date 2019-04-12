export default class CC extends Phaser.Scene {

  constructor() {
    // Key for this scene to be referenced by
    super({key: 'CC'});
  }

  // Sets up game objects on the screen
  create() {
    // Center of x axis
    const x = this.cameras.main.width / 2;
    
    // calling resize function allowing the canvas to be resized along with window size
    window.addEventListener('resize', resize);
    resize();

    // Creating a reference to the Title scene; on this scene it will be used to access audio from Title scene
    const title = this.scene.get('Title');

    // adding the stinger to play at start of adventure and lowering the default volume
    this.adventurestinger = this.sound.add('adventurestinger', { volume: 0.3 });
    
    // adding image of the Choose Your Hero text
    this.choose = this.add.image(x, 180, 'choose');

    // adding sprites for both male and female player character (pc)
    let hoodgirl = this.add.sprite(-100, 350, 'hoodgirl', 'idle001.png');
    let hoodboy = this.add.sprite(750, 350, 'hoodboy', 'idle001.png');

    // flipping male pc sprite on the x axis so he can walk in from screen right
    hoodboy.scaleX = -1;

    // movement of hoodgirl from off screen left to x 200
    this.tweens.add({
      targets: hoodgirl,
      x: 200,
      ease: 'power1',
      duration: 2500,
      repeat: 0
    });

    // movement of hoodboy from off screen right to x 450
    this.tweens.add({
      targets: hoodboy,
      x: 450,
      ease: 'power1',
      duration: 2500,
      flipX: true,
      repeat: 0
    });

    // creating hoodgirl's idling animation, endless loop
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

    // creating hoodgirl's walking animation, loops two times
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

    // creating hoodboy's walking animation, loops two times
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

    // creating hoodboy's idling animation, endless loop
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

    // starts hoodgirl walking animaion upon scene start
    hoodgirl.play('hgwalking');
    // when walking has looped both times and is 'complete' hoodgirl will begin endless loop idle animation
    hoodgirl.on('animationcomplete', function() {
      hoodgirl.play('hgidle');
      // hoodgirl also becomes a clickable object
      hoodgirl.setInteractive();
    });

    // starts hoodboy walking animation upon scene start
    hoodboy.play('hbwalking');
    // when walking has looped both times and is 'complete' hoodboy will begin endless loop idle animation
    hoodboy.on('animationcomplete', function() {
      hoodboy.play('hbidle');
      // hoodboy becomes clickable object
      hoodboy.setInteractive();
    });

    // when hoodgirl is clicked on
    hoodgirl.on('pointerup', () => {
      // adventure stinger sound will play
      this.adventurestinger.play();
      // audio from Title scene will stop playing
      title.rhythmloop.stop();
      // start next scene, Letter
      this.scene.start('Letter', { 
        // pass through player character name, weapon, weapon sound, head, and first zombie name
        char: 'hoodgirl', 
        weap: 'stick', 
        noises: 'impact', 
        head: 'hghead',
        zombie: 'farmzombie'
      });
    });

    // when hoodboy is clicked on
    hoodboy.on('pointerup', () => {
      // adventure stinger sound will play
      this.adventurestinger.play();
      // audio from Title scene will stop playing
      title.rhythmloop.stop();
      // start next scene, Letter
      this.scene.start('Letter', { 
        // pass through player character name, weapon, weapon sound, head, and first zombie name
        char: 'hoodboy', 
        weap: 'sword', 
        noises: 'cutflesh', 
        head: 'hbhead',
        zombie: 'farmzombie'
      });
    });

  }
}

// function to resize canvas with window size
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
