export default class Ui extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({ key: 'Ui' });
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(data) {
    this.woods = data.woods
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
    // this.graphics = this.add.graphics();
    // this.graphics.lineStyle(1, 0xffffff);
    // this.graphics.fillStyle(0x031f4c, 1);
    // this.graphics.strokeRect(220, 330, 100, 100);
    // this.graphics.fillRect(220, 330, 100, 100);
    // this.graphics.strokeRect(320, 330, 100, 100);
    // this.graphics.fillRect(320, 330, 100, 100);

    // // basic container to hold all menus
    // this.menus = this.add.container();
    this.menubox = this.add.image(325, 333, 'menubox');
    this.menu = this.add.container();
    this.menu.setSize(120, 140);

    // this.heroesMenu = new HeroesMenu(225, 333, this);
    this.actionsMenu = new ActionsMenu(262, 306, this);

    // the currently selected menu 
    this.currentMenu = this.actionsMenu;

    this.menu.add(this.menubox);
    // add menus to the container
    // this.menu.add(this.heroesMenu);
    this.menu.add(this.actionsMenu);
    // this.menus.add(this.enemiesMenu);

    this.input.keyboard.on('keydown', this.onKeyInput, this);
  }

  onKeyInput(event) {
    if (this.currentMenu) {
      if (event.code === 'ArrowUp') {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === 'Enter') {
        this.currentMenu.select();
      } 
    }
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

var MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize:

    function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15, depth: 1 });
    },

  select: function () {
    this.setColor('#f8ff38');
  },

  deselect: function () {
    this.setColor('#ffffff');
  }

});

var Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize:

    function Menu(x, y, scene, heroes) {
      Phaser.GameObjects.Container.call(this, scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.heroes = heroes;
      this.x = x;
      this.y = y;
    },
    addMenuItem: function (unit) {
      var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
      this.menuItems.push(menuItem);
      this.add(menuItem);
    },
    moveSelectionUp: function () {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex--;
      if (this.menuItemIndex < 0)
        this.menuItemIndex = this.menuItems.length - 1;
      this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown: function () {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length)
        this.menuItemIndex = 0;
      this.menuItems[this.menuItemIndex].select();
    },
    // select the menu as a whole and an element with index from it
    select: function () {
      console.log('select', this.menuItemIndex)
      // if(!index)
      //     index = 0;
      this.menuItems[this.menuItemIndex].deselect();
      //this.menuItemIndex = index;
      this.menuItems[this.menuItemIndex].select();
      console.log('select console log', this.menuItems[this.menuItemIndex])
      this.confirm()
    },

    confirm: function () {
      console.log('index', this.menuItemIndex)
      switch (this.menuItemIndex) {
        case 0:
          console.log('Attack');
          console.log(this.scene.get('Woods'));
          this.woods.player.anims.play('pattack');
          break;
        case 1:
          console.log('Defend');
          break;
        case 2:
          console.log('Heal');
          break;
        default:
          console.log(this)
          break;
      }
    },
    // deselect this menu
    deselect: function () {
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = 0;
    },
    // confirm: function() {

    // },
    clear: function () {
      for (var i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].destroy();
      }
      this.menuItems.length = 0;
      this.menuItemIndex = 0;
    },
    remap: function (units) {
      this.clear();
      for (var i = 0; i < units.length; i++) {
        var unit = units[i];
        this.addMenuItem(unit.type);
      }
    }
});

// var HeroesMenu = new Phaser.Class({
//   Extends: Menu,

//   initialize:

//     function HeroesMenu(x, y, scene) {
//       Menu.call(this, x, y, scene);
//       this.addMenuItem('Adventurer')
//       this.addMenuItem('Hp: 50')
//       this.addMenuItem('Str: 15')
//       this.addMenuItem('Def: 5')
//       this.addMenuItem('Potions: 2')
//     }
// });

var ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
      this.addMenuItem('Attack');
      this.addMenuItem('Special Attack');
      this.addMenuItem('Heal');
    }

});

