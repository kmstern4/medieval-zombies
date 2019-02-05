import MenuItem from './menu-item';

let player = {
  strength: 10,
  defense: 10,
  evasion: 10,
  health: 100,
  defend: false,
  potions: 1,
  stunCd: 2
}

let enemy = {
  strength: 10,
  evasion: 10,
  attackCounter: 0,
  health: 100
}

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
    this.scene = scene;
    this.addMenuItem('Attack');
    this.addMenuItem('Boomerang');
    this.addMenuItem('Stun');
    this.addMenuItem('Defend');
    this.addMenuItem('Potion');
    this.defaultSelect();
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
    this.stunOff();
    this.index--;
    if (this.index < 0) {
      this.index = this.menuItems.length - 1;
    }
    this.menuItems[this.index].select();
  }

  moveSelectionDown() {
    this.menuItems[this.index].deselect();
    this.stunOff();
    this.index++;
    if (this.index >= this.menuItems.length) {
      this.index = 0;
    }
    this.menuItems[this.index].select();
  }

  defaultSelect() {
    this.menuItems[0].select();
  }

  stunOff() {
    if (player.stunCd < 2) {
      this.menuItems[2].onCd();
      this.menuItems[2].setText('Stun on CD')
    } else {
      this.menuItems[2].deselect();
      this.menuItems[2].setText('Stun')
    }
  }

  confirm() {
    switch (this.index) {
      case 0:
        this.pAttack();
        this.stunOff();
        break;
      case 1:
        this.throwAttack();
        this.stunOff();
        break;
      case 2:
        if (player.stunCd >= 2) {
          this.menuItems[2].onCd();
          this.menuItems[2].setText('Stun on CD')
          this.stunAttack();
        } else {
          return false;
        }
        break;
      case 3:
        this.defend();
        this.stunOff();
        break;
      case 4:
        this.usePotion();
        this.stunOff();
        break;
      default:
        console.log(`You somehow hit a wrong index of ${this.index}`);
        break;
    }
  }

  // FIGHT FUNCTIONS

  //Player Actions

  pAttack() {
    //when the function is called run the normal Attack anim and generate the evasion threshold
    this.scene.player.anims.play('pattack', true);
    let evasionGenerate = Math.floor(Math.random() * 100);
    player.stunCd += 1;
    if (evasionGenerate > enemy.evasion) {
      //if the enemy evasion is lower than the threshold calculate normal attack damage
      this.scene.farmzombie.anims.play('fzhurt', true)
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
      enemy.health -= player.strength;
      console.log(`enemy health: ${enemy.health}`);
    } else {
      //if the enemy evasion is greater than the threshold they evade your attack
      this.scene.farmzombie.anims.play('fzrunning', true);
      this.scene.fzEvade.restart();;
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    }
  };

  //throw attack = damage will equal playerstrength / 2, cannot be evaded
  throwAttack() {
    //when the function is called run the throwAttack anim
    player.stunCd += 1;
    this.scene.player.anims.play('pthrow', true);
    this.scene.weapon.visible = true;
    this.scene.weaponThrow.restart();
    setTimeout(() => {
      this.scene.weapon.visible = false;
    }, 600);
    this.scene.farmzombie.anims.play('fzhurt', true);
    //calculate the throw attack damage
    enemy.health -= (player.strength / 2);
    console.log(`enemy health: ${enemy.health}`);
    //after the attack is finished the zombie takes its' turn
    setTimeout(() => {
      this.enemyAttack();
    }, 1000);
  };

  //stun attack = damage will equal playerstrength * 2, enemy is stunned until their next turn if they don't evade.
  stunAttack() {
    //when the function is call run the stun attack anim and generate evasion threshold
    this.scene.player.anims.play('prunattack', true);
    this.scene.farmzombie.anims.play('fzhurt', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    player.stunCd = 0;
    if (evasionGenerate > enemy.evasion) {
      //if the enemy evasion is lower than the threshold calculate stun attack damage, and set enemyStunned = true. Put stun attack on cooldown.
      enemy.health -= (player.strength * 2);
      console.log(`enemy health: ${enemy.health}`);
      //stun on cooldown
    } else {
      //if the enemy evasion is greater than the threshold they evade your attack. Put stunAttack on cooldown.
      this.scene.farmzombie.anims.play('fzrunning', true);
      this.scene.fzEvade.restart();
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    }
  }

  //Defend = reduce damage taken by playerDefense / 2.
  defend() {
    player.stunCd += 1;
    this.scene.player.anims.play('phurt', true);
    player.defend = true
    setTimeout(() => {
      this.enemyAttack();
    }, 1000);
  }

  usePotion() {
    if (player.potions >= 1) {
      player.stunCd += 1;
      this.scene.player.anims.play('phurt', true);
      player.health += 25;
      player.potions -= 1
      console.log(player.health);
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    } else {
      return false;
    }
  }

  //Enemy Actions
  enemyAttack() {
    if (enemy.health <= 0) {
      setTimeout(() => {
        this.scene.farmzombie.anims.play('fzdying', true)
      }, 200);
    } else if (enemy.attackCounter === 3) {
      this.specialAttack();
    } else {
      this.scene.farmzombie.anims.play('fzattack', true)
      //run enemy attack anim and generate evasion threshold
      var evasionGenerate = Math.floor(Math.random() * 100);
      if (evasionGenerate > player.evasion) {
        if (player.defend === true) {
          this.scene.player.anims.play('phurt', true);
          player.health -= (enemy.strength - (player.defense / 2));
          // enemy attack damage is reduced by player defense / 2
          enemy.attackCounter++;
          //add 1 to the enemy attack counter
          player.defend = false;
          //set playerDefend = false
          console.log(player.health);
          if (player.health <= 0) {
            setTimeout(() => {
              this.scene.player.anims.play('pdying', true)
            }, 100);
          }
        } else {
          this.scene.player.anims.play('phurt', true);
          //calculate full enemy attack damage
          player.health -= enemy.strength;
          //add 1 to the enemy attack counter
          enemy.attackCounter++;
          console.log(player.health);
          if (player.health <= 0) {
            setTimeout(() => {
              this.scene.player.anims.play('pdying', true)
            }, 100);
          }
        }
      } else {
        // if the playerevasion is greater than the threshold the player evades the attack
        this.scene.player.anims.play('prunning', true)
        this.scene.pEvade.restart();
        //add 1 to the enemy attack counter
        enemy.attackCounter++;
      }
    }
  };

  specialAttack() {
    //if the special attack counter = 2 this attack will run instead of enemy attack
    console.log("Pissed off zombie attack")
    this.scene.farmzombie.anims.play('fzattack', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > player.evasion) {
      if (player.defend === true) {
        //enemy attack damage is = to enemystrength * 2 reduced by player defense / 2
        this.scene.player.anims.play('phurt', true);
        player.health -= ((enemy.strength * 2) - (player.defense / 2));
        //set attackCounter = 0
        enemy.attackCounter = 0;
        //set playerDefend = false
        player.defend = false;
        console.log(player.health);
        if (player.health <= 0) {
          setTimeout(() => {
            this.scene.player.anims.play('pdying', true)
          }, 100);
        }
      } else {
        //enemy attack damage is = to enemystrength * 2
        this.scene.player.anims.play('phurt', true);
        player.health -= (enemy.strength * 2);
        //set attack counter = 0
        enemy.attackCounter = 0;
        console.log(player.health);
        if (player.health <= 0) {
          setTimeout(() => {
            this.scene.player.anims.play('pdying', true)
          }, 100);
        }
      }
    } else {
      // if the player evasion is greater than the generated threshold the player evades the attack
      this.scene.player.anims.play('prunning', true)
      this.scene.pEvade.restart();
      // set attack counter = 0
      enemy.attackCounter = 0;
    }
  };

}
