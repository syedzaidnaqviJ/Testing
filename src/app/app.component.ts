import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  city = 'New York';
  weather: any = null;
  forecast: any[] = [];

  constructor(private http: HttpClient) {
    this.getWeather();
  }

  getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
    this.http.get(url).subscribe((data: any) => {
      this.weather = data;
      this.getForecast();
    });
  }

  getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=metric`;
    this.http.get(url).subscribe((data: any) => {
      const daily = data.list.filter((_: any, index: number) => index % 8 === 0);
      this.forecast = daily.map((entry: any) => ({
        date: new Date(entry.dt_txt),
        temp: Math.round(entry.main.temp),
        icon: entry.weather[0].icon,
      }));
    });
  }

  getIconUrl(iconCode: string) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
