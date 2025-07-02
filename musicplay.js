let audio = new Audio(`./songs/Khoobsurat .mp3`);

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    // console.log(response)

    let div = document.createElement("div");
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
        // console.log(songs);
    }
    return songs
}

async function main() {
    let songs = await getSongs()
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

        // Append the <li> to the <ul>
        songUl.appendChild(li);
    }

    let play = document.getElementById("play");
    let name = document.getElementById("songName")
    Array.from(document.querySelector(".nextsong").getElementsByTagName("li")).forEach(e => {
        console.log(e.innerText);
        e.addEventListener('click', function () {
            songName = `${e.innerText}`
            audio.pause();
            audio.currentTime = 0;
            console.log(e.innerText);

            audio = new Audio(`./songs/${e.innerText}`);
            console.log(audio);
            audio.play();

            if (audio.played) {
                name.innerHTML = `${e.innerText}`
                play.src = "/images/pause.svg"
            }
            else {
                play.src = "/images/play.svg"
            }
        })
    })

    play.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            play.src = "/images/pause.svg"
        }
        else {
            audio.pause();
            play.src = "/images/play.svg"
        }
    })

    // paly first song
    // var audio = new Audio(songs[0]);
    // console.log(audio);
    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(duration)
    // });

}

main()