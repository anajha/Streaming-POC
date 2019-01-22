import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatInputModule
} from '@angular/material'

import { MyNavComponent } from './my-nav/my-nav.component'
import { LayoutModule } from '@angular/cdk/layout'
import { MyDashComponent } from './my-dash/my-dash.component'
import { MyTableComponent } from './my-table/my-table.component'
import { Routes, RouterModule } from '@angular/router';
import { JobSubmitComponent } from './job-submit/job-submit.component';
import { FileDropModule } from 'ngx-file-drop';
import { FileSizeFormatterPipe } from './file-size-formatter.pipe';
import { MyTableListComponent } from './my-table-list/my-table-list.component';

const appRoutes: Routes = [
  { path: '', component: JobSubmitComponent },
  { path: 'triggerPipeline', component: JobSubmitComponent },
  { path: 'viewActiveJobs', component: MyTableComponent },
  { path: 'viewJobDAG', component: MyDashComponent },
  { path: 'viewJobHistory', component: MyTableListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    MyDashComponent,
    MyTableComponent,
    JobSubmitComponent,
    FileSizeFormatterPipe,
    MyTableListComponent
  ],
  imports: [
    BrowserModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxGraphModule, 
    MatFormFieldModule,
    NgxChartsModule,
    FileDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
