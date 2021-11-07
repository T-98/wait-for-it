//Core game file
//AUTHORS: Divyansh Khare, James Doherty

//span utility example
document.getElementById("exp-txt").innerHTML = 20;
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
if (isEmpty($("#name-card-1-1"))) {
    $("#card-1-1").css('display', 'none')
}
if (isEmpty($("#name-card-1-2"))) {
    $("#card-1-2").css('display', 'none')
}
if (isEmpty($("#name-card-1-3"))) {
    $("#card-1-3").css('display', 'none')
}
if (isEmpty($("#name-card-1-4"))) {
    $("#card-1-4").css('display', 'none')
}

//bottom-row
if (isEmpty($("#name-card-2-1"))) {
    $("#card-2-1").css('display', 'none')
}
if (isEmpty($("#name-card-2-2"))) {
    $("#card-2-2").css('display', 'none')
}
if (isEmpty($("#name-card-2-3"))) {
    $("#card-2-3").css('display', 'none')
}
if (isEmpty($("#name-card-2-4"))) {
    $("#card-2-4").css('display', 'none')
}


function isEmpty(el) {
    return !$.trim(el.html())
}







//-------------------------------------------------------------------------------------------------------
//Base Game Dynamics
//Following are core properties that the game emulates
//CREDITS: James Doherty
// randrange
function rand_range(min, max) {
    return Math.random() * (max - min) + min;
}

// important functions for the core systems of the game

// calculate monster hp
function monster_hp(difficulty_slope, monsters_defeated) {
    return Math.ciel(difficulty_slope * monsters_defeated + 40);
}

// amount of gold dropped on monster death
function gold_drop(difficulty_slope) {
    return rand_range(Math.ciel(difficulty_slope * 4) * difficulty_slope, Math.ciel(difficulty_slope * 8) * difficulty_slope);
}

// gold cost to upgrade weapon
function weapon_upgrade_price(scale) {
    return Math.ciel(scale * 100);
}
// scale value to upgrade weapon
function weapon_upgrade_scale(level) {
    return 2 ^ level / 10;
}

// Damage calculation function
function damage_calc(difficulty_slope, weapon_damage) {
    return Math.ciel(difficulty_slope * weapon_damage + 1);
}

// Weapon damage on weapon generation
function weapon_gen_damage(x, enemies_defeated) {
    return x * enemies_defeated;
}

// game object
// handles all values relevant to game
class Game {
    constructor(difficulty_slope = 0.5, inventory = {}, current_weapon = {}, monsters_defeated = 0, gold = 0) {
        this.difficulty_slope = difficulty_slope;
        this.inventory = inventory;
        this.current_weapon = current_weapon;
        this.monsters_defeated = monsters_defeated;
        this.gold = gold;
    }

    save() {
        localStorage.setItem('difficulty_slope', this.difficulty_slope);
        localStorage.setItem('inventory', this.inventory);
        localStorage.setItem('current_weapon', this.current_weapon);
        localStorage.setItem('monsters_defeated', this.monsters_defeated);
        localStorage.setItem('gold', this.gold);
    }

    load() {
        this.difficulty_slope = localStorage.getItem('difficulty_slope');
        this.inventory = localStorage.getItem('inventory');
        this.current_weapon = localStorage.getItem('current_weapon');
        this.monsters_defeated = localStorage.getItem('monsters_defeated');
        this.gold = localStorage.getItem('gold');
    }
}