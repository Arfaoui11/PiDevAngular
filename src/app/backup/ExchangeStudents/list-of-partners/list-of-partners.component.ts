import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PartnerInstitutionService} from "../services/partner-institution.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";

import {MatSnackBar} from "@angular/material/snack-bar";

import {ToastrService} from "ngx-toastr";
import {PartnerInstitution} from "../../../core/model/PartnerInstitution";

@Component({
  selector: 'app-list-of-partners',
  templateUrl: './list-of-partners.component.html',
  styleUrls: ['./list-of-partners.component.css']
})
export class ListOfPartnersComponent implements OnInit {

  public universities: PartnerInstitution[];
  public editUniversity: PartnerInstitution;
  public deleteUniversity: PartnerInstitution;


  partners: PartnerInstitution[] = [];
  partner: PartnerInstitution = new PartnerInstitution();
  show : boolean = false;
  idU : number;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.MEDIUM;
  elementType= NgxQrcodeElementTypes.URL;
  imgURL: any;
  public imagePath :FileList;

  @Input() U:PartnerInstitution=new PartnerInstitution();


  constructor(private partnerService: PartnerInstitutionService,private snackbar:MatSnackBar,private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getListPartner();


  }

  ToggleForm()
  {
    this.show = ! this.show;
  }
  dataId(i:number)
  {
    console.log(i);
    this.idU = i;

  }

  onFileSelected(event : any) {

    const file : FileList = event?.target?.files;


    var reader = new FileReader();

    this.imagePath = file;

    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  savePartner(){
    this.partnerService.savePartner(this.partner).subscribe(
      data => {
        console.log('response', data);
        this.getListPartner()

      }
    );
  }
  public onOpenModal(university: PartnerInstitution, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUniversityModal');
    }
    if (mode === 'edit') {
      this.editUniversity = university;
      button.setAttribute('data-target', '#updateUniversityModal');
      this.toastr.info("update this university","update  ")
    }
    if (mode === 'delete') {
      this.deleteUniversity = university;
      button.setAttribute('data-target', '#deleteUniversityModal');
      this.toastr.warning("you are going to delete this university","Delete  ")
    }
    if(mode==='export'){
      button.setAttribute('data-target','#exportModal');
      this.toastr.info("choose export format","export format")
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  /*addUniversity(i:number) {
    this.partnerService.addUniversity(this.U, i).subscribe(
      data => {
        console.log('response', data);
      });

    //const formData = new FormData();

    for (let i = 0; i < this.imagePath.length; i++) {
      const element = this.imagePath[i];

      formData.append('files', element);
    }
  }*/
  getListPartner(){
    this.partnerService.getPartnerList().subscribe(
      data => {
        this.partners = data;
      }
    );
    return this.partners;
  }
  showToastr(){
    this.toastr.success("university has been deleted ","Deleted Successfully");
  }

  deletePartner(id: number){
    this.partnerService.deletePartner(id).subscribe(
      response => {
        this.partners = this.partners.filter(item => item.idPartner !== id);

      });


  }
  public SearchPartner(key: any): void {
    console.log(key);
    const results: any[] = [];
    for (const p of this.partners) {
      if (p.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(p);
      }
    }
    this.partners = results;
    if ( !key) {
      this.getListPartner();
    }

  }
 public updatePartner(p : PartnerInstitution,id:number){
    this.partnerService.editUniversity(p,id).subscribe(
      data => {
        this.partner = data;
      }
    );
  }

 /* public onUpdateUniversity(University: PartnerInstitution): void {
    this.partnerService.updateUniversityyy(University).subscribe(
      (response: PartnerInstitution) => {
        console.log(response);
        this.getListPartner();
      }

    );
  }*/
  public exportpdf(){
    this.partnerService.exportPdfUniversity().subscribe(
      x => {
        const blob = new Blob([x], {type: 'application/pdf'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'universities.pdf';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true , view: window}));
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
        });

      }
  public exportExcel(){
    this.partnerService.exportExcelUniversity().subscribe(
      x => {
        const blob = new Blob([x], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'});
        if (window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }
        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'universities.xlsx';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true , view: window}));
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });

  }



}




