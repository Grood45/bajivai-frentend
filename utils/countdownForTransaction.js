function countdownForTransaction(minutes) {
  let seconds = minutes * 60;

  const countdownInterval = setInterval(function () {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    console.log(
      `Time Remaining: ${minutesRemaining} minutes ${secondsRemaining} seconds`
    );
    seconds--;

    if (seconds < 0) {
      clearInterval(countdownInterval);
      console.log("Time's up! Countdown finished.");
    }
  }, 1000);
}

module.exports = { countdownForTransaction };
