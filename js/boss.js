import { elements } from "./module.js";
import { enemies } from "./module.js";

document.addEventListener("DOMContentLoaded", function () {
  const emilNxtBtn = document.getElementById("emil-next");
  const emilDialogBox = document.querySelector("#emil-dialogbox");
  const emilDialog = document.querySelector("#emil-dialog");
  let index = 0;
  emilNxtBtn.addEventListener("click", function () {
    index++;
    newtxt();
  });
  function newtxt() {
    if (index < 1) {
      emilDialog.textContent = `din skrøpelige sak tror du kan slå meg? pathetic`;
    } else if (index < 2) {
      emilDialog.textContent = `du burde gå tilbake en modul`;
    } else if (index < 3) {
      emilDialog.textContent = `alt du har gjort hadde jeg gjort anderledes`;
    } else if (index < 4) {
      emilDialog.textContent = `du har ikke bare en skill issue du er en skill issue`;
    } else if (index < 5) {
      emilDialog.textContent = `skal du liksom slå meg?`;
    } else if (index < 6) {
      emilDialog.textContent = `du kan ikke engang CSS`;
    } else if (index < 7) {
      emilDialog.textContent = `jeg skal faile deg på alle portfolione du lager`;
    } else if (index < 8) {
      emilDialog.textContent = `ikke som om di var god fra starten av`;
    } else if (index < 9) {
      emilDialog.textContent = `*evil emil latter*`;
    } else if (index < 10) {
      emilDialog.textContent = `go ahead viss meg hva du kan`;
    } else if (index < 11) {
      emilDialog.textContent = `kansje du ikke blir kicket`;
    } else if (index < 12) {
      emilDialogBox.style.display = "none";
    }
  }

  let currentEnemy = enemies.bossEmil;
  function redoInv() {
    elements.playerDmg = document.querySelector("#player-damage");
    elements.pHel = document.querySelector("#player-health");
    elements.pHeal = document.querySelector("#player-healing");

    elements.playerDmg.textContent = `Damage: ${player.damage}`;
    elements.pHel.textContent = `Health: ${player.maxHealth}`;
    elements.pHeal.textContent = `Healing: ${player.healing}`;
  }

  const bossMusic = new Audio("./sound/Emil_Bossmusic.wav");
  // Character and enemy data
  const player = {
    name: "",
    gender: "",
    damage: 10,
    health: 100,
    maxHealth: 100,
    healing: 5,
    gold: 0,
    xp: 0,
    level: 1,
  };

  let levelUp = player.level * 10;

  // Function to reset player and enemy health
  function resetHealth(entity) {
    entity.health = entity.maxHealth;
  }

  // Update the UI with player and enemy data
  function updateUI() {
    elements.takeDamage.value = player.health;
    elements.barHealth.textContent = `${player.health}/${player.maxHealth}`;
    elements.statLevel.textContent = `LVL: ${player.level}`;
    elements.experience.textContent = `XP ${player.xp}/${levelUp}`;
    elements.goldPage.textContent = `Gold: ${player.gold}`;
    redoInv();
  }

  // Handle fight start
  function startFight() {
    elements.enemyPlace.src = currentEnemy.img;
    elements.enemyBar.max = currentEnemy.maxHealth;
    elements.enemyBar.value = currentEnemy.health;
  }

  // Handle player's attack
  function playerAttack() {
    if (currentEnemy) {
      currentEnemy.health -= player.damage;
      elements.enemyBar.value = currentEnemy.health;

      if (currentEnemy.health <= 0) {
        handleEnemyDefeat(currentEnemy);
      } else {
        handleEnemyAttack(currentEnemy);
      }
    }
  }
  startFight(enemies.bossEmil);

  function runAway() {
    location.href = "./game.html";
  }
  // Handle enemy's attack
  function handleEnemyAttack(enemy) {
    if (player.health > 0) {
      player.health -= enemy.damage;
      elements.takeDamage.value = player.health;
      updateUI();

      if (player.health <= 0) {
        location.href = "./gameover.html";
      }
    }
  }

  // Handle enemy defeat
  function handleEnemyDefeat(enemy) {
    player.gold += enemy.gold;
    player.xp += enemy.xp;
    levelUp = player.level * 10;
    resetHealth(enemy);
    currentEnemy = null;
    checkLevel();
    location.href = "./game.html";
  }

  // Check player's level and update stats
  function checkLevel() {
    while (levelUp <= player.xp) {
      player.level += 1;
      levelUp = player.level * 10;
      player.damage += 5;
      player.healing += 5;
      player.maxHealth += 10;
    }
    updateUI();
  }

  // Event listeners

  elements.escape.addEventListener("click", function () {
    runAway(currentEnemy);
  });

  elements.attack.addEventListener("click", playerAttack);
  elements.invBtn.addEventListener("click", () => {
    elements.inventory.style.display = "flex";
    elements.invBtn.style.display = "none";
  });
  elements.closeBtn.addEventListener("click", () => {
    elements.inventory.style.display = "none";
    elements.invBtn.style.display = "flex";
  });
  elements.healed.addEventListener("click", () => {
    player.health += player.healing;
    player.health -= currentEnemy.damage;
    if (player.health <= 0) {
      location.href = "./gameover.html";
    }
    updateUI();
  });
  elements.godMode.addEventListener("click", () => {
    player.health = 10000000000000;
    player.maxHealth = 10000000000000;
    updateUI();
  });
  elements.instantKill.addEventListener("click", () => {
    player.damage = 10000000000000;
    updateUI();
  });
});
