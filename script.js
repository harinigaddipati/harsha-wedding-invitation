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

const bride =
  document.getElementById("bride");


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
      // 2. FADE OUT THE LANDING PAGE
      // -----------------------------------------------------

      if (landingPage) {

        landingPage.classList.add(
          "landing-hidden"
        );

      }


      // -----------------------------------------------------
      // 3. UNLOCK PAGE SCROLLING
      // -----------------------------------------------------

      document.body.classList.remove(
        "landing-open"
      );


      // -----------------------------------------------------
      // 4. MOVE TO BRIDE SECTION
      // -----------------------------------------------------

      if (bride) {

        setTimeout(function () {

          bride.scrollIntoView({
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
