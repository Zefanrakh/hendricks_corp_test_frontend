export async function getTimezones(): Promise<string[]> {
  const response = await fetch(
    "https://timeapi.io/api/timezone/availabletimezones"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch timezones");
  }
  return await response.json();
}
