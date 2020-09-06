import { Component } from '@angular/core';
import {SaveFile} from '../common/SaveFile';
import {Settings} from '../common/Settings';
import {AppServiceService} from '../app-service.service';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';
import {AlertController, Platform, PopoverController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Item: any[] = [];
  constructor(public speechRecognition: SpeechRecognition, public alertController: AlertController,  public toastController: ToastController, public popoverController: PopoverController) {
    SaveFile.data.forEach(item => {
      console.log(item);
      if (item.field5 === (Settings.type === 1 ? 'S' : 'P')){
        this.Item.push(item);
      }
    });
  }
  removeSF(item){
    SaveFile.data = SaveFile.data.filter(f => f !== item);
    this.doRefresh();
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
  doRefresh(){
    this.Item = [];
    SaveFile.data.forEach(item => {
      console.log(item);
      if (item.field5 === (Settings.type === 1 ? 'S' : 'P')){
        this.Item.push(item);
      }
    });
  }
}
