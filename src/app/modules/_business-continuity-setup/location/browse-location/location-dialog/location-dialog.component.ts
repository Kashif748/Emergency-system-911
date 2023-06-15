import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncidentsService} from "../../../../../_metronic/core/services/incidents.service";
import {GenericValidators} from "@shared/validators/generic-validators";
import {Dialog} from "primeng/dialog";
import {ActivatedRoute} from "@angular/router";
import {MapComponent} from "@shared/sh-components/map/map.component";
import {MapViewType} from "@shared/components/map/utils/MapViewType";
import {TaskState} from "@core/states";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(Dialog) dialog: Dialog;
  public get asDialog() {
    return this.route.component !== LocationDialogComponent;
  }
  @ViewChild('mapContainer', { read: ViewContainerRef })
  mapContainer: ViewContainerRef;
  mapComponent: MapComponent;

  public locType = [
    {id: 1, nameEn: "choose from map", nameAr: "test1"},
    {id: 2, nameEn: "list", nameAr: "test2"},
  ];
  // variable
  public display = false;
  form: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected incidentService: IncidentsService,
    private route: ActivatedRoute,
    private injector: Injector,
    private store: Store,
    private cfr: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.buildForm();

  }
  ngAfterViewInit() {
  }
  openDialog(groupId?: number) {
    this.display = true;
    this.mapContainer?.clear();
    this.mapComponent = undefined;
    this.loadMapComponent();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameEn: [null, [Validators.required, GenericValidators.english]],
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      locType: [null, [Validators.required, GenericValidators.english]],
      District: [null, [Validators.required]],
      longitude: [null],
      latitude: [null]
    });
  }
  close() {
    if (this.asDialog) {
      this.display = false;
      // this.store.dispatch(new BrowseTasksAction.ToggleDialog({}));
    } else {
      // this.router.navigate(this.redirect, { relativeTo: this.route });
    }
  }
  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }
  async loadMapComponent() {
    if (this.mapComponent) return;

    this.mapContainer?.clear();
    const { MapComponent } = await import(
      '@shared/sh-components/map/map.component'
      );
    const factory = this.cfr.resolveComponentFactory(MapComponent);

    const { instance, changeDetectorRef: cdr } =
      this.mapContainer.createComponent(factory, null, this.injector);

    const task = this.store.selectSnapshot(TaskState.task);
    const taskLocation = !this.viewOnly || task.featureName;

    instance.config = {
      mapType: taskLocation ? MapViewType.TASK : MapViewType.INCIDENT,
      showSaveButton: false,
      zoomModel: {
        referenceId: taskLocation ? task?.id : (task.incidentId as any)?.id,
        featureName: taskLocation
          ? (task?.featureName as any)
          : (task.incidentId as any)?.featureName,
      },
      showLayers: false,
      viewOnly: this.viewOnly,
    };

    instance.OnSaveMap.subscribe((response) => {
      this.form.get('featureName').patchValue(response?.gType);
      if (response) {
        this.form.get('newLocation').patchValue(true);
      }
      cdr.detectChanges();
    });

    this.mapComponent = instance;
    cdr.detectChanges();
  }
}
