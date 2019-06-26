import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  login:FormGroup;
  RankAuto:number;
 constructor(
   public dialogRef: MatDialogRef<CreateComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,private fb:FormBuilder) {
     this.RankAuto=data;
     this.login=this.fb.group({
       Rank:[null,[Validators.required,Validators.pattern('^[0-9]+$')]],
       name:[null,[Validators.required,Validators.pattern('^[a-zA-Z-]+$'),Validators.minLength(4)]],
       percentage:[null,[Validators.required,Validators.pattern('^[0-9]+$')]],
       branch:[null,[Validators.required,Validators.pattern('^[A-Z]'),Validators.maxLength(5)]]
     });
     this.login.get('Rank').setValue(this.RankAuto);
   }

 onNoClick(): void {
   this.dialogRef.close();
 }

 ngOnInit() {
 }
getdata(){
 console.log(this.login);
}

}
