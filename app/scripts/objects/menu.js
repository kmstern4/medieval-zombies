import MenuItem from './menu-item';

let player = {
  strength: 10,
  defense: 10,
  evasion: 10,
  health: 100,
  defend: false,
  potions: 1,
  stunCd: 2,
  attackCounter: 0
}

let enemy = {
  strength: 10,
  evasion: 10,
  attackCounter: 0,
  health: 100,
  stunned: false
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
    player.health = 100;
    var menuItem = new MenuItem(this.scene, 0, this.menuItems.length * 27, unit);
    menuItem.setOrigin(0.5, 0.5);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  }

  moveSelectionUp() {
    this.menuItems[this.index].deselect();
    this.stunOff();
    this.noPot();
    this.index--;
    if (this.index < 0 && player.potions < 1) {
      this.menuItems[3].select();
      this.menuItems[4].onCd();
      this.index = 3;
    } else if (this.index < 0) {
      this.index = this.menuItems.length - 1;
    } else if (this.index === 2 && enemy.stunned === true) {
      this.menuItems[1].select();
      this.menuItems[2].onCd();
      this.index = 1;
    } 
    this.menuItems[this.index].select();
  }

  moveSelectionDown() {
    this.menuItems[this.index].deselect();
    this.stunOff();
    this.noPot();
    this.index++;
    if (this.index >= this.menuItems.length) {
      this.index = 0;
    } else if (this.index === 2 && enemy.stunned === true) {
      this.menuItems[3].select();
      this.menuItems[2].onCd();
      this.index = 3;
    } else if (this.index === 4 && player.potions < 1) {
      this.menuItems[0].select();
      this.menuItems[4].onCd();
      this.index = 0;
    }
    this.menuItems[this.index].select();
  }

  defaultSelect() {
    this.menuItems[0].select();
  }

  stunOff() {
    if (player.stunCd === 0) {
      this.menuItems[2].onCd();
      this.menuItems[2].setText('Stun (2 Turns)')
    } else if (player.stunCd === 1) {
      this.menuItems[2].onCd();
      this.menuItems[2].setText('Stun (1 Turn)')
    } else {
      this.menuItems[2].deselect();
      this.menuItems[2].setText('Stun');
      enemy.stunned = false;
    }
  }

  noPot() {
    if (player.potions < 1) {
      this.menuItems[4].onCd();
      this.menuItems[4].setText('No Potions');
    }
  }

  confirm() {
    this.scene.keyEnter = false;
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
          enemy.stunned = true;
          this.menuItems[2].onCd();
          this.menuItems[2].setText('Stun (2 Turns)')
          this.stunAttack();
          this.index ++;
          this.menuItems[3].select();
        } else {
          enemy.stunned = false;
        }
        break;
      case 3:
        this.defend();
        this.stunOff();
        break;
      case 4:
        if(player.potions >= 1) {
          this.usePotion();
          this.stunOff();
          this.menuItems[4].onCd();
          this.menuItems[4].setText('No Potions');
          this.index = 0;
          this.menuItems[0].select();
        } else {
          this.scene.keyEnter = true;
        }
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
    player.attackCounter += 1;
    let evasionGenerate = Math.floor(Math.random() * 100);
    player.stunCd += 1;
    if (evasionGenerate > enemy.evasion) {
      //if the enemy evasion is lower than the threshold calculate normal attack damage
      this.scene.farmzombie.anims.play('fzhurt', true)
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
      enemy.health -= player.strength;
      this.scene.enemyHP.setText(enemy.health);
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
    player.attackCounter += 1;
    player.stunCd += 1;
    this.scene.player.anims.play('pthrow', true);
    this.scene.farmzombie.anims.play('fzhurt', true);
    //calculate the throw attack damage
    enemy.health -= (player.strength / 2);
    this.scene.enemyHP.setText(enemy.health);
    console.log(`enemy health: ${enemy.health}`);
    //after the attack is finished the zombie takes its' turn
    setTimeout(() => {
      this.enemyAttack();
    }, 1000);
  };

  //stun attack = damage will equal playerstrength * 2, enemy is stunned until their next turn if they don't evade.
  stunAttack() {
    //when the function is call run the stun attack anim and generate evasion threshold
    player.attackCounter += 1;
    this.scene.player.anims.play('prunattack', true);
    this.scene.pRunAttack.restart();
    this.scene.farmzombie.anims.play('fzhurt', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    player.stunCd = 0;
    if (evasionGenerate > enemy.evasion) {
      this.scene.keyEnter = true;
      //if the enemy evasion is lower than the threshold calculate stun attack damage, and set enemyStunned = true. Put stun attack on cooldown.
      enemy.health -= (player.strength * 2);
      this.scene.enemyHP.setText(enemy.health);
      console.log(`enemy health: ${enemy.health}`);
      enemy.stunned = true;
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
    this.scene.shield.play();
    player.stunCd += 1;
    player.defend = true
    // particle emitter
    this.scene.emitterBlue.frequency = 0;
    console.log(this.scene.emitterBlue);
    this.scene.player.setTint(0xe0f5ff);
      setTimeout(() => {
      this.scene.player.clearTint();
      this.scene.emitterBlue.frequency = -1;
        }, 500);
    setTimeout(() => {
      this.enemyAttack();
    }, 1000);
  }

  usePotion() {
    if (player.potions >= 1) {
      this.scene.heal.play();
      player.stunCd += 1;
      // particle emitter
      this.scene.emitterGreen.frequency = 0;
      this.scene.player.setTint(0xdcf4e8);
        setTimeout(() => {
        this.scene.player.clearTint();
        this.scene.emitterGreen.frequency = -1;
          }, 500);
      player.health += 25;
      player.potions -= 1
      this.scene.playerHP.setText(player.health);
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
    } else {
      if (player.attackCounter >= 3) {
        this.specialAttack();
      } else {
        this.scene.farmzombie.anims.play('fzattack', true);
        if (player.attackCounter === 2) {
          setTimeout(() => {
            this.scene.emitterRed.frequency = 0;
            this.scene.farmzombie.setTint(0xebc3c1);
          }, 500);
        }
        //run enemy attack anim and generate evasion threshold
        var evasionGenerate = Math.floor(Math.random() * 100);
        if (evasionGenerate > player.evasion) {
          if (player.defend === true) {
            this.scene.player.anims.play('phurt', true);
            player.health -= (enemy.strength - (player.defense / 2));
            // enemy attack damage is reduced by player defense / 2
            //add 1 to the enemy attack counter
            player.defend = false;
            //set playerDefend = false
            this.scene.playerHP.setText(player.health);
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
            this.scene.playerHP.setText(player.health);
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
        }
      }
    }
  };

  specialAttack() {
    //if the special attack counter = 2 this attack will run instead of enemy attack
    player.attackCounter = 0;
    console.log("Pissed off zombie attack")
    this.scene.farmzombie.anims.play('fzattack', true);
        // particle emitter
        setTimeout(() => {
        this.scene.farmzombie.clearTint();
        this.scene.emitterRed.frequency = -1;
        }, 1000);
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > player.evasion) {
      if (player.defend === true) {
        //enemy attack damage is = to enemystrength * 2 reduced by player defense / 2
        this.scene.player.anims.play('phurt', true);
        player.health -= ((enemy.strength * 2) - (player.defense / 2));
        //set playerDefend = false
        player.defend = false;
        this.scene.playerHP.setText(player.health);
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
        this.scene.playerHP.setText(player.health);
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
    }
  };

}
