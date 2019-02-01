import MenuItem from './menu-item';

export default class Menu extends Phaser.GameObjects.Container {
  /**
   *  My custom image.
   *
   *  @constructor
   *  @class Menu
   *  @extends Phaser.GameObjects.Container
   *  @param {Phaser.Scene} scene - The scene that owns this image.
   *  @param {number} x - The horizontal coordinate relative to the scene viewport.
   *  @param {number} y - The vertical coordinate relative to the scene viewport.
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'menu');
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.x = x;
    this.y = y;

    //  Add this game object to the owner scene.
    scene.children.add(this);
  }

  
}
