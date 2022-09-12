/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as SSTRoutes from "./sst_route_functions";
const accountRoutes = Router();

accountRoutes.post('/authenticate', SSTRoutes.AuthenticateUser);

accountRoutes.get('/user/delete/:id', SSTRoutes.ValidateUserToken, SSTRoutes.postDeleteUser);

accountRoutes.get('/userinfo', SSTRoutes.ValidateUserToken, SSTRoutes.getUserInfo);

accountRoutes.post('/user/update', SSTRoutes.ValidateUserToken, SSTRoutes.postUpdateUser);

accountRoutes.post('/user/update/pass', SSTRoutes.ValidateUserToken, SSTRoutes.postUpdatePassword);

accountRoutes.get('/userlist', SSTRoutes.ValidateUserToken, SSTRoutes.getUserList);

accountRoutes.post('/verify', SSTRoutes.ValidateUserToken);

accountRoutes.get('/logout', SSTRoutes.logOut);

const routeAccount = Router();

routeAccount.use('/login', accountRoutes);



export default routeAccount;

