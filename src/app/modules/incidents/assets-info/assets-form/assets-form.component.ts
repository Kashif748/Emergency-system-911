import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {CategoryService} from 'src/app/_metronic/core/services/categories.service';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import AssetFormatter from './AssetFormatter';
import {OrgsService} from "../../../../_metronic/core/services/orgs.service";

@Component({
  selector: 'app-assets-form',
  templateUrl: './assets-form.component.html',
  styleUrls: ['./assets-form.component.scss'],
})
export class AssetsFormComponent implements OnInit {
  // UI
  form: FormGroup;

  // Variables
  loading: boolean;
  type: 'add' | 'edit';
  orgName: any[] = [];
  lang: string;
  assetsOffset = 0;
  private currentUser: any;
  organizations: any[] = [];
  organizationsI: any[] = [];
  //organizationsEdit: any[] = [];
  selectedAsset: { organization: any; category: any; asset: any } = {
    organization: null,
    category: null,
    asset: null,
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<AssetsFormComponent>,
    private incidentsService: IncidentsService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.currentUser = commonData['currentUserDetails'];
    this.lang = this.translationService.getSelectedLanguage();
    this.type = this.data && !this.data['incID'] ? 'edit' : 'add';
    this.orgName = this.data && this.data.org ? this.data.org : null;
    this.organizationsI = this.orgName;
    //this.loadAssets();
    if (this.type === "edit") {
      //this.loadAssets(this.data.orgStructure.id);
      this.organizationsI = this.data.orgStructure;
      this.form.patchValue({
        orgStructure: this.data.orgStructure.id
      });
    }
  }

  loadAssets(event?) {
    this.loading = true;
    this.incidentsService.getAssets(event).subscribe(
      (data) => {
        console.log(data);
        if (data) {
          this.organizations = AssetFormatter.groupByOrgsAndCategories(
            data.result
          );
          if (this.type === 'add') {
            this.fillCategories(this.organizations[0].id);
          }
           if (this.type === 'edit') {
            const organization = AssetFormatter.getOrganization(
              this.organizations,
              this.data.orgStructure.id
            );
            const category = AssetFormatter.getCategoryFromOrganization(
              organization,
              this.data.category.id
            );
            const asset = AssetFormatter.getAssetFromOrganization(
              organization,
              this.data.asset.id
            );
            const quantity = this.data.quantity;
            this.selectedAsset = {organization, category, asset};
            this.form.setValue({
              orgStructure: organization.id,
              category: category.id,
              asset: asset.id,
              quantity,
            });
          }
          this.changeDetectorRef.detectChanges();
          this.loading = false;
        }
      },
      (error) => {
      }
    );
  }
  fillCategories(id) {
    this.selectedAsset = {
      organization: AssetFormatter.getOrganization(this.organizations, id),
      category: null,
      asset: null,
    };
    this.form.get('quantity').setValue(null);
  }
  createForm() {
    this.form = new FormGroup({
      orgStructure: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      asset: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
    });

    this.form.get('orgStructure').valueChanges.subscribe((orgId) => {
      this.loadAssets(orgId);
      this.selectedAsset = {
        organization: AssetFormatter.getOrganization(this.organizations, orgId),
        category: null,
        asset: null,
      };
      this.form.get('quantity').setValue(null);
    });
    this.form.get('category').valueChanges.subscribe((catId) => {
      this.selectedAsset = Object.assign({}, this.selectedAsset, {
        category: AssetFormatter.getCategoryFromOrganization(
          this.selectedAsset.organization,
          catId
        ),
        asset: null
      });
      this.form.get('quantity').setValue(null);
    });

    this.form.get('asset').valueChanges.subscribe((assetId) => {
      this.selectedAsset.asset = AssetFormatter.getAssetFromOrganization(
        this.selectedAsset.organization,
        assetId
      );
      this.form
        .get('quantity')
        .setValidators([
          Validators.required,
          Validators.max(this.selectedAsset.asset.quantity),
          Validators.min(1),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]);
    });
  }

  submit() {
    const data = this.buildRequestBody();
    this.matDialogRef.close(data);
  }

  buildRequestBody() {
    const assetData = this.form.value;
    if (this.data?.id) {
      assetData.id = this.data?.id;
    }
    assetData.asset = {
      id: this.selectedAsset.asset.id,
    };
    assetData.category = {id: this.selectedAsset.category.id};
    assetData.orgStructure = {id: assetData.orgStructure};
    assetData.incident = this.data.incident;
    assetData.createdBy = this.currentUser;
    assetData.quantity = this.form.get('quantity').value;
    return assetData;
  }
}
