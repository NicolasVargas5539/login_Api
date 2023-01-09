import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [`
  .h-custom {
  height: calc(100% - 73px);
  }
  @media (max-width: 450px) {
    .h-custom {
    height: 100%;
    }
  }
  `
  ]
})
export class MainComponent {

}
