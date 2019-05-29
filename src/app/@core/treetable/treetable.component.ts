import { Component, OnInit  } from '@angular/core';


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
    selector: 'app-treetable',
    templateUrl: './treetable.component.html',
    styleUrls: ['./treetable.component.css']
})
export class TreetableDemoComponent implements OnInit {
    files2: TreeNode[];

    cols: any[];
    constructor() { }

    ngOnInit() {

        this.files2 = this.myfiles;
        this.cols = [
            { field: 'item', header: 'Item' },
            { field: 'inStock', header: 'In Stock' },
            { field: 'commited', header: 'Commited' },
            { field: 'onOrder', header: 'On Order' },
            { field: 'avlQty', header: 'Avl Qty' }
        ];
    }

    // tslint:disable-next-line:member-ordering
   /* myfiles: TreeNode[] = [
        {
          data: {
            item: 'Cloud',
            inStock: '20mb',
            commited: 'Folder',
            onOrder: '4',
            avlQty: '5'
          },
          children: [
            {
              data: {
                item: 'backup-1.zip',
                inStock: '10mb',
                commited: 'Zip',
                onOrder: '4',
                avlQty: '5'
              },
              children: [
                {
                  data: {
                    item: 'backup-1.zip',
                    inStock: '10mb',
                    commited: 'Zip',
                    onOrder: '4',
                    avlQty: '5'
                  },
                  children: [
                    {
                      data: {
                        item: 'backup-1.zip',
                        inStock: '10mb',
                        commited: 'Zip',
                        onOrder: '4',
                        avlQty: '5'
                      },
                      
                    },
                    {
                      data: {
                        item: 'backup-2.zip',
                        inStock: '10mb',
                        commited: 'Zip',
                        onOrder: '4',
                        avlQty: '5'
                      },
                      children: [
                        {
                          data: {
                            item: 'backup-1.zip',
                            inStock: '10mb',
                            commited: 'Zip',
                            onOrder: '4',
                            avlQty: '5'
                          },
                          children: [
                            {
                              data: {
                                item: 'backup-1.zip',
                                inStock: '10mb',
                                commited: 'Zip',
                                onOrder: '4',
                                avlQty: '5'
                              },
                              children: [
                                {
                                  data: {
                                    item: 'backup-1.zip',
                                    inStock: '10mb',
                                    commited: 'Zip',
                                    onOrder: '4',
                                    avlQty: '5'
                                  },
                                  
                                },
                                {
                                  data: {
                                    item: 'backup-2.zip',
                                    inStock: '10mb',
                                    commited: 'Zip',
                                    onOrder: '4',
                                    avlQty: '5'
                                  },
                                  
                                },
                                {
                                  data: {
                                    item: 'backup-1.zip',
                                    inStock: '10mb',
                                    commited: 'Zip',
                                    onOrder: '4',
                                    avlQty: '5'
                                  },
                                  
                                },
                                {
                                  data: {
                                    item: 'backup-2.zip',
                                    inStock: '10mb',
                                    commited: 'Zip',
                                    onOrder: '4',
                                    avlQty: '5'
                                  },
                                  
                                },
                                
                              ],
                              
                            },
                            {
                              data: {
                                item: 'backup-2.zip',
                                inStock: '10mb',
                                commited: 'Zip',
                                onOrder: '4',
                                avlQty: '5'
                              },
                              
                            },
                            
                          ],
                          
                        },
                        {
                          data: {
                            item: 'backup-2.zip',
                            inStock: '10mb',
                            commited: 'Zip',
                            onOrder: '4',
                            avlQty: '5'
                          },
                          
                        },
                        
                      ],
                      
                    },
                    
                  ],
                  
                },
                {
                  data: {
                    item: 'backup-2.zip',
                    inStock: '10mb',
                    commited: 'Zip',
                    onOrder: '4',
                    avlQty: '5'
                  },
                  
                },
                
              ],
              
            },
            {
              data: {
                item: 'backup-2.zip',
                inStock: '10mb',
                commited: 'Zip',
                onOrder: '4',
                avlQty: '5'
              },
              
            },
            {
              data: {
                item: 'backup-3.zip',
                inStock: '10mb',
                commited: 'Zip',
                onOrder: '4',
                avlQty: '5'
              },
              
            },
            {
              data: {
                item: 'backup-4.zip',
                inStock: '10mb',
                commited: 'Zip',
                onOrder: '4',
                avlQty: '5'
              },
              
            },
            
          ],
          
        },
        {
          data: {
            item: 'Desktop',
            inStock: '20mb',
            commited: 'Folder',
            onOrder: '4',
            avlQty: '5'
          },
          children: [
            {
              data: {
                item: 'backup-1.zip',
                inStock: '10mb',
                commited: 'Zip',
                onOrder: '4',
                avlQty: '5'
              },
              children: [
                {
                  data: {
                    item: 'backup-1.zip',
                    inStock: '10mb',
                    commited: 'Zip',
                    onOrder: '4',
                    avlQty: '5'
                  },
                  
                },
                {
                  data: {
                    item: 'backup-2.zip',
                    inStock: '10mb',
                    commited: 'Zip',
                    onOrder: '4',
                    avlQty: '5'
                  },
                  
                },
                
              ],
              
            },
            {
              data: {
                item: 'backup-2.zip',
                inStock: '10mb',
                commited: 'Zip',
                onOrder: '4',
                avlQty: '5'
              },
              
            },
            
          ],
          
        }
      ];*/

    myfiles: TreeNode[] = [{
         data: {
                item: 'backup-2.zip',
                inStock: '10mb',
                commited: 'Zip',
                onOrder: '4',
                avlQty: '5'
        },children: [{
            data: {
                    item: 'backup-1.zip',
                    inStock: '10mb',
                    commited: 'Zip',
                    onOrder: '4',
                    avlQty: '5'
            },
        }] 
    }]; 
}
