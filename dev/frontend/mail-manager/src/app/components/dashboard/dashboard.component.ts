import {Component, OnInit} from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {MailManagerService} from "../../services/mail-manager.service";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {AppStateService} from "../../services/app-state.service";
import {MailboxUsageComponent} from "../mailbox-usage/mailbox-usage.component";
import {MatDialog} from "@angular/material/dialog"
import {NewPasswordDialogComponent} from "../new-password-dialog/new-password-dialog.component";
import {AlertComponent} from "../alert/alert.component";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

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

  mailboxes: MailboxElement[] = [];
  columnNames = ['email', 'emailCount', 'mailboxSize', 'usage', 'action'];
  alert: any = null;

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
    this.passwordDialog.open(NewPasswordDialogComponent, {
      data: mailbox
    }).afterClosed()
      .subscribe(result => {
        if (!result) return;

        const status = result.success ? 'success' : 'danger';

        this.alert = {
          status: status,
          message: result.message
        };

      });
  }

  disconnect(): void {
    this.appState.reset();
    this.router.navigate(['/']);

  }

  ngOnInit(): void {
    const domainName = this.appState.domainName;

    if (!domainName) return;

    this.mailboxes = [];
    this.mailManager.getAccounts(domainName).then(mailboxes => {
      this.mailboxes = mailboxes.map(mailbox => {
        return {
          email: mailbox.email,
          accountName: mailbox.accountName,
          mailboxSize: +mailbox.size,
          emailCount: +mailbox.usage.emailCount,
          usage: +mailbox.usage.quota
        };
      });
    });

  }

}
