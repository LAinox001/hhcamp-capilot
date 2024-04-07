import { Scene } from 'phaser'

export class Preloader extends Scene {
    constructor() {
        super('Preloader')
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background')

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress)

        })
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets')

        this.load.image('logo', 'logo.png')
        this.load.image('star', 'star.png')
        this.load.image("roue-des-emotions", "boussole_emotions.png")
        this.load.image('general', 'general.png');
        this.load.image('boat', 'boat.png');
        this.load.image('avatar', 'avatar_96.png');
        this.load.image('empty', 'empty.png');
        this.load.image('ocean_islands', 'ocean_islands2.png');


        this.load.image('island_1', 'island3_1024x768.png');
        this.load.image('ship', 'bateau_vector.png');

        /* timeline game start

g1 -> config diab -> g2 -> carte avec coffre -> g3 -> g4
-> boussole -> g5 -> g6 -> carte avec hamac -> g7 -> g8 -> g9 -> g10
TODO: comment faire apparaitre le journal avec une bulle explicative ?
        */
        this.load.text('general_1', 'dialogs/general_1.txt');
        this.load.text('general_2', 'dialogs/general_2.txt');
        this.load.text('general_3', 'dialogs/general_3.txt');
        this.load.text('general_4', 'dialogs/general_4.txt');
        this.load.text('general_5', 'dialogs/general_5.txt');
        this.load.text('general_6', 'dialogs/general_6.txt');
        this.load.text('general_7', 'dialogs/general_7.txt');
        this.load.text('general_8', 'dialogs/general_8.txt');
        this.load.text('general_9', 'dialogs/general_9.txt');
        this.load.text('general_10', 'dialogs/general_10.txt');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu')
    }
}
