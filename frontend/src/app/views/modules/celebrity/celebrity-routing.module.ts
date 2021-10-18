import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CelebrityComponent } from './celebrity.component';
import { CelebritySaveComponent } from './celebrity-save/celebrity-save.component';

const routes: Routes = [
    { path: 'new', component: CelebritySaveComponent },
    { path: ':code/edit', component: CelebritySaveComponent },
    { path: '', component: CelebrityComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CelebrityRoutingModule { }