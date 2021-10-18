import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsSaveComponent } from './accounts-save/accounts-save.component';
import { AccountsComponent } from './accounts.component';

const routes: Routes = [
    { path: 'new', component: AccountsSaveComponent },
    { path: ':code/edit', component: AccountsSaveComponent },
    { path: '', component: AccountsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }