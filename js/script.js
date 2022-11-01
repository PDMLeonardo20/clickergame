//principais funções do jogo
var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.005,




    addToScore: function(amount) {
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    },
    getScorePerSecond: function() {
        var scorePerSecond = 0;
        for (i = 0; i < building.name.length; i++) {
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond;
    },
};

//adiciona construções
var building = {

    name: [
        "Cursor",
        "Grandma",
        "Cocoa Farm",
        "Factory",
        "Mine",
        "Chemistry Lab",
        "Ships"
    ],
    image: [
        "cursor.jpg",
        "grandma.jpg",
        "cocoa.png",
        "factory.jpeg",
        "mine.png",
        "chemistrylab.jpg",
        "ship.png"
    ],
    count: [
        0, 0, 0, 0, 0, 0, 0
    ],
    income: [
        0.1,
        1,
        8,
        44,
        164,
        389,
        1444
    ],
    cost: [
        15,
        100,
        1100,
        5200,
        11000,
        32400,
        113400
    ],

    purchase: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
        }
    }
};

//upgrades

var upgrade = {

    name: [
        "Plastic Fingers",
        "Plastic Mouse",
        "Reiforced Fingers",
        "Reiforced Mouse",
        "Iron Rollers",
        "Sloppy Kisses",
        "Better Watering Cans",
        "Titanium Mouse",
        "1st Grade Coals",
        "Netherite Pickaxes",
        "Better Beckers",
        "Hundred Fingers",
        "Thousand Fingers",
        "More Ships"



    ],
    description: [
        "Cursors are now twice as efficient",
        "Clicking is twice as efficient",
        "Cursors are now twice as efficient",
        "Clicking is twice as efficient",
        "Cursors are now twice as efficient",
        "Grandmas are twice as efficient",
        "Farms are twice as efficient",
        "Clicking is twice as efficient",
        "Factories are twice as efficient",
        "Mines are twice as efficient",
        "Chemistry Labs are twice as efficient",
        "Cursors are now four times efficient",
        "Cursors are now four times efficient",
        "Ships are twice as efficient"



    ],
    image: [
        "stonecursor.png",
        "plasticmouse.png",
        "reiforcedcursor.png",
        "reiforcedmouse.png",
        "ironrollers.png",
        "sloppykisses.png",
        "wateringcan.png",
        "titanuimmouse.png",
        "coal.png",
        "netheritepickaxe.png",
        "chemistrylab.png",
        "hundredfingers.png",
        "thousandfingers.png",
        "moreships.png",

    ],
    type: [
        "building", //cursor
        "click", //click
        "building", //cursor
        "click", //click
        "building", //vovós
        "building", //vovós
        "building", //fazendas
        "click", //click
        "building", //fábrica
        "building", //minas
        "building", //cursor
        "building", //cursor
        "building", //navios


    ],
    cost: [
        500,
        1000,
        2500,
        3000,
        2000,
        4000,
        10000,
        50000,
        40000,
        75000,
        125000,
        3000,
        4000,
        220000,

    ],
    buildingIndex: [
        0, //cursor
        -1, //click
        0, //cursor
        -1, //click
        1, //vovó
        1, //vovó
        2, //fazenda
        -1, //click
        3, //fábrica
        4, //minas
        5, //lab
        0, //cursor
        0, //cursor
        6, //navio

    ],
    requirement: [
        15,
        500,
        25,
        1000,
        5,
        15,
        5,
        10000,
        5,
        5,
        5,
        50,
        100,
        5

    ],
    bonus: [
        2, // cursor
        2, // click
        2, // cursor
        4, // click
        2, // vovó
        2, // vovó
        2, // fazenda
        8, // click
        2, // fábrica
        2, // minas
        2, // lab
        4, // cursor
        4, // cursor
        2, // navio
    ],
    purchased: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ],

    purchase: function(index) {

        if (!this.purchased[index] && game.score >= this.cost[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.score -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
                game.score -= this.cost[index];
                game.clickValue *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            }
        }
    }
};

//Atualiza a pontuação e a loja
var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = game.score.toFixed(1);
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond().toFixed(1);
        document.getElementById("version").innerHTML = 'version ' + game.version;
        document.title = game.score.toFixed(1) + " oreos - Oreo Clicker";
    },
    updateShop: function() {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase(' + i + ')"><tr><td id="image"><img src="img/' + building.image[i] + '" alt="image of an cursor"></td><td id="nameAndCost"><p>' + building.name[i] + '</p><p><span>' + building.cost[i] + '</span> oreos </p></td><td id="amount"><span>' + building.count[i] + '</span></td></tr></table>';
        }
    },
    updateUpgrades: function() {
        document.getElementById("upgradeContainer").innerHTML = "";
        for (i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img class="unselectable" src="img/' + upgrade.image[i] + '" title="' + upgrade.name[i] + ' &#10; ' + upgrade.description[i] + ' &#10 (' + upgrade.cost[i] + ' oreos)" onclick="upgrade.purchase(' + i + ')">';
                } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="img/' + upgrade.image[i] + '" title="' + upgrade.name[i] + ' &#10; ' + upgrade.description[i] + ' &#10 (' + upgrade.cost[i] + ' oreos)" onclick="upgrade.purchase(' + i + ')">';
                }
            }
        }
    }
};
//salva o jogo
function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingCost: building.cost,
        buildingIncome: building.income,
        upgradePurchased: upgrade.purchased
    };

    localStorage.setItem("gameSave", JSON.stringify(gameSave));

}
//carrega o jogo
function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.version !== "undefined") game.version = savedGame.version;
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }

        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
    }
}
//reseta o jogo
function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

document.getElementById("clicker").addEventListener("click", function() {
    game.totalClicks++;
    game.addToScore(game.clickValue);
}, false)

window.onload = function() {
    loadGame();
    display.updateScore();
    display.updateShop();
    display.updateUpgrades();

};

setInterval(function() {
    game.score += game.getScorePerSecond();
    game.totalScore += game.getScorePerSecond();
    display.updateScore();
}, 1000);

setInterval(function() {
    display.updateScore();
    display.updateUpgrades();
}, 1000);
// atalho para salvar
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);
setInterval(function() {
    saveGame();
}, 30000);