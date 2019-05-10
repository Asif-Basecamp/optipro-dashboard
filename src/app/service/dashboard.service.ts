import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
    };

    GetItemList(optiProDashboardAPIURL:string,CompanyDBID:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: 'Build129IR4'
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetItemList",jObject,this.httpOptions);
    }

    GetWarehouseList(optiProDashboardAPIURL:string,CompanyDBID:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: CompanyDBID
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetWarehouseList",jObject,this.httpOptions);
    }

    GetLotNumber(optiProDashboardAPIURL:string,CompanyDBID:string,ItemKey:string,TrackName:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: 'Build129IR4',
       ItemKey: ItemKey,
       TrackName: TrackName
      //ItemKey: 'Battery',
     // TrackName: 'Serial'
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetLotNumber",jObject,this.httpOptions);
    }

    GetTransaction(optiProDashboardAPIURL:string,CompanyDBID:string,ItemKey:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: 'Build129IR4',
       ItemKey: ItemKey
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetTransaction",jObject,this.httpOptions);
    }

    GetTransactionDetails(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string,ItemKey:string,Warehouse:string): Observable<any>{
      let jObject:any={ ItemList: JSON.stringify([{ 
       CompanyDBID: 'Build129IR4',
       DocEntry: DocEntry,
       ItemKey:ItemKey,
       Warehouse:Warehouse
      }])};
      return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetTransactionDetails",jObject,this.httpOptions);
    }


    GetLotExplosionData(optiProDashboardAPIURL:string,CompanyDBID:string,ItemKey:string,Warehouse:string,LotFrom:string,LotTo:string,Mode:string ):Observable<any>{
      //JSON Obeject Prepared to be send as a param to API
      let jObject:any={ GetData: JSON.stringify([{ 
        CompanyDBID: CompanyDBID,
        ItemKey: ItemKey,
        Warehouse: Warehouse,
        LotFrom: LotFrom,
        LotTo: LotTo,
        Mode: Mode
        // ItemKey: 'Car_B',
        // Warehouse: '01',
        // LotFrom: 'c2',
        // LotTo: 'c3',
        // Mode: 'DOWN'
    }]) };
    //Return the response form the API  
    return this.httpClient.post(optiProDashboardAPIURL +"/Dashboard/GetLotExplosionData",jObject,this.httpOptions);
    }  
     
}
