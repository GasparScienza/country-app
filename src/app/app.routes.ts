import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
    },
    {
        path: "country",
        loadChildren: () => import("./country/country.routes"),
    },
    {
        path: "**",
        redirectTo: "",
    }
];
