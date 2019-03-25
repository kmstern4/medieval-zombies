export default class Instructions extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({ key: 'Instructions' });
  }

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create() {

    const x = this.cameras.main.width / 2;

    window.addEventListener('resize', resize);
    resize();

    const dialogue = this.cache.json.get('dialogue');

    let text1 = this.add.text(x, 100, dialogue.instructions[0], { fontSize: 25, align: 'center', wordWrap: { width: 580 } });
    text1.setOrigin(0.5, 0.5);
    let text2 = this.add.text(x, 150, dialogue.instructions[1]);
    text2.setOrigin(0.5, 0.5);
    let text3 = this.add.text(x, 250, dialogue.instructions[2], { fontSize: 25 });
    text3.setOrigin(0.5, 0.5);
    this.add.text(78, 280, dialogue.instructions[3], { align: 'center', wordWrap: { width: 580 } });
    let text5 = this.add.text(x, 310, dialogue.instructions[4]);
    text5.setOrigin(0.5, 0.5);
    this.add.text(78, 325, dialogue.instructions[5]);
    let text7 = this.add.text(x, 375, dialogue.instructions[6]);
    text7.setOrigin(0.5, 0.5);
  }

  update() {
    const keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    if (Phaser.Input.Keyboard.JustDown(keySpace)) {
      this.scene.start('CC');
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