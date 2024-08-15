import { NgClass } from '@angular/common';
import { Component, OnInit, signal, WritableSignal, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { db } from '../app.config';
import { addDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Observable } from 'rxjs/internal/Observable';
import { AnimationService } from '../animation.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})

export class QuoteComponent implements OnInit, AfterViewInit, OnDestroy {

  minDate: WritableSignal<string> = signal('');
  selectedFile: File | null = null;
  uploadProgress: Observable<number | undefined> | null = null;
  progressBar: WritableSignal<number> = signal(0);
  fileURL: WritableSignal<string> = signal('');
  profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12)
    ]),
    lastName: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12)
      ]
    ),
    phone: new FormControl('',
      [
        Validators.required,
        Validators.pattern('^[+]?[0-9]{9,15}$')
      ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
    ]),
    service: new FormControl('', Validators.required),
    budget: new FormControl('', [
      Validators.required,
      Validators.min(100000),
      Validators.max(1500000)
    ]),
    completionTime: new FormControl(''),
    startWork: new FormControl(''),
    details: new FormControl(''),
    linkPDF: new FormControl(''),
    legal: new FormControl('', Validators.required)
  });
  private scrollListenerTitleSection!: () => boolean | void;
  private scrollListenerTextSection!: () => boolean | void;
  private scrollListenerFormSection!: () => boolean | void;
  public isAnimationTitleSection = signal(false);
  public isAnimationTextSection = signal(false);
  public isAnimationFormSection = signal(false);

  constructor(private elementRef: ElementRef, private animationService: AnimationService) { }

  /**
   * Initializes the component by setting the minimum date to the current date.
   *
   * @return {void}
   */
  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.minDate.set(today);
  }

  /**
   * Initializes the animation listeners for the title, text, and form sections after the view has been initialized.
   *
   * @return {void}
   */
  ngAfterViewInit(): void {
    const titleSection = this.elementRef.nativeElement.querySelector('.titleSection');
    const textSection = this.elementRef.nativeElement.querySelector('.textSection');
    const formSection = this.elementRef.nativeElement.querySelector('.formSection');
    this.scrollListenerTitleSection = this.animationService.renderAnimation(titleSection, 600, this.isAnimationTitleSection);
    this.scrollListenerTextSection = this.animationService.renderAnimation(textSection, 600, this.isAnimationTextSection);
    this.scrollListenerFormSection = this.animationService.renderAnimation(formSection, 600, this.isAnimationFormSection);
  }

  /**
   * Destroys the component by cleaning up the animation listeners.
   *
   * @return {void}
   */
  ngOnDestroy(): void {
    if (this.scrollListenerTitleSection) {
      this.scrollListenerTitleSection();
    }
    if (this.scrollListenerTextSection) {
      this.scrollListenerTextSection();
    }
    if (this.scrollListenerFormSection) {
      this.scrollListenerFormSection();
    }
  }

  /**
   * Handles the event when a file is selected.
   *
   * @param {any} event - The event object containing information about the selected file.
   * @return {void} This function does not return anything.
   */
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Per favore seleziona un file PDF valido.');
      this.selectedFile = null;
    }
  }

  /**
   * Sends an email using the EmailJS service with the provided form data.
   *
   * @return {Promise<void>} A promise that resolves when the email is sent successfully, or rejects with an error.
   */
  async sendEmail(): Promise<void> {
    const public_key = 'j1IAnXQOEsaEW01gQ';
    emailjs.init(public_key);
    const param = {
      first_name: this.profileForm.get('firstName')?.value,
      last_name: this.profileForm.get('lastName')?.value,
      cellphone: this.profileForm.get('phone')?.value,
      email: this.profileForm.get('email')?.value,
      service: this.profileForm.get('service')?.value,
      budget: this.formatEuro(this.profileForm.get('budget')?.value),
      completionTime: this.profileForm.get('completionTime')?.value,
      startWork: this.formatReadableDate(this.profileForm.get('startWork')?.value),
      message: this.profileForm.get('details')?.value,
      details: this.fileURL(),
      reply_to: "faustini.costruzioni@gmail.com",
    };
    await emailjs.send('service_0otesgc', 'template_pefdhyp', param).then((result) => {
      const response = document.getElementById('response');
      response?.classList.add('text-green-500');
      response!.innerText = "eMail inviata con successo!";
      setTimeout(() => {
        response!.innerText = "";
        response?.classList.remove('text-green-500');
        this.progressBar.set(0);
        this.selectedFile = null;
        this.profileForm.reset();
      }, 5000);
      console.log(result.status, result.text);
    }).catch((error) => {
      const response = document.getElementById('response');
      response?.classList.add('text-red-500');
      response!.innerText = "Qualcosa è andato storto! Se il problema persiste contattaci via email a faustini.costruzioni@gmail.com";
      setTimeout(() => {
        response!.innerText = "";
        response?.classList.remove('text-red-500');
        this.progressBar.set(0);
        this.selectedFile = null;
        this.profileForm.reset();
      });
      console.log(error.status, error.text);
    });
  }

  /**
   * Handles the form submission by uploading the selected file to storage and updating the progress bar.
   *
   * @return {Promise<void>} A promise that resolves when the file upload is complete, or rejects with an error.
   */
  async goForm(): Promise<void> {
    if (this.selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `preventivi/${this.selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.selectedFile);

      return new Promise<void>((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            this.progressBar.set(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
            console.log('Caricamento al' + this.progressBar + '% completato');
          },
          (error) => {
            console.error('Errore durante l\'upload', error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              this.fileURL.set(downloadURL);
              console.log('File disponibile al seguente URL:', downloadURL);
              resolve();
            }).catch(error => reject(error));
          }
        );
      });
    }
  }

  /**
   * Handles the form submission by collecting the form data and adding a new document to the "preventivi" collection in the database.
   *
   * @return {Promise<void>} A promise that resolves when the document is added to the database, or rejects with an error.
   */
  async onSubmit(): Promise<void> {
    await this.goForm();
    await this.sendEmail();
    const firstName = this.profileForm.get('firstName')?.value
    const lastName = this.profileForm.get('lastName')?.value
    const phone = this.profileForm.get('phone')?.value
    const email = this.profileForm.get('email')?.value
    const service = this.profileForm.get('service')?.value
    const budget = this.formatEuro(this.profileForm.get('budget')?.value)
    const completionTime = this.profileForm.get('completionTime')?.value
    const startWork = this.formatReadableDate(this.profileForm.get('startWork')?.value)
    const details = this.profileForm.get('details')?.value
    const linkPDF = this.fileURL()
    const legal = this.profileForm.get('legal')?.value
    try {
      const docRef = await addDoc(collection(db, "preventivi"), {
        nome: firstName,
        cognome: lastName,
        cellulare: phone,
        email: email,
        servizio: service,
        budget: budget,
        rangeDiTempo: completionTime,
        inizioLavori: startWork,
        dettagli: details,
        linkPdf: linkPDF,
        privacyPolicyAccettata: legal
      });
      console.log(docRef.id);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Formats a given amount as a string in the Euro currency format.
   *
   * @param {string | number | null | undefined} amount - The amount to be formatted.
   * @return {string} The formatted amount in the Euro currency format.
   */
  formatEuro(amount: string | number | null | undefined): string {
    if (amount == null) {
      return '';
    }
    return amount.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Formats a given date string into a readable date string in the Italian locale.
   *
   * @param {string | null | undefined} dateString - The date string to be formatted.
   * @return {string} The formatted date string in the format "dd/mm/yyyy".
   */
  formatReadableDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  }

}
