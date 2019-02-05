export default class MenuItem extends Phaser.GameObjects.Text {
  /**
   *  My custom dynamic bitmap text.
   *
   *  @constructor
   *  @class MenuItem
   *  @extends Phaser.GameObjects.Text
   *  @param {Phaser.Scene} scene - The scene that owns this bitmap text.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y, text) {
    super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });


    //  Add this game object to the owner scene.
    scene.children.add(this);
  }

  select() {
    this.setColor('#f8ff38');
  }

  deselect() {
    this.setColor('#ffffff');
  }

  onCd () {
    this.setColor('#202020');
  }
}
