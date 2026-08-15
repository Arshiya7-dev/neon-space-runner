const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const scoreEl = document.getElementById('score');
const starsEl = document.getElementById('stars');
const highScoreEl = document.getElementById('highScore');
const finalScoreEl = document.getElementById('finalScore');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const gridLines = document.querySelector('.grid-lines');
const speedUpText = document.getElementById('speedUpText');
const newRecordText = document.getElementById('newRecordText');

// game state variables//
let isGameRunning = false;
let score = 0;
let starsCollected = 0;
let gameSpeed = 8;
let obstacles = [];
let coins = [];
// game state variables//

// player physics//
let playerY = 0;
let velocityY = 0;
const gravity = 1;
const jumpForce = -18;
let isJumping = false;
// player physics//

// highscore & timer//
let highScore = localStorage.getItem('neonRunnerHighScore') || 0;
highScoreEl.innerText = highScore; // ایراد اول اینجا بود: highScore به highScoreEl تغییر کرد
let speedIncreaseInterval;
let obstacleSpawnTimeout;
let starSpawnTimeout;
// highscore & timer//

// audio system//
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

/**
* تابع پخش صدا
* @param freq - فرکانس صدا (زیر و بم بودن)
* @param duration - مدت زمان پخش (ثانیه)
* @param type - نوع صدا (موج مربعی، سینوسی و...)
*/
function playSound(freq, duration, type = 'square') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

// jump mechanism//
function jump() {
    if (!isGameRunning || isJumping) return;

    isJumping = true;
    player.classList.add('jumping');
    velocityY = jumpForce;
    playSound(500, 0.15, 'sine');
}
// jump mechanism// 

// game loop//
function gameLoop() {
    if (!isGameRunning) return;

    // player physics component//
    if (isJumping) {
        playerY += velocityY;
        velocityY += gravity;

        // When the player reached the field//
        if (playerY >= 0) {
            playerY = 0;
            velocityY = 0;
            isJumping = false;
            player.classList.remove('jumping');
        }
        // When the player reached the field//
        player.style.transform = `translateY(${playerY}px) rotate(${velocityY * 1.2}deg)`;
    }
    // player physics component//

    //Obstacle movement section//
    obstacles.forEach((obs, index) => {
        obs.x -= gameSpeed;
        obs.element.style.left = obs.x + 'px';

        if (checkCollision(player, obs.element)) {
            handleDeath();
        }

        if (obs.x < -100) {
            obs.element.remove();
            obstacles.splice(index, 1);
        }
    });
    //Obstacle movement section//

    // Stellar motion section//
    coins.forEach((coin, index) => {
        coin.x -= gameSpeed;
        coin.element.style.left = coin.x + 'px';

        if (checkCollision(player, coin.element)) {
            score += 50;
            starsCollected++;
            starsEl.innerText = starsCollected;
            scoreEl.innerText = score; // ایراد دوم اینجا بود: starsEl به scoreEl تغییر کرد
            playSound(1000, 0.1, 'sine');
            coin.element.remove();
            coins.splice(index, 1);
        }

        if (coin.x < -50) {
            coin.element.remove();
            coins.splice(index, 1);
        }
    });
    // Stellar motion section//

    // Points section//
    score++;
    scoreEl.innerText = score;
    // Points section//

    requestAnimationFrame(gameLoop);
}
// game loop//

// Barrier production system//
function spawnObstacle() {
    if (!isGameRunning) return;

    let canSpawn = true;

    if (obstacles.length > 0) {
        let lastObstacle = obstacles[obstacles.length - 1];
        if (lastObstacle.x > window.innerWidth - 400) {
            canSpawn = false;
        }
    }

    if (canSpawn) {
        const obsEl = document.createElement('div');
        obsEl.classList.add('obstacle');
        const height = 50 + Math.random() * 100;
        const width = 40 + Math.random() * 30;
        obsEl.style.height = height + 'px';
        obsEl.style.width = width + 'px';
        obsEl.style.left = window.innerWidth + 'px';
        gameContainer.appendChild(obsEl);
        obstacles.push({ x: window.innerWidth, element: obsEl });
    }

    let checkDelay = score > 2700 ? 1000 : 1500;
    obstacleSpawnTimeout = setTimeout(spawnObstacle, checkDelay + Math.random() * 500);
}
// Barrier production system//

// spawn stars//
function spawnStar() {
    if (!isGameRunning) return;

    let canSpawn = true;
    if (coins.length > 0) {
        let lastCoin = coins[coins.length - 1];
        if (lastCoin.x > window.innerWidth - 300) {
            canSpawn = false;
        }
    }

    if (canSpawn) {
        const heightLevels = [200, 280, 350];
        const baseHeight = heightLevels[Math.floor(Math.random() * heightLevels.length)];
        const coinCount = Math.random() > 0.5 ? 1 : 3;

        for (let i = 0; i < coinCount; i++) {
            const coinEl = document.createElement('div');
            coinEl.classList.add('coin');
            coinEl.innerHTML = '<i class="ri-star-fill"></i>';
            coinEl.style.left = (window.innerWidth + (i * 40)) + 'px';
            coinEl.style.bottom = baseHeight + 'px';
            gameContainer.appendChild(coinEl);
            coins.push({ x: window.innerWidth + (i * 40), element: coinEl });
        }
    }

    let checkDelay = score > 2700 ? 1500 : 2000;
    starSpawnTimeout = setTimeout(spawnStar, checkDelay + Math.random() * 1000);
}
// spawn stars//

// Collision detection//
function checkCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    const padding = 10;

    return rect1.left + padding < rect2.right - padding &&
        rect1.right - padding > rect2.left + padding &&
        rect1.top + padding < rect2.bottom - padding &&
        rect1.bottom - padding > rect2.top + padding;
}
// Collision detection//

// Death handler//
function handleDeath() {
    isGameRunning = false;
    clearTimeout(obstacleSpawnTimeout);
    clearTimeout(starSpawnTimeout);
    clearInterval(speedIncreaseInterval);

    playSound(100, 0.2, 'sawtooth');
    setTimeout(() => playSound(60, 0.5, 'sawtooth'), 100);

    player.style.opacity = '0';

    const playerRect = player.getBoundingClientRect();
    const centerX = playerRect.left + playerRect.width / 2;
    const centerY = playerRect.top + playerRect.height / 2;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('explosion-particle');
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';

        const colors = ['#ff00ff', '#00ffff', '#ffeb3b'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 15px ${particle.style.background}`;

        gameContainer.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 150;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    setTimeout(() => {
        finalScoreEl.innerText = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('neonRunnerHighScore', highScore);
            highScoreEl.innerText = highScore;
            newRecordText.style.display = 'block';
        } else {
            newRecordText.style.display = 'none';
        }
        gameOverScreen.classList.remove('hidden');
    }, 1000);
}
// Death handler//

// Difficulty scaling//
function startSpeedIncrease() {
    speedIncreaseInterval = setInterval(() => {
        if (!isGameRunning) return;

        gameSpeed += 2.5;
        gridLines.style.animationDuration = Math.max(0.2, 1 - (gameSpeed * 0.06)) + 's';

        speedUpText.classList.remove('show');
        void speedUpText.offsetWidth;
        speedUpText.classList.add('show');

        playSound(800, 0.1, 'sine');
        setTimeout(() => playSound(1000, 0.1, 'sine'), 150);
    }, 30000);
}
// Difficulty scaling//

// Start & Restart//
function startGame() {
    clearTimeout(obstacleSpawnTimeout);
    clearTimeout(starSpawnTimeout);
    clearInterval(speedIncreaseInterval);

    obstacles.forEach(o => o.element.remove());
    coins.forEach(c => c.element.remove());
    obstacles = [];
    coins = [];

    score = 0;
    starsCollected = 0;
    starsEl.innerText = 0;

    gameSpeed = 8;
    playerY = 0;
    velocityY = 0;
    isJumping = false;

    player.style.transform = 'translateY(0px) rotate(0deg)';
    player.style.opacity = '1';
    player.classList.remove('jumping');
    scoreEl.innerText = score;
    gridLines.style.animationDuration = '1s';

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    isGameRunning = true;

    requestAnimationFrame(gameLoop);

    obstacleSpawnTimeout = setTimeout(spawnObstacle, 2000);
    starSpawnTimeout = setTimeout(spawnStar, 3500);

    startSpeedIncrease();
}
// Start & Restart//

// Event listeners//
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.keyCode === 32) {
        e.preventDefault();
        if (isGameRunning) jump();
    }
});

gameContainer.addEventListener('click', () => {
    if (isGameRunning) jump();
});
// Event listeners//