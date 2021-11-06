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
function weapon_gen_damage(, enemies_defeated) {
    return x * enemies_defeated;
}
