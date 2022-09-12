/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response, NextFunction } from 'express';
import SSTGetActions from 'src/st_sst_api/sst_class_methods_get';
import SSTPutActions from 'src/st_sst_api/sst_class_methods_put';
import SSTPostActions from 'src/st_sst_api/sst_class_methods_post';
import SSTMasterList from 'src/st_mailer/st_export_csvsstmaster';
import * as Models from '../st_models/sst_insert_models';
import * as Model from '../st_models/sst_models';
import multer from 'multer';
import fs, { writeFile } from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import { promisify } from 'util';
import { json2csvAsync } from 'json-2-csv';

import mime from 'mime';
const client = redis.createClient();
const getRedisAsync = promisify(client.get).bind(client);
client.on("connect", function () {
     console.log("Redis plugged in.");
});
client.on("error", function (error: any) {
     console.log(error);
})
const sstGetActions = new SSTGetActions();
const sstPutActions = new SSTPutActions();
const sstPostActions = new SSTPostActions();
const sstMasterListCSV = new SSTMasterList();
const accessTokenSecret = "be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";
/**
 * 
 * @param req 
 * @param res 
 */

export async function getSSTMasterListCSV(req: Request, res: Response): Promise<void> {
     try {
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const searchParam: Model.SSTExportListCSV = JSON.parse(req.params.search);

               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               const exportFileName = tokenData.username + '.csv';
               const folderPath = path.join(__dirname, '/../../public/' + exportFileName)
               const sstList = await sstMasterListCSV.SSTMasterLISTCSVExport(searchParam);

               if (sstList.length > 0) {
                    writeFile(folderPath, "\ufeff" + await json2csvAsync(sstList), function (err) {
                         res.set('Content-Disposition', `attachment; filename=export_file.csv`);
                         res.status(StatusCodes.OK).download(folderPath);
                         if (err) res.status(StatusCodes.BAD_REQUEST).json(JSON.parse('{"result":"Error Occured!"}'));
                    });
               } else {
                    res.status(StatusCodes.BAD_REQUEST).json(JSON.parse('{"result":"Nothing to download!"}'));
               }
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getActivityListonEdit(req: Model.ExRequest, res: Response): Promise<void> {
     try {
          const  { stcID } = req.query;
          console.log(req.query)
          res.status(StatusCodes.OK).json(await sstGetActions.getActivityListonEdit(stcID));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getActivityList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getActivityList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
 export async function getActivityListGroup(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getActivityListGroup());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * Get all base list.
 * @param req 
 * @param res 
 * @returns 
 */
export async function getBaseList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getBaseList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getMachineList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getMachineList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getProcessList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getProcessList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getToolsListAction(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getToolsListAction());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getToolsListAnalysis(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getToolsListAnalysis());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getToolsListAwareness(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getToolsListAwareness());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getToolsListResult(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getToolsListResult());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getToolsUsedList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getToolsUsedList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
export async function getReasonList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getReasonList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function postUpdateSST(req: Request, res: Response): Promise<void> {
     try {
          const data: Models.CreateSST = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.modifiedbygid = tokenData.gid;
               console.log(data);
               res.status(StatusCodes.OK).json(await sstPutActions.postUpdateSST(data));
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}

export async function postUpdateSSTReply(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.SSTFormReply = req.body;
          console.log(data);
          res.status(StatusCodes.OK).json(await sstPutActions.postUpdateSSTReply(data));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getSSTMasterList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getSSTMasterList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postdeleteSST(req: Request, res: Response): Promise<void> {
     try {

          const data: Model.SSTMasterList = req.body;
          console.log(data.sst_id);
          res.status(StatusCodes.OK).json(await sstPostActions.deleteSST(data));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function uploadSSTFilesStorage(req: Request, res: Response, next: NextFunction) {
     try {
          const docnum = req.params.docnumber;
          const maxFileSize: number | undefined = 10485760; //10MB 
          let folderPath = "";
          if (docnum.includes('SST')) {
               folderPath = path.join(__dirname, '/../../uploads/sstfiles/' + docnum);
          } else {
               folderPath = path.join(__dirname, '/../../uploads/sstreplyfiles/' + docnum);
          }
          if (!fs.existsSync(folderPath)) {
               fs.mkdirSync(folderPath);
          }
          const storage = multer.diskStorage({
               destination: function (req: Request, file: Express.Multer.File, cb) {

                    cb(null, folderPath)
               },
               filename: function (req, file, cb) {
                    cb(null, file.originalname);
               }
          });
          const upload = multer({ storage: storage, limits: { fileSize: maxFileSize } }).array('sstfiles', 5);

          upload(req, res, (err) => {

               if (err) {
                    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                         res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"5つの添付ファイルのみが許可されています！"}`));
                    }
                    else if (err.code === 'LIMIT_FILE_SIZE') {
                         res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"最大ファイルサイズは10MBです！"}`));
                    } else {
                         res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.code}"}`));
                    }
               } else if (!err) {
                    next();
               }
          });



     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }


}
/**
 * 
 * @param req 
 * @param res 
 */
export async function SSTCreate(req: Request, res: Response): Promise<void> {
     try {
          const sst_data: Models.CreateSST = JSON.parse(req.body.data);
          sst_data.sstfiles = req.files;
          await sstPostActions.postCreateSSTManual(sst_data);
          if (sst_data.sstfiles.length > 0) {
               await sstPutActions.postCreateSSTUpload(sst_data.sstfiles, sst_data.documentNumber, res);
          }
          res.status(StatusCodes.OK).json(JSON.parse(`{"result":"success"}`));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function UploadSSTFileSave(req: Request, res: Response): Promise<void> {
     try {
          const sst_data: Model.SSTMasterList[] = JSON.parse(req.body.data);
          const sst_newfiles: Model.FileInterface[] = JSON.parse(JSON.stringify(req.files));
          await sstPutActions.postCreateSSTUpload(sst_newfiles, sst_data[0].sst_doc_number, res);
          res.status(StatusCodes.OK).json(JSON.parse(`{"result":"success"}`));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function UploadSSTFileReplySave(req: Request, res: Response): Promise<void> {
     try {
          const sst_data: Model.SSTReply[] = JSON.parse(req.body.data);
          const sst_replynewfiles: Model.FileInterface[] = JSON.parse(JSON.stringify(req.files));
          await sstPutActions.postCreateSSTReplyUpload(sst_replynewfiles, sst_data[0].str_reply_rowid, res);
          res.status(StatusCodes.OK).json(JSON.parse(`{"result":"success"}`));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function allowViewFiles(req: Request, res: Response, next: NextFunction) {
     try {
          //console.log(req);
          const public_uploads = path.join(__dirname, '/../../uploads/sstfiles/1629360049999/自転車保険証.pdf');
          // res.download(public_uploads)
          const id = parseInt(req.params.id);
          console.log(public_uploads);
          if (id === 1) {

               next();
          } else {
               res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"no username"}`));
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function downloadFile(req: Request, res: Response) {
     try {
          const docnum = req.params.docnumber;
          const docfiles: Model.SSTReply[] = JSON.parse(req.params.sstfiles);
          const folderPath = path.join(__dirname, '/../../uploads/sstfiles/' + docnum);

          fs.readdir(folderPath, (err, files) => {
               if (files?.length === 0 || files === undefined) {
                    console.log('here');
                    res.status(StatusCodes.BAD_REQUEST).json(JSON.parse('{"result":"Nothing to download!"}'));
               } else {
                    const zip = new AdmZip();
                    zip.addLocalFolder(path.join(__dirname, '/../../uploads/sstfiles/' + docnum), docnum);
                    for (let x = 0; x < docfiles.length; x++) {
                         zip.addLocalFolder(path.join(__dirname, '/../../uploads/sstreplyfiles/' + docfiles[x].str_reply_rowid), docfiles[x].stb_base_desc);
                    }
                    zip.getEntries().forEach(entry => {
                         entry.header.made = 0x314;
                         entry.header.flags |= 0x800;
                    });
                    const downloadName = `${Date.now()}.zip`;
                    const data = zip.toBuffer();
                    res.set('Content-Type', 'application/octet-stream');
                    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
                    res.status(StatusCodes.OK).send(data);
               }
          });
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export function downloadFileReply(req: Request, res: Response) {
     try {

          const docnum = req.params.docnumber;
          const folderPath = path.join(__dirname, '/../../uploads/sstreplyfiles/' + docnum);
          fs.readdir(folderPath, (err, files) => {
               if (files?.length === 0 || files === undefined) {
                    console.log('here');
                    res.status(StatusCodes.BAD_REQUEST).json(JSON.parse('{"result":"Nothing to download!"}'));
               } else {
                    const zip = new AdmZip();
                    zip.addLocalFolder(folderPath);
                    zip.getEntries().forEach(entry => {
                         entry.header.made = 0x314;
                         entry.header.flags |= 0x800;
                    });
                    const downloadName = `${Date.now()}.zip`;
                    const data = zip.toBuffer();
                    res.set('Content-Type', 'application/octet-stream');
                    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
                    res.status(StatusCodes.OK).send(data);
               }
          });
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export function downloadManual(req: Request, res: Response) {
     try {
          const manualFile = "SST進捗管理システム_操作マニュアル.pptx";
          const folderPath = path.join(__dirname, '/../../public/');
          console.log(folderPath);
          fs.readdir(folderPath, (err, files) => {
               if (files?.length === 0 || files === undefined) {
                    res.status(StatusCodes.BAD_REQUEST).json(JSON.parse('{"result":"Nothing to download!"}'));
               } else {
                    const folderPath2 = path.join(__dirname, '/../../public/' + manualFile);
                    res.set('Content-Type', mime.lookup(folderPath2));
                    res.set('Content-Disposition', `attachment; filename="sst.pptx"`);
                    res.status(StatusCodes.OK).download(folderPath2);
               }
          });
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function SSTFileDelete(req: Request, res: Response): Promise<void> {
     try {
          await sstPostActions.SSTFileDelete(req.body);
          res.status(StatusCodes.OK).json(JSON.parse(`{"result":"success"}`));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"File(s) is not existing or already deleted!"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function SSTFilesList(req: Request, res: Response): Promise<void> {
     try {
          const sstID = parseInt(req.params.id);
          res.status(StatusCodes.OK).json(await sstGetActions.getSSTFilesList(sstID));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function SSTFilesReplyList(req: Request, res: Response): Promise<void> {
     try {
          const sstReplyID = parseInt(req.params.id);
          res.status(StatusCodes.OK).json(await sstGetActions.getSSTFilesReplyList(sstReplyID));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function SSTFileReplyDelete(req: Request, res: Response): Promise<void> {
     try {
          await sstPostActions.SSTFileReplyDelete(req.body);
          res.status(StatusCodes.OK).json(JSON.parse(`{"result":"success"}`));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"File(s) is not existing or already deleted!"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function logOut(req: Request, res: Response): Promise<void> {
     try {
          const userToken = req.headers.authorization;
          if (userToken) {
               const token = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const dtoken: Model.decodeTokenInterface = JSON.parse(token);

               if (await getRedisAsync(dtoken.username)) {
                    client.del(dtoken.username);
                    res.status(StatusCodes.OK).json(JSON.parse(`{"result":"success"}`));
               } else {
                    res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"token expired!"}`));
               }
          } else {
               res.status(StatusCodes.OK).json(JSON.parse(`{"result":"OK"}`));
          }
     } catch (err: any) {
          res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function AuthenticateUser(req: Request, res: Response): Promise<void> {
     try {
          const loginData: Model.LoginInterface = req.body;
          if (Object.keys(loginData).length !== 0) {
               const query: Model.LoginResultInterface[] | null = await sstPostActions.AuthenticateAccount(loginData);
               if (query !== null) {
                    const comparePass = await bcrypt.compare(loginData.userpass, query[0].su_passcrypt);
                    const userIP: string | string[] | undefined = req.headers['x-real-ip'] || req.socket.remoteAddress;
                    if (comparePass) {
                         const accessToken = jwt.sign({
                              gid: query[0].su_gid,
                              username: query[0].su_gid_full,
                              baseid: query[0].su_base_id,
                              basedesc: query[0].stb_base_desc,
                              accesslvl: query[0].su_acclvl_id,
                              access: query[0].st_acclvl_desc
                         }, accessTokenSecret, { expiresIn: '4h' });
                         const token = jwt.decode(accessToken);
                         console.log(token);
                         client.set(loginData.usergid, accessToken);
                         createUserLogs(query, userIP);
                         res.status(StatusCodes.OK).json(JSON.parse(`{"token":"${accessToken}"}`));
                    } else {
                         res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":Username or password is incorrect!!"}`));
                    }
               } else {
                    res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"Username or password is incorrect!"}`));

               }
          } else {
               res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"Username or password is incorrect!"}`));
     }
}

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function ValidateUserToken(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {

          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               const tokenRedis = await getRedisAsync(tokenData?.username); //find username in redis 
               if (tokenRedis) {
                    jwt.verify(tokenRedis, accessTokenSecret, (err) => {
                         if (err) {
                              res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
                         } else {
                              next();
                         }
                    });
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }
          } else {
               res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
          }

     } catch (err: any) {
          res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
     }
}
/**
 * 
 * @param loginData 
 * @param userIP 
 */
export async function createUserLogs(loginData: Model.LoginResultInterface[], userIP: string | string[] | undefined): Promise<void> {
     try {
          if (Object.keys(loginData).length !== 0) {
               const userLogs: Model.UserLogs = {
                    GID: loginData[0].su_gid,
                    IPAddress: userIP
               };
               await sstPostActions.postCreateUserLogs(userLogs);
          }
     } catch (err: any) {
          console.log(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postRegisterUser(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.RegisterUserInfo = req.body;

          const saltPass = 10;
          const salt: string = bcrypt.genSaltSync(saltPass);
          const encryptPass: string = await bcrypt.hash(data.passwordA, salt);
          res.status(StatusCodes.OK).json(sstPostActions.postRegisterUser(data, encryptPass));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function getProgressSelectList(req: Request, res: Response): Promise<void> {
     try {
          res.status(StatusCodes.OK).json(await sstGetActions.getProgressSelectList());
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postUpdateUser(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.RegisterUserInfo = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.updategid = tokenData.gid
               console.log(tokenData);
               res.status(StatusCodes.OK).json(await sstPutActions.postUpdateUser(data));
          }

     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function getValidateRegisterUser(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
          const data: Model.RegisterUserInfo = req.body;

          const valid: Model.ValidateUser[] = await sstGetActions.getValidateUser(data.gidFull)
          if (valid[0].existing > 0) {
               res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"アカウントはすでに存在します！"}`));
          } else {
               next();
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function getValidateBase(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
          console.log(req.body);

          const data: Models.CreateBase = req.body;
          const valid: Model.ValidateUser[] = await sstGetActions.getValidateBase(data);
          if (valid[0].existing > 0) {
               res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"拠点名はすでに存在します！"}`));
          } else {
               next();
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function getValidateActivity(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
          console.log(req.body);

          const data: Model.UpdateActivity = req.body;
          const valid: Model.ValidateUser[] = await sstGetActions.getValidateActivity(data);
          if (valid[0].existing > 0) {
               res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"活動内容はすでに存在します！"}`));
          } else {
               next();
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getUserInfo(req: Request, res: Response): Promise<void> {
     try {
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               res.status(StatusCodes.OK).json(await sstGetActions.UserInfo(tokenData.username));
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getUserList(req: Request, res: Response): Promise<void> {
     try {
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               res.status(StatusCodes.OK).json(await sstGetActions.getUserList(tokenData));
          }

     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function getRegisterList(req: Request, res: Response): Promise<void> {
     try {
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               res.status(StatusCodes.OK).json(await sstGetActions.getRegisterList(tokenData));
          }

     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function postDeleteUser(req: Request, res: Response): Promise<void> {
     try {
          const accID = parseInt(req.params.id);
          res.status(StatusCodes.OK).json(await sstGetActions.postDeleteUser(accID));
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function postCreateBase(req: Request, res: Response): Promise<void> {
     try {
          const data: Models.CreateBase = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.createdbygid = tokenData.gid
               console.log(tokenData);
               if (tokenData.accesslvl !== 4 && tokenData.accesslvl !== 3) {
                    res.status(StatusCodes.OK).json(await sstPostActions.postCreateBase(data));
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }

          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export async function postUpdateBase(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.UpdateBase = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.updatedbygid = tokenData.gid
               console.log(tokenData);
               if (tokenData.accesslvl !== 4 && tokenData.accesslvl !== 3) {
                    res.status(StatusCodes.OK).json(await sstPutActions.postUpdateBase(data));
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }

          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postUpdateActivityList(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.UpdateActivity = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.updatedbygid = tokenData.gid
               console.log(tokenData);
               if (tokenData.accesslvl !== 4) {
                    res.status(StatusCodes.OK).json(await sstPutActions.postUpdateActivityList(data));
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }

          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postCreateActivityList(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.CreateActivity = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.createdbygid = tokenData.gid
               console.log(tokenData);
               if (tokenData.accesslvl !== 4) {
                    res.status(StatusCodes.OK).json(await sstPostActions.postCreateActivityList(data));
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }

          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postUpdateActivityGroup(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.updateActivityGroupParam = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.updatedbygid = tokenData.gid
               console.log(tokenData);
               if (tokenData.accesslvl !== 4) {
                    res.status(StatusCodes.OK).json(await sstPutActions.postUpdateActivityGroup(data));
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }

          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
 export async function enableActivityList(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.enableActivityList = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.updatedbygid = tokenData.gid
               console.log(tokenData);
               if (tokenData.accesslvl !== 4 && tokenData.accesslvl !== 3) {
                    res.status(StatusCodes.OK).json(await sstPutActions.enableActivityGroup(data));
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }

          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postCreateActivityGroup(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.createGroupActivityParam = req.body;
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.createdbygid = tokenData.gid 
               if (tokenData.accesslvl !== 4) {
                    res.status(StatusCodes.OK).json(await sstPostActions.postCreateActivityGroup(data));
               } else {
                    res.status(StatusCodes.UNAUTHORIZED).json(JSON.parse(`{"result":"Unauthorized!"}`));
               }

          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
/**
 * 
 * @param req 
 * @param res 
 */
export async function postUpdatePassword(req: Request, res: Response): Promise<void> {
     try {
          const data: Model.RegisterUserInfo = req.body;

          const saltPass = 10;
          const salt: string = bcrypt.genSaltSync(saltPass);
          const encryptPass: string = await bcrypt.hash(data.passwordA, salt);
          const userToken = req.headers.authorization;
          if (userToken) {
               const decodeToken = JSON.stringify(jwt.decode(userToken?.split(' ')[1]));
               const tokenData: Model.decodeTokenInterface = JSON.parse(decodeToken);
               data.updategid = tokenData.gid;
               data.passwordA = encryptPass;
               console.log(data);
               res.status(StatusCodes.OK).json(await sstPutActions.postUpdatePassword(data));
          }
     } catch (err: any) {
          res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(`{"result":"${err.message}"}`));
     }
}
