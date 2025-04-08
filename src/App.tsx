import React, { useState, useEffect } from 'react';
import { Search, Wind, Droplets, RefreshCw, History, Sun, Moon, Loader2, CloudSun, Thermometer, MapPin } from 'lucide-react';

type WeatherData = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const fetchWeather = async (searchCity: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
      
      if (!recentSearches.includes(searchCity)) {
        setRecentSearches(prev => [searchCity, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark bg-[#0B1121]' : 'bg-gray-50'}`}>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-8 md:px-6 lg:px-8">
          <header className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 dark:bg-blue-600 rounded-2xl rotate-12 transform hover:rotate-0 transition-transform duration-300">
                <CloudSun className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Weather<span className="text-blue-500 dark:text-blue-400">Sense</span>
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </button>
          </header>

          <form onSubmit={handleSubmit} className="relative mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="w-full px-8 py-6 pl-16 rounded-3xl bg-white dark:bg-gray-800/80 backdrop-blur-xl text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 dark:text-gray-500" />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Search'}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl">
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {weather && (
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="p-8 bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{weather.name}</h2>
                      <p className="text-xl text-gray-600 dark:text-gray-300 capitalize">{weather.weather[0].description}</p>
                    </div>
                    <button
                      onClick={() => fetchWeather(weather.name)}
                      className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <RefreshCw className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-4">
                        <Thermometer className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                        <span className="text-6xl font-bold text-gray-800 dark:text-white">
                          {Math.round(weather.main.temp)}°
                        </span>
                      </div>
                    </div>
                    <div className="w-px h-16 bg-gray-200 dark:bg-gray-700" />
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                          <Droplets className="w-6 h-6 text-blue-500 dark:text-blue-400 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                          <p className="text-xl font-semibold text-gray-800 dark:text-white">{weather.main.humidity}%</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                          <Wind className="w-6 h-6 text-purple-500 dark:text-purple-400 mb-2" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                          <p className="text-xl font-semibold text-gray-800 dark:text-white">{weather.wind.speed} km/h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {recentSearches.length > 0 && (
                <div className="p-8 bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <History className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Searches</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => fetchWeather(search)}
                        className="w-full p-4 text-left bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">{search}</span>
                          <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
