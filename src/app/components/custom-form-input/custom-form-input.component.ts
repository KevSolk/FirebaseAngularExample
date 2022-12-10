import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControlDirective, FormControlName, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-custom-form-input',
  templateUrl: './custom-form-input.component.html',
  styleUrls: ['./custom-form-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: CustomFormInputComponent
  }]
})
export class CustomFormInputComponent implements ControlValueAccessor, OnChanges {

  @Input() title!: string;

  public errorMessage!: string;

  public disabled: boolean = false;

  public isTouched: boolean = false;

  public value: any;

  public formControl!: AbstractControl;

  constructor(private injector: Injector) { }

  public ngOnChanges(_: SimpleChanges): void {
    this.formControl = this.injector.get(NgControl)?.control as AbstractControl;
  }

  private onChange: (val: any) => any = (val: any) => { };

  private onTouched: () => any = () => { };

  public writeValue = (obj: any): void => {
    this.value = obj;
  }

  public registerOnChange = (fn: any): void => {
    this.onChange = fn;
  }

  public registerOnTouched = (fn: any): void => {
    this.onTouched = fn;
  }

  public setDisabledState?= (isDisabled: boolean): void => {
    this.disabled = isDisabled;
  }

  public markAsTouched = () => {
    if (!this.isTouched) {
      this.isTouched = true;
      this.onTouched();
    }
    if (this.formControl) {
      if (this.formControl.errors && (this.formControl.dirty || this.formControl.touched)) this.errorMessage = "firebase_example.nft_create_form.errors.required";
      else this.errorMessage = '';
    }
  }

  public inputChange = (e: any) => {
    if (!this.disabled) {
      this.markAsTouched();
      this.writeValue(e.value);
      this.onChange(this.value);
    }
  }

  public triggedFocusOut = () => {
    this.markAsTouched();
    this.formControl?.updateValueAndValidity();
  }

}
