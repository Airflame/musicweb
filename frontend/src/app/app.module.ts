import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ChartComponent } from './chart/chart.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumCardComponent } from './album-card/album-card.component';
import { FilterCardComponent } from './filter-card/filter-card.component';
import { AlbumPageComponent } from './album-page/album-page.component';
import { MatButtonModule } from '@angular/material/button';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ArtistComponent } from './artist/artist.component';
import { AuthGuard } from './guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewAlbumFormComponent } from './new-album-form/new-album-form.component';
import { MatMomentDateModule, MomentDateModule } from "@angular/material-moment-adapter"
import { YearPickerComponent } from './filter-card/year-picker/year-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ChartComponent,
    AlbumListComponent,
    AlbumCardComponent,
    FilterCardComponent,
    AlbumPageComponent,
    NewAlbumFormComponent,
    YearPickerComponent,
    SignUpComponent,
    LoginComponent,
    ArtistComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    NgbModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MomentDateModule,
    NgbModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
