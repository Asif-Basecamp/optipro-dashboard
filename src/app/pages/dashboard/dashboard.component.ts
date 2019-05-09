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

// const datascource = {
//   'id': '1',
//     'name': 'Lao Lao',
//     'className': 'purReceipt',
//     'children': [
//       { 'id': '2', 'name': 'Bo Miao', 'className': 'purReturn' },
//       { 'id': '3', 'name': 'Su Miao', 'className': 'purInvoice'}
      //   'children': [
      //     { 'id': '4', 'name': 'Tie Hua', 'className': 'prodReceipt' },
      //     { 'id': '5', 'name': 'Hei Hei', 'className': 'prodIssue',
      //       'children': [
      //         { 'id': '6', 'name': 'Pang Pang', 'className': 'matReturn'},
      //         { 'id': '7', 'name': 'Xiang Xiang', 'className': 'creditMemo'}
      //       ]
      //     }
      //   ]
      // },
      // { 'id': '8', 'name': 'Yu Jie', 'className': 'salesReturn' },
      // { 'id': '9', 'name': 'Yu Li', 'className': 'goodsIssue' },
  //   ]
  // }

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
  public arrConfigData: any[];
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

  

  constructor(private dialogService: NbDialogService,private dash:DashboardService ) {
  }  


    
  ngOnInit() {

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
    this.orgData();
    
  }

  orgData(){
    this.orgchart = new OrgChart({
      'chartContainer': '#chart-container',
      'data' : this.Dsource,
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
    });
  }


  openItemLookup(dialog: TemplateRef<any>){

    this.dash.GetItemList('http://localhost:41808','Build129IR4').subscribe(
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

    this.dash.GetWarehouseList('http://localhost:41808','Build129IR4').subscribe(
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

    this.dash.GetLotNumber('http://localhost:41808','Build129IR4',this.ItemValue,this.trackName).subscribe(
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

    this.dash.GetLotNumber('http://localhost:41808','Build129IR4',this.ItemValue,this.trackName).subscribe(
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
  this.dash.GetTransaction('http://localhost:41808','Build129IR4',NodeName).subscribe(
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

        // this.nodes1 = [
        //   {
        //     name: 'root1',
        //     children: [
        //       {
        //         name: 'child1'
        //       }, {
        //         name: 'child2'
        //       }
        //     ]
        //   },
        //   {
        //     name: 'root2',
        //     children: [
        //       {
        //         name: 'child2.1'
        //       }, {
        //         name: 'child2.2',
        //         children: [
        //           {
        //             id: 1001,
        //             name: 'subsub'
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     name: 'root3',
        //     children: [
        //       {
        //         name: 'child3.1'
        //       }, {
        //         name: 'child3.2',
        //         children: [
        //           {
        //             id: 1003,
        //             name: 'subsub'
        //           }
        //         ]
        //       }, {
        //         name: 'child3.3',
        //         children: [
        //           {
        //             id: 1004,
        //             name: 'subsub'
        //           }
        //         ]
        //       }, {
        //         name: 'child3.4',
        //         children: [
        //           {
        //             id: 1005,
        //             name: 'subsub'
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     name: 'root4',
        //     children: [
        //       {
        //         name: 'child4.1'
        //       }, {
        //         name: 'child4.2',
        //         children: [
        //           {
        //             id: 1006,
        //             name: 'subsub'
        //           }
        //         ]
        //       }, {
        //         name: 'child4.3',
        //         children: [
        //           {
        //             id: 1007,
        //             name: 'subsub'
        //           }
        //         ]
        //       }, {
        //         name: 'child4.4',
        //         children: [
        //           {
        //             id: 1008,
        //             name: 'subsub'
        //           }
        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     name: 'root5',
        //     children: [
        //       {
        //         name: 'child5.1'
        //       }, {
        //         name: 'child5.2',
        //         children: [
        //           {
        //             id: 1009,
        //             name: 'subsub'
        //           }
        //         ]
        //       }, {
        //         name: 'child5.3',
        //         children: [
        //           {
        //             id: 1010,
        //             name: 'subsub'
        //           }
        //         ]
        //       }, {
        //         name: 'child5.4',
        //         children: [
        //           {
        //             id: 1011,
        //             name: 'subsub'
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // ];

       },
       error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
 }

 GetTransactionDetails(Dcentry,Item){
   
  let DC= '';   
  if (Dcentry.indexOf(":") > -1) {
    Dcentry = Dcentry.split(":")[1].trim();
  }
   this.DocEntryArr.filter(function(d){ 
     if(d.DocEntry == Dcentry){
        DC = d.DocEntry;
     }
   });

  this.dash.GetTransactionDetails('http://localhost:41808','Build129IR4',DC,Item,this.DfltWarehouse).subscribe(
      data =>
       {
         this.transactiondetails = data;
         console.log(data);
         this.Dsource = [];
         
         if(data != undefined && data != null){
          let count = 1;
          for(let i=0; i < data.length; i++){
            let map = {}; 
            let child = [];           
            map["id"] = count;
            map["name"] = data[i].DistNumber;
            map["className"] = 'purReceipt';
            child.push({ 'id': '2', 'name': 'Bo Miao', 'className': 'purReturn' },
            { 'id': '3', 'name': 'Su Miao', 'className': 'purInvoice'});
            map["children"] = child;
            this.Dsource.push(map);
            count++;
          }
          this.orgData();
         }

        //  this.Dsource = {
        //     'id': '1',
        //     'name': 'Lao Lao',
        //     'className': 'purReceipt',
        //     'children': [
        //       { 'id': '2', 'name': 'Bo Miao', 'className': 'purReturn' },
        //       { 'id': '3', 'name': 'Su Miao', 'className': 'purInvoice'}
        //     ]
        //   }


       },
       error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
     }
    )
 }
 
 Resurse(){
   
 }

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
    this.dash.GetLotExplosionData('http://localhost:41808','',this.ItemValue,this.DfltWarehouse,this.DistNumFrom,this.DistNumTo,'DOWN').subscribe(
      data =>
       {
        this.nodes2 = this.getHierarchy(data, '-1');
        console.log(this.nodes2);
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
  console.log(evt.srcElement.textContent);
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
    console.log(evt.srcElement.textContent);
    let dt = evt.srcElement.textContent;
    let dcentry = '';
    let disnum = '';
    if(dt == "" || dt == undefined){
      return;
    }
    else{
      if (dt.indexOf("-") > -1) {
        dcentry = dt.split("-")[0].trim();
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