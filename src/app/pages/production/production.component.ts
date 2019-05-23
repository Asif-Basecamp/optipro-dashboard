 import {Component,OnInit,TemplateRef} from '@angular/core';
 import {NbDialogService} from '@nebular/theme';
 import * as eva from 'eva-icons';
 import { GridComponent } from '@progress/kendo-angular-grid';
 import { State } from '@progress/kendo-data-query';

 
 @Component({
  selector: 'ngx-production',
  styleUrls: ['./production.component.scss'],
  templateUrl: './production.component.html',
 })
 
 export class ProductionComponent implements OnInit {
   ItemCodeData: any;
   gridStatus: boolean;
   searchCriteria: boolean;
   serviceData: any;
   selectedValues: any;

  constructor(private dialogService: NbDialogService) {}
  viewOptions = [
    { value: 'SimpleView', label: 'Simple View' },
    { value: 'DetailedView', label: 'Detailed View' },
  ];
  viewOption = 'SimpleView';

  materialViewOption = 'Show Immediate Components'; 

  ngOnInit() { 
   eva.replace()
  }
 
  open(dialog: TemplateRef < any > ) {
   this.dialogService.open(dialog);
  }
 
  process() {
   this.gridStatus = !this.gridStatus;
  }
 
  //Search criteria expand-shrink function  
  searchCriteriaToggle(event) {
   event.stopPropagation();
   if (document.getElementById("dashboard-left").classList.contains('shrink')) {
    document.getElementById("dashboard-left").classList.remove('shrink');
    document.getElementById("selection-criteria-body").style.height = '100%';
    document.getElementById("selection-criteria-body").style.display = 'flex';
    this.searchCriteria = false;
   } else {
    document.getElementById("dashboard-left").classList.add('shrink');
    document.getElementById("selection-criteria-body").style.height = '0';
    document.getElementById("selection-criteria-body").style.display = 'none';
    this.searchCriteria = true;
   }
  }
  searchCriteriaExpand() {
   if (this.searchCriteria && document.getElementById("dashboard-left").classList.contains('shrink')) {
    document.getElementById("dashboard-left").classList.remove('shrink');
    document.getElementById("selection-criteria-body").style.height = '100%';
    document.getElementById("selection-criteria-body").style.display = 'flex';
   }
  }
 
 
  onCheckboxClick(checked: any, index: number) {

    let servivceItem: any = this.serviceData[index];
    if (checked) {
      this.selectedValues.push(servivceItem);
    }
    else {
      // let rixd: number= this.selectedValues.findIndex(i => i.LOTNO == servivceItem.LOTNO && i.LOTNO == servivceItem.BINNO)
      this.selectedValues = this.selectedValues.splice(index, 1);
    }
  }

  onFilterChange(checkBox: any, grid: GridComponent) {
    if (checkBox.checked == false) {
      this.clearFilter(grid);
    }
  }
  clearFilter(grid: GridComponent) {
    this.clearFilters()
  }
  public state: State = {
    skip: 0,
    take: 5,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  };
  public clearFilters() {
    this.state.filter = {
      logic: 'and',
      filters: []
    };
  }
  //Custom accordian function
  customAccordianGrid(e) {
   if (document.getElementById("grid-accordian").classList.contains('expanded')) {
    this.hideAcordian(e);
    document.getElementById("custom-accordian").classList.remove('grid-accordian-open');
   } else {
    this.expandAcordian(e);
    document.getElementById("custom-accordian").classList.add('grid-accordian-open');
   }
  }
  // customAccordianAnalysis(e) {
  //  if (document.getElementById("analysis-accordian").classList.contains('expanded')) {
  //   this.hideAcordian(e);
  //   document.getElementById("custom-accordian").classList.remove('analysis-accordian-open');
  //  } else {
  //   this.expandAcordian(e);
  //   document.getElementById("custom-accordian").classList.add('analysis-accordian-open');
  //  }
  // }
  hideAcordian(e: any) {
   e.currentTarget.parentElement.parentElement.classList.remove('expanded')
   e.currentTarget.nextSibling.style.height = '0';
   e.currentTarget.nextSibling.style.display = 'none';
  }
  expandAcordian(e: any) {
   e.currentTarget.parentElement.parentElement.classList.add('expanded')
   e.currentTarget.nextSibling.style = '';
  }
 }