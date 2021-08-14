import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvestmentTableComponent } from './components/investment-table/investment-table.component';
import { PortfolioAllocationComponent } from './components/portfolio-allocation/portfolio-allocation.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentTableComponent,
    PortfolioAllocationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
