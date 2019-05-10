import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private index: number = 0;
  public psURL: string = "";
  public adminDBName: string = "OPTIPROADMIN";
  public arrConfigData: any[];
  public loginId: string;
  public password: string;
  public modelSource: any = [];
  public assignedCompanies: any = [];
  public clickSignIn: boolean = true;
  public defaultCompnyComboValue: any = [];
  public listItems: any = [] = this.defaultCompnyComboValue;
  public selectedValue: any = [];

  constructor(private auth:AuthenticationService,private httpClientSer: HttpClient,private router: Router,private toastrService: NbToastrService) {}
  
  ngOnInit() {
    const element = document.getElementsByTagName("body")[0];
    element.classList.add("opti_body-login");
    element.classList.add("opti_account-module");

    this.httpClientSer.get('./assets/configuration.json').subscribe(
      data => {
        this.arrConfigData = data as string[];
        window.localStorage.setItem('arrConfigData', JSON.stringify(this.arrConfigData[0]));
        this.getPSURL();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  getPSURL() {
    this.auth.getPSURL(this.arrConfigData[0].optiProDashboardAPIURL,this.adminDBName).subscribe(
      data => {
        if (data != null) {
          this.psURL = data;
          //this.psURL = "http://172.16.6.140/OptiAdmin";   
          this.defaultCompnyComboValue = [{ OPTM_COMPID: 'Select Company' }];
          this.listItems = this.defaultCompnyComboValue;
          this.selectedValue = this.listItems[0];
        }
      },
      error => {
        //this.toastr.error('', this.language.error_getting_psurl +error, this.Commonser.messageConfig.iconClasses.error);
        this.toastrService.danger('There is some error');
      }
    )
  }

  OnUserIdBlur(){
    if( this.loginId == "" ||  this.loginId == undefined){
      //alert("Please enter User Id");
      return;
    }
    else {
      // this.disablePassword = false;
    }
   }

  onPasswordBlur(){
    //if(this.password != null && this.password != undefined && this.password != ''){
      if (this.loginId == "" ||  this.loginId == undefined || this.password == "" || this.password == undefined) {
       // alert("User Id or Password is blank");
        return;
      }
      
      else{

      this.auth.login(this.loginId, this.password, this.psURL).subscribe(
        data => {
          this.modelSource = data;

          if (this.modelSource != null && this.modelSource.Table.length > 0 && this.modelSource.Table[0].OPTM_ACTIVE == 1) {
            this.getCompanies();
            
          }
          else{
            this.listItems = this.defaultCompnyComboValue;
            this.selectedValue = this.listItems[0];
            // this.toastr.error('', this.language.alert_incorrect_useridpassword, this.Commonser.messageConfig.iconClasses.error);
            //this.OnDropDownBlur(0);
            this.toastrService.danger('Incorrect username or password!');

          }       
        },
        error => {
         // this.toastr.error('', this.language.error_login, this.Commonser.messageConfig.iconClasses.error);
         // this.showLoader = false;
        }       
      );   
      }
    }

    getCompanies(){
      this.auth.getCompany(this.loginId, this.psURL).subscribe(
        data =>
         {
          this.modelSource = data;
          if (this.modelSource != undefined && this.modelSource != null && this.modelSource.Table.length > 0)
          {
            this.assignedCompanies = data.Table; 
            this.clickSignIn = false; 
            this.listItems = this.assignedCompanies;
           // this.listItems.unshift({ OPTM_COMPID: 'Select Company' }) 
           this.selectedValue = this.listItems[0];
          }
          else {
            this.toastrService.danger('No Company is assigned to user');
          }           
          
          }
      )
    }

    OnDropDownBlur(event){
    }

    OnSignIn(){
      this.router.navigateByUrl('/pages');
      window.localStorage.setItem('CompanyDB', JSON.stringify(this.selectedValue.OPTM_COMPID));
    }
   
   selectedItemNgModel;
   
}
