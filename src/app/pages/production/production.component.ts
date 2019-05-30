 import {Component,OnInit,TemplateRef} from '@angular/core';
 import {NbDialogService} from '@nebular/theme';
 import * as eva from 'eva-icons';
 import { GridComponent } from '@progress/kendo-angular-grid';
 import { State } from '@progress/kendo-data-query';
 import {DashboardService} from 'src/app/service/dashboard.service';
 import { ProductionService } from 'src/app/service/production.service';
 import {NbToastrService} from '@nebular/theme';
 
 export interface TreeNode {
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
}

 @Component({
  selector: 'ngx-production',
  styleUrls: ['./production.component.scss'],
  templateUrl: './production.component.html',
 })
 
 export class ProductionComponent implements OnInit {
   public language: any;
   public ItemData: any;
   gridStatus: boolean;
   searchCriteria: boolean;
   serviceData: any;
   selectedValues: any;
   public arrConfigData: any;
   public CompanyDB: any;
   public lookUpHeading: any;
   public gridData: any[];
   public gridViewData: any[];
   public gridWOFG: any[];
   public gridMaterial: any[];
   public gridOperation: any[];
   public gridResource: any[];   
   public ItemFrom: boolean = false;
   public ItemTo: boolean = false; 
   public ItemCodeFrom: any = '';
   public ItemCodeTo: any = '';
   public nodes2: any = [];
   public RadioBtnWO: any = 'simple';
   public materialViewOption: any = 'IMMEDIATE';
   public FromDate: any ;
   public ToDate: any ;
   public itemFromStatus:boolean = false;
   public itemToStatus:boolean = false;

  // FromDate = new Date().toLocaleString();
   //ToDate = new Date().toLocaleString();
   
   public tableTreeData: any = [];
   files2: TreeNode[];
 
  constructor(private dialogService: NbDialogService,private dash: DashboardService,private prod: ProductionService,private toastrService: NbToastrService) {}
  viewOptions = [
    { value: 'SIMPLE', label: 'Simple View' },
    { value: 'DetailedView', label: 'Detailed View' },
  ];
  viewOption = 'SIMPLE';
   
  
  ngOnInit() { 
   this.language = JSON.parse(window.localStorage.getItem('language'));
   this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData'));   
   this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
   this.FromDate = new Date().toLocaleString();
   this.ToDate = new Date().toLocaleString();
   
   this.getItemData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB);
   eva.replace()   
  }
 
  open(dialog: TemplateRef < any > ) {
   this.dialogService.open(dialog);
  }
 
  process() {
   this.gridStatus = !this.gridStatus;
  }

  getItemData(api, companyDB){
    this.dash.GetItemList(api, companyDB).subscribe(
      data => {
        this.ItemData = data;
      });    
  }

  openItemFromLookup(dialog: TemplateRef<any>){ 
    if(!this.ItemData){
      this.getItemData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB);
    }        
      this.lookUpHeading = 'Item From';
      this.gridData = this.ItemData;
      this.dialogService.open(dialog);
      this.ItemFrom = true;
      this.ItemTo = false;
  }

  onItemFromBlur(){
    let item = this.ItemCodeFrom;
    let itemFromArray = [];
    if(item){
      for(var i in this.ItemData){
        if(item === this.ItemData[i].ItemCode){
          itemFromArray.push(this.ItemData[i]);
        }
      }
      if(itemFromArray.length>0){
        this.itemFromStatus = false;
      }else{
        this.itemFromStatus = true;
      }
    }else{
        this.itemFromStatus = false;
    } 
  }
 
  openItemToLookup(dialog: TemplateRef<any>){
    if(!this.ItemData){
      this.getItemData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB);
    }        
      this.lookUpHeading = 'Item To';
      this.gridData = this.ItemData;
      this.dialogService.open(dialog);
      this.ItemFrom = false;
      this.ItemTo = true;
  }

  onItemToBlur(){
    let items = this.ItemCodeTo;
    let itemToArray = [];
    if(items){
      for(var i in this.ItemData){
        if(items === this.ItemData[i].ItemCode){
          itemToArray.push(this.ItemData[i]);
        }
      }
      if(itemToArray.length>0){
        this.itemToStatus = false;
      }else{
        this.itemToStatus = true;
      }
    }else{
        this.itemToStatus = false;
    } 
  }

  gridRowSelectionChange(evt, ref) {
    if (this.ItemFrom) {
     //this.dataGridSelectNum = evt.selectedRows[0].index;
     this.ItemCodeFrom = evt.selectedRows[0].dataItem.ItemCode;
    }
    else if (this.ItemTo) {
     this.ItemCodeTo = evt.selectedRows[0].dataItem.ItemCode;
    } 
    ref.close();
   }

   gridRowSelectFG(evt){
     let name = evt.selectedRows[0].dataItem.ItemCode;
     this.getWorkOrder(name);
   }

   gridRowSelectDocEntry(evt){
    let docentry = evt.selectedRows[0].dataItem.DocEntry;
    this.getMaterials(docentry,'');
  }

   getWorkOrder(itemName){

    this.prod.GetWorkOrderFG(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, itemName, this.RadioBtnWO,'1,6,4,3', this.FromDate, this.ToDate).subscribe(
      data => {
          this.gridWOFG = data;          
          this.getMaterials(this.gridWOFG[0].DocEntry,this.gridWOFG[0].ItemCode);
          this.getOperations(this.gridWOFG[0].DocEntry);
          this.getResources(this.gridWOFG[0].U_O_PRODID);
      },
      error => {
        this.toastrService.danger(this.language.no_record_found);    
     })
   }

   getMaterials(DocEntry,ItemCode){
    
      this.prod.GetMaterialData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DocEntry, ItemCode, this.materialViewOption,
        this.FromDate, this.ToDate, '1,6,4,3').subscribe(
        data => {
            this.gridMaterial = data;       
        },
        error => {
          this.toastrService.danger(this.language.no_record_found);    
      })    
   }

   getOperations(DocEntry){
    
      this.prod.GetOperationData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DocEntry).subscribe(
        data => {
            this.gridOperation = data;       
            
        },
        error => {
          this.toastrService.danger(this.language.no_record_found);    
      })    
   }

   getResources(DocEntry){

    this.prod.GetResourceData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DocEntry).subscribe(
      data => {
          this.gridResource = data;       
          
      },
      error => {
        this.toastrService.danger(this.language.no_record_found);    
    })  

   }

   getHierarchy(dataa, Seq){
    let node = [];
    dataa.filter(function(d){
      if(d.data.ParantId == Seq){
        return d.data.ParantId == Seq
      }
    }).forEach(function(d){
     var cd = d;
     cd.children = this.getHierarchy(dataa, d.data.SeqNo);
     return node.push(cd);
   }.bind(this))
    return node;
  }

   GetExplosionData() {

  //  this.FromDate = new Date().toLocaleString();
  //  this.ToDate = new Date().toLocaleString();
    
    this.prod.GetItemExplosionData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemCodeFrom, this.ItemCodeTo, this.viewOption, this.FromDate, this.ToDate).subscribe(
      data => {
        this.gridViewData = data;
        let Arr = [];
        if(this.gridViewData){
        for(var i=0; i<this.gridViewData.length; i++){
         if(this.gridViewData[i]){
             Arr.push({data : this.gridViewData[i]});
         }
        } 
        }
        this.nodes2 = this.getHierarchy(Arr, '-1');
        this.files2 = this.nodes2;
      },
      error => {
        this.toastrService.danger(this.language.no_record_found);    
      })
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
 