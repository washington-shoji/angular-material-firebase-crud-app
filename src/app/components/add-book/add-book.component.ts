import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { BookService } from './../../shared/book.service';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];

  @ViewChild('chipList') chipList: any;
  @ViewChild('resetBookForm') myNgForm: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType!: string;
  bookForm: FormGroup = new FormGroup({
    book_name: new FormControl('', [Validators.required]),
    isbn_10: new FormControl('', [Validators.required]),
    author_name: new FormControl('', [Validators.required]),
    publication_date: new FormControl('', [Validators.required]),
    binding_type: new FormControl('', [Validators.required]),
    in_stock: new FormControl('Yes'),
    languages: new FormControl(this.languageArray),
  });
  BindingType: any = [
    'Paperback',
    'Case binding',
    'Perfect binding',
    'Saddle stitch binding',
    'Spiral binding',
  ];

  constructor(public fb: FormBuilder, private bookApi: BookService) {}

  ngOnInit(): void {
    this.bookApi.GetBookList();
  }

  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  submitBookForm() {
    this.bookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray],
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  };

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.chipInput?.inputElement;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Date */
  formatDate(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.bookForm.get('publication_date')?.setValue(convertDate, {
      onlyself: true,
    });
  }

  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach((key) => {
      this.bookForm.controls[key].setErrors(null);
    });
  }
  /* Submit book */
  submitBook() {
    if (this.bookForm.valid) {
      this.bookApi.AddBook(this.bookForm.value);
      this.resetForm();
    }
  }
}
