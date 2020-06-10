import wx from 'weixin-js-sdk';
import {getSignature ,getAppId} from "../api/user";
import {getRandomString} from "./auth";

export function getJSSDK(callback) {
    getSignature({noncestr:getRandomString(),timestamp:Math.round(new Date() / 1000),url:location.href.split('#')[0]}).then(res =>{
        getAppId().then(result => {
            if(result.data.flag == 1){
                wx.config({
                    debug: false,
                    appId:result.data.appid,
                    timestamp:res.data.timestamp,
                    nonceStr:res.data.nonceStr,
                    signature:res.data.signature,
                    jsApiList : [ 'checkJsApi', 'scanQRCode','translateVoice']
                });
                wx.error(function(res) {
                    alert("出错了：" + res.errMsg);
                });
                wx.ready(function() {
                    wx.checkJsApi({
                        jsApiList : ['scanQRCode'],
                        success : function(res1) {
                            //点击按钮扫描二维码
                            wx.scanQRCode({
                                needResult : 1,
                                scanType : ["qrCode","barCode"],
                                success : function(res) {
                                    callback(res)
                                }
                            });
                        }
                    });
                });
            }
        });
    })
}

