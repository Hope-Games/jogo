export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    /* Tilemap */
    this.load.tilemapTiledJSON("mapa", "./assets/mapa.json");

    /* Tilesets */
    this.load.image("bloco", "./assets/bloco.png");
    this.load.image("chao", "./assets/chao.png");

    /* Personagem 1: Tyler */
    this.load.spritesheet("Tyler", "./assets/personagens/Tyler.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Personagem 2: Derek */
    this.load.spritesheet("Derek", "./assets/personagens/Derek.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Artefato */
    this.load.spritesheet("chave", "./assets/icones/chave.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /*Botões */
    this.load.spritesheet("cima", "./assets/botões/cima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("baixo", "./assets/botões/baixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("esquerda", "./assets/botões/esquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("direita", "./assets/botões/direita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("tela-cheia", "./assets/abertura/tela-cheia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Sons */
    this.load.audio("trilha", "./assets/áudios/audio_principal.mp3");
    this.load.audio("som-chave", "./assets/áudios/som_chave.mp3");
  }

  create() {
    /* Trilha sonora */
    this.trilha = this.sound.add("trilha");
    this.trilha.loop = true;
    this.trilha.play();

    /* Tilemap */
    this.mapa = this.make.tilemap({
      key: "mapa",
    });

    /* Tilesets */
    this.tileset_mapa_bloco = this.mapa.addTilesetImage("bloco", "bloco");
    this.tileset_mapa_chao = this.mapa.addTilesetImage("chao", "chao");

    /* chão */
    this.chao = this.mapa.createLayer("chao", this.tileset_mapa_chao, 0, 0);

    /* bloco */
    this.bloco = this.mapa.createLayer("bloco", this.tileset_mapa_bloco, 0, 0);


    /* Personagem 1: Tyler */
    this.Tyler = this.physics.add.sprite(100, 50, "Tyler");

    this.anims.create({
      key: "Tyler-A-parado",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "Tyler-A-baixo",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Tyler-A-esquerda",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Tyler-A-direita",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Tyler-A-cima",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    /* Personagem 2: Derek */
    this.Derek = this.add.sprite(100, 1890, "Derek");

    /* */
    this.chave = this.physics.add.sprite(560, 350, "chave");

    this.anims.create({
      key: "chave-pulando",
      frames: this.anims.generateFrameNumbers("chave", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });

    this.chave.anims.play("chave-pulando");
    this.som_chave = this.sound.add("som-chave");

    /* Botões */
    this.cima = this.add
      .sprite(125, 330, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.Tyler.setVelocityY(-200);
        this.Tyler.anims.play("Tyler-A-cima");
      })
      .on("pointerout", () => {
        this.cima.setFrame(0);
        this.Tyler.setVelocityY(0);
        this.Tyler.anims.play("Tyler-A-parado");
      })
      .setScrollFactor(0);

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.baixo.setFrame(1);
        this.Tyler.setVelocityY(200);
        this.Tyler.anims.play("Tyler-A-baixo");
      })
      .on("pointerout", () => {
        this.baixo.setFrame(0);
        this.Tyler.setVelocityY(0);
        this.Tyler.anims.play("Tyler-A-parado");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(60, 370, "esquerda", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.esquerda.setFrame(1);
        this.Tyler.setVelocityX(-200);
        this.Tyler.anims.play("Tyler-A-esquerda");
      })
      .on("pointerout", () => {
        this.esquerda.setFrame(0);
        this.Tyler.setVelocityX(0);
        this.Tyler.anims.play("Tyler-A-parado");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(190, 370, "direita", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.direita.setFrame(1);
        this.Tyler.setVelocityX(200);
        this.Tyler.anims.play("Tyler-A-direita");
      })
      .on("pointerout", () => {
        this.direita.setFrame(0);
        this.Tyler.setVelocityX(0);
        this.Tyler.anims.play("Tyler-A-parado");
      })
      .setScrollFactor(0);

    this.tela_cheia = this.add
      .sprite(750, 50, "tela-cheia", 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          this.tela_cheia.setFrame(1);
          this.scale.startFullscreen();
        }
      })
      .setScrollFactor(0);

    /* Colisões por tile */
    this.bloco.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.Tyler,
      this.bloco,
      this.collision,
      null,
      this
    );

    /* Colisão com os limites da cena */
    this.Tyler.setCollideWorldBounds(true);

    /* Cena (1920x1920) maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.physics.world.setBounds(0, 0, 1920, 1920);
    this.cameras.main.startFollow(this.Tyler);

    /* Colisão com objeto */
    this.physics.add.collider(
      this.Tyler,
      this.chave,
      this.coletar_chave,
      null,
      this
    );
  }

  upload() {}

  collision() {
    /* Tremer a tela por 100 ms com baixa intensidade (0.01) */
    this.cameras.main.shake(100, 0.01);

    /* Vibrar o celular pelos mesmos 100 ms */
    window.navigator.vibrate([100]);
  }

  coletar_chave() {
    this.chave.disableBody(true, true);
    this.som_chave.play();
  }
}
