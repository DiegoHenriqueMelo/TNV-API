-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('CAPITAO', 'ARBITRO', 'ORGANIZADOR', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "StatusCartao" AS ENUM ('AMARELO', 'VERMELHO', 'AZUL');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nome" TEXT,
    "numero" INTEGER,
    "posicao" TEXT,
    "dataNasc" TIMESTAMP(3),
    "timeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arbitro" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Arbitro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" VARCHAR(5),
    "cidade" TEXT,
    "fundacao" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogo" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "golsCasa" INTEGER NOT NULL DEFAULT 0,
    "golsFora" INTEGER NOT NULL DEFAULT 0,
    "timeCasaId" INTEGER NOT NULL,
    "timeForaId" INTEGER NOT NULL,
    "campeonatoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campeonato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "temporada" TEXT,
    "inicio" TIMESTAMP(3),
    "fim" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campeonato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estadio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT,
    "capacidade" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estadio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classificacao" (
    "id" SERIAL NOT NULL,
    "campeonatoId" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,
    "posicao" INTEGER NOT NULL,
    "pontos" INTEGER NOT NULL DEFAULT 0,
    "vitorias" INTEGER NOT NULL DEFAULT 0,
    "empates" INTEGER NOT NULL DEFAULT 0,
    "derrotas" INTEGER NOT NULL DEFAULT 0,
    "golsPro" INTEGER NOT NULL DEFAULT 0,
    "golsContra" INTEGER NOT NULL DEFAULT 0,
    "saldoGols" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Classificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artilharia" (
    "id" SERIAL NOT NULL,
    "classificacaoId" INTEGER NOT NULL,
    "jogadorNome" TEXT NOT NULL,
    "gols" INTEGER NOT NULL DEFAULT 0,
    "assistencias" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Artilharia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advertencia" (
    "id" SERIAL NOT NULL,
    "tipo" "StatusCartao" NOT NULL,
    "minuto" INTEGER,
    "motivo" TEXT,
    "jogadorId" INTEGER NOT NULL,
    "arbitroId" INTEGER NOT NULL,
    "jogoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Advertencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeCampeonato" (
    "timeId" INTEGER NOT NULL,
    "campeonatoId" INTEGER NOT NULL,
    "inscritoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimeCampeonato_pkey" PRIMARY KEY ("timeId","campeonatoId")
);

-- CreateTable
CREATE TABLE "ArbitroCampeonato" (
    "arbitroId" INTEGER NOT NULL,
    "campeonatoId" INTEGER NOT NULL,

    CONSTRAINT "ArbitroCampeonato_pkey" PRIMARY KEY ("arbitroId","campeonatoId")
);

-- CreateTable
CREATE TABLE "CampeonatoEstadio" (
    "campeonatoId" INTEGER NOT NULL,
    "estadioId" INTEGER NOT NULL,

    CONSTRAINT "CampeonatoEstadio_pkey" PRIMARY KEY ("campeonatoId","estadioId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jogador_usuarioId_key" ON "Jogador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Arbitro_usuarioId_key" ON "Arbitro"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Classificacao_campeonatoId_timeId_key" ON "Classificacao"("campeonatoId", "timeId");

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arbitro" ADD CONSTRAINT "Arbitro_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_timeCasaId_fkey" FOREIGN KEY ("timeCasaId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_timeForaId_fkey" FOREIGN KEY ("timeForaId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogo" ADD CONSTRAINT "Jogo_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artilharia" ADD CONSTRAINT "Artilharia_classificacaoId_fkey" FOREIGN KEY ("classificacaoId") REFERENCES "Classificacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertencia" ADD CONSTRAINT "Advertencia_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertencia" ADD CONSTRAINT "Advertencia_arbitroId_fkey" FOREIGN KEY ("arbitroId") REFERENCES "Arbitro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advertencia" ADD CONSTRAINT "Advertencia_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeCampeonato" ADD CONSTRAINT "TimeCampeonato_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeCampeonato" ADD CONSTRAINT "TimeCampeonato_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArbitroCampeonato" ADD CONSTRAINT "ArbitroCampeonato_arbitroId_fkey" FOREIGN KEY ("arbitroId") REFERENCES "Arbitro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArbitroCampeonato" ADD CONSTRAINT "ArbitroCampeonato_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampeonatoEstadio" ADD CONSTRAINT "CampeonatoEstadio_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampeonatoEstadio" ADD CONSTRAINT "CampeonatoEstadio_estadioId_fkey" FOREIGN KEY ("estadioId") REFERENCES "Estadio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
