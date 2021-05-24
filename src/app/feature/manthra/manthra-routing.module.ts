import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyiineNameComponent } from './gata-ha/ayiine-name/ayiine-name.component';
import { AzadComponent } from './gata-ha/azad/azad.component';
import { CheckGataHaAgeRangeGuard } from './guards/check-gata-ha-age-range.guard';
import { HaveNotRegesterdGuard } from './guards/have-not-regesterd.guard';
import { ManthraFillDataGuard } from './guards/manthra-fill-data.guard';
import { ManthtaHomeComponent } from './manthta-home/manthta-home.component';
import { ProjectBasedComponent } from './gata-ha/project-based/project-based.component';
import { SelectSectionComponent } from './gata-ha/select-section/select-section.component';
import { PersonalInformationComponent } from './mantrak/personal-information/personal-information.component';

const routes: Routes = [
  {
    path: '', canActivate: [ManthraFillDataGuard, CheckGataHaAgeRangeGuard], children: [
      { path: '', component: ManthtaHomeComponent },
      {
        path:'mantrak',children:[
          {
            path:'personal-information',
            component:PersonalInformationComponent
          }
        ]
      },
      {
        path: 'gata-ha',
        canActivate: [CheckGataHaAgeRangeGuard],
        children: [
          { path: '', component: AyiineNameComponent },
          {
            path: 'section', children: [
              { path: 'azad', component: AzadComponent },
              { path: 'project-based', component: ProjectBasedComponent },
            ]
          },
          { path: 'select-section', component: SelectSectionComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManthraRoutingModule { }