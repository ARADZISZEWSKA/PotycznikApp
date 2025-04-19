import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/Services/report.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  isLoading = false;

  constructor(
    private router: Router,
    private reportService: ReportService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/settings-admin']);
  }

  downloadReport() {
    this.isLoading = true;

    this.loadingController.create({
      message: 'Generowanie raportu...'
    }).then(loading => {
      loading.present();

      this.reportService.getFullReport().subscribe({
        next: (response) => {
          const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
          const filename = `Raport_${timestamp}.xlsx`;
          this.reportService.saveFile(response, filename);
        },
        error: (err) => {
          console.error('Błąd pobierania raportu:', err);
          alert('Nie udało się pobrać raportu.');
          loading.dismiss();
          this.isLoading = false;
        },
        complete: () => {
          loading.dismiss();
          this.isLoading = false;
        }
      });
    });
  }

  
}
