import { TestBed } from '@angular/core/testing';

import { PhotoEditorService } from './photo-editor.service';

describe('NgxPhotoEditorService', () => {
  let service: PhotoEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
