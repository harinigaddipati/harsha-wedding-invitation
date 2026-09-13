const weddingData = {
  countdownDate: "2027-02-10T11:00:00",
  musicFile: "Seetha Kalyanam Female.mp3"
};


// =========================================================
// COUNTDOWN
// =========================================================

function tick() {

  const diff =
    new Date(weddingData.countdownDate) - new Date();

  const vals = [0, 0, 0, 0];

  if (diff > 0) {

    vals[0] =
      Math.floor(diff / 86400000);

    vals[1] =
      Math.floor(diff / 3600000) % 24;

    vals[2] =
      Math.floor(diff / 60000) % 60;

    vals[3] =
      Math.floor(diff / 1000) % 60;
  }


  ["days", "hours", "minutes", "seconds"].forEach(
    (id, i) => {

      const element =
        document.getElementById(id);

      if (element) {

        element.textContent =
          String(vals[i]).padStart(2, "0");

      }

    }
  );

}


tick();

setInterval(tick, 1000);


// =========================================================
// LANDING PAGE
// =========================================================

const landingPage =
  document.getElementById("landingPage");

const openInvitation =
  document.getElementById("openInvitation");

const intro =
  document.getElementById("intro");
const floatingConfetti =
  document.getElementById("floatingConfetti");

let confettiStarted = false;

function createWeddingPetal(){

  if (!floatingConfetti) return;

  const particle =
    document.createElement("div");

  const isLeaf =
    Math.random() > 0.55;

  particle.className =
    isLeaf
      ? "wedding-leaf"
      : "wedding-petal";

  /*
     Keep most particles near the sides
     so the invitation text stays easy to read.
  */

  const side =
    Math.random() > 0.5
      ? "left"
      : "right";

  if (side === "left"){

    particle.style.left =
      (Math.random() * 25) + "%";

  } else {

    particle.style.left =
      (75 + Math.random() * 25) + "%";

  }

  const duration =
    7 + Math.random() * 5;

  const delay =
    Math.random() * 0.4;

  particle.style.animationDuration =
    duration + "s";

  particle.style.animationDelay =
    delay + "s";

  /*
     Slight size variation
  */

  const scale =
    0.65 + Math.random() * 0.7;

  particle.style.transform =
    "scale(" + scale + ")";

  floatingConfetti.appendChild(particle);

  setTimeout(function(){

    particle.remove();

  }, (duration + delay) * 1000 + 500);

}


function startWeddingConfetti(){

  if (confettiStarted) return;

  confettiStarted = true;

  /*
     Start with only a few particles.
  */

  for(let i = 0; i < 4; i++){

    setTimeout(function(){

      createWeddingPetal();

    }, i * 450);

  }

  /*
     Keep gently adding particles
     while the invitation is open.
  */

  setInterval(function(){

    createWeddingPetal();

  }, 1800);

}

// =========================================================
// BACKGROUND MUSIC
// =========================================================

const music =
  document.getElementById("bgMusic");


// Prepare the audio.
// IMPORTANT:
// We do NOT call play() here.
// Android browsers generally block autoplay
// until the user interacts with the page.

if (music && weddingData.musicFile) {

  music.src = weddingData.musicFile;

  music.loop = true;

  music.volume = 0.5;

}


// =========================================================
// OPEN INVITATION CLICK
// =========================================================

if (openInvitation) {

  openInvitation.addEventListener(
    "click",
    async function () {


      // -----------------------------------------------------
      // 1. START MUSIC FROM THE USER'S BUTTON CLICK
      // -----------------------------------------------------

      if (music) {

        try {

          await music.play();

          console.log("Wedding music started.");

        } catch (error) {

          console.log(
            "Music could not start:",
            error
          );

        }

      }


      // -----------------------------------------------------
      // 2. START FLOATING WEDDING PETALS
      // -----------------------------------------------------

      startWeddingConfetti();


      // -----------------------------------------------------
      // 3. FADE OUT THE LANDING PAGE
      // -----------------------------------------------------

      if (landingPage) {

        landingPage.classList.add(
          "landing-hidden"
        );

      }


      // -----------------------------------------------------
      // 4. UNLOCK PAGE SCROLLING
      // -----------------------------------------------------

      document.body.classList.remove(
        "landing-open"
      );


      // -----------------------------------------------------
      // 5. MOVE TO INTRO SECTION
      // -----------------------------------------------------

      if (intro) {

        setTimeout(function () {

          intro.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 350);

      }

    }
  );

}

// =========================================================
// IMPORTANT
// =========================================================
//
// There is intentionally NO:
//
// - Kolam video
// - music fade
// - music pause
// - touchend music listener
// - document-wide click music listener
// - pointerup music listener
//
// Music starts once from OPEN INVITATION and keeps playing
// continuously while the invitation is being scrolled.
//
// =========================================================
