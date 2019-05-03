import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  eventSource = []
  event = {
    title:'',
    descrip:'',
    startTime:'',
    endTime:'',
  }

  minDate = new Date().toISOString();
  viewTitle ="Schedular";
  
  @ViewChild(CalendarComponent) mycal:CalendarComponent
  calendar={
    mode:'day',
    currentDate:new Date()
  }
  

  constructor(private  alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string){}
  ngOnInit(){
    this.resetEvent();
  }
  resetEvent(){
    this.event = {
      title:'',
      descrip:'',
      startTime:new Date().toISOString(),
      endTime:new Date().toISOString(),
    }
  }

  addEvent(){
    let eventCopy ={
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      descrip: this.event.descrip
    }
    this.eventSource.push(eventCopy);
    this.mycal.loadEvents();
    this.resetEvent();
  }
  today(){
    this.calendar.currentDate = new Date();
  }
  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
  changeMode(mode){
    this.calendar.mode = mode;
  }
  async onEventSelected(event){
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: '+ start + '<br><br>To: '+ end,
      buttons: ['OK']
    });
    alert.present();
  }
  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
  onViewTitleChanged(title){
    this.viewTitle = title;
  }

}
