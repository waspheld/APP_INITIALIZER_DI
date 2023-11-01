import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

function appInitializerUsingPromises(
  dataService: DataService
): () => Promise<any> {
  return () =>
    new Promise((resolve, reject) => {
      dataService
        .initialiseAppUsingPromises()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          resolve(true);
        });
    });
}

function appInitializerUsingObservables(
  dataService: DataService
): () => Observable<any> {
  return () => dataService.initialiseAppUsingObservables();
}

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      //useFactory: appInitializerUsingObservables,
      useFactory: appInitializerUsingPromises,
      deps: [DataService],
      multi: true,
    },
  ],
})
export class AppModule {}
