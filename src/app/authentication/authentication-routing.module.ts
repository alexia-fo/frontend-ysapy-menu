import { Router, RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path:"",
        component: MainComponent,
        children:[
            {
                path: 'login',
                component:LoginComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthenticationRoutingModule{}