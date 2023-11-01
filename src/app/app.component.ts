import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  message$: Observable<any>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.message$ = this.dataService.alertObservable;
  }
}
