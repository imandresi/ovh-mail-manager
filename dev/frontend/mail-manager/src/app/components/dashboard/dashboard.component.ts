import { Component, OnInit } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { MailManagerService } from "../../services/mail-manager.service";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { AppStateService } from "../../services/app-state.service";
import { MailboxUsageComponent } from "../mailbox-usage/mailbox-usage.component";
import { MatDialog } from "@angular/material/dialog"
import { NewPasswordDialogComponent } from "../new-password-dialog/new-password-dialog.component";
import { AlertComponent } from "../alert/alert.component";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

export interface MailboxElement {
  email: string,
  accountName: string,
  mailboxSize: number,
  emailCount: number,
  usage: number
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    AlertComponent,
    MatTableModule,
    MatDialogModule,
    MailboxUsageComponent,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  mailboxes: Promise<any> = Promise.resolve([]);
  columnNames = ['email', 'emailCount', 'mailboxSize', 'usage', 'action'];
  alert: any = null;
  btnChangePasswordDisabled = false;

  constructor(
    private router: Router,
    private passwordDialog: MatDialog,
    public appState: AppStateService,
    public mailManager: MailManagerService) {
  }

  bytesToGigabytes(bytes: number) {
    const gigabytes = bytes / Math.pow(1000, 3);
    return gigabytes.toFixed(1) + " Gb";
  }

  openNewPasswordDialog(mailbox: MailboxElement): void {
    this.alert = null;
    this.btnChangePasswordDisabled = true;

    this.passwordDialog.open(
      NewPasswordDialogComponent, {
      data: mailbox
    }).afterClosed()
      .subscribe({
        next: result => {
          if (!result) return;

          const status = result.success ? 'success' : 'danger';
          const message = result.success ? result.message : result.error?.details?.message;

          this.alert = {
            status,
            message
          };

          this.btnChangePasswordDisabled = false;

        },
        complete: () => {
          this.btnChangePasswordDisabled = false;
        },

      }

      );
  }

  disconnect(): void {
    this.appState.reset();
    this.router.navigate(['/']);

  }

  ngOnInit(): void {
    const domainName = this.appState.domainName;

    if (!domainName) return;

    this.mailboxes = this.mailManager.getAccounts(domainName)
      .then(mailboxes => {
        return mailboxes.map(mailbox => {
          return {
            email: mailbox.email,
            accountName: mailbox.accountName,
            mailboxSize: +mailbox.size,
            emailCount: +mailbox.usage.emailCount,
            usage: +mailbox.usage.quota
          };
        });
      })
      .catch(err => {
        console.log('NgOninit:', err);
      });

  }

}
