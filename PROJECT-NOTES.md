> Original project notes. Sites-specific hosting references below are historical; this migration deploys dist/ with GitHub Actions.

# HELLCAT: Nine Lives, Zero Mercy

Original browser FPS inspired by 1990s corridor shooters. Three sectors, a final boss, three weapons, secret catnip rooms, pickups, scoring, difficulty choices, sound, pause, death/retry and campaign completion. No original DOOM assets, maps, music, or source are included.

Serve dist through HTTP(S). No build, install, CDN or runtime dependencies are required.

Controls: WASD move, arrow keys turn, mouse look (pointer lock with drag fallback), Space or left mouse fires, 1/2/3 selects weapons, E interacts, Shift moves faster, M tactical map, P or Escape pauses. Touch devices show movement, look, fire, use and weapon controls. Pointer lock/fullscreen availability depends on the browser.

Simulation: fixed bounded steps, circular wall collision, DDA rays for shooting and visibility, grid-distance enemy navigation, hostile projectiles, area damage yarn rounds, checkpoint rollback on retry. State stays in memory; reloading starts a new campaign.

Validation: node test-game.mjs checks connected layouts, pickups, walls, shot cooldown, hit detection, key and boss gates, death/restart, and complete simulated campaigns on easy and normal.
Browser playthrough completed all 3 sectors and boss via normal movement/fire/use controls: victory score 7350. Also exercised initial start, intermission, pause, death/retry, secret room, weapon pickups, invalid structured inputs, and mobile layout. Browser console had no errors. Pointer-lock fallback was exercised in the in-app browser; touch controls have not been tested on physical hardware.

Art: original cover generated for this project; original canvas-rendered pixel sprites, textures, and synthetic audio. Single-player local game; no account progress sync.
