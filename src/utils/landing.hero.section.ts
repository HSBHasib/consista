export function getDynamicDashboardData(userName: string = "Hasib") {
  const now = new Date();

  // Dynamic Date formatting (like: "Thursday, Sep 18")
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = now.toLocaleDateString('en-US', dateOptions);

  // Dynamic Time-based Greeting
  const hours = now.getHours();
  let timeGreeting = "Good morning";
  if (hours >= 12 && hours < 17) {
    timeGreeting = "Good afternoon";
  } else if (hours >= 17) {
    timeGreeting = "Good evening";
  }

  return {
    greeting: `${timeGreeting}, ${userName}`,
    date: formattedDate,
  };
}
