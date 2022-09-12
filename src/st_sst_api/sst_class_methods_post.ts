/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import sql, { IProcedureResult } from "mssql";
import * as Model from "src/st_models/sst_insert_models";
import DBConnection from "src/st_connection/connection";
import fs from "fs";
import path from "path";
import * as Models from "../st_models/sst_models";

interface ISSTPostActions {
  postCreateSSTManual: (
    value: Model.CreateSST
  ) => Promise<IProcedureResult<any>>;
  deleteSST: (value: Models.SSTMasterList) => Promise<IProcedureResult<any>>;
  SSTFileDelete: (value: Models.SSTFiles[]) => Promise<string | undefined>;
  SSTFileReplyDelete: (
    value: Models.SSTFilesReply[]
  ) => Promise<string | undefined>;
  AuthenticateAccount: (
    value: Models.LoginInterface
  ) => Promise<Models.LoginResultInterface[]>;
  postRegisterUser: (
    value: Models.RegisterUserInfo,
    hash: string
  ) => Promise<IProcedureResult<any>>;
  postDeleteUser: (
    value: Models.RegisterUserInfo,
    hash: string
  ) => Promise<IProcedureResult<any>>;
  postCreateBase: (value: Model.CreateBase) => Promise<IProcedureResult<any>>;
  postCreateUserLogs: (
    value: Models.UserLogs
  ) => Promise<IProcedureResult<any>>;
  postCreateActivityList: (
    value: Models.CreateActivity
  ) => Promise<IProcedureResult<any>>;
  postCreateActivityGroup: (
    value: Models.createGroupActivityParam
  ) => Promise<Models.createGroupActivityParam[]>;
}
class SSTPostActions extends DBConnection implements ISSTPostActions {
  /**
   *
   * @param value
   * @returns
   */
  public async postCreateSSTManual(
    value: Model.CreateSST
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("DocNumber", sql.NVarChar(30), value.documentNumber)
      .input("ApplyDate", sql.DateTime, value.applyDate)
      .input("BaseID", sql.TinyInt, value.baseID)
      .input("GID", sql.NVarChar(15), value.userGID)
      .input("LunchDate", sql.DateTime, value.lunchDate)
      .input("ScheduleStartDate", sql.DateTime, value.startDate)
      .input("ScheduleEndDate", sql.DateTime, value.endDate)
      .input("DeploymentDemand", sql.NVarChar(4000), value.conditionTxt)
      .input("ProcessID", sql.Int, value.processListID)
      .input("ProcessTxt", sql.NVarChar(200), value.processListTxt)
      .input("MachineID", sql.Int, value.machineListID)
      .input("MachineTxt", sql.NVarChar(200), value.machineListTxt)
      .input("ExpectedEffect", sql.NVarChar(4000), value.expectedEffectTxt)
      .input("AwarenessToolID", sql.SmallInt, value.awarenessToolID)
      .input("AwarenessToolTxt", sql.NVarChar(200), value.awarenessToolListTxt)
      .input("AwarenessContent", sql.NVarChar(4000), value.awarenessTxt)
      .input("AnalysisToolID", sql.SmallInt, value.analysisToolID)
      .input("AnalysisToolTxt", sql.NVarChar(200), value.analysisToolListTxt)
      .input("AnalysisContent", sql.NVarChar(4000), value.analysisTxt)
      .input("ActionToolID", sql.SmallInt, value.actionToolID)
      .input("ActionToolTxt", sql.NVarChar(200), value.actionToolListTxt)
      .input("ActionContent", sql.NVarChar(4000), value.actionTxt)
      .input("ResultToolID", sql.SmallInt, value.resultToolID)
      .input("ResultToolTxt", sql.NVarChar(200), value.resultToolListTxt)
      .input("ResultContent", sql.NVarChar(4000), value.resultTxt)
      .input("FullName", sql.NVarChar(50), value.applyUserName)
      .input("EmailAdd", sql.NVarChar(50), value.emailTxt)
      .input("LocalPhone", sql.NVarChar(15), value.localNumberTxt)
      .input("ActivityListTxt", sql.Int, value.activityListTxt)
      .execute("sp_create_sst_manual");

    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async deleteSST(
    value: Models.SSTMasterList
  ): Promise<IProcedureResult<any>> {
    const folderPath: string = path.join(
      __dirname,
      "/../../uploads/sstfiles/" + value.sst_doc_number
    );
    const newfolderPath: string = path.join(
      __dirname,
      "/../../uploads/sstfiles/" + value.sst_doc_number + "_bak"
    );
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("SSTID", sql.Int, value.sst_id)
      .execute("sp_delete_sst");
    if (fs.existsSync(folderPath)) {
      fs.rename(folderPath, newfolderPath, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully renamed the directory.");
        }
      });
    }
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async SSTFileDelete(
    value: Models.SSTFiles[]
  ): Promise<string | undefined> {
    const con = await super.openConnect();

    if (value.length > 0) {
      for (let x = 0; x < value.length; x++) {
        const folderPath: string = path.join(
          __dirname,
          "/../../uploads/sstfiles/" + value[x].sa_file_directory
        );
        if (fs.existsSync(folderPath)) {
          fs.unlinkSync(folderPath + `/${value[x].sa_filename}`);
          await con
            .request()
            .input("sa_id", sql.Int, value[x].sa_id)
            .execute("sp_sst_file_delete");
        }
      }
      return "success";
    }
  }
  /**
   *
   * @param value
   * @returns
   */
  public async SSTFileReplyDelete(
    value: Models.SSTFilesReply[]
  ): Promise<string | undefined> {
    const con = await super.openConnect();
    console.log(value);
    if (value.length > 0) {
      for (let x = 0; x < value.length; x++) {
        const folderPath: string = path.join(
          __dirname,
          "/../../uploads/sstreplyfiles/" + value[x].sar_file_directory
        );
        if (fs.existsSync(folderPath)) {
          fs.unlinkSync(folderPath + `/${value[x].sar_filename}`);
          await con
            .request()
            .input("sar_id", sql.Int, value[x].sar_id)
            .execute("sp_sst_filereply_delete");
        }
      }
      return "success";
    }
  }
  /**
   *
   * @param value
   * @returns
   */
  public async AuthenticateAccount(
    value: Models.LoginInterface
  ): Promise<Models.LoginResultInterface[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("usergid", sql.NVarChar(15), value.usergid)
      .execute("sp_login");
    const result: string = exec.recordset[0]["ACCOUNT"];
    const data: Models.LoginResultInterface[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param value
   * @param hash
   * @returns
   */
  public async postRegisterUser(
    value: Models.RegisterUserInfo,
    hash: string
  ): Promise<IProcedureResult<any>> {
    console.log(value);
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("accesslvlID", sql.TinyInt, value.accesslvlID)
      .input("baseID", sql.SmallInt, value.baseNameID)
      .input("emailAdd", sql.NVarChar(50), value.emailAdd)
      .input("fullName", sql.NVarChar(50), value.fullName)
      .input("gidFull", sql.NVarChar(15), value.gidFull)
      .input("localNumber", sql.NVarChar(15), value.localNumber)
      .input("hash", sql.NVarChar(150), hash)
      .input("productionID", sql.SmallInt, value.productionID)
      .input("createdbyGID", sql.Int, value.gid)
      .execute("sp_create_user");
    return exec;
  }
  /**
   *
   * @param value
   * @param hash
   * @returns
   */
  public async postDeleteUser(
    value: Models.RegisterUserInfo,
    hash: string
  ): Promise<IProcedureResult<any>> {
    console.log(value);
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("accesslvlID", sql.TinyInt, value.accesslvlID)
      .input("baseID", sql.SmallInt, value.baseNameID)
      .input("emailAdd", sql.NVarChar(50), value.emailAdd)
      .input("fullName", sql.NVarChar(50), value.fullName)
      .input("gidFull", sql.NVarChar(15), value.gidFull)
      .input("localNumber", sql.NVarChar(15), value.localNumber)
      .input("hash", sql.NVarChar(150), hash)
      .input("productionID", sql.SmallInt, value.productionID)
      .input("createdbyGID", sql.Int, value.gid)
      .execute("sp_create_user");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postCreateBase(
    value: Model.CreateBase
  ): Promise<IProcedureResult<any>> {
    console.log(value);
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("basename", sql.NVarChar(10), value.basename)
      .input("prodID", sql.TinyInt, value.prodID)
      .input("createdbygid", sql.Int, value.createdbygid)
      .execute("sp_create_base");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postCreateUserLogs(
    value: Models.UserLogs
  ): Promise<IProcedureResult<any>> {
    console.log(value);
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("GID", sql.NVarChar(10), value.GID)
      .input("IPAddress", sql.NVarChar(100), value.IPAddress)
      .execute("sp_create_userlogs");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postCreateActivityList(
    value: Models.CreateActivity
  ): Promise<IProcedureResult<any>> {
    console.log(value);
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("activitydesc", sql.NVarChar(300), value.activitydesc)
      .input("activityID", sql.TinyInt, value.activityid)
      .input("groupID", sql.Int, value.groupID)
      .input("createdbygid", sql.Int, value.createdbygid)
      .execute("sp_create_activitylist");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postCreateActivityGroup(
    value: Models.createGroupActivityParam
  ): Promise<Models.createGroupActivityParam[]> {
    console.log(value);
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("groupName", sql.NVarChar(50), value.groupName)
      .input("createdbygid", sql.Int, value.createdbygid)
      .execute("sp_create_activitygroup");
    return exec.recordset;
  }
}
export default SSTPostActions;
