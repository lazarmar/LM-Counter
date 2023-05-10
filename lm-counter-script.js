function LMCounter(
  startNumber,
  goalNumber,
  secondsDuration,
  counterClass,
  decimalPlaces
) {
  const counts = document.querySelectorAll(`.${counterClass}`);
  const difference = Math.abs(goalNumber - startNumber);
  const increment = startNumber < goalNumber ? 1 : -1;
  const duration = secondsDuration * 1000;

  function animateCounter(timestamp, count, startTime) {
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easingProgress = easeOutCubic(progress);
    const step = difference * easingProgress;
    const currentValue = startNumber + increment * step;
    count.innerText = currentValue.toFixed(decimalPlaces);
    if (progress < 1)
      requestAnimationFrame((timestamp) =>
        animateCounter(timestamp, count, startTime)
      );
    else count.innerText = goalNumber.toFixed(decimalPlaces);
  }

  function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  counts.forEach((count) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          requestAnimationFrame((timestamp) =>
            animateCounter(timestamp, count)
          );
          observer.disconnect();
        }
      },
      { threshold: [0] }
    );
    observer.observe(count);
  });
}
