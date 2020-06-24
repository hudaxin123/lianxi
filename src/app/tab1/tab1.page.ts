import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var Wechat;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  latitude = [];
  longitude: any;
  accuracy: number;
  timestamp: number;
  i;
  b = 0;
  constructor(
    private http: HttpClient
  ) {}

  // getG() {
  //     this.i = '开始';
  //     setInterval(() => {
  //       navigator.geolocation.getCurrentPosition((resp) => {
  //         // tslint:disable-next-line: max-line-length
  //         console.log(resp.coords.latitude);
  //         // tslint:disable-next-line: max-line-length
  //         this.http.post<any | any[]>('http://192.168.1.228:8083/logistics/api/logistics/v1/paths/coordinates', {
  //           lat: resp.coords.latitude,
  //           lng: resp.coords.longitude,
  //           wayBillId: 'BB523CE69C1B4DE7B6101276514D4EA1'
  //         }
  //           ).pipe(
  //           retry(3)
  //         ).subscribe(res => {
  //           console.log(res);
  //         });
  //       });
  //     }, 600000);
  // }
  getG() {
    this.http.get<any | any[]>('http://192.168.1.25:8083/linen/api/portal/v1/wxPays/test').subscribe(res => {
      console.log(res);
      const params = {
        partnerid: res.data.partnerid, // merchant id
        prepayid: res.data.prepay_id, // prepay id
        noncestr: res.data.nonceStr, // nonce
        timestamp: res.data.timeStamp, // timestamp
        sign: res.data.paySign, // signed string
        };
        console.log(params)
        Wechat.sendPaymentRequest(params, function () {
          alert('Success');
          }, function (reason: string) {
          alert('Failed: ' + reason);
          }
        );
    });
  }

  // getAuth() {
  //   this.androidPermissions.requestPermissions([
  //     this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
  //     this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
  //     this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS]).then(r => {
  //       this.getG();
  //     }).catch(err => {
  //       this.i = '申请权限失败'
  //       //申请权限失败："
  //     });
  // }
  ngOnInit() {
  }

}
