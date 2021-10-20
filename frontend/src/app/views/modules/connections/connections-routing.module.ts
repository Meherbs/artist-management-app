import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionsSaveComponent } from './connections-save/connections-save.component';
import { ConnectionsComponent } from './connections.component';

const routes: Routes = [
    { path: 'new', component: ConnectionsSaveComponent },
    { path: ':code/edit', component: ConnectionsSaveComponent },
    { path: '', component: ConnectionsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConnectionRoutingModule { }