import { Component, Inject, OnInit } from '@angular/core';
import { MatModule } from '../../../../../core/modules/mat.module';
import { GetFilesUrls } from '../../../../../core/enums/urls';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-change-file-modal',
  standalone: true,
  imports: [MatModule],
  templateUrl: './change-file-modal.component.html',
  styleUrl: './change-file-modal.component.css',
})
export class ChangeFileModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}
  filesData: any;
  ngOnInit(): void {
    this.http.get<any>(this.getAllFilesLocation).subscribe((data) => {
      this.filesData = data;
    });
  }
  getAllFilesLocation =
    GetFilesUrls.GET_FILES_URL +
    '?folder=' +
    this.data.location +
    '&type=' +
    this.data.type;

  mainUrl = GetFilesUrls.MAIN_FILES_URL;
}
