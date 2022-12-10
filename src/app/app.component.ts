import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public testList: any[] = [];

  constructor(
    private store: AngularFirestore,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('en');
    translateService.use('en');
  }
  ngOnInit(): void {
    this.runTest();
  }

  private runTest = async () => {
    this.store.collection('Test').get().subscribe((res) => {
      this.testList = res.docs.map((x) => x.data()) as [];
    });
  }
}
