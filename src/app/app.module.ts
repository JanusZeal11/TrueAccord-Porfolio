import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvestmentTableComponent } from './components/investment-table/investment-table.component';
import { PortfolioAllocationComponent } from './components/portfolio-allocation/portfolio-allocation.component';
import { MaterialModule } from './material.module';
import { PlanAllocationService } from './services/plan-allocation.service';
import { NotificationService } from './services/notification.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentTableComponent,
    PortfolioAllocationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    NotificationService,
    PlanAllocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
