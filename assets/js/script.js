//span utility example
document.getElementById("exp-txt").innerHTML = 20;
var game = document.getElementById("game");

$("#dungeon").click(function() {
    console.log("click");
    let dungeonDiv = $("<div>");
    let lvlName = $("<p>").attr('id', 'lvlname');
    $("#lvlname").text('Level');
    let lvlNameTxt = $("<span>").attr('id', 'lvltxt');

    lvlName.append(lvlNameTxt);
    dungeonDiv.append(lvlName);

    $("#game").append(dungeonDiv);
})