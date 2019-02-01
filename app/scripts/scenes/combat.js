var playerStrength = 10;
var playerDefense = 10;
var playerEvasion = 10;
var playerDefend = false;

//player moves

//normal Attack = damage will equal playerstrength * 1.
function pAttack() {
    //when the function is called run the normal Attack anim and generate the evasion threshold
    var evasionGenerate = Math.floor(Math.random() * 100);

    if (enemyHealth <= 0) {
        //if the enemy has no health run death anim
    } else if (evasionGenerate > enemyEvasion) {
        //if the enemy evasion is lower than the threshold calculate normal attack damage 
    } else {
        //if the enemy evasion is greater than the threshold they evade your attack
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
    if (enemyhealth <= 0) {
        //if the enemy has no health run death anim
    } else if (evasionGenerate > enemyEvasion) {
        //if the enemy evasion is lower than the threshold calculate stun attack damage, and set enemyStunned = true. Put stun attack on cooldown.
    } else {
        //if the enemy evasion is greater than the threshold they evade your attack. Put stunAttack on cooldown.
    }
}
//Heavy (slow) attack = damage will equal playerstrength * 2, but zombie evasion is higher.
function heavyAttack() {
    //when the function is called run the heavyAttack anim and generate a smaller evasion threshold

    var evasionGenerate = Math.floor(Math.random() * 50);
    if (enemyhealth <= 0) {
        //if the enemy has no health run death anim
    } else if (evasionGenerate > enemyEvasion) {
        //if the enemy evasion is lower than the threshold calculate heavy attack damage.
    } else {
        //if the enemy evasion is greater than the threshold they evade your attack.
    }
}
//Defend = reduce damage taken by playerDefense / 2.
function defend() {
    //set playerDefend = true
}

var enemyStrength = 10;
var enemyDefense = 10;
var enemyEvasion = 10;
var attackCounter = 0;

//enemy moves

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
        } else {
            //enemy attack damage is = to enemystrength * 2
            //set attack counter = 0
        }
    } else {
        // if the player evasion is greater than the generated threshold the player evades the attack
        // set attack counter = 0
    }
} 

this.actionsMenu.defaultSelect();
defaultSelect: function() {
  this.menuItems[0].select();
},