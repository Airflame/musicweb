import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumPageComponent } from './album-page/album-page.component';
import { ChartComponent } from './chart/chart.component';
import { NewAlbumFormComponent } from './new-album-form/new-album-form.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ArtistComponent } from './artist/artist.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  { path: '', component: ChartComponent },
  { path: 'album/:id', component: AlbumPageComponent},
  { path: 'new-album', component: NewAlbumFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'artist/:name', component: ArtistComponent},
  { path: 'user/:user', component: UserPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
