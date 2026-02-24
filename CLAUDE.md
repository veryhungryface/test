# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the Application

This is a zero-dependency vanilla web application. Open `index.html` directly in any modern browser — no build step, server, or npm install required.

## Architecture

Single-page **Galton Board (Bean Machine) physics simulation** with Korean-language UI. All logic lives in three files:

- **`index.html`** — Layout with a canvas element (800×600), control panel (sliders for ball count and speed), stats display, and static informational content about binomial distribution.
- **`script.js`** — Entire simulation in one ES6 class `GaltonBoard`:
  - `initializeBoard()` — Builds 12 rows of pins in triangular formation and 13 collection bins.
  - `updatePhysics()` — Per-frame gravity, circle-collision detection against pins, bounce with energy loss (`bounceForce = 0.8`, `friction = 0.95`), wall reflection, and bin collection.
  - `draw()` — Canvas 2D rendering: pins, bins, active balls with trail effect, start-point marker.
  - `setupEventListeners()` — Wires sliders, Start/Reset/Pause buttons, and keyboard shortcuts (Space = start, R = reset, P = pause).
- **`style.css`** — Purple-gradient glassmorphism theme; flexbox layout; CSS animations (fadeInDown, fadeInUp, bounce, spin); responsive breakpoint at 768 px.

State is managed entirely within the `GaltonBoard` instance (`balls[]`, `pins[]`, `bins[]`, `isRunning`, `isPaused`, `droppedCount`, `totalBalls`). The animation loop uses `requestAnimationFrame`.
