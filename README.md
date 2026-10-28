# NEON ARENA

## Pelin idea
Arcade-henkinen selviytymispeli. Pelaaja liikkuu areenalla nuolinäppäimillä ja ampuu automaattisesti lähintä vihollista kohti.
Viholliset tulevat reunoilta ja vaikeutuvat tasoittain. Kerää vihreitä neliöitä ja kerää pisteitä.

## Käytetyt teknologiat
JavaScript (ES6-moduulit), React 19, Vite, npm, Git/GitHub, Web Audio API, Local Storage.

## Käytetty JavaScript-kirjasto
**Phaser 4** – pelimoottori: pelisilmukka, Arcade Physics -törmäykset, tweenit (animaatiot), ajastimet, skaalaus (FIT).

## Asennus
```bash
npm install
```

## Käynnistys
```bash
npm run dev      
npm run build    
```

## Peliohje
| Toiminto | Näppäin |
|---|---|
| Liiku | Nuolet / WASD |
| Aloita / uudelleen | Enter / Välilyönti |
| Valikkoon | Esc (game over -ruudussa) |
| Koko näyttö | F |

Ammunta on automaattista. Pelin voi hävitä, kun kaikki 5 elämää on menetetty.


## Rakenne
```
src/
  components/  Button, Hud, GameCanvas
  pages/       MenuPage, GamePage, GameOverPage
  hooks/       useKeyPress, useHighScore, useFullscreen
  game/        config, events, scenes/GameScene, entities/{Player,Enemy,Bullet,Pickup}
  utils/       sound, storage, format
```
