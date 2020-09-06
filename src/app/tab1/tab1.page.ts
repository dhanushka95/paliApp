import { Component } from '@angular/core';
import {Settings} from '../common/Settings';
import {SaveFile} from '../common/SaveFile';
import {AppServiceService} from '../app-service.service';
import {AlertController, Platform, PopoverController, ToastController} from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  Item: any[] = [];
  sharedItems: any[];
  searchValue = '';
  isLoading = false;
  type = 1;
  tempItem: any[] = [];
  constructor(public informationServiceProvider: AppServiceService, public speechRecognition: SpeechRecognition, public alertController: AlertController, private platform: Platform, public toastController: ToastController, public popoverController: PopoverController) {}
  async search() {
    try {
      if (this.searchValue && this.searchValue.trim() !== '') {
        this.isLoading = true;
        this.informationServiceProvider.getInfo(this.searchValue, this.type).subscribe(
            (list: any) => {
              console.log(list);
              this.Item = list.data;
              this.tempItem = list.data;
              this.isLoading = false;
            });
      } else {
        const toast = await this.toastController.create({
          message: 'සෙවුම් පදය යොදන්න.',
          duration: 4000
        });
        toast.present();
      }
    } catch (e) {
      console.log(e + '');
    }
  }
  onCancel(){

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.speechRecognition.hasPermission()
          .then((hasPermission: boolean) => {

            if (!hasPermission) {
              this.speechRecognition.requestPermission()
                  .then(
                      () => console.log('Granted'),
                      () => console.log('Denied')
                  );
            }

          });
    }

  }
  onSearchInput(event){
    console.log(event);
  }
  async speechRecognitionExecute() {
    if (this.platform.is('cordova')) {
      // start listening
      this.speechRecognition.startListening()
          .subscribe(
              (matches: string[]) => console.log(matches),
              (onerror) => console.log('error:', onerror)
          );
    } else {
      await this.toastController.create({
        message: 'Not Supported',
        duration: 4000
      });
    }
  }
  async moreInfo(item) {
    // @ts-ignore
    const alert = await this.alertController.create({
      header: item.field2,
      subHeader: `${item.field3 + ' { ' + item.field4 + ' }'}`,
      message: `
      <h5>කෙටි නාමයන්හී තේරුම්</h5>
      <h6>පු. &nbsp: පුල්ලිංග</h6>
      <h6>ඉ. &nbsp: ඉත්ථිලිංග</h6>
      <h6>න. &nbsp: නපුංසකලිංග</h6>
      <h6>3 &nbsp: තුන්ලිගුවෙහිම යෙදේ</h6>
      <h6>නි. &nbsp: නිපාත</h6>
      <h6>නා. &nbsp: නාමපද</h6>
      <h6>ස. &nbsp: සමාස</h6>
      <h6>පු.ක්‍රි &nbsp : පුර්වක්‍රියා</h6>
      <h6>අ.ක්‍රි &nbsp: අතිත ක්‍රියා</h6>
      <h6>ක්‍රි.වි &nbsp: ක්‍රියා විශේෂන</h6>
      <h6>සි. &nbsp: සිංහල වචන</h6>
      `,
      cssClass: 'alert-danger',
      buttons: [{
        text: 'Back',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }]
    });
    await alert.present();
  }
  async typeChange(ev: any){
    const alert = await this.alertController.create();
    alert.cssClass  = 'alert-success';
    alert.header = 'Convert To';
    alert.inputs = [{type: 'radio', label: 'සිංහල --> පාලී', value: '1', checked: Settings.type === 1 ? true : false}, {type: 'radio', label: 'පාලී --> සිංහල', value: '2', checked: Settings.type === 2 ? true : false}];
    await alert.present();
    alert.buttons = [{
      text: 'OK',
      handler: data => {
        console.log(data);
        this.type = parseInt(data);
        Settings.type = this.type;
      }
    }];
  }
  offlineSearch(ev){
    console.log(ev.target.value);
    const val = ev.target.value;
    console.log(ev);
    if (this.tempItem.length > 0){
      if (val && val.trim() !== '') {
        this.Item = this.tempItem.filter((item) => {
          if (item.field1.toLowerCase().indexOf(val.toLowerCase()) > -1){
            return item.field1.toLowerCase().indexOf(val.toLowerCase()) > -1;
          }else {
            return (item.field2.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        });
      }else{
        this.Item = this.tempItem;
      }
    }
  }
  saveSF(item){
    SaveFile.data.push(item);
  }
  removeSF(item){
    SaveFile.data.filter(f => f !== item);
  }

  checkIsBookMark(item){
    for(let i = 0; i < SaveFile.data.length; i++){
      if (SaveFile.data[i] === item){
        return true;
      }
    }
    return false;

  }
}
