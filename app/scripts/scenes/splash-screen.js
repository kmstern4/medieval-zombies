export default class SplashScreen extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets, including textures, tile
   *  maps, sound effects and other binary files, while displaying a busy
   *  splash screen.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'SplashScreen',

      //  Splash screen and progress bar textures.
      pack: {
        files: [{
          key: 'splash-screen',
          type: 'image'
        }, {
          key: 'progress-bar',
          type: 'image'
        }]
      }
    });
  }

  /**
   *  Show the splash screen and prepare to load game assets.
   *
   *  @protected
   */
  preload() {
    //  Display cover and progress bar textures.
    this.showCover();
    this.showProgressBar();

    //  HINT: Declare all game assets to be loaded here.
    this.load
      .image('dirt')
      .image('letter')
      .image('textbox')
      .image('menubox')
      .image('arrow')
      // .image('woods', 'forest.png')
      .image('woods', 'woods.png')
      .image('town', 'town.png')
      .image('house', 'house.png')
      .image('tavern', 'tavern.png')
      .image('temple', 'temple.png')
      .image('gameover', 'gameover.png')
      .image('hghead')
      .image('hbhead')
      .image('omhead')
      .image('childhead')
      .image('red', 'red.png')
      .image('blue', 'blue.png')
      .image('green', 'green.png')
      .image('stick')
      .image('sword');


    this.load.json('dialogue');

    this.load.atlas('hoodgirl', 'hoodgirl1.png', 'hoodgirl1.json')
      .atlas('farmzombie', 'farmzombie.png', 'farmzombie.json')
      .atlas('woodzombie', 'woodzombie.png', 'woodzombie.json')
      .atlas('oldman', 'oldman.png', 'oldman.json')
      .atlas('hoodboy', 'hoodboy1.png', 'hoodboy1.json')
      .atlas('child', 'child.png', 'child.json');


    this.load
      .audio('cutflesh', 'cutflesh.mp3')
      .audio('rhythmloop', 'assault1loop.wav')
      .audio('dangerstinger', 'assaultDangerStinger.wav')
      .audio('impact', 'impact.mp3')
      .audio('heal', 'heal.mp3')
      .audio('shield', 'shield.mp3')
      .audio('stab', 'stab.mp3');
  }

  /**
   *  Set up animations, plugins etc. that depend on the game assets we just
   *  loaded.
   *
   *  @protected
   */
  create() {
    //  We have nothing left to do here. Start the next scene.
    this.scene.start('Title');
  }

  //  ------------------------------------------------------------------------

  /**
   *  Show the splash screen cover.
   *
   *  @private
   */
  showCover() {
    this.add.image(0, 0, 'splash-screen').setOrigin(0);
  }

  /**
   *  Show the progress bar and set up its animation effect.
   *
   *  @private
   */
  showProgressBar() {
    //  Get the progress bar filler texture dimensions.
    const {width: w, height: h} = this.textures.get('progress-bar').get();

    //  Place the filler over the progress bar of the splash screen.
    const img = this.add.sprite(82, 282, 'progress-bar').setOrigin(0);

    //  Crop the filler along its width, proportional to the amount of files
    //  loaded.
    this.load.on('progress', v => img.setCrop(0, 0, Math.ceil(v * w), h));
  }
}
