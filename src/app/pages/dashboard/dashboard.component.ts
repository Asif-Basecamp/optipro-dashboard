import { Component, OnInit, TemplateRef } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import OrgChart from '../../@core/org-chart/orgchart.js';
import { NbDialogService } from '@nebular/theme';
import { products } from 'src/app/sampleData/products.js';
import { DashboardService } from 'src/app/service/dashboard.service';
import { AnalyticsService } from 'src/app/@core/utils/index.js';
import { SelectableSettings } from '@progress/kendo-angular-grid/dist/es2015/main';
import { ItemLookupComponent } from 'src/app/lookup/item-lookup/item-lookup.component.js';

import {RecordModel}  from 'src/app/CommonData/Data';
import * as eva from 'eva-icons';



  var nodeName = '';

  const actionMapping:IActionMapping = {
    mouse: {
      contextMenu: (tree, node, $event) => {
        $event.preventDefault();
        alert(`context menu for ${node.data.name}`);
      },
      dblClick: (tree, node, $event) => {
        if (node.hasChildren) {
          TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      },
      // click: (tree, node, $event) => {
      //   $event.shiftKey
      //     ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
      //     : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      //   alert(`context menu for ${node.data.name}`);
      //  var name = node.data.name;
      //   //this.GetTransaction(name);
      //   //this.Transact(name);
      // }
    },
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
  };

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit{
  public orgchart: any;
  public nextElementSibling: any;
  //public gridData: any[] = products;
  public gridData: any[];
  public arrConfigData: any;
  dataGridSelectNum: number;
  public ItemValue: any;
  public ItemDesc: any;
  public DfltWarehouse: any;
  selectedItem = '2';
  public recordModel: RecordModel[];
  public Item:boolean = false;
  public whse:boolean = false;
  public Lot:boolean = false;
  public LotFrom :boolean = false;
  public LotTo :boolean = false;
  public DistNumFrom:any;
  public DistNumTo: any;
  public mode: any;
  public trackName: any;
  public gridStatus: boolean = true;
  public nodes: any = [];
  public nodes1: any = [];
  public nodes2: any = [];
  public transactions: any = [];
  public DocEntryArr: any = [];
  public searchCriteria: boolean = false;
  public transactiondetails: any = []; 
  public Dsource: any = {};
  public CompanyDB: any;
  public radioExplode: any; 
  public explodeDirection: any ;
  //public radioOptions: any= [];  
  public AnalysisData: any = [];
  public datasource: any = [];
  
  constructor(private dialogService: NbDialogService,private dash:DashboardService ) {
  } 
  
  radioGroupValue = 'Show Data of all type of lots';
  

  ngOnInit() {

    this.arrConfigData = JSON.parse(window.localStorage.getItem('arrConfigData')); 
    this.CompanyDB = JSON.parse(window.localStorage.getItem('CompanyDB')); 

    this.radioExplode = 'Lot Explosion';    
    
    this.Dsource = {
      'id': '1',
        'name': 'Lao Lao',
        'className': 'purReceipt',
        'children': [
          { 'id': '2', 'name': 'Bo Miao', 'className': 'purReturn' },
          { 'id': '3', 'name': 'Su Miao', 'className': 'purInvoice'}
        ]
      }
    
    eva.replace();    
  }


  openItemLookup(dialog: TemplateRef<any>){

    this.dash.GetItemList(this.arrConfigData.optiProDashboardAPIURL, this.CompanyDB).subscribe(
      data =>
       {
        this.Item = true;
        this.whse = false;
        this.LotTo = false;
        this.LotFrom = false;

        this.gridData = data;
        this.dialogService.open(dialog);
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
  }

  openWarehouseLookup(dialog: TemplateRef<any>){

    this.dash.GetWarehouseList(this.arrConfigData.optiProDashboardAPIURL,this.CompanyDB).subscribe(
      data =>
       {
        this.gridData = data;
        this.Item = false;
        this.whse = true;
        this.Lot = false;
        this.dialogService.open(dialog);
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
  }


  openLotFromLookup(dialog: TemplateRef<any>){

    this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL,this.CompanyDB,this.ItemValue,this.trackName).subscribe(
      data =>
       {
        this.gridData = data;
        this.Item = false;
        this.whse = false;
        this.LotFrom = true;
        this.LotTo = false;

        this.dialogService.open(dialog);
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
  }

  openLotToLookup(dialog: TemplateRef<any>){

    this.dash.GetLotNumber(this.arrConfigData.optiProDashboardAPIURL,this.CompanyDB,this.ItemValue,this.trackName).subscribe(
      data =>
       {
        this.gridData = data;
        this.gridData = data;
        this.Item = false;
        this.whse = false;
        this.LotFrom = false;
        this.LotTo = true;
        this.dialogService.open(dialog);
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
  }

  gridRowSelectionChange(evt,ref){
    if(this.Item){
      this.dataGridSelectNum = evt.selectedRows[0].index;
      this.ItemValue = evt.selectedRows[0].dataItem.ItemCode;
      this.ItemDesc = evt.selectedRows[0].dataItem.ItemName;
      this.DfltWarehouse = evt.selectedRows[0].dataItem.DfltWH;
      if(evt.selectedRows[0].dataItem.ManBtchNum == 'Y')
      {
        this.trackName = 'Batch'
      }
      else{
        this.trackName = 'Serial'
      }
    }
    else if(this.LotFrom){
      this.DistNumFrom = evt.selectedRows[0].dataItem.DistNumber;
    }

    else if(this.LotTo){
      this.DistNumTo = evt.selectedRows[0].dataItem.DistNumber;
    }
    else{
      this.DfltWarehouse = evt.selectedRows[0].dataItem.WhsCode;
    }
    ref.close();
 }

 GetTransaction(NodeName, fullName){
  this.dash.GetTransaction(this.arrConfigData.optiProDashboardAPIURL,this.CompanyDB,NodeName).subscribe(
      data =>
       {
        this.DocEntryArr = [];
        this.nodes1 = [];
        this.transactions = data;
        
        console.log(data);

        let name = fullName;
        let childrens = [];

        let map = {};
        map["name"] = fullName;

        for(let i=0; i< this.transactions.Table.length; i++){
          childrens.push({name: '(' + this.transactions.Table[i].DistNumber + ') Doc Entry : ' + this.transactions.Table[i].DocEntry + ' - ' + this.transactions.Table[i].ObjectTypeDesc});
          this.DocEntryArr.push({key: this.transactions.Table[i].DistNumber ,
                                DocEntry: this.transactions.Table[i].DocEntry});
        }
        map["children"] = childrens;

        this.nodes1.push(map);
    },
       error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
 }

 GetTransactionDetails(Dcentry,Item){  
 
  let DC = '';  
  let stringDC = []; 
  let str = '';
  if (Dcentry.indexOf(":") > -1) {
    Dcentry = Dcentry.split(":")[1].trim();
    this.DocEntryArr.filter(function(d){ 
      if(d.DocEntry == Dcentry){
        // DC.push(d.DocEntry);
        DC = d.DocEntry;
      }
    });
  }
  else {
    Item = Dcentry;
    for(let i=0 ; i <this.DocEntryArr.length; i++){
     //stringDC.push(this.DocEntryArr[i].DocEntry);
     if(i == 0)
     str = this.DocEntryArr[i].DocEntry;
     else
     str = str + ',' + this.DocEntryArr[i].DocEntry;

    } 
    DC = str;
  }
   

  this.dash.GetTransactionDetails(this.arrConfigData.optiProDashboardAPIURL,this.CompanyDB,DC,Item,this.DfltWarehouse).subscribe(
      data =>
       {
         this.transactiondetails = data;
         console.log(data);
         this.AnalysisData = data;
         var result = {};
         for (var i=0; i<this.AnalysisData.length; i++) {
           result = this.AnalysisData[i];
           result["name"] = this.AnalysisData[i].itemcode;
         }  
         this.datasource = result;
         console.log(JSON.stringify(this.datasource));

         this.orgchart = new OrgChart({
           'chartContainer': '#chart-container',
           'data' : this.datasource,
           'nodeContent': 'title',
         //  'nodeID': 'id',
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
                       ${data.itemcode}
                     </div>
                   </div>
                   <div class="data-column">
                     <div class="data-heading">
                       Warehouse
                     </div>
                     <div class="data-content">
                       ${data.Warehouse}
                     </div>
                   </div>
                   
                   <div class="data-column">
                     <div class="data-heading">
                       Lot #
                     </div>
                     <div class="data-content">
                       ${data.LotNUmber}
                     </div>
                   </div>
                   <div class="data-column">
                     <div class="data-heading">
                       Expiry Date
                     </div>
                     <div class="data-content">
                       ${data.ExpDate}
                     </div>
                   </div>
                   <div class="data-column">
                     <div class="data-heading">
                       Receipt Date
                     </div>
                     <div class="data-content">
                       ${data.CreateDate}
                     </div>
                   </div>
                   <div class="data-column">
                     <div class="data-heading">
                       Lot Status
                     </div>
                     <div class="data-content">
                       
                     </div>
                   </div>
                   <div class="data-column">
                     <div class="data-heading">
                       Quantity
                     </div>
                     <div class="data-content">
                       ${data.Quantity}
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
                     ${data.TotalReceive}
                   </div>
                 </div>
                 <div class="footer-column">
                   <div class="column-heading">
                     Total Issued
                   </div>
                   <div class="column-content">
                     ${data.TotalIssue}
                   </div>
                 </div>
                 <div class="footer-column">
                   <div class="column-heading">
                     Onhand
                   </div>
                   <div class="column-content">
                     ${data.OnHand}
                   </div>
                 </div>
               </div>
             
             `;
             // secondMenu.innerHTML = `<img class="avatar" src="../img/avatar/${data.id}.jpg">`;
             node.appendChild(secondMenu);
          
           }
          })
      
          },
       
       error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
  }
 
 Resurse(){
   
 }

 /*-- grid view --*/
 getHierarchy(dataa, parent){
    let node = [];
    dataa.filter(function(d){        
        if(d.ParantId == parent){
             return d.ParantId == parent  
        }
    }).forEach(function(d){
     var cd = d;    
     cd.children = this.getHierarchy(dataa, d.OPTM_SEQ);
     return node.push(cd);
    }.bind(this))
   return node;
  }

   GetExplosion(){

    if(this.radioExplode == 'Lot Explosion')
      this.explodeDirection = 'DOWN';
    else
      this.explodeDirection = 'UP';
     
    this.dash.GetLotExplosionData(this.arrConfigData.optiProDashboardAPIURL,'',this.ItemValue,this.DfltWarehouse,this.DistNumFrom,this.DistNumTo,this.explodeDirection).subscribe(
      data =>
       {
        this.nodes2 = this.getHierarchy(data, '-1');
        this.gridStatus = !this.gridStatus;
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )

    this.searchCriteriaToggle(event);
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  // options: ITreeOptions = {
  //   actionMapping
  // };
 
  options = {
    actionMapping
  }

  process(){
    this.gridStatus = !this.gridStatus;
  }

  clickTransaction(evt){
    let test = evt.srcElement.textContent;
    let name = evt.srcElement.textContent;
    if(test == "" || test == undefined){
      return;
    }
    else{
      if (test.indexOf("-") > -1) {
        test = test.split("-")[1].trim();
      } 
      this.GetTransaction(test,name);
    }
  }

  clickTransactionDetails(evt){
    let dt = evt.srcElement.textContent;
    let dcentry = '';
    let disnum = '';
    if(dt == "" || dt == undefined){
      return;
    }
    else{
      if (dt.indexOf("-") > -1) {
        if(dt.indexOf(":") > -1)
          dcentry = dt.split("-")[0].trim();       
        else
        dcentry = dt.split("-")[1].trim();
      } 
      else {
        dcentry = dt;
      } 

      if (dt.indexOf(")") > -1) {
        disnum = dt.split(")")[0].split("(")[1].trim();
      } 
      else {
        disnum = dt;
      }     
      this.GetTransactionDetails(dcentry,disnum);
    }    
  }
  //Search criteria expand-shrink function  
  searchCriteriaToggle(event){
    event.stopPropagation();
    if(document.getElementById("dashboard-left").classList.contains('shrink')){      
      document.getElementById("dashboard-left").classList.remove('shrink');
      document.getElementById("selection-criteria-body").style.height= '100%';
      document.getElementById("selection-criteria-body").style.display= 'flex';
      this.searchCriteria = false;
    }else{
      document.getElementById("dashboard-left").classList.add('shrink');      
      document.getElementById("selection-criteria-body").style.height= '0';
      document.getElementById("selection-criteria-body").style.display= 'none'; 
      this.searchCriteria = true;
    }
  }
  searchCriteriaExpand(){
    if(this.searchCriteria && document.getElementById("dashboard-left").classList.contains('shrink')){      
      document.getElementById("dashboard-left").classList.remove('shrink');
      document.getElementById("selection-criteria-body").style.height= '100%';
      document.getElementById("selection-criteria-body").style.display= 'flex';
    }
  }
  

  //Custom accordian function
  customAccordianGrid(e){
    if(document.getElementById("grid-accordian").classList.contains('expanded')){
      this.hideAcordian(e);
    }else{
      this.expandAcordian(e);
    }
  }
  customAccordianAnalysis(e){
    if(document.getElementById("analysis-accordian").classList.contains('expanded')){
      this.hideAcordian(e);
    }else{
      this.expandAcordian(e);
    } 
  }
  hideAcordian(e: any){
    e.currentTarget.parentElement.parentElement.classList.remove('expanded')
    e.currentTarget.nextSibling.style.height= '0';
    e.currentTarget.nextSibling.style.display= 'none';
  }
  expandAcordian(e:any){
    e.currentTarget.parentElement.parentElement.classList.add('expanded')
    e.currentTarget.nextSibling.style.height= '100%';
    e.currentTarget.nextSibling.style.display= 'flex';
  }

  
  

}