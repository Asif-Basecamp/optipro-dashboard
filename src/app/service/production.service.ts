import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private httpClient : HttpClient) {
   }

   httpOptions = {
    headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':'application/json'
      })
  };

  GetItemExplosionData(optiProDashboardAPIURL:string,CompanyDBID:string,ItemFrom:string,ItemTo:string,SelectionCriteria:string,
    FromDate:Date, ToDate:Date):Observable<any>{
     // let sFromDate = new Date(FromDate).toLocaleString;
      //let sToDate = new Date(ToDate).toLocaleString;

    let jObject:any={ GetData: JSON.stringify([{ 
      CompanyDBID: CompanyDBID,
      ItemFrom: ItemFrom,
      ItemTo: ItemTo,
      SelectionCriteria: SelectionCriteria  ,
      FromDate: FromDate,
      ToDate: ToDate      
  }]) };
  return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetFinishedGoodsList",jObject,this.httpOptions);
 } 
 
 GetWorkOrderFG(optiProDashboardAPIURL:string,CompanyDBID:string,Item:string,SelectionCriteria:string,WOStatus:string,FromDate:Date, ToDate:Date):Observable<any>{
  //let sFromDate = new Date(FromDate).toLocaleString;
  //let sToDate = new Date(ToDate).toLocaleString;

  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    ItemCode: Item,
    SelectionCriteria: SelectionCriteria,
    WOStatus: WOStatus,
    FromDate: FromDate,
    ToDate: ToDate
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetWorkOrderofFinishedGoods",jObject,this.httpOptions);
} 

GetMaterialData(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string,SelectionCriteria:string,ItemCode:string, FromDate:Date, ToDate:Date,WOStatus:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    DocEntry: DocEntry,
    SelectionCriteria: SelectionCriteria,
    ItemCode: ItemCode,   
    FromDate: FromDate,
    ToDate: ToDate,
    WOStatus: WOStatus, 
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetMaterialData",jObject,this.httpOptions);
} 

GetOperationData(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    DocEntry: DocEntry
    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetOperationData",jObject,this.httpOptions);
} 

GetResourceData(optiProDashboardAPIURL:string,CompanyDBID:string,DocEntry:string):Observable<any>{
  let jObject:any={ GetData: JSON.stringify([{ 
    CompanyDBID: CompanyDBID,
    DocEntry: DocEntry
    
}]) };
return this.httpClient.post(optiProDashboardAPIURL +"ProductionDashboard/GetResourceData",jObject,this.httpOptions);
} 

}
