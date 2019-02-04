import MenuItem from './menu-item';

var playerStrength = 10;
var playerDefense = 10;
var playerEvasion = 10;
var playerDefend = false;
var playerHealth = 100;
var potions = 1;
var enemyStrength = 10;
var enemyEvasion = 10;
var attackCounter = 0;
var enemyHealth = 100;

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
    this.addMenuItem('Boomerang Attack');
    this.addMenuItem('Heavy Attack');
    this.addMenuItem('Stun Attack');
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

  defaultSelect() {
    this.menuItems[0].select();
  }

  confirm() {
    switch (this.index) {
      case 0:
        console.log('Attack');
        this.pAttack();
        break;
      case 1:
        console.log('Throw');
        this.throwAttack();
        break;
      case 2:
        this.heavyAttack();
        console.log('Heavy');
        break;
      case 3:
        this.stunAttack();
        console.log('Stun')
        break;
      case 4:
        this.defend();
        console.log('defend');
        break;
      case 5:
        this.usePotion();
        console.log('potion');
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
    if (evasionGenerate > enemyEvasion) {
      //if the enemy evasion is lower than the threshold calculate normal attack damage
      this.scene.farmzombie.anims.play('fzhurt', true)
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
      enemyHealth -= playerStrength;
      console.log(`enemy health: ${enemyHealth}`);
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
    this.scene.player.anims.play('pattack', true);
    this.scene.farmzombie.anims.play('fzhurt', true);
    //calculate the throw attack damage
    enemyHealth -= (playerStrength / 2);
    console.log(`enemy health: ${enemyHealth}`);
    //after the attack is finished the zombie takes its' turn
    setTimeout(() => {
      this.enemyAttack();
    }, 1000);
  };
  //stun attack = damage will equal playerstrength /2, enemy is stunned until their next turn if they don't evade.
  stunAttack() {
    //when the function is call run the stun attack anim and generate evasion threshold
    this.scene.player.anims.play('pattack', true);
    this.scene.farmzombie.anims.play('fzhurt', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > enemyEvasion) {
      //if the enemy evasion is lower than the threshold calculate stun attack damage, and set enemyStunned = true. Put stun attack on cooldown.
      enemyHealth -= (playerStrength / 2);
      console.log(`enemy health: ${enemyHealth}`);
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
  //Heavy (slow) attack = damage will equal playerstrength * 2, but zombie evasion is higher.
  heavyAttack() {
    //when the function is called run the heavyAttack anim and generate a smaller evasion threshold
    this.scene.player.anims.play('pattack', true);
    this.scene.farmzombie.anims.play('fzhurt', true);
    var evasionGenerate = Math.floor(Math.random() * 50);
    if (evasionGenerate > enemyEvasion) {
      //if the enemy evasion is lower than the threshold calculate heavy attack damage.
      enemyHealth -= (playerStrength * 2);
      console.log(`enemy health: ${enemyHealth}`);
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    } else {
      //if the enemy evasion is greater than the threshold they evade your attack.
      this.scene.farmzombie.anims.play('fzrunning', true);
      this.scene.fzEvade.restart();
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    }
  }
  //Defend = reduce damage taken by playerDefense / 2.
  defend() {
    this.scene.player.anims.play('phurt', true);
    playerDefend = true
    setTimeout(() => {
      this.enemyAttack();
    }, 1000);
  }

  usePotion() {
    if (potions >= 1) {
      this.scene.player.anims.play('phurt', true);
      playerHealth += 25;
      potions -= 1
      console.log(playerHealth);
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    } else {
      return false;
    }
  }

  //Enemy Actions
  enemyAttack() {
    if (enemyHealth <= 0) {
      setTimeout(() => {
        this.scene.farmzombie.anims.play('fzdying', true)
      }, 200);
    } else if (attackCounter === 3) {
      this.specialAttack();
    } else {
      this.scene.farmzombie.anims.play('fzattack', true)
      //run enemy attack anim and generate evasion threshold
      var evasionGenerate = Math.floor(Math.random() * 100);
      if (evasionGenerate > playerEvasion) {
        if (playerDefend === true) {
          this.scene.player.anims.play('phurt', true);
          playerHealth -= (enemyStrength - (playerDefense / 2));
          // enemy attack damage is reduced by player defense / 2
          attackCounter++;
          //add 1 to the enemy attack counter
          playerDefend = false;
          //set playerDefend = false
          console.log(playerHealth);
          if (playerHealth <= 0) {
            setTimeout(() => {
              this.scene.player.anims.play('pdying', true)
            }, 100);
          }
        } else {
          this.scene.player.anims.play('phurt', true);
          //calculate full enemy attack damage
          playerHealth -= enemyStrength;
          //add 1 to the enemy attack counter
          attackCounter++;
          console.log(playerHealth);
          if (playerHealth <= 0) {
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
        attackCounter++;
      }
    }
  };

  specialAttack() {
    //if the special attack counter = 2 this attack will run instead of enemy attack
    console.log("Pissed off zombie attack")
    this.scene.farmzombie.anims.play('fzattack', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > playerEvasion) {
      if (playerDefend === true) {
        //enemy attack damage is = to enemystrength * 2 reduced by player defense / 2
        this.scene.player.anims.play('phurt', true);
        playerHealth -= ((enemyStrength * 2) - (playerDefense / 2));
        //set attackCounter = 0
        attackCounter = 0;
        //set playerDefend = false
        playerDefend = false;
        console.log(playerHealth);
        if (playerHealth <= 0) {
          setTimeout(() => {
            this.scene.player.anims.play('pdying', true)
          }, 100);
        } 
      } else {
        //enemy attack damage is = to enemystrength * 2
        this.scene.player.anims.play('phurt', true);
        playerHealth -= (enemyStrength * 2);
        //set attack counter = 0
        attackCounter = 0;
        console.log(playerHealth);
        if (playerHealth <= 0) {
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
      attackCounter = 0;
    }
  };

}
