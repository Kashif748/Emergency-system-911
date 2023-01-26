/* tslint:disable */
/* eslint-disable */
import { LibraryAccessType } from './library-access-type';
import { LibraryCategory } from './library-category';
import { OrgStructure } from './org-structure';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface BaseLibrary {
  category?: LibraryCategory;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn: string;
  id?: number;
  isActive?: boolean;
  itemType: 'Folder' | 'File';
  libraryAccessType: LibraryAccessType;
  name: string;
  organization: OrgStructure;
  parent?: BaseLibrary;
}

