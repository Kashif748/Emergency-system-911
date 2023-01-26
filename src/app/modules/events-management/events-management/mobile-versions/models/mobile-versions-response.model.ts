export interface Error {
  code: string;
  message_Ar: string;
  message_En: string;
}

export interface MobileVersion {
  id: number;
  isActive: boolean;
  lastSupportedVersion: number;
  releaseLink: string;
  releaseNote: string;
  versionName: string;
  versionNumber: number;
}

export interface Result {
  lastSupportedVersion: number;
  versions: MobileVersion[];
}

export interface MobileVersionResponse {
  error: Error;
  result: Result;
  status: boolean;
}

