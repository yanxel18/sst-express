/* eslint-disable max-len */
/* eslint-disable no-console */
import SSTActionsGet from "src/st_sst_api/sst_class_methods_get";
import * as Model from '../st_models/sst_models';
const sstActions = new SSTActionsGet();
class SSTMasterListCSV {
    /*
    stb_base_id	stb_base_desc
    0	JTY
    1	JCTY
    2	JNTY
    3	CGTY
    4	MSTY
    5	KKTY
    */
    public async SSTMasterLISTCSVExport(val: Model.SSTExportListCSV): Promise<Model.SSTExportMaster[]> {
        const sstexporter: Model.SSTExportMaster[] = [];
        const sstMaster = await sstActions.getSSTMasterListCSV(val);
        const baseMaster: Model.IBase[] = await sstActions.getBaseList();
        const baseArr: string[] = [];
        let sstreplyMaster: Model.SSTExportReply[] = [];

        if (baseMaster.length > 0)
            for (let x = 0; x < baseMaster.length; x++)
                baseArr.push(baseMaster[x].stb_base_desc)

        if (sstMaster.length > 0) {

            for (let x = 0; x < sstMaster.length; x++) {
                sstreplyMaster = [];
                for (let x = 0; x < baseMaster.length; x++) {
                    sstreplyMaster[x] = {
                        ProgressStatus: "展開元",
                        BaseName: "ー", 
                        ScheduleStartDate: "ー",
                        CompletedDate: "ー",
                        Reason: "ー",
                        Remarks: "ー",
                    }
                }
                if (sstMaster[x].sstreply.length > 0) {

                    for (let y = 0; y < sstMaster[x].sstreply.length; y++) {
                        const baseIndex = baseArr.indexOf(sstMaster[x].sstreply[y].stb_base_desc);
                        sstreplyMaster[baseIndex] = {
                            ProgressStatus: sstMaster[x].sstreply[y]?.sp_progress_desc === undefined
                                ? "ー" : sstMaster[x].sstreply[y]?.sp_progress_desc,
                            BaseName: sstMaster[x].sstreply[y]?.stb_base_desc === undefined
                                ? "ー" : sstMaster[x].sstreply[y]?.stb_base_desc,
                            ScheduleStartDate: sstMaster[x].sstreply[y]?.str_schedulestart_date === undefined
                                ? "ー" : sstMaster[x].sstreply[y]?.str_schedulestart_date,
                            CompletedDate: sstMaster[x].sstreply[y]?.str_completed_date === undefined
                                ? "ー" : sstMaster[x].sstreply[y]?.str_completed_date,
                            Reason: sstMaster[x].sstreply[y]?.sr_reason_desc === undefined
                                ? "ー" : sstMaster[x].sstreply[y]?.sr_reason_desc,    
                            Remarks: sstMaster[x].sstreply[y]?.str_remarks === undefined
                                ? "ー" : sstMaster[x].sstreply[y]?.str_remarks
                        }
                    }
                }
                sstexporter.push({
                    文書番号: sstMaster[x].sst_doc_number,
                    申請日: sstMaster[x].sst_apply_date,
                    回答状況: sstMaster[x].sp_progress_status,
                    展開案件: sstMaster[x].sst_deployment_demand,
                    活動内容: sstMaster[x].sst_activity_content,
                    期待効果: sstMaster[x].sst_expected_effect,
                    使用ツール: sstMaster[x].sst_tools_used,
                    着手予定日: sstMaster[x].sst_schedulestart_date,
                    完了予定日: sstMaster[x].sst_completed_date,
                    完了日: sstMaster[x].sst_scheduleend_date === undefined ? "ー" : sstMaster[x]?.sst_scheduleend_date, 
                    拠点: sstMaster[x]?.stb_base_name,
                    工程: sstMaster[x]?.sp_process_desc,
                    設備: sstMaster[x]?.sml_machine_desc,
                    展開責任者: sstMaster[x]?.sst_fullname,
                    メールアドレス: sstMaster[x]?.sst_email,
                    内線: sstMaster[x]?.sst_local_phone,
                    JTY_展開状況: sstreplyMaster[0]?.ProgressStatus,
                    JTY_着手予定日: sstreplyMaster[0]?.ScheduleStartDate,
                    JTY_完了予定日: sstreplyMaster[0]?.CompletedDate,
                    JCTY_展開状況: sstreplyMaster[1]?.ProgressStatus,
                    JCTY_着手予定日: sstreplyMaster[1]?.ScheduleStartDate,
                    JCTY_完了予定日: sstreplyMaster[1]?.CompletedDate,
                    JNTY_展開状況: sstreplyMaster[2]?.ProgressStatus,
                    JNTY_着手予定日: sstreplyMaster[2]?.ScheduleStartDate,
                    JNTY_完了予定日: sstreplyMaster[2]?.CompletedDate,
                    CGTY_展開状況: sstreplyMaster[3]?.ProgressStatus,
                    CGTY_着手予定日: sstreplyMaster[3]?.ScheduleStartDate,
                    CGTY_完了予定日: sstreplyMaster[3]?.CompletedDate,
                    MSTY_展開状況: sstreplyMaster[4]?.ProgressStatus,
                    MSTY_着手予定日: sstreplyMaster[4]?.ScheduleStartDate,
                    MSTY_完了予定日: sstreplyMaster[4].CompletedDate,
                    KKTY_展開状況: sstreplyMaster[5]?.ProgressStatus,
                    KKTY_着手予定日: sstreplyMaster[5]?.ScheduleStartDate,
                    KKTY_完了予定日: sstreplyMaster[5]?.CompletedDate, 
                    JTY_対象外理由: sstreplyMaster[0]?.Reason,
                    JCTY_対象外理由: sstreplyMaster[1]?.Reason,
                    JNTY_対象外理由: sstreplyMaster[2]?.Reason,
                    CGTY_対象外理由: sstreplyMaster[3]?.Reason,
                    MSTY_対象外理由: sstreplyMaster[4]?.Reason,
                    KKTY_対象外理由: sstreplyMaster[5]?.Reason,
                    JTY_備考: sstreplyMaster[0]?.Remarks,
                    JCTY_備考: sstreplyMaster[1]?.Remarks,
                    JNTY_備考: sstreplyMaster[2]?.Remarks,
                    CGTY_備考: sstreplyMaster[3]?.Remarks,
                    MSTY_備考: sstreplyMaster[4]?.Remarks,
                    KKTY_備考: sstreplyMaster[5]?.Remarks
                });

            }
        }

        return sstexporter;
    }
}

/*
stb_base_id	stb_base_desc
0	JTY
1	JCTY
2	JNTY
3	CGTY
4	MSTY
5	KKTY
*/

export default SSTMasterListCSV