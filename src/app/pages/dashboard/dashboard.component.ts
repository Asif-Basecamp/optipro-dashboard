 import {Component,OnInit,TemplateRef, Input} from '@angular/core';
 import {TreeNode,TreeModel,TREE_ACTIONS,KEYS,IActionMapping,ITreeOptions} from 'angular-tree-component';
 import {NbDialogService} from '@nebular/theme';
 import {DashboardService} from 'src/app/service/dashboard.service';
 import {Router} from '@angular/router';
 import {NbToastrService} from '@nebular/theme';
 import * as eva from 'eva-icons';
 import { GridComponent } from '@progress/kendo-angular-grid';
 import { State } from '@progress/kendo-data-query';
 import OrgChart from '../../@core/org-chart/orgchart.js';

 /*const datascource = {
  'id': '1',
    'name': 'Lao Lao',
    'className': 'purReceipt',
    'children': [
      { 'id': '2', 'name': 'Bo Miao', 'className': 'purReturn' },
      { 'id': '3', 'name': 'Su Miao', 'className': 'purInvoice',
        'children': [
          { 'id': '4', 'name': 'Tie Hua', 'className': 'prodReceipt' },
          { 'id': '5', 'name': 'Hei Hei', 'className': 'prodIssue',
            'children': [
              { 'id': '6', 'name': 'Pang Pang', 'className': 'matReturn'},
              { 'id': '7', 'name': 'Xiang Xiang', 'className': 'creditMemo'}
            ]
          }
        ]
      },
      { 'id': '8', 'name': 'Yu Jie', 'className': 'salesReturn' },
      { 'id': '9', 'name': 'Yu Li', 'className': 'goodsIssue' },
    ]
  }*/
 var nodeName = '';
 
 @Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
 })
 
 export class DashboardComponent implements OnInit {
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
  public Lot: boolean = false;
  public LotFrom: boolean = false;
  public LotTo: boolean = false;
  public DistNumFrom: any;
  public DistNumTo: any;
  public trackName: any;
  public gridStatus: boolean = true;
  public nodes1: any = [];
  public nodes2: any = [];
  public transactions: any = [];
  public DocEntryArr: any = [];
  public searchCriteria: boolean = false;
  public transactiondetails: any = [];
  public Dsource: any = {};
  public CompanyDB: any;
  public Username: any;
  public Userpwd: any;
  public radioExplode: any;
  public explodeDirection: any;
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

  constructor(private dialogService: NbDialogService, private dash: DashboardService, private router: Router, private toastrService: NbToastrService) {}
 
  ngOnInit() {
   this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData'));
   this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
   this.Username = JSON.parse(window.localStorage.getItem('Username'));
   this.Userpwd = JSON.parse(window.localStorage.getItem('Userpwd'));
   this.getItemCodeData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB);
   this.getWarehouseCodeData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB); 
 
   this.radioExplode = 'Lot Explosion';
   eva.replace();
  }

   /*-- Item Code functions --*/
   getItemCodeData(api, companyDB){
    this.dash.GetItemList(api, companyDB).subscribe(
      data => {
        this.ItemCodeData = data;
      });    
  }

  openItemLookup(dialog: TemplateRef<any>){
    if(this.ItemCodeData){
      this.Item = true;
      this.whse = false;
      this.LotTo = false;
      this.LotFrom = false;
      this.lookUpHeading = 'Item Code';
      this.gridData = this.ItemCodeData;
      this.dialogService.open(dialog);
      this.disableLotNumber = false;
    }
  }

  onItemCodeBlur(){
    let item = this.ItemValue;
    let itemCode = [];
    if(item){
      for(var i in this.ItemCodeData){
        if(item === this.ItemCodeData[i].ItemCode){
          itemCode.push(this.ItemCodeData[i]);
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
      }
    }else{
        this.itemStatus = false;
        this.ItemDesc = '';
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
    if(this.WarehouseData){
      this.gridData = this.WarehouseData;
      this.Item = false;
      this.whse = true;
      this.Lot = false;
      this.lookUpHeading = 'Warehouse';
      this.dialogService.open(dialog);
    }
  }

  onWarehouseBlur(){
    let warehouse = this.DfltWarehouse;
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
   this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
    data => {
     let DistNum = '';
     let LotFromCode = [];
      DistNum = this.DistNumFrom;
    

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
  }

  /*-- Lot To function on blur --*/

  onLotToNumberBlur(LotNum) {
    this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
     data => {
      let DistNums = '';
      let LotToCode = [];
      DistNums = this.DistNumTo;
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
   }
 
  /*-- open Lot From lookup on click --*/ 

  openLotFromLookup(dialog: TemplateRef < any > ) {
   this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
    data => {
     this.gridData = data;
     this.Item = false;
     this.whse = false;
     this.LotFrom = true;
     this.LotTo = false;
     this.lookUpHeading = 'Lot From';
     this.dialogService.open(dialog);
    },
    error => {
     this.toastrService.danger("No Record Found!");    
    }
   )
  }
 
  /*-- open Lot To lookup on click --*/

  openLotToLookup(dialog: TemplateRef < any > ) {
 
   this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
    data => {
     this.gridData = data;
     this.gridData = data;
     this.Item = false;
     this.whse = false;
     this.LotFrom = false;
     this.LotTo = true;
     this.lookUpHeading = 'Lot To';
     this.dialogService.open(dialog);
    },
    error => {
     this.toastrService.danger("No Record Found!");    
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
     this.loading = true;
    if (this.radioExplode == 'Lot Explosion')
     this.explodeDirection = 'DOWN';
    else
     this.explodeDirection = 'UP';
  
    this.dash.GetLotExplosionData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.DfltWarehouse, this.DistNumFrom, this.DistNumTo, this.explodeDirection).subscribe(
     data => {
     if(!data){
       this.loading = false;
       this.toastrService.danger("No Record Found!");
       this.AnalysisData = [];
       this.nodes1 = [];
       this.nodes2 = [];
     }else{
      this.data = data;
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
       this.toastrService.danger("No Record Found!");    
     }
    )
      this.searchCriteriaToggle(event);
   }
  
 
  gridRowSelectionChange(evt, ref) {
   if (this.Item) {
    this.dataGridSelectNum = evt.selectedRows[0].index;
    this.ItemValue = evt.selectedRows[0].dataItem.ItemCode;
    this.ItemDesc = evt.selectedRows[0].dataItem.ItemName;
    this.DfltWarehouse = evt.selectedRows[0].dataItem.DfltWH;
    if (evt.selectedRows[0].dataItem.ManBtchNum == 'Y') {
     this.trackName = 'Batch'
    } else {
     this.trackName = 'Serial'
    }
   } else if (this.LotFrom) {
    this.DistNumFrom = evt.selectedRows[0].dataItem.DistNumber;
   } else if (this.LotTo) {
    this.DistNumTo = evt.selectedRows[0].dataItem.DistNumber;
   } else {
    this.DfltWarehouse = evt.selectedRows[0].dataItem.WhsCode;
   }
   ref.close();
  }
 
  /*-- get transaction type on click items of grid view --*/

  GetTransaction(NodeName, fullName) {
   this.dash.GetTransaction(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, NodeName).subscribe(
    data => {
    if(data){
     this.loading = false;
     this.DocEntryArr = [];
     this.nodes1 = [];
     this.transactions = data;
     let name = fullName;
     let childrens = [];
     let map = {};
     map["name"] = fullName;
     for (let i = 0; i < this.transactions.Table.length; i++) {
      childrens.push({
       name: '(' + this.transactions.Table[i].DistNumber + ') Doc Entry : ' + this.transactions.Table[i].DocEntry + ' - ' + this.transactions.Table[i].ObjectTypeDesc
      });
      this.DocEntryArr.push({
       key: this.transactions.Table[i].DistNumber,
       DocEntry: this.transactions.Table[i].DocEntry,
       ObjectType: this.transactions.Table[i].ObjectType
      });
     }
     map["children"] = childrens;
     this.nodes1.push(map);
    } 
    },
    error => {
     this.toastrService.danger("No Record Found!");    
    }
   )
  }

  /*-- recursive function for analysis view --*/

  getAnalysisHierarchy(data, seq){
      let node3 = [];
      data.filter(function(d) {
       if (d.ParantId == seq) {
        return d.ParantId == seq
       }
      }).forEach(function(d) {
       var cd = d;
       cd.children = this.getAnalysisHierarchy(data, d.OPTM_SEQ);
       return node3.push(cd);
      }.bind(this))
      return node3;
  }
  
  /*-- get transaction detail --*/

  GetTransactionDetails(Dcentry, Item) {
   let DC = '';
   let ObjType = '';
   let OTstr = '';
   let stringDC = [];
   let str = '';
   if (Dcentry.indexOf(":") > -1) {
    Dcentry = Dcentry.split(":")[1].trim();
    this.DocEntryArr.filter(function(d) {
     if (d.DocEntry == Dcentry) {
      DC = d.DocEntry;
      ObjType = d.ObjectType;
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
   }
  this.dash.GetTransactionDetails(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, DC, ObjType, Item, this.DfltWarehouse).subscribe(
    data => {
    if(data){ 
     this.Analysisloading = false; 
    // this.transactiondetails = data;
     this.AnalysisData = data;
     console.log(this.AnalysisData);
     this.nodes3 = this.getAnalysisHierarchy(this.AnalysisData, '-1');
     console.log(this.nodes3);
    /* const datascource = {
      'id': '1',
        'name': 'Lao Lao',
        'className': 'purReceipt',
        'children': [
          { 'id': '2', 'name': 'Bo Miao', 'className': 'purReturn' },
          { 'id': '3', 'name': 'Su Miao', 'className': 'purInvoice',
            'children': [
              { 'id': '4', 'name': 'Tie Hua', 'className': 'prodReceipt' },
              { 'id': '5', 'name': 'Hei Hei', 'className': 'prodIssue',
                'children': [
                  { 'id': '6', 'name': 'Pang Pang', 'className': 'matReturn'},
                  { 'id': '7', 'name': 'Xiang Xiang', 'className': 'creditMemo'}
                ]
              }
            ]
          },
          { 'id': '8', 'name': 'Yu Jie', 'className': 'salesReturn' },
          { 'id': '9', 'name': 'Yu Li', 'className': 'goodsIssue' },
        ]
      };

     this.orgchart = new OrgChart({
      'chartContainer': '#chart-container',
      'data' : datascource,
      'nodeContent': 'title',
      'nodeID': 'id',
      'depth': 1,
      'direction': 'l2r',
      'pan': false,
      'zoom': false,
      'toggleSiblingsResp': false,
      'createNode': function(node, data) {
        let secondMenu = document.createElement('div');
        secondMenu.setAttribute('class', 'second-menu');
        secondMenu.innerHTML = `
          <div class="node-content">
            <div class="node-img">
              <img class="node-avatar" src="./assets/images/images.png">
            </div>
            <div class="node-data">
              <div class="data-column">
                <div class="data-heading">
                  Item
                </div>
                <div class="data-content">
                  INT
                </div>
              </div>
              <div class="data-column">
                <div class="data-heading">
                  Warehouse
                </div>
                <div class="data-content">
                  LOT 1
                </div>
              </div>
              
              <div class="data-column">
                <div class="data-heading">
                  Lot #
                </div>
                <div class="data-content">
                  LOT 1
                </div>
              </div>
              <div class="data-column">
                <div class="data-heading">
                  Expiry Date
                </div>
                <div class="data-content">
                  01/01/01
                </div>
              </div>
              <div class="data-column">
                <div class="data-heading">
                  Receipt Date
                </div>
                <div class="data-content">
                  01/01/01
                </div>
              </div>
              <div class="data-column">
                <div class="data-heading">
                  Lot Status
                </div>
                <div class="data-content">
                  Release
                </div>
              </div>
              <div class="data-column">
                <div class="data-heading">
                  Quantity
                </div>
                <div class="data-content">
                  10.000 KG
                </div>
              </div>
            </div>
          </div>
          <div class="node-footer">
            <div class="footer-column">
              <div class="column-heading">
                Total Received
              </div>
              <div class="column-content">
                text
              </div>
            </div>
            <div class="footer-column">
              <div class="column-heading">
                Total Issued
              </div>
              <div class="column-content">
                text
              </div>
            </div>
            <div class="footer-column">
              <div class="column-heading">
                Onhand
              </div>
              <div class="column-content">
                text
              </div>
            </div>
          </div>
        
        `;
        // secondMenu.innerHTML = `<img class="avatar" src="../img/avatar/${data.id}.jpg">`;
        node.appendChild(secondMenu);
      }
    });*/
    } 
    },
  error => {
     this.toastrService.danger("No Record Found!");    
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
   let name = evt.srcElement.textContent;
   if (test == "" || test == undefined) {
    return;
   } else {
    if (test.indexOf("-") > -1) {
     this.loading = true;
     test = test.split("-")[test.split("-").length - 1];
     if (test != '' && test != " " && test != undefined && test != null) {
      test = test.trim();
     } else {
      this.toastrService.danger('Item is None Tracked');
      this.loading = false;
      return;
     }
    }
    this.GetTransaction(test, name);
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
    if (dt.indexOf("-") > -1) {
     if (dt.indexOf(":") > -1)
      dcentry = dt.split("-")[0].trim();
     else
      dcentry = dt.split("-")[1].trim();
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
  customAccordianAnalysis(e) {
   if (document.getElementById("analysis-accordian").classList.contains('expanded')) {
    this.hideAcordian(e);
    document.getElementById("custom-accordian").classList.remove('analysis-accordian-open');
   } else {
    this.expandAcordian(e);
    document.getElementById("custom-accordian").classList.add('analysis-accordian-open');
   }
  }
  hideAcordian(e: any) {
   e.currentTarget.parentElement.parentElement.classList.remove('expanded')
   e.currentTarget.nextSibling.style.height = '0';
   e.currentTarget.nextSibling.style.display = 'none';
  }
  expandAcordian(e: any) {
   e.currentTarget.parentElement.parentElement.classList.add('expanded')
   e.currentTarget.nextSibling.style.height = '100%';
   e.currentTarget.nextSibling.style.display = 'flex';
  }
 }