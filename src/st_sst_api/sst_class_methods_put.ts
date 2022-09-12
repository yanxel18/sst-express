/* eslint-disable @typescript-eslint/restrict-template-expressions */
import sql, { IProcedureResult } from "mssql";
import * as Model from "src/st_models/sst_insert_models";
import DBConnection from "src/st_connection/connection";
import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import * as Models from "../st_models/sst_models";

interface ISSTActionsPut {
  postCreateSSTUpload: (
    value: Model.FileInterface[],
    docnumber: string | null | undefined,
    res: Response
  ) => Promise<string | undefined>;
  postCreateSSTReplyUpload: (
    value: Model.FileInterface[],
    replyid: number | null | undefined,
    res: Response
  ) => Promise<string | undefined>;
  postUpdateSST: (value: Model.CreateSST) => Promise<IProcedureResult<any>>;
  postUpdateSSTReply: (
    value: Models.SSTFormReply
  ) => Promise<IProcedureResult<any>>;
  postUpdateUser: (
    value: Models.RegisterUserInfo
  ) => Promise<IProcedureResult<any>>;
  postUpdatePassword: (
    value: Models.RegisterUserInfo
  ) => Promise<IProcedureResult<any>>;
  postUpdateBase: (value: Models.UpdateBase) => Promise<IProcedureResult<any>>;
  postUpdateActivityList: (
    value: Models.UpdateActivity
  ) => Promise<IProcedureResult<any>>;
  enableActivityGroup: (
    value: Models.enableActivityList
  ) => Promise<IProcedureResult<any>>;
  postUpdateActivityGroup: (
    value: Models.updateActivityGroupParam
  ) => Promise<Models.updateActivityGroupParam[]>;
}
class SSTActionsPut extends DBConnection implements ISSTActionsPut {
  /**
   *
   * @param value
   * @param docnumber
   * @param res
   * @returns
   */
  public async postCreateSSTUpload(
    value: Model.FileInterface[],
    docnumber: string | null | undefined,
    res: Response
  ): Promise<string | undefined> {
    try {
      const con = await super.openConnect();
      let errMsg = "";
      for (let x = 0; x < value.length; x++) {
        await con
          .request()
          .input("DocNumber", sql.NVarChar(30), docnumber)
          .input("FileName", sql.NVarChar(255), value[x].filename.toString())
          .input("Destination", sql.NVarChar(4000), value[x].destination)
          .input("Size", sql.Int, value[x].size)
          .execute("sp_create_sst_upload")
          .catch((err: any) => {
            errMsg = err.message;
          });
        if (errMsg !== "") {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json(JSON.parse(`{"result":"${errMsg}"}`));
          break;
        }
      }
    } catch (err: any) {
      return JSON.stringify(`{"result":"${err.message}"}`);
    }
  }
  /**
   *
   * @param value
   * @param replyid
   * @param res
   * @returns
   */
  public async postCreateSSTReplyUpload(
    value: Model.FileInterface[],
    replyid: number | null | undefined,
    res: Response
  ): Promise<string | undefined> {
    try {
      const con = await super.openConnect();
      let errMsg = "";
      for (let x = 0; x < value.length; x++) {
        await con
          .request()
          .input("ReplyRowID", sql.NVarChar(30), replyid)
          .input("FileName", sql.NVarChar(255), value[x].filename.toString())
          .input("Destination", sql.NVarChar(4000), value[x].destination)
          .input("Size", sql.Int, value[x].size)
          .execute("sp_create_sstreply_upload")
          .catch((err: any) => {
            errMsg = err.message;
          });
        if (errMsg !== "") {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json(JSON.parse(`{"result":"${errMsg}"}`));
          break;
        }
      }
    } catch (err: any) {
      return JSON.stringify(`{"result":"${err.message}"}`);
    }
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postUpdateSST(
    value: Model.CreateSST
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("SSTID", sql.Int, value.sstid)
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
      .input("ModifiedByGID", sql.Int, value.modifiedbygid)
      .input("FullName", sql.NVarChar(50), value.applyUserName)
      .input("EmailAdd", sql.NVarChar(50), value.emailTxt)
      .input("LocalPhone", sql.NVarChar(15), value.localNumberTxt)
      .input("ActivityListTxt", sql.Int, value.activityListTxt)
      .execute("sp_update_sst");
    return exec;
  }

  /**
   *
   * @param value
   * @returns
   */
  public async postUpdateSSTReply(
    value: Models.SSTFormReply
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("SSTID", sql.Int, value.sstid)
      .input("SSTRowID", sql.Int, value.rownumber)
      .input("GID", sql.Int, value.gid)
      .input("ProgressReasonID",sql.SmallInt, value.progressReasonID)
      .input("ProgressID", sql.Int, value.progressComboID)
      .input("LunchDate", sql.DateTime, value.lunchDate)
      .input("ScheduleStartDate", sql.DateTime, value.startDate)
      .input("ScheduleEndDate", sql.DateTime, value.endDate)
      .input("Remarks", sql.NVarChar(4000), value.remarks)
      .execute("sp_update_sst_reply");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postUpdateUser(
    value: Models.RegisterUserInfo
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("fullname", sql.NVarChar(50), value.fullName)
      .input("email", sql.NVarChar(50), value.emailAdd)
      .input("acclvlID", sql.TinyInt, value.accesslvlID)
      .input("baseID", sql.SmallInt, value.baseNameID)
      .input("pgroupID", sql.SmallInt, value.productionID)
      .input("localphone", sql.NVarChar(15), value.localNumber)
      .input("usergid", sql.Int, value.gid)
      .input("updategid", sql.Int, value.updategid)
      .execute("sp_user_update");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postUpdatePassword(
    value: Models.RegisterUserInfo
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("pass", sql.NVarChar(150), value.passwordA)
      .input("gid", sql.Int, value.gid)
      .input("updategid", sql.Int, value.updategid)
      .execute("sp_user_update_pass");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postUpdateBase(
    value: Models.UpdateBase
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("basename", sql.NVarChar(10), value.basename)
      .input("baseid", sql.TinyInt, value.baseID)
      .input("prodID", sql.TinyInt, value.prodID)
      .input("updatedbygid", sql.Int, value.updatedbygid)
      .execute("sp_update_base");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postUpdateActivityList(
    value: Models.UpdateActivity
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("activitydesc", sql.NVarChar(300), value.activitydesc)
      .input("activityID", sql.TinyInt, value.activityid)
      .input("updatedbygid", sql.Int, value.updatedbygid)
      .execute("sp_update_activitylist");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async enableActivityGroup(
    value: Models.enableActivityList
  ): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("groupID", sql.SmallInt, value.groupID)
      .input("GID", sql.Int, value.updatedbygid)
      .execute("sp_enable_activitylist");
    return exec;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postUpdateActivityGroup(
    value: Models.updateActivityGroupParam
  ): Promise<Models.updateActivityGroupParam[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("groupID", sql.SmallInt, value.groupID)
      .input("groupName", sql.NVarChar(50), value.groupName)
      .input("updatedbygid", sql.Int, value.updatedbygid)
      .execute("sp_update_activitygroup");
    return exec.recordset;
  }
}
export default SSTActionsPut;
