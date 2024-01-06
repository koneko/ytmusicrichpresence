// ==UserScript==
// @name        New script youtube.com
// @namespace   Violentmonkey Scripts
// @match       https://music.youtube.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 1/6/2024, 2:59:39 PM
// ==/UserScript==

let port = 3461

var songTitle, songTime, songImage;

setInterval(async () => {
    songTitle = document.querySelector("yt-formatted-string.title.ytmusic-player-bar").textContent
    songTime = document.getElementById("progress-bar").getAttribute("aria-valuetext")
    songImage = document.querySelector("img.image").src
    await fetch(`http://localhost:${port}/alive`).then(async res => {
        if (res.status == 200) {
            await fetch(`http://localhost:${port}/updateListening?details=${songTitle}&state=${songTime}`)
        }
    })
    console.log("sent " + songTitle)
}, 1000)