//span utility example
document.getElementById("exp-txt").innerHTML = 20;
var game = document.getElementById("game");

$("#dungeon").click(function() {

})

// why doesn't javascript have this already...
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
    return rand_range(Math.ciel(difficulty_slope*4) * difficulty_slope, Math.ciel(difficulty_slope*8) * difficulty_slope);
}

// gold cost to upgrade weapon
function weapon_upgrade_price(scale) {
    return Math.ciel(scale * 100);
}
// scale value to upgrade weapon
function weapon_upgrade_scale(level) {
    return 2 ^ level/10;
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

