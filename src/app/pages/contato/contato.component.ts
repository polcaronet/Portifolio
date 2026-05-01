import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent implements OnInit {
  form!: FormGroup;
  sent = false;
  loading = false;
  selectedType = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:    ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  selectType(type: string): void {
    this.selectedType = type;
    const labels: Record<string, string> = {
      app: 'App Flutter (Mobile Android)',
      site: 'Site / Landing Page (Angular)',
    };
    this.form.patchValue({ subject: labels[type] ?? '' });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    // Integre com Formspree: https://formspree.io
    // fetch('https://formspree.io/f/SEU_ID', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(this.form.value) })
    setTimeout(() => { this.loading = false; this.sent = true; }, 1500);
  }

  reset(): void { this.sent = false; this.form.reset(); this.selectedType = ''; }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && c.touched);
  }
}
