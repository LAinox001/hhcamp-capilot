import { EventBus } from '../EventBus'
import { Scene } from 'phaser'




export class Map extends Scene {
    constructor() {
        super('Map');
        /*this.interestPoints = [
          {
            key: 'empty',
            x: 530,
            y: 550,
            cb: (...args) => console.log('coffre trouvé', args)
          },
          {
            key: 'empty',
            x: 745,
            y: 275,
            cb: (...args) => console.log('boussole trouvé', args)
          }
        ];*/
    }

    init({ playerImage, playerX, playerY, islandImage, interestPoints }) {
      this.playerImage = playerImage;
      this.playerX = playerX;
      this.playerY = playerY;
      this.islandImage = islandImage;
      this.interestPoints = interestPoints;
    }

    create() {
        console.log('scene: Map', this.physics);

        this.cameras.main.setBackgroundColor(0x00ff00);
        //this.add.image(512, 384, 'background').setAlpha(0.5);
        this.add.image(0, 0, this.islandImage).setOrigin(0); //.setAlpha(0.5);

        this.cursors = this.input.keyboard.createCursorKeys();
        /*
        EventBus.emit('current-scene-ready', this)*/
        // this.input.keyboard.on('keydown', this.handleKeyboardInput.bind(this), /*context*/);

        this.input.on('pointerdown', this.handleMouseClick.bind(this));
        
        this.interactGroup = this.physics.add.staticGroup();
        this.interestPoints.forEach(({ x, y, key, cb }) => {
          const interestSprite = this.interactGroup.create(x, y, key);
          interestSprite.cb = cb;
        });

        this.player = this.physics.add.sprite(this.playerX, this.playerY, this.playerImage);
        this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(false);

        this.physics.add.collider(this.player, this.interactGroup, (player, sprite) => {
          
          this.lastCollided = sprite;
          player.setVelocityX(0);
          player.setVelocityY(0);
          sprite.cb();
        }, /* processCallback */ (player, sprite) => {
          return sprite !== this.lastCollided;
        });

    }

    changeScene() {listener
        //this.scene.start('Game')
    }
    update() {
      /*if (this.cursors.left.isDown)
      {
        this.player.setVelocityX(-160);
        //this.player.anims.play('left', true);
      }
      else if (this.cursors.right.isDown)
      {
        this.player.setVelocityX(160);
        //this.player.anims.play('right', true);
      }
      else if (this.cursors.up.isDown)
      {
        this.player.setVelocityY(-160);
        //this.player.anims.play('right', true);
      }
      else if (this.cursors.down.isDown)
      {
        this.player.setVelocityY(160);
        //this.player.anims.play('right', true);
      }*/
      /*else
      {
        this.player.setVelocityY(0);
        this.player.setVelocityX(0);
        //this.player.anims.play('turn');
      }*/

      /*if (this.cursors.up.isDown && this.player.body.touching.down)
      {
        this.player.setVelocityY(-330);
      }*/
      /*if (this.player.body.touching.down || this.player.body.touching.up
        || this.player.body.touching.left || this.player.body.touching.right)
      {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
      }*/
    }

    handleMouseClick({ downX, downY }) {
      console.log('map clicked', downX, downY);
      this.physics.moveTo(this.player, downX, downY, 0, 500);
      const marker = this.physics.add.body(downX, downY, 1, 1);
      this.physics.moveToObject(this.player, marker, 60 , 750);
      var collider = this.physics.add.overlap(this.player, marker, function (playerOnMarker){
          playerOnMarker.body.stop();
          marker.destroy();
          this.physics.world.removeCollider(collider);
      }, null, this);
      //this.physics.accelerateTo(this.player, downX, downY, 60, 1000, 1000/*, 60, 300, 300*/);
    }

    /*handleKeyboardInput({ key }) {
      //console.log('key input:', key);
      switch (key){
        case 'ArrowUp':
         //this.player.y -= 10;
          this.player.setVelocityY(-100);
          break;
        case 'ArrowDown':
          //this.player.y += 10;
          this.player.setVelocityY(100);
          break;
        case 'ArrowLeft':
          //this.player.x -= 10;
          this.player.setAccelerationX(-200);
          break;
        case 'ArrowRight':
          //this.player.x += 10;
          this.player.setAccelerationX(200);
          break;
      }
    }*/
}
