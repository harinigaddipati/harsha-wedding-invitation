const weddingData = {
  countdownDate: "2027-02-10T11:00:00",
  musicFile: "Sita Kalyanam Male.mp3"
};

// ==============================
// COUNTDOWN
// ==============================

function tick() {
  const diff = new Date(weddingData.countdownDate) - new Date();

  const vals = [0, 0, 0, 0];

  if (diff > 0) {
    vals[0] = Math.floor(diff / 86400000);
    vals[1] = Math.floor(diff / 3600000) % 24;
    vals[2] = Math.floor(diff / 60000) % 60;
    vals[3] = Math.floor(diff / 1000) % 60;
  }

  ["days", "hours", "minutes", "seconds"].forEach((id, i) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = String(vals[i]).padStart(2, "0");
    }
  });
}

tick();
setInterval(tick, 1000);


// ==============================
// OPEN INVITATION
// ==============================
// Opening → Kolam video → Bride

const openInvitation = document.getElementById("openInvitation");
const transition = document.getElementById("kolamTransition");
const video = document.getElementById("kolamVideo");

if (openInvitation && transition && video) {

  openInvitation.addEventListener("click", () => {

    transition.style.display = "flex";
    transition.classList.remove("kolam-fade");

    video.currentTime = 0;

    video.play().catch(() => {
      console.log("Kolam video could not autoplay.");
    });

    video.onended = () => {

      transition.classList.add("kolam-fade");

      setTimeout(() => {

        const bride = document.getElementById("bride");

        if (bride) {
          bride.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

        transition.style.display = "none";
        transition.classList.remove("kolam-fade");

      }, 600);

    };

  });

}


// ==============================
// MUSIC
// ==============================

const music = document.getElementById("bgMusic");

if (music && weddingData.musicFile) {
  music.src = weddingData.musicFile;

  const startMusic = () => {
    music.play().catch(() => {
      console.log("Music could not start yet.");
    });

    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  };

  document.addEventListener("click", startMusic, { once: true });
  document.addEventListener("touchstart", startMusic, { once: true });
}
