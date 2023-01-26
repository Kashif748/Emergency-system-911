interface Sector {
  orgFrequency: string;
  orgNameAr: string;
  orgNameEn: string;
  primary: boolean;
  shift1: number;
  shift2: number;
  shift3: number;
}

export interface IAvailabilityReport {
  area: string;
  sectors: Sector[];
}

export interface IReport {
  area: string;
  abc: number;
  d: number;
  e: number;
  categories: {
    "مواد غذائية": [
      {
        subCategory: "milk";
        count: 5;
      }
    ];
    "معدات شرطية": [
      {
        subCategory: "إسعافات اوليه";
        count: 20;
      }
    ];
    "مواد دوائية": [
      {
        subCategory: "PPE";
        count: 15;
      }
    ];
    "مواد طبية": [
      {
        subCategory: "أسرة";
        count: 0;
      }
    ];
    المتطوعين: [
      {
        subCategory: "كلنا شرطة";
        count: 100;
      }
    ];
    "مركبات و الاليات": [
      {
        subCategory: "طيارة لاسلكي ا(اطفائية ) ";
        count: 3;
      }
    ];
  };
  total: 143;
}
