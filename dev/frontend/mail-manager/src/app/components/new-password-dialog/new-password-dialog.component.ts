import {Component, Inject} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatLabel} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MailboxElement} from "../dashboard/dashboard.component";
import {MailManagerService} from "../../services/mail-manager.service";
import {AppStateService} from "../../services/app-state.service";

@Component({
  selector: 'app-new-password-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatDialogClose
  ],
  templateUrl: './new-password-dialog.component.html',
  styleUrl: './new-password-dialog.component.scss'
})
export class NewPasswordDialogComponent {
  newPassword = '';

  constructor(
    private appState: AppStateService,
    public mailManager: MailManagerService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public mailbox: MailboxElement) {
  }

  changePassword() {
    const domainName = this.appState.domainName;

    this.mailManager.changePassword(domainName!, this.mailbox.accountName, this.newPassword)
      .then(value => {
        this.dialogRef.close(value);
      })
      .catch(error => {
        this.dialogRef.close(error);
      });
  }

}
