export function getGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "goodMorning";
  } else if (hour >= 12 && hour < 17) {
    return "goodAfterNoon";
  } else if (hour >= 17 && hour < 21) {
    return "goodEvening";
  } else {
    return "goodNight";
  }
}
