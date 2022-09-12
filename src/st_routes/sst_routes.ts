/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as SSTRoutes from "./sst_route_functions";
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const sstRoutes = Router();

sstRoutes.get('/getBaseList', SSTRoutes.ValidateUserToken, SSTRoutes.getBaseList);

sstRoutes.get('/getMachineList', SSTRoutes.ValidateUserToken, SSTRoutes.getMachineList);

sstRoutes.get('/getProcessList', SSTRoutes.ValidateUserToken, SSTRoutes.getProcessList);

sstRoutes.get('/getToolsListAction', SSTRoutes.ValidateUserToken, SSTRoutes.getToolsListAction);

sstRoutes.get('/getToolsListAnalysis', SSTRoutes.ValidateUserToken, SSTRoutes.getToolsListAnalysis);

sstRoutes.get('/getActivityList', SSTRoutes.ValidateUserToken, SSTRoutes.getActivityList);

sstRoutes.get('/getActivityListonEdit',SSTRoutes.ValidateUserToken, SSTRoutes.getActivityListonEdit);

sstRoutes.get('/getActivityListGroup', SSTRoutes.ValidateUserToken, SSTRoutes.getActivityListGroup);

sstRoutes.get('/getToolsListAwareness', SSTRoutes.ValidateUserToken, SSTRoutes.getToolsListAwareness);

sstRoutes.get('/getToolsListResult', SSTRoutes.ValidateUserToken, SSTRoutes.getToolsListResult);

sstRoutes.get('/getSSTMasterList', SSTRoutes.ValidateUserToken, SSTRoutes.getSSTMasterList);

sstRoutes.get('/getProgressSelectList', SSTRoutes.ValidateUserToken, SSTRoutes.getProgressSelectList);

sstRoutes.get('/getToolsUsedList', SSTRoutes.ValidateUserToken, SSTRoutes.getToolsUsedList);

sstRoutes.get('/getReasonList', SSTRoutes.ValidateUserToken, SSTRoutes.getReasonList);

sstRoutes.get('/getregistrationlist', SSTRoutes.ValidateUserToken, SSTRoutes.getRegisterList);

sstRoutes.post('/postUpdateSST', SSTRoutes.ValidateUserToken, SSTRoutes.postUpdateSST);

sstRoutes.post('/account/register', SSTRoutes.ValidateUserToken, SSTRoutes.getValidateRegisterUser, SSTRoutes.postRegisterUser);

sstRoutes.post('/postUpdateSSTReply', SSTRoutes.ValidateUserToken, SSTRoutes.postUpdateSSTReply);

sstRoutes.post('/postCreateBase', SSTRoutes.ValidateUserToken, SSTRoutes.getValidateBase, SSTRoutes.postCreateBase);

sstRoutes.post('/postUpdateBase', SSTRoutes.ValidateUserToken, SSTRoutes.getValidateBase, SSTRoutes.postUpdateBase);

sstRoutes.post('/postUpdateActivityList', SSTRoutes.ValidateUserToken, SSTRoutes.getValidateActivity, SSTRoutes.postUpdateActivityList);

sstRoutes.post('/postCreateActivityList', SSTRoutes.ValidateUserToken, SSTRoutes.getValidateActivity, SSTRoutes.postCreateActivityList);

sstRoutes.post('/postCreateActivityGroup', SSTRoutes.ValidateUserToken, SSTRoutes.getValidateActivity, SSTRoutes.postCreateActivityGroup);

sstRoutes.post('/postUpdateActivityGroup', SSTRoutes.ValidateUserToken, SSTRoutes.getValidateActivity, SSTRoutes.postUpdateActivityGroup);

sstRoutes.post('/postEnableActivityList', SSTRoutes.ValidateUserToken, SSTRoutes.enableActivityList);

sstRoutes.post('/postDeleteSST', SSTRoutes.ValidateUserToken, SSTRoutes.postdeleteSST);

sstRoutes.post('/upload/:docnumber', SSTRoutes.ValidateUserToken, SSTRoutes.uploadSSTFilesStorage, SSTRoutes.SSTCreate);

sstRoutes.post('/upload/single/:docnumber', SSTRoutes.ValidateUserToken, SSTRoutes.uploadSSTFilesStorage, SSTRoutes.UploadSSTFileSave);

sstRoutes.post('/upload/single/replyfile/:docnumber', SSTRoutes.ValidateUserToken, SSTRoutes.uploadSSTFilesStorage, SSTRoutes.UploadSSTFileReplySave);

const baseRoute = Router();

baseRoute.use('/sst', sstRoutes);

baseRoute.get('*', (req: Request, res: Response) => {

    res.status(StatusCodes.NOT_FOUND).json(JSON.parse(`{"result":"not found"}`));

});
export default baseRoute;

