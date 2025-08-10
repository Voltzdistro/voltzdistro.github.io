// === Configuration ===
// Target launch time: Aug 16, 2025 9:00 AM PT (Pacific Daylight Time is UTC-7 in Aug 2025).
// Convert PT to UTC: 2025-08-16T16:00:00Z
const LAUNCH_ISO_UTC = '2025-08-16T16:00:00Z';
const PROMO_URL = 'https://shop.acquisition.com/pages/register?via=francis25';

// DOM refs
const adRoot = document.getElementById('universalAd');
const cancelBtn = document.getElementById('cancelAd');
const learnBtn = document.getElementById('learnAd');
const promoLink = document.getElementById('promoLink');

// Countdown elements
const cdDays = document.getElementById('cdDays');
const cdHours = document.getElementById('cdHours');
const cdMins = document.getElementById('cdMins');
const cdSecs = document.getElementById('cdSecs');
const countDaysText = document.getElementById('countDays');

let launchTime = new Date(LAUNCH_ISO_UTC);

// Safe: if invalid date, hide countdown
if (isNaN(launchTime)) {
  console.warn('Invalid launch time configured for the ad template.');
}

// Update promo link href (redundant but useful if you change PROMO_URL)
if (promoLink) promoLink.setAttribute('href', PROMO_URL);

// Cancel behavior: hide the ad gracefully
cancelBtn.addEventListener('click', () => {
  adRoot.style.transition = 'opacity .18s ease, transform .18s ease';
  adRoot.style.opacity = '0';
  adRoot.style.transform = 'translateY(12px) scale(.995)';
  setTimeout(() => {
    adRoot.style.display = 'none';
  }, 180);
});

// Learn behavior: opens promo in new tab (same as anchor)
learnBtn.addEventListener('click', () => {
  window.open(PROMO_URL, '_blank', 'noopener');
});

// Countdown updater (updates every second)
function updateCountdown() {
  const now = new Date();
  const diff = launchTime - now;

  if (diff <= 0) {
    // Launch time reached or passed
    cdDays.textContent = '0';
    cdHours.textContent = '00';
    cdMins.textContent = '00';
    cdSecs.textContent = '00';
    // Optionally update the copy to show "Live now!" — small enhancement:
    const adClock = document.querySelector('.ad-clock');
    if (adClock) adClock.textContent = 'Doors are open — join now!';
    return;
  }

  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  cdDays.textContent = String(days);
  cdHours.textContent = String(hours).padStart(2, '0');
  cdMins.textContent = String(mins).padStart(2, '0');
  cdSecs.textContent = String(secs).padStart(2, '0');

  // Also update inline 'In X days' small text if present
  if (countDaysText) countDaysText.textContent = String(days);
}

// Start countdown
updateCountdown();
const cdInterval = setInterval(() => {
  updateCountdown();
  // stop interval when launch passed
  if (new Date() >= launchTime) {
    clearInterval(cdInterval);
  }
}, 1000);

// Accessibility: allow ESC to dismiss
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cancelBtn.click();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const cancelBtn = document.getElementById('cancelAd');
  const ad = document.getElementById('universalAd');

  cancelBtn.addEventListener('click', () => {
    ad.style.display = 'none';
  });
});
