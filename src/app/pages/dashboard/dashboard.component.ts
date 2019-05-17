 import {Component,OnInit,TemplateRef} from '@angular/core';
 import {TreeNode,TreeModel,TREE_ACTIONS,KEYS,IActionMapping,ITreeOptions} from 'angular-tree-component';
 import {NbDialogService} from '@nebular/theme';
 import {DashboardService} from 'src/app/service/dashboard.service';
 import {Router} from '@angular/router';
 import {NbToastrService} from '@nebular/theme';
 import * as eva from 'eva-icons';
 
 var nodeName = '';
 
 @Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
 })
 
 export class DashboardComponent implements OnInit {
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
 
  constructor(private dialogService: NbDialogService, private dash: DashboardService, private router: Router, private toastrService: NbToastrService) {}
 
  ngOnInit() {
   this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData'));
   this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB'));
   this.Username = JSON.parse(window.localStorage.getItem('Username'));
   this.Userpwd = JSON.parse(window.localStorage.getItem('Userpwd'));
   this.radioExplode = 'Lot Explosion';
   eva.replace()
  }
 
  onItemCodeBlur() {
   this.dash.GetItemList(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB).subscribe(
    data => {
     let item = this.ItemValue;
     let validitem = data.filter(function(val) {
      if (item == val.ItemCode) {
       this.ItemValue = val.ItemCode;
       this.ItemDesc = val.ItemName;
       this.disableLotNumber = false;
      }
     });
 
     if (validitem.length <= 0) {
      this.toastrService.danger('Enter correct Item Code');
      this.ItemValue = '';
      this.disableLotNumber = true;
      return;
     }
    });
  }
 
 
  openItemLookup(dialog: TemplateRef < any > ) {
 
   this.dash.GetItemList(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB).subscribe(
    data => {
     this.Item = true;
     this.whse = false;
     this.LotTo = false;
     this.LotFrom = false;
     this.lookUpHeading = 'Item Code';
     this.gridData = data;
     this.dialogService.open(dialog);
     this.disableLotNumber = false;
    },
    error => {
     // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     this.toastrService.danger("No Record Found!");    
    }
   )
  }
 
  onWarehouseBlur() {
   this.dash.GetWarehouseList(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB).subscribe(
    data => {
     let warehouse = this.DfltWarehouse;
     let validItem = data.filter(function(val) {
      return warehouse == val.WhsCode;
     });
 
     if (validItem.length <= 0) {
      this.toastrService.danger('Enter correct Warehouse Code');
      this.DfltWarehouse = '';
      return;
     }
    });
  }
 
  openWarehouseLookup(dialog: TemplateRef < any > ) {
 
   this.dash.GetWarehouseList(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB).subscribe(
    data => {
     this.gridData = data;
     this.Item = false;
     this.whse = true;
     this.Lot = false;
     this.lookUpHeading = 'Warehouse';
     this.dialogService.open(dialog);
    },
    error => {
     // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     this.toastrService.danger("No Record Found!");    
    }
   )
  }
 
  onLotNumberBlur(LotNum) {
   this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.trackName).subscribe(
    data => {
     let DistNum = '';
     if (LotNum == 'From')
      DistNum = this.DistNumFrom;
     else
      DistNum = this.DistNumTo;
 
     let validItem = data.filter(function(val) {
      return DistNum == val.DistNumber;
     });
 
     if (validItem.length <= 0) {
      this.toastrService.danger('Enter correct Lot Number');
      this.DfltWarehouse = '';
      if (LotNum == 'From')
       this.DistNumFrom = '';
      else
       this.DistNumTo = '';
      return;
     }
    });
  }
 
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
     // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     this.toastrService.danger("No Record Found!");    
    }
   )
  }
 
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
     // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     this.toastrService.danger("No Record Found!");    
    }
    
   )
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
     // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     this.toastrService.danger("No Record Found!");    
    }
   )
  }
 
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
     this.transactiondetails = data;
     this.AnalysisData = data;
    } 
    },
 
    error => {
     // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     this.toastrService.danger("No Record Found!");    
    }
   )
  }
 
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
 
  GetExplosion() {
    this.loading = true;
    //setTimeout(() => this.loading = false, 3000);
 
   if (this.ItemValue == null || this.ItemValue == undefined || this.ItemValue == '' || this.ItemValue == " ") {
    this.toastrService.danger('Please enter Item Code');
    this.loading = false;
    return;
   }
 
   if (this.DfltWarehouse == null || this.DfltWarehouse == undefined || this.DfltWarehouse == '' || this.DfltWarehouse == " ") {
    this.toastrService.danger('Please enter Warehouse Code');
    this.loading = false;
    return;
   }
 
   if (this.DistNumFrom == null || this.DistNumFrom == undefined || this.DistNumFrom == '' || this.DistNumFrom == " ") {
    this.toastrService.danger('Please enter Lot From');
    this.loading = false;
    return;
   }
 
   if (this.DistNumTo == null || this.DistNumTo == undefined || this.DistNumTo == '' || this.DistNumTo == " ") {
    this.toastrService.danger('Please enter Lot To');
    this.loading = false;
    return;
   }
 
   if (this.radioExplode == 'Lot Explosion')
    this.explodeDirection = 'DOWN';
   else
    this.explodeDirection = 'UP';
 
   this.dash.GetLotExplosionData(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB, this.ItemValue, this.DfltWarehouse, this.DistNumFrom, this.DistNumTo, this.explodeDirection).subscribe(
    data => {
      console.log(data.length);
    if(data.length==0){
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
       // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
    }
   )
 
   this.searchCriteriaToggle(event);
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