import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  cols = ['image','name','brand','price','stock','isActive','actions'];
  data: Product[] = [];
  total = 0;
  page = 1;
  pageSize = 10;

  private destroy$ = new Subject<void>();
  private refetch$ = new Subject<void>();
  private search = '';

  constructor(
    private products: ProductService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    // listen search from dashboard toolbar
    DashboardComponent.search$
      .pipe(takeUntil(this.destroy$))
      .subscribe(t => { this.search = t || ''; this.page = 1; this.load(); });

    // initial + refresh
    this.refetch$
      .pipe(switchMap(() => this.products.list(this.search, this.page, this.pageSize)))
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => { this.data = res.items; this.total = res.total; });

    this.load();
  }

  load() { this.refetch$.next(); }

  onPage(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.load();
  }

  openDialog(edit?: Product) {
    this.dialog.open(ProductDialogComponent, { width: '520px', data: edit })
      .afterClosed().subscribe(ok => ok && this.load());
  }

  remove(p: Product) {
    // simple confirm
    if (!confirm(`Delete "${p.name}"?`)) return;
    this.products.delete(p.id).subscribe({
      next: () => { this.snack.open('Deleted', 'Close', { duration: 2000 }); this.load(); },
      error: () => this.snack.open('Delete failed', 'Close', { duration: 2500 })
    });
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
