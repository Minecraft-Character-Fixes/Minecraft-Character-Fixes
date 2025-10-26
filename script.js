let easterEggClicks = 0;


if (localStorage.panoramaMovement === undefined) {
	localStorage.panoramaMovement = "true";
}
if (localStorage.panoramaMovement === "false") {
	document.body.style.animation = "none";
}

function triggerPanoramaMovement() {
	if (localStorage.panoramaMovement === "false") {
		document.body.style.animation = "";
		localStorage.panoramaMovement = "true";
	} else {
		document.body.style.animation = "none";
		localStorage.panoramaMovement = "false";
	}
}


function easterEgg() {
	const clickSound = document.getElementById("click");
	clickSound.play();

	if (easterEggClicks === 2) {
		const music = document.getElementById("music");
		music.currentTime = 0;
		music.volume = 0.7;
		music.play();
		document.getElementById("easter-egg").style.color = "#00aa00";
	}
	easterEggClicks++;
}


const buttons = document.querySelectorAll(".minecraft-button");
buttons.forEach(button => {
	button.addEventListener("click", () => {
		document.getElementById("clickSound").play();
	});
	button.addEventListener("mouseenter", () => {
		document.getElementById("hoverSound").play();
	});
});

// ===============================
//  AUTO MOD PACK LOADER
// ===============================
async function loadPacks(folder) {
  const container = document.getElementById("pack-list");
  if (!container) return; 
  container.textContent = "Loading...";

  try {
    const res = await fetch(`${folder}/index.json`);
    const list = await res.json();
    container.innerHTML = "";

    for (const pack of list) {
      const info = await fetch(`${folder}/${pack}/info.json`).then(r => r.json());
      const card = document.createElement("div");
      card.className = "mod-card";
      card.innerHTML = `
        <img src="${folder}/${pack}/${info.thumbnail}" class="mod-thumb" alt="${info.name}">
        <p class="menu-title">${info.name}</p>
        <p class="menu-desc">${info.description}</p>
        <p style="color:#ffffa0;font-size:12px;">By ${info.author} — v${info.version}</p>
        <a class="minecraft-button" href="${folder}/${pack}/${info.download}" download>Download</a>
      `;

      card.querySelector(".minecraft-button").addEventListener("mouseover", () => document.getElementById("hoverSound").play());
      card.querySelector(".minecraft-button").addEventListener("click", () => document.getElementById("clickSound").play());
      container.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    container.textContent = "Failed to load packs.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("skins")) loadPacks("skins");
  if (location.pathname.includes("capes")) loadPacks("capes");
  if (location.pathname.includes("armors")) loadPacks("armors");
});

