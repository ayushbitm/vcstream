import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckDeviceComponent } from './check-device/check-device.component';
import { MainComponent } from './main/main.component';
import { StreamComponent } from './stream/stream.component';

const routes: Routes = [
  { path: '', component: MainComponent },    
  // { path: 'gstream', component: StreamComponent },    
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
