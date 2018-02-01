import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChartcontrolComponent } from './chartcontrol/chartcontrol.component';
import { QueryService } from './query.service';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartcontrolComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DpDatePickerModule
  ],
  providers: [
    QueryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
