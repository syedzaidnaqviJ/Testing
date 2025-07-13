import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-dashboard',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div class="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 class="text-3xl font-bold text-white mb-4">Weather Dashboard</h1>
        <input [(ngModel)]="city" placeholder="Enter City" class="p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-white/50" />
        <button (click)="getWeather()" class="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
          Get Weather
        </button>

        <div *ngIf="weatherData" class="mt-6 text-white space-y-2">
          <h2 class="text-2xl font-bold">{{ weatherData.name }}</h2>
          <p class="text-xl">{{ weatherData.weather[0].description | titlecase }}</p>
          <p class="text-5xl font-bold">{{ weatherData.main.temp }}°C</p>
          <div class="flex justify-center gap-4 text-base mt-2">
            <span>Humidity: {{ weatherData.main.humidity }}%</span>
            <span>Wind: {{ weatherData.wind.speed }} m/s</span>
          </div>
        </div>

        <div *ngIf="error" class="mt-4 text-red-200 font-semibold">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class WeatherDashboardComponent implements OnInit {

  city: string = '';
  weatherData: any;
  error: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  getWeather() {
    this.error = '';
    if (!this.city) {
      this.error = 'Please enter a city name.';
      return;
    }

    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.error = '';
      },
      error: () => {
        this.error = 'City not found or an error occurred.';
        this.weatherData = null;
      }
    });
  }
}
