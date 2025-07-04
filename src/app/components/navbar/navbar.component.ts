import { NgClass, NgStyle } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BehaviorSubject, filter } from 'rxjs';
import { heroArrowTopRightOnSquare, heroBars3, heroBuildingLibrary, heroBuildingOffice, heroBuildingOffice2, heroBuildingStorefront, heroChartPie, heroChevronRight, heroCloud, heroCog8Tooth, heroCube, heroEnvelope, heroFilm, heroHome, heroPaintBrush, heroPaperAirplane, heroPresentationChartLine, heroTruck, heroUser, heroWrenchScrewdriver, heroXMark } from '@ng-icons/heroicons/outline';
import { bootstrapWhatsapp } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgStyle,
    NgIcon,
  ],
  viewProviders: [provideIcons({
    heroChevronRight,
    heroHome,
    heroUser,
    heroBuildingLibrary,
    heroCog8Tooth,
    heroBars3,
    heroXMark,
    heroChartPie,
    heroPresentationChartLine,
    heroCube,
    heroBuildingOffice2,
    heroBuildingStorefront,
    heroPaintBrush,
    heroWrenchScrewdriver,
    heroBuildingOffice,
    heroCloud,
    heroTruck,
    heroFilm,
    heroEnvelope,
    heroArrowTopRightOnSquare,
    heroPaperAirplane,
    bootstrapWhatsapp
  })],
  templateUrl: './navbar.component.html',
})

export class NavbarComponent implements OnInit {

  public isOpen: boolean | undefined;
  public items = [
    { id: 0, nome: "Home", link: "home", iconName: "heroHome" },
    { id: 1, nome: "Chi Siamo", link: "chi-siamo", iconName: "heroUser" },
    { id: 2, nome: "Progetti", link: "progetti", iconName: "heroBuildingLibrary" },
    {
      id: 3, nome: "Servizi", link: "servizi", iconName: "heroCog8Tooth",
      submenu: [
        { id: 30, nome: 'Costruzioni generali', link: 'servizi/costruzioni', iconName: 'heroBuildingOffice' },
        { id: 31, nome: 'Lavori edili e stradali', link: 'servizi/lavori', iconName: 'heroTruck' },
        { id: 32, nome: 'Idrodemolizioni', link: 'servizi/idrodemolizioni', iconName: 'heroCloud' },
        { id: 33, nome: 'Restauri conservativi', link: 'servizi/restauri', iconName: 'heroPaintBrush' },
        { id: 34, nome: 'Noleggio ponteggi e attrezzature', link: 'servizi/noleggio', iconName: 'heroWrenchScrewdriver' },
      ],
      isSubmenuOpen: false
    },
    { id: 4, nome: "Contatti", link: "contatti", iconName: "heroEnvelope" }
  ];

  public breadcrumbs: Array<{ label: string, url: string }> = [];
  private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string; url: string }>>([]);

  public router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        this.breadcrumbsSubject.next(breadcrumbs);
        this.breadcrumbs = breadcrumbs;
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string; url: string }> = []): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      // Ricorsione sui figli
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  public toggleSubmenu(item: any): void {
    // Chiudi tutti gli altri sottomenù prima di aprire il nuovo
    this.items.forEach(i => {
      if (i !== item) {
        i.isSubmenuOpen = false;
      }
    });

    // Toggle del sottomenù corrente
    item.isSubmenuOpen = !item.isSubmenuOpen;

    // Se siamo in mobile e stiamo aprendo un sottomenù, assicuriamoci che il menu principale rimanga aperto
    if (item.isSubmenuOpen && window.innerWidth < 768) {
      this.isOpen = true;
    }
  }

  public closeSubmenu(item: any): void {
    this.items.forEach(i => {
      if (i.isSubmenuOpen !== item) {
        i.isSubmenuOpen = false
      }
    });
  }

  public isActive(item: any): boolean {
    const currentUrl = this.router.url;
    if (currentUrl === '/' + item.link || currentUrl === item.link) return true;

    if (item.submenu) {
      return item.submenu.some((subitem: any) =>
        currentUrl.startsWith('/' + subitem.link) || currentUrl.startsWith(subitem.link)
      );
    }
    return false;
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    // Verifica se il click è avvenuto all'esterno del menu
    const navbarElement = document.querySelector('nav');
    if (navbarElement && !navbarElement.contains(event.target as Node)) {
      // Chiudi tutti i sottomenù
      this.items.forEach(item => {
        if (item.submenu) {
          item.isSubmenuOpen = false;
        }
      });
      // Chiudi il menu principale su mobile
      this.isOpen = false;
    }
  }
}