let audio = new Audio(`./songs/128-Satranga - Animal 128 Kbps.mp3`);
let currentSongIndex;
let songs = [];
async function getSongs() {
    let a = await fetch("/songs/");
    let response = await a.text();
    // console.log(response)

    let div = document.createElement("div");
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        console.log("elemetn", element);

        if (element.href.endsWith(".mp3")) {
            let songName = element.href.split("/songs/")[1];
            songName.replaceAll("%20", " ");
            console.log("Song name: ", songName);

            songs.push(songName)
        }
        // console.log(songs);
    }
    return songs
}

function selectSong(songIndex) {
    audio.pause();
    audio.removeEventListener('timeupdate', secondsToMinutesSeconds);
    audio = new Audio(`./songs/${songs[songIndex]}`);
    audio.addEventListener('timeupdate', secondsToMinutesSeconds);
    secondsToMinutesSeconds();

    console.log("Song array: ", songIndex);
    console.log("Audio", audio);
    currentSongIndex = songIndex;
    toogleSong();
}

function toogleSong() {
    if (audio.paused) {
        audio.play();
        play.src = "/images/pause.svg";
    }
    else {
        audio.pause();
        play.src = "/images/play.svg";
    }
}


function secondsToMinutesSeconds() {
    const seconds = audio.currentTime;
    const duration = audio.duration;

    if (isNaN(seconds) || isNaN(duration)) {
        document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
        return;
    }

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    let durMins = Math.floor(duration / 60);
    let durSecs = Math.floor(duration % 60);
    durMins = durMins < 10 ? "0" + durMins : durMins;
    durSecs = durSecs < 10 ? "0" + durSecs : durSecs;

    document.querySelector(".songtime").innerHTML = `${mins}:${secs} / ${durMins}:${durSecs}`;
}

audio.addEventListener("timeupdate", secondsToMinutesSeconds);


async function main() {
    let count = 0;
    songs = await getSongs();
    console.log(songs)

    let songUl = document.querySelector(".nextsong").getElementsByTagName("ul")[0];

    for (const song of songs) {
        // Create <li> element
        let li = document.createElement("li");

        // Create <img> element
        let imgElement = document.createElement('img');
        imgElement.src = "images/music.svg"; // Relative path (make sure it's correct from HTML file)
        imgElement.alt = "music";
        imgElement.style.width = "20px"; // Optional: style the image
        imgElement.style.marginRight = "10px";

        // Create text node for the song name
        let songText = document.createTextNode(song.replaceAll("%20", " "));

        // Append the image and song name to the <li>
        li.appendChild(imgElement);
        li.appendChild(songText);
        if (count >= 2) li.style.display = "none";

        // Append the <li> to the <ul>
        songUl.appendChild(li);
        count++;
    }

    let play = document.getElementById("play");
    Array.from(document.querySelector(".nextsong").getElementsByTagName("li")).forEach(e => {
        console.log(e.innerText);
        e.addEventListener('click', function () {
            songName = `${e.innerText} `;
            audio.pause();
            console.log(e.innerText);
            audio = new Audio(`./songs/${e.innerText}`)
            console.log(audio);
            audio.play();
            if (audio.played) {
                play.src = "/images/pause.svg"
            }
            else {
                play.src = "/images/play.svg"
            }
        });

    })

    play.addEventListener("click", toogleSong);

    document.getElementById("next").addEventListener("click", () => {
        let index = songs.indexOf(audio.src.split('/').slice(-1)[0])
        console.log(songs, index)
        // Call function playmusic with new index
        selectSong(index + 1);
    })


    document.getElementById("previous").addEventListener("click", () => {
        let index = songs.indexOf(audio.src.split('/').slice(-1)[0])
        console.log(songs, index)
        if (index === 0) return selectSong(0);
        selectSong(index - 1);
    })

    document.getElementById("showall").addEventListener("click", () => {
        const songUl = document.get.getElementsByTagName("ul");
        for (const songLi of songUl) {
            songLi.display.style = "block";
        }
    })

    document.getElementById('showall').addEventListener('click', () => {
        document.querySelector('.songlist').style.top = '10%';
        document.querySelector('.songlist').style.display = 'block';
    })

    // paly first song      
    // var audio = new Audio(songs[0]);
    // console.log(audio);
    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(duration)
    // });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

}

main()