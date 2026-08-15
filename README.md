<div align="center">

# 🛸 NEON SPACE RUNNER 🛸
### *Space Alien Edition*

![HTML5](https://img.shields.io/badge/HTML5-05050f?style=for-the-badge&logo=html5&logoColor=00ffff&labelColor=05050f)
![CSS3](https://img.shields.io/badge/CSS3_+_Tailwind-05050f?style=for-the-badge&logo=tailwindcss&logoColor=ff00ff&labelColor=05050f)
![JavaScript](https://img.shields.io/badge/JavaScript-05050f?style=for-the-badge&logo=javascript&logoColor=ffeb3b&labelColor=05050f)
![Web Audio API](https://img.shields.io/badge/Web_Audio_API-05050f?style=for-the-badge&logo=webaudioapi&logoColor=00ffff&labelColor=05050f)

<br>

**A neon-drenched endless runner — dodge magenta obstacles, grab glowing stars, and outrun an ever-accelerating synthwave grid.**

<br>

<a href="https://arshiya7-dev.github.io/neon-space-runner/">
  <img src="https://img.shields.io/badge/%E2%96%B6%20PLAY%20LIVE%20DEMO-050510?style=for-the-badge&logo=rocket&logoColor=00ffff&labelColor=050510&color=050510" alt="Live Demo" height="60"/>
</a>

<br><br>

</div>

---

## 🌌 About the Game

**Neon Space Runner** is a browser-based endless runner built with vanilla **JavaScript**, styled entirely with **Tailwind CSS v4**, and brought to life with a custom **Web Audio API** sound engine — no audio files, every sound effect is synthesized in real time with oscillators.

Your alien astronaut runs across an infinite synthwave grid. Jump over glowing magenta obstacles, collect floating cyan-yellow stars, and survive as the game speeds up every 30 seconds. Simple to play, hard to master.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🕹️ | **One-Button Gameplay** | `Space bar` or a simple click/tap — that's the whole control scheme |
| 💫 | **Procedural Obstacles & Stars** | Randomized size, spacing, and height so no two runs feel alike |
| 🔊 | **Synthesized Audio** | Jump, collect, speed-up, and death sounds generated live via `AudioContext` oscillators |
| ⚡ | **Dynamic Difficulty** | Game speed ramps up every 30s, with a bold **"SPEED UP!"** flash animation |
| 🏆 | **Persistent High Score** | Best score saved locally via `localStorage` — beat your own record |
| 💥 | **Particle Explosion** | A 20-particle neon burst animates on death using the native Web Animations API |
| 📱 | **Fully Responsive** | Playable on desktop and mobile, built with Tailwind's utility-first workflow |
| 🎨 | **Custom SVG Character** | A hand-crafted alien sprite with a walking-leg animation loop |

---

## 🎮 How to Play

```
  ⬜ Press SPACE (or click / tap the screen) to JUMP
  ⬜ Dodge the glowing magenta obstacles
  ⬜ Collect ⭐ stars for +50 points each
  ⬜ Survive as the grid gets faster every 30 seconds
  ⬜ Try to beat your BEST score!
```

---

## 🛠️ Tech Stack

- **HTML5** — semantic game structure
- **Tailwind CSS v4** (`@theme`, `@layer`, custom keyframes) — every neon glow, grid animation, and UI element
- **Remix Icon** — the ⭐ star icon used for collectibles
- **Vanilla JavaScript** — game loop via `requestAnimationFrame`, physics, spawning systems, and collision detection
- **Web Audio API** — real-time oscillator-based sound effects (no external audio assets)
- **Google Fonts (Orbitron)** — the retro-futuristic typeface tying the whole aesthetic together

---

## 📁 Project Structure

```
neon-space-runner/
├── index.html
└── asset/
    ├── stylesheet/
    │   ├── main.css      # Tailwind source (@theme, @layer)
    │   └── output.css    # Compiled Tailwind CSS
    └── javascript/
        └── script.js     # Game engine & logic
```

---

## 🚀 Running Locally

```bash
git clone https://github.com/arshiya7-dev/neon-space-runner.git
cd neon-space-runner

# rebuild Tailwind if you edit main.css
npx @tailwindcss/cli -i ./asset/stylesheet/main.css -o ./asset/stylesheet/output.css --watch

# then just open index.html in your browser
```

---

<div align="center">

### 💜 Built with neon dreams and a lot of `box-shadow` 💙

<a href="https://arshiya7-dev.github.io/neon-space-runner/">
  <img src="https://img.shields.io/badge/%F0%9F%9A%80%20TRY%20IT%20NOW-8000ff?style=for-the-badge&logoColor=white" alt="Try it now"/>
</a>

</div>
