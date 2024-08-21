import "./globals.css";

export const metadata = {
  title: "2KWeather",
  description:
    "Simple weather app that makes use of the OpenWeatherMap API and three.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
