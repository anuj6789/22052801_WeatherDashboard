# WeatherDashboard

## Tech Stack

- **React** – UI library for building interactive user interfaces.
- **Vite** – Build tool for fast development.
- **TypeScript** – Provides static type checking.
- **TailwindCSS** – Utility-first CSS framework.
- **Lucide React** – Icon library for React.

## Setup

1. **Clone the repository**

   ```sh
   git clone 
   cd 22052801_WeatherDashboard
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the project root and add your OpenWeather API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**

   ```sh
   npm run dev
   ```

5. **Build for Production**

   ```sh
   npm run build
   ```

6. **Preview the Production Build**

   ```sh
   npm run preview
   ```

## API Limits

- The application uses the [OpenWeather API](https://openweathermap.org/api) for weather data.
- **Free Tier:** The free plan has a limit on the number of API calls per minute and per day. Check the [OpenWeather pricing](https://openweathermap.org/price) for detailed limits.