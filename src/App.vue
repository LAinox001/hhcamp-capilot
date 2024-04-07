<template>
    <JournalDeBord v-if="isJournalDeBordOpened" :show-boussole="goToBoussolePage"/>
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" @show-journal-boussole="showJournalBoussole" v-else />
    <div>
        <div>
            <button class="button" @click="openBoussole">Ouvrir la Boussole Des Emotions</button>
        </div>
        
        <div>
            <button class="button" @click="openSeaMap">Open Navigation</button>
        </div>
        <div>
            <button class="button" @click="openMap">Open Map</button>
        </div>
        <div>
            <button class="button" @click="openDialog">Open Dialog</button>
        </div>
        <div>
            <button class="button" @click="isJournalDeBordOpened = !isJournalDeBordOpened">
                <template v-if="isJournalDeBordOpened">Fermer</template> 
                <template v-else>Ouvrir</template> 
                le journal de bord
            </button>
        </div>
    </div>
</template>

<script setup>
import Phaser from 'phaser'
import { ref, toRaw } from 'vue'
import PhaserGame from './game/PhaserGame.vue'
import JournalDeBord from './web/JournalDeBord.vue'

// The sprite can only be moved in the MainMenu Scene
const canMoveSprite = ref()

//  References to the PhaserGame component (game and scene are exposed)
const phaserRef = ref()
const spritePosition = ref({ x: 0, y: 0 })

const isJournalDeBordOpened = ref(false);
const goToBoussolePage = ref(false);

const changeScene = () => {
    const scene = toRaw(phaserRef.value.scene)
    if (scene) {
        //  Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
        scene.changeScene()
    }
}

const moveSprite = () => {
    const scene = toRaw(phaserRef.value.scene)
    if (scene) {
        //  Call the `moveLogo` method in the `MainMenu` Scene and capture the sprite position
        scene.moveLogo(({ x, y }) => {
            spritePosition.value = { x, y }
        })
    }
}

const addSprite = () => {
    const scene = toRaw(phaserRef.value.scene)
    if (scene) {
        //  Add a new sprite to the current scene at a random position
        const x = Phaser.Math.Between(64, scene.scale.width - 64)
        const y = Phaser.Math.Between(64, scene.scale.height - 64)

        //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
        const star = scene.add.sprite(x, y, 'star')

        //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
        //  You could, of course, do this from within the Phaser Scene code, but this is just an example
        //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
        scene.add.tween({
            targets: star,
            duration: 500 + Math.random() * 1000,
            alpha: 0,
            yoyo: true,
            repeat: -1
        })
    }
}

//  This event is emitted from the PhaserGame component:
const currentScene = (scene) => {
    canMoveSprite.value = (scene.scene.key !== 'MainMenu')
}

const showJournalBoussole = () => {
    goToBoussolePage.value = true;
    isJournalDeBordOpened.value = true;
}

const openBoussole = () => {
    isJournalDeBordOpened.value = false;
    goToBoussolePage.value = false;
    setTimeout(() => {
        const scene = toRaw(phaserRef.value.scene)
        if (scene) {
            scene.scene.stop('Map')
            scene.scene.start('BoussoleDesEmotions')
        }
    }, 500)
}
/*
const openIslandMap = () => {
    const scene = toRaw(phaserRef.value.scene)
    if (scene) {
        scene.scene.start('Map');
    }
};*/

const openSeaMap = () => {
    const scene = toRaw(phaserRef.value.scene)
    if (scene) {
        scene.scene.start('Map', {
            playerImage: 'ship',
            playerX: 100,
            playerY: 64,
            islandImage: 'ocean_islands',
            interestPoints: []
        });
    }
};

const openMap = () => {
    const scene = toRaw(phaserRef.value.scene)
    if (scene) {
        scene.scene.start('Map', {
            playerImage: 'avatar',
            playerX: 200,
            playerY: 500,
            islandImage: 'island_1',
            interestPoints: [
                {
                    key: 'empty',
                    x: 530,
                    y: 550,
                    cb: (...args) => {
                        console.log('coffre trouvé', args)
                        openBoussole();
                    }
                },
                {
                    key: 'empty',
                    x: 745,
                    y: 275,
                    cb: (...args) => console.log('boussole trouvé', args)
                }
            ]
        });
    }
};
const openDialogScene = (sprite, text, next) => {
    const scene = toRaw(phaserRef.value.scene)
    if (scene) {
        scene.scene.start('Dialog', {
            sprite,
            message: scene.cache.text.get(text),
            next
        });
    }
};

const openDialog = () => {

    openDialogScene('general', 'general_1', () => {
        openDialogScene('general', 'general_2');
    });

    /*const scene = toRaw(phaserRef.value.scene);
    if (scene) {
        scene.scene.start('Dialog', {
            sprite: 'stickman',
            message: scene.cache.text.get('general_1'),
            next: () => {
                openDialogScene('stickman', 'general_2')
            }
        });
    }*/
};
</script>
