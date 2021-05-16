import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileRepositoryService } from '../services/profile-reporsitory-service';

@Component({
  selector: 'app-get-zoroastrian-card',
  templateUrl: './get-zoroastrian-card.component.html',
  styleUrls: ['./get-zoroastrian-card.component.scss']
})
export class GetZoroastrianCardComponent implements AfterViewInit {
  zForm: FormGroup;
  isLoading = false;
  constructor (private readonly _fb: FormBuilder, private readonly _repo: ProfileRepositoryService, private readonly _router: Router) {
    this.zForm = _fb.group({
      hasCard: [, Validators.required]
    });
  }
  ngAfterViewInit(): void {
    
  }

  onChangeOwner() {
    const changed = <number>this.zForm.value.hasCard;
    console.log('hi');
    this.zForm.removeControl('ownerCard');
    this.zForm.removeControl('motherCard');
    this.zForm.removeControl('fatherCard');
    if (changed == 1) {
      this.zForm.addControl('ownerCard', this._fb.control(null, [Validators.required]));
    }
    if (changed == 2) {
      this.zForm.addControl('motherCard', this._fb.control(null, [Validators.required]));
      this.zForm.addControl('fatherCard', this._fb.control(null, [Validators.required]));
    }
  }
  onSubmit() {
    this.isLoading = true;
    this._repo.uploadzorostrianCard(this.zForm.value).subscribe(c => {
      this.isLoading = false;
      this._router.navigate(['/Manthra']);
    });

  }
}
