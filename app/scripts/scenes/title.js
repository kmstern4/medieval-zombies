export default class Title extends Phaser.Scene {

  // setting key Title for scene to be referenced by
  constructor() {
    super({key: 'Title'});
  }

  // sets up game objects on screen
  create() {

    // declaring center x axis coordinate
    const x = this.cameras.main.width / 2;
    
    window.addEventListener('resize', resize);
    resize();
    
    // adding in theme music
    this.rhythmloop = this.sound.add('rhythmloop');
    // playing theme music endless loop
    this.rhythmloop.play({
      volume: 0.5,
      loop: true
    });

    // adding Medieval Zombies text image (x, y, image)
    this.titletext = this.add.image(x, 170, 'titletext');

    // adding Start text image
    this.start = this.add.image(x, 340, 'start');

    // setting Start to be clickable object
    this.start.setInteractive();
    // when Start is clicked, next scene will start
    this.start.on('pointerup', () => {
      this.scene.start('Instructions');
    });
  }
}

// function to resize Canvas as window resizes
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
