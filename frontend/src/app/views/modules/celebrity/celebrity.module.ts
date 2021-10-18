import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CelebrityRoutingModule } from './celebrity-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
    declarations: [

    ],
    imports: [
        MatSidenavModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CelebrityRoutingModule,
        MatListModule,
        MatTooltipModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        ComponentsModule,
    ]
})
export class CelebrityModule { }
