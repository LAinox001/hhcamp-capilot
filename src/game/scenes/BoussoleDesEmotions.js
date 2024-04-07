import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { config } from '../main.js'

export class BoussoleDesEmotions extends Scene {

    constructor() {
        super('BoussoleDesEmotions')
    }
    
    Xoffset = 70;
    Yoffset = 50;
    
    emotions = [
        {
            emoji: "😁",
            value: "heureux",
            position: {
                x: config.width/2 - this.Xoffset,
                y: 0,
                valueOffset: 1
            }
        },
        {
            emoji: "😢",
            value: "triste",
            position: {
                x: config.width/2 - this.Xoffset,
                y: config.height - 100,
                valueOffset: 1
            }
        },
        {
            emoji: "😡",
            value: "en colère",
            position: {
                x: 50,
                y: config.height/2 - this.Yoffset,
                valueOffset: 1
            }
        },
        {
            emoji: "🫣",
            value: "coupable",
            position: {
                x: config.width - 180,
                y: config.height/2 - this.Yoffset,
                valueOffset: -1
            }
        },
        {
            emoji: "😨",
            value: "appeuré",
            position: {
                x: 250,
                y: 150,
                valueOffset: 1
            }
        },
        {
            emoji: "😤",
            value: "frustré",
            position: {
                x: 650,
                y: 150,
                valueOffset: 1
            }
        },
        {
            emoji: "😌",
            value: "serein",
            position: {
                x: 250,
                y: 520,
                valueOffset: 1
            }
        },
        {
            emoji: "😯",
            value: "surpris",
            position: {
                x: 650,
                y: 520,
                valueOffset: 1
            }
        }
    ]

    create() {
        const bg = this.add.image(-20, 0, "roue-des-emotions").setOrigin(0)
        bg.setScale(config.width / bg.width, config.height / bg.height);
        
        for (const emotion of this.emotions) {
            let emojiSprite = this.add.text(emotion.position.x, emotion.position.y, emotion.emoji, {
                testString: "😁",
                fontSize: 100
            });

            this.add.text(emotion.position.x + 100*emotion.position.valueOffset, emotion.position.y, emotion.value, {
                fontSize: 20
            });

            emojiSprite.setInteractive();

            // Add a pointerdown event listener to the sprite
            emojiSprite.on('pointerdown', function() {
                let compassEmotions = JSON.parse(localStorage.getItem("compassEmotions")) || [];
                let lastEmotionDate = new Date();
                lastEmotionDate.setDate(new Date().getDate() - 1);
                if (compassEmotions.length > 0) {
                    lastEmotionDate = new Date(compassEmotions[compassEmotions.length - 1].date);
                }
                const emotionDate = new Date(lastEmotionDate);
                emotionDate.setDate(lastEmotionDate.getDate() + 1);
                compassEmotions.push({
                    value: emotion.value,
                    emoji: emotion.emoji,
                    date: emotionDate
                })
                localStorage.setItem("compassEmotions", JSON.stringify(compassEmotions))
                EventBus.emit('show-journal-boussole')
            });

            const confirmationText = this.add.text(512, 384, 'Boussole trouvée !', {
                fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center',
            }).setOrigin(0.5).setDepth(100);
            
            setTimeout(() => {
                confirmationText.destroy();
            }, 1500);
        }

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('MainMenu')
    }
}