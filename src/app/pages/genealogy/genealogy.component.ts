import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { GridComponent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import OrgChart from '../../@core/org-chart/orgchart.js';
import { RowArgs } from '@progress/kendo-angular-grid';

@Component({
 selector: 'ngx-genealogy',
 styleUrls: ['./genealogy.component.scss'],
 templateUrl: './genealogy.component.html',
})

export class GenealogyComponent implements OnInit {
 @Input() serviceData: any;
 public gridData: any[];
 public arrConfigData: any;
 dataGridSelectNum: number;
 public ItemValue: any;
 public ItemDesc: any;
 public DfltWarehouse: any;
 selectedItem = '2';
 public Item: boolean = false;
 public whse: boolean = false;
 public LotFrom: boolean = false;
 public LotTo: boolean = false;
 public DistNumFrom: any = '';
 public DistNumTo: any = '';
 public trackName: any;
 public gridStatus: boolean = true;
 public nodes1: any = [];
 public nodes2: any = [];
 public transactions: any = [];
 public DocEntryArr: any = [];
 public DocEntryArrNode: any = [];
 public searchCriteria: boolean = false;
 public transactiondetails: any = [];
 public Dsource: any = {};
 public CompanyDB: any;
 public Username: any;
 public Userpwd: any;
 public radioExplode: any;
 public radioLevel: any;
 public radioTransaction: any;
 public explodeDirection: any;  
 public explodeLevel: any;
 public explodeTransaction: any;
 public lookUpHeading: any;
 public AnalysisData: any = [];
 public datasource: any = [];
 public data: any = [];
 public disableLotNumber: boolean = true;
 loading = false;
 Analysisloading = false;
 public itemStatus: boolean = false;
 public ItemCodeData: any = [];
 public WarehouseStatus: boolean = false;
 public WarehouseData: any = [];
 public LotFromStatus: boolean = false;
 public LotToStatus: boolean = false;
 showSelection: boolean = false;
 selectedValues: Array<any> = [];
 public orgchart: any;
 public nodes3: any;
 public nodes4: any;
 public language: any;
 public isItemCodeSelected: any;
 public wareHouseSelected: any;
 public lotSelected: any;
 public NodeName:any = '';
 public vendor: boolean = false;
 public vendorData: any = [];
 public gridViewShow: boolean = false;
 public analysisViewShow: boolean = false;
 public transactionViewShow: boolean = false;
 public showValidation: boolean = false;
 isColumnFilter = true;

 constructor(private dialogService: NbDialogService, private dash: DashboardService, private router: Router, private toastrService: NbToastrService) {}

 ngOnInit() {
  this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData'));
  this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
  this.Username = JSON.parse(window.localStorage.getItem('Username'));
  this.Userpwd = JSON.parse(window.localStorage.getItem('Userpwd'));
  this.language = JSON.parse(window.localStorage.getItem('language'));

  this.getItemCodeData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB);
  this.getWarehouseCodeData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB); 

  this.radioExplode = 'Lot Explosion';
  this.radioLevel = 'Single Level';
  this.radioTransaction = 'ParentLot';
 }

  /*-- Item Code functions --*/
 getItemCodeData(api, companyDB){
   let PrcrmntMtd = "'B','M'";
   this.dash.GetItemList(api, companyDB, PrcrmntMtd).subscribe(
     data => {
       this.ItemCodeData = data;
     });    
 }

 setParamItemLookup(gridData,dialog){
       this.Item = true;
       this.whse = false;
       this.LotTo = false;
       this.LotFrom = false;
       this.lookUpHeading = this.language.Item_Code;
       this.gridData = gridData;
       this.dialogService.open(dialog);
 } 
 

 openItemLookup(dialog: TemplateRef<any>){
   let select = [];
   if(this.isColumnFilter == true){
    this.isColumnFilter = !this.isColumnFilter;
   }
   this.clearFilters();
   if(this.ItemValue){
     select.push(this.ItemValue);
     this.isItemCodeSelected = (e: RowArgs) => select.indexOf(e.dataItem.ItemCode) >=0 ;
   }else{
     this.isItemCodeSelected = (e: RowArgs) => select.indexOf(e.dataItem.ItemCode) >=0 ;
   }

   if(this.vendor){
      let PrcrmntMtd = "'B'";
      this.dash.GetItemList(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, PrcrmntMtd).subscribe(
        data => {
          this.vendorData = data;
          this.setParamItemLookup(this.vendorData,dialog);
        });
    }
    else
    {
      if(this.ItemCodeData)
      this.setParamItemLookup(this.ItemCodeData,dialog);
    }
 }

 onItemCodeBlur(){
   let item = this.ItemValue;
   if(this.DfltWarehouse){
      this.showValidation = true;
   }
   let itemCode = [];
   if(item){
    if(this.vendor){
      for(var i in this.vendorData){
        if(item === this.vendorData[i].ItemCode){
          itemCode.push(this.vendorData[i]);
        }
      }
    }
    else {
      for(var i in this.ItemCodeData){
        if(item === this.ItemCodeData[i].ItemCode){
          itemCode.push(this.ItemCodeData[i]);
        }
      }
    }
     
     if(itemCode.length>0){
       this.ItemDesc = itemCode[0].ItemName;
       this.ItemValue = itemCode[0].ItemCode;
       if (itemCode[0].ManBtchNum == 'Y') {
         this.trackName = 'Batch'
        } else {
         this.trackName = 'Serial'
        }
       this.disableLotNumber = false;
       this.itemStatus = false;
       
     }else{
       this.ItemDesc = '';
       this.itemStatus = true;
       this.disableLotNumber = true;
       this.DfltWarehouse = '';
       this.DistNumFrom = '';
       this.DistNumTo = '';
     }
   }else{
       this.itemStatus = false;
       this.ItemDesc = '';
       this.DfltWarehouse = '';
       this.DistNumFrom = '';
       this.DistNumTo = '';
   } 
 }

  /*-- Warehousecode functions --*/

 getWarehouseCodeData(api, companyDB){
   this.dash.GetWarehouseList(this.arrConfigData.optiProDashboardAPIURL,this.CompanyDB).subscribe(
     data =>{
       this.WarehouseData = data;
     });   
 }

 openWarehouseLookup(dialog: TemplateRef<any>){
   let warehouse = [];
   if(this.isColumnFilter == true){
    this.isColumnFilter = !this.isColumnFilter;
   }
   this.clearFilters();
   if(this.DfltWarehouse){
     warehouse.push(this.DfltWarehouse);
     this.wareHouseSelected = (e: RowArgs) => warehouse.indexOf(e.dataItem.WhsCode) >=0 ;
   }else{
     this.wareHouseSelected = (e: RowArgs) => warehouse.indexOf(e.dataItem.WhsCode) >=0 ;
   }
   if(this.WarehouseData){
     this.gridData = this.WarehouseData;
     this.Item = false;
     this.whse = true;
     this.LotFrom = false;
     this.LotTo = false;
     this.lookUpHeading = this.language.warehouse;
     this.dialogService.open(dialog);
   }
 }

 onWarehouseBlur(){
   let warehouse = this.DfltWarehouse;
   this.showValidation = false;
   let warehouseCode = [];
   if(warehouse){
     for(var i in this.WarehouseData){
       if(warehouse === this.WarehouseData[i].WhsCode){
         warehouseCode.push(this.WarehouseData[i]);
       }
     }
     if(warehouseCode.length>0){
       this.WarehouseStatus = false;
     }else{
       this.WarehouseStatus = true;
     }
   }else{
      this.WarehouseStatus = false;
   }
 }

 /*-- Lot From function on blur --*/

 onLotFromNumberBlur(LotNum) {
 
 if(this.DistNumFrom.trim() != ""){
   this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
     data => {
      let DistNum = '';
      let LotFromCode = [];
      DistNum = this.DistNumFrom.trim();  
       if(DistNum){
         for(var i in data){
           if(DistNum == data[i].DistNumber){
             LotFromCode.push(data[i]);
           }
         }
         if(LotFromCode.length>0){
           this.LotFromStatus = false;
         }else{
           this.LotFromStatus = true;
         }
       }else{
          this.LotFromStatus = false;
       }
     });
   }else{
    this.LotFromStatus = false;
   }  
 }

 /*-- Lot To function on blur --*/

 onLotToNumberBlur(LotNum) {
   if(this.DistNumTo.trim() != ""){
   this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
    data => {
     let DistNums = '';
     let LotToCode = [];
     DistNums = this.DistNumTo.trim();
      if(DistNums){
        for(var i in data){
          if(DistNums == data[i].DistNumber){
           LotToCode.push(data[i]);
          }
        }
        if(LotToCode.length>0){
          this.LotToStatus = false;
        }else{
          this.LotToStatus = true;
        }
      }else{
         this.LotToStatus = false;
      }
    });
   }else{
    this.LotToStatus = false;
   }  
  }

 /*-- open Lot From lookup on click --*/ 

 openLotFromLookup(dialog: TemplateRef < any > ) {
   let LotFromSelect = [];
   if(this.isColumnFilter == true){
    this.isColumnFilter = !this.isColumnFilter;
   }
   this.clearFilters();
   if(this.DistNumFrom){
     LotFromSelect.push(this.DistNumFrom);
     this.lotSelected = (e: RowArgs) => LotFromSelect.indexOf(e.dataItem.DistNumber) >=0 ;
   }else{
     this.lotSelected = (e: RowArgs) => LotFromSelect.indexOf(e.dataItem.DistNumber) >=0 ;
   } 
  this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
   data => {
    this.gridData = data;
    this.Item = false;
    this.whse = false;
    this.LotFrom = true;
    this.LotTo = false;
    if(this.vendor)
    this.lookUpHeading = this.language.vendor_lot_from;
    else
    this.lookUpHeading = this.language.lot_from;   
    this.dialogService.open(dialog);
   },
   error => {
    this.toastrService.danger(this.language.no_record_found);    
   }
  )
 }

 /*-- open Lot To lookup on click --*/

 openLotToLookup(dialog: TemplateRef < any > ) {
   let LotToSelect = [];
   if(this.isColumnFilter == true){
    this.isColumnFilter = !this.isColumnFilter;
   }
   this.clearFilters();
   if(this.DistNumTo){
     LotToSelect.push(this.DistNumTo);
     this.lotSelected = (e: RowArgs) => LotToSelect.indexOf(e.dataItem.DistNumber) >=0 ;
   }else{
     this.lotSelected = (e: RowArgs) => LotToSelect.indexOf(e.dataItem.DistNumber) >=0 ;
   } 
  this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
   data => {
    this.gridData = data;
    this.Item = false;
    this.whse = false;
    this.LotFrom = false;
    this.LotTo = true;
    
    if(this.vendor)
    this.lookUpHeading = this.language.vendor_lot_to;
    else
    this.lookUpHeading = this.language.lot_to;
    this.dialogService.open(dialog);
   },
   error => {
    this.toastrService.danger(this.language.no_record_found);    
   }
   
  )
 }

 /*-- recursion function for grid view --*/

 getHierarchy(dataa, Seq, Id) {
   let node = [];
   dataa.filter(function(d) {
    if (d.ParantId == Seq && Id == d.GroupId) {
     return d.ParantId == Seq
    }
   }).forEach(function(d) {
    var cd = d;
    cd.children = this.getHierarchy(dataa, d.OPTM_SEQ, d.root);
    return node.push(cd);
   }.bind(this))
   return node;
  }
 
  /*-- get data on grid view after click on process --*/

  GetExplosion() {
    document.getElementById('chart-container').innerHTML = ""; 

   if(this.DistNumFrom.trim() != "" && this.DistNumTo.trim() == ""){
     this.toastrService.danger(this.language.error_enter_lot_to);
     return;
   }
   else if(this.DistNumTo.trim() != "" && this.DistNumFrom.trim() == ""){
     this.toastrService.danger(this.language.error_enter_lot_from);
     return;
   }

   this.loading = true;
   if (this.radioExplode == 'Lot Explosion')
    this.explodeDirection = 'DOWN';
   else
    this.explodeDirection = 'UP';

   if (this.radioLevel == 'Single Level')
    this.explodeLevel = 'Single';
   else
    this.explodeLevel = 'Multi';

    let ExplosionBasedOn = '';
     if(this.vendor)
     ExplosionBasedOn = 'VENDOR';
 
    this.dash.GetLotExplosionData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.DfltWarehouse, this.DistNumFrom, this.DistNumTo, this.explodeDirection, this.explodeLevel, this.trackName,
      ExplosionBasedOn).subscribe(
    data => {
    if(!data){
      this.loading = false;
      this.gridViewShow = false;
      this.toastrService.danger(this.language.no_record_found);
      this.AnalysisData = [];
      this.nodes1 = [];
      this.nodes2 = [];
    }else{     

     if(data.length <= 0){
       this.loading = false;
       this.gridViewShow = false;
       this.toastrService.danger(this.language.no_record_found);  
       this.AnalysisData = [];
       this.nodes1 = [];
       this.nodes2 = []; 
       return;
     }
     
     this.data = data;
     this.gridViewShow = true;
     let Arr = [];
     for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].GroupId == '') {
       this.data[i]["root"] = this.data[i].OPTM_SEQ;
       Arr.push(this.data[i]);
      } else {
       this.data[i]["root"] = this.data[i].GroupId;
       Arr.push(this.data[i]);
      }
     }
     this.nodes2 = this.getHierarchy(Arr, '-1', Arr[0].OPTM_SEQ);
     this.gridStatus = !this.gridStatus;
     this.loading = false;
    } 
   },
    error => {
      this.loading = false;
      this.toastrService.danger(this.language.no_record_found);    
    }
   )
     this.searchCriteriaToggle(event);
  }
 

 gridRowSelectionChange(evt, ref) {
  if (this.Item) {
   this.dataGridSelectNum = evt.selectedRows[0].index;
   this.ItemValue = evt.selectedRows[0].dataItem.ItemCode;
   this.ItemDesc = evt.selectedRows[0].dataItem.ItemName;
   this.disableLotNumber = false;
   this.DistNumFrom = '';
   this.DistNumTo = '';
   this.DfltWarehouse = '';
   this.showValidation = true;
   if (evt.selectedRows[0].dataItem.ManBtchNum == 'Y') {
    this.trackName = 'Batch'
   } else {
    this.trackName = 'Serial'
   }
  } else if (this.LotFrom) {
   if(this.vendor)
  this.DistNumFrom = evt.selectedRows[0].dataItem.MnfSerial;
else
  this.DistNumFrom = evt.selectedRows[0].dataItem.DistNumber;
  } else if (this.LotTo) {
   if(this.vendor)
  this.DistNumTo = evt.selectedRows[0].dataItem.MnfSerial;
else
   this.DistNumTo = evt.selectedRows[0].dataItem.DistNumber;
  } 
  else {
   this.DfltWarehouse = evt.selectedRows[0].dataItem.WhsCode;
  }
  ref.close();
 }

 getHierarchyTransaction(dataa, Id) {
   let node1 = [];
   dataa.filter(function(d) {
    if (d.ParantId == Id) {
     return d.ParantId == Id
    }
   }).forEach(function(d) {
    var cd = d;
    cd.children = this.getHierarchyTransaction(dataa, d.SeqNo);     
    return node1.push(cd);
   }.bind(this))
   return node1;
  }

  setTransactionDetailParam(transaction){
   for (let i = 0; i < transaction.length; i++) {
     
     if(transaction[i].ObjectTypeDesc != null ){
       this.DocEntryArr.push({
         key: transaction[i].DistNumber,
         DocEntry: transaction[i].DocEntry,
         ObjectType: transaction[i].ObjectType,
         ParantId: transaction[i].ParantId
        });
     }
     else {
         this.DocEntryArrNode.push({
           key: transaction[i].DistNumber,
           ParantId: transaction[i].ParantId
          });              
     }     
    }  
   }

 /*-- get transaction type on click items of grid view --*/

 GetTransaction(NodeName) {

  this.NodeName = NodeName;
   
  if (this.radioTransaction == 'ParentLot')
   this.explodeTransaction = 'ParentLot';
  else
   this.explodeTransaction = 'ImmediateLot';

   if (this.radioExplode == 'Lot Explosion')
     this.explodeDirection = 'DOWN';
    else
     this.explodeDirection = 'UP';

   
  this.dash.GetTransaction(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.NodeName,this.DfltWarehouse,this.explodeTransaction,this.explodeDirection).subscribe(
   data => {
   if(data){
    this.loading = false;
    this.DocEntryArr = [];
    this.DocEntryArrNode = [];
    this.nodes1 = [];
    this.transactions = data;
    this.transactionViewShow = true;
   this.setTransactionDetailParam(this.transactions.Table);
   this.nodes1 =  this.getHierarchyTransaction(data.Table,'-1');
   } 
   else{
    this.loading = false;
    this.transactionViewShow = false;
    this.toastrService.danger(this.language.no_record_found);  
   }
   },
   error => {
    this.loading = false;
    this.transactionViewShow = false;
    this.toastrService.danger(this.language.no_record_found);    
   }
  )
 }

 /*-- recursive function for analysis view --*/

 getAnalysisHierarchy(data, seq){
     let nodess = [];
     data.filter(function(d) {
      if (d.ParantId == seq) {
       return d.ParantId == seq
      }
     }).forEach(function(d) {
      var cd = d;
      if(cd.DocEntry != null){
        cd["name"] = cd.DistNumber + ` ( ${cd.ObjectTypeDesc} (${cd.DocEntry})  )`;
        cd["IsNode"] = true;
      }      
      else {
        cd["name"] = cd.DistNumber;
        cd["IsNode"] = false;
      }
      if(cd.ObjectTypeDesc != null){
        let desc = '';
        desc =  cd.ObjectTypeDesc.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
       desc = desc.replace(/\s/g, '');
       cd["className"] = desc;
      }       
      else{
       cd["className"] = cd.ObjectTypeDesc;
      }
     
      cd.children = this.getAnalysisHierarchy(data, d.SeqNo);
      return nodess.push(cd);
     }.bind(this))
     return nodess;
 }
 
 /*-- get transaction detail --*/

 GetTransactionDetails(Dcentry, Item) {
  let DC = '';
  let ObjType = '';
  let OTstr = '';
  let stringDC = [];
  let str = '';

  let node = '';
  if (Dcentry.indexOf(":") > -1) {
   Dcentry = Dcentry.split(":")[1].trim();
   this.DocEntryArr.filter(function(d) {
    if (d.DocEntry == Dcentry && d.key == Item) {
     DC = d.DocEntry;
     ObjType = d.ObjectType;
     node = "'"+d.key+"'";
    }
   });
  } else {
   Item = Dcentry;
   for (let i = 0; i < this.DocEntryArr.length; i++) {
    if (i == 0) {
     str = this.DocEntryArr[i].DocEntry;
     OTstr = this.DocEntryArr[i].ObjectType;
    } else {
     str = str + ',' + this.DocEntryArr[i].DocEntry;
     OTstr = OTstr + ',' + this.DocEntryArr[i].ObjectType;
    }
   }
   DC = str;
   ObjType = OTstr;

   let Array = this.DocEntryArrNode;
  this.DocEntryArrNode.filter(function(d) {

    if(d.key == Item){
       if(d.ParantId == -1){
         for(let k=0 ; k<Array.length; k++){   
           if(k==0) 
           node = "'"+Array[k].key+"'";
           else
           node = node + ",'" + Array[k].key+"'";     
        }
       }
       else{
         node = "'"+Item+"'";
       }  
   }
  });
  }  

 this.dash.GetTransactionDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DC, ObjType, node,this.DfltWarehouse).subscribe(
   data => {
   if(data){ 
    this.analysisViewShow = true; 
    document.getElementById('chart-container').innerHTML = "";
    this.Analysisloading = false; 
    this.AnalysisData = data;
    this.nodes3 = this.getAnalysisHierarchy(this.AnalysisData, '-1');
    var result = {};
    for (var i=0; i<this.nodes3.length; i++) {
       result = this.nodes3[i];
    }
    this.orgchart = new OrgChart({
     'chartContainer': '#chart-container',
     'data' : result,
     'depth': 1,
     'direction': 'l2r',
     
     // 'chartClass':'ItemCode',
     // 'nodeID': 'id',
     'createNode': function(node, data) {
       node.getElementsByClassName('title')[0].addEventListener('click', () => {
         node.classList.toggle("expanded");   
       });
       let secondMenu = document.createElement('div');
       secondMenu.setAttribute('class', 'second-menu');
       secondMenu.innerHTML = `
         <div class="node-content">
           <div class="node-img">
             <i class="optipro-icon-${data.className}"></i>
           </div>
           <div class="node-data">
             <div class="data-column">
               <div class="data-heading">
               Item
               </div>
               <div class="data-content">
                 ${data.ItemCode ? data.ItemCode : ''}
               </div>
             </div>
             <div class="data-column">
               <div class="data-heading">
               ${data.IsNode ? 'Warehouse' : ''} 
               </div>
               <div class="data-content">
                 ${data.Warehouse ? data.Warehouse : ''}
               </div>
             </div>              
             <div class="data-column">
               <div class="data-heading">
                 Lot #
               </div>
               <div class="data-content">
               ${data.DistNumber ? data.DistNumber : ''}
               </div>
             </div>
             <div class="data-column">
               <div class="data-heading">
                 ${data.IsNode ? 'Expiry Date' : ''} 
               </div>
               <div class="data-content">
                 ${data.EXPDATE ? data.EXPDATE : ''}
               </div>
             </div>
             <div class="data-column">
               <div class="data-heading">
                 ${data.IsNode ? 'Receipt Date' : ''} 
               </div>
               <div class="data-content">
                 ${data.CREATEDATE ? data.CREATEDATE : ''}
               </div>
             </div>
             <div class="data-column">
               <div class="data-heading">
                 ${data.IsNode ? 'Lot Status' : ''} 
               </div>
               <div class="data-content">
                 ${data.Status ? data.Status : ''}
               </div>
             </div>
             <div class="data-column">
               <div class="data-heading">
                 ${data.IsNode ? 'Quantity' : ''} 
               </div>
               <div class="data-content">
                 ${data.Quantity ? data.Quantity : ''}
               </div>
             </div>
           </div>
         </div>
         <div class="node-footer">
           <div class="footer-column">
             <div class="column-heading">
               ${data.IsNode ? 'Total Received' : ''} 
             </div>
             <div class="column-content">
               ${data.TOTALRECEIVE ? data.TOTALRECEIVE : ''}
             </div>
           </div>
           <div class="footer-column">
             <div class="column-heading">
               ${data.IsNode ? 'Total Issued' : ''} 
             </div>
             <div class="column-content">
               ${data.TOTALISSUE ? data.TOTALISSUE : ''}
             </div>
           </div>
           <div class="footer-column">
             <div class="column-heading">
              ${data.IsNode ? 'Onhand' : ''} 
             </div>
             <div class="column-content">
               ${data.ONHAND ? data.ONHAND : ''}
             </div>
           </div>
         </div>
       
       `;
       // secondMenu.innerHTML = `<img class="avatar" src="../img/avatar/${data.id}.jpg">`;
       node.appendChild(secondMenu);
     },
     'exportButton': true,
     'exportFilename': 'Analysis View' 
     //'exportFilename': this.language.exportFilename    
   });
   } 
  else{
   this.Analysisloading = false;
   this.analysisViewShow = false;
   this.toastrService.danger(this.language.no_record_found); 
  }
 },
 error => {
    this.Analysisloading = false;
    this.analysisViewShow = false;
    this.toastrService.danger(this.language.no_record_found);    
   }
  )
 }

 open(dialog: TemplateRef < any > ) {
  this.dialogService.open(dialog);
 }

 process() {
  this.gridStatus = !this.gridStatus;
 }

 clickTransaction(evt) {
  let test = evt.srcElement.textContent;
  if (test == "" || test == undefined) {
   return;
  } else {
   if (test.indexOf("~") > -1) {
    this.loading = true;
    test = test.split("~")[test.split("~").length - 1];
    if (test != '' && test != " " && test != undefined && test != null) {
     test = test.trim();
    } 
   }
   else {
    this.toastrService.danger(this.language.error_item_none_tracked);
    this.loading = false;
    return;
   }
   this.GetTransaction(test);
  }
 }

 clickTransactionDetails(evt) {
  let dt = evt.srcElement.textContent;
  let dcentry = '';
  let disnum = '';
  if (dt == "" || dt == undefined) {
   return;
  } else {
   this.Analysisloading = true; 
   if (dt.indexOf("~") > -1) {
    if (dt.indexOf(":") > -1)
     dcentry = dt.split("~")[0].trim();
    else
     dcentry = dt.split("~")[1].trim();
   } else {
    dcentry = dt;
   }

   if (dt.indexOf(")") > -1) {
    disnum = dt.split(")")[0].split("(")[1].trim();
   } else {
    disnum = dt;
   }
   this.GetTransactionDetails(dcentry, disnum);
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
     // let rixd: number= this.selectedValues.findIndex(i => i.LOTNO == servivceItem.LOTNO && i.LOTNO == servivceItem.BINNO)
     this.selectedValues = this.selectedValues.splice(index, 1);
   }
 }

 onFilterChange(checkBox: any, grid: GridComponent) {
    if(checkBox.checked == false) {
     this.clearFilters();
   }
 }

 public state: State = {
   skip: 0,
   take: 5,

   // Initial filter descriptor
   filter: {
     logic: 'and',
     filters: []
   },
 };

 clearFilters() {
   this.state.filter = {
     logic: 'and',
     filters: []
   };
 }
 
 toggleNodeClass(e: any){
   e.currentTarget.classList.toggle("shrink");    
 }

 getTransactionRadioClick(evt){    
   if(this.NodeName != ''){
     this.loading = true;
     this.radioTransaction = evt;
     this.GetTransaction(this.NodeName);
     document.getElementById('chart-container').innerHTML = "";
   }  
 }

 VendorCheck(evt){
   if(this.vendor){
     this.radioExplode = 'Where Used';
     this.ItemValue = '';
     this.DfltWarehouse = ''; this.DistNumFrom = ''; this.DistNumTo = '';
   }
   else {
    this.ItemValue = '';
    this.DfltWarehouse = ''; this.DistNumFrom = ''; this.DistNumTo = '';
   }
 }
 colorCodeWrapperToggle(e){
  document.getElementById('color-code-wrapper').classList.toggle('open');
 }
}
