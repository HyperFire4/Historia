/* ---------- Soundtrack autoplay ----------
   Browsers only allow sound after a first tap, click or key press, so the music starts on that very first touch.
   If a visitor pauses the music themselves, it stays off on their next visits. */
let userChose = false;
function savePref(on) { try { localStorage.setItem('historia-music', on ? 'on' : 'off'); } catch (e) {} }
function userToggle() { userChose = true; musicBtn.classList.remove('nudge'); const was = Music.playing; Music.toggle(); savePref(!was); }
function userPlay(i) { userChose = true; Music.play(i); savePref(true); }
let musicPref = 'on'; try { musicPref = localStorage.getItem('historia-music') || 'on'; } catch (e) {}
if (musicPref !== 'off') {
  const evs = ['click', 'touchend', 'keydown'];
  const arm = () => evs.forEach(n => document.addEventListener(n, wake, true));
  const disarm = () => evs.forEach(n => document.removeEventListener(n, wake, true));
  function wake(e) {
    if (e.target && e.target.closest && e.target.closest('#musicBtn, #mPanel, #cMusic')) return;   // they are choosing for themselves
    disarm();
    if (userChose || Music.playing) return;
    Music.play(0).catch(() => {});   // (browsers without Web Audio simply stay silent)
    setTimeout(() => { if (!Music.running && !userChose) arm(); }, 500);   // the browser said no (e.g. a scroll, not a tap): try again on the next gesture
  }
  let pol = 'disallowed'; try { pol = navigator.getAutoplayPolicy ? navigator.getAutoplayPolicy('audiocontext') : 'disallowed'; } catch (e) {}
  if (pol === 'allowed') Music.play(0).catch(() => {}); else arm();
}

