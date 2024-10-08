import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserListResponseDto } from 'src/dtos/user/user-list-response.dto';
import { UserTypeEnum } from 'src/enums/user-type.enum';
import { UserService } from 'src/services/user.service';
import { SupplierService } from 'src/services/supplier.service';
import { Router } from '@angular/router';
import { DeleteUserComponent } from '../../delete-user/delete-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Role {
  value: string;
  name: { [key: string]: string };
}
@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent {
  currentPage: number = 1;
  itensPerPage: number = 8;

  userList!: UserListResponseDto[];
  userFilterList!: UserListResponseDto[];
  form: FormGroup;
  storedLanguage: string | null;

  roleList: Role[] = [
    {
      value: 'visualizador_projetos',
      name: {
        'en': 'Project Viewer',
        'pt': 'Visualizador de projetos',
        'fr': 'Visualiseur de projets',
        'es': 'Visualizador de proyectos'
      }
    },
    {
      value: 'revisor_projetos',
      name: {
        'en': 'Project Reviewer',
        'pt': 'Revisor de projetos',
        'fr': 'Relecteur de projets',
        'es': 'Revisor de proyectos'
      }
    },
    {
      value: 'revisor',
      name: {
        'en': 'Bid/convention reviewer',
        'pt': 'Revisor de licitação/convênio',
        'fr': "Réviseur d'appels d'offres / convention",
        'es': 'Revisor de licitación/convenio'
      }
    },
    {
      value: 'gerente_geral_projetos',
      name: {
        'en': 'General Project Manager',
        'pt': 'Gestor de projetos geral',
        'fr': 'Chef de projet général',
        'es': 'Gerente de proyectos general'
      }
    },
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService,
    private supplierService: SupplierService,
    private ngbModal: NgbModal,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required, Validators.minLength(2)]],
    });

  }

  ngOnInit(): void {

    const id = localStorage.getItem('id_user_manager');
    if (id && id == '0') {
      localStorage.removeItem('id_user_manager')
      this.userFilterList = this.userService.getUserManagerFilterList();
      this.userList = this.userService.getUserManagerList();
    } else {
      this.list()
    }

    this.form.controls['search'].valueChanges.subscribe((text: string) => {
      if (text) {

        const name = this.userList.filter(obj => ((obj.name).toLowerCase()).includes(text.toLowerCase()));
        const documents = this.userList.filter(obj => ((obj.document).toLowerCase()).includes(text.toLowerCase()));
        const email = this.userList.filter(obj => ((obj.email).toLowerCase()).includes(text.toLowerCase()));

        const array = [...name, ...documents, ...email]
        const dataArr = new Set(array)
        const result = [...dataArr];

        this.userFilterList = result
      }

      else
        this.userFilterList = this.userList
    });

    this.storedLanguage = localStorage.getItem('selectedLanguage');
  }

  list() {
    this.userService.listByType(UserTypeEnum.project_manager).subscribe({
      next: (data) => {
        this.supplierService.supplierList().subscribe({
          next: (successSup) => {
            for (let user of data) {
              for (let sup of successSup) {
                if (user.supplier == sup._id) {
                  user.supplier = sup.name
                }
              }
            }
            this.userList = data;
            this.userFilterList = data;
            this.userService.setUserManagerFilterList(data);
            this.userService.setUserManagerList(data);
            this.ngxSpinnerService.hide();
          },

          error: (error) => {
            console.error(error.error.errors[0]);
          }
        });

      },
      error: (err) => {
        console.error(err);
        this.ngxSpinnerService.hide();
      }
    })
  }
  openModal(item: UserListResponseDto) {
    this.userService.deleteUser = item;
    this.userService.deleted = false;

    const modal = this.ngbModal.open(DeleteUserComponent, {
      centered: true,
      backdrop: true,
      size: 'md',
    });

    modal.result.then((data: any) => {

    }, (error: any) => {
      if (this.userService.deleted) {
        const i = this.userList.findIndex(x => x._id === this.userService.deleteUser?._id);
        this.userList.splice(i, 1);
      }
      this.userService.deleteUser = null;
      this.userService.deleted = false;
    });

  }

  navigateToItem(id: string) {
    this.router.navigate(['/pages/controle-project-manager/project-manager/' + id]);
  }

  getNameOfRole(value: string): string | null {
    // Determina o idioma com base em this.storedLanguage ou usa 'en' (Inglês) como padrão
    const language = localStorage.getItem('selectedLanguage') || 'pt';

    const role = this.roleList.find(role => role.value === value);
    if (role && role.name[language]) {
      return role.name[language];
    }
    return null;
  }
}
