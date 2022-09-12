/* eslint-disable max-len */
/* eslint-disable no-console */
import nodemailer from "nodemailer";
import * as path from "path";
import * as fs from "fs";
import SSTActionsGet from "src/st_sst_api/sst_class_methods_get";
import * as cron from "node-cron";
import { Parser } from "json2csv";
import moment from "moment";
import * as Model from "../st_models/sst_models";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sstActions = new SSTActionsGet();
interface IMailSender {
  getAllMails: () => Promise<void>;
  sendMail: (mailType: number | undefined) => Promise<void>;
}
class MailSender implements IMailSender {
  sst_weekly_file = "SST_weekly_list.csv";
  sst_monthly_file = "SST_monthly_list.csv";
  sst_weekly_replyfile = "SST_weekly_response_list.csv";
  sst_monthly_replyfile = "SST_monthly_response_list.csv";
  temp_folder_path = path.join(__dirname, "/../../uploads/ssttemp/");

  emailList: string[] = [];

  constructor() {
    const weeklyMailTask = cron.schedule("0 9 * * Monday", () => {
      this.weeklyEmailSend();
    });
    const monthlyMailTask = cron.schedule("0 9 * * *", () => {
      this.monthlyEmailSend();
    });
    weeklyMailTask.start();
    monthlyMailTask.start();
  }
  private async weeklyEmailSend(): Promise<void> {
    console.log("weekly email sent." + Date.now());
    await this.getAllMails();
    await this.sendMail(0);
  }

  private async monthlyEmailSend(): Promise<void> {
    const monday = moment(Date.now()).startOf("month").day("Monday");
    const dateNow = moment(Date.now()).date();

    if (monday.date() > 7) monday.add(7, "d");
    const month = monday.month();
    let counter = 0;
    while (month === monday.month()) {
      counter++;
      if (
        parseInt(dateNow.toString()) === parseInt(monday.date().toString()) &&
        counter === 2 &&
        parseInt(monday.day().toString()) === 1
      ) {
        await this.getAllMails();
        await this.sendMail(1);
        console.log("monthly email sent." + Date.now());
      }
      monday.add(7, "d");
    }
  }
  public async getAllMails(): Promise<void> {
    this.emailList = [];
    const listMail = await sstActions.getAllMail();
    for (let x = 0; x < listMail.length; x++) {
      this.emailList.push(listMail[x].EmailAdd.toString());
    }
  }
  email_subject = "";
  email_body = "";
  email_from = "itg-kyoyu1@jty.yuden.co.jp";
  mail_port = 25;
  mail_server = "smtp.jty.yuden.co.jp";
  mail_user = "";
  mail_pass = "";

  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
    nodemailer.createTransport({
      port: this.mail_port,
      host: this.mail_server,
      auth: {
        user: this.mail_user,
        pass: this.mail_pass,
      },
      secure: false,
    });
  /**
   *
   * @param mailType 0 = weekly , 1 = monthly
   */
  public async sendMail(mailType: number | undefined): Promise<void> {
    const dateNow = moment(Date.now()).format("YYYY/MM/DD");
    let mailData: Model.EmailCompose = {};
    if (this.emailList.length > 0) {
      if (mailType === 0) {
        //0 =weekly mail
        const sst_weekly = await sstActions.getSSTCSV(0);
        const sst_weekly_parser = new Parser();
        const sst_weekly_csv =
          sst_weekly.length > 0 ? sst_weekly_parser.parse(sst_weekly) : "";

        const sst_weekly_reply = await sstActions.getSSTReplyCSV(0);
        const sst_weekly_reply_parser = new Parser();
        const sst_weekly_reply_csv =
          sst_weekly_reply.length > 0
            ? sst_weekly_reply_parser.parse(sst_weekly_reply)
            : "";

        this.email_subject = "[" + dateNow + "] SST weekly report e-mail.";
        this.email_body = this.emailMsgWeekly();
        fs.writeFile(
          this.temp_folder_path + this.sst_weekly_file,
          "\ufeff" + sst_weekly_csv,
          { encoding: "utf8" },
          () => {
            console.log("sst weekly file created!");
          }
        );
        fs.writeFile(
          this.temp_folder_path + this.sst_weekly_replyfile,
          "\ufeff" + sst_weekly_reply_csv,
          { encoding: "utf8" },
          () => {
            console.log("sst weekly reply file created!");
          }
        );
        const fileAttachments: Model.EmailAttachments[] = [];
        if (sst_weekly.length > 0) {
          const fileData: Model.EmailAttachments = {
            filename: this.sst_weekly_file,
            path: this.temp_folder_path + this.sst_weekly_file,
          };
          fileAttachments.push(fileData);
        }
        if (sst_weekly_reply.length > 0) {
          const fileData: Model.EmailAttachments = {
            filename: this.sst_weekly_replyfile,
            path: this.temp_folder_path + this.sst_weekly_replyfile,
          };
          fileAttachments.push(fileData);
        }
        mailData = {
          ...mailData,
          attachments: fileAttachments,
        };
      } else if (mailType === 1) {
        //1 = monthly email
        const sst_monthly = await sstActions.getSSTCSV(1);
        const sst_monthly_parser = new Parser();
        const sst_monthly_csv = sst_monthly_parser.parse(sst_monthly);

        const sst_monthly_reply = await sstActions.getSSTReplyCSV(1);
        const sst_monthly_reply_parser = new Parser();
        const sst_monthly_reply_csv =
          sst_monthly_reply_parser.parse(sst_monthly_reply);

        this.email_subject = "[" + dateNow + "] SST monthly report e-mail.";
        this.email_body = this.emailMsgMonthly();
        fs.writeFile(
          this.temp_folder_path + this.sst_monthly_file,
          "\ufeff" + sst_monthly_csv,
          { encoding: "utf8" },
          () => {
            console.log("sst monthly file created!");
          }
        );
        fs.writeFile(
          this.temp_folder_path + this.sst_monthly_replyfile,
          "\ufeff" + sst_monthly_reply_csv,
          { encoding: "utf8" },
          () => {
            console.log("sst monthly reply file created!");
          }
        );
        const fileAttachments: Model.EmailAttachments[] = [];
        if (sst_monthly.length > 0) {
          const fileData: Model.EmailAttachments = {
            filename: this.sst_monthly_file,
            path: this.temp_folder_path + this.sst_monthly_file,
          };
          fileAttachments.push(fileData);
        }
        if (sst_monthly_reply.length > 0) {
          const fileData: Model.EmailAttachments = {
            filename: this.sst_monthly_replyfile,
            path: this.temp_folder_path + this.sst_monthly_replyfile,
          };
          fileAttachments.push(fileData);
        }
        mailData = {
          ...mailData,
          attachments: fileAttachments,
        };
      }
      if (mailType !== undefined) {
        mailData = {
          ...mailData,
          from: this.email_from,
          to: this.emailList,
          subject: this.email_subject,
          html: this.email_body,
        };
        this.transporter.sendMail(mailData, function (err, info) {
          err ? console.log(err) : console.log(info);
        });
      }
    }
  }
  /**
   *
   * @returns weekly message
   */
  private emailMsgWeekly(): string {
    const msg = `<pre>
    お世話になります。
    このメールは自動配信です。
        
    SSTのW/W登録状況をお知らせします。
    このメールには、最大で2つのファイルが添付されています。
        
    ･ SST_weekly_list.csv：W/Wで新規登録されたリスト。	
    ･ SST_weekly_response_list.csv：拠点からの回答リスト。
    ※添付ファイルがない場合は、集計データ無しとなります。
            
    内容を確認して頂き、翌週の月曜日までにSST進捗管理システムへ回答登録をお願いします。	
    ※SST案件に関する問い合わせは、SST登録者までお願いします。	
    
    ----------
    Dear All.	
    This e-mail is sent automatically.
    
    It informs you of the W/W registration status of SST.
    There are a maximum of two files attached to this email.
    
    ･ SST_weekly_list.csv : Newly registered list in W/W.
    ･ SST_weekly_response_list.csv : List of responses from bases.
    * If there are no attachments, there is no target data.
    
    Please check the contents and register your answers in the SST progress management system by the following Monday.
    * For inquiries about SST cases, please contact the SST registrant.
    
    ----------
    各位好。
    这封邮件是自动的。
    
    我们会通知您 SST 的 W/W 注册状态。
    这封邮件最多有两个文件的附件。
        
    ･ SST_weekly_list.csv：W/W 新注册的列表。	
    ･ SST_weekly_response_list.csv：来自基础的答案列表。
    * 如果没有附件，就不会有汇总数据。
    
    请在下周一之前检查内容并在SST进度管理系统中登记你的答案。
    * 有关 SST 项目的查询，请联系 SST 注册人。
    
    ----------
    안녕하세요.	
    이 메일은 자동으로 전달되고 있습니다.
     
    SST의 W / W 등록 상황을 알려드립니다.
    이 메일에는 최대 2 개의 파일이 첨부되어 있습니다.
    
    · SST_weekly_list.csv : W / W에서 신규 등록 된 목록.
    · SST_weekly_response_list.csv : 거점에서 답변 목록입니다.
    ※ 첨부 파일이없는 경우는 집계 데이터 없음입니다.
    
    내용을 확인해 주시고, 다음 주 월요일까지 SST 진척 관리 시스템에 회답 등록을 부탁합니다.
    ※ SST 안건에 관한 문의는 SST 등록자까지 부탁합니다.
    </pre>`;
    return msg;
  }

  /**
   *
   * @returns monthly message
   */
  private emailMsgMonthly(): string {
    const msg = `<pre>
    お世話になります。
    このメールは自動配信です。
        
    SSTの入力不備のデータをお知らせします。
    このメールには、最大で2つのファイルが添付されています。
      
    ･ SST_monthly_list.csv：展開元にて、完了予定日を超過しているリスト。
    ･ SST_monthly_response_list.csv：拠点の完了予定日を超過、未回答リスト。
    ※添付ファイルがない場合は、集計データ無しとなります。
     
    内容を確認して頂き、SST進捗管理システムの修正をお願いします。
    ※SST案件に関する問い合わせは、SST登録者までお願いします。
    
    ----------
    Dear All.
    This email is an automatic delivery.
    
    It informs you of incomplete SST input data.
    There are a maximum of two files attached to this email.
    
    ･ SST_monthly_list.csv : The list of overdue completion dates at the originator.
    ･ SST_monthly_response_list.csv : List of overdue, unanswered, and incomplete deployments at corresponding sites.
    *If there are no attachments, there is no target data.
    
    Please check the contents and modify the SST progress management system.
    If you have any questions about the SST case, please contact the SST registrar.
    
    ----------
    各位好。
    这封邮件是自动的。
    
    我们会通知您SST输入不足的数据。
    这封邮件最多有两个文件的附件。
    
    ･ SST_monthly_list.csv：超出扩展源预定完成日期的列表。
    ･ SST_monthly_response_list.csv：基地逾期、未答复、不足部署状态列表。
    *如果没有附件，就不会有汇总数据。
    
    请检查内容并更正SST进度管理系统。
    * 有关 SST 项目的查询，请联系 SST 注册人。
    
    ----------
    안녕하세요.
    이 메일은 자동으로 전달되고 있습니다.
    
    SST의 입력 미비 데이터를 알려드립니다.
    이 메일에는 최대 2 개의 파일이 첨부되어 있습니다.
    
    · SST_monthly_list.csv : 발안 거점으로 완료 예정일을 초과하는 목록.
    · SST_monthly_response_list.csv : 지원 거점 완료 예정일을 초과 / 답변하지 않은 / 전개 상황 미비 목록입니다.
    ※ 첨부 파일이없는 경우는 집계 데이터 없음입니다.
    
    내용을 확인하여 주시고, SST 추적 시스템의 수정을 부탁드립니다.
    ※ SST 안건에 관한 문의는 SST 등록자까지 부탁합니다.</pre>`;
    return msg;
  }
}

export default MailSender;
