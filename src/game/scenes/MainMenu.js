import { EventBus } from '../EventBus'
import { Scene } from 'phaser'
import { config } from '../main.js'

export class MainMenu extends Scene {
    logoTween

    constructor() {
        super('MainMenu')
    }

    create() {
        let splashScreen = this.add.image(0, 0, 'splash-screen').setOrigin(0);
        splashScreen.setScale(config.width / splashScreen.width, config.height / splashScreen.height);

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop()
            this.logoTween = null
        }

        this.scene.start('Game')
    }

    moveLogo(vueCallback) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause()
            } else {
                this.logoTween.play()
            }
        } else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    vueCallback({
                        x: Math.floor(this.logo.x),
                        y: Math.floor(this.logo.y)
                    })
                }
            })
        }
    }
}
