export interface CreateSST {
  sstid?: number,
  documentNumber?: string | null,
  applyDate?: string | null,
  applyUserName?: string | null,
  baseID?: number | null,
  userFullName?: string | '',
  userGID?: number | null,
  emailTxt?: string | ''
  localNumberTxt?: string | null,
  lunchDate?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  conditionTxt?: string | '',
  machineListID?: number | undefined | null,
  machineListTxt?: string | '',
  processListID?: number | undefined | null,
  processListTxt?: string | '',
  activityListTxt?: number | null,
  expectedEffectTxt?: string | '',
  awarenessToolID?: number | undefined | null,
  awarenessToolListTxt?: string | '',
  awarenessTxt?: string | '',
  analysisToolID?: number | undefined | null,
  analysisToolListTxt?: string | '',
  analysisTxt?: string | '',
  actionToolID?: number | undefined | null,
  actionToolListTxt?: string | '',
  actionTxt?: string | '',
  resultToolID?: number | undefined | null,
  resultToolListTxt?: string | '',
  resultTxt?: string | '',
  modifiedbygid?: number | undefined | null,
  sstfiles?: any
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

export interface DocNumber {
  documentNumber?: string | null
}

export interface CreateBase {
  basename?: string,
  prodID?: number,
  createdbygid?: number
}


