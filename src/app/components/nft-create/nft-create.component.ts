import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NFT_ITEMS } from 'src/shared/constants/firebase-table-constants';

@Component({
  selector: 'app-nft-create',
  templateUrl: './nft-create.component.html',
  styleUrls: ['./nft-create.component.scss']
})
export class NftCreateComponent implements OnInit {

  public nftFormGroup!: FormGroup;

  // Used for spinner while saving
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: AngularFirestore,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.nftFormGroup = this.fb.nonNullable.group({
      name: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      providerName: new FormControl<string>('', [Validators.required])
    });


  }

  public submitForm = () => {
    this.loading = true;
    this.store.collection(NFT_ITEMS).add(this.nftFormGroup.value).then((res) => {
      this.toastr.success(this.translate.instant("firebase_example.nft_create_form.success"));
    }).catch((error) => {
      this.toastr.error(this.translate.instant("firebase_example.nft_create_form.errors.failed"));
      console.error(error);
    }).finally(() => {
      this.nftFormGroup.reset();
      this.loading = false;
    });
  }



}
