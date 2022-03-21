export interface InitialFestivalData {
  header: HeaderData;
  body: BodyData;
  isLoading: boolean;
}

export interface HeaderData {
  resultCode: string;
  resultMsg: string;
  type: string;
}

export interface BodyData {
  items: Items[];
  numOfRows: string;
  pageNo: string;
  totalCount: string;
}

export interface Items {
  auspcInstt: string;
  fstvlCo: string;
  fstvlEndDate: string;
  fstvlNm: string;
  fstvlStartDate: string;
  homepageUrl: string;
  insttCode: string;
  latitude: string;
  lnmadr: string;
  longitude: string;
  mnnst: string;
  opar: string;
  phoneNumber: string;
  rdnmadr: string;
  referenceDate: string;
  relateInfo: string;
  suprtInstt: string;
}