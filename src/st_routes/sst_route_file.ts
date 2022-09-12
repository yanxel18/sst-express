/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import * as SSTRoutes from "./sst_route_functions";
const fileRoutes = Router();

fileRoutes.get('/download/:docnumber/files/:sstfiles',SSTRoutes.ValidateUserToken,SSTRoutes.downloadFile);

fileRoutes.get('/download/reply/:docnumber/',SSTRoutes.ValidateUserToken,SSTRoutes.downloadFileReply);

fileRoutes.post('/deletefile',SSTRoutes.ValidateUserToken,SSTRoutes.SSTFileDelete);

fileRoutes.get('/download/SSTMasterListCSV/:search',SSTRoutes.ValidateUserToken, SSTRoutes.getSSTMasterListCSV);

fileRoutes.post('/deletefile/reply',SSTRoutes.ValidateUserToken,SSTRoutes.SSTFileReplyDelete);

fileRoutes.get('/sstfilelist/:id', SSTRoutes.ValidateUserToken,SSTRoutes.SSTFilesList);

fileRoutes.get('/sstfilelist/reply/:id', SSTRoutes.ValidateUserToken,SSTRoutes.SSTFilesReplyList);

fileRoutes.get('/public/manual',SSTRoutes.ValidateUserToken,SSTRoutes.downloadManual);

const routeFile = Router();

routeFile.use('/uploads/',SSTRoutes.ValidateUserToken,fileRoutes);
 

export default routeFile;

