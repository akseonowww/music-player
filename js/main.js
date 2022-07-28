const audio = document.querySelector(".section-player audio")
const time = document.querySelector(".section-player .time")
const timerCount = document.querySelector(".timer-count")
const btnPlay = document.querySelector(".section-player .play")
const btnNext = document.querySelector(".section-player .next")
const btnPrev = document.querySelector(".section-player .prev")
const volueAudio = document.querySelector(".section-player .value")
const liked = document.querySelectorAll(".like")

const treckCover = document.querySelector(".trake-bg img")
const treckName = document.querySelector(".trake-text strong")
const treckAuthor = document.querySelector(".trake-text .author")
const contentTreks = document.querySelector(".content__treks")

let playlist = [
	{
		name: "Пора возвращаться домой",
		author: "БИ-2",
		cover: "https://img5.goodfon.ru/original/2048x2048/f/f7/bi-2-minimalizm-logo-albom-rok-gruppa-rok-alternativnyi-rok.jpg",
		time: "4:53",
		src: "BI-2_It's-time-to-go-home.mp3",
	},
	{
		name: "Лицемер",
		author: "DK",
		cover: "https://avatars.yandex.net/get-music-content/4304260/1eb294a3.a.13593426-1/m1000x1000?webp=false",
		time: "2:32",
		src: "DK_Hypocrite.mp3",
	},
	{
		name: "По необьятной",
		author: "DK",
		cover: "https://avatars.yandex.net/get-music-content/2427101/4774e850.a.11856084-1/m1000x1000?webp=false",
		time: "2:38",
		src: "DK_On-the-vast.mp3",
	},
	{
		name: "Где твой идол",
		author: "DK",
		cover: "https://i1.sndcdn.com/artworks-000421788789-yr7w79-t500x500.jpg",
		time: "2:54",
		src: "DK_Where-is-your-idol.mp3",
	},
	{
		name: "Пять Минут",
		author: "Людмила Гурченко",
		cover: "https://fs3.fotoload.ru/f/1221/1640858820/1cd85204c5.jpg",
		time: "3:28",
		src: "Lyudmila-Gurchenko_Five-Minutes.mp3",
	},
	{
		name: "Это любовь",
		author: "Скриптонит",
		cover: "https://freelance.ru/img/portfolio/pics/00/41/03/4260693.jpg",
		time: "4:39",
		src: "Scriptonite_Is-love.mp3",
	},
	{
		name: "Бекап",
		author: "The Вепри",
		cover: "https://undergrundheros.ru/wp-content/uploads/2021/05/edrgppm_v1i.jpg",
		time: "2:36",
		src: "The-Boar_Backup.mp3",
	},
	{
		name: "Паттерн",
		author: "The Вепри",
		cover: "https://undergrundheros.ru/wp-content/uploads/2021/05/edrgppm_v1i.jpg",
		time: "2:28",
		src: "The-Boar_Pattern.mp3",
	},
	{
		name: "Кто такой Гусейн Гасанов?",
		author: "The Вепри",
		cover: "https://undergrundheros.ru/wp-content/uploads/2021/05/edrgppm_v1i.jpg",
		time: "2:36",
		src: "The-Boar_Who-is-Huseyn-Hasanov.mp3",
	}
]

let d = 0
document.querySelectorAll(".content__header .cover img").forEach(el => {
	el.src = playlist[d].cover
	d++
})
const artistList = () => {
	let artist = []
	playlist.forEach(el => {
		if (el.author === artist[artist.length - 1]) {
			artist.pop()
		} else {
			artist.push(el.author)
		}
	})

	let s = ''
	artist.forEach(el => {
		s += el + ", "
	})

	return s.slice(0, -2)
}

document.querySelector(".content .descr .author__value").innerHTML = artistList()

let treck

window.onload = function () {
	treck = 0
	treckCover.src = playlist[0].cover
	treckName.innerHTML = playlist[0].name
	treckAuthor.innerHTML = playlist[0].author
	/// start
	let countStartMinutes = Math.floor(Math.round(audio.duration) / 60)
	let countStartSecunds = Math.round(audio.duration - countStartMinutes * 60)
	// real
	let countRealMinutes = Math.floor(Math.round(audio.currentTime) / 60)
	let countRealSecunds
	if (countRealMinutes > 0) {
		countRealSecunds = Math.round(audio.currentTime - Math.round(countStartMinutes) * 60)
	} else {
		if (audio.currentTime < 10) {
			countRealSecunds = "0" + Math.round(audio.currentTime)
		} else {
			countRealSecunds = Math.round(audio.currentTime)
		}
	}
	timerCount.innerHTML = "0" + countRealMinutes + ":" + countRealSecunds + "/0" + countStartMinutes + ":" + countStartSecunds


}

const switchTreck = (numTreck) => {
	audio.src = './files/' + playlist[numTreck].src
	audio.currentTime = 0
	timerCount.innerHTML = audio.currentTime
	treckCover.src = playlist[numTreck].cover
	treckName.innerHTML = playlist[numTreck].name
	treckAuthor.innerHTML = playlist[numTreck].author
	audio.play()
}

btnPlay.addEventListener("click", function () {
	if (btnPlay.classList.value.indexOf("active") === -1) {
		btnPlay.classList.add("active")
		audio.play()

		audioPlay = setInterval(function () {
			let audioTime = Math.round(audio.currentTime)
			let audioLenght = Math.round(audio.duration)
			time.style.width = (audioTime * 100) / audioLenght + '%'


			// start
			let countStartMinutes = Math.floor(Math.round(audio.duration) / 60)
			let countStartSecunds = Math.round(audio.duration - countStartMinutes * 60)
			// real
			let countRealMinutes = Math.floor(Math.round(audio.currentTime) / 60)
			let countRealSecunds
			if (countRealMinutes > 0) {
				countRealSecunds = Math.round(audio.currentTime) - countStartMinutes * 60
			} else {
				if (audio.currentTime < 10) {
					countRealSecunds = "0" + Math.round(audio.currentTime)
				} else {
					countRealSecunds = Math.round(audio.currentTime)

				}

			}
			timerCount.innerHTML = "0" + countRealMinutes + ":" + countRealSecunds + "/0" + countStartMinutes + ":" + countStartSecunds


			if (audioTime == audioLenght && treck < (playlist.length - 1)) {
				treck++
				switchTreck(treck)
			} else if (audioTime == audioLenght && treck >= (playlist.length - 1)) {
				treck = 0
				switchTreck(treck)
			}
		}, 10)

	} else {
		btnPlay.classList.remove("active")
		audio.pause()
	}
})

btnNext.addEventListener("click", function () {
	if (treck < (playlist.length - 1)) {
		treck++
		switchTreck(treck)
		btnPlay.classList.add("active")
	} else {
		treck = 0
		switchTreck(treck)
	}
})

btnPrev.addEventListener("click", function () {
	if (treck > 0) {
		btnPlay.classList.add("active")
		treck--
		switchTreck(treck)
	} else {
		treck = playlist.length - 1
		switchTreck(treck)
	}
})

volueAudio.addEventListener("click", function () {
	if (volueAudio.classList.value.indexOf("active") === -1) {
		volueAudio.classList.add("active")
		audio.volume = 0
	} else {
		audio.volume = 1
		volueAudio.classList.remove("active")
	}
})

liked.forEach(el => {
	el.addEventListener("click", () => {
		if (el.classList.value.indexOf("active") === -1) {
			el.classList.add("active")
		} else {
			el.classList.remove("active")
		}
	})
})
let count = 0
playlist.forEach(el => {
	// const itemContainer = contentTreks.createElement("div")
	// const itemText = document.createTextNode(el)
	// itemContainer.appendChild(itemText)
	contentTreks.innerHTML = contentTreks.innerHTML + `
<div class="treck" onclick="toPlayMusic(this)">
<div class="info">
<div class="id">`+ (count + 1) + `</div>
		<strong>`+ el.name + `</strong>
	</div>
	<div class="treck-value">`+ el.time + `</div>
</div>`
	count++
})

const toPlayMusic = (e) => {
	switchTreck(Number(e.children[0].children[0].innerHTML) - 1)

	document.querySelectorAll(".content__treks .treck").forEach(el => {
		el.classList.remove("active")
	})
	btnPlay.classList.add("active")
	if (e.classList.value.indexOf("active") == -1) {
		e.classList.add("active")
	}

	audioPlay = setInterval(function () {
		let audioTime = Math.round(audio.currentTime)
		let audioLenght = Math.round(audio.duration)
		time.style.width = (audioTime * 100) / audioLenght + '%'


		// start
		let countStartMinutes = Math.floor(Math.round(audio.duration) / 60)
		let countStartSecunds = Math.round(audio.duration - countStartMinutes * 60)
		// real
		let countRealMinutes = Math.floor(Math.round(audio.currentTime) / 60)
		let countRealSecunds
		if (countRealMinutes > 0) {
			countRealSecunds = Math.round(audio.currentTime) - countStartMinutes * 60
		} else {
			if (audio.currentTime < 10) {
				countRealSecunds = "0" + Math.round(audio.currentTime)
			} else {
				countRealSecunds = Math.round(audio.currentTime)

			}

		}
		timerCount.innerHTML = "0" + countRealMinutes + ":" + countRealSecunds + "/0" + countStartMinutes + ":" + countStartSecunds


		if (audioTime == audioLenght && treck < (playlist.length - 1)) {
			treck++
			switchTreck(treck)
		} else if (audioTime == audioLenght && treck >= (playlist.length - 1)) {
			treck = 0
			switchTreck(treck)
		}
	}, 10)
}

// API
// const content = document.querySelector(".content")

// Like