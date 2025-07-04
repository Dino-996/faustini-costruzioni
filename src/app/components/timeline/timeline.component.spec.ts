import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TimelineComponent } from "./timeline.component";
import { Steps } from "../../model/steps";
import { By } from "@angular/platform-browser";

describe('Test del componente TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  const mockSteps: Steps[] = [
    { id: 0, description: 'First Step' },
    { id: 1, description: 'Second Step' },
    { id: 2, description: 'Third Step' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();
  });

  describe('Configurazione iniziale', () => {
    it('componente creato correttamente', () => {
      expect(component).toBeTruthy();
    });

    it('dovrebbe avere input steps definito', () => {
      expect(component.steps).toBeDefined();
    });
  });

  describe('Rendering del modello', () => {
    it('dovrebbe renderizzare tutti gli step passati come input', () => {
      const stepsElement = fixture.debugElement.queryAll(By.css('[role="button"]'));
      expect(stepsElement.length).toBe(3);
    });

    it('dovrebbe mantenere l\'ordine corretto degli step', () => {
      const stepTitles = fixture.debugElement.queryAll(By.css('span.bg-white\\/80'));
      expect(stepTitles[0].nativeElement.textContent.trim()).toContain('Step 1');
      expect(stepTitles[1].nativeElement.textContent.trim()).toContain('Step 2');
      expect(stepTitles[2].nativeElement.textContent.trim()).toContain('Step 3');
    });

    it('dovrebbe avere attributi ARIA e tabindex per l\'accessibilità', () => {
      const stepsElements = fixture.debugElement.queryAll(By.css('[role="button"]'));
      stepsElements.forEach((el, index) => {
        expect(el.attributes['aria-label']).toContain(`Step ${index + 1}`);
        expect(el.attributes['tabindex']).toBe('0');
      });
    });

    it('dovrebbe avere un elemento animato con classe animate-ping per ogni step', () => {
      const animatedDots = fixture.debugElement.queryAll(By.css('.animate-ping'));
      expect(animatedDots.length).toBe(3);
    });

    it('dovrebbe avere la linea di connessione con gradiente', () => {
      const gradientLine = fixture.debugElement.query(By.css('.bg-gradient-to-r'));
      expect(gradientLine).toBeTruthy();
    });

    it('dovrebbe aggiornarsi correttamente con nuovi step (OnPush)', () => {
      const newSteps = [
        { id: 3, description: 'Fourth Step' },
        { id: 4, description: 'Fifth Step' }
      ];
      fixture.componentRef.setInput('steps', newSteps);
      fixture.detectChanges();

      const stepTitles = fixture.debugElement.queryAll(By.css('span.bg-white\\/80'));
      expect(stepTitles.length).toBe(2);
      expect(stepTitles[0].nativeElement.textContent.trim()).toBe('Step 4');
    });
  });

  describe('Gestione di edge case', () => {
    it('non dovrebbe crashare con input vuoto', () => {
      fixture.componentRef.setInput('steps', []);
      fixture.detectChanges();

      const stepsElements = fixture.debugElement.queryAll(By.css('[role="button"]'));
      expect(stepsElements.length).toBe(0);
    });

    it('non dovrebbe crashare con input nullo', () => {
      fixture.componentRef.setInput('steps', null as any);
      fixture.detectChanges();

      const stepsElements = fixture.debugElement.queryAll(By.css('[role="button"]'));
      expect(stepsElements.length).toBe(0);
    });

    it('dovrebbe gestire correttamente step con descrizione vuota', () => {
      const incompleteSteps = [
        { id: 0, description: '' },
        { id: 1, description: 'Valid Step' }
      ];
      fixture.componentRef.setInput('steps', incompleteSteps);
      fixture.detectChanges();

      const descriptions = fixture.debugElement.queryAll(By.css('span.text-xs.md\\:text-sm'));
      expect(descriptions[0].nativeElement.textContent.trim()).toBe('');
      expect(descriptions[1].nativeElement.textContent.trim()).toBe('Valid Step');
    });
  });

});
