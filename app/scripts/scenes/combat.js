const playerStrength = 10;
const playerDefense = 10;
const playerEvasion = 10;
let playerDefend = false;
let playerHealth = 50;
//player actions

//normal Attack = damage will equal playerstrength * 1.
function pAttack() {
    //when the function is called run the normal Attack anim and generate the evasion threshold
    player.anims.play("pAttack", true);
    var evasionGenerate = Math.floor(Math.random() * 100);

    if (evasionGenerate > enemyEvasion) {
        //if the enemy evasion is lower than the threshold calculate normal attack damage
        setTimeout(function() {
            farmzombie.anims.play("fzhurt", true);
        }, 200);
        zombietext.setText("Hit!");
        zalphaup.restart();
        zalphadown.restart();
        setTimeout(fzAttack, 1000);
        enemyHealth -= playerStrength; 
    } else {
        //if the enemy evasion is greater than the threshold they evade your attack
        farmzombie.anims.play("fzrunning", true);
        fzevade.restart();
        zalphaup.restart();
        zalphadown.restart();
        setTimeout(fzAttack, 1000);
    }
};

//throw attack = damage will equal playerstrength / 2, cannot be evaded
function throwAttack() {
    //when the function is called run the throwAttack anim
    if (enemyHealth <= 0) {
        // if the enemy has no health run the death anim
    } else {
        //calculate the throw attack damage
    }
};
//stun attack = damage will equal playerstrength /2, enemy is stunned until their next turn if they don't evade.
function stunAttack() {
    //when the function is call run the stun attack anim and generate evasion threshold

    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > enemyEvasion) {
        //if the enemy evasion is lower than the threshold calculate stun attack damage, and set enemyStunned = true. Put stun attack on cooldown.
    } else {
        //if the enemy evasion is greater than the threshold they evade your attack. Put stunAttack on cooldown.
    }
}
  // //Heavy (slow) attack = damage will equal playerstrength * 2, but zombie evasion is higher.
  // heavyAttack() {
  //   //when the function is called run the heavyAttack anim and generate a smaller evasion threshold
  //   this.scene.player.anims.play('pjump', true);
  //   this.scene.farmzombie.anims.play('fzhurt', true);
  //   var evasionGenerate = Math.floor(Math.random() * 50);
  //   if (evasionGenerate > enemyEvasion) {
  //     //if the enemy evasion is lower than the threshold calculate heavy attack damage.
  //     enemyHealth -= (playerStrength * 2);
  //     console.log(`enemy health: ${enemyHealth}`);
  //     setTimeout(() => {
  //       this.enemyAttack();
  //     }, 1000);
  //   } else {
  //     //if the enemy evasion is greater than the threshold they evade your attack.
  //     this.scene.farmzombie.anims.play('fzrunning', true);
  //     this.scene.fzEvade.restart();
  //     setTimeout(() => {
  //       this.enemyAttack();
  //     }, 1000);
  //   }
  // }
//Defend = reduce damage taken by playerDefense / 2.
function defend() {
    //set playerDefend = true
}

const enemyStrength = 10;
const enemyDefense = 10;
const enemyEvasion = 10;
let attackCounter = 0;
let enemyHealth = 50;

//zombie enemy actions

// normal attack = damage will equal enemystrength * 1.
function enemyAttack() {
    if (enemyHealth <= 0) {
        //if the zombie has no health run death anim
    } else if (attackCounter === 2) {
        specialAttack();
    } else {
        //run enemy attack anim and generate evasion threshold
        var evasionGenerate = Math.floor(Math.random() * 100);
        if (evasionGenerate > playerEvasion) {
            if (playerDefend === true) {
                // enemy attack damage is reduced by player defense / 2
                //add 1 to the enemy attack counter
                //set playerDefend = false
            } else {
                //calculate full enemy attack damage
                //add 1 to the enemy attack counter
            }
        } else {
            // if the playerevasion is greater than the threshold the player evades the attack
            //add 1 to the enemy attack counter
        }
    }
}
// special attack (every third attack) = damage will equal enemystrength * 2
function specialAttack() {
    //if the special attack counter = 2 this attack will run instead of enemy attack
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > playerEvasion) {
        if (playerDefend === true) {
            //enemy attack damage is = to enemystrength * 2 reduced by player defense / 2
            //set attackCounter = 0
            //set playerDefend = false
        } else {
            //enemy attack damage is = to enemystrength * 2
            //set attack counter = 0
        }
    } else {
        // if the player evasion is greater than the generated threshold the player evades the attack
        // set attack counter = 0
    }
}

//Red mask enemy

  maskAttack() {
    if (enemy.health <= 0) {
      setTimeout(() => {
        // this.scene.farmzombie.anims.play('fzdying', true)
      }, 200);
    } else if (enemy.attackCounter === 3 || enemy.attackCounter === 6) {
        this.specialAttack();
    } else if (enemy.attackCounter === 8) {
        this.maskHeartAttack();
    } else {
    //   this.scene.farmzombie.anims.play('fzattack', true)
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

  maskSpecialAttack() {
    //if the special attack counter = 2 this attack will run instead of enemy attack
    console.log("Mask Special")
    // this.scene.farmzombie.anims.play('fzattack', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > player.evasion) {
      if (player.defend === true) {
        //if the player is defending the attack won't land.
        this.scene.player.anims.play('phurt', true);
        enemy.attackCounter ++;
        //set playerDefend = false
        player.defend = false;
      } else {
        //enemy attack damage is = to enemystrength and 
        this.scene.player.anims.play('phurt', true);
        player.health -= enemy.strength;
        enemy.health += enemyStrength;
        //set attack counter = 0
        enemy.attackCounter ++;
        console.log(player.health);
        console.log(enemy.health)
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
      enemy.attackCounter ++;
    }
  };

  maskHeartAttack() {
      console.log('Heart Attack')
      //masked man hurt anim
      enemy.health = 0;
      //masked man death anim after a short timeout
  }

  //Lord of Bones actions

  lobAttack() {
    if (enemy.health <= 0) {
      setTimeout(() => {
        // this.scene.farmzombie.anims.play('fzdying', true)
      }, 200);
    } else if (enemy.attackCounter === 3 || enemy.attackCounter === 6) {
        this.lobSpecialAttack();
    } else if (enemy.attackCounter === 10) {
        this.lobUltimateAttack();
    } else {
    //   this.scene.farmzombie.anims.play('fzattack', true)
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

  lobSpecialAttack() {
    //if the special attack counter = 2 this attack will run instead of enemy attack
    console.log("Lob Special")
    // this.scene.farmzombie.anims.play('fzattack', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > player.evasion) {
      if (player.defend === true) {
        this.scene.player.anims.play('phurt', true);
        //if defending the damage is reduced by half of the players defense stat
        player.health -= ((enemy.strength * 2) - (player.defense / 2))
        //set playerDefend = false
        player.defend = false;
        enemy.attackCounter ++;
      } else {
        //enemy attack damage is = to enemystrength and 
        this.scene.player.anims.play('phurt', true);
        player.health -= (enemy.strength * 2);
        console.log(player.health);
        enemy.attackCounter ++;
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
      enemy.attackCounter ++;
    }
  };

  lobUltimateAttack() {
    //if the special attack counter = 2 this attack will run instead of enemy attack
    console.log("LOB Ult")
    // this.scene.farmzombie.anims.play('fzattack', true);
    var evasionGenerate = Math.floor(Math.random() * 100);
    if (evasionGenerate > player.evasion) {
      if (player.defend === true) {
        //if the player is defending the damage will be reduced and the player won't be stunned
        player.health -= ((enemy.strength * 3) - (player.defense / 2)) 
        this.scene.player.anims.play('phurt', true);
        enemy.attackCounter = 0;
        //set playerDefend = false
        player.defend = false;
      } else {
        //enemy attack damage is = to enemystrength and 
        this.scene.player.anims.play('phurt', true);
        player.health -= (enemy.strength * 3);
        player.stunned = true;
        //set attack counter = 0
        enemy.attackCounter = 0;
        console.log(player.health);
        //gray out menu to signify stun status
        setTimeout (() => {
            this.lobAttack();
        }, 1000)
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
