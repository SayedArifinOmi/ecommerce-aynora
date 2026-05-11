import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductCreate } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]],
    brand: ['', [Validators.required, Validators.maxLength(64)]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''],
    isActive: [true]
  });

  constructor(
    private fb: FormBuilder,
    private api: ProductService,
    private snack: MatSnackBar,
    private ref: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Product
  ) {
    if (data) this.form.patchValue(data);
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.value as ProductCreate;
    const req = this.data ? this.api.update(this.data.id, dto) : this.api.create(dto);
    req.subscribe({
      next: () => { this.snack.open('Saved', 'Close', { duration: 1500 }); this.ref.close(true); },
      error: () => this.snack.open('Save failed', 'Close', { duration: 2500 })
    });
  }
}
