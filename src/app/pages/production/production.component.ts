import {Component,OnInit,TemplateRef,ViewChild} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import {DashboardService} from 'src/app/service/dashboard.service';
import { ProductionService } from 'src/app/service/production.service';
import {NbToastrService} from '@nebular/theme';
import { CountdownComponent } from 'ngx-countdown';
import { RowArgs } from '@progress/kendo-angular-grid';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
   serviceApiData: any[];
   lookupfor: string;
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
   public materialViewOption: any = 'immediate';
   public FromDate: any ;
   public ToDate: any ;
   showLookup: boolean = false;
   public itemFromStatus:boolean = false;
   public itemToStatus:boolean = false;
   public checkboxStatus:boolean = false;
   loading = false;
   public showView: any = '';
   public showMaterialView: any = '';
   public tableTreeData: any = [];
   files2: TreeNode[];
   masterSelected:boolean;
   checklist:any;
   checkedList:any;
   public Tabloading:boolean = false;
   public refreshStatus:boolean = false;
   @ViewChild('countdown') counter: CountdownComponent;
   times: any;
   time: any;
   refreshCheck: any;
   public itemName: any = '';
   public DocEntry: any = '';
   public ItemCode: any = '';
   public showgridWOPage: boolean = false;
   public showgridMaterialPage: boolean = false;
   public showgridOperationPage: boolean = false;
   public showgridResourcePage: boolean = false;
   public ItemCodeSelected: any;
   public GridViewSelected: any;
   public WOSelected: any;
   public Hour: any;
   Hours: any;
   public value: any;
   public hour: any;
   public myVar: any;
   public RadioBtnInventShort: any = 'Warehouse';
   public WHInventShort: boolean = false;
   public CmpInventShort: boolean = false;
   isColumnFilter1 = true;
   public hours: any;
   public minutes: any;
   public seconds: any;
   public viewOptions: any;
   public viewOption: any;

  constructor(private router: Router, private datePipe: DatePipe, private dialogService: NbDialogService,private dash: DashboardService,private prod: ProductionService,private toastrService: NbToastrService) {}
  
  ngOnInit() { 
   this.language = JSON.parse(window.localStorage.getItem('language'));
   this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData'));   
   this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
   this.FromDate = new Date();
   this.ToDate = new Date();
   this.masterSelected = true;
   this.checklist = [
     {id:1, name:this.language.In_Process, value: '6', isSelected:false},
     {id:2, name:this.language.New, value: '1', isSelected:false},
     {id:3, name:this.language.Close, value: '4', isSelected:false},
     {id:4, name:this.language.Cancel, value: '3', isSelected:false}
   ];
   this.getCheckedItemList();
   this.checkUncheckAll();
   this.getItemData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB);  
   let WoSelect = [];
   this.WOSelected = (e: RowArgs) => WoSelect.indexOf(e.dataItem.DocEntry) >=0 ;

  this.viewOptions = [
    { value: 'SIMPLE', label: this.language.simple_View },
    { value: 'Multi', label: this.language.detail_view },
  ];
  this.viewOption = 'SIMPLE';  
  }

  open(dialog: TemplateRef < any > ) {
   this.dialogService.open(dialog);
  }
 
  process() {
   this.gridStatus = !this.gridStatus;
  }

  getItemData(api, companyDB){
    this.prod.GetItemList(api, companyDB).subscribe(
      data => {
        this.ItemData = data;
      });    
  } 

 showDetailCompleteLookup(data){
   this.prod.GetCompletedQtyDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, data.U_O_ORDRNO).subscribe(
     data => {
       if(data != undefined && data != null){
         if(data.length > 0){
          this.showLookup = true;
          this.serviceApiData = data;
          this.lookupfor = "showCompleteLookup";
         }
         else {
          this.toastrService.danger(this.language.no_record_found);    
         }       
       }
       else {
        this.toastrService.danger(this.language.no_record_found);    
       }
       
     },
     error => {
       this.toastrService.danger(this.language.no_record_found);    
    })
 }

 showDetailsIssuedLookup(data){
   this.prod.GetIssuedQtyDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, data.U_O_COMPID,data.DocEntry).subscribe(
     data => {
        if(data != undefined && data != null){
         if(data.length > 0){
          this.showLookup = true;
          this.serviceApiData = data;
          this.lookupfor = "showIssuedLookup";
         }
         else {
          this.toastrService.danger(this.language.no_record_found);    
         }
       
       }
       else {
        this.toastrService.danger(this.language.no_record_found);    
       }
     },
     error => {
       this.toastrService.danger(this.language.no_record_found);    
    })
 }

 showDetailsInStockLookup(Inputdata,check,allGrid){
   
   if(check == 'WH'){
     this.prod.GetWarehouseWiseInStockQtyDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, Inputdata.U_O_COMPID, Inputdata.U_O_ISSWH).subscribe(
       data => {
          if(data != undefined && data != null){
           if(data.length > 0){
            this.showLookup = true;
            this.serviceApiData = data;
            this.lookupfor = "showInStockLookup";
           }
           else {
            this.toastrService.danger(this.language.no_record_found);    
           }
          
         }
         else {
          this.toastrService.danger(this.language.no_record_found);    
         }
       },
       error => {
         this.toastrService.danger(this.language.no_record_found);    
      })
   }
   else  if(check == 'CP'){

    let itemCode = '';
    if(allGrid == true)
    itemCode = Inputdata.ItemCode;
     else
    itemCode = Inputdata.U_O_COMPID;

     this.prod.GetInStockQtyDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, itemCode).subscribe(
       data => {         
         if(data != undefined && data != null){
           if(data.length > 0){
            this.showLookup = true;
            this.serviceApiData = data;
            this.lookupfor = "showInStockLookup"; 
           }
           else {
            this.toastrService.danger(this.language.no_record_found);    
           }           
         }
         else {
          this.toastrService.danger(this.language.no_record_found);    
         }
       },
       error => {
         this.toastrService.danger(this.language.no_record_found);    
      })
   }
   
 }

  ItemRowSelect(itemName){
    this.getWorkOrder(itemName.ItemCode);
  }

   
  // multiple checkbox selection criteria 
  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  
  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
  
  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i].isSelected)
      this.checkedList.push(this.checklist[i].value);
    }
    if(this.checkedList.length>0){
      this.checkboxStatus =  false;
    }
  } 

   getWorkOrder(itemName){
    this.loading = true; 
    this.itemName = itemName;
    this.prod.GetWorkOrderFG(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, itemName, this.RadioBtnWO, this.checkedList.toString(), this.FromDate, this.ToDate).subscribe(
      data => {
          if(!data){
              this.gridMaterial = [];
              this.gridOperation = [];
              this.gridResource = [];
           }else{
            this.gridWOFG = data; 
            if(this.gridWOFG.length > 10)
            this.showgridWOPage = true;
            else
            this.showgridWOPage = false;

            if(this.gridWOFG.length > 0){
            this.getMaterials(this.gridWOFG[0].DocEntry,this.gridWOFG[0].U_O_PRODID);
            this.getOperations(this.gridWOFG[0].DocEntry);
            this.getResources(this.gridWOFG[0].DocEntry);
            }
            else{
              this.gridMaterial = [];
              this.gridOperation = [];
              this.gridResource = [];
            }
          }
         this.loading = false;
      },
      error => {
        this.loading = false;
        this.toastrService.danger(this.language.no_record_found);    
     })
    }

 showDetailsOnOrderLookup(Inputdata,check,allGrid){
   if(check == 'WH'){
     
     this.prod.GetWarehouseWiseOnOrderQtyDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, Inputdata.U_O_COMPID, Inputdata.U_O_ISSWH).subscribe(
       data => {
        if(data != undefined && data != null){
          if(data.length > 0){
            this.showLookup = true;
            this.serviceApiData = data;
            this.lookupfor = "showOnOrderLookup";
          }
          else {
            this.toastrService.danger(this.language.no_record_found);    
          }
        }
        else {
          this.toastrService.danger(this.language.no_record_found);    
        }         
        
       },
       error => {
         this.toastrService.danger(this.language.no_record_found);    
      })

   }
   else if(check == 'CP'){
     let itemCode = '';
     if(allGrid == true)
     itemCode = Inputdata.ItemCode;
      else
     itemCode = Inputdata.U_O_COMPID;

     this.prod.GetOnOrderQtyDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, itemCode).subscribe(
       data => {
        if(data != undefined && data != null){
          if(data.length > 0){
            this.showLookup = true;
            this.serviceApiData = data;
            this.lookupfor = "showOnOrderLookup";
          }
          else {
            this.toastrService.danger(this.language.no_record_found);    
          }
        }
        else {
          this.toastrService.danger(this.language.no_record_found);    
        }        
        
       },
       error => {
         this.toastrService.danger(this.language.no_record_found);    
      })
   }
   
 }

  openItemFromLookup(dialog: TemplateRef<any>){ 
    let itemFromSelect = [];
    if(this.isColumnFilter1 == true){
      this.isColumnFilter1 = !this.isColumnFilter1;
    }
     this.clearFilters();
    if(this.ItemCodeFrom){
      itemFromSelect.push(this.ItemCodeFrom);
      this.ItemCodeSelected = (e: RowArgs) => itemFromSelect.indexOf(e.dataItem.ItemCode) >=0 ;
    }else{
      this.ItemCodeSelected = (e: RowArgs) => itemFromSelect.indexOf(e.dataItem.ItemCode) >=0 ;
    } 
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
  let itemToSelect = [];
  if(this.isColumnFilter1 == true){
    this.isColumnFilter1 = !this.isColumnFilter1;
  }
   this.clearFilters();
  if(this.ItemCodeTo){
    itemToSelect.push(this.ItemCodeTo);
    this.ItemCodeSelected = (e: RowArgs) => itemToSelect.indexOf(e.dataItem.ItemCode) >=0 ;
  }else{
    this.ItemCodeSelected = (e: RowArgs) => itemToSelect.indexOf(e.dataItem.ItemCode) >=0 ;
  } 
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
    this.ItemCodeFrom = evt.selectedRows[0].dataItem.ItemCode;
   }
   else if (this.ItemTo) {
    this.ItemCodeTo = evt.selectedRows[0].dataItem.ItemCode;
   } 
   ref.close();
  }

  gridRowSelectFG(evt){
    let name = evt.selectedRows[0].dataItem.ItemCode; 
    let code = evt.selectedRows[0].dataItem.Code;
    let WoSelect = [];
    this.WOSelected = (e: RowArgs) => WoSelect.indexOf(e.dataItem.DocEntry) >=0 ;

    let gridItemSelect = [];
    if(code){
      gridItemSelect.push(code);
      this.GridViewSelected = (e: RowArgs) => gridItemSelect.indexOf(e.dataItem.Code) >=0 ;
    }else{
      this.GridViewSelected = (e: RowArgs) => gridItemSelect.indexOf(e.dataItem.Code) >=0 ;
    }    
    this.getWorkOrder(name);    
  }

  gridRowSelectDocEntry(evt){
   let docentry = evt.selectedRows[0].dataItem.DocEntry;
   let itemcode = evt.selectedRows[0].dataItem.U_O_PRODID;
   let WoSelect = [];
    if(itemcode){
      WoSelect.push(docentry);
      this.WOSelected = (e: RowArgs) => WoSelect.indexOf(e.dataItem.DocEntry) >=0 ;
    }else{
      this.WOSelected = (e: RowArgs) => WoSelect.indexOf(e.dataItem.DocEntry) >=0 ;
    } 
   this.getMaterials(docentry,itemcode);
   this.getOperations(docentry);
   this.getResources(docentry);
 }

   getMaterials(DocEntry,ItemCode){

    this.loading = true;
    this.DocEntry = DocEntry;
    this.ItemCode = ItemCode;

      if(this.materialViewOption == 'immediate')
      this.showMaterialView = 'immediate';
      else 
      this.showMaterialView = 'all';
        
      this.prod.GetMaterialData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DocEntry,this.materialViewOption, ItemCode, 
        this.FromDate, this.ToDate, this.checkedList.toString()).subscribe(
        data => {
            this.gridMaterial = data; 

            if(this.gridMaterial != null && this.gridMaterial != undefined){
              if(this.gridMaterial.length > 10)
              this.showgridMaterialPage = true;
              else
              this.showgridMaterialPage = false;             
            } 

            this.loading = false;         
            
        },
        error => {
          this.loading = false;
          this.toastrService.danger(this.language.no_record_found);    
      })    
   }

   getOperations(DocEntry){
      this.loading = true;
      this.prod.GetOperationData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DocEntry).subscribe(
        data => {
            this.gridOperation = data; 
            if(this.gridOperation != null && this.gridOperation != undefined){
              if(this.gridOperation.length > 10)
              this.showgridOperationPage = true;
              else
              this.showgridOperationPage = false;             
            }  
            this.loading = false;    
        },
        error => {
          this.loading = false;       
          this.toastrService.danger(this.language.no_record_found);    
      })    
   }

   getResources(DocEntry){
    this.loading = true; 
    this.prod.GetResourceData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DocEntry).subscribe(
      data => {
          this.gridResource = data;
          if(this.gridResource != null && this.gridResource != undefined){
            if(this.gridResource.length > 10)
            this.showgridResourcePage = true;
            else
            this.showgridResourcePage = false;             
          }           
          this.loading = false;       
          
      },
      error => {
        this.loading = false;       
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
    if(this.ItemCodeFrom && !this.ItemCodeTo){
      this.toastrService.danger(this.language.item_code_to_msg);
    }else if(!this.ItemCodeFrom && this.ItemCodeTo){
      this.toastrService.danger(this.language.item_code_from_msg);
    }else{
    let gridItemSelect = [];
    this.GridViewSelected = (e: RowArgs) => gridItemSelect.indexOf(e.dataItem.Code) >=0 ;
    
    let WoSelect = [];
    this.WOSelected = (e: RowArgs) => WoSelect.indexOf(e.dataItem.DocEntry) >=0 ;

    if(this.checkedList.length<=0){
      this.checkboxStatus =  true;
    }else{
      this.checkboxStatus =  false; 
    if(this.viewOption == "SIMPLE")
      this.showView = 'simple';
         
    else 
    this.showView = 'detail'; 
    this.times = '';  
    this.loading = true; 
    if(this.ItemCodeFrom == 'undefined' || this.ItemCodeFrom == undefined){
      this.ItemCodeFrom = '';
    }
    if(this.ItemCodeTo == 'undefined' || this.ItemCodeTo == undefined){
      this.ItemCodeTo = '';
    }  
    this.prod.GetItemExplosionData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemCodeFrom, this.ItemCodeTo, this.viewOption, this.FromDate, this.ToDate).subscribe(
      data => {
         if(data.length == 0){
            this.loading = false;
            this.toastrService.danger(this.language.no_record_found);
          }else{
            this.gridViewData = data;
            this.loading = false;
            if(data.length > 0){
              let Arr = [];
              for(var i=0; i<this.gridViewData.length; i++){
               if(this.gridViewData[i]){
                   Arr.push({data : this.gridViewData[i]});
               }
              } 
              this.nodes2 = this.getHierarchy(Arr, '-1');
              this.files2 = this.nodes2;
              this.getWorkOrder(this.gridViewData[0].ItemCode);
            }
            else {
             this.toastrService.danger(this.language.no_record_found);    
            }
          }  
      },
      error => {
        this.toastrService.danger(this.language.no_record_found);    
      })
      this.searchCriteriaToggle(event);
    }
    } 
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
 
  onCheckboxClick(checked: any, index: number) {

    let servivceItem: any = this.serviceData[index];
    if (checked) {
      this.selectedValues.push(servivceItem);
    }
    else {
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

 toggleLoadingAnimation() {
  this.Tabloading = true;
  setTimeout(() => this.Tabloading = false, 1000)
 }

 refreshEvent(e){
  if(e.target.checked == true){
    this.refreshStatus = true;
  }else{
    this.refreshStatus = false;
    this.time = '';
    this.value = '';
    this.hours = '';
    this.minutes = '';
    this.seconds = '';
    clearInterval(this.myVar);
  }
 }

countdown(endDate) {
    clearInterval(this.myVar);
    let countDownDate = new Date(endDate).getTime();
    this.myVar = setInterval(() => {
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.hours = ("0" + hours).slice(-2)+":";
    this.minutes = ("0" + minutes).slice(-2)+":";
    this.seconds = ("0" + seconds).slice(-2);
    if (distance < 0) {
      this.hours = "";
      this.minutes = "";
      this.seconds = "";
      clearInterval(this.myVar);
      var processButton = document.getElementById("process");
      processButton.click(); 
      var autoRefreshButton = document.getElementById("start");
      autoRefreshButton.click(); 
    }
    }, 1000);   
}

autoRefresh(){
  var selectTime = new Date(this.value);
  var minute = selectTime.getMinutes();
  var hour = selectTime.getHours();
  var currentTime = new Date();
  currentTime.setHours( currentTime.getHours() + hour );
  currentTime.setMinutes( currentTime.getMinutes() + minute );
  this.hour = this.datePipe.transform(currentTime, 'medium');
  if(this.hour){
    this.countdown(this.hour); 
  }
}


 getWoRadioClick(evt){    
  if(this.itemName != ''){
    this.loading = true;
    this.RadioBtnWO = evt;
    this.getWorkOrder(this.itemName);  
  }  
}

getMaterialRadioClick(evt){
  if(this.DocEntry != '' && this.ItemCode != ''){
    this.materialViewOption = evt;
    this.getMaterials(this.DocEntry,this.ItemCode);  
  }  
 }

 getInventshortRadioClick(){
  if(this.RadioBtnInventShort == 'Warehouse'){
    this.WHInventShort = true;
    this.CmpInventShort = false;
  }
  else if(this.RadioBtnInventShort == 'Company'){
    this.CmpInventShort = true;
    this.WHInventShort = false;
  }
 }

 showDetailsCommittedLookup(dataItem){
  this.prod.GetCommittedQtyDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, dataItem.ItemCode).subscribe(
    data => {
       if(data != undefined && data != null){
        if(data.length > 0){
         this.showLookup = true;
         this.serviceApiData = data;
         this.lookupfor = "showCommittedLookup";
        }
        else {
         this.toastrService.danger(this.language.no_record_found);    
        }
      
      }
      else {
       this.toastrService.danger(this.language.no_record_found);    
      }
    },
    error => {
      this.toastrService.danger(this.language.no_record_found);    
   })
}

}


