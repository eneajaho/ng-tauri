import { Component } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Welcome to Tauri + Angular!</h1>

      <!-- NOTE: App will crash if you are on macos 12.1 or lower (known issue) -->
      <div class="row">
        <a href="https://tauri.app" (mouseover)="$event.stopPropagation()" target="_blank">
          <img src="/assets/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://angular.io" target="_blank">
          <img src="/assets/angular.svg" class="logo angular" alt="Angular logo" />
        </a>
      </div>

      <p>Click on the logos to learn more about the frameworks</p>

      <div class="row">
        <div>
          <input #nameInput placeholder="Enter a name..." />
          <button type="button" (click)="greet(nameInput.value)">Greet</button>
        </div>
      </div>

      <p>{{ greetingMessage }}</p>
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  greetingMessage = '';

  greet(name: string): void {
    invoke<string>('greet', { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
