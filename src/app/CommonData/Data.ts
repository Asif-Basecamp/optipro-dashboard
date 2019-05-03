//this list for Sign In and Sign Out Time.
export class RecordModel {
    ItemCode: string;
    ItemName: string;   


   public constructor (code, name) {
       this.ItemCode = code;
       this.ItemName = name;      
   }
}
