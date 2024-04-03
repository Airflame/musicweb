import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from 'moment'

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
    providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { 
     provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
   ],
    selector: 'app-year-picker',
    templateUrl: './year-picker.component.html',
    styleUrls: ['./year-picker.component.scss']
})
export class YearPickerComponent implements OnInit {

    public selectYear: any;

    @Output()
    yearSelected: EventEmitter<number> = new EventEmitter();

    ngOnInit(): void {
      throw new Error("Method not implemented.");
    }

    @ViewChild('picker', { static: false })
    private picker!: MatDatepicker<Date>;  

    chosenYearHandler(ev: any, input: any){
      let { _d } = ev;
      this.selectYear = _d;
      this.yearSelected.emit(ev.year());
      this.picker.close()
    }
}