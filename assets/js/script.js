//Core game file
//AUTHORS: Divyansh Khare, James Doherty

//span utility example
document.getElementById("exp-txt").innerHTML = 1;
var game = document.getElementById("game");

//screen transitions on button click

$("#dungeon-btn").click(function() {
    $("#inv").css('display', 'none');
    $("#dgn").css('display', 'block');
});

$("#inventory-btn").click(function() {
    $("#dgn").css('display', 'none');
    $("#inv").css('display', 'block');
});



//trying to make items disappear if they don't exist

//something is wrong with the way i'm looping through the elements and their children so
// i'll need some time to figure this one out
//but there's certainly an elegant solution, it's in my head but i've gotta find a way to implement it

//shambolic spam method but it works for now

//top-row
var item1 = $("#card-1-1");
var item2 = $("#card-1-2");
var item3 = $("#card-1-3");
var item4 = $("#card-1-4");
var item5 = $("#card-2-1");
var item6 = $("#card-2-2");
var item7 = $("#card-2-3");
var item8 = $("#card-2-4");

var arrCards = [item1, item2, item3, item4, item5, item6, item7, item8];

// if (isEmpty($("#name-card-1-1"))) {
//     item1.css('display', 'none')
// }
// if (isEmpty($("#name-card-1-2"))) {
//     item2.css('display', 'none')
// }
// if (isEmpty($("#name-card-1-3"))) {
//     item3.css('display', 'none')
// }
// if (isEmpty($("#name-card-1-4"))) {
//     item4.css('display', 'none')
// }

// //bottom-row

// if (isEmpty($("#name-card-2-1"))) {
//     item5.css('display', 'none')
// }
// if (isEmpty($("#name-card-2-2"))) {
//     item6.css('display', 'none')
// }
// if (isEmpty($("#name-card-2-3"))) {
//     item7.css('display', 'none')
// }
// if (isEmpty($("#name-card-2-4"))) {
//     item8.css('display', 'none')
// }


function isEmpty(el) {
    return !$.trim(el.html())
}

//-------------------------------------------------------------------------------------------------------
//Base Game Dynamics
//Following are core properties that the game emulates
//CREDITS: James Doherty
// randrange
function rand_range(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// important functions for the core systems of the game

// calculate monster hp
function monster_hp(difficulty_slope, monsters_defeated) {
    return Math.ceil(difficulty_slope * monsters_defeated) + 40;
}

// amount of gold dropped on monster death
function gold_drop(difficulty_slope) {
    return rand_range(Math.ceil(difficulty_slope * 4) * difficulty_slope, Math.ceil(difficulty_slope * 8) + 1 * difficulty_slope);
}

// gold cost to upgrade weapon
function weapon_upgrade_price(scale) {
    return Math.ceil(scale * 100);
}
// scale value to upgrade weapon
function weapon_upgrade_scale(level) {
    return 2 ^ level / 10;
}

// Damage calculation function
function damage_calc(difficulty_slope, weapon_damage) {
    return Math.ceil(difficulty_slope * weapon_damage + 1);
}

// Weapon damage on weapon generation
function weapon_gen_damage(x, enemies_defeated) {
    return x * enemies_defeated;
}

// game object
// handles all values relevant to game
class Game {
    constructor(difficulty_slope = 0.5, inventory = { weapons: [] }, current_weapon = { type: "fists", damage: "1" }, monsters_defeated = 0, gold = 0) {
        this.difficulty_slope = difficulty_slope;
        this.inventory = inventory;
        this.current_weapon = current_weapon;
        this.monsters_defeated = monsters_defeated;
        this.gold = gold;
        console.log(monster_hp(this.difficulty_slope, this.monsters_defeated))
        this.rem_monster_hp = monster_hp(this.difficulty_slope, this.monsters_defeated);
    }

    save() {
        localStorage.setItem('difficulty_slope', this.difficulty_slope);
        localStorage.setItem('inventory', this.inventory);
        localStorage.setItem('current_weapon', this.current_weapon);
        localStorage.setItem('monsters_defeated', this.monsters_defeated);
        localStorage.setItem('gold', this.gold);
        localStorage.setItem('rem_monster_hp', this.rem_monster_hp);
    }

    load() {
        this.difficulty_slope = localStorage.getItem('difficulty_slope');
        this.inventory = localStorage.getItem('inventory');
        this.current_weapon = localStorage.getItem('current_weapon');
        this.monsters_defeated = localStorage.getItem('monsters_defeated');
        this.gold = localStorage.getItem('gold');
        this.rem_monster_hp = localStorage.getItem('rem_monster_hp');
    }
}

// weapon object

var axes = ['Electrode.png', 'Tiger.png'];
var swords = ['Bat.png', 'Blossom.png', 'Bluechain.png', 'Bluejay.png', 'Cyan.png'];
var daggers = ['Ice.png', 'Leaf.png', 'Pinksword.png', 'Sapphire.png', 'Winged.png'];
class Weapon {
    constructor(type, save) {
        this.type = type;
        this.damage = weapon_gen_damage(3, save.enemies_defeated);
        switch (type) {
            case 'axe':
                this.name = axes[rand_range(0, 2)];
                this.img = 'assets/images/items/items/greatax/' + this.name;
                this.weapon_speed = 2000;
                this.damage *= 2;
                break;
            case 'sword':
                this.name = swords[rand_range(0, 5)];
                this.img = 'assets/images/items/items/swords/' + this.name;
                this.weapon_speed = 1000;
                break;
            case 'dagger':
                this.name = daggers[rand_range(0, 5)];
                this.img = 'assets/images/items/items/swords/' + this.name;
                this.weapon_speed = 500;
                this.damage /= 2;
                break;
            default:
                console.log("undefined weapon type, try again buckaroo.");

        }
        // string pointing to sprite to represent the weapon
        // this.img
    }
}

function weapon_drop_chance(odds) {
    let die = rand_range(1, odds + 1);
    let weapon_types = ['sword', 'dagger', 'axe'];
    if (die === 7) {
        return new Weapon(weapon_types[rand_range(0, 3)], game_save);
    } else {
        return new Weapon(weapon_types[rand_range(0, 3)], game_save);
    }
}

// TODO LIST
// * implement weapon drops


// * implement weapon upgrades
// * implement boss battles


var game_save = null;
// checking against difficulty_slope, if that is null then don't load
// and create a new save

if (localStorage.getItem("difficulty_slope") === null) {
    game_save = new Game();
} else {
    game_save = new Game();
    game_save.load();
}
console.log(game_save.rem_monster_hp);
// this is where combat mechanics will be implemented
let max_monster_hp = monster_hp(game_save.difficulty_slope, game_save.monsters_defeated);
let wep = game_save.current_weapon;
let deadlock = false;
$("#gold").text(game_save.gold.toString());
$("#monsterHP").text(game_save.rem_monster_hp + "/" + max_monster_hp);
$("#dmgval").text((game_save.current_weapon.damage).toString());
$("#dps").text((game_save.current_weapon.damage).toString());
// event instatiation goes here
// death event
const death = new Event("onDeath");
const hp_change = new Event("hpChange");
const gold_change = new Event("goldChange");
const weapon_change = new Event("weaponChange");
// idgaf if this is bad tbh

document.addEventListener("goldChange", function() {
    $("#gold").text(game_save.gold.toString());
});

document.addEventListener("onDeath", function() {
    game_save.monsters_defeated += 1;
    $("#monstersSlain").text(game_save.monsters_defeated);
    let weapon_drop = weapon_drop_chance(50);
    if (weapon_drop != null) {


        /*let len = game_save.inventory.weapons.length;
        let index = 0;
        let weapon = null;

        if (game_save.inventory.weapons[0] != null)
            while (index < len - 1) {
                if (weapon === null) {
                    weapon = game_save.inventory.weapons[index + 1];
                    game_save.inventory.weapons[index + 1] = game_save.inventory.weapons[index];
                } else {
                    if (game_save.inventory.weapons[index + 1] === null) {
                        game_save.inventory.weapons[index + 1] = weapon;
                        break;
                    }
                    let temp = game_save.inventory.weapons[index + 1];
                    game_save.inventory.weapons[index + 1] = weapon[index];
                    game_save.inventory.weapons[index] = weapon;
                    weapon = temp;
                }
                ++index;

            }
        game_save.inventory.weapons[0] = weapon_drop;*/

        //remove the last element if the array length is 8

        //push to the beginning
        if (game_save) {
            game_save.inventory.weapons.unshift(weapon_drop);

            if (game_save.inventory.weapons.length > 8) {
                // remove last item in array
                game_save.inventory.weapons.pop();

                // add into the first
            }
        }
        document.dispatchEvent(weapon_change);
    }
    game_save.gold += gold_drop(game_save.difficulty_slope);
    document.dispatchEvent(gold_change);
    $("#mobImage").fadeOut(500, function() {

        game_save.rem_monster_hp = monster_hp(game_save.difficulty_slope, game_save.monsters_defeated);
        max_monster_hp = game_save.rem_monster_hp;


        $(".rpgui-progress-fill").css("width", "100%");
        $("#mobImage").show();
        $("#dmgval").text((damage_calc(game_save.difficulty_slope, game_save.current_weapon.damage).toString()));
        $("#dps").text(damage_calc(game_save.difficulty_slope, game_save.current_weapon.damage).toString());
        deadlock = false;
    });
    let monster_gifs = ['assets/images/monsters/rat.gif', 'assets/images/monsters/imp.gif', 'assets/images/monsters/mouth.gif', 'assets/images/monsters/pikmin.gif', 'assets/images/monsters/smiley.gif', 'assets/images/monsters/triangle.gif'];

    if ((game_save.monsters_defeated + 1) % 100 === 0) { // triggers the boss battle (hopefully)
        game_save.rem_monster_hp *= 3; // boss battle
        max_monster_hp *= 3
        $("#mobImage").attr("src", "assets/images/monsters/gremlin.gif");
    } else {
        $("#mobImage").attr("src", monster_gifs[rand_range(0, 6)]);
    }

    if (game_save.monsters_defeated % 100 === 0) { // on boss death (hopefully)
        game_save.difficulty_slope += 0.5;
    }
});

document.addEventListener("hpChange", function() {
    $(".rpgui-progress-fill").css("width", Math.floor(game_save.rem_monster_hp / max_monster_hp * 100).toString() + "%");
    $("#monsterHP").text(game_save.rem_monster_hp + "/" + max_monster_hp);
});


document.addEventListener("weaponChange", function() {
    let index = 0;
    while (index < game_save.inventory.weapons.length) {
        if (game_save.inventory.weapons[index] === null) break;
        let name = game_save.inventory.weapons[index].name;
        arrCards[index].css('display', 'block');
        // arrCards[index].children(".inv-btn").children(".name").innerHTML = name.substring(0, name.length - 4);


        arrCards[index].children(".inv-btn").children(".name").html(name.substring(0, name.length - 4));
        arrCards[index].children(".inv-btn").children("img").attr("src", game_save.inventory.weapons[index].img);
        arrCards[index].children(".inv-btn").children(".dmg").children('span').html(game_save.inventory.weapons[index].damage);
        arrCards[index].children(".inv-btn").children(".att").children('span').html(game_save.inventory.weapons[index].weapon_speed);
        ++index;
    }

});



$("#mobImage").click(function() {
    game_save.rem_monster_hp -= damage_calc(game_save.difficulty_slope, wep.damage);
    document.dispatchEvent(hp_change);
    check_if_dead();
});

// deal damage every x amount of seconds
setInterval(function() {
    game_save.rem_monster_hp -= damage_calc(game_save.difficulty_slope, wep.damage);
    document.dispatchEvent(hp_change);
    check_if_dead();
}, 1000); // replace 1000 with variable damage speed

function check_if_dead() {
    if (game_save.rem_monster_hp <= 0 && deadlock === false) {
        document.dispatchEvent(death);
        deadlock = true;
    }
}