import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class Dialog extends Scene {
    constructor() {
        super('Dialog')
    }

    init({ sprite, message, next }) {
      this.dialogSprite = sprite;
      this.dialogMessage = message;
      this.dialogNext = next;
    }

    create() {
        this.cameras.main.setBackgroundColor(0xff0000);
        this.add.image(512, 384, 'background').setAlpha(0.5);
        //this.add.image(200, 450, 'stickman');
        this.add.image(200, 450, this.dialogSprite);

        this.add.rectangle(350, 50, 620, 520, 0xdddddd).setOrigin(0, 0);
        this.message = this.add.text(360, 60, '', {
          fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 4,
          align: 'left'
      }).setOrigin(0, 0);
      this.typewriteText(this.dialogMessage);

      if (this.dialogNext){
        const nextButton = this.add.group();
        /*const handlePointerDown = (...args) => {
          console.log('button click', args);
        };*/
        nextButton.add(
          this.add.rectangle(840, 600, 130, 40, 0xdddddd)
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerdown', this.dialogNext)
        );
        nextButton.add(
          this.add.text(850, 600, 'Suivant', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'left'
          })
            .setInteractive()
            .on('pointerdown', this.dialogNext)
        );
      }
      //nextButton.setInteractive();


      EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        //this.scene.start('MainMenu')
    }
    typewriteText(text){
      const length = text.length
      let i = 0
      this.time.addEvent({
        callback: () => {
          this.message.text += text[i]
          ++i
        },
        repeat: length - 1,
        delay: 25
      })
    }
}
