import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService, Product } from '../../core/services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  featuredProducts: Product[] = [];
  isScrolled = false;
  newsletterEmail = '';

  // ── Floating particles ──
  bubbles = Array.from({ length: 14 }, () => ({
    width:             Math.random() * 40 + 10 + 'px',
    height:            Math.random() * 40 + 10 + 'px',
    left:              Math.random() * 100 + '%',
    animationDelay:    Math.random() * 10 + 's',
    animationDuration: Math.random() * 12 + 10 + 's',
    opacity:           (Math.random() * 0.06 + 0.02).toString()
  }));

  // ── Hero content ──
  heroPills = ['Free Delivery', 'Authentic Products', 'Easy Returns'];

  heroStats = [
    { value: '30+',  label: 'Products'  },
    { value: '3K+',  label: 'Customers' },
    { value: '4.9★',  label: 'Rating'    },
    { value: '2-Day', label: 'Delivery'  },
  ];

  // ── Ticker ──
  tickerItems = [
    'Free Delivery Over ৳1499',
    'Premium Watches',
    'Best Prices Guaranteed',
    '100% Authentic',
    'Cash on Delivery Available',
    '1000+ Happy Customers',
  ];

  // ── Categories ──
  categories = [
    { name: 'Luxury',       icon: '👑', count: 48 },
    { name: 'Classic',      icon: '🕰️', count: 72 },
    { name: 'Sport',        icon: '🏃', count: 35 },
    { name: 'New Arrivals', icon: '✨', count: 24 },
    { name: 'Sale',         icon: '🏷️', count: 60 },
    { name: 'Gifts',        icon: '🎁', count: 18 },
  ];

  // ── Trust / Features bar ──
  features = [
    { icon: '🚚', title: 'Free Delivery',   desc: 'On orders over ৳1499'    },
    { icon: '🔒', title: 'Secure Payment',  desc: 'SSL encrypted checkout' },
    { icon: '⭐', title: '100% Authentic',  desc: 'Genuine products only'  },
    { icon: '🏷️', title: 'Easy Returns',  desc: 'Genuine products only'  },
  ];

  // ── Testimonials ──
  testimonials = [
    {
      name:  'Rahim Uddin',
      text:  'Amazing quality! The watch arrived quickly and looks exactly like the photos. Absolutely love it.',
      date:  'April 2026',
      color: 'linear-gradient(135deg,#b8974a,#d4b06a)'
    },
    {
      name:  'Sadia Islam',
      text:  'Best online watch shop in Bangladesh! Great prices and super fast delivery. Already placed my second order.',
      date:  'March 2026',
      color: 'linear-gradient(135deg,#5d6ab5,#8e9fd4)'
    },
    {
      name:  'Karim Hossain',
      text:  'Customer support was very helpful. Had a small issue and it was resolved within hours. Highly recommend.',
      date:  'May 2026',
      color: 'linear-gradient(135deg,#4a9c6d,#7abf9a)'
    },
  ];

  constructor(
    private home:   HomeService,
    private router: Router,
    private snack:  MatSnackBar,
    private cart:   CartService
  ) {}

  ngOnInit(): void {
    this.home.getFeaturedProducts().subscribe({
      next:  res => this.featuredProducts = res,
      error: ()  => this.snack.open('Failed to load products', 'Close', { duration: 2000 })
    });
  }

  // ── Scroll detection for navbar ──
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 60;
  }

  // ── Smooth scroll to products section ──
  scrollToProducts(): void {
    document.getElementById('productsSection')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Add to cart & navigate ──
  buyNow(productId: number, qty: number): void {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.snack.open('Please login to continue', 'Login', { duration: 3000 })
        .onAction().subscribe(() => this.router.navigate(['/login']));
      this.router.navigate(['/login']);
      return;
    }
    const product = this.featuredProducts.find(x => x.id === productId);
    if (!product) return;

    this.cart.add({
      productId: product.id,
      name:      product.name,
      price:     product.price,
      quantity:  qty,
      imageUrl:  product.imageUrl,
      stock:     product.stock
    });

    this.snack.open('Added to cart! 🛒', 'View Cart', { duration: 2500 })
      .onAction().subscribe(() => this.router.navigate(['/dashboard/cart']));
  }

  // ── Copy promo code to clipboard ──
  copyPromoCode(): void {
    navigator.clipboard.writeText('AYNORA10').then(() => {
      this.snack.open('✅ Promo code copied!', 'Close', { duration: 2000 });
    }).catch(() => {
      this.snack.open('Code: AYNORA10', 'Close', { duration: 2500 });
    });
  }

  // ── Newsletter subscribe ──
  subscribeNewsletter(email: string): void {
    if (!email || !this.isValidEmail(email)) {
      this.snack.open('Please enter a valid email address', 'Close', { duration: 2500 });
      return;
    }
    // TODO: wire up to your backend newsletter API
    this.snack.open('Subscribed successfully 🎉 ! Welcome to Aynora.', 'Close', { duration: 3000 });
    this.newsletterEmail = '';
  }

  // ── Email validator helper ──
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

