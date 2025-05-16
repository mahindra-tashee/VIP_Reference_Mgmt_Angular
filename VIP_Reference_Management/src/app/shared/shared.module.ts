import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './pages/header/header.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { VipInitiatorComponent } from './pages/vip-initiator/vip-initiator.component';
import { VipAssignerComponent } from './pages/vip-assigner/vip-assigner.component';
import { VipAssigneeComponent } from './pages/vip-assignee/vip-assignee.component';
import { VipFinalReplyComponent } from './pages/vip-final-reply/vip-final-reply.component';
import { InitiatorFormComponent } from './pages/initiator-form/initiator-form.component';
import { UploadInitiatorDocsComponent } from './pages/upload-initiator-docs/upload-initiator-docs.component';
import { ViewReferenceComponent } from './pages/view-reference/view-reference.component';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { EditorModule } from '@tinymce/tinymce-angular';
import { ReplyEditorComponent } from './pages/reply-editor/reply-editor.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    DesktopComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    VipInitiatorComponent,
    VipAssignerComponent,
    VipAssigneeComponent,
    VipFinalReplyComponent,
    InitiatorFormComponent,
    UploadInitiatorDocsComponent,
    ViewReferenceComponent,
    ReplyEditorComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxExtendedPdfViewerModule,
    EditorModule
  ]
})
export class SharedModule { }
