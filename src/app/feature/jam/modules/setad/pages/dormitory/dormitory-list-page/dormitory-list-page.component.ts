import { AfterViewInit, Component } from '@angular/core';
import { SetadRepositoryService } from '../../../services/setad-repository.service';
import { MatTableDataSource } from '@angular/material/table';
import { IDormitories } from '../../../models/idormitories';
import { Workbook } from 'exceljs';
import * as jalaliMoment from 'jalali-moment';
import * as saveAs from 'file-saver';
import { isEmpty } from 'lodash-es';
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-dormitory-list-page',
  templateUrl: './dormitory-list-page.component.html',
  styleUrls: ['./dormitory-list-page.component.scss']
})
export class DormitoryListPageComponent implements AfterViewInit {
  dataSource: MatTableDataSource<IDormitories>;
  displayedColumns: string[] = ['name', 'sex', 'nationalCode', 'city', 'refId', 'type', 'authority', 'created', 'action'];
  data: IDormitories[];
  constructor (private readonly _setadRepository: SetadRepositoryService) {

  }
  ngAfterViewInit(): void {
    this._setadRepository.dormitories.subscribe(c => {
      this.data = c;
      this.dataSource = new MatTableDataSource(c);
    });
  }
  async onDownloadExport() {
    const wb = new Workbook();
    const ws = wb.addWorksheet('dormitory');
    const cols = [{ name: 'نام و نام خانوادگی' }, { name: 'امکانات' },
    { name: 'جنسیت' }, { name: 'شهر' }, { name: 'کد ملی' }, { name: 'شماره پرداخت' }, { name: 'زمان ثبت' }];
    const row = this.data.filter(c => !isEmpty(c.refId)).map(d => ([d.profile.name + ' ' + d.profile.family, d.type, d.profile.sex, d.profile.city, d.nationalCode, d.refId,moment(d.created).format('jDD HH:mm:ss')]));
    ws.addTable({ name: 'mytable', headerRow: true, ref: 'A1', rows: row, columns: cols });
    ws.columns?.forEach(c => c.width = 25);
    saveAs(new Blob([await wb.xlsx.writeBuffer()]), `dormitory-${jalaliMoment().format('jYYYYjMMjDD-HHmm')}.xlsx`);
  }
}
