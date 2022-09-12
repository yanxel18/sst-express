import  { Request } from 'express';

export interface IBase {
    stb_base_id: number,
    stb_base_desc: string,
    stb_pgroup_id: number,
    stg_description: string
}

export interface IDBConfig extends Options {
    user: string,
    password: string,
    server: string,
    requestTimeout: number,
    pool: {
        max: number,
        min: number,
        idleTimeoutMillis: number
    },
    database: string
}

export interface Options {
    options: {
        encrypt: boolean,
        trustServerCertificate: boolean
    }
}

export interface ErrMsg {
    message: string
}

export interface MachineList {
    sml_machine_id: number,
    sml_machine_desc: string,
    sml_createdby_gid: string
}

export interface ProcessList {
    sp_process_id: number,
    sp_process_desc: string,
    sp_createdby_gid: string
}

export interface ToolsListAction {
    sta_tool_id: number,
    sta_tool_desc: string,
    sta_createdby_gid: string
}

export interface ToolsListAnalysis {
    sts_tool_id: number,
    sts_tool_desc: string,
    sts_createdby_gid: string
}


export interface ToolsListAwareness {
    stl_tool_id: number,
    stl_tool_desc: string,
    stl_createdby_gid: string
}


export interface ToolsListResult {
    str_tool_id: number,
    str_tool_desc: string,
    str_createdby_gid: string
}


export interface SSTMasterList extends SSTEdit {
    sst_id: number,
    sst_doc_number: string,
    sst_apply_date: string,
    sst_progress_id: number,
    sp_progress_status: string,
    sst_base_id: number,
    stb_base_name: string,
    sst_gid: number,
    su_fullname: string,
    sst_fullname: string,
    sst_email: string,
    sst_local_phone: string,
    su_email: string,
    su_local_phone: string,
    sst_schedulestart_date: string,
    sst_scheduleend_date: string,
    sst_completed_date: string,
    sst_deployment_demand: string,
    sst_process_id: number,
    sp_process_desc: string,
    sst_machine_id: number,
    sml_machine_desc: string,
    sst_activity_content: string,
    sst_expected_effect: string,
    sst_tools_used: string,
    sst_awareness_tool_id: number,
    stl_awarenesstool: string,
    sst_awareness_content: string,
    sst_analysis_tool_id: number,
    sts_analysistool: string,
    sst_analysis_content: string,
    sst_action_tool_id: number,
    sta_actiontool: string
    sst_action_content: string,
    sst_result_tool_id: number,
    str_resulttool: string,
    sst_result_content: string,
    sst_created_date: string,
    sst_createdby_gid: number,
    sst_modified_date: string,
    sst_modifiedby_gid: number,
    sst_activity_content_id: number, 
    sstreply: SSTReply[],
    sstfiles?: SSTFiles[]
}

export interface SSTReply {
    str_sst_id: number,
    str_reply_rowid: number,
    str_schedulestart_date: string,
    str_scheduleend_date: string,
    str_completed_date: string,
    str_progress_id: number,
    str_reasonID?: number,
    str_base_id: number
    stb_base_desc: string,
    sp_progress_desc: string,
    str_remarks: string,
    sp_icon: string
    str_created_byname: string,
    str_createdby_gid?: number
}

export interface ProgressSelectList {
    sp_progress_id: number,
    sp_progress_desc: string,
    sp_progress_icon: string
}
export interface SSTEdit {
    su_email: string,
    su_local_phone: string,
    su_editbygid: number
    su_editDate: string
}
export interface SSTFiles {
    sa_id?: number,
    sa_sst_id?: number,
    sa_filename?: string,
    sa_file_directory?: string,
    sa_filesize?: number,
    sa_created_date?: string,
}

export interface SSTFilesReply {
    sar_id?: number,
    sar_sst_reply_id?: number,
    sar_filename?: string,
    sar_file_directory?: string,
    sar_filesize?: number,
    sar_created_date?: string,
}
export interface FileInterface {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

export interface LoginInterface {
    usergid: string,
    userpass: string
}

export interface ReasonList {
    reasonID?: number,
    reasonDesc?: string
}
export interface LoginResultInterface {
    su_gid: number,
    su_gid_full: string,
    stb_base_desc?: string,
    su_fullname?: string,
    su_email?: string,
    su_acclvl_id?: number,
    su_base_id?: number,
    su_pgroup_id?: number,
    su_local_phone?: string,
    su_passcrypt: string,
    st_acclvl_desc?: string

}

export interface UserList {
    su_gid?: number,
    su_gid_full: string,
    stb_base_desc?: string,
    su_fullname?: string,
    su_email?: string,
    su_acclvl_id?: number,
    su_base_id?: number,
    su_pgroup_id?: number,
    su_local_phone?: string
    st_acclvl_desc?: string

}
export interface SSTFormReply {
    sstid?: number,
    usernametxt?: string,
    emailtxt?: string,
    localNumberTxt?: string,
    progressComboID?: number,
    progressReasonID?: number,
    lunchDate?: string,
    startDate?: string,
    endDate?: string | null,
    remarks?: string,
    gid?: number,
    rownumber?: number
}

export interface UserInfo {
    su_gid: number,
    su_gid_full: string,
    stb_base_desc: string,
    su_fullname: string,
    su_email: string,
    su_acclvl_id: number,
    su_base_id: number,
    su_pgroup_id: number,
    su_local_phone?: string,
    stg_description?: string,
    st_acclvl_desc: string
}

export interface decodeTokenInterface {
    gid: number,
    username: string,
    baseid: number,
    basedesc: string,
    accesslvl: number,
    access: string,
    iat: number,
    exp: number
}

export interface RegistrationDropList {
    BaseList: BaseList[],
    ProcessGroupList: ProcessGroupList[],
    AccessLevelList: AccessLevelList[]
}

export interface BaseList {
    stb_base_id?: number,
    stb_base_desc?: string
}

export interface ProcessGroupList {
    stg_pgroup_id?: number,
    stg_description?: string
}

export interface AccessLevelList {
    st_acclvl_id?: number,
    st_acclvl_desc?: string
}

export interface RegisterUserInfo {
    accesslvlID?: number,
    baseNameID?: number,
    emailAdd?: string,
    fullName?: string,
    gidFull?: string,
    localNumber?: string,
    passwordA: string,
    passwordB?: string,
    productionID?: number,
    gid?: number,
    updategid?: number
}

export interface ToolsUsedList {
    sst_tools_used: string
}
export interface ValidateUser {
    existing: number
}

export interface UserLogs {
    GID: number,
    IPAddress?: string | string[] | undefined
}

export interface CSVSST {
    文書番号: string,
    申請日: string,
    展開案件: string,
    活動内容: string,
    期待効果: string,
    着手予定日: string,
    完了予定日: string,
    完了日: string,
    拠点: string,
    工程: string,
    メールアドレス: string,
    内線: string
}

export interface CSVReplySST {
    文書番号: string,
    展開案件: string,
    期待効果: string,
    着手予定日: string,
    完了予定日: string,
    完了日: string,
    回答状況: string,
    拠点: string,
    回答者: string,
    内線: string,
    メールアドレス: string
}
export interface EmailCompose {
    from?: string,
    to?: string | string[],
    subject?: string,
    html?: string,
    attachments?: EmailAttachments[]
}

export interface EmailAttachments {
    filename?: string,
    path?: string
}
export interface Emails {
    EmailAdd: string[]
}

export interface SSTMasterListExport extends SSTReplyExport {
    sst_id: number,
    sst_doc_number: string,
    sst_apply_date: string,
    sst_progress_id: number,
    sp_progress_status: string,
    sst_base_id: number,
    stb_base_name: string,
    sst_gid: number,
    sst_fullname: string,
    sst_email: string,
    sst_local_phone: string,
    sst_schedulestart_date: string,
    sst_scheduleend_date: string,
    sst_completed_date: string,
    sst_deployment_demand: string,
    sst_process_id: number,
    sp_process_desc: string,
    sst_machine_id: number,
    sml_machine_desc: string,
    sst_activity_content: string,
    sst_expected_effect: string,
    sst_tools_used: string,
    sstreply: SSTReplyExport[]
}

export interface SSTReplyExport {
    sst_scheduleend_date: string,
    stb_base_desc: string,
    sp_progress_desc: string,
    str_schedulestart_date: string,
    str_completed_date: string,
    sp_progress_status: string,
    sr_reason_desc: string,
    str_remarks: string
}
export interface UpdateBase {
    baseID?: number,
    basename?: string,
    prodID?: number,
    updatedbygid?: number
}
export interface ActivityList {
    stc_id: number,
    stc_content_desc: string
    stg_active: number,
    stc_group_id: number,
}

export interface UpdateActivity {
    activitydesc: string,
    activityid: string,
    updatedbygid?: number
}

export interface enableActivityList {
    groupID: number,
    updatedbygid?: number
}

export interface CreateActivity {
    activitydesc: string,
    activityid: string,
    groupID?: number,
    createdbygid?: number
}

export interface SSTExportMaster {
    文書番号?: string,
    申請日?: string,
    回答状況?: string,
    展開案件?: string,
    活動内容?: string,
    期待効果?: string,
    使用ツール?: string,
    着手予定日?: string,
    完了予定日?: string,
    完了日?: string
    拠点?: string,
    工程?: string,
    設備?: string,
    展開責任者?: string,
    メールアドレス?: string,
    内線?: string,
    JTY_展開状況?: string,
    JTY_着手予定日?: string,
    JTY_完了予定日?: string,
    JTY_対象外理由?: string,
    JTY_備考?: string,
    JCTY_展開状況?: string,
    JCTY_着手予定日?: string,
    JCTY_完了予定日?: string,
    JCTY_対象外理由?: string,
    JCTY_備考?: string,
    JNTY_展開状況?: string,
    JNTY_着手予定日?: string,
    JNTY_完了予定日?: string,
    JNTY_対象外理由?: string,
    JNTY_備考?: string,
    CGTY_展開状況?: string,
    CGTY_着手予定日?: string,
    CGTY_完了予定日?: string,
    CGTY_対象外理由?: string,
    CGTY_備考?: string,
    MSTY_展開状況?: string,
    MSTY_着手予定日?: string,
    MSTY_完了予定日?: string,
    MSTY_対象外理由?: string,
    MSTY_備考?: string,
    KKTY_展開状況?: string,
    KKTY_着手予定日?: string,
    KKTY_完了予定日?: string,
    KKTY_対象外理由?: string,
    KKTY_備考?: string
}
export interface SSTExportReply {
    SSTReplySSTID?: number,
    ProgressStatus?: string,
    BaseName?: string, 
    ScheduleStartDate?: string,
    CompletedDate?: string,
    Reason?: string,
    Remarks?: string
}


export interface SSTExportListCSV {
    dateFrom?: string,
    dateTo?: string,
    docNumber?: string,
    baseID?: number,
    progressID?: number,
    processID?: number,
    usedTool?: number
}

export interface ActivityListGroup {
    stg_id: number,
    stg_group: string,
    stg_active: number
}

export interface ExRequest extends Request {
    query: {
        stcID: string  
    }
  }
  
export interface createGroupActivityParam {
    groupName: string,
    createdbygid: number
    existing?: string
} 

export interface updateActivityGroupParam {
    groupName: string,
    groupID: number,
    updatedbygid?: number
    existing?: string
  }
  