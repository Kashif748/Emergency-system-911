import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import * as _ from 'lodash';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {PrivilegesService} from 'src/app/core/services/privileges.service';
import {TranslationService} from '../../i18n/translation.service';
import {IncidentsService} from '../../../_metronic/core/services/incidents.service';
import {DateTimeUtil} from '@core/utils/DateTimeUtil';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';
import {FilterTaskType} from './FilterTaskType';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  // UI
  @ViewChild('searchbar') searchbar: ElementRef;

  // Variables.
  public currentDate = new Date();
  public defaultStatusValues = [1,2,3,5,6];
  // created by my org tasks
  createdByMyOrgTasks: any[] = [];
  createdByMyOrgPaginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'first',
  };
  // assigned to me tasks
  assignedToMeTasks: any[] = [];
  assignedToMePaginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'second',
  };

  lang = 'en';
  currentTab = 'incoming';
  filter = '';
  commonData: any;
  status$ = this.incidentService.getTasksStatus().pipe(map((r) => r.result));
  priorities$ = this.incidentService
    .getPriorities()
    .pipe(map((r) => r.result.content));
  filterTasksForm: FormGroup;
  maxDate: Date;
  minDate: Date;
  private subscriptions: Subscription[] = [];
  searchText = '';
  toggleSearch = false;
  public filterTasksType: FilterTaskType = FilterTaskType.INCOMING;
  public loadingAssignedToMe = false;
  public loadingCreatedByMyOrg = false;
  private sortState: { active: string; direction: 'asc' | 'desc' } = {active: 'dueDate', direction: 'desc'};
  private sortAssignedToMeState: { active: string; direction: 'asc' | 'desc' } = {active: 'dueDate', direction: 'desc'};
  updatedTask = {id: null};

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private incidentService: IncidentsService,
    private alertService: AlertsService,
    private route: ActivatedRoute,
    private privilegesService: PrivilegesService,
    private readonly customDate: CustomDatePipe,
    private location: Location
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = JSON.parse(localStorage.getItem('commonData'));
    this.createFilterTaskFormFields();
    this.route.params.subscribe((params) => {
      if (params['filter'] === 'incoming') {
        this.filterTasksType = FilterTaskType.INCOMING;
        this.filterTasksForm.get('status').setValue(this.defaultStatusValues);
        this.loadAssignedToMeTasks(0, this.filterTasksForm.value);
      } else {
        this.filterTasksForm.get('status').setValue(this.defaultStatusValues);
        this.filterTasksType = FilterTaskType.OUTGOING;
        this.loadCreatedByMyOrgTasks(
          0,
          this.filterTasksForm.value,
          this.sortState
        );
      }
    });
  }

  sortChange(event) {
    this.sortState = event;
    this.pageChanged(this.createdByMyOrgPaginationConfig.currentPage);
  }

  sortChangeAssignedToMe(event) {
    this.sortAssignedToMeState = event;
    this.pageChangeForMyTasks(this.assignedToMePaginationConfig.currentPage);
  }

  async selectionChange(event: any) {
    this.filterTasksType = event.value;
    if (this.filterTasksType === FilterTaskType.INCOMING) {
      this.clearAssignedToMeSearch();
      await this.router.navigate(['incidents', 'tasks', 'incoming']);
    } else {
      this.clearCreatedByMyOrgSearch();
      await this.router.navigate(['incidents', 'tasks', 'outgoing']);
    }
  }

  createFilterTaskFormFields() {
    this.filterTasksForm = this.fb.group({
      status: [''],
      title: [''],
      priority: [''],
      dueDate: [''],
      desc: [''],
      incidentId:[''],
      serial :['']
    });
  }

  async viewTasks(id) {
    await this.router.navigate(['incidents/viewTask', id]);
  }

  async updateTask(id) {
    await this.router.navigate(['incidents/updateTask', id]);
  }

  async createTask(title, id) {
    await this.router.navigate(['incidents/createTask', {title, id}]);
  }

  pageChanged(event) {
    this.createdByMyOrgPaginationConfig.currentPage = event;
    this.loadCreatedByMyOrgTasks(
      event,
      this.filterTasksForm.value,
      this.sortState
    );
  }

  taskMap = (data) => {
    const tasks = data.result.content as any[];
    tasks.forEach(async (task) => {
      task.body = `${task.body?.substr(0, 50)?.substr(0, 50)} ${
        task?.body?.length > 50 ? '...' : ''
      }`;

      task.dueDate = new Date(task.dueDate);
      // set task priority
      if (!_.isEmpty(this.commonData)) {
        task.priority = {id: task?.priority?.id ?? task?.priorityId};
        task.priority = _.find(this.commonData.priorities, [
          'id',
          task?.priority?.id,
        ]);
      }

      // set task status
      if (!_.isEmpty(this.commonData)) {
        task.status = {id: task.status?.id ?? task.statusId};
        const status = _.find(this.commonData.taskStatus, [
          'id',
          task?.status?.id,
        ]);
        if (!_.isEmpty(status)) {
          task.status.name = this.lang === 'en' ? status.nameEn : status.nameAr;
        }
      }
    });
    return {tasks, totalElements: data?.result?.totalElements};
  }

  private loadCreatedByMyOrgTasks(page, search, sort) {
    this.loadingCreatedByMyOrg = true;
    this.incidentService
      .getMyOrgTasks(page <= 0 ? 0 : page - 1, search, sort)
      .pipe(map(this.taskMap))
      .subscribe(
        (data) => {
          if (data?.tasks) {
            this.createdByMyOrgTasks = data?.tasks;
            this.createdByMyOrgPaginationConfig.totalItems = data.totalElements;
            this.dueDateTasks();
            this.loadingCreatedByMyOrg = false;
            this.cd.detectChanges();
          }
        },
        (e) => {
          console.log(e);
          this.alertService.openFailureSnackBar();
          this.loadingCreatedByMyOrg = false;
          this.cd.detectChanges();
        }
      );
  }

  dueDateTasks() {
    if (this.filter === 'outdate') {
      this.assignedToMeTasks = this.assignedToMeTasks.filter((item) => {
        if (item.dueDate && new Date(item.dueDate) < new Date()) {
          return item;
        }
      });
      this.assignedToMePaginationConfig.totalItems = (
        this.assignedToMePaginationConfig as any
      ).length;

      this.createdByMyOrgTasks = this.createdByMyOrgTasks.filter((item) => {
        if (item.dueDate && new Date(item.dueDate) < new Date()) {
          return item;
        }
      });
      this.createdByMyOrgPaginationConfig.totalItems = (
        this.createdByMyOrgPaginationConfig as any
      ).length;
      this.cd.detectChanges();
    }
  }

  pageChangeForMyTasks(event) {
    this.assignedToMePaginationConfig.currentPage = event;
    this.loadAssignedToMeTasks(event, this.filterTasksForm.value);
  }

  private loadAssignedToMeTasks(page, search) {
    this.loadingAssignedToMe = true;
    this.incidentService
      .getMyAssignedOrgTasks(
        page <= 0 ? 0 : page - 1,
        search,
        this.sortAssignedToMeState
      )

      .pipe(map(this.taskMap))
      .subscribe(
        (data) => {
          if (data?.tasks) {
            this.assignedToMeTasks = data?.tasks;
            this.assignedToMePaginationConfig.totalItems = data.totalElements;
            this.dueDateTasks();
            this.loadingAssignedToMe = false;
            this.cd.detectChanges();
          }
        },
        (e) => {
          console.log('error', e);
          this.alertService.openFailureSnackBar();
          this.loadingAssignedToMe = false;
          this.cd.detectChanges();
        }
      );
  }

  public clearCreatedByMyOrgSearch() {
    this.filterTasksForm.reset({
      status: '',
      priority: '',
      dueDate: '',
      desc: '',
      title: '',
      incidentId:'',
      serial: ''
    });
  }

  public clearAssignedToMeSearch() {
    this.filterTasksForm.reset({
      status: '',
      priority: '',
      dueDate: '',
      desc: '',
      title: '',
      incidentId:'',
      serial :''
    });
  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  onSubmit() {
    if (this.filterTasksType === FilterTaskType.OUTGOING) {
      if (this.filterTasksForm.value.dueDate !== '') {
        this.filterTasksForm.value.dueDate =
          DateTimeUtil.format(this.filterTasksForm.value.dueDate, DateTimeUtil.DATE_FORMAT);
      }
      this.createdByMyOrgPaginationConfig.currentPage = 0;
      this.loadCreatedByMyOrgTasks(
        1,
        this.filterTasksForm.value,
        this.sortState
      );
    } else {
      // incoming or assigned to me tasks.
      this.onMyTaskSubmit();
    }
  }

  onMyTaskSubmit() {
    if (this.filterTasksForm.value.dueDate !== '') {
      this.filterTasksForm.value.dueDate =
        DateTimeUtil.format(this.filterTasksForm.value.dueDate, DateTimeUtil.DATE_FORMAT);
    }
    this.assignedToMePaginationConfig.currentPage = 0;
    this.loadAssignedToMeTasks(1, this.filterTasksForm.value);
  }

  isDateElapsed(date) {
    const currentDateUAE = this.customDate.transform(date);
    return DateTimeUtil.isDateElapsed(currentDateUAE);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  clearFilterAndLoadTasks() {
    this.clearAssignedToMeSearch();
    this.clearCreatedByMyOrgSearch();
    this.onSubmit()

  }

  getTaskCreatorAndOrgName(task: any) {
    let taskCreator = '';
    if (this.lang === 'ar') {
      if (task?.createdBy?.firstNameAr) {
        taskCreator += task?.createdBy?.firstNameAr;
      }
      if (task?.createdBy?.lastNameAr) {
        taskCreator += ' ' + task?.createdBy?.lastNameAr;
      }
      if (task?.createdBy?.orgStructure?.nameAr) {
        taskCreator += ' / ' + task?.createdBy?.orgStructure?.nameAr;
      }
    } else {
      if (task?.createdBy?.firstNameEn) {
        taskCreator += task?.createdBy?.firstNameEn;
      }
      if (task?.createdBy?.lastNameEn) {
        taskCreator += ' ' + task?.createdBy?.lastNameEn;
      }
      if (task?.createdBy?.orgStructure?.nameAr) {
        taskCreator += ' / ' + task?.createdBy?.orgStructure?.nameEn;
      }
    }
    return taskCreator;
  }

  getTaskAssignedTo(task: any) {
    return this.lang === 'en' ? task.assignTo?.nameEn : task.assignTo?.nameAr;
  }


  back() {
    this.location.back();
  }
}
