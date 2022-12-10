import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss']
})
export class HeaderNavigationComponent implements OnInit {

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

  /**
   * 
   * Sets site language to Japanese
   */
  public setToJapanese = (e:any) => {
    this.preventDefault(e);
    this.translateService.use('jp');
  }

  /**
   * 
   * Sets site language to English
   */
  public setToEnglish = (e:any) => {
    this.preventDefault(e);
    this.translateService.use('en');
  }

  /**
   * 
   * Disables a tag href navigation
   * 
   */
  public preventDefault = (e:any) => e.preventDefault();
}
