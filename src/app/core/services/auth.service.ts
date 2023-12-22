import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, share, take, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { isEmpty } from 'lodash';
import { environment } from 'src/environments/environment';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { JwtClaimNames, TokenModel } from '../api/models/token.model';
import { IStorageService } from './storage.service';
import { AppCacheKeys } from '@core/constant/AppCacheKeys';
import { LiquidCacheService } from 'ngx-liquid-cache';
import { AppUtil } from '@core/utils/AppUtil';
import { CommonService } from '@core/services/common.service';
import { SessionModel } from '@core/api/models/session.model';

export interface SignInUserCommand {
  username: string;
  password: string;
  org: string;
  otp: string;
  resendOtp: boolean;
}

export interface State {
  TokenModel: TokenModel;
  IsSignedIn: boolean;
  Claims: { [index: string]: any };
  Errors: string | string[];
  Session: SessionModel;
}

@Injectable()
export abstract class IAuthService {
  abstract signInAsync(
    command: SignInUserCommand
  ): Promise<void | ((otp: string) => Promise<void>)>;

  abstract updateToken(token: TokenModel): void;

  abstract checkSessionModel(): SessionModel;

  abstract isTokenExpired(): boolean;

  abstract isAuthorizedAsync(): Promise<boolean>;

  abstract isAuthorized(): boolean;

  abstract refreshToken(): Observable<void>;

  abstract forgotPassword(email: string): Observable<any>;

  abstract signOutAsync(): Promise<void>;

  abstract loadUserPrivileges(): Observable<any>;

  abstract getClaim(key: 'orgId' | 'sub'): any;

  abstract setNewPassword(model: {
    newPassword: string;
    forgetToken: string;
  }): Observable<any>;

  abstract loginUaePass(model: { code: string; appId: string }): Promise<void>;

  abstract updatePassword(model: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }): Observable<any>;

  abstract get accessToken(): string;

  abstract get sesstionModel(): SessionModel;

  abstract get errors(): string | string[];

  abstract sendFireBaseToken(firebaseToken: string): Observable<any>;
}

@Injectable()
export class AuthService implements IAuthService {
  // Variables
  private readonly lang = 'en';
  private baseUrl = `${environment.apiUrl}/ext/authenticate`;
  private refreshTokenEndpoint = `${environment.apiUrl}/refresh`;
  private uaePassEndpoint = `${environment.apiUrl}/ext/uaepass/auth`;
  private forgotPasswordEndpoint = `${environment.apiUrl}/users/ext/forget-password`;
  private logoutEndpoint = `${environment.apiUrl}/a_logout`;
  private state: State;
  private refreshToken$: Observable<void>;
  private previousRefreshEnded = true;
  private uaeLogoutPassLink = `${environment.UAE_PASS_HOST}/idshub/logout?redirect_uri=${window.location.protocol}//${window.location.host}&client_id=${environment.UAE_PASS_CLIENT_ID}`;

  constructor(
    private http: HttpClient,
    private storageService: IStorageService,
    private router: Router,
    private translationService: TranslationService,
    private apiCache: LiquidCacheService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    let tokenModel = this.storageService.getItem<TokenModel>('token');
    if (!tokenModel) {
      tokenModel = {
        accessToken: this.storageService.getItem<string>('jwt'),
        refreshToken: this.storageService.getItem<string>('refreshToken'),
      };
    }
    const claims = this.parseJwt(tokenModel?.accessToken);
    const session = this.checkSessionModel();

    this.state = {
      TokenModel: tokenModel,
      Claims: claims,
      Session: session,
    } as State;
  }

  getClaim(key: string) {
    return this.state.Claims[key];
  }

  get errors(): string | string[] {
    return this.state.Errors;
  }

  get accessToken(): string {
    return this.state?.TokenModel?.accessToken;
  }

  get sesstionModel(): SessionModel {
    return this.state?.Session;
  }
  forgotPassword(email: string): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-type',
      'application/json'
    );
    return this.http.get<any>(this.forgotPasswordEndpoint, {
      params: { email },
      headers,
    });
  }

  updatePassword(model: {
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/update-pwd`, model);
  }

  setNewPassword(model: {
    newPassword: string;
    forgetToken: string;
  }): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/users/ext/reset-password`,
      model
    );
  }

  updateToken(tokenModel: TokenModel): void {
    const claims = this.parseJwt(tokenModel?.accessToken);
    this.state = { TokenModel: tokenModel, Claims: claims } as State;
    this.storageService.setItem(AppCacheKeys.TOKEN, tokenModel);
    if (!tokenModel) {
      this.storageService.removeItem(AppCacheKeys.TOKEN);
    }
  }

  checkSessionModel(): SessionModel {
    let session = this.storageService.getItem<SessionModel>(
      AppCacheKeys.SESSION
    );
    if (!session) {
      const userAgent = AppUtil.getUserAgent();
      console.log(userAgent);
      session = {
        deviceId: AppUtil.randomId(12),
        uiVersion: userAgent?.browser.name + ' - ' + userAgent?.browser.version,
        osType: userAgent?.os.name + ' - ' + userAgent?.platform.type,
      };

      this.storageService.setItem(AppCacheKeys.SESSION, session);
    }
    return session;
  }

  public isTokenExpired(): boolean {
    const now = Date.now() / 1000;
    const exp = this.state?.Claims[JwtClaimNames.Exp]
      ? (this.state.Claims[JwtClaimNames.Exp] as number)
      : 0;
    return exp < now;
  }

  async isAuthorizedAsync(): Promise<boolean> {
    if (this.accessToken) {
      if (this.isTokenExpired()) {
        try {
          setTimeout(async () => {
            await this.refreshToken()?.toPromise();
          }, 0);
          return true;
        } catch {
          return false;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  isAuthorized(): boolean {
    return this.accessToken && !this.isTokenExpired();
  }

  public async signInAsync(
    command: SignInUserCommand
  ): Promise<void | ((otp: string) => Promise<void>)> {
    const result = await this.http
      .post<any>(this.baseUrl, command, {
        headers: { 'Content-type': 'application/json' },
      })
      .pipe(
        catchError((error) => {
          const errorMsg =
            this.lang == 'en'
              ? error?.error?.error?.message_En
              : error?.error?.error?.message_Ar;
          if (this.state) {
            this.state.Errors = errorMsg;
          } else {
            this.state = { Errors: errorMsg } as any;
          }
          return throwError(errorMsg);
        })
      )
      .toPromise();
    if (result?.result?.checkOtp) {
      return async (otp: string) => {
        await this.signInAsync({ ...command, resendOtp: false, otp });
      };
    }

    this.updateToken({
      accessToken: result.result.accessToken,
      refreshToken: result.result.refreshToken,
    });
    this.storageService.setItem(
      AppCacheKeys.FIRST_LOGIN,
      result?.result?.firstLogin
    );
    this.storageService.setItem(AppCacheKeys.POPUP, true);
    const redirect = this.route?.snapshot?.queryParams['_redirect'] as string;
    this.router.navigateByUrl(redirect ?? '/');
  }

  loadUserPrivileges(): Observable<any> {
    const response = this.apiCache.get(AppCacheKeys.USER_PRIVILEGES);
    if (response) {
      return of(response);
    }

    return this.http
      .get<any>(`${environment.apiUrl}/privileges/currentuser`, {})
      .pipe(
        tap((prevlg) => {
          if (!isEmpty(prevlg.result)) {
            this.storageService.setState(
              AppCacheKeys.USER_PRIVILEGES,
              prevlg.result
            );
            this.apiCache.set(AppCacheKeys.USER_PRIVILEGES, prevlg);
          }
        })
      );
  }

  async loginUaePass(model: { code: string; appId: string }): Promise<void> {
    try {
      const result = await this.http
        .post<any>(this.uaePassEndpoint, model)
        .toPromise();

      this.updateToken({
        accessToken: result?.result?.accessToken,
        refreshToken: result?.result?.refreshToken,
      });
      this.storageService.setItem(
        AppCacheKeys.FIRST_LOGIN,
        result?.result?.firstLogin
      );
      this.storageService.setItem(AppCacheKeys.POPUP, true);
      this.storageService.setItem(
        AppCacheKeys.ORG,
        this.storageService.getItem(AppCacheKeys.UAE_PASS_ORG)
      );
      this.storageService.removeItem(AppCacheKeys.UAE_PASS_ORG);
      this.storageService.setItem(AppCacheKeys.LOGIN_TYPE, 'UAE_PASS');
    } catch (error) {
      const errorMsg =
        this.lang == 'en'
          ? error?.error?.error?.message_En
          : error?.error?.error?.message_Ar;
      this.storageService.setItem(AppCacheKeys.UAE_PASS_ERROR, errorMsg);
      this.storageService.setItem(
        AppCacheKeys.UAE_PASS_ERR_CODE,
        error?.error?.error?.code
      );
      window.open(this.uaeLogoutPassLink, '_self');
    }
  }

  public refreshToken(): Observable<void> {
    const command = {
      accessToken: this.state?.TokenModel?.accessToken,
      refreshToken: this.state?.TokenModel?.refreshToken,
    };

    if (this.previousRefreshEnded) {
      this.previousRefreshEnded = false;
      // first time token expired only
      this.refreshToken$ = this.http
        .put<any>(this.refreshTokenEndpoint, command, {
          headers: { 'Content-type': 'application/json' },
        })
        .pipe(
          tap((result) => {
            this.previousRefreshEnded = true;
            this.updateToken({
              accessToken: result.result,
              refreshToken: this.state?.TokenModel?.refreshToken,
            } as TokenModel);
          }),
          share(),
          catchError(async (err) => {
            await this.signOutAsync();
            return err;
          }),
          map((_) => {})
        );
    }
    return this.refreshToken$;
  }

  public async signOutAsync(): Promise<void> {
    try {
      this.http.post(`${this.logoutEndpoint}`, {}).toPromise();
    } catch {}
    this.signOut();
  }

  private signOut() {
    const loginType = this.storageService.getItem(AppCacheKeys.LOGIN_TYPE);
    this.updateToken(null);
    this.storageService.clear();
    if (loginType == 'UAE_PASS') {
      window.open(this.uaeLogoutPassLink, '_self');
    }
    this.router.navigate(['auth/login']).then(() => {
      window.location.reload();
    });
  }

  private parseJwt(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return {};
    }
  }

  sendFireBaseToken(firebaseToken: string) {
    const body = { token: firebaseToken };
    return this.http.put(`${environment.apiUrl}/firebase`, body);
  }
}
