/* eslint-disable no-console */

import sql, { IProcedureResult, IRecordSet } from "mssql";
import * as Model from "src/st_models/sst_models";
import * as Models from "src/st_models/sst_insert_models";
import DBConnection from "src/st_connection/connection";

interface ISSTActionGet {
  getBaseList: () => Promise<Model.IBase[]>;
  getMachineList: () => Promise<Model.MachineList[]>;
  getProgressSelectList: () => Promise<Model.ProgressSelectList[]>;
  getProcessList: () => Promise<Model.ProcessList[]>;
  getToolsUsedList: () => Promise<Model.ToolsUsedList[]>;
  getToolsListAction: () => Promise<Model.ToolsListAction[]>;
  getSSTMasterList: () => Promise<Model.SSTMasterList[]>;
  getToolsListAnalysis: () => Promise<Model.ToolsListAnalysis[]>;
  getToolsListAwareness: () => Promise<Model.ToolsListAwareness[]>;
  getToolsListResult: () => Promise<Model.ToolsListResult[]>;
  getSSTFilesList: (sstid: number) => Promise<Model.SSTFiles[]>;
  getSSTFilesReplyList: (sstreplyid: number) => Promise<Model.SSTFilesReply[]>;
  UserInfo: (userid: string) => Promise<Model.LoginInterface[]>;
  getRegisterList: (
    userInfo: Model.decodeTokenInterface
  ) => Promise<Model.RegistrationDropList[]>;
  getUserList: (
    userInfo: Model.decodeTokenInterface
  ) => Promise<Model.UserList[]>;
  getSSTMasterListCSV: (
    val: Model.SSTExportListCSV
  ) => Promise<Model.SSTMasterListExport[]>;
  getValidateUser: (
    userid: string | undefined
  ) => Promise<Model.ValidateUser[]>;
  getValidateBase: (value: Models.CreateBase) => Promise<Model.ValidateUser[]>;
  getValidateActivity: (
    value: Model.UpdateActivity
  ) => Promise<Model.ValidateUser[]>;
  postDeleteUser: (value: number) => Promise<IProcedureResult<any>>;
  getSSTCSV: (type: number) => Promise<IRecordSet<Model.CSVSST[]>>;
  getSSTReplyCSV: (type: number) => Promise<IRecordSet<Model.CSVReplySST[]>>;
  getAllMail: () => Promise<Model.Emails[]>;
  getActivityList: () => Promise<Model.ActivityList[]>;
  getActivityListonEdit: (stc_id: string) => Promise<Model.ActivityList[]>;
  getActivityListGroup: () => Promise<Model.ActivityListGroup[]>;
  getReasonList: () => Promise<Model.ReasonList[]>;
}

class SSTActionsGet extends DBConnection implements ISSTActionGet {
  /**
   *
   * @returns
   */
  public async getBaseList(): Promise<Model.IBase[]> {
    const query = "SELECT * FROM view_base order by stb_base_id asc";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.IBase[] = (await request.query(query)).recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getMachineList(): Promise<Model.MachineList[]> {
    const query =
      "SELECT sml_machine_id,sml_machine_desc,sml_createdby_gid " +
      "FROM st_machine_list where sml_deleted = 0 order by sml_created_date desc";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.MachineList[] = (await request.query(query)).recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getProgressSelectList(): Promise<Model.ProgressSelectList[]> {
    const query =
      "SELECT * FROM st_progress_select where sp_progress_id in (1,2,3,4)";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ProgressSelectList[] = (await request.query(query))
      .recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getProcessList(): Promise<Model.ProcessList[]> {
    const query =
      "SELECT sp_process_id,sp_process_desc,sp_created_date,sp_createdby_gid  " +
      "FROM st_process_list where sp_deleted =0 order by sp_created_date desc";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ProcessList[] = (await request.query(query)).recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getToolsUsedList(): Promise<Model.ToolsUsedList[]> {
    const query = "SELECT sst_tools_used FROM view_sst_tools_used";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ToolsUsedList[] = (await request.query(query)).recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getToolsListAction(): Promise<Model.ToolsListAction[]> {
    const query =
      "SELECT sta_tool_id,sta_tool_desc,sta_createdby_gid " +
      "FROM st_tool_list_action where " +
      "sta_deleted =0 order by sta_created_date desc";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ToolsListAction[] = (await request.query(query))
      .recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getSSTMasterList(): Promise<Model.SSTMasterList[]> {
    const con = await super.openConnect();
    const query = await con.request().execute("sp_show_sst_master");
    const result: string = query.recordset[0]["SST"];
    const data: Model.SSTMasterList[] = JSON.parse(result);
    return data;
  }
  /**
   *
   * @returns
   */
  public async getToolsListAnalysis(): Promise<Model.ToolsListAnalysis[]> {
    const query =
      "SELECT sts_tool_id,sts_tool_desc,sts_createdby_gid " +
      "FROM st_tool_list_analysis where sts_deleted = 0 " +
      "order by sts_created_date desc";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ToolsListAnalysis[] = (await request.query(query))
      .recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getToolsListAwareness(): Promise<Model.ToolsListAwareness[]> {
    const query =
      "SELECT stl_tool_id,stl_tool_desc,stl_createdby_gid " +
      "FROM st_tool_list_awareness where stl_deleted = 0 " +
      "order by stl_created_date desc";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ToolsListAwareness[] = (await request.query(query))
      .recordset;
    return data;
  }
  /**
   *
   * @returns
   */
  public async getToolsListResult(): Promise<Model.ToolsListResult[]> {
    const query =
      "SELECT str_tool_id,str_tool_desc,str_createdby_gid " +
      "FROM st_tool_list_result where str_deleted =0 " +
      "order by str_created_date desc";
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ToolsListResult[] = (await request.query(query))
      .recordset;
    return data;
  }
  /**
   *
   * @param sstid
   * @returns
   */
  public async getSSTFilesList(sstid: number): Promise<Model.SSTFiles[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("SSTID", sql.Int, sstid)
      .execute("sp_show_sst_files");
    const result: string = exec.recordset[0]["SSTFILES"];
    const data: Model.SSTFiles[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param sstreplyid
   * @returns
   */
  public async getSSTFilesReplyList(
    sstreplyid: number
  ): Promise<Model.SSTFilesReply[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("SSTReplyID", sql.Int, sstreplyid)
      .execute("sp_show_sst_reply_files");
    const result: string = exec.recordset[0]["SSTREPLYFILES"];
    const data: Model.SSTFilesReply[] = JSON.parse(result) || null;
    return data;
  }

  /**
   *
   * @param userid
   * @returns
   */
  public async UserInfo(userid: string): Promise<Model.LoginInterface[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("usergid", sql.NVarChar(15), userid)
      .execute("sp_user_info");
    const result: string = exec.recordset[0]["USERINFO"];
    const data: Model.LoginInterface[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param userInfo
   * @returns
   */
  public async getRegisterList(
    userInfo: Model.decodeTokenInterface
  ): Promise<Model.RegistrationDropList[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("baseID", sql.TinyInt, userInfo.baseid)
      .input("acclvl", sql.TinyInt, userInfo.accesslvl)
      .execute("sp_show_register_droplist");
    const result: string = exec.recordset[0]["USER_REGISTRATION_LIST"];
    const data: Model.RegistrationDropList[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param userInfo
   * @returns
   */
  public async getUserList(
    userInfo: Model.decodeTokenInterface
  ): Promise<Model.UserList[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("baseID", sql.TinyInt, userInfo.baseid)
      .input("acclvl", sql.TinyInt, userInfo.accesslvl)
      .execute("sp_user_list");
    const result: string = exec.recordset[0]["USERINFOLIST"];
    const data: Model.UserList[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param val
   * @returns
   */
  public async getSSTMasterListCSV(
    val: Model.SSTExportListCSV
  ): Promise<Model.SSTMasterListExport[]> {
    const con = await super.openConnect();
    let query = "SELECT (SELECT * FROM view_sst_master_csv a where ";
    const queryEnd = "  FOR JSON PATH) as SST_CSV";
    if (val.docNumber) {
      query = query + `a.sst_doc_number='${val.docNumber}'`;
    } else {
      if (val.dateFrom && val.dateTo)
        query =
          query +
          `(a.sst_apply_date between '${val.dateFrom}' and '${val.dateTo}')`;
      if (val.progressID)
        query = query + ` and a.sst_progress_id='${val.progressID}'`;
      if (val.baseID) query = query + ` and a.sst_base_id='${val.baseID}'`;
      if (val.processID)
        query = query + ` and a.sst_process_id='${val.processID}'`;
      if (val.usedTool)
        query = query + ` and a.sst_tools_used='${val.usedTool}'`;
    }
    query = query + queryEnd;
    const request = con.request();
    const data: Model.SSTMasterListExport[] = JSON.parse(
      (await request.query(query)).recordset[0]["SST_CSV"]
    );
    return data;
  }
  /**
   *
   * @param userid
   * @returns
   */
  public async getValidateUser(
    userid: string | undefined
  ): Promise<Model.ValidateUser[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("usergid", sql.NVarChar(15), userid)
      .execute("sp_user_validate");
    const result: string = exec.recordset[0]["VALIDATE"];
    const data: Model.ValidateUser[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async getValidateBase(
    value: Models.CreateBase
  ): Promise<Model.ValidateUser[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("basename", sql.NVarChar(10), value.basename)
      .execute("sp_create_basevalidate");
    const result: string = exec.recordset[0]["VALIDATE"];
    const data: Model.ValidateUser[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async getValidateActivity(
    value: Model.UpdateActivity
  ): Promise<Model.ValidateUser[]> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("activitydesc", sql.NVarChar(300), value.activitydesc)
      .execute("sp_create_activitylist_validate");
    const result: string = exec.recordset[0]["VALIDATE"];
    const data: Model.ValidateUser[] = JSON.parse(result) || null;
    return data;
  }
  /**
   *
   * @param value
   * @returns
   */
  public async postDeleteUser(value: number): Promise<IProcedureResult<any>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("gid", sql.Int, value)
      .execute("sp_user_delete");
    return exec;
  }
  /**
   *
   * @param type
   * @returns
   */
  public async getSSTCSV(type: number): Promise<IRecordSet<Model.CSVSST[]>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("WMSend", sql.TinyInt, type)
      .execute("sp_create_sst_csv");
    return exec.recordset;
  }
  /**
   *
   * @param type
   * @returns
   */
  public async getSSTReplyCSV(
    type: number
  ): Promise<IRecordSet<Model.CSVReplySST[]>> {
    const con = await super.openConnect();
    const exec = await con
      .request()
      .input("WMSend", sql.TinyInt, type)
      .execute("sp_create_sst_reply_csv");
    return exec.recordset;
  }
  /**
   *
   * @returns
   */
  public async getAllMail(): Promise<Model.Emails[]> {
    const query = `SELECT  su_email as 'EmailAdd' FROM [st_user_acc] where 
        su_email <> '' and su_deleted_flag=0 group by su_email`;
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.Emails[] = JSON.parse(
      JSON.stringify((await request.query(query)).recordset)
    );
    return data;
  }
  /**
   *
   * @returns
   */
  public async getActivityList(): Promise<Model.ActivityList[]> {
    const query = `SELECT stc_id,stc_content_desc,stg_active,stc_group_id 
        FROM view_activity_list order by stc_id asc`;
    const con = await super.openConnect();
    const request = con.request();
    const data: Model.ActivityList[] = JSON.parse(
      JSON.stringify((await request.query(query)).recordset)
    );
    return data;
  }
  /**
   *
   * @param stc_id
   * @returns
   */
  public async getActivityListonEdit(
    stc_id: string
  ): Promise<Model.ActivityList[]> {
    const con = await super.openConnect();
    const stcID = parseInt(stc_id);
    const exec = await con
      .request()
      .input("stcID", sql.SmallInt, stcID)
      .execute("sp_show_activitylist_onEdit");
    return exec.recordset;
  }
  /**
   *
   * @returns
   */
  public async getActivityListGroup(): Promise<Model.ActivityListGroup[]> {
    const query = `SELECT stg_id,stg_group,stg_active 
        FROM st_activity_content_group order by stg_id desc`;
    const con = await super.openConnect();
    const request = con.request();
    return (await request.query(query)).recordset;
  }
  /**
   *
   * @returns
   */
  public async getReasonList(): Promise<Model.ReasonList[]> {
    const query = `Select reasonID, reasonDesc from view_reasonlist order by sr_order asc`;
    const con = await super.openConnect();
    const request = con.request();
    return (await request.query(query)).recordset;
  }
}
export default SSTActionsGet;
