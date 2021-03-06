<a href="https://twitter.com/fajyobore323/status/1449562477230903300?s=20&t=udF7we2rztKHqA33uLyWQQ">![Header](https://raw.githubusercontent.com/rezaageng/github-img/main/renn/renn169.jpg)</a>

<h1 align="center">🐈‍⬛ renn 🎭</h1>

<div align="center">
  <img src="https://img.shields.io/badge/Discord.js-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="">
  <img src="https://img.shields.io/codefactor/grade/github/rezaageng/renn?style=for-the-badge" alt="CodeFactor Grade">
  <a href="https://wakatime.com/badge/user/15ded74d-a9f6-457a-af7a-8b35101e5a02/project/edfb6260-a161-4b31-9e97-2edcdc4669bf"><img src="https://wakatime.com/badge/user/15ded74d-a9f6-457a-af7a-8b35101e5a02/project/edfb6260-a161-4b31-9e97-2edcdc4669bf.svg?style=for-the-badge" alt="wakatime"></a>
</div>

## Installation

Clone this repository:

```sh
git clone https://github.com/rezaageng/renn.git
```

Install all dependencies:

```sh
npm install
```

Rename `.env.example` to `.env` then fill with your own [Token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot), [Necessary Id](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-), and [HoYoLab Cookies](./HOYOLAB.md)

After the installation is complete:

```sh
npm run dev # to run bot in development
npm run build # to build renn
npm start # to run bot in production
```

[Invite](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) to your server

## Features

Commands:

- [Anonymous Message](#anonymous-message)
- [Anime & Manga Database](#anime--manga-database)
- [Genshin Impact Database](#genshin-impact-database)
- [First Rabbit](#first-rabbit)
- [Shinra](#shinra)
- [Suggestion](#suggestion)

Others:

- [Auto Add Role](#auto-add-role)
- [Auto Delete Messages](#auto-delete-message)
- [Auto Start Thread](#auto-start-thread)

## Anonymous Message

Send message to text channels or members anonymously

```
/anon-message
/anon-message-user
```

## Anime & Manga Database

Search anime & manga from [Kitsu](https://kitsu.io/) database

```
/anime
/manga
```

## Genshin Impact DataBase

Search characters, enemies, artifact, constellations, material, talent, weapon and traveler from [Genshin Impact](https://genshin.hoyoverse.com/en)

```
/genshin
```

## First Rabbit

Allow developers or admins to send message to members

```
/first-rabbit
```

## Shinra

Allow developers or admins to send messeges to text channels

```
/shinra
/shinra-edit
```

## Suggestion

Send suggestion to suggestions text channel

```
/suggestion
```

## Auto Add Role

Automatically add role to new member

## Auto Delete Message

If someone accidentally send message to anonymous commands channel, the message automatically deleted

## Auto Start Thread

If someone or renn send message to specific text channels, renn will automatically start thread for the message
