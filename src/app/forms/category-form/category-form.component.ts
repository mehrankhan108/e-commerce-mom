import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from 'services/configuration.service';

@Component({
  selector: 'ngx-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  public fg: FormGroup;
  public isEdit = false;
  categoryList = [
    {categoryId: 1, categoryName: 'Men'},
    {categoryId: 2, categoryName: 'Women'},
    {categoryId: 3, categoryName: 'Assessories'},
  ];
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    public configService: ConfigurationService,
    public toastr: ToastrService
  ) {
    this.fg = this.fb.group({
      id: [],
      categoryName: [''],
      description: [''],
      parentId: [null],
      isActive: [true]
    })
  }

  onSubmit() {
    const model = {
      ...this.fg.value
    };
    if (this.isEdit) {
      this.configService.UpdateCategory(model).subscribe(res => {
        if (res) {
          this.toastr.success('Category updated successfully.', 'Category');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong Category not updated successfully.', 'Category');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Category not updated successfully.', 'Category');
        this.activeModal.close();
      });
    } else {
      this.configService.AddCategory(model).subscribe(res => {
        if (res) {
          this.toastr.success('Category added successfully.', 'Category');
          this.activeModal.close();
        } else {
          this.toastr.info('Something went wrong Category not added successfully.', 'Category');
          this.activeModal.close();
        }
      }, error => {
        this.toastr.info('Something went wrong Category not added successfully.', 'Category');
        this.activeModal.close();
      })
    }
  }
  ngOnInit() {
  }

}
