import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/app-services/logs.service';
import { ILogs } from 'src/app/Models/logs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logsList: ILogs[];
  now = new Date();

  constructor(private _logsService: LogsService) {
    this.logsList = [];
    setInterval(() => {
      this.now = new Date();
    }, 20);
  }



  DateDiff = {
    difference: function (d1: Date, d2: Date) {
      if (typeof (d1) == 'string') {
        d1 = new Date(d1);
      }
      if (this.inDays(d1, d2) >= 7) {
        if (this.inDays(d1, d2) >= 30) {
          if (this.inMonths(d1, d2) >= 12) {
            // in year value
            return this.inYears(d1, d2) + " years";
          } else {
            // in month value
            return this.inMonths(d1, d2) + " months";
          }
        } else {
          // in weeks
          return this.inWeeks(d1, d2) + " weeks";
        }
      } else {
        if (this.inSecondes(d1, d2) < 60) {
          // insecondes
          return this.inSecondes(d1, d2) + " sec";
        } else {
          if (this.inMinutes(d1, d2) < 60) {
            // in minutes
            return this.inMinutes(d1, d2) + " min";
          } else {
            if (this.inHours(d1, d2) < 24) {
              // in hours 
              return this.inHours(d1, d2) + " hours";
            } else {
              // in days
              return this.inDays(d1, d2) + " days";
            }
          }
        }
      }
    },

    inHours: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      var res = (t2 - t1) / (3600 * 1000);
      return Math.trunc(res);
    },

    inMinutes: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      var res = (t2 - t1) / (60 * 1000);
      return Math.trunc(res);
    },

    inSecondes: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      var res = (t2 - t1) / (1000);
      return Math.trunc(res);
    },

    inDays: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      var res = (t2 - t1) / (24 * 3600 * 1000);
      return Math.trunc(res);
    },

    inWeeks: function (d1: Date, d2: Date) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();
      return Math.trunc((t2 - t1) / (24 * 3600 * 1000 * 7));
    },

    inMonths: function (d1: Date, d2: Date) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();
      return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: function (d1: Date, d2: Date) {
      return d2.getFullYear() - d1.getFullYear();
    }
  }

  typeOFF(data: any) {
    return typeof (data);
  }

  loadLogsData() {
    this._logsService.getAll().subscribe((data: Array<ILogs>) => {
      this.logsList = data;
    });
  }

  ngOnInit(): void {
    this.loadLogsData();
  }

}
