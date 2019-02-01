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
    super(scene, x, y);
    this.menuItems = [];
    this.index = 0;
    this.x = x;
    this.y = y;
    this.addMenuItem('Attack');
    this.addMenuItem('Special Attack');
    this.addMenuItem('Potion');  
    //  Add this game object to the owner scene.
    scene.children.add(this);
  }

  addMenuItem(unit) {
    var menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 20, unit);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  }

  moveSelectionUp() {
    this.menuItems[this.index].deselect();
    this.index--;
    if (this.index < 0) {
      this.index = this.menuItems.length - 1;
    }
    this.menuItems[this.index].select();
  }

  moveSelectionDown() {
    this.menuItems[this.index].deselect();
    this.index++;
    if (this.index >= this.menuItems.length) {
      this.index = 0;
    }
    this.menuItems[this.index].select();
  }

  confirm() {
    switch(this.index) {
    case 0:
      console.log('Attack');
      break;
    case 1: 
      console.log('Defend');
      break;
    case 2:
      console.log('Potion');
      break;
    default:
      console.log(`You somehow hit a wrong index of ${this.index}`);
      break;
    }
  }

  
}
