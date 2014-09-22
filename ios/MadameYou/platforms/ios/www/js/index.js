/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//Function to make fast click active on DOC body
$(function() {
  FastClick.attach(document.body);
});

function none() {}

var slider = new PageSlider($("#container"));
$(window).on('hashchange',route);

function route() {
    ////page selected local var initialize
	var page;
	////href linked selected
	var hash = window.location.hash;
    
    if (hash == "#login2") {
        
        loginPageActions();

    } else if (hash == "#register") {

        registerPageActions();
        
    } else if (hash == "#welcomePage") {
        
        welcomePageActions();
        
    }
}

////Check for device ready activity
document.addEventListener("deviceready", onDeviceReady, false);

var deviceName, devicePhonegap, devicePlatform, deviceUuid, deviceVersion, deviceType;
var deviceIdentifier = '';
var iosDevice = '';
var containerStyleVar = '';

function onDeviceReady() {
    document.addEventListener("offline", deviceOffline, false);
    document.addEventListener("online", deviceOnline, false);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);

//    FB.init({ appId: "224380174329856", nativeInterface: CDV.FB, useCachedDialogs: false });
    
    deviceName = device.name;
    devicePhonegap = device.cordova;
    devicePlatform = device.platform;
    deviceUuid = device.uuid;
    deviceModel = device.model;
    deviceVersion = device.version;
    
    ////Device Type = Device Model Device Version
    deviceType = deviceModel+' '+deviceVersion;
    console.log('Device Type: '  + deviceType);
    
    
    console.log('Device Name: '     + device.name);
    console.log('Device PhoneGap: ' + device.cordova );
    console.log('Device Platform: ' + device.platform);
    console.log('Device UUID: '     + deviceUuid);
    console.log('Device Model: '     + device.model);
    console.log('Device Version: '  + device.version );
    
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
    console.log('Screen Width '+screenWidth+' Screen Height '+screenHeight);
    headerHeight = screenHeight * .09;
    scrollHeight = screenHeight - headerHeight;
    
    if (deviceModel.toLowerCase().indexOf("ipad") >= 0) {
        console.log('device is an ipad');
            iosDevice = 'ipad';
        if (deviceModel.toLowerCase().indexOf("ipad2") >= 0) {
            console.log('device is an ipad2');
            iosDevice = 'ipad2';
        }
        
    }
    
    if (deviceModel.toLowerCase().indexOf("iphone") >= 0) {
        console.log('device is an iphone');
        iosDevice = 'iphone';
        
    }
    
    if (deviceModel.toLowerCase().indexOf("ipod touch") >= 0) {
        console.log('device is an ipod touch');
        iosDevice = 'iphone';
        
    }
    
    if (deviceVersion.toLowerCase().indexOf("7.0") >= 0) {
        console.log('device version is 7.0 or >');
        deviceVersion = '7.0';
        
    }
    
    if (deviceVersion == '5.0' && screenWidth == '320' & screenHeight == '460') {
        
        console.log('iphone: iOS 5.0');
        deviceIdentifier = 'iphone5point0';
        deviceSizeFolder = '320by480img/';
//        $('#container').height(screenHeight);
        
    } else if (deviceVersion == '5.1' && screenWidth == '320' & screenHeight == '460') {
        
        console.log('iphone: iOS 5.1');
        deviceIdentifier = 'iphone5point1';
        deviceSizeFolder = '320by480img/';
//        $('#container').height(screenHeight);
        
    }  else if (deviceVersion == '6.0' && screenWidth == '320' & screenHeight == '460') {
        
        console.log('iphone: iOS 6.0');
        deviceIdentifier = 'iphone6point0';
        deviceSizeFolder = '320by480img/';
        $('#container').height(screenHeight);
        
    }  else if (deviceVersion == '6.1' && screenWidth == '320' & screenHeight == '460') {
        
        console.log('iphone: iOS 6.1');
        deviceIdentifier = 'iphone6point1';
        deviceSizeFolder = '320by480img/';
//        $('#container').height(screenHeight);
        
    } else if ((screenWidth == '320' && screenHeight == '460' && deviceVersion != '7.0') && (iosDevice == 'iphone')) {
//        alert(iosDevice);
        console.log('iphone 3.5 retina: ver < 7.0');
        
            $('head').append('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
        
        
        
        deviceSizeFolder = '320by480img/';
        $('#container').height(screenHeight);
//        $('#container').height(screenHeight);
        
        
    } else if ((screenWidth == '320' && screenHeight == '480' && deviceVersion == '7.0') && iosDevice != 'ipad' && iosDevice != 'ipad2') {
//        alert(iosDevice);
        console.log('iphone 3.5 retina: ver 7.0');
        
        $('head').append('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
       
        deviceSizeFolder = '640by960img/';
//        $('#container').height(screenHeight);
        
        
    }
    else if (((screenWidth == '320' || screenWidth == 320) && (screenHeight == '568' || screenHeight == 568) && (deviceVersion == '7.0' || deviceVersion == 7.0))  && (iosDevice == 'iphone')) {
        
        console.log('iphone 5-5s-5c (4in) : ver = 7.0');
        
        $('head').append('<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
        
        deviceSizeFolder = 'Iphone5_ios7/';
        
        $('#container').height(screenHeight);
        
    }
    else if ((iosDevice == 'ipad' || iosDevice == 'ipad2') && (deviceVersion == 7.0 || deviceVersion == '7.0') ) {
        
        console.log('ipad ios 7.0');
        $('head').append('<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
        
        containerStyleVar = 'style="height:'+screenHeight+'px;width:'+screenWidth+'px;"';
        
        deviceSizeFolder = '640by960img/';
        
    }
    else if ((iosDevice == 'ipad' || iosDevice == 'ipad2') && (deviceVersion != 7.0 || deviceVersion != '7.0') ) {
        
        console.log('ipad < ios 7');
        $('head').append('<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');

        containerStyleVar = 'style="height:'+screenHeight+'px;width:'+screenWidth+'px;"';
        
        deviceSizeFolder = '640by960img/';
        
    }
    
    else {
        
        console.log('DIDNT FIND THE DEVICE');
        deviceSizeFolder = '';
//        $('#container').height(screenHeight);
        
    }
    
//    deviceSizeFolder = 'Iphone5_ios7/';
    
//    alert('container height and width '+$('#container').height()+' '+$('#container').width());
    
//    landingPageActions();
    login.checkPreAuth();
//    signupPage2Actions();
    
//    if (parseFloat(window.device.version) === 7.0) {
//        document.body.style.marginTop = "20px";
//    }
    
//    TwitterDemo.setup();
    
    ////CHANGE
    ///goToBeforeAction();
    
}