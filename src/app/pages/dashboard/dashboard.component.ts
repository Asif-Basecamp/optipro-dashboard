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

const datascource = {
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
  }

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

  //declare function Transact(nm):any;

 

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
  public transactions: any = [];
  public NodeName = '';
 

  constructor(private dialogService: NbDialogService,private dash:DashboardService ) {
  }

  
    
  ngOnInit() {
    
    eva.replace();
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
    });
  }


  openItemLookup(dialog: TemplateRef<any>){

    this.dash.GetItemList('http://localhost:41807','Build129IR4').subscribe(
      data =>
       {
        console.log(data);
        this.Item = true;
        this.whse = false;
        this.LotTo = false;
        this.LotFrom = false;


        this.gridData = data;
        // for(let i=0 ;i<this.gridData.length;i++){
        //     this.gridData[i].ItemCode = this.SAPDateFormat[0];
        //     this.gridData[i].CurrentEntryDate = this.CurrentDateFormat;
        //  }



      //  this.recordModel = data;

        // for(let i=0 ;i<this.recordModel.length;i++){
        //   this.recordModel[i].CurrentDateFormat = this.SAPDateFormat[0];
        //   this.recordModel[i].CurrentEntryDate = this.CurrentDateFormat;
        // }
         this.dialogService.open(dialog);


       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
        console.log(error);
     }
    )
  }

  openWarehouseLookup(dialog: TemplateRef<any>){

    this.dash.GetWarehouseList('http://localhost:41807','Build129IR4').subscribe(
      data =>
       {
        console.log(data);
        this.gridData = data;
        this.Item = false;
        this.whse = true;
        this.Lot = false;
        this.dialogService.open(dialog);
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
        console.log(error);
     }
    )
  }


  openLotFromLookup(dialog: TemplateRef<any>){

    this.dash.GetLotNumber('http://localhost:41807','Build129IR4',this.ItemValue,this.trackName).subscribe(
      data =>
       {
        console.log(data);
        this.gridData = data;
        this.Item = false;
        this.whse = false;
        this.LotFrom = true;
        this.LotTo = false;

        this.dialogService.open(dialog);
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
        console.log(error);
     }
    )
  }

  openLotToLookup(dialog: TemplateRef<any>){

    this.dash.GetLotNumber('http://localhost:41807','Build129IR4',this.ItemValue,this.trackName).subscribe(
      data =>
       {
        console.log(data);
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
        console.log(error);
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

 GetTransaction(NodeName){
  //alert(nodeName);
  this.dash.GetTransaction('http://localhost:41807','Build129IR4',NodeName).subscribe(
      data =>
       {

        this.nodes1 = [];
        this.transactions = data;
        console.log(data);

        let name = NodeName;
        let childrens = [];

        let map = {};
        map["name"] = name;

        for(let i=0; i< this.transactions.Table.length; i++){
          childrens.push({name: this.transactions.Table[i].ObjectTypeDesc});
        }
        map["children"] = childrens;

        this.nodes1.push(map);

        
          //         map["children"]  = childrens;
          //         node.push(map);

        

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
        console.log(error);
     }
    )
 }

 GetTransactionDetails(NodeName){
  this.dash.GetTransactionDetails('http://localhost:41807','Build129IR4','','',this.trackName).subscribe(
      data =>
       {
         this.transactions = data;
        console.log(data);
       },
       error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
        console.log(error);
     }
    )
 }
 
 Resurse(){
   
 }

  GetExplosion(){

    this.dash.GetLotExplosionData('http://localhost:41807','',this.ItemValue,this.DfltWarehouse,this.DistNumFrom,this.DistNumTo,'DOWN').subscribe(
      data =>
       {


        // Get an empty hash
    //     let hash = {};

    //     // Iterate each hash for clubbing values to single keys
    //     data.forEach(function(r){
    //       if (hash[r["OPTM_PARENTBTCHSERNO"]] == undefined){
    //           hash[r["OPTM_PARENTBTCHSERNO"]] = []
    //       }
    //       hash[r["OPTM_PARENTBTCHSERNO"]].push(r["OPTM_BTCHSERNO"])
    //     })

    //     let keys = Object.keys(hash);
    //     let parents = new Set(keys);
    //     let temp = {};
    //     let tree ;

    //   keys.forEach(k => hash[k].forEach(t => {
    //       parents.delete(t);
    //       temp[k] = temp[k] || [];
    //       temp[t] = temp[t] || [];
    //       if (!temp[k].some(o => t in o)) temp[k].push({ [t]: temp[t] });
    //   }));

    // tree = Object.assign({}, ...Array.from(parents, k => ({ [k]: temp[k] })));

    // console.log(tree);

    //  this.nodes = tree;

        this.nodes = [
          {
            name: 'root1',
            children: [
              {
                name: 'child1'
              }, {
                name: 'child2'
              }
            ]
          },
          {
            name: 'root2',
            children: [
              {
                name: 'child2.1'
              }, {
                name: 'child2.2',
                children: [
                  {
                    id: 1001,
                    name: 'subsub'
                  }
                ]
              }
            ]
          },
          {
            name: 'root3',
            children: [
              {
                name: 'child3.1'
              }, {
                name: 'child3.2',
                children: [
                  {
                    id: 1003,
                    name: 'subsub'
                  }
                ]
              }, {
                name: 'child3.3',
                children: [
                  {
                    id: 1004,
                    name: 'subsub'
                  }
                ]
              }, {
                name: 'child3.4',
                children: [
                  {
                    id: 1005,
                    name: 'subsub'
                  }
                ]
              }
            ]
          },
          {
            name: 'root4',
            children: [
              {
                name: 'child4.1'
              }, {
                name: 'child4.2',
                children: [
                  {
                    id: 1006,
                    name: 'subsub'
                  }
                ]
              }, {
                name: 'child4.3',
                children: [
                  {
                    id: 1007,
                    name: 'subsub'
                  }
                ]
              }, {
                name: 'child4.4',
                children: [
                  {
                    id: 1008,
                    name: 'subsub'
                  }
                ]
              }
            ]
          },
          {
            name: 'root5',
            children: [
              {
                name: 'child5.1'
              }, {
                name: 'child5.2',
                children: [
                  {
                    id: 1009,
                    name: 'subsub'
                  }
                ]
              }, {
                name: 'child5.3',
                children: [
                  {
                    id: 1010,
                    name: 'subsub'
                  }
                ]
              }, {
                name: 'child5.4',
                children: [
                  {
                    id: 1011,
                    name: 'subsub'
                  }
                ]
              }
            ]
          }
        ];
        this.gridStatus = !this.gridStatus;
       },
      error => {
        // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
        console.log(error);
     }
    )
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  /*nodes = [
    {
      name: 'root1',
      children: [
        {
          name: 'child1'
        }, {
          name: 'child2'
        }
      ]
    },
    {
      name: 'root2',
      children: [
        {
          name: 'child2.1'
        }, {
          name: 'child2.2',
          children: [
            {
              id: 1001,
              name: 'subsub'
            }
          ]
        }
      ]
    },
    {
      name: 'root3',
      children: [
        {
          name: 'child3.1'
        }, {
          name: 'child3.2',
          children: [
            {
              id: 1003,
              name: 'subsub'
            }
          ]
        }, {
          name: 'child3.3',
          children: [
            {
              id: 1004,
              name: 'subsub'
            }
          ]
        }, {
          name: 'child3.4',
          children: [
            {
              id: 1005,
              name: 'subsub'
            }
          ]
        }
      ]
    },
    {
      name: 'root4',
      children: [
        {
          name: 'child4.1'
        }, {
          name: 'child4.2',
          children: [
            {
              id: 1006,
              name: 'subsub'
            }
          ]
        }, {
          name: 'child4.3',
          children: [
            {
              id: 1007,
              name: 'subsub'
            }
          ]
        }, {
          name: 'child4.4',
          children: [
            {
              id: 1008,
              name: 'subsub'
            }
          ]
        }
      ]
    },
    {
      name: 'root5',
      children: [
        {
          name: 'child5.1'
        }, {
          name: 'child5.2',
          children: [
            {
              id: 1009,
              name: 'subsub'
            }
          ]
        }, {
          name: 'child5.3',
          children: [
            {
              id: 1010,
              name: 'subsub'
            }
          ]
        }, {
          name: 'child5.4',
          children: [
            {
              id: 1011,
              name: 'subsub'
            }
          ]
        }
      ]
    }
  ];*/

  // options: ITreeOptions = {
    
  //  // actionMapping
  //  const actionMapping:IActionMapping = {
  //   mouse: {
  //     contextMenu: (tree, node, $event) => {
  //       $event.preventDefault();
  //       alert(`context menu for ${node.data.name}`);
  //     },
  //     dblClick: (tree, node, $event) => {
  //       if (node.hasChildren) {
  //         TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
  //       }
  //     },
  //     click: (tree, node, $event) => {
  //       $event.shiftKey
  //         ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
  //         : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
  //       //alert(`context menu for ${node.data.name}`);
  //       nodeName = node.data.name;
  //       //this.clickTree(node.data.name);
  //     }
  //   },
  //   keys: {
  //     [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  //   }
  // }
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
      this.GetTransaction(test);
  }

  clickTransactionDetails(evt){
    console.log(evt.srcElement.textContent);
    let dt = evt.srcElement.textContent;
      this.GetTransactionDetails(dt);
  }

}