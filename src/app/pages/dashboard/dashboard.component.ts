import { Component, OnInit, TemplateRef } from '@angular/core';
import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import OrgChart from '../../@core/org-chart/orgchart.js';
import { NbDialogService } from '@nebular/theme';
import { products } from 'src/app/sampleData/products.js';


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
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      alert(`context menu for ${node.data.name}`);
    }
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
  public gridData: any[] = products;
  
  selectedItem = '2';

  constructor(private dialogService: NbDialogService) {
  }

  
  ngOnInit() {
    // this.orgchart = new OrgChart({
    //   'chartContainer': '#chart-container',
    //   'data' : datascource,
    //   'nodeContent': 'title',
    //   'nodeID': 'id',
    //   'depth': 1,
    //   'direction': 'l2r',
    //   'pan': false,
    //   'zoom': false,
    //   'toggleSiblingsResp': false,
    //   'createNode': function(node, data) {
    //     let secondMenu = document.createElement('div');
    //     secondMenu.setAttribute('class', 'second-menu');
    //     secondMenu.innerHTML = `
    //       <div class="node-content">
    //         <div class="node-img">
    //           <img class="node-avatar" src="./assets/images/images.png">
    //         </div>
    //         <div class="node-data">
    //           <div class="data-column">
    //             <div class="data-heading">
    //               Item
    //             </div>
    //             <div class="data-content">
    //               INT
    //             </div>
    //           </div>

    //           <div class="data-column">
    //             <div class="data-heading">
    //               Warehouse
    //             </div>
    //             <div class="data-content">
    //               LOT 1
    //             </div>
    //           </div>
              
    //           <div class="data-column">
    //             <div class="data-heading">
    //               Lot #
    //             </div>
    //             <div class="data-content">
    //               LOT 1
    //             </div>
    //           </div>

    //           <div class="data-column">
    //             <div class="data-heading">
    //               Expiry Date
    //             </div>
    //             <div class="data-content">
    //               01/01/01
    //             </div>
    //           </div>

    //           <div class="data-column">
    //             <div class="data-heading">
    //               Receipt Date
    //             </div>
    //             <div class="data-content">
    //               01/01/01
    //             </div>
    //           </div>

    //           <div class="data-column">
    //             <div class="data-heading">
    //               Lot Status
    //             </div>
    //             <div class="data-content">
    //               Release
    //             </div>
    //           </div>

    //           <div class="data-column">
    //             <div class="data-heading">
    //               Quantity
    //             </div>
    //             <div class="data-content">
    //               10.000 KG
    //             </div>
    //           </div>

    //         </div>
    //       </div>
    //       <div class="node-footer">
    //         <div class="footer-column">
    //           <div class="column-heading">
    //             Total Received
    //           </div>
    //           <div class="column-content">
    //             text
    //           </div>
    //         </div>
    //         <div class="footer-column">
    //           <div class="column-heading">
    //             Total Issued
    //           </div>
    //           <div class="column-content">
    //             text
    //           </div>
    //         </div>
    //         <div class="footer-column">
    //           <div class="column-heading">
    //             Onhand
    //           </div>
    //           <div class="column-content">
    //             text
    //           </div>
    //         </div>
    //       </div>
        
    //     `;
    //     // secondMenu.innerHTML = `<img class="avatar" src="../img/avatar/${data.id}.jpg">`;
    //     node.appendChild(secondMenu);
    //   }
    // });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  nodes = [
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

  options: ITreeOptions = {
    actionMapping
  };

 

  

  
}
