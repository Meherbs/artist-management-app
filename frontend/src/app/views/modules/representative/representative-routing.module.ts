import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepresentativeSaveComponent } from './representative-save/representative-save.component';
import { RepresentativeComponent } from './representative.component';

const routes: Routes = [
    { path: 'new', component: RepresentativeSaveComponent },
    { path: ':code/edit', component: RepresentativeSaveComponent },
    { path: '', component: RepresentativeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RepresentativeRoutingModule { }