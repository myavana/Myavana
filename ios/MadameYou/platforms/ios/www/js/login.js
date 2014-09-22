$(function() {
  FastClick.attach(document.body);
  });

var myMobileGlobalURL = 'http://54.214.19.19/include/mobile/';

///PUSH NOTIFICATION SET UP
var pushNotification;

var push = {
successHandler: function(result) {
    console.log('Received result ' + result+' Push Notification Status '+userArray.pushNotificationStatus+' Push Device Token: '+userArray.deviceToken);
    ////Post DeviceToken = result
    
//    if ((userArray.pushNotificationStatus == 0 || userArray.pushNotificationStatus == 'undefined') && (userArray.deviceToken != null || userArray.deviceToken != '' || userArray.deviceToken != 'undefined')) {
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"postPushNotificationOnStatus.php",
               data: {UID:userArray.uid,deviceToken:result,deviceID:deviceUuid,deviceType:deviceType},
               timeout: 5000,
               success: function(data) {
               
               console.log('device push notification post: '+data);
               
               if(data) {
               
               console.log('post device token success');
               
               } else if (!data) {
               
               console.log('post device token failures');
               
               }
               
               },
               
               error: function(xhr, type, m) {
               
               console.log('post device token post error: '+xhr+' '+type+' '+m);
               
               }
               });
//    } else {
//        console.log('DIDNT GO INTO CHANGE LOOP ');
//    }
    
},
signupPushHandler: function(result) {
    console.log("Received result SIGNUP " + result + "Device ID "+ deviceUuid +" Device Type "+deviceType);
    
    $.ajax({
           type: 'POST',
           url: myMobileGlobalURL+"postPushNotificationOnStatus.php",
           data: {UID:userArray.uid,deviceToken:result,deviceID:deviceUuid,deviceType:deviceType},
           timeout: 5000,
           success: function(data) {
           
           console.log('device push notification post on SIGNUP: '+data);
           
           if(data) {
           
           console.log('post device token success');
           
           userArray.pushNotificationStatus = 1;
           userArray.deviceToken = result;
           
           } else if (!data) {
           
           console.log('post device token failures');
           
           }
           
           homePageActions();
           
           },
           
           error: function(xhr, type, m) {
           homePageActions();
           console.log('post device token post error: '+xhr+' '+type+' '+m);
           
           }
           });
    
},
signupErrorHandler:function(error) {
    console.log(error);

    homePageActions();
    
},
errorHandler:function(error) {
    console.log(error);
    
    //        $.ajax({
    //               type: 'POST',
    //               url: prophytesGlobalURL+"postPushNotificationFStatus.php",
    //               data: {UID:userArray.UID,deviceToken:result},
    //               timeout: 5000,
    //               success: function(data) {
    //
    //               console.log('device push notification post: '+data);
    //
    //               if(data) {
    //
    //               console.log('post device token success');
    //
    //               } else if (!data) {
    //
    //               console.log('post device token failures');
    //
    //               }
    //
    //               },
    //
    //               error: function(xhr, type, m) {
    //
    //               console.log('post device token post error: '+xhr+' '+type+' '+m);
    //
    //               }
    //               });
    
},
onNotificationAPN: function(e) {
    console.log("On Notification");
            teaPageActions();
    //    alert('****NOTIFICATION****');
    
    
    if (e.alert) {
        console.log("Alert " + e.alert);
        //            navigator.notification.alert(e.alert);
    }
    if (e.badge) {
        console.log("Badge number " + e.badge);
        
        var bagdeString = e.badge;
        var array = bagdeString.split(',');
        console.log(array[0]+' '+array[1]);
        
        if (array[0] == 'comment') {
            console.log('a user commented on your photo: media_id - '+array[1]);
            
        } else if (array[0] == 'like') {
            console.log('a user liked on your photo: media_id - '+array[1]);
            
        } else if (array[0] == 'follow') {
            console.log('a user has followed you on your photo: UID - '+array[1]);
            
        }
                    
//        pushNotification = window.plugins.pushNotification;
//        pushNotification.setApplicationIconBadgeNumber(push.successHandler, push.errorHandler, e.badge);
    }
    if (e.sound) {
        console.log("Sound passed in " + e.sound);
        var snd = new Media(e.sound);
        snd.play();
    }
}
};

//function htmlEncode(str) {
//    ///console.log('htmlEncode callled on: '+str);
//    return String(str)
//    .replace(/&/g, '&amp;')
//    .replace(/"/g, '&quot;')
//    .replace(/'/g, '&#39;')
//    .replace(/</g, '&lt;')
//    .replace(/>/g, '&gt;');
//    }

function myLoading() {
    $.blockUI({
              message: '<img src="img/new-ajax-loader-my.gif"/>',
              css: {
              top:  ($(window).height() - 24) /2 + 'px',
              left: ($(window).width() - 24) /2 + 'px',
              width: '24px',
              border: 'none',
              background: 'transparent'
              }
              });
    
}

function myLoadingOffline() {
    $.blockUI({
              message: '<img src="img/new-ajax-loader-my.gif"/><h1 style="font-size:95%;">Device is Offline.</h1>',
              css: {
              //                                top:  ($(window).height() - 24) /2 + 'px',
              //                                left: ($(window).width() - 24) /2 + 'px',
              //                                width: '24px',
              border: '1px solid black',
              background: 'white'
              }
              });
    
}

function deleteUnusedIscroll() {
//    console.log('delete iscroll function called');
    
    //console.log('delete all iScroll');
    
    if (myWrapperScroller == null || myWrapperScroller == 'null' || myWrapperScroller === 'null' || myWrapperScroller === null || myWrapperScroller == 'undefined' || myWrapperScroller == undefined) {
        //            console.log('profile scroller not set');
    } else {
        myWrapperScroller.destroy();
        myWrapperScroller = null;
        console.log('myWrapperScroller destroyed');
    }
}

////Array with all User Information
var userArray = new Object();
var otherUserArray = new Object();

var pageChain = "";
var pageArray;
////Seperate String pageChain.val().split(",");

function none() {}

var userLatLon = new Object();

function callGetGeocode(zipcode) {
    myLoading();
    //    alert('call prof geocode');
    console.log("callGeocode from zipcode started");
    
    $.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?address='+zipcode+'&sensor=true',
           timeout:30000,
           success: function(data){
           
           userLatLon.userLatitude = data.results[0].geometry.location.lat;
           userLatLon.userLongitude = data.results[0].geometry.location.lng;
           
           for (i = 0 ; i < 1 ; ++i)
           {
               //alert('step into the first loop'+i);
               var super_var1 = data.results[i].address_components;
               
               for (j = 0 ; j < super_var1.length ; ++j)
               {
                   //alert('step into the 2nd loop'+j);
                   var super_var2 = super_var1[j].types;
                   for (k = 0 ; k < super_var2.length ; ++k)
                   {
                       //find city
                       if (super_var2[k] == "locality")
                       {
                           //put the city name in the form
                           var city = super_var1[j].long_name;
                            userLatLon.userCity = city;
                       }
                       //find State
                       if (super_var2[k] == "administrative_area_level_1")
                       {
                           //put the state abbreviation in the form
                           var state = super_var1[j].short_name;
                            userLatLon.userState = state;
                       }
                   }
               }
           }
           
//           alert('User Lat long from Google: '+userLatLon.userLatitude+' '+userLatLon.userLongitude);
           
           submitSignupActionWZip(userLatLon.userLatitude,userLatLon.userLongitude,userLatLon.userCity,userLatLon.userState);
           
            $.unblockUI();
           
           }, error: function(xhr, type, error) {
           
                   navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
           
           }
       });
    
}

var userNewLatLon = new Object();

function callGetGeocode2(zipcode) {
    myLoading();
    //    alert('call prof geocode');
    console.log("callGeocode from zipcode started");
    
    $.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?address='+zipcode+'&sensor=true',
           timeout:30000,
           success: function(data){
           
           userNewLatLon.userLatitude = data.results[0].geometry.location.lat;
           userNewLatLon.userLongitude = data.results[0].geometry.location.lng;
           
           for (i = 0 ; i < 1 ; ++i)
           {
           //alert('step into the first loop'+i);
           var super_var1 = data.results[i].address_components;
           
           for (j = 0 ; j < super_var1.length ; ++j)
           {
           //alert('step into the 2nd loop'+j);
           var super_var2 = super_var1[j].types;
           for (k = 0 ; k < super_var2.length ; ++k)
           {
           //find city
           if (super_var2[k] == "locality")
           {
           //put the city name in the form
           var city = super_var1[j].long_name;
           userNewLatLon.userCity = city;
           }
           //find State
           if (super_var2[k] == "administrative_area_level_1")
           {
           //put the state abbreviation in the form
           var state = super_var1[j].short_name;
           userNewLatLon.userState = state;
           }
           }
           }
           }
           
           //           alert('User Lat long from Google: '+userLatLon.userLatitude+' '+userLatLon.userLongitude);
           $.unblockUI();
           console.log('success changing zipcode');
           submitZipcodeChange(userNewLatLon.userLatitude,userNewLatLon.userLongitude,userNewLatLon.userCity,userNewLatLon.userState,zipcode);
        
           
           }, error: function(xhr, type, error) {
                      $.unblockUI();
                    console.log('error changing zipcodee');
           
                    navigator.notification.alert('Your zipcode was not valid try again.',optionsPageActions(), 'Myavana', 'OK');
//                    submitZipcodeChange(userArray.latitude,userArray.longitude,userArray.city,userArray.state,zipcode);
           }
           });
    
}

function locationSuccess(position) {
    
    console.log('device geolocation success');
    
    userLatLon.userLatitude = position.coords.latitude;
    userLatLon.userLongitude = position.coords.longitude;
    
//    alert('User Lat long from Device: '+userLatLon.userLatitude+' '+userLatLon.userLongitude);
    submitSignupActionWZip(userLatLon.userLatitude,userLatLon.userLongitude,'','');
    
}

function locationError(error) {
    console.log('geolocation error');
    
    userLatLon.userLatitude = '';
    userLatLon.userLongitude = '';
    
//    alert('User Lat long Not Recieved: '+userLatLon.userLatitude+' '+userLatLon.userLongitude);
    submitSignupActionWZip(userLatLon.userLatitude,userLatLon.userLongitude,city,state);
    
    switch(error.code)
    {
        case 1:
            console.log("Either the app was denied permission or the location service is currently turned off.");
            break;
        case 2:
            console.log("Geolocation information was unavailable. Would you like to try out a manual search instead?");
            break;
        case 3:
            console.log("Service was timed out since it took too long to retrieve the gelolcations. Would you like to try out a manual serach instead?");
            break;
        default:
            console.log("Sorry an unknown error occurred. Would you like to try out a manual search instead?");
            break;
    }
    
}

var deviceSizeFolder = '';
////Login Page String ////




var profilePage =
'<div data-role="page"  id="profilePage">'+
'<div class="bigPhotoOverlay" id="bigPhotoOverlay"></div>'+
'<div class="fadeMe" id="fadeMe"></div>'+
'<div class="container">'+
'<img src="img/Profile.png" class="loginBack"/>'+
'<div class="profBkBtn" id="profBkBtn"></div>'+
'<div class="addLookBtn" id="profAddLook" onclick="addNewLook(\'profile\')"></div>'+
'<div class="myWrapperStd" id="myWrapperStd">'+
'<div class="myWrapperScroller" id="myWrapperScroller">'+
'<div class="profUserName" id="profUserName"></div>'+
'<div class="profPicDiv" id="profPicDiv"><img src="" class="profilePic" id="profilePic"/></div>'+
'<div class="aboutMeDiv" id="aboutMeDiv">'+
'<div class="profDetRowT">'+
'<div class="myProfLeftTop">'+
'<div class="profLooksVal" id="profLooksVal"></div>'+
'<div class="profLooksLabel" id="profLooksLabel">STYLES</div>'+
'</div>'+
'<div class="myProfRightTop">'+
'<div class="profLooksVal" id="profFriendsVal"></div>'+
'<img src="img/friendsIcon.png" class="myProfFriendsIcon" id="myProfFriendsIcon"/>'+
'</div>'+
'</div>'+
'<div class="profDetRow1">'+
'<div class="profHairCategory" id="profHairCategory">HAIR CATEGORY: Natural</div>'+
'</div>'+
'<div class="profDetRow1">'+
'<div class="profAboutMeTxt" id="profAboutMeTxt"></div>'+
'</div>'+
'<div class="profDetRowB">'+
'<img src="img/updateBtn.png" class="profAboutImg" id="profAboutImg"/>'+
'</div>'+
'</div>'+
'<div class="profilePhotosSection" id="profilePhotosSection">'+
'<div class="profileGroupDiv" id="profileGroupDiv">'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>';

/// function to submit the form
function submitLoginForm(){
    $('#login-form').submit();
}

var signUpBtnSecIndex = 0;
var loginBtnSecIndex = 0;
function landingPageActions() {
    
    var welcomePage =
    '<div data-role="page">'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/my-welcomeScreen.png" class="loginBack"/>'+
    '<div class="loginBtnSec" id="loginBtnSec"></div>'+
    '<div class="signUpBtnSec" id="signUpBtnSec"></div>'+
    '</div>'+
    '</div>';
    
    page = welcomePage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    var signUpBtnSec = document.getElementById('signUpBtnSec');
    FastClick.attach(signUpBtnSec);
    
    signUpBtnSecIndex = 0;
    
    signUpBtnSec.addEventListener('click', function(event) {
                                  if (signUpBtnSecIndex == 0) {
                                  signUpBtnSecIndex = 1;
                                  
                                  signupPageActions();
                                  
                                  }
                                  }, false);
    
    
    var loginBtnSec = document.getElementById('loginBtnSec');
    FastClick.attach(loginBtnSec);
    
    loginBtnSecIndex = 0;
    
    loginBtnSec.addEventListener('click', function(event) {
                                 if (loginBtnSecIndex == 0) {
                                 loginBtnSecIndex = 1;
                                 
                                 welcomePageActions();
                                 }
                                 }, false);
    
    
}


////Login Objects////
//login handles everything for logging into Myavana Mobile
//-------------------------------------------------------
var login = {
initialize: function() {
    console.log('Initializing Login...');
    //alert("login initialized");
    login.addSubmitHandler();	//Sets up submit button listener for login submit
    login.checkPreAuth();		//Check to see if username and password is locally stored
},
    
    ////Initialize Login the login Submit Button Handler
addSubmitHandler: function() {
    console.log('Add form submit handler...');
    $('#login-form').on("submit",function(e) {
                        console.log("Submitting ...");
                        //disable the login submit button while waiting
                        $("#login-submit",this).attr("disabled","disabled");
                        
                        //get username and password
                        username = $("#username").val();
                        password = $("#password").val();
                        //                        alert('submit handler username '+username);
                        //                        alert('submit handler password '+password);
                        var noerrors = login.checkLoginForErrors();	//Run Erro Validation on the login form data. If no errors return true
                        if(noerrors) {
                        login.handleLogin(username,password);
                        }
                        $("#login-submit").removeAttr("disabled");
                        return false;
                        });
},
    
    ////Run Error Validation on the login for. If there is no errors return true
checkLoginForErrors: function() {
    var CheckUsername = $("#username").val();
    var CheckPassword = $("#password").val();
    
    if(CheckUsername == ''){
        //Show alert if no username enterend
        navigator.notification.vibrate(1000);
        navigator.notification.alert('Please enter a valid username.', none(), 'Myavana', 'OK');
        return false;
    }
    else if(CheckPassword == '') {
        //Show alert if no password entered
        navigator.notification.vibrate(1000);
        navigator.notification.alert('Please enter a valid password.', none(), 'Myavana', 'OK');
        return false;
    }
    
    return true;
},
    
    //Check to see if the username and password is already locally cached
checkPreAuth: function() {
    //    alert('check pre auth called');
    console.log("Checking the Local Device Storage for username and password");
    var localStorageUname = window.localStorage["username"];
    var localStoragePword = window.localStorage["password"];
    
    if(localStorageUname === null || localStorageUname === 'undefined' || localStorageUname === 'null' || localStorageUname === undefined || localStoragePword === 'undefined' || localStoragePword === undefined || localStoragePword === null ||localStoragePword ==='null') {
        console.log("Username and Password do not exist in local storage");
        sessionStorage.setItem('loginStatus',0);
        
        //        welcomePageActions();
        landingPageActions();
        return 1;
        
    } else {
        
        console.log("Username and Password Exists in localstorage");
        username = window.localStorage["username"];
        password = window.localStorage["password"];
        login.handleLogin(username,password);
    }
},
    
    //Submit the login information to server
handleLogin: function(username,password){
    
    
    $.ajax({
           type: 'POST',
           url: myMobileGlobalURL+'login.php',
           data: {username:username,password:password,deviceID:deviceUuid,deviceType:deviceType},
           dataType: 'json',
           timeout: 10000,
           success: function(data) {
           console.log("Successful Access of Database Login - RETURNS: Fullname, Email, Username, UID, Bday, Zip, Stylist, Hair Cat, Photo, About Me: "+data.fullName+', '+data.email+', '+username+', '+data.UID+', '+data.birthday+', '+data.zipcode+', '+data.stylist+', '+data.haircategory+', '+data.photo+', '+data.aboutMe);
           
           userArray.email = data.email;
           userArray.uid = data.UID;
           userArray.password = password;
           userArray.birthday = data.birthday;
           userArray.zipcode = data.zipcode;
           userArray.latitude = data.latitude;
           userArray.longitude = data.longitude;
           userArray.fullname = data.fullName;
           userArray.username = username;
           userArray.stylist = data.stylist;
           
           if (userArray.stylist) {
           console.log("Stylist: Experience, Salon Name, Specialty, Phone, Salon Address, City, State: "+data.experience+' '+data.salon+' '+data.specialty+' '+data.phone+' '+data.address+' '+data.city+' '+data.state+' ');
           }
           
           userArray.stylistExperience = data.experience;
           userArray.stylistSalonName = data.salon;
           userArray.stylistSpecialty = data.specialty;
           userArray.stylistPhone = data.phone;
           userArray.stylistSalonAddress = data.address;
           userArray.city = data.city;
           userArray.state = data.state;
           
           userArray.numberOfLooks = parseInt(data.numOfLooks);
           userArray.numberOfFriends = data.numOfFriends;
           
//           alert(data.numOfLooks);
           
           if (userArray.numberOfLooks == '') {
                userArray.numberOfLooks = 0;
           }
           
           if (userArray.numberOfFriends == '') {
                userArray.numberOfFriends = 0;
           }
           
           if (data.aboutMe == null || data.aboutMe == 'null' || data.aboutMe == '' || data.aboutMe == 'undefined') {
           userArray.aboutMe = "";
           } else {
           
           userArray.aboutMe = data.aboutMe;
           }
           
           if (data.haircategory == null || data.haircategory == 'null' || data.haircategory == '') {
           userArray.haircategory = 'Natural';
           } else {
           userArray.haircategory = data.haircategory;
           }
           
           console.log('user photo url: '+data.photo);
           
           if (data.photo == null || data.photo == 'null' || data.photo == '') {
           userArray.photo = 'img/no-photo.png';
           } else {
           userArray.photo = 'http://54.214.19.19/pictures/profilePics/'+data.photo;
           }
           
           if (data.myLoginAlert == 1) {
           
           navigator.notification.vibrate(1000);
           navigator.notification.alert(data.myLoginAlertMsg, none(), 'Myavana', 'OK');
           
           }
           
           if(typeof(Storage) !== "undefined") {
           console.log("localStorage and sessionStorage are supported!");
           
           //               window.localStorage["fullname"] = suFullname;
           //               window.localStorage["email"] = suEmail;
           window.localStorage["username"] = username;
           window.localStorage["password"] = password;
           window.localStorage["email"] = data.UID;
           
           } else {
           console.log("No web storage support...");
           }
           
           userArray.pushNotificationStatus = data.pushNotificationStatus;
           userArray.deviceToken = data.deviceToken;
           
           console.log('PUSH NOTIFICATION STATUS & DEVICE TOKEN: '+userArray.pushNotificationStatus+' '+userArray.deviceToken);
           console.log('Current Device UUID - STORED DEVICE UUID: '+device.uuid+' '+data.previousDeviceId)
           
           if (device.uuid != data.previousDeviceId) {
           ////UPDATE DEVICE CHANGE
           
           console.log('~~~|||~~~ USER CHANGED DEVICES LOGIN ~~~|||~~~');
           console.log('ask to turn push notifcations on');
           pushNotification = window.plugins.pushNotification;
           pushNotification.register(push.successHandler, push.errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"push.onNotificationAPN"});
           
           } else if (userArray.pushNotificationStatus == 1 && (userArray.deviceToken != null || userArray.deviceToken != 'null' || userArray.deviceToken != '' || userArray.deviceToken != 'undefined')) {
           
           console.log('push notifcations on');
           
           }  else {
           console.log('ask to turn push notifcations on');
           pushNotification = window.plugins.pushNotification;
           pushNotification.register(push.successHandler, push.errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"push.onNotificationAPN"});
           }
           
           
           ////CHANGE TO GO TO FEED
           
           $.unblockUI();
           homePageActions();
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           $.unblockUI();
           navigator.notification.alert('Your log in timed out. You may want to check your internet connection and try again later.',loginTextBtnIndex = 0, 'Myavana', 'OK');
           landingPageActions();
           } else {
           //           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           //           welcomePageActions();
           navigator.notification.alert('Your login was unsuccessful. Try Again Later.',loginTextBtnIndex = 0, 'Myavana', 'OK');
           
           
           $.unblockUI();
           landingPageActions();
           }
           
           return false;
           }
           
           });
    
    
    
    //Stop loading after post completed
    //try{navigator.notificationEx.loadingStop();}
    //catch(err){console.log('Error:'+err);}
    
}
};


// Validation object
//------------------------------------------------
//

//isValidEmail(Email)
//isValidPassword(Password)
//isSelected

var validation = {
    //Check if emailAddress is a vaild email address
isValidEmail:function(emailAddress){
    //Pattern from http://goo.gl/BPZXE
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    
    return pattern.test(emailAddress);
    
},
    //Check if parameter is a valid US Zip code using Reg Ex
isSelected:function(selectVal) {
    
    //Check to see if select value is blank
    if (selectVal=="") {
        // value is set to a valid option, so submit form
        return false;
    }
    else{
        
        return true;
    }
    
},
isChecked:function(element){
    if(element.attr('checked')) {
        return true;;
    } else {
        return false;
    }
},
    //Check if parameter is a valid US Zip code using Reg Ex
isValidUSZip:function(sZip) {
    return /^\d{5}(-\d{4})?$/.test(sZip);
},
    //Check if parameter is alphanumeric and t least 8 characters
isValidPassword:function(password) {
    //Check the length
    if(password.length<6){
        return false;
    }
    //Check Alphanumeric
    return /^[a-z0-9]+$/i.test(password);
},
showAlert:function(){
    
}
    
};
////End of Login Functions ////

function loginPageActions() {
    
    
    
    var loginPage2 =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<form id="login-form">'+
    '<img src="img/madameyouBackground.png" class="loginBack"/>'+
    '<div class="usernameLoginSection">'+
    '<div class="loginText" id="loginText">username</div>'+
    '<input type="text" name="username" id="username" class="fullNameInput" maxlength="120" placeholder="Username"/>'+
    '</div>'+
    '<div class="passwordLoginSection">'+
    '<div class="loginText" id="loginText">password</div>'+
    '<input type="password" name="password" id="password" class="fullNameInput" maxlength="120" placeholder="Password"/>'+
    '</div>'+
    '<div class="loginButtonSection">'+
    '<img src="img/LoginButton.png" id="submitLogin" onclick="submitLoginForm();" class="loginButton2"/>'+
    '</div>'+
    '</form>'+
    '<a href="#register"><div class="backToRegister" id="backToLogin">Register</div>'+
    '</div>'+
    '</div>';
    
    page = loginPage2;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    login.addSubmitHandler();
}

var loginTextBtnIndex = 0;
var forgotPasswordIndex = 0;
var forgotPasswordBkBtnIndex = 0;
var sendEmailForgotPWIndex = 0;

function welcomePageActions() {
    
    //    alert('welcome page actions called');
    var loginPage =
    '<div data-role="page">'+
        '<div class="container" '+containerStyleVar+'>'+
            '<img src="img/'+deviceSizeFolder+'my-login-bg.png" class="loginBack"/>'+
            '<div class="profBkBtn" id="loginBkBtn"></div>'+
            '<div class="loginSection">'+
            '<input type="text" name="username" id="username" class="loginfield" maxlength="120" placeholder="Username"/>'+
            '<input type="password" name="password" id="password" class="loginfield" maxlength="120" placeholder="Password"/>'+
            '</div>'+
            '<img src="img/myNewLoginBtn.png" id="loginTextBtn" class="loginBtnSec3"/>'+
    //        '<img src="img/myNewSignupBtn.png" id="signupTextBtn" class="signUpBtnSec3"/>'+
            '<div class="forgotPasswordBtnSec" id="forgotPassword">Forgot Password</div>'+
            //'<div class="signUpBtnSec2" id="signupTextBtn"></div>'+
        '</div>'+
    '</div>';
    
//    console.log(loginPage);
    
//    alert('Window Width: '+window.outerWidth+'Window Height: '+window.outerHeight);
//    alert('Page Offest Y: '+window.pageYOffset);

    page = loginPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    $('#username').blur(function() {
                        
            if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
            
                    window.scroll(0,0);
            
            }
                        
    });
    
    $('#password').blur(function() {
                        
                        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                        
                        window.scroll(0,0);
                        
                        }
                        
                        });
    
    var loginBkBtn = document.getElementById('loginBkBtn');
    FastClick.attach(loginBkBtn);
    
    loginBkBtnIndex = 0;
    
    loginBkBtn.addEventListener('click', function(event) {
                                if (loginBkBtnIndex == 0) {
                                
                                loginBkBtnIndex = 1;
                                
                                landingPageActions();
                                
                                }
                                }, false);
    
    var forgotPassword = document.getElementById('forgotPassword');
    FastClick.attach(forgotPassword);
    
    forgotPasswordIndex = 0;
    
    forgotPassword.addEventListener('click', function(event) {
                                   if (forgotPasswordIndex == 0) {
                                   
                                   forgotPasswordIndex = 1;
                                   
                                   forgotPasswordActions();
                                    
                                    
                                   }
    }, false);
    
//    var signupTextBtn = document.getElementById('signupTextBtn');
//    FastClick.attach(signupTextBtn);
//    
//    signupTextBtnIndex = 0;
//    
//    signupTextBtn.addEventListener('click', function(event) {
//                                   if (signupTextBtnIndex == 0) {
//                                   
//                                   signupTextBtnIndex = 1;
//                                   
//                                   signupPageActions();
//                                   
//                                   }
//                                   }, false);
    
    
    var loginTextBtn = document.getElementById('loginTextBtn');
    FastClick.attach(loginTextBtn);
    
    loginTextBtnIndex = 0;
    
    loginTextBtn.addEventListener('click', function(event) {
                                  if (loginTextBtnIndex == 0) {
                                  loginTextBtnIndex = 1;
                                  myLoading();
                                  
                                  if(checkLoginInputFields()) {
                                  $.unblockUI();
                                  
                                  } else {
                                  $.unblockUI();
                                  loginTextBtnIndex = 0;
                                  console.log('falied login');
                                  }
                                  }
                                  }, false);
    
    $('#password').keyup(function(e) {
                         if(e.keyCode == 13) {
                         var passwordField = $("#password").val();
                         var usernameField = $("#username").val();
                         
                         if (passwordField != '' && usernameField != '') {
                         myLoading();
                         
                         if(checkLoginInputFields()) {
                         $.unblockUI();
                         
                         } else {
                         $.unblockUI();
                         console.log('falied login');
                         }
                         } else {
                         navigator.notification.alert('You have to type in a password and username to login.',none(), 'Myavana', 'OK');
                         }
                         }
                         });
    
    function checkLoginInputFields(){
        
        var username = $("#username").val();
        var password = $("#password").val();
        
        if(login.checkLoginForErrors()) {
            login.handleLogin(username,password);
            return true;
        } else {
            loginTextBtnIndex = 0;
            $.unblockUI();
            return false;
            
        }
        
    }
    
}

var myForgotPWEmail = "";
function forgotPasswordActions() {
    
    
    var forgotPasswordPage =
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/forgotPasswordBg.png" class="loginBack"/>'+
    '<div class="profBkBtn" id="forgotPasswordBkBtn"></div>'+
    '<div class="myOptionsSocialH" id="myPreferencesHead">Enter Your Account Email</div>'+
    '<input type="text" id="myEmail" class="forgotPasswordEmail" maxlength="60" placeholder="Account Email"/>'+
    '<div class="changePasswordUpdate" id="sendEmailForgotPW"><img src="img/submitEmailBtn.png" class="editProfilePicBtn"/></div>'+
    '</div>'+
    '</div>';
    
    page = forgotPasswordPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    $('#myEmail').blur(function() {
                        
                        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                        
                        window.scroll(0,0);
                        
                        }
                        
                        });
    
    var forgotPasswordBkBtn = document.getElementById('forgotPasswordBkBtn');
    FastClick.attach(forgotPasswordBkBtn);
    
    forgotPasswordBkBtnIndex = 0;
    
    forgotPasswordBkBtn.addEventListener('click', function(event) {
                                         if (forgotPasswordBkBtnIndex == 0) {
                                         
                                         forgotPasswordBkBtnIndex = 1;
                                         
                                         welcomePageActions();
                                         
                                         }
                                         }, false);
    
    var sendEmailForgotPW = document.getElementById('sendEmailForgotPW');
    FastClick.attach(sendEmailForgotPW);
    
    sendEmailForgotPWIndex = 0;
    
    sendEmailForgotPW.addEventListener('click', function(event) {
                                       if (sendEmailForgotPWIndex == 0) {
                                       
                                           sendEmailForgotPWIndex = 1;
                                           
                                           myForgotPWEmail = $("#myEmail").val();
                                           
                                       if (myForgotPWEmail == "" || !validation.isValidEmail(myForgotPWEmail)) {
                                                navigator.notification.alert('You must submit a valid email to get a new password', sendEmailForgotPWIndex = 0, 'Myavana', 'OK');
                                           } else {
                                                sendEmailForgotPWIndex = 0;
                                                myLoading();
                                                
                                                submitForgotEmail();
                                           }
                                       
                                       function submitForgotEmail() {
                                       
                                       
                                       $.ajax({
                                              type: 'POST',
                                              url: myMobileGlobalURL+"mobile-reset-pwd-req.php",
                                              data: {useremail:myForgotPWEmail},
                                              dataType: 'json',
                                              timeout: 15000,
                                              success: function(data) {
                                              
                                              console.log('Edit Password Success');
                                              
                                              $.unblockUI();
                                              
                                              if (data.success) {
                                              
                                                  sendEmailForgotPWIndex = 0;
                                                  navigator.notification.alert(data.message,welcomePageActions(), 'Myavana', 'OK');
                                              
                                              } else {
                                                  sendEmailForgotPWIndex = 0;
                                              
                                                  navigator.notification.alert(data.message,welcomePageActions(),'Myavana','OK');
                                              }
                                                    
                                              },
                                              error: function(xhr, type, error) {
                                              if (type === "timeout") {
                                                    $.unblockUI();
                                                  sendEmailForgotPWIndex = 0;
                                                  navigator.notification.alert('Your forgot password request timed out try again with a better connection.',welcomePageActions(), 'Myavana', 'OK');
                                                  
                                              } else {
                                                    $.unblockUI();
                                                  changePrefUpdateBtnDivIndex = 0;
                                                  console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
                                                  navigator.notification.alert('Your forgot password request failed try again.',welcomePageActions(), 'Myavana', 'OK');
                                                  
                                              }
                                              
                                              }
                                              });
                                       
                                       
                                       }
                                       
                                       }
                                       }, false);
    
    
    
}



var suFullname, suEmail, suUsername, suPassword, suAcceptTrms,suBday, suZipcode;
var suStylist = 0;
var signupTypeString = 'Natural';

var signUpTypeVar = 0;
var signUpBkBtnIndex = 0;
var nextBtnIndex = 0;

var suSalon = "";
var suSpecialty = "";
var suExperience = "";
var agreeToTermslabelIndex = 0;

function signupPageActions() {
    
    var signupPage =
    '<div data-role="page" >'+
        '<div class="container" '+containerStyleVar+'>'+
        '<img src="img/'+deviceSizeFolder+'my-signupBg1.png" class="loginBack"/>'+
        '<div class="profBkBtn" id="signUpBkBtn"></div>'+
        
        '<div class="signupSection1">'+
        '<input type="text" name="signupFullname" id="signupFullname" class="loginfield" maxlength="60" placeholder="Full Name"/>'+
        '<input type="text" name="signupEmail" id="signupEmail" class="loginfield" placeholder="Email"/>'+
        '<input type="text" name="signupUsername" id="signupUsername" class="loginfield" maxlength="40" placeholder="Username"/>'+
        '<input type="password" name="signupPassword" id="signupPassword" class="loginfield" maxlength="35" placeholder="Password"/>'+
        '<input type="password" name="signupPasswordConfirm" id="signupPasswordConfirm" class="loginfield" maxlength="35" placeholder="Re-type Password"/>'+
        '</div>'+
        //'<div class="signupBtn1" id="nextBtn"></div>'+
        '<img src="img/myNewBigSignupBtn.png" id="nextBtn" class="signupBtnSec4"/>'+
        
        '<div class="acceptTermsDiv">'+
        '<input type="checkbox" id="agreeToTerms" name="agreeToTerms" style="float:left;">'+
        '<div class="agreeToTerms-label" id="agreeToTerms-label">I accept the Myavana <span id="myOptionsTerms">Terms of Service</span></div>'+
        '</div>'+
        '</div>'+
    '</div>';
    
//    console.log(signupPage);
    
    page = signupPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
    
    
    $('input').blur(function() {
                    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
                    });
    
    $('input').focusout(function() {
                        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
                        });
    
    var signUpBkBtn = document.getElementById('signUpBkBtn');
    FastClick.attach(signUpBkBtn);
    
    signUpBkBtnIndex = 0;
    
    signUpBkBtn.addEventListener('click', function(event) {
                                 if (signUpBkBtnIndex == 0) {
                                 signUpBkBtnIndex = 1;
                                 
                                 landingPageActions();
                                 }
                                 }, false);
    
    var signupPg1F1 = $('#signupFullname');
    var signupPg1F2 = $('#signupEmail');
    var signupPg1F3 = $('#signupUsername');
    var signupPg1F4 = $('#signupPassword');
    var signupPg1F6 = $('#signupPasswordConfirm');
    var signupPg1F5 = $('#agreeToTerms');
    
    var nextBtn = document.getElementById('nextBtn');
    FastClick.attach(nextBtn);
    
    nextBtnIndex = 0;
    
    nextBtn.addEventListener('click', function(event) {
                             if (nextBtnIndex == 0) {
                             nextBtnIndex = 1;
                             
                             if (checkInputFields()) {
                             signupPage2Actions();
                             } else {
                             nextBtnIndex = 0;
                             }
                             
                             //
                             }
                             }, false);
    
    var agreeToTermslabel = document.getElementById('agreeToTerms-label');
    FastClick.attach(agreeToTermslabel);
    
    agreeToTermslabelIndex = 0;
    
    agreeToTermslabel.addEventListener('click', function(event) {
                                   if (agreeToTermslabelIndex == 0) {
                                   agreeToTermslabelIndex = 1;
                                   var agreeToTermsLink = window.open('http://www.madameyou.com/terms', '_blank', 'EnableViewPortScale=yes');
                                   agreeToTermsLink.addEventListener('exit', function(event) { agreeToTermslabelIndex = 0; });
                                   
                                   }
                                   }, false);
    
    
    //    $( "#signupFullname" ).blur(function() {
    //                                signupFieldCheck();
    //                                });
    //
    //
    //    $( "#signupEmail" ).blur(function() {
    //                             signupFieldCheck();
    //                             });
    //
    //
    //    $( "#signupUsername" ).blur(function() {
    //                                signupFieldCheck();
    //                                });
    //
    //
    //    $( "#signupPassword" ).blur(function() {
    //                                signupFieldCheck();
    //                                });
    //
    //    signupPg1F2.change(function() {
    //                       alert(signupPg1F1.val());
    //                       document.getElementById(nextBtn).style.visibility="visible";
    //                       });
    
    
    //    function signupFieldCheck() {
    //        //             alert('signupFieldCheck called');
    //        var f1Value = signupPg1F1.val();
    //        var f2Value = signupPg1F2.val();
    //        var f3Value = signupPg1F3.val();
    //        var f4Value = signupPg1F4.val();
    //        var f5Value = signupPg1F5.val();
    
    //    alert(f1Value+f2Value+f3Value+f4Value+f5Value);
    
    //        if ((f1Value.length > 5) && (f2Value.length > 5) && (f3Value.length > 5) && (f4Value.length > 5)) {
    //            ////alert(f1Value+' '+f2Value+' '+f3Value+' '+f4Value);
    //
    //            $("#nextBtn").css("display", "block");
    
    
    //
    //        }
    //
    function checkInputFields() {
        var f1Value = signupPg1F1.val();
        var f2Value = signupPg1F2.val();
        var f3Value = signupPg1F3.val();
        var f4Value = signupPg1F4.val();
        var f6Value = signupPg1F6.val();
        var f5Value = signupPg1F5.prop('checked');
        
        var hasSpace = f3Value.indexOf(' ')>=0;
        
        if(f1Value.length < 7) {
            
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid 7 character Full Name.', none(), 'Myavana', 'OK');
            
            return false;
            
        }
        else if (!validation.isValidEmail(f2Value)) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid email.',none(), 'Myavana', 'OK');
            
            return false;
            
            
        }
        else if (f3Value.length < 3 || hasSpace) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid 3 character alphanumeric Username with no spaces.', none(), 'Myavana', 'OK');
            
            return false;
            
        } else if (!validation.isValidPassword(f4Value)) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid 6 character Password.', none(), 'Myavana', 'OK');
            
            return false;
            
        }  else if (f4Value != f6Value) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Your password and confirm password must match.', nextBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
        }
        else if (!f5Value) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('You must accept our Terms & Conditions to continue.', none(), 'Myavana', 'OK');
            
            return false;
            
        }
        else {
            suFullname = f1Value;
            suEmail = f2Value;
            suUsername = f3Value;
            suPassword = f4Value;
            suAcceptTrms = f5Value;
            
            return true;
        }
        
    }
}

var nextBtnIndex = 0;
var signUpBkBtnIndex = 0;

function goBackTosu1() {
    suStylist = 0;
    
    var signupPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-signupBg1.png" class="loginBack"/>'+
    '<div class="profBkBtn" id="signUpBkBtn"></div>'+
    
    '<div class="signupSection1">'+
    '<input type="text" name="signupFullname" id="signupFullname" class="loginfield" maxlength="60" placeholder="Full Name"/>'+
    '<input type="text" name="signupEmail" id="signupEmail" class="loginfield" placeholder="Email"/>'+
    '<input type="text" name="signupUsername" id="signupUsername" class="loginfield" maxlength="40" placeholder="Username"/>'+
    '<input type="password" name="signupPassword" id="signupPassword" class="loginfield" maxlength="35" placeholder="Password"/>'+
    '<input type="password" name="signupPasswordConfirm" id="signupPasswordConfirm" class="loginfield" maxlength="35" placeholder="Re-type Password"/>'+
    '</div>'+
    //'<div class="signupBtn1" id="nextBtn"></div>'+
    '<img src="img/myNewBigSignupBtn.png" id="nextBtn" class="signupBtnSec4"/>'+
    
    '<div class="acceptTermsDiv">'+
    '<input type="checkbox" id="agreeToTerms" name="agreeToTerms" style="float:left;">'+
    '<div class="agreeToTerms-label" id="agreeToTerms-label">I accept the Myavana Terms of Service</div>'+
    '</div>'+
    
    '</div>'+
    '</div>';
    
    page = signupPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
    
    
    $('input').blur(function() {
                    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
                    });
    
    $('input').focusout(function() {
                        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
                        });
    
    
    var signUpBkBtn = document.getElementById('signUpBkBtn');
    FastClick.attach(signUpBkBtn);
    
    signUpBkBtnIndex = 0;
    
    signUpBkBtn.addEventListener('click', function(event) {
                                 if (signUpBkBtnIndex == 0) {
                                 signUpBkBtnIndex = 1;
                                 
                                 welcomePageActions();
                                 }
                                 }, false);
    
    
    //    $("#nextBtn").css("display", "block");
    
    
    var nextBtnTwo = document.getElementById('nextBtn');
    FastClick.attach(nextBtnTwo);
    
    nextBtnIndex = 0;
    
    nextBtnTwo.addEventListener('click', function(event) {
                                
                                if (nextBtnIndex == 0) {
                                nextBtnIndex = 1;
                                if (checkInputFieldsAgain()) {
                                signupPage2Actions();
                                } else {
                                nextBtnIndex = 0;
                                }
                                
                                //
                                }
                                }, false);
    
    $('#agreeToTerms').attr('checked','checked');
    $("#signupFullname").val(suFullname);
    $("#signupEmail").val(suEmail);
    $("#signupUsername").val(suUsername);
    $("#signupPassword").val(suPassword);
    
    
    function checkInputFieldsAgain() {
        var f1Value = $("#signupFullname").val();
        var f2Value = $("#signupEmail").val();
        var f3Value = $("#signupUsername").val();
        var f4Value = $("#signupPassword").val();
        var f6Value = $("#signupPasswordConfirm").val();
        
        var f5Value = $("#agreeToTerms").prop('checked');
        
        if(f1Value < 7) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid 6 or more character Full Name with only letters and numbers.', nextBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
            
        }
        else if (!validation.isValidEmail(f2Value)) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid email.',nextBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
            
            
        }
        else if (!validation.isValidPassword(f3Value)) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid 6 or more character username with only letters and numbers.', nextBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
            
        } else if (!validation.isValidPassword(f4Value)) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid character Password.', nextBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
            
        } else if (f4Value != f6Value) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Your password and confirm password must match.', nextBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
        }
        else if (!f5Value) {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('You must accept our Terms & Conditions to continue.', nextBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
            
        }
        else {
            suFullname = f1Value;
            suEmail = f2Value;
            suUsername = f3Value;
            suPassword = f4Value;
            suAcceptTrms = f5Value;
            
            return true;
        }
        
    }
    
    
}

var signUpBkBtn2Index = 0;
var submitSignupBtnIndex = 0;
var stylistDetailsAddVar = 0;

function signupPage2Actions() {
    
    console.log('signup page 2 - DeviceSizeFolder: '+deviceSizeFolder);
    
//    deviceSizeFolder = 'Iphone5_ios7/';
    
    var signupPage2 =
    '<div data-role="page" >'+
        //    '<div class="bigPhotoOverlay" id="stylistOverlay"></div>'+
        //    '<div class="fadeMe" id="stylistFade"></div>'+
        '<div class="container" '+containerStyleVar+'>'+
            '<img src="img/'+deviceSizeFolder+'signupPg2-BG.png" class="loginBack"/>'+
            '<div class="profBkBtn" id="signUpPgTwoBkBtn"></div>'+
            '<div class="signUpTypeDiv" id="signUpTypeDiv">'+
    
                '<img src="img/my-signupTypeBox.png" class="signUpTypeBox"/>'+
                '<div class="typeRelaxed" id="typeRelaxed">RELAXED</div>'+
                '<div class="typeNatural" id="typeNatural">NATURAL</div>'+
                '<div class="typeTransitioning" id="typeTransitioning">TRANSITIONING</div>'+
                '<div class="birthDayPholder" id="birthDayPholder">Birthday:</div>'+
                '<input type="date" name="signupBirthday" id="signupBirthday" class="signupBirthday" maxlength="15" style="border:1px solid rgba(255,255,255,.60) !important;"/>'+
                '<input  type="text" pattern="[0-9]*"  name="signupZip" id="signupZip" class="signupZip" maxlength="5" value="Zip"/>'+
                '<div class="stylistBtn" id="stylistBtn">Stylist? <img src="img/my-CheckMark.png" class="stylistCheck" id="stylistCheck"/> </div>'+

            '</div>'+
            '<div class="signupBtn2" id="submitSignupBtn"></div>'+
        '</div>'+
    '</div>';

//    console.log(signupPage2);
    
    page = signupPage2;
    slider.slidePage($(page));
    
//    if (deviceSizeFolder == '640by960img/') {
//        
//        console.log('640 by 960 img folder');
//        
//        $("#signUpTypeDiv").css("top","35%");
//        
//        
//    }
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
    
    
    $('input').blur(function() {
                    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
                    });
    
    $('input').focusout(function() {
                        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) { window.scroll(0,0); }
                        });
    
    $('#signupBirthday').blur(function() {
                                 
                                 if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                 
                                 window.scroll(0,0);
                                 
                                 }
                                 
                                 });
    
    $('#signupZip').blur(function() {
                                 
                                 if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                 
                                 window.scroll(0,0);
                                 
                                 }
                                 
                                 });
    
    console.log(suFullname+' '+suEmail+' '+suUsername+' '+suPassword+' '+suAcceptTrms);
    
    var signUpPgTwoBkBtn = document.getElementById('signUpPgTwoBkBtn');
    FastClick.attach(signUpPgTwoBkBtn);
    
    signUpBkBtn2Index = 0;
    
    signUpPgTwoBkBtn.addEventListener('click', function(event) {
                                      if (signUpBkBtn2Index == 0) {
                                      signUpBkBtn2Index = 1;
                                      
                                      goBackTosu1();
                                      
                                      }
                                      }, false);
    
    
    signUpTypeVar = 0;
    var typeRelaxed = document.getElementById('typeRelaxed');
    FastClick.attach(typeRelaxed);
    
    typeRelaxed.addEventListener('click', function(event) {
                                 if (signUpTypeVar == 0) {
                                 //signUpTypeVar = 1;
                                 $("#typeRelaxed").css("color","white");
                                 $("#typeNatural").css("color","#aeafaf");
                                 $("#typeTransitioning").css("color","#aeafaf");
                                 signupTypeString = 'Relaxed';
                                 console.log(signupTypeString);
                                 }
                                 }, false);
    
    var typeNatural = document.getElementById('typeNatural');
    FastClick.attach(typeNatural);
    
    typeNatural.addEventListener('click', function(event) {
                                 if (signUpTypeVar == 0) {
                                 //signUpTypeVar = 1;
                                 $("#typeRelaxed").css("color","#aeafaf");
                                 $("#typeNatural").css("color","white");
                                 $("#typeTransitioning").css("color","#aeafaf");
                                 signupTypeString = 'Natural';
                                 console.log(signupTypeString);
                                 }
                                 }, false);
    
    var typeTransitioning = document.getElementById('typeTransitioning');
    FastClick.attach(typeTransitioning);
    
    typeTransitioning.addEventListener('click', function(event) {
                                       if (signUpTypeVar == 0) {
                                       //signUpTypeVar = 1;
                                       $("#typeRelaxed").css("color","#aeafaf");
                                       $("#typeNatural").css("color","#aeafaf");
                                       $("#typeTransitioning").css("color","white");
                                       signupTypeString = 'Transitioning';
                                       console.log(signupTypeString);
                                       }
                                       }, false);
    
    var stylistBtn = document.getElementById('stylistBtn');
    FastClick.attach(stylistBtn);
    
    var stylistBtnIndex = 0;
    stylistBtn.addEventListener('click', function(event) {
                                if (stylistBtnIndex == 0) {
                                //stylistBtn = 1;
                                
                                if (suStylist == 0 || suStylist == "" || suStylist == null || suStylist == 'undefined') {
                                
                                    suStylist = 1;
                                    $("#stylistBtn").css("color","#ffffff");
                                    $("#stylistCheck").show();
                                
                                } else if (suStylist == 1) {
                                
                                    suStylist = 0;
                                    $("#stylistBtn").css("color","#aeafaf");
                                    $("#stylistCheck").hide();
                                
                                }
                                }
                                }, false);
    
    
    ////User Changes Birthday focus change
//    $('#signupBirthday').focus(function() {
//                               
////                               $('#birthDayPholder').css('display','none');
//                               
//                               });
//    
//    $('#signupBirthday').focusout(function() {
//                                  
//                                  var suBday = $('#signupBirthday').val();
//                                  
//                                  });
    
    ////User Changes Birthday focus change
//    $('#signupZip').focusout(function() {
//                             var signupZipTxt = $('#signupZip').val();
//                             
//                             if (signupZipTxt != "") {
//                             
//                             //                                       sessionStorage.setItem('hubLocationSearchText',hubLocationSearchText);
//                             console.log(signupZipTxt);
//                             suZipcode = signupZipTxt;
//                             
//                             } else {}
//                             });
    
    var submitSignupBtn = document.getElementById('submitSignupBtn');
    FastClick.attach(submitSignupBtn);
    
    submitSignupBtnIndex = 0;
    submitSignupBtn.addEventListener('click', function(event) {
                                     
                                     if (submitSignupBtnIndex == 0) {
                                     submitSignupBtnIndex = 1;
                                     suZipcode = $('#signupZip').val();
                                     suBday = $('#signupBirthday').val();
                                     
                                        if (stylistDetailsAddVar == 0) {
                                                 if(checkInputFieldsPgTwo()) {
                                         
                                                        
                                                        submitSignupBtnIndex = 0;
                                         
                                                         if (suStylist == 1) {
                                                         
                                                                addStylistDetails();
                                                         
                                                         } else {
                                                                myLoading();
                                                                submitSignupAction();
                                                 
                                                         }
                                                }
                                        } else if (stylistDetailsAddVar == 1) {
                                                 submitSignupBtnIndex = 0;
                                                 suExperience = $('#stylistSelectOpt2').val();
                                                 suSpecialty = $('#stylistSelectOpt1').val();
                                                 suSalon = $('#stylistSalonSU').val();
                                     
                                                console.log(suBday+' '+suZipcode+' '+suStylist+' '+signupTypeString);
//                                                alert(suExperience+suSpecialty+suSalon);
                                     
                                             if (suExperience != "" && suSpecialty != "" && suSalon != "") {
                                                    submitSignupBtnIndex = 0;
                                     
                                                    submitSignupAction();

                                             
                                             } else {
                                             
                                                navigator.notification.alert('You must fill out all above categories to submit', submitSignupBtnIndex = 0, 'Myavana', 'OK');
                                     
                                             }
                                     
                                        }

                                     }
                                     }, false);
    
    function addStylistDetails() {
        console.log(suBday+' '+suZipcode+' '+suStylist+' '+signupTypeString);
        
        stylistDetailsAddVar = 1;
        submitSignupBtnIndex = 0;
        
        var stylistDetSUDiv =
        '<img src="img/my-signupTypeBox.png" class="signUpTypeBox"/>'+
        '<div class="stylistDetSUHeading" id="stylistDetSUHeading">STYLIST DETAILS</div>'+
        '<div class="stylistDetailDiv1" id="stylistDetailDiv1">'+
            '<div class="stylistSUSelced">'+
                '<select id="stylistSelectOpt1" class="stylistSelectOpt" data-role="none">'+
                    '<option value="" selected="selected">Specialty</option>'+
                    '<option value="Custom Color">Custom Color</option>'+
                    '<option value="Natural Hair">Natural Hair</option>'+
                    '<option value="Signature Cuts">Signature Cuts</option>'+
                    '<option value="Straightening Treatments">Straightening Treatments</option>'+
                    '<option value="Weave Installation">Weave Installation</option>'+
                    '<option value="Other">Other</option>'+
                '</select>'+
            '</div>'+
        '</div>'+
        '<div class="stylistDetailDiv2" id="stylistDetailDiv2">'+
        '<div class="stylistSUSelced">'+
        '<select id="stylistSelectOpt2" class="stylistSelectOpt" data-role="none">'+
            '<option value="" selected="selected">Experience</option>'+
            '<option value="1+ yrs">1+ yrs</option>'+
            '<option value="3+ yrs">3+ yrs</option>'+
            '<option value="5+ yrs">5+ yrs</option>'+
            '<option value="10+ yrs">10+ yrs</option>'+
            '<option value="15+ yrs">15+ yrs</option>'+
            '<option value="25+ yrs">25+ yrs</option>'+
        '</select>'+
        '</div>'+
        '</div>'+
        '<input type="text" id="stylistSalonSU" placeholder="Salon" class="stylistSalonSU" maxlength="40" />'+
        '</div>';
        
        $('#signUpTypeDiv').empty().append(stylistDetSUDiv);
        
        $('#stylistSalonSU').blur(function() {
                                   
                                   if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                   
                                   window.scroll(0,0);
                                   
                                   }
                                   
                                   });
        
    }
    
    
    function checkInputFieldsPgTwo() {
        
//        alert(suBday);
        
        if(signupTypeString == "") {
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please select your hair type: Relaxed, Natural, or Transitioning', submitSignupBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
            
        }
        else if(!validation.isValidUSZip(suZipcode)) {
            
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid Zipcode.',submitSignupBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
        }
        else if (suBday == 'undefined' || suBday == undefined || !suBday.isValidDate()) {
            console.log(suBday);
            navigator.notification.vibrate(2000);
            navigator.notification.alert('Please enter a valid Birthday.',submitSignupBtnIndex = 0, 'Myavana', 'OK');
            
            return false;
            
            
        } else {
            
            return true;
        }
        
    }
    
    
    function submitSignupAction() {
//        myLoading();
        ////Convert Zipcode to LatLong
        callGetGeocode(suZipcode);
                
    }
    
}

function submitSignupActionWZip(latitude,longitude,city,state) {
    
    console.log(suFullname+' '+suEmail+' '+suUsername+' '+suPassword+' '+suAcceptTrms+' '+suBday+' '+suZipcode+' '+suStylist+' '+signupTypeString+' '+suSpecialty+' '+suExperience+' '+suSalon+' '+city+' '+state);
    
    $.ajax({
           type: 'POST',
           url: myMobileGlobalURL+"register.php",
           data: {fullName:suFullname,username:suUsername,email:suEmail,password:suPassword,acceptterms:suAcceptTrms,birthday:suBday,zipcode:suZipcode,lat:latitude,lon:longitude,stylist:suStylist,haircategory:signupTypeString,specialty:suSpecialty,experience:suExperience,salon:suSalon,city:city,state:state},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           if(!data.success) {
           $.unblockUI();

           submitSignupBtnIndex = 0;
           stylistDetailsAddVar = 0;
           navigator.notification.vibrate(1000);
           navigator.notification.alert(data.errorMsg,signupPageActions(), 'Myavana', 'OK');
           
           } else {
           
           
           /////////////
           
           userArray.fullname = suFullname;
           userArray.email = suEmail;
           userArray.username = suUsername;
           userArray.uid = data.UID;
           userArray.password = suPassword;
           userArray.birthday = suBday;
           userArray.zipcode = suZipcode;
           userArray.latitude = latitude;
           userArray.longitude = longitude;
           userArray.stylist = suStylist;
           
           userArray.stylistExperience = suExperience;
           userArray.stylistSpecialty = suSpecialty;
           userArray.stylistPhone = "";
           userArray.stylistSalonName = suSalon;
           userArray.stylistSalonAddress = "";
           userArray.city = city;
           userArray.state = state;
           
           userArray.numberOfLooks = 0;
           userArray.numberOfFriends = 0;
           
           userArray.haircategory = signupTypeString;
           userArray.photo = 'img/no-photo.png';
           
           userArray.aboutMe = "";
                      
           if (data.mySignupAlert == 1) {
           
           navigator.notification.vibrate(1000);
           navigator.notification.alert(data.mySignupAlertMsg, none(), 'Myavana', 'OK');
           
           }
           
           
           
           if(typeof(Storage) !== "undefined") {
           console.log("localStorage and sessionStorage are supported!");
           
           window.localStorage["fullname"] = suFullname;
           window.localStorage["email"] = suEmail;
           window.localStorage["username"] = suUsername;
           window.localStorage["password"] = suPassword;
           window.localStorage["email"] = data.UID;
           
           
           } else {
           console.log("No web storage support...");
           }
           
           userArray.pushNotificationStatus = data.pushNotificationStatus;
           userArray.deviceToken = data.deviceToken;
           
           console.log('PUSH NOTIFICATION STATUS & DEVICE TOKEN: '+userArray.pushNotificationStatus+' '+userArray.deviceToken);
           
//           if (userArray.pushNotificationStatus == 1 && (userArray.deviceToken != null || userArray.deviceToken != 'null' || userArray.deviceToken != '' || userArray.deviceToken != 'undefined')) {
//           
//               console.log('push notifcations on');
//           
//           } else {
           
               console.log('ask to turn push notifcations on');
               pushNotification = window.plugins.pushNotification;
               pushNotification.register(push.signupPushHandler, push.signupErrorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"push.onNotificationAPN"});
           
//           }
           }
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           $.unblockUI();
           submitSignupBtnIndex = 0;
           navigator.notification.alert('Your sign up timed out. You may want to check your internet connection and try again later.',signupPage2Actions(), 'Myavana', 'OK');
           
           } else {
           $.unblockUI();
           submitSignupBtnIndex = 0;
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           navigator.notification.alert('There was an error: '+data+' Try again.',signupPage2Actions(), 'Myavana', 'OK');
           
           }
           }
           });
    
    
}


/////////VALIDATION //////////////////

var validation = {
    //Check if emailAddress is a vaild email address
isValidEmail:function(emailAddress){
    //Pattern from http://goo.gl/BPZXE
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    
    return pattern.test(emailAddress);
    
},
    //Check if parameter is a valid US Zip code using Reg Ex
isSelected:function(selectVal) {
    
    //Check to see if select value is blank
    if (selectVal=="") {
        // value is set to a valid option, so submit form
        return false;
    }
    else{
        
        return true;
    }
    
},
isChecked:function(element){
    if(element.attr('checked')) {
        return true;;
    } else {
        return false;
    }
},
    //Check if parameter is a valid US Zip code using Reg Ex
isValidUSZip:function(sZip) {
    return /^\d{5}(-\d{4})?$/.test(sZip);
},
    //Check if parameter is alphanumeric and t least 8 characters
isValidPassword:function(password) {
    //Check the length
    if(password.length <= 6){
        return false;
    }
    //Check Alphanumeric
    return /^[a-z0-9]+$/i.test(password);
},
    
};

/////////END VALIDATION////////////////
var profileBtnSecIndex = 0;
var searchBtnSecIndex = 0;
var headlineBtnSecIndex = 0;
var girlFriendsBtnSecIndex = 0;
var savedLooksBtnSecIndex = 0;
var theTeaBtnSecIndex = 0;
var optionsBtnSecIndex = 0;
var myOptionsPrivacyIndex = 0;

function homePageActions() {

    
    wrapperScrollX = 0;
    wrapperScrollY = 0;

    
    largePicBackVar = '';
    
    ////CLEAR ALL PAGE VARS
    fromFavDiscoverLargeImage = 0;
    fromHeadlinesPage = 0;
    fromHeadlinesLargeImage = 0;
    fromSavedLooks = 0;
    fromUserLooks = 0;
    discoverPageLanded = 0;
    discoverFavLanded = 0;
    fromSavedLooksLargeImg = 0;
    fromMadamesFavLargeImg = 0;
    
    
    var homePage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-home-pg.png" class="loginBack"/>'+
    '<div class="addLookBtn" id="homepgAddLookBtn" onclick="addNewLook(\'homepage\')"></div>'+
    '<div class="homeBtnSec" id="headlineBtnSec"></div>'+
    '<div class="searchBtnSec" id="searchBtnSec"></div>'+
    '<div class="profileBtnSec" id="profileBtnSec"></div>'+
    '<div class="girlFriendsBtnSec" id="girlFriendsBtnSec"></div>'+
    '<div class="savedLooksBtnSec" id="savedLooksBtnSec"></div>'+
    '<div class="theTeaBtnSec" id="theTeaBtnSec"></div>'+
    '<div class="optionsBtnSec" id="optionsBtnSec"></div>'+
    '</div>'+
    '</div>';

    
    ////Bring in homepage
    page = homePage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
//    pageChain = 'homePageActions';
//    pageArray = pageChain.split(', ');
    
    ////Add Button Clicks on Homepage
    
    var profileBtnSec = document.getElementById('profileBtnSec');
    FastClick.attach(profileBtnSec);
    
    profileBtnSecIndex = 0;
    
    profileBtnSec.addEventListener('click', function(event) {
                                   if (profileBtnSecIndex == 0) {
                                   profileBtnSecIndex = 1;
                                   
                                   profilePageActions();
                                   
                                   }
                                   }, false);
    
    var searchBtnSec = document.getElementById('searchBtnSec');
    FastClick.attach(searchBtnSec);
    
    searchBtnSecIndex = 0;
    
    searchBtnSec.addEventListener('click', function(event) {
                                  
                                  if (searchBtnSecIndex == 0) {
                                  searchBtnSecIndex = 1;
                                  
                                  searchHairstylesPageAction();
                                  }
                                  
                                  }, false);
    
    var headlineBtnSec = document.getElementById('headlineBtnSec');
    FastClick.attach(headlineBtnSec);
    
    headlineBtnSecIndex = 0;
    
    headlineBtnSec.addEventListener('click', function(event) {
                                    if (headlineBtnSecIndex == 0) {
                                    headlineBtnSecIndex = 1;
                                    
                                    headlinesPageAction();
                                    
                                    }
                                    }, false);
    
    var girlFriendsBtnSec = document.getElementById('girlFriendsBtnSec');
    FastClick.attach(girlFriendsBtnSec);
    
    girlFriendsBtnSecIndex = 0;
    
    girlFriendsBtnSec.addEventListener('click', function(event) {
                                       if (girlFriendsBtnSecIndex == 0) {
                                       girlFriendsBtnSecIndex = 1;
                                       girlfriendsBackVar = "";
                                       girlfriendsPageAction();
                                       
                                       }
                                       }, false);
    
    var savedLooksBtnSec = document.getElementById('savedLooksBtnSec');
    FastClick.attach(savedLooksBtnSec);
    
    savedLooksBtnSecIndex = 0;
    
    savedLooksBtnSec.addEventListener('click', function(event) {
                                      if (savedLooksBtnSecIndex == 0) {
                                      savedLooksBtnSecIndex = 1;
                                      deleteUnusedIscroll();
                                      
                                      getLooksSaved();
                                      }
                                      }, false);
    
    var theTeaBtnSec = document.getElementById('theTeaBtnSec');
    FastClick.attach(theTeaBtnSec);
    
    theTeaBtnSecIndex = 0;
    
    theTeaBtnSec.addEventListener('click', function(event) {
                                  if (theTeaBtnSecIndex == 0) {
                                  theTeaBtnSecIndex = 1;
                                  
                                  teaPageActions();
                                  }
                                  }, false);
    
    var optionsBtnSec = document.getElementById('optionsBtnSec');
    FastClick.attach(optionsBtnSec);
    
    optionsBtnSecIndex = 0;
    
    optionsBtnSec.addEventListener('click', function(event) {
                                   if (optionsBtnSecIndex == 0) {
                                   optionsBtnSecIndex = 1;
                                   
                                   optionsPageActions();
                                   }
                                   }, false);
}

var changePrefUpdateBtnDivIndex = 0;

String.prototype.isValidDate = function() {
    var IsoDateRe = new RegExp("^([0-9]{4})-([0-9]{2})-([0-9]{2})$");
    
    var matches = IsoDateRe.exec(this);
    if (!matches) return false;
    
    return true;
    
}

var optionsBkBtnIndex = 0;
var myOptionsLogoutHIndex = 0;
var myOptionsEmailIndex = 0;
var myOptionsBirthdayIndex = 0;
var myOptionsZipcodeIndex = 0;
var myOptionsUsernameIndex = 0;
var myOptionsBlogIndex = 0;
var myOptionsTermsIndex = 0;
var myOptionsHonestIndex = 0;
var leaveCommentBkBtnIndex = 0;
var leavePrefUpdateBtnDivIndex = 0;

var myOptionsFacebookIndex = 0;
var myOptionsTwitterIndex = 0;
var editProfHairCatSelect = '';

function optionsPageActions() {
    
    
    var optionsPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
    '<div class="profBkBtn" id="optionsBkBtn"></div>'+
    '<div class="myOptionsSocialH" id="myOptionsSocialH">SOCIAL</div>'+
    '<div class="myOptionsFacebook" id="myOptionsFacebook">Share on Facebook<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsTwitter" id="myOptionsTwitter">Share on Twitter<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsPrefH" id="myOptionsPrefH">USER INFORMATION</div>'+
    '<div class="myOptionsEmail" id="myOptionsEmail">Email<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsBirthday" id="myOptionsBirthday">Birthday<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsZipcode" id="myOptionsZipcode">Zipcode<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsUsername" id="myOptionsUsername">Hair Category<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsSupportH" id="myOptionsSupportH">SUPPORT</div>'+
    '<div class="myOptionsHonest" id="myOptionsHonest">Let\'s Be Honest<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsBlog" id="myOptionsBlog">Tutorial<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsTerms" id="myOptionsTerms">Terms of Service<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsPrivacy" id="myOptionsPrivacy">Privacy Policy<img style="width:3%;float:right;margin-top:1%;margin-right:3px;" id="stylistIcon" src="img/my-settings-arrow.png"></div>'+
    '<div class="myOptionsLogoutH" id="myOptionsLogoutH">LOGOUT</div>'+
    '</div>'+
    '</div>';
    
    page = optionsPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
//    alert(deviceVersion);
    ///////////////////////////
    
    if (deviceVersion == '7.0') {
        
        $('#myOptionsSocialH').css('top','11%');
        
    }
    
    
    function twitterConnectShare(buttonIndex) {
        if (buttonIndex == 1) {
            
            var postHeadingString = "Go check out Myavana and download the app today.";
            myOptionsTwitterIndex = 0;
            
            TwitterDemo.isSetup2(postHeadingString,"https://si0.twimg.com/profile_images/3414601530/916ba4bc079482c2b2f74911068374f9.png");
        } else {
            myOptionsTwitterIndex = 0;
        }
    }
    
    function facebookConnectShare(buttonIndex) {
        if (buttonIndex == 1) {
//                window.socialmessage.send(HLcaption, ["PostToTwitter", "PostToFacebook"]);
                window.socialmessage.send("Go check out Myavana in the app store and download it today."+" "+"https://si0.twimg.com/profile_images/3414601530/916ba4bc079482c2b2f74911068374f9.png", ["PostToFacebook"]);
            
//            console.log('facebook share clicked');
//            var postHeadingString = "Go check out wwww.MadameYou.com and download the app today.";
//            myOptionsFacebookIndex = 0;
//            
//            checkFBLoginStatus(postHeadingString,"https://si0.twimg.com/profile_images/3414601530/916ba4bc079482c2b2f74911068374f9.png");
        } else {
            myOptionsFacebookIndex = 0;
        }
    }
    
    
    ///////////////////////////
    
    var myOptionsFacebook = document.getElementById('myOptionsFacebook');
    FastClick.attach(myOptionsFacebook);
    
    myOptionsFacebookIndex = 0;
    
    myOptionsFacebook.addEventListener('click', function(event) {
                                  if (myOptionsFacebookIndex == 0) {
//                                  myOptionsFacebookIndex = 1;
                                  
                                    window.socialmessage.send("Go check out Myavana in the app store and download it today.", ["PostToFacebook"]);
                                       
//                                       navigator.notification.confirm(
//                                                                      'Do you want to connect with Facebook to share on Myavana?',  // message
//                                                                      facebookConnectShare,              // callback to invoke with index of button pressed
//                                                                      'Myavana',            // title
//                                                                      ['Facebook','Exit']          // buttonLabels
//                                                                      );
                                  }
                                  }, false);
    
    var myOptionsTwitter = document.getElementById('myOptionsTwitter');
    FastClick.attach(myOptionsTwitter);
    
    myOptionsTwitterIndex = 0;
    
    myOptionsTwitter.addEventListener('click', function(event) {
                                       if (myOptionsTwitterIndex == 0) {
//                                       myOptionsTwitterIndex = 1;
                                      
                                      window.socialmessage.send("Go check out Myavana and download from the App Store today.", ["PostToTwitter"]);
                                      
//                                      navigator.notification.confirm(
//                                                                     'Do you want to share Myavana on Twitter?',  // message
//                                                                     twitterConnectShare,              // callback to invoke with index of button pressed
//                                                                     'Myavana',            // title
//                                                                     ['Twitter','Exit']          // buttonLabels
//                                                                     );
                                      
                                       }
                                       }, false);
    
    var optionsBkBtn = document.getElementById('optionsBkBtn');
    FastClick.attach(optionsBkBtn);
    
    optionsBkBtnIndex = 0;
    
    optionsBkBtn.addEventListener('click', function(event) {
                                  if (optionsBkBtnIndex == 0) {
                                  optionsBkBtnIndex = 1;
                                  
                                  homePageActions();
                                  }
                                  }, false);
    
    ////Logout Click
    var myOptionsLogoutH = document.getElementById('myOptionsLogoutH');
    FastClick.attach(myOptionsLogoutH);
    
    myOptionsLogoutHIndex = 0;
    
    myOptionsLogoutH.addEventListener('click', function(event) {
                                      if (myOptionsLogoutHIndex == 0) {
                                      myOptionsLogoutHIndex = 1;
                                      
                                      logoutActions();
                                      }
                                      }, false);
    
    ////Email Change Click
    var myOptionsEmail = document.getElementById('myOptionsEmail');
    FastClick.attach(myOptionsEmail);
    
    myOptionsEmailIndex = 0;
    
    myOptionsEmail.addEventListener('click', function(event) {
                                    if (myOptionsEmailIndex == 0) {
                                    myOptionsEmailIndex = 1;
                                    
                                    changeEmail();
                                    
                                    }
                                    }, false);
    
    ////Birthday Change Click
    var myOptionsBirthday = document.getElementById('myOptionsBirthday');
    FastClick.attach(myOptionsBirthday);
    
    myOptionsBirthdayIndex = 0;
    
    myOptionsBirthday.addEventListener('click', function(event) {
                                       if (myOptionsBirthdayIndex == 0) {
                                       myOptionsBirthdayIndex = 1;
                                       
                                       changeBirthdayAction();
                                       
                                       }
                                       }, false);
    
    
    ////Zipcode Change Click
    var myOptionsZipcode = document.getElementById('myOptionsZipcode');
    FastClick.attach(myOptionsZipcode);
    
    myOptionsZipcodeIndex = 0;
    
    myOptionsZipcode.addEventListener('click', function(event) {
                                      if (myOptionsZipcodeIndex == 0) {
                                      myOptionsZipcodeIndex = 1;
                                      
                                      
                                      
                                      var changePreferences =
                                      '<div data-role="page" >'+
                                      '<div class="container" '+containerStyleVar+'>'+
                                      '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
                                      '<div class="profBkBtn" id="changePrefBkBtn"></div>'+
                                      '<div class="myOptionsSocialH" id="myPreferencesHead"></div>'+
                                      '<input type="text" name="changePrefInput" id="changePrefInput" class="changePref" maxlength="60"/>'+
                                      '<div class="changePrefUpdateBtnDiv" id="changePrefUpdateBtnDiv"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
                                      '</div>'+
                                      '</div>';
                                      
                                      page = changePreferences;
                                      slider.slidePage($(page));
                                      
                                      if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                      
                                      window.scroll(0,0);
                                      
                                      }
                                      
                                      $('#myPreferencesHead').empty().append('CHANGE ZIPCODE');
                                      $('#changePrefInput').val(userArray.zipcode);
                                      
                                      $('#changePrefInput').blur(function() {
                                                                 
                                                                 if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                                                 
                                                                 window.scroll(0,0);
                                                                 
                                                                 }
                                                                 
                                                                 });
                                      
                                      var changePrefBkBtn = document.getElementById('changePrefBkBtn');
                                      FastClick.attach(changePrefBkBtn);
                                      
                                      changePrefBkBtnIndex = 0;
                                      
                                      changePrefBkBtn.addEventListener('click', function(event) {
                                                                       if (changePrefBkBtnIndex == 0) {
                                                                       changePrefBkBtnIndex = 1;
                                                                       
                                                                       optionsPageActions();
                                                                       }
                                                                       }, false);
                                      
                                      var changePrefUpdateBtnDiv = document.getElementById('changePrefUpdateBtnDiv');
                                      FastClick.attach(changePrefUpdateBtnDiv);
                                      
                                      changePrefUpdateBtnDivIndex = 0;
                                      
                                      changePrefUpdateBtnDiv.addEventListener('click', function(event) {
                                                        if (changePrefUpdateBtnDivIndex == 0) {
                                                              changePrefUpdateBtnDivIndex = 1;
                                                              
                                                              var userZipcodeInput = $('#changePrefInput').val();
                                                              
                                                            if ((userZipcodeInput != userArray.zipcode) && (validation.isValidUSZip(userZipcodeInput))) {
                                                                  
                                                                    callGetGeocode2(userZipcodeInput);
                                                                  
                                                              } else {
                                                                    navigator.notification.alert('You must enter a new or valid 5-digit zipcode update.',changePrefUpdateBtnDivIndex = 0, 'Myavana', 'OK');
                                                              }
                                                              
                                                        }
                                                    }, false);
                                      
                                      }
                                      }, false);
    
    ////Username Change Click
    var myOptionsUsername = document.getElementById('myOptionsUsername');
    FastClick.attach(myOptionsUsername);
    
    myOptionsUsernameIndex = 0;
    
    myOptionsUsername.addEventListener('click', function(event) {
                                       if (myOptionsUsernameIndex == 0) {
                                       myOptionsUsernameIndex = 1;
                                       
                                       
                                       
                                       var changeHairCat =
                                       '<div data-role="page" >'+
                                       '<div class="container" '+containerStyleVar+'>'+
                                       '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
                                       '<div class="profBkBtn" id="changePrefBkBtn"></div>'+
                                       '<div class="myOptionsSocialH" id="myPreferencesHead"></div>'+
                                       '<div class="editHairCategory">'+
                                       '<select id="editProfHairCatSelect" data-role="none">'+
                                       '<option value="Relaxed">Relaxed</option>'+
                                       '<option value="Natural">Natural</option>'+
                                       '<option value="Transitioning">Transitioning</option>'+
                                       '</select>'+
                                       '</div>'+
                                       '<div class="changePrefUpdateBtnDiv" id="changePrefUpdateBtnDiv"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
                                       '</div>'+
                                       '</div>';
                                       
                                       page = changeHairCat;
                                       slider.slidePage($(page));
                                       
                                       if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                       
                                       window.scroll(0,0);
                                       
                                       }

                                       $('#myPreferencesHead').empty().append('CHANGE HAIR CATEGORY');
                                       $('#editProfHairCatSelect').val(userArray.haircategory);
                                       
                                       var changePrefBkBtn = document.getElementById('changePrefBkBtn');
                                       FastClick.attach(changePrefBkBtn);
                                       
                                       changePrefBkBtnIndex = 0;
                                       
                                       changePrefBkBtn.addEventListener('click', function(event) {
                                                                        if (changePrefBkBtnIndex == 0) {
                                                                        changePrefBkBtnIndex = 1;
                                                                        
                                                                        optionsPageActions();
                                                                        }
                                                                        }, false);
                                       
                                       var changePrefUpdateBtnDiv = document.getElementById('changePrefUpdateBtnDiv');
                                       FastClick.attach(changePrefUpdateBtnDiv);
                                       
                                       changePrefUpdateBtnDivIndex = 0;
                                       
                                       changePrefUpdateBtnDiv.addEventListener('click', function(event) {
                                                           if (changePrefUpdateBtnDivIndex == 0) {
                                                                   changePrefUpdateBtnDivIndex = 1;
                                                                   
                                                                   editProfHairCatSelect = $('#editProfHairCatSelect').val();
                                                           
                                                                   if (editProfHairCatSelect != '' || editProfHairCatSelect != userArray.haircategory) {
                                                                        submitHairCategoryChange(editProfHairCatSelect);
                                                                   } else {
                                                                        navigator.notification.alert('You must change your hair category to update.',changePrefUpdateBtnDivIndex = 0, 'Myavana', 'OK');
                                                                   }
                                                            }
                                                           
                                               }, false);
                                       
                                       }
                                       }, false);
    
    function submitHairCategoryChange(input) {
        console.log('submit hair cat change '+input);
        
            $.ajax({
                   type: 'POST',
                   url: myMobileGlobalURL+"submitHairCategoryChange.php",
                   data: {uid:userArray.uid,haircategory:input},
                   dataType: 'json',
                   timeout: 15000,
                   success: function(data) {
                   
                   console.log('Edit Hair Category Success');
                   
                   if (data.success) {
                       changePrefUpdateBtnDivIndex = 0;
                       userArray.haircategory = data.haircategory;
                       navigator.notification.alert(data.comment,optionsPageActions(), 'Myavana', 'OK');
                   } else {
                   navigator.notification.alert(data.comment,changePrefUpdateBtnDivIndex = 0,'Myavana','OK');
                   }
                   
                   },
                   error: function(xhr, type, error) {
                   if (type === "timeout") {
                   changePrefUpdateBtnDivIndex = 0;
                   navigator.notification.alert('Your upload timed out try again with a better connection.',optionsPageActions(), 'Myavana', 'OK');
                   
                   } else {
                   changePrefUpdateBtnDivIndex = 0;
                   console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
                   navigator.notification.alert('Your look upload failed try again.',optionsPageActions(), 'Myavana', 'OK');
                   
                   }
                   }
                   });
        
    }
    
    
    ////Blog Button Click
    var myOptionsBlog = document.getElementById('myOptionsBlog');
    FastClick.attach(myOptionsBlog);
    
    myOptionsBlogIndex = 0;
    
    myOptionsBlog.addEventListener('click', function(event) {
                                   if (myOptionsBlogIndex == 0) {
                                   myOptionsBlogIndex = 1;
                                   var myBlog = window.open('http://www.madameyou.com/tutorial', '_blank', 'EnableViewPortScale=yes');
                                   myBlog.addEventListener('exit', function(event) { myOptionsBlogIndex = 0; });
                                   
                                   }
                                   }, false);
    
    ////Terms Button Click
    var myOptionsTerms = document.getElementById('myOptionsTerms');
    FastClick.attach(myOptionsTerms);
    
    myOptionsTermsIndex = 0;
    
    myOptionsTerms.addEventListener('click', function(event) {
                                    if (myOptionsTermsIndex == 0) {
                                    myOptionsTermsIndex = 1;
                                    
                                    var myTerms = window.open('http://www.madameyou.com/terms', '_blank', 'EnableViewPortScale=yes');
                                    myTerms.addEventListener('exit', function(event) { myOptionsTermsIndex = 0; });
                                    
                                    }
                                    }, false);
    
    ////Privacy Button Click
    var myOptionsPrivacy = document.getElementById('myOptionsPrivacy');
    FastClick.attach(myOptionsPrivacy);
    
    myOptionsPrivacyIndex = 0;
    
    myOptionsPrivacy.addEventListener('click', function(event) {
                                      if (myOptionsPrivacyIndex == 0) {
                                      
                                      myOptionsPrivacyIndex = 1;
                                      
                                      var myPrivacy = window.open('http://www.madameyou.com/privacy', '_blank', 'EnableViewPortScale=yes');
                                      myPrivacy.addEventListener('exit', function(event) { myOptionsPrivacyIndex = 0; });
                                      
                                      }
                                      }, false);
    
    ////LEAVE A COMMENT Click
    var myOptionsHonest = document.getElementById('myOptionsHonest');
    FastClick.attach(myOptionsHonest);
    
    myOptionsHonestIndex = 0;
    
    myOptionsHonest.addEventListener('click', function(event) {
                                     if (myOptionsHonestIndex == 0) {
                                     myOptionsHonestIndex = 1;
                                     
                                     
                                     var leaveAComment =
                                     '<div data-role="page" >'+
                                     '<div class="container" '+containerStyleVar+'>'+
                                     '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
                                     '<div class="profBkBtn" id="leaveCommentBkBtn"></div>'+
                                     '<div class="myOptionsSocialH" id="myPreferencesHead">LET\'S BE HONEST</div>'+
                                     '<div class="leaveCommentHead" id="leaveCommentHead">LEAVE MY FEEDBACK</div>'+
                                     '<textarea rows="3" cols="50" class="leaveAComment" id="leaveAComment" maxlength="160"></textarea>'+
                                     '<div class="leaveCommentChangePrefUpdateBtnDiv" id="leavePrefUpdateBtnDiv"><img src="img/submitEmailBtn.png" class="editProfilePicBtn"/></div>'+
                                     '</div>'+
                                     '</div>';
                                     
                                     page = leaveAComment;
                                     slider.slidePage($(page));
                                     
                                     if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                     
                                     window.scroll(0,0);
                                     
                                     }
                                     
                                     $('#leaveAComment').blur(function() {
                                                                
                                                                if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                                                
                                                                window.scroll(0,0);
                                                                
                                                                }
                                                                
                                                                });
                                     
                                     var leaveCommentBkBtn = document.getElementById('leaveCommentBkBtn');
                                     FastClick.attach(leaveCommentBkBtn);
                                     
                                     leaveCommentBkBtnIndex = 0;
                                     
                                     leaveCommentBkBtn.addEventListener('click', function(event) {
                                                                        if (leaveCommentBkBtnIndex == 0) {
                                                                        leaveCommentBkBtnIndex = 1;
                                                                        
                                                                        optionsPageActions();
                                                                        }
                                                                        }, false);
                                     
                                     var leavePrefUpdateBtnDiv = document.getElementById('leavePrefUpdateBtnDiv');
                                     FastClick.attach(leavePrefUpdateBtnDiv);
                                     
                                     leavePrefUpdateBtnDivIndex = 0;
                                     
                                     leavePrefUpdateBtnDiv.addEventListener('click', function(event) {
                                                                            if (leavePrefUpdateBtnDivIndex == 0) {
                                                                            leavePrefUpdateBtnDivIndex = 1;
                                                                            
                                                                            var leaveACommentInput = $('#leaveAComment').val();
                                                                            
                                                                            submitFeedback(leaveACommentInput);
                                                                            }
                                                                            }, false);
                                     
                                     
                                     }
                                     }, false);
    
    function submitFeedback(input) {
        
        if ( (input != "") && (input.length > 10) ) {
            
            $.ajax({
                   type: 'POST',
                   url: myMobileGlobalURL+"leaveFeedback.php",
                   data: {UID:userArray.uid,feedback:input,fullName:userArray.fullname},
                   dataType: 'json',
                   timeout: 15000,
                   success: function(data) {
                   
                   console.log('Feedback Submit Success');
                   
                   if (data.success) {
                   leavePrefUpdateBtnDivIndex = 0;
                   navigator.notification.alert(data.message,optionsPageActions(), 'Myavana', 'OK');
                   } else {
                   navigator.notification.alert(data.message,leavePrefUpdateBtnDivIndex = 0,'Myavana','OK');
                   }
                   
                   },
                   error: function(xhr, type, error) {
                   if (type === "timeout") {
                   
                   leavePrefUpdateBtnDivIndex = 0;
                   navigator.notification.alert('Your upload timed out try again with a better connection.',none(), 'Myavana', 'OK');
                   
                   } else {
                   
                   leavePrefUpdateBtnDivIndex = 0;
                   console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
                   navigator.notification.alert('Your feedback upload failed try again.',none(), 'Myavana', 'OK');
                   
                   }
                   }
                   });
            
            
        } else {
            navigator.notification.alert('You must either change your zipcode or enter a valid 5 digit zipcode.',leavePrefUpdateBtnDivIndex = 0, 'Myavana', 'OK');
        }
        
    }
    
}

function submitZipcodeChange(lat,lon,city,state,zip) {
    
    if ( (zip != userArray.zipcode) && (validation.isValidUSZip(zip)) ) {
        
        console.log('Lat, Lon, City, State, Zip: '+lat+', '+lon+', '+city+', '+state+', '+zip);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"submitChangeZipcode.php",
               data: {uid:userArray.uid,zipcode:zip,lat:lat,lon:lon,city:city,state:state,zip:zip},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('Edit Zipcode Success');
               
               if (data.success) {
               
                       userArray.zipcode = zip;
                       userArray.latitude = lat;
                       userArray.longitude = lon;
                       userArray.city = city;
                       userArray.state = state;
               
                       navigator.notification.alert(data.comment,optionsPageActions(), 'Myavana', 'OK');
               } else {
                    navigator.notification.alert(data.comment,changePrefUpdateBtnDivIndex = 0,'Myavana','OK');
               }
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               changePrefUpdateBtnDivIndex = 0;
               navigator.notification.alert('Your change timed out try again with a better connection.',optionsPageActions(), 'Myavana', 'OK');
               
               } else {
               changePrefUpdateBtnDivIndex = 0;
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your change failed try again.',optionsPageActions(), 'Myavana', 'OK');
               
               }
               }
               });
        
        
    } else {
        navigator.notification.alert('You must either change your zipcode or enter a valid 5 digit zipcode.',changePrefUpdateBtnDivIndex = 0, 'Myavana', 'OK');
    }
    
}


var changePrefBkBtnIndex = 0;
var changePrefUpdateBtnDivIndex = 0;

function changeEmail() {
    
    
    var changePreferences =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
    '<div class="profBkBtn" id="changePrefBkBtn"></div>'+
    '<div class="myOptionsSocialH" id="myPreferencesHead"></div>'+
    '<input type="text" name="changePrefInput" id="changePrefInput" class="changePref" maxlength="60"/>'+
    '<div class="changePrefUpdateBtnDiv" id="changePrefUpdateBtnDiv"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
    '</div>'+
    '</div>';
    
    page = changePreferences;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    $('#myPreferencesHead').empty().append('CHANGE EMAIL');
    $('#changePrefInput').val(userArray.email);
    
    $('#changePrefInput').blur(function() {
                                       
                                       if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                       
                                       window.scroll(0,0);
                                       
                                       }
                                       
                                       });
    
    var changePrefBkBtn = document.getElementById('changePrefBkBtn');
    FastClick.attach(changePrefBkBtn);
    
    changePrefBkBtnIndex = 0;
    
    changePrefBkBtn.addEventListener('click', function(event) {
                                     if (changePrefBkBtnIndex == 0) {
                                     changePrefBkBtnIndex = 1;
                                     
                                     optionsPageActions();
                                     }
                                     }, false);
    
    
    
    var changePrefUpdateBtnDiv = document.getElementById('changePrefUpdateBtnDiv');
    FastClick.attach(changePrefUpdateBtnDiv);
    
    changePrefUpdateBtnDivIndex = 0;
    
    changePrefUpdateBtnDiv.addEventListener('click', function(event) {
                                            if (changePrefUpdateBtnDivIndex == 0) {
                                            changePrefUpdateBtnDivIndex = 1;
                                            
                                            
                                            var userEmailInput = $('#changePrefInput').val();
                                            
                                            submitEmailChange(userEmailInput);
                                            
                                            
                                            }
                                            }, false);
    
    setTimeout(function () {
               
       if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
       
       window.scroll(0,0);
       
       }
               
    }, 500);
    
}

function submitEmailChange(inputEmail) {
    
    if ( (inputEmail != userArray.email) && (validation.isValidEmail(inputEmail)) ) {
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"submitChangeEmail.php",
               data: {uid:userArray.uid,email:inputEmail},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('Edit Email Success');
               
               if (data.success) {
               userArray.email = inputEmail;
               changePrefUpdateBtnDivIndex = 0;
               navigator.notification.alert(data.comment,optionsPageActions(), 'Myavana', 'OK');
               } else {
               changePrefUpdateBtnDivIndex = 0;
               navigator.notification.alert(data.comment,optionsPageActions(),'Myavana','OK');
               }
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               changePrefUpdateBtnDivIndex = 0;
               navigator.notification.alert('Your upload timed out try again with a better connection.',optionsPageActions(), 'Myavana', 'OK');
               
               } else {
               changePrefUpdateBtnDivIndex = 0;
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your look upload failed try again.',optionsPageActions(), 'Myavana', 'OK');
               
               }
               }
               });
        
        
    } else {
        
        navigator.notification.alert('You must enter a new valid email address.',changePrefUpdateBtnDivIndex = 0, 'Myavana', 'OK');
    }
    
}

var changeBdayBkBtnIndex = 0;
var changePrefUpdateBtnDivIndex = 0;
function changeBirthdayAction() {
    
    var changeBirthday =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
    '<div class="profBkBtn" id="changeBdayBkBtn"></div>'+
    '<div class="myOptionsSocialH" id="myPreferencesHead"></div>'+
    '<input type="date" name="changePrefInput" id="changePrefInput" class="changePref" max="10"/>'+
    '<div class="changePrefUpdateBtnDiv" id="changePrefUpdateBtnDiv"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
    '</div>'+
    '</div>';
    
    page = changeBirthday;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    $('#myPreferencesHead').empty().append('CHANGE BIRTHDAY');
    $('#changePrefInput').val(userArray.birthday);
    
    $('#changePrefInput').blur(function() {
                               
                               if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                               
                               window.scroll(0,0);
                               
                               }
                               
                               });
    
    var changeBdayBkBtn = document.getElementById('changeBdayBkBtn');
    FastClick.attach(changeBdayBkBtn);
    
    changeBdayBkBtnIndex = 0;
    
    changeBdayBkBtn.addEventListener('click', function(event) {
                                     if (changeBdayBkBtnIndex == 0) {
                                     changeBdayBkBtnIndex = 1;
                                     
                                     optionsPageActions();
                                     
                                     
                                     }
                                     }, false);
    
    var changePrefUpdateBtnDiv = document.getElementById('changePrefUpdateBtnDiv');
    FastClick.attach(changePrefUpdateBtnDiv);
    
    changePrefUpdateBtnDivIndex = 0;
    
    changePrefUpdateBtnDiv.addEventListener('click', function(event) {
                                            if (changePrefUpdateBtnDivIndex == 0) {
                                            changePrefUpdateBtnDivIndex = 1;
                                            
                                            var userBirthdayInput = $('#changePrefInput').val();
                                            
                                            submitBirthdayChange(userBirthdayInput);
                                            }
                                            }, false);
}

function submitBirthdayChange(input) {
    
    if ( (input != userArray.birthday) && (input.isValidDate()) ) {
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"submitChangeBirthdate.php",
               data: {uid:userArray.uid,birthday:input},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('Edit Bday Success');
               
               if (data.success) {
               changePrefUpdateBtnDivIndex = 0;
               userArray.birthday = input;
               navigator.notification.alert(data.comment,optionsPageActions(), 'Myavana', 'OK');
               } else {
               navigator.notification.alert(data.comment,changePrefUpdateBtnDivIndex = 0,'Myavana','OK');
               }
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               changePrefUpdateBtnDivIndex = 0;
               navigator.notification.alert('Your change timed out try again with a better connection.',optionsPageActions(), 'Myavana', 'OK');
               
               } else {
               changePrefUpdateBtnDivIndex = 0;
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your change failed try again.',optionsPageActions(), 'Myavana', 'OK');
               
               }
               }
               });
        
        
    } else {
        
        navigator.notification.alert('You must either change your bday or enter a valid Date.',changePrefUpdateBtnDivIndex = 0, 'Myavana', 'OK');
    }
    
}



function logoutActions() {
    userArray = {};
    localStorage.clear();
    
    landingPageActions();
}

var profBkBtnIndex = 0;
var profAboutImgIndex = 0;
var myProfFriendsIconIndex = 0;
var profileImageViewReturn = "";

function profilePageActions(returnPage) {
    console.log('profile page actions called');
    
    fromUserLooks = 0;
    
    profileUserName = userArray.username;
    
    var profilePage =
    '<div data-role="page"  id="profilePage">'+
    '<div class="bigPhotoOverlay" id="bigPhotoOverlay"></div>'+
    '<div class="fadeMe" id="fadeMe"></div>'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'Profile.png" class="loginBack"/>'+
    '<div class="profBkBtn" id="profBkBtn"></div>'+
    '<div class="addLookBtn" id="profAddLook" onclick="addNewLook(\'profile\')"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '<div class="profUserName" id="profUserName"></div>'+
    '<div class="profPicDiv" id="profPicDiv"><img src="" class="profilePic" id="profilePic"/></div>'+
    '<div class="aboutMeDiv" id="aboutMeDiv">'+
    '<div class="profDetRowT">'+
    '<div class="myProfLeftTop">'+
    '<div class="profLooksVal" id="profLooksVal"></div>'+
    '<div class="profLooksLabel" id="profLooksLabel">STYLES</div>'+
    '</div>'+
    '<div class="myProfRightTop">'+
    '<div class="profLooksVal" id="profFriendsVal"></div>'+
    '<img src="img/friendsIcon.png" class="myProfFriendsIcon" id="myProfFriendsIcon"/>'+
    '</div>'+
    '</div>'+
    '<div class="profDetRow1">'+
    '<div class="profHairCategory" id="profHairCategory">HAIR CATEGORY: Natural</div>'+
    '</div>'+
    '<div class="profDetRow1">'+
    '<div class="profAboutMeTxt" id="profAboutMeTxt"></div>'+
    '</div>'+
    '<div class="profDetRowB">'+
    '<img src="img/updateBtn.png" class="profAboutImg" id="profAboutImg"/>'+
    '</div>'+
    '</div>'+
    '<div class="profilePhotosSection" id="profilePhotosSection">'+
    '<div class="profileGroupDiv" id="profileGroupDiv">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = profilePage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    myLoading();
    
    girlfriendsBackVar = "profilepage";
    
    var myProfFriendsIcon = document.getElementById('myProfFriendsIcon');
    FastClick.attach(myProfFriendsIcon);
    
    myProfFriendsIconIndex = 0;
    
    myProfFriendsIcon.addEventListener('click', function(event) {
           if (myProfFriendsIconIndex == 0) {
                
                   myProfFriendsIconIndex = 1;
           
                   girlfriendsPageAction();
           
           }
   }, false);
    
    

    
    
    $('#profPicDiv').css('width','40%');
    var imgHeight = $('#profPicDiv').outerWidth();
    $('#profilePic').css('height',imgHeight);
    
//    alert(userArray.stylist);
    if(userArray.stylist == true){
        $('#profUserName').empty().append('<img width="23" height="23" style="margin-top:-3px;margin-right:3px;" id="stylistIcon" src="img/stylistIcon.png">'+userArray.username+'<div class="profStylistSpecialty">SPECIALTY: '+userArray.stylistSpecialty+'</div>');
        $('#profHairCategory').empty().append('HAIR CATEGORY:'+userArray.haircategory+'<div class="profStylistSpecialty">EXPERIENCE: '+userArray.stylistExperience+'</div>');
        $('#profAboutMeTxt').empty().append(userArray.aboutMe);
    }
    else{
        $('#profUserName').empty().append(userArray.username);
        $('#profHairCategory').empty().append('HAIR CATEGORY:'+userArray.haircategory);
        $('#profAboutMeTxt').empty().append(userArray.aboutMe);
    }
    
    $('#profilePic').attr('src',userArray.photo);
    
    
    if (userArray.numberOfLooks == 1 || userArray.numberOfLooks == '1') {
//        alert(userArray.numberOfLooks);
        $('#profLooksLabel').empty().append('STYLE');
        $('#profLooksVal').empty().append(userArray.numberOfLooks);
        
    } else {
//        alert(userArray.numberOfLooks);
        $('#profLooksVal').empty().append(userArray.numberOfLooks);
        
    }
    
    $('#profLooksVal').empty().append(userArray.numberOfLooks);
    
    $('#profFriendsVal').empty().append(userArray.numberOfFriends);
    
    var profBkBtn = document.getElementById('profBkBtn');
    FastClick.attach(profBkBtn);
    
    profBkBtnIndex = 0;
    
    profBkBtn.addEventListener('click', function(event) {
                               if (profBkBtnIndex == 0) {
                               profBkBtnIndex = 1;
                               deleteUnusedIscroll();
                               
                               console.log('profile back button clicked');
                               homePageActions();
                               
//                               alert('my prof bk btn click');
                               
//                                   if ((profileImageViewReturn == "" || profileImageViewReturn != "profilepic") && fromHeadlinesPage == 0 && fromFavDiscoverLargeImage == 0 && fromSavedLooksLargeImg == 0 && fromMadamesFavLargeImg == 0) {
//                                        console.log('call return page function');    
//                                        returnPageFunction();
//                                   } else if (profileImageViewReturn == "profilepic" && fromHeadlinesPage != 1) {
//                                        console.log('call view large profile pic');
//                                        viewLargeProfilePic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption);
//
//                                   } else if (addLookReturnVar == 'stylist' && fromHeadlinesPage != 1 ) {
//                                        console.log('return to stylist page from MY PROFILE');
//                                        stylistDiscPageActions();
//                                   
//                                   } else if (fromFavDiscoverLargeImage == 1) {
//                               
//                                       console.log('return to Discover Large Image you came from MY PROFILE');
//                                       viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
//                               
//                                   } else if (fromSavedLooksLargeImg == 1) {
//                               
//                                        console.log('return to My Favorite Looks Large Image you came from MY PROFILE');
//                                        viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
//                               
//                                   
//                                   } else if (fromMadamesFavLargeImg == 1) {
//                               
//                                       console.log('return to Madames Favs Looks Large Image you came from MY PROFILE');
//                                       viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
//                               
//                                   
//                                   }  else if (fromHeadlinesPage == 1) {
//                               
//                                           if (fromHeadlinesLargeImage == 1) {
//                               
//                                               console.log('return to headlines Large Image you came from from MY PROFILE');
//                                               myLoading();
//                                               viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
//                               
//                                            } else {
//                                                console.log('return to headlines from MY PROFILE');
//                                                headlinesPageAction();
//                                            }
//                               
//                                   } else {
//                                        returnPageFunction();
//                                   }
                               
                               }
                               }, false);
    
    var profAboutImg = document.getElementById('profAboutImg');
    FastClick.attach(profAboutImg);
    
    profAboutImgIndex = 0;
    
    profAboutImg.addEventListener('click', function(event) {
                                  if (profAboutImgIndex == 0) {
                                  profAboutImgIndex = 1;
                                  deleteUnusedIscroll();
                                  
                                  editProfileActions();
                                  }
                                  }, false);
    
    
    setTimeout(function () {
               
        getUserLooks(userArray.uid);
               
    }, 500);
    
    
}


var largePicBackVar = '';
var discoverMadamFavBkBtnIndex = 0;

var fromSavedLooks = 0;

function getLooksSaved() {
    fromSavedLooks = 0;
    
    addLookReturnVar = 'savedlooks';
    
    largePicBackVar = 'saved';
    ////Slide in Search Page
    
    var savedLooksPage =
    '<div data-role="page" >'+
        '<div class="container" '+containerStyleVar+'>'+
            '<img src="img/'+deviceSizeFolder+'my-favs-bg.png" class="loginBack"/>'+
            '<div class="searchBkBtn" id="discoverMadamFavBkBtn"></div>'+
            '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'savedlooks\')"></div>'+
            '<div class="myWrapperStd" id="myWrapperStd">'+
            '<div class="myWrapperScroller" id="myWrapperScroller">'+
            '<div class="discoverPhotosSection" id="discoverPhotosSection">'+
            '<div class="profileGroupDiv" id="savedLooksGridDiv">'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
    
    page = savedLooksPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    myLoading();
    
    ////Add in Back Button
    var discoverMadamFavBkBtn = document.getElementById('discoverMadamFavBkBtn');
    FastClick.attach(discoverMadamFavBkBtn);
    
    discoverMadamFavBkBtnIndex = 0;
    
    discoverMadamFavBkBtn.addEventListener('click', function(event) {
                                           if (discoverMadamFavBkBtnIndex == 0) {
                                           discoverMadamFavBkBtnIndex = 1;
                                           fromSavedLooks = 0;
                                           deleteUnusedIscroll();
                                           
                                           //searchHairstylesPageAction();
                                           homePageActions();
                                           }
                                           }, false);
    
    setTimeout(function () {
               
               getSavedLooksFeed();
               
    }, 500);
    
}

var fromSavedLooksLargeImg = 0;

function getSavedLooksFeed() {
    fromSavedLooksLargeImg = 0;
    
    var currentProfileImg;
    var rowCount = 0;
    var trackRow = 1;
    
    $('#savedLooksGridDiv').empty();
    lookPicIndex = 0;
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getSavedLooks.php",
           data: {UID:userArray.uid},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           console.log('get user favs looks success');
           var trackImg;
           
           if(data.length == 0) {
           $('#savedLooksGridDiv').empty().append('<div class="hlPicGroupNone" id="hlPicGroupNone">You have no saved looks.</div>');
           }
           else {
           var dLength = data.length;
           ///grab each of the comments
           $.each(data, function(i,data){
                  
                  if (trackImg%3 == 0 || rowCount == 0) {
                  $("#savedLooksGridDiv").append("<div class='profLooksRow' id='profLooksRow"+trackRow+"'></div>");
                  rowCount = 1;
                  } else { }
                  
                  trackImg = i+1;
                  if(trackImg%3 == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="leftLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+i+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var lookPicW = $('#lookPic'+i).outerWidth();
                  $('#lookPic'+i).css('height',lookPicW);
                  
                  var lookPic = document.getElementById('lookPic'+i);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (lookPicIndex == 0) {
                                           lookPicIndex = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           fromSavedLooks = 1;
                                           fromSavedLooksLargeImg = 1;
                                           
                                           myLoading();
                                           
                                           deleteUnusedIscroll();
                                           
                                           viewLargeHLPic(data.media_id,data.username,data.pic_name,data.numOfComments,data.numOfLikes,data.caption,'',data.username,data.hairstyle,data.pic_creator);
                                           
                                           }
                                           }, false);
                  
                  } else if(trackImg%3 == 2) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="midLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+i+'"/>'+
                  '</div>';

                  
                  $(photoRow).append(photoDiv);
                  
                  var lookPicW = $('#lookPic'+i).outerWidth();
                  $('#lookPic'+i).css('height',lookPicW);
                  
                  var lookPic = document.getElementById('lookPic'+i);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (lookPicIndex == 0) {
                                           lookPicIndex = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           fromSavedLooks = 1;
                                           fromSavedLooksLargeImg = 1;
                                           
                                           myLoading();
                                           
                                           deleteUnusedIscroll();
                                           
//                                           viewLargeHLPic(data.media_id,data.username,data.pic_name,data.numOfComments,data.numOfLikes,data.caption);
                                           viewLargeHLPic(data.media_id,data.username,data.pic_name,data.numOfComments,data.numOfLikes,data.caption,'',data.username,data.hairstyle,data.pic_creator);
                                           }
                                           }, false);
                  
                  
                  } else if(trackImg%3 == 0) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="rightLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+i+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var lookPicW = $('#lookPic'+i).outerWidth();
                  $('#lookPic'+i).css('height',lookPicW);
                  
                  var lookPic = document.getElementById('lookPic'+i);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (lookPicIndex == 0) {
                                           lookPicIndex = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           fromSavedLooks = 1;
                                           fromSavedLooksLargeImg = 1;
                                           
                                           myLoading();
                                           
                                           deleteUnusedIscroll();
                                           
//                                           viewLargeHLPic(data.media_id,data.username,data.pic_name,data.numOfComments,data.numOfLikes,data.caption);
                                           viewLargeHLPic(data.media_id,data.username,data.pic_name,data.numOfComments,data.numOfLikes,data.caption,'',data.username,data.hairstyle,data.pic_creator);
                                           }
                                           }, false);
                  
                  rowCount = 0;
                  trackRow = trackRow + 1;
                  
                  } else { }
                  
                  
                  });
           
           if(dLength%3 == 0) {
           trackRow = trackRow -1;
           } else {}
           
           }
           
           setTimeout(function () {
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
                      
                      $.unblockUI();
                      ///$.unblockUI();
                      }, 1000);
           
           
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           
           $.unblockUI();
           $('#profileGroupDiv').empty().append('You have not uploaded a look to Myavana.');
           
           } else {
           
           $.unblockUI();
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           $('#profileGroupDiv').empty().append('We couldn\t access your Myavana looks.');
           
           }
           }
           });
    
    
}



var profileUserName = "";
var profileFollowBtnIndex = 0;
var otherUserUID = "";
var stylistContactClickIndex = 0;

function otherProfilePageActions(uid,returnPage) {
    
    myLoading();
    
    ////NEEDED VARS For calling other user profile page
    otherUserUID = uid;
    addLookReturnVar = 'homepage';
    
    ////Get User Profile Info
    
    
    //    otherUserArray.username = 'Username';
    //    otherUserArray.fullname = 'Full Name';
    //    otherUserArray.photo = 'img/myPlaceholderImg.png';
    //    otherUserArray.haircategory = 'Natural';
    //    otherUserArray.aboutMe = 'Test about me data for preview';
    //    otherUserArray.numberOfLooks = '33';
    //    otherUserArray.numberOfFriends = '350';
    
    getOtherUserInfo(uid);
    function getOtherUserInfo(uid) {
        
        $.ajax({
               type: 'GET',
               url: myMobileGlobalURL+"getUser.php",
               data: {otherUID:uid,myUID:userArray.uid},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('Get User Profile Info Success');
               
               
               $.each(data.user, function(i,data){
                      
                      if (data.followerStatus == 'notFollowing') {
                      otherUserArray.followStatus = 0;
                      } else if (data.followerStatus == 'Following') {
                      otherUserArray.followStatus = 1;
                      }
                      
                      otherUserArray.username = data.otherUsername;
                      otherUserArray.fullname = data.otherFullName;
                      otherUserArray.stylist = data.otherUserStylist;
                      
                      if (data.otherUserProfPhoto == null || data.otherUserProfPhoto == 'null' || data.otherUserProfPhoto == '' || data.otherUserProfPhoto == 'undefined') {
                          otherUserArray.photo = 'img/no-photo.png';
                      } else {
                            otherUserArray.photo = 'http://54.214.19.19/pictures/profilePics/'+data.otherUserProfPhoto;
                      }
                      
                      if (data.otherUserAbout == null || data.otherUserAbout == 'null' || data.otherUserAbout == '') {
                      otherUserArray.aboutMe = "";
                      } else {
                      otherUserArray.aboutMe = data.otherUserAbout;
                      }
                      
                      if (data.otherUserHairCat == null || data.otherUserHairCat == 'null' || data.otherUserHairCat == ''|| data.otherUserHairCat == 'undefined') {
                      otherUserArray.haircategory = 'Natural';
                      } else {
                      otherUserArray.haircategory = data.otherUserHairCat;
                      }
                      
                      if(data.otherUserStylist) {
                            
                            otherUserArray.stylistSalon = data.otherUserSalon;
                            otherUserArray.stylistExp = data.otherUserExperience;
                            otherUserArray.stylistSpec = data.otherUserSpecialty;
                            otherUserArray.stylistPhone = data.otherUserPhone;
                            otherUserArray.stylistAddress = data.otherUserAddress;
                      
                      
                      }
                      
                      
                      otherUserArray.numberOfLooks = data.otherUserLooks;
                      otherUserArray.numberOfFriends = data.otherUserFollowers;
                      });
               
               otherUserProfileFunc2();
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your upload timed out try again with a better connection.',none(), 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your look upload failed try again.',none(), 'Myavana', 'OK');
               
               }
               }
               });
    }
    
    function otherUserProfileFunc2() {
        
        var otherUserProfilePage =
        '<div data-role="page"  id="profilePage">'+
        '<div class="bigPhotoOverlay" id="bigPhotoOverlay"></div>'+
        '<div class="fadeMe" id="fadeMe"></div>'+
        '<div class="container" '+containerStyleVar+'>'+
        '<img src="img/'+deviceSizeFolder+'my-blank-header-NOTEXT.png" class="loginBack"/>'+
        '<div class="profBkBtn" id="profBkBtn"></div>'+
        '<div class="addLookBtn" id="profAddLook" onclick="addNewLook(\'homepage\')"></div>'+
        '<div class="myWrapperStd" id="myWrapperStd">'+
        '<div class="myWrapperScroller" id="myWrapperScroller">'+
        '<div class="profUserName" id="profUserName"></div>'+
        '<div class="profPicDiv" id="profPicDiv"><img src="" class="profilePic" id="profilePic"/></div>'+
        '<div class="aboutMeDiv" id="aboutMeDiv">'+
        '<div class="profDetRowT">'+
        '<div class="profLeftTop">'+
        '<div class="profLooksVal" id="profLooksVal"></div>'+
        '<div class="profLooksLabel" id="profLooksLabel">STYLES</div>'+
        '</div>'+
        '<div class="profMidTop">'+
        '<div class="profLooksVal" id="profFriendsVal"></div>'+
        '<img src="img/friendsIcon.png" class="profFriendsIcon"/>'+
        '</div>'+
        '<div class="profRightTop">'+
        '<img src="img/profileFollowBtn.png" id="profileFollowBtn" class="profileFollowBtn"/>'+
        '</div>'+
        '</div>'+
        '<div class="profDetRow1">'+
        '<div class="profHairCategory" id="profHairCategory">HAIR CATEGORY: Natural</div>'+
        '</div>'+
        '<div class="profDetRow1">'+
        '<div class="profAboutMeTxt" id="profAboutMeTxt"></div>'+
        '</div>'+
        '</div>'+
        '<div class="profilePhotosSection" id="profilePhotosSection">'+
        '<div class="profileGroupDiv" id="profileGroupDiv">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
        
        page = otherUserProfilePage;
        slider.slidePage($(page));
        
        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
            
            window.scroll(0,0);
            
        }
        
        $('#profPicDiv').css('width','40%');
        var imgHeight = $('#profPicDiv').outerWidth();
        $('#profilePic').css('height',imgHeight);
        
//        profileUserName = otherUserArray.username;
//        $('#profUserName').empty().append(otherUserArray.fullname);
//        alert('other userr profile'+otherUserArray.stylist);
        
        if(otherUserArray.stylist == 1){
            $('#profUserName').empty().append('<img width="23" height="23" style="margin-top:-3px;margin-right:3px;" id="stylistIcon" src="img/stylistIcon.png">'+otherUserArray.username+'<div class="profStylistSpecialty">SPECIALTY: '+otherUserArray.stylistSpec+'</div>');
            $('#profHairCategory').empty().append('HAIR CATEGORY:'+otherUserArray.haircategory+'<div class="profStylistSpecialty">EXPERIENCE: '+otherUserArray.stylistExp+'</div>');
            $('#profAboutMeTxt').empty().append(otherUserArray.aboutMe+'<div class="profStylistSpecialty" id="stylistContactClick" style="text-decoration:underline;font-size:90% !important;margin-bottom:0% !important;">CONTACT</div>');
            
            var stylistContactClick = document.getElementById('stylistContactClick');
            FastClick.attach(stylistContactClick);
            
            stylistContactClickIndex = 0;
            
            stylistContactClick.addEventListener('click', function(event) {
                                                 if (stylistContactClickIndex == 0) {
                                                 stylistContactClickIndex = 1;
                                                 
                                                 if(otherUserArray.stylistAddress == 'null' || otherUserArray.stylistAddress == null) {
                                                 otherUserArray.stylistAddress = "None";
                                                 }
                                                 
                                                 if (otherUserArray.stylistPhone == 'null' || otherUserArray.stylistPhone == null) {
                                                 otherUserArray.stylistPhone = "None";
                                                 }
                                                 
                                                 var otherStylistString = otherUserArray.stylistSalon+'\n Address: '+otherUserArray.stylistAddress+'\n Phone: '+otherUserArray.stylistPhone;
                                                 
                                                 navigator.notification.confirm(
                                                                                otherStylistString,  // message
                                                                                viewStylistContactInfo,              // callback to invoke with index of button pressed
                                                                                'Contact Info',            // title
                                                                                ['Close']          // buttonLabels
                                                                                );
                                                 
                                                 }
                                                 
                                                 }, false);
            
        } else {
            $('#profUserName').empty().append(otherUserArray.username);
            $('#profHairCategory').empty().append('HAIR CATEGORY:'+otherUserArray.haircategory);
            $('#profAboutMeTxt').empty().append(otherUserArray.aboutMe);
        }
        
        
        $('#profilePic').attr('src',otherUserArray.photo);
    
        
        if (otherUserArray.numberOfLooks == 1 || otherUserArray.numberOfLooks == '1') {
            
            $('#profLooksLabel').empty().append('STYLE');
            $('#profLooksVal').empty().append(otherUserArray.numberOfLooks);
            
        } else {
            
            $('#profLooksVal').empty().append(otherUserArray.numberOfLooks);
            
        }
        
        $('#profFriendsVal').empty().append(otherUserArray.numberOfFriends);
        
        
        if (otherUserArray.followStatus == 1) {
            
            $('#profileFollowBtn').attr('src','img/following.png');
            
        }
        
        var profileFollowBtn = document.getElementById('profileFollowBtn');
        FastClick.attach(profileFollowBtn);
        
        profileFollowBtnIndex = 0;
        
        profileFollowBtn.addEventListener('click', function(event) {
                                          if (profileFollowBtnIndex == 0) {
                                          profileFollowBtnIndex = 1;
                                          if (otherUserArray.followStatus == 0) {
                                          
                                          followUser(uid);
                                          
                                          } else if (otherUserArray.followStatus == 1) {
                                          
                                          unfollowUser(uid);
                                          
                                          }
                                          }
                                          
                                          }, false);
        
        
        
        function viewStylistContactInfo(buttonIndex) {
            if (buttonIndex == 1) {
                
                stylistContactClickIndex = 0;
                
            } else {
                stylistContactClickIndex = 0;
            }
        }
        
        
        var profBkBtn = document.getElementById('profBkBtn');
        FastClick.attach(profBkBtn);
        
        profBkBtnIndex = 0;
        
        profBkBtn.addEventListener('click', function(event) {
                   if (profBkBtnIndex == 0) {
                       profBkBtnIndex = 1;
                   
                       deleteUnusedIscroll();
                                   
                                   if ((profileImageViewReturn == "" || profileImageViewReturn != "profilepic") && fromHeadlinesPage == 0 && fromFavDiscoverLargeImage == 0 && fromSavedLooksLargeImg == 0 && fromMadamesFav == 0 && fromMadamesFavLargeImg == 0 && fromLargeProfilePic == 0) {
                                   console.log('call return page from OTHER Prof function');
                                   returnPageFunction();
                                   } else if (profileImageViewReturn == "profilepic" && fromHeadlinesPage != 1) {
                                   console.log('call view large profile pic from OTHER');
                                   viewLargeProfilePic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption);
                                   
                                   } else if (addLookReturnVar == 'stylist' && fromHeadlinesPage != 1) {
                                   console.log('return to stylist page from MY PROFILE');
                                   stylistDiscPageActions();
                                   
                                   } else if (fromFavDiscoverLargeImage == 1 ) {
                                   
                                   deleteUnusedIscroll();
                                   console.log('return to Discover Large Image you came from MY PROFILE');
                                   myLoading();
                                   viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
                                   
                                   } else if (fromSavedLooksLargeImg == 1) {
                                   deleteUnusedIscroll();
                                   console.log('return to My Favs Looks Large Image you came from MY PROFILE');
                                   viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
                                   
                                   
                                   }  else if (fromLargeProfilePic == 1) {
                                        console.log('return to My HOME from other user profile page');
                                        homePageActions();
                                   
                                   
                                   } else if (fromMadamesFavLargeImg == 1) {
                                   deleteUnusedIscroll();
                                   console.log('return to Madames Favorite Looks Large Image you came from MY PROFILE');
                                   viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
                                   
                                   }   else if (fromHeadlinesPage == 1) {
                                   
                                       if (fromHeadlinesLargeImage == 1) {
                                   deleteUnusedIscroll();
                                       console.log('return to headlines Large Image you came from from MY PROFILE');
                                       myLoading();
                                       viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
                                   
                                       } else {
                                       console.log('return to headlines from MY PROFILE');
                                       headlinesPageAction();
                                       }
                                   
                                   } else {
                                        homePageActions();
                                   }

                                   
                                   
                   
                   }
        }, false);
        
        //        var profAboutImg = document.getElementById('profAboutImg');
        //        FastClick.attach(profAboutImg);
        //
        //        var profAboutImgIndex = 0;
        //
        //        profAboutImg.addEventListener('click', function(event) {
        //                                      if (profAboutImgIndex == 0) {
        //                                      //profAboutImgIndex = 1;
        //                                      //alert('about details clicked');
        //                                      //editProfileActions();
        //                                      }
        //                                      }, false);
        
        
        setTimeout(function () {
                   
                  getUserLooks(uid);
                   
        }, 500);
    }
    
    
}

var lookPicIndex = 0;

var fromUserLooks = 0;
var fromOtherUserLooks = 0;
function getUserLooks(uid) {
    
    
    var currentProfileImg;
    var rowCount = 0;
    var trackRow = 1;
    $('#profileGroupDiv').empty();
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getUserJourney.php",
           data: {UID:uid},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           console.log('get user looks success: getUserJourney Called');
           var trackImg;
           
           if(data.length == 0) {
           $('#profileGroupDiv').empty().append('You have not uploaded a look to Myavana.');
           }
           else {
           var dLength = data.length;
           ///grab each of the comments
           $.each(data, function(i,data){
                  
                  if (trackImg%3 == 0 || rowCount == 0) {
                  $("#profileGroupDiv").append("<div class='profLooksRow' id='profLooksRow"+trackRow+"'></div>");
                  rowCount = 1;
                  } else { }
                  
                  trackImg = i+1;
                  if(trackImg%3 == 1 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="leftLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.photoURL+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (lookPicIndex == 0) {
                                           deleteUnusedIscroll();
                                           lookPicIndex = 1;
                                           
                                           if(uid == userArray.uid) {
                                           fromUserLooks = 1;
                                           viewLargeProfilePic(data.media_id,profileUserName,data.photoURL,data.total_comments,data.likes,data.caption);
                                           } else {
                                           fromUserLooks = 1;
                                           viewLargeOtherUserProfilePic(data.media_id,profileUserName,data.photoURL,data.total_comments,data.likes,data.caption);
                                           }
                                           }
                                           }, false);
                  
                  } else if(trackImg%3 == 2 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="midLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.photoURL+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (lookPicIndex == 0) {
                                           lookPicIndex = 1;
                                           deleteUnusedIscroll();
                                           
                                           if(uid == userArray.uid) {
//                                           viewLargePhoto(data.photoURL,data.caption,data.media_id,data.likes,data.datecreated,profileUserName,data.total_comments);
                                           fromUserLooks = 1;
                                           viewLargeProfilePic(data.media_id,profileUserName,data.photoURL,data.total_comments,data.likes,data.caption);
                                           } else {
//                                           viewOtherLargePhoto(data.photoURL,data.caption,data.media_id,data.likes,data.datecreated,profileUserName,data.total_comments);
                                           fromUserLooks = 1;
                                           viewLargeOtherUserProfilePic(data.media_id,profileUserName,data.photoURL,data.total_comments,data.likes,data.caption);
                                           }
                                           }
                                           }, false);
                  
                  
                  } else if(trackImg%3 == 0 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="rightLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.photoURL+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (lookPicIndex == 0) {
                                           deleteUnusedIscroll();
                                           lookPicIndex = 1;
                                           
                                           if(uid == userArray.uid) {
//                                           viewLargePhoto(data.photoURL,data.caption,data.media_id,data.likes,data.datecreated,profileUserName,data.total_comments);
                                           fromUserLooks = 1;
                                           viewLargeProfilePic(data.media_id,profileUserName,data.photoURL,data.total_comments,data.likes,data.caption);
                                           } else {
//                                           viewOtherLargePhoto(data.photoURL,data.caption,data.media_id,data.likes,data.datecreated,profileUserName,data.total_comments);
                                           fromUserLooks = 1;
                                           viewLargeOtherUserProfilePic(data.media_id,profileUserName,data.photoURL,data.total_comments,data.likes,data.caption);
                                           }
                                           }
                                           }, false);
                  
                  rowCount = 0;
                  trackRow = trackRow + 1;
                  
                  } else { }
                  
                  
                  });
           
           if(dLength%3 == 0) {
           trackRow = trackRow -1;
           } else {}
           
           }
           
           setTimeout(function () {
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
                      
                      $.unblockUI();
                      ///$.unblockUI();
                      }, 1000);
           
           
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           
           $.unblockUI();
           $('#profileGroupDiv').empty().append('You have not uploaded a look to Myavana.');
           
           } else {
           
           $.unblockUI();
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           $('#profileGroupDiv').empty().append('We couldn\t access your Myavana looks.');
           
           }
           }
           });
    
}

var viewLargeProfileBkBtnIndex = 0;
var fromLargeProfilePic = 0;

function viewLargeProfilePic(HLmediaId,HLusername,HLpicName,HLnumOfComments,HLnumOfLikes,HLcaption) {
    console.log('View Large Profile Pic Called '+HLmediaId+' '+HLusername+' '+HLpicName+' '+HLnumOfComments+' '+HLnumOfLikes+' '+HLcaption);
    lookPicIndex = 0;
    //myLoading();
//    alert('view large profile pic');
    fromMadamesFavLargeImg = 0;
    fromLargeProfilePic = 0;
    
    largePicArray.mediaid = HLmediaId;
    
    ////this is WEBSITE URL ON DISCOVER
    largePicArray.username = HLusername;
    largePicArray.picurl = HLpicName;
    largePicArray.numOfComments = HLnumOfComments;
    largePicArray.numOfLikes = HLnumOfLikes;
    largePicArray.caption = HLcaption;
    
    
    var viewLargeProfilePicture =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-blank-header.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="viewLargeProfileBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'profile\')"></div>'+
    '<div class="HLInputCommentDiv" id="HLInputCommentDiv">'+
    '<input type="text" name="searchInput" class="addHLCommentDiv" id="addHLCommentDiv" placeholder="Add Comment..."/>'+
    '<img src="img/addBtn.png" class="addCommentBtn" id="addCommentBtn"/>'+
    '</div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScrollerCOMMENTPAD" id="myWrapperScrollerCOMMENTPAD">'+
    '<div class="discoveryDetailsPicture" id="discoveryDetailsPicture"><img src="" class="largeHLPic" id="largeHLPic"/></div>'+
    '<div class="HLCaptionDiv" id="HLCaptionDiv">'+
    '<div class="largeHLWebsite" id="largeHLWebsite"></div>'+
    '</div>'+
    '<div class="discoveryDetailsNumDiv" id="discoveryDetailsNumDiv">'+
    '<div class="discCommentCount" id="largeHLCommentCount"></div>'+
    '<img src="img/my-comment-img.png" class="commentCountImg" id="commentCountImg"/>'+
    '<div class="saveCount" id="largeHLFavCount"></div>'+
    '<img src="img/likeImg.png" class="saveCountImg" id="largeProfilePicLikeImg"/>'+
    '<div class="deletePhotoBtnDiv">'+
    '<img src="img/myDeleteImg.png" id="deleteUserLook" class="profileFollowBtn"/>'+
    '</div>'+
    '</div>'+
    '<div class="HLCaptionDiv" id="ProfileLookCaptionDiv">'+
    '<div class="largeProfileCaption" id="largeProfilecaption"></div>'+
    '<img src="img/myTwitterIcon.png" class="twitterImg" id="profTwitterImg"/>'+
    '<img src="img/myFBicon.png" class="fbImg" id="profFbImg"/>'+
    '</div>'+
    '<div class="HLcommentDiv" id="HLcommentDiv">'+
    
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    
    page = viewLargeProfilePicture;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    $('#addHLCommentDiv').blur(function() {
                        
                        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                        
                        window.scroll(0,0);
                        
                        }
                        
                        });
    
    $('#largeHLPic').attr('src',largePicArray.picurl);
    $('#largeHLCommentCount').empty().append(largePicArray.numOfComments);
    $('#largeHLFavCount').empty().append(largePicArray.numOfLikes);
    $('#largeProfilecaption').empty().append(largePicArray.caption);
    
    ////Add Like Click
    var largeProfilePicLikeImg = document.getElementById('largeProfilePicLikeImg');
    FastClick.attach(largeProfilePicLikeImg);
    
    largePicLikeImgIndex = 0;
    
    largeProfilePicLikeImg.addEventListener('click', function(event) {
                                     if(largePicLikeImgIndex == 0) {
                                            
                                     largePicLikeImgIndex = 1;
                                     addBigProfileLike(largePicArray.mediaid,largePicArray.numOfLikes);
                                     
                                     }
                                     }, false);
    
    ////Add in Back Button
    var viewLargeProfileBkBtn = document.getElementById('viewLargeProfileBkBtn');
    FastClick.attach(viewLargeProfileBkBtn);
    
    viewLargeProfileBkBtnIndex = 0;
    
    viewLargeProfileBkBtn.addEventListener('click', function(event) {
                                            if (viewLargeProfileBkBtnIndex == 0) {
                                           
                                                deleteUnusedIscroll();
                                           
                                                fromUserLooks = 0;
                                                fromLargeProfilePic = 0;
                                                viewLargeProfileBkBtnIndex = 1;
                                                profileImageViewReturn = "";
                                               
                                                profilePageActions();
                                           
                                            
                                            }
                                            }, false);
    
    
    
    ///////////////////////////////////////////////////////----------
    
    var profFbImg = document.getElementById('profFbImg');
    FastClick.attach(profFbImg);
    
    profFbImgIndex = 0;
    
    profFbImg.addEventListener('click', function(event) {
                               if (profFbImgIndex == 0) {
//                               profFbImgIndex = 1;
                               
                            var postHeadingString = "Check out this look I found on Myavana!";
                               
                            window.socialmessage.send(postHeadingString+" "+HLpicName, ["PostToFacebook"]);
                               
//                               navigator.notification.confirm(
//                                                              'Do you want to share this Look on Facebook?',  // message
//                                                              facebookPhotoShare,              // callback to invoke with index of button pressed
//                                                              'Myavana',            // title
//                                                              ['Facebook','Exit']          // buttonLabels
//                                                              );
                               
                               }
                               
                               }, false);
    
    var deleteUserLook = document.getElementById('deleteUserLook');
    FastClick.attach(deleteUserLook);
    
    deletePhotoIndex = 0;
    
    deleteUserLook.addEventListener('click', function(event) {
                                    if (deletePhotoIndex == 0) {
                                    deletePhotoIndex = 1;
                                    
                                    navigator.notification.confirm(
                                                                   'Do you really want to delete this Look?',  // message
                                                                   deleteMyLookConfirm,              // callback to invoke with index of button pressed
                                                                   'Myavana',            // title
                                                                   ['Delete','Exit']          // buttonLabels
                                                                   );
                                    }
                                    
                                    }, false);
    
    //////Twitter
    
    var profTwitterImg = document.getElementById('profTwitterImg');
    FastClick.attach(profTwitterImg);
    
    profTwitterImgIndex = 0;
    
    profTwitterImg.addEventListener('click', function(event) {
                                    if (profTwitterImgIndex == 0) {
//                                    profTwitterImgIndex = 1;
                                    
                                    var postHeadingString = "Check out this look I found on Myavana!";
                                    
                                    window.socialmessage.send(postHeadingString+" "+HLpicName, ["PostToTwitter"]);
                                    
//                                    //alert('fb button image share clicked');
//                                    navigator.notification.confirm(
//                                                                   'Do you want to share this Look on Twitter?',  // message
//                                                                   twitterPhotoShare,              // callback to invoke with index of button pressed
//                                                                   'Myavana',            // title
//                                                                   ['Twitter','Exit']          // buttonLabels
//                                                                   );
                                    
                                    }
                                    
                                    }, false);
    
    
    function twitterPhotoShare(buttonIndex) {
        if (buttonIndex == 1) {
            
            var postHeadingString = "Check out this look I found on Myavana!";
            profTwitterImgIndex = 0;
            
            TwitterDemo.isSetup2(postHeadingString,HLpicName);
        } else {
            profTwitterImgIndex = 0;
        }
    }
    
    function facebookPhotoShare(buttonIndex) {
        if (buttonIndex == 1) {
            
            var postHeadingString = "Check out this look I found on Myavana!";
            
            checkFBLoginStatus(postHeadingString,HLpicName);
        } else {
            profFbImgIndex = 0;
        }
    }
    
    function deleteMyLookConfirm(buttonIndex) {
        if (buttonIndex == 1) {
            deleteMyLook(HLmediaId);
        } else {
            deletePhotoIndex = 0;
        }
    }
    
    function deleteMyLook(id) {
        
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"deleteMyLook.php",
               data: {UID:userArray.uid,media_id:id},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
                   console.log('delete look success');
               
                   if (data.success) {
                   navigator.notification.alert(data.message,deletePhotoIndex = 0,'Myavana','OK');
                   
                   lookPicIndex = 0;
                   profilePageActions();
                   
                   userArray.numberOfLooks = userArray.numberOfLooks - 1;
                   
                   $('#profLooksVal').empty().append(userArray.numberOfLooks);
                   
                   }
                   else{
                   
                   navigator.notification.alert(data.message,deletePhotoIndex = 0,'Myavana','OK');
                   profilePageActions();
                   
                   }
               
               deletePhotoIndex = 0;
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your delete timed out try again with a better connection.',deletePhotoIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your like post failed try again.',deletePhotoIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }    
    
    ///////////////
    
    
    
    ///add the comment button
    var addCommentButton = document.getElementById('addCommentBtn');
    FastClick.attach(addCommentButton);
    
    addCommentButtonIndex = 0;
    
    addCommentButton.addEventListener('click', function(event) {
                                      if (addCommentButtonIndex == 0) {
                                      addCommentButtonIndex = 1;
                                      
                                      addCommentVar = 1;
                                      var comment = document.getElementById('addHLCommentDiv').value;
                                      
                                      
                                      addComment(largePicArray.mediaid,userArray.uid,comment);
                                      
                                      }
                                      }, false);
    
    ///// get the comments
        getComments(largePicArray.mediaid);
    
    ///// fucntion to get Comments
    function getComments(mediaID) {
        //Ajax Post request
        var commentsContainer = document.getElementById('HLcommentDiv');
        
        $.ajax({
               type: 'GET',
               url: myMobileGlobalURL+"getComments.php",
               data: {media_id:mediaID,myUID:userArray.uid},
               timeout:30000,
               dataType: 'json',
               success: function(data) {
               
               $('#HLcommentDiv').empty();
               
               $.each(data, function(i,data)
                      {
                      if(data.length != 0) {
//                      alert(data.profile_photo);
                      
                      if(data.profile_photo == null || data.profile_photo == 'null') {
                            var userPic = 'img/no-photo.png';
                      } else {
                            var userPic = 'http://54.214.19.19/pictures/profilePics/'+data.profile_photo;
                      }
                      
                      if (data.UID != userArray.uid) {
                      var commentBlock =
                      '<div class="myTeaNot" id="myTeaNot">'+
                      '<img src="'+userPic+'" class="teaUserPic"/>'+
                      '<div class="teaDetailsText" id="teaDetailsText">'+
                      '<div style="float:left; width:98%;overflow-y:auto;"><b style="color:black;" id="commentUsernameClick'+i+'">'+data.username+'</b> '+data.comment+'<div style="font-size:80% !important">'+data.upload_time+'</div></div>'+
                      '</div>'+
                      '</div>';
                      
                      $('#HLcommentDiv').append(commentBlock);
                      
                      } else if (data.UID == userArray.uid) {
                      var commentBlock =
                      '<div class="myTeaNot" id="myTeaNot">'+
                      '<img src="'+userPic+'" class="teaUserPic"/>'+
                      '<div class="teaDetailsText" id="teaDetailsText">'+
                      '<div style="float:left; width:92%;overflow-y:auto;"><b style="color:black;" id="commentUsernameClick'+i+'">'+data.username+'</b> '+data.comment+'<div style="font-size:80% !important">'+data.upload_time+'</div></div>'+
                      '<img class="deleteMyCommentImg" id="deleteMyCommentImg'+i+'" src="img/smallCancelX.png"/>'+
                      '</div>'+
                      '</div>';
                      
                      $('#HLcommentDiv').append(commentBlock);
                      
                      var deleteMyCommentImg = document.getElementById('deleteMyCommentImg'+i);
                      FastClick.attach(deleteMyCommentImg);
                      
                      deleteMyCommentImgIndex = 0;
                      
                      deleteMyCommentImg.addEventListener('click', function(event) {
                                                          if (deleteMyCommentImgIndex == 0) {
                                                          deleteMyCommentImgIndex = 1;
                                                          
                                                          navigator.notification.confirm(
                                                                                         'Do you really want to delete this comment?',  // message
                                                                                         deleteMyCommentConfirm,              // callback to invoke with index of button pressed
                                                                                         'Myavana',            // title
                                                                                         ['Delete','Exit']          // buttonLabels
                                                                                         );
                                                          }
                                                          
                                                          }, false);
                      
                      function deleteMyCommentConfirm(buttonIndex) {
                      if (buttonIndex == 1) {
                      deleteMyCommentImgIndex = 0;
                      deleteMyComment(data.comment_id);
                      } else {
                      deleteMyCommentImgIndex = 0;
                      }
                      }
                      
                      function deleteMyComment(id) {
                      
                      $.ajax({
                             type: 'POST',
                             url: myMobileGlobalURL+"removeComment.php",
                             data: {UID:userArray.uid,comment_id:id},
                             dataType: 'json',
                             timeout: 15000,
                             success: function(data) {
                             
                             console.log('delete comment success');
                             
                             if (data.success) {
                             addCommentVar = 1;
                             
                             navigator.notification.alert(data.message,deleteMyCommentImgIndex = 0,'Myavana','OK');
                             
                             getComments(mediaID);
                             }
                             else{
                             
                             navigator.notification.alert(data.message,deleteMyCommentImgIndex = 0,'Myavana','OK');
                             }
                             
                             deleteMyCommentImgIndex = 0;
                             
                             },
                             error: function(xhr, type, error) {
                             if (type === "timeout") {
                             
                             navigator.notification.alert('Your delete timed out try again with a better connection.',deleteMyCommentImgIndex = 0, 'Myavana', 'OK');
                             
                             } else {
                             
                             console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
                             navigator.notification.alert('Your like post failed try again.',deleteMyCommentImgIndex = 0, 'Myavana', 'OK');
                             
                             }
                             }
                             
                             });
                      
                      }
                      
                      }
                      
                      
                      
                      var commentUsernameClick = document.getElementById('commentUsernameClick'+i);
                      FastClick.attach(commentUsernameClick);
                      
                      commentUsernameClickIndex = 0;
                      
                      commentUsernameClick.addEventListener('click', function(event) {
                            if (commentUsernameClickIndex == 0) {
                                                            
                                    commentUsernameClickIndex = 1;
                                    
                                    deleteUnusedIscroll();
                                    ////ADD VAR CHANGE
                                    profileImageViewReturn = "profilepic";
                                                            
                                    if(fromUserLooks == 1) {
                                        console.log('coming from my profile page large image to other user page');
                                        fromLargeProfilePic = 1;
                                    
                                    } 
                                                            
                                    if(data.UID == userArray.uid) {
                                            profilePageActions('headlines');
                                    } else {
                                            otherProfilePageActions(data.UID,'headlines');
                                    }
                                    
                            }
                            }, false);
                      }
                      
                      
                      });
               
               if(addCommentVar == 1) {
               
               myWrapperScroller.refresh().scrollTo(0,0,0);
               }
               
               },
               error: function(xhr, type, error) {
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               
               if (type === "timeout") {
               navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
               } else {
               navigator.notification.alert('There was an error getting comments. Please try again.',none(), 'Myavana', 'OK');
               }
               
               //getUserFriends(userArray.uid);
               }
               });
    }

    //// function to add Commments
    function addComment(mediaid, UID, comment){
        //alert('add comment fired----'+mediaid+'--'+UID);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"postComment.php",
               data: {UID:UID,media_id:mediaid,comment:comment,username:userArray.username},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('post comment success');
               
               if (data.success) {
               console.log('***PUSH SUCCESS - '+data.pushsuccess);
               //userArray.haircategory = editProfHairCat;
               //userArray.aboutMe = editProfAboutMe;
               ////navigator.notification.alert(data.message,none(), 'Myavana', 'OK');
               document.getElementById('addHLCommentDiv').value = "";
               getComments(HLmediaId);
               addCommentButtonIndex = 0;
               
               var count = $('#largeHLCommentCount').html();
               var countNum = parseInt(count);
               countNum = countNum + 1;
               $('#largeHLCommentCount').empty();
               $('#largeHLCommentCount').append(countNum);
               
               }
               else{
               navigator.notification.alert(data.message,addCommentButtonIndex = 0,'Myavana','OK');
               document.getElementById('addHLCommentDiv').value = "";
               }
               
               addCommentButtonIndex = 0;
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your upload timed out try again with a better connection.',addCommentButtonIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your comment post failed try again.',addCommentButtonIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }
    
    //// function to add Commments
    function addBigProfileLike(mediaid,count){
        ////alert('add discover like fired----'+mediaid+'--'+UID);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"postFavorite.php",
               data: {UID:userArray.uid,media_id:mediaid},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('post discover like success');
               
               if(data.success) {
               console.log('***PUSH SUCCESS - '+data.pushsuccess);
                   largePicLikeImgIndex = 0;
                   largePicArray.numOfLikes = data.favoriteCount;
                   $('#largeHLFavCount').empty().append(largePicArray.numOfLikes);
               
               }
               if(!data.success) {
               
                   largePicLikeImgIndex = 0;
                   largePicArray.numOfLikes = data.favoriteCount;
                   $('#largeHLFavCount').empty().append(largePicArray.numOfLikes);
               
               }
               
               
               
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your like timed out try again with a better connection.',largePicLikeImgIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your like post failed try again.',largePicLikeImgIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }
    
    setTimeout(function () {
               console.log('****************view large pic scroller called****************')
               
               myWrapperScroller = new iScroll('myWrapperStd', {hScrollbar: false, vScrollbar: true, vScroll: true});
               $.unblockUI();
               
               }, 1500);
    
    
    
}

var viewLargeProfileBkBtnIndex = 0;

function viewLargeOtherUserProfilePic(HLmediaId,HLusername,HLpicName,HLnumOfComments,HLnumOfLikes,HLcaption) {
    console.log('View Large OTHER Profile Pic Called '+HLmediaId+' '+HLusername+' '+HLpicName+' '+HLnumOfComments+' '+HLnumOfLikes+' '+HLcaption);
    lookPicIndex = 0;
    //myLoading();
    
    largePicArray.mediaid = HLmediaId;
    
    ////this is WEBSITE URL ON DISCOVER
    largePicArray.username = HLusername;
    largePicArray.picurl = HLpicName;
    largePicArray.numOfComments = HLnumOfComments;
    largePicArray.numOfLikes = HLnumOfLikes;
    largePicArray.caption = HLcaption;
    
    
    
    var viewOtherLargeProfilePicture =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-blank-header.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="viewLargeProfileBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'profile\')"></div>'+
    '<div class="HLInputCommentDiv" id="HLInputCommentDiv">'+
    '<input type="text" name="searchInput" class="addHLCommentDiv" id="addHLCommentDiv" placeholder="Add Comment..."/>'+
    '<img src="img/addBtn.png" class="addCommentBtn" id="addCommentBtn"/>'+
    '</div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScrollerCOMMENTPAD" id="myWrapperScrollerCOMMENTPAD">'+
    '<div class="discoveryDetailsPicture" id="discoveryDetailsPicture"><img src="" class="largeHLPic" id="largeHLPic"/></div>'+
    '<div class="HLCaptionDiv" id="HLCaptionDiv">'+
    '<div class="largeHLWebsite" id="largeHLWebsite"></div>'+
    '</div>'+
    '<div class="discoveryDetailsNumDiv" id="discoveryDetailsNumDiv">'+
    '<div class="discCommentCount" id="largeHLCommentCount"></div>'+
    '<img src="img/my-comment-img.png" class="commentCountImg" id="commentCountImg"/>'+
    '<div class="saveCount" id="largeHLFavCount"></div>'+
    '<img src="img/likeImg.png" class="saveCountImg" id="largePicLikeImg"/>'+
    '</div>'+
    '<div class="HLCaptionDiv" id="ProfileLookCaptionDiv">'+
    '<div class="largeOtherProfileCaption" id="largeProfilecaption"></div>'+
    '</div>'+
    '<div class="HLcommentDiv" id="HLcommentDiv">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = viewOtherLargeProfilePicture;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    $('#addHLCommentDiv').blur(function() {
                               
                               if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                               
                               window.scroll(0,0);
                               
                               }
                               
                               });
    
    $('#largeHLPic').attr('src',largePicArray.picurl);
    $('#largeHLCommentCount').empty().append(largePicArray.numOfComments);
    $('#largeHLFavCount').empty().append(largePicArray.numOfLikes);
    $('#largeProfilecaption').empty().append(largePicArray.caption);
    
    ////Add Like Click
    var largePicLikeImg = document.getElementById('largePicLikeImg');
    FastClick.attach(largePicLikeImg);
    
    largePicLikeImgIndex = 0;
    
    largePicLikeImg.addEventListener('click', function(event) {
                                     if(largePicLikeImgIndex == 0) {
                                     largePicLikeImgIndex = 1;
                                     addOtherBigProfileLike(largePicArray.mediaid);
                                     
                                     }
                                     }, false);
    
    ////Add in Back Button
    var viewLargeProfileBkBtn = document.getElementById('viewLargeProfileBkBtn');
    FastClick.attach(viewLargeProfileBkBtn);
    
    viewLargeProfileBkBtnIndex = 0;
    
    viewLargeProfileBkBtn.addEventListener('click', function(event) {
                                           if (viewLargeProfileBkBtnIndex == 0) {
                                           fromUserLooks = 0;
                                           fromLargeProfilePic = 0;
                                           viewLargeProfileBkBtnIndex = 1;
                                           
                                           deleteUnusedIscroll();
                                           
//                                           otherUserUID = uid;
//                                           addLookReturnVar = returnPage;
                                           profileImageViewReturn = "";
                                           
                                           otherProfilePageActions(otherUserUID,addLookReturnVar);
                                           
                                           
                                           }
                                           }, false);
    
    
    ///add the comment button
    var addCommentButton = document.getElementById('addCommentBtn');
    FastClick.attach(addCommentButton);
    
    addCommentButtonIndex = 0;
    
    addCommentButton.addEventListener('click', function(event) {
                                      if (addCommentButtonIndex == 0) {
                                      addCommentButtonIndex = 1;
                                      
                                      addCommentVar = 1;
                                      var comment = document.getElementById('addHLCommentDiv').value;
                                      
                                      
                                      addComment(largePicArray.mediaid,userArray.uid,comment);
                                      }
                                      }, false);
    
    //// function to add Commments
    function addOtherBigProfileLike(mediaid){
        ////alert('add discover like fired----'+mediaid+'--'+UID);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"postFavorite.php",
               data: {UID:userArray.uid,media_id:mediaid},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('post other profile page like success');

               if(data.success) {
               console.log('***PUSH SUCCESS - '+data.pushsuccess);
                   largePicLikeImgIndex = 0;
                   largePicArray.numOfLikes = data.favoriteCount;
                   $('#largeHLFavCount').empty().append(data.favoriteCount);
               
               }
               if(!data.success) {
               
                   largePicLikeImgIndex = 0;
                   largePicArray.numOfLikes = data.favoriteCount;
                   $('#largeHLFavCount').empty().append(data.favoriteCount);
               
               }
               
               
               
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your like timed out try again with a better connection.',largePicLikeImgIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your like post failed try again.',largePicLikeImgIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }

    
    ///// get the comments
    getComments(largePicArray.mediaid);
    
    ///// fucntion to get Comments
    function getComments(mediaID) {
        //Ajax Post request
        var commentsContainer = document.getElementById('HLcommentDiv');
        
        $.ajax({
               type: 'GET',
               url: myMobileGlobalURL+"getComments.php",
               data: {media_id:mediaID,myUID:userArray.uid},
               timeout:30000,
               dataType: 'json',
               success: function(data) {
               
               $('#HLcommentDiv').empty();
               
               $.each(data, function(i,data)
                      {
                      if(data.length != 0) {
//                      alert(data.profile_photo);

                      if(data.profile_photo == null || data.profile_photo == 'null') {
                            var userPic = 'img/no-photo.png';
                      } else {
                            var userPic = 'http://54.214.19.19/pictures/profilePics/'+data.profile_photo;
                      }
                      
                      if (data.UID != userArray.uid) {
                      var commentBlock =
                      '<div class="myTeaNot" id="myTeaNot">'+
                      '<img src="'+userPic+'" class="teaUserPic"/>'+
                      '<div class="teaDetailsText" id="teaDetailsText">'+
                      '<div style="float:left; width:98%;overflow-y:auto;"><b style="color:black;" id="commentUsernameClick'+i+'">'+data.username+'</b> '+data.comment+'<div style="font-size:80% !important">'+data.upload_time+'</div></div>'+
                      '</div>'+
                      '</div>';
                      
                      $('#HLcommentDiv').append(commentBlock);
                      
                      } else if (data.UID == userArray.uid) {
                      var commentBlock =
                      '<div class="myTeaNot" id="myTeaNot">'+
                      '<img src="'+userPic+'" class="teaUserPic"/>'+
                      '<div class="teaDetailsText" id="teaDetailsText">'+
                      '<div style="float:left; width:92%;overflow-y:auto;"><b style="color:black;" id="commentUsernameClick'+i+'">'+data.username+'</b> '+data.comment+'<div style="font-size:80% !important">'+data.upload_time+'</div></div>'+
                      '<img class="deleteMyCommentImg" id="deleteMyCommentImg'+i+'" src="img/smallCancelX.png"/>'+
                      '</div>'+
                      '</div>';
                      
                      $('#HLcommentDiv').append(commentBlock);
                      
                      var deleteMyCommentImg = document.getElementById('deleteMyCommentImg'+i);
                      FastClick.attach(deleteMyCommentImg);
                      
                      deleteMyCommentImgIndex = 0;
                      
                      deleteMyCommentImg.addEventListener('click', function(event) {
                                                          if (deleteMyCommentImgIndex == 0) {
                                                          deleteMyCommentImgIndex = 1;
                                                          
                                                          navigator.notification.confirm(
                                                                                         'Do you really want to delete this comment?',  // message
                                                                                         deleteMyCommentConfirm,              // callback to invoke with index of button pressed
                                                                                         'Myavana',            // title
                                                                                         ['Delete','Exit']          // buttonLabels
                                                                                         );
                                                          }
                                                          
                                                          }, false);
                      
                      function deleteMyCommentConfirm(buttonIndex) {
                      if (buttonIndex == 1) {
                      deleteMyCommentImgIndex = 0;
                      deleteMyComment(data.comment_id);
                      } else {
                      deleteMyCommentImgIndex = 0;
                      }
                      }
                      
                      function deleteMyComment(id) {
                      
                      $.ajax({
                             type: 'POST',
                             url: myMobileGlobalURL+"removeComment.php",
                             data: {UID:userArray.uid,comment_id:id},
                             dataType: 'json',
                             timeout: 15000,
                             success: function(data) {
                             
                             console.log('delete comment success');
                             
                             if (data.success) {
                             addCommentVar = 1;
                             
                             navigator.notification.alert(data.message,deleteMyCommentImgIndex = 0,'Myavana','OK');
                             
                             getComments(mediaID);
                             }
                             else{
                             
                             navigator.notification.alert(data.message,deleteMyCommentImgIndex = 0,'Myavana','OK');
                             }
                             
                             deleteMyCommentImgIndex = 0;
                             
                             },
                             error: function(xhr, type, error) {
                             if (type === "timeout") {
                             
                             navigator.notification.alert('Your delete timed out try again with a better connection.',deleteMyCommentImgIndex = 0, 'Myavana', 'OK');
                             
                             } else {
                             
                             console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
                             navigator.notification.alert('Your like post failed try again.',deleteMyCommentImgIndex = 0, 'Myavana', 'OK');
                             
                             }
                             }
                             
                             });
                      
                      }
                      
                      }
                      
                      
                      
                          var commentUsernameClick = document.getElementById('commentUsernameClick'+i);
                          FastClick.attach(commentUsernameClick);
                          
                          commentUsernameClickIndex = 0;
                          
                          commentUsernameClick.addEventListener('click', function(event) {
                                                                if (commentUsernameClickIndex == 0) {
                                                                
                                                                commentUsernameClickIndex = 1;
                                                                
                                                                deleteUnusedIscroll();
                                                                ////ADD VAR CHANGE
                                                                profileImageViewReturn = "profilepic";
                                                                
                                                                if(data.UID == userArray.uid) {
                                                                profilePageActions('headlines');
                                                                } else {
                                                                otherProfilePageActions(data.UID,'headlines');
                                                                }
                                                                
                                                                }
                                                                }, false);
                      }
                      
                      
                      });
               
               if(addCommentVar == 1) {
               
               myWrapperScroller.refresh().scrollTo(0,0,0);
               }
               
               },
               error: function(xhr, type, error) {
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               
               if (type === "timeout") {
               navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
               } else {
               navigator.notification.alert('There was an error getting comments. Please try again.',none(), 'Myavana', 'OK');
               }
               
               //getUserFriends(userArray.uid);
               }
               });
    }
    
    //// function to add Commments
    function addComment(mediaid, UID, comment){
        //alert('add comment fired----'+mediaid+'--'+UID);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"postComment.php",
               data: {UID:UID,media_id:mediaid,comment:comment,username:userArray.username},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('post comment success');
               
               if (data.success) {
               console.log('***PUSH SUCCESS - '+data.pushsuccess);
               //userArray.haircategory = editProfHairCat;
               //userArray.aboutMe = editProfAboutMe;
               ////navigator.notification.alert(data.message,none(), 'Myavana', 'OK');
               document.getElementById('addHLCommentDiv').value = "";
               getComments(HLmediaId);
               addCommentButtonIndex = 0;
               
               var count = $('#largeHLCommentCount').html();
               var countNum = parseInt(count);
               countNum = countNum + 1;
               $('#largeHLCommentCount').empty();
               $('#largeHLCommentCount').append(countNum);
               
               }
               else{
               navigator.notification.alert(data.message,addCommentButtonIndex = 0,'Myavana','OK');
               document.getElementById('addHLCommentDiv').value = "";
               }
               
               addCommentButtonIndex = 0;
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your upload timed out try again with a better connection.',addCommentButtonIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your comment post failed try again.',addCommentButtonIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }
    
    setTimeout(function () {
               
               
               myWrapperScroller = new iScroll('myWrapperStd', {hScrollbar: false, vScrollbar: true, vScroll: true});
               $.unblockUI();
               }, 700);
    
    
    
}




var editProfPicBtnDivIndex = 0;
var editProfUploadIndex = 0;
var editProfileBkBtnIndex = 0;
var changePasswordBkBtnIndex = 0;
var changePasswordUpdateIndex = 0;
var editProfChangeUsernameIndex = 0;

function editProfileActions() {
    
    
    if (userArray.stylist == true) {
        
        
        var editStylistProfilePage =
        '<div data-role="page"  id="profilePage">'+
        '<div class="container" '+containerStyleVar+'>'+
        '<img src="img/'+deviceSizeFolder+'EditProfileBg.png" class="loginBack"/>'+
        '<div class="profBkBtn" id="editProfileBkBtn"></div>'+
        '<div class="addLookBtn" id="profAddLook" onclick="addNewLook(\'profile\')"></div>'+
        '<div class="myWrapperStd" id="myWrapperStd">'+
        '<div class="myWrapperScroller" id="myWrapperScroller">'+
        '<div class="profUserName" id="editProfUserName"></div>'+
        '<div class="profPicDiv" id="editProfPicDiv"><img src="" class="profilePic" id="editProfPic"/></div>'+
        '<div class="editProfPicDiv" id="editProfPicBtnDiv"><img src="img/editBtn.png" class="editProfilePicBtn"/></div>'+
        '<div class="editProfChangePassword"><u id="editProfChangePassword">Change Password</u> | <u id="editProfChangeUsername">Change Username</u></div>'+
        '<div class="editProfHairCategory" id="editProfHairCategory">ABOUT ME (160 char.)</div>'+
        
        '<textarea rows="3" cols="50" class="editAboutMe" id="editAboutMeStylist" maxlength="160"></textarea>'+
        '<div class="editProfHairCategory" id="editProfHairCategory" style="color:#942c91 !important;font-weight:bold !important">STYLIST INFO</div>'+
        
        '<div class="editProfHairCategory" id="editProfHairCategory" style="color:#942c91 !important;font-size:105% !important;">SPECIALTY</div>'+
        '<div class="editProfStylistSpecialtySelectDiv">'+
        '<select id="editProfStylistSpecialtySelect" data-role="none">'+
        '<option value="" selected="selected">Specialty</option>'+
        '<option value="Custom Color">Custom Color</option>'+
        '<option value="Natural Hair">Natural Hair</option>'+
        '<option value="Signature Cuts">Signature Cuts</option>'+
        '<option value="Straightening Treatments">Straightening Treatments</option>'+
        '<option value="Weave Installation">Weave Installation</option>'+
        '<option value="Other">Other</option>'+
        '</select>'+
        '</div>'+
        
        '<div class="editProfHairCategory" id="editProfHairCategory" style="color:#942c91 !important;font-size:105% !important;">EXPERIENCE</div>'+
        '<div class="editProfStylistSpecialtySelectDiv">'+
        '<select id="editProfStylistExperienceSelect" name="uploadStyleSelect" data-role="none">'+
        '<option value="" selected="selected">Experience</option>'+
        '<option value="1+ yrs">1+ yrs</option>'+
        '<option value="3+ yrs">3+ yrs</option>'+
        '<option value="5+ yrs">5+ yrs</option>'+
        '<option value="10+ yrs">10+ yrs</option>'+
        '<option value="15+ yrs">15+ yrs</option>'+
        '<option value="25+ yrs">25+ yrs</option>'+
        '</select>'+
        '</div>'+
        
        '<div class="editProfHairCategory" id="editProfHairCategory" style="color:#942c91 !important;font-size:105% !important;">Salon</div>'+
        '<input type="text" id="editStylistSalonName" class="editProfileInput" maxlength="60" placeholder="Salon Name"/>'+
        
        '<div class="editProfHairCategory" id="editProfHairCategory" style="color:#942c91 !important;font-size:105% !important;">Phone Number</div>'+
        '<input type="tel" id="editStylistPhone" class="editProfileInput" maxlength="14" placeholder="1-999-999-9999"/>'+
        
        '<div class="editProfHairCategory" id="editProfHairCategory" style="color:#942c91 !important;font-size:105% !important;">Salon Address</div>'+
        '<input type="tel" id="editStylistSalonAddress" class="editProfileInput" maxlength="60" placeholder="Salon Address"/>'+
        
        //'<input type="password" id="newPassword" class="newPassword" maxlength="60" placeholder="New Password"/>'+
        //'<input rows="3" cols="50" class="editAboutMe" id="editAboutMe" maxlength="160"></textarea>'+
        
        '<div class="editProfUpload" id="editProfUpload"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
        

        
        page = editStylistProfilePage;
        slider.slidePage($(page));
        
        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
            
            window.scroll(0,0);
            
        }
        
        $('#editAboutMeStylist').blur(function() {
                                   
                                   if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                   
                                   window.scroll(0,0);
                                   
                                   }
                                   
                                   });
        
        $('#editStylistPhone').blur(function() {
                                    
                                    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                    
                                    window.scroll(0,0);
                                    
                                    }
                                    
                                    });
        
        $('#editStylistSalonName').blur(function() {
                                      
                                      if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                      
                                      window.scroll(0,0);
                                      
                                      }
                                      
                                      });
        
        $('#editStylistSalonAddress').blur(function() {
                                    
                                    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                    
                                    window.scroll(0,0);
                                    
                                    }
                                    
                                    });
        
        
        
        
        console.log("Stylist Specialty, Exp, Salon, Phone, Salon Address: "+' '+userArray.stylistSpecialty+' '+userArray.stylistExperience+' '+userArray.stylistSalonName+' '+userArray.stylistPhone+' '+userArray.stylistSalonAddress);
        
        
        $('#editAboutMeStylist').empty().append(userArray.aboutMe);
        $('#editProfStylistSpecialtySelect').val(userArray.stylistSpecialty);
        $('#editProfStylistExperienceSelect').val(userArray.stylistExperience);
        $('#editStylistSalonName').val(userArray.stylistSalonName);
        
        if (userArray.stylistPhone == null || userArray.stylistPhone == 'null') {
            userArray.stylistPhone = "";
            $('#editStylistPhone').val(userArray.stylistPhone);
        } else {
            $('#editStylistPhone').val(userArray.stylistPhone);
        }
        
        if (userArray.stylistSalonAddress == null || userArray.stylistSalonAddress == 'null') {
            userArray.stylistSalonAddress = "";
            $('#editStylistSalonAddress').val(userArray.stylistSalonAddress);
        } else {
            $('#editStylistSalonAddress').val(userArray.stylistSalonAddress);
        }
        
        
    } else {
        
        var editProfilePage =
        '<div data-role="page"  id="profilePage">'+
        '<div class="container" '+containerStyleVar+'>'+
        '<img src="img/'+deviceSizeFolder+'EditProfileBg.png" class="loginBack"/>'+
        '<div class="profBkBtn" id="editProfileBkBtn"></div>'+
        '<div class="addLookBtn" id="profAddLook" onclick="addNewLook(\'profile\')"></div>'+
        '<div class="myWrapperStd" id="myWrapperStd">'+
        '<div class="myWrapperScroller" id="myWrapperScroller">'+
        '<div class="profUserName" id="editProfUserName"></div>'+
        '<div class="profPicDiv" id="editProfPicDiv"><img src="" class="profilePic" id="editProfPic"/></div>'+
        '<div class="editProfPicDiv" id="editProfPicBtnDiv"><img src="img/editBtn.png" class="editProfilePicBtn"/></div>'+
        '<div class="editProfChangePassword"><u id="editProfChangePassword">Change Password</u> | <u id="editProfChangeUsername">Change Username</u></div>'+
        '<div class="editProfHairCategory" id="editProfHairCategory">ABOUT ME (160 char.)</div>'+
        '<textarea rows="3" cols="50" class="editAboutMe" id="editAboutMe" maxlength="160"></textarea>'+
        '<div class="editProfUpload" id="editProfUpload"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
        
        page = editProfilePage;
        slider.slidePage($(page));
        
        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
            
            window.scroll(0,0);
            
        }
        $('#editAboutMe').empty().append(userArray.aboutMe);
    }
    
    $('#editProfPicDiv').css('width','40%');
    
    $('#editProfUserName').empty().append(userArray.username);
    $('#editProfPic').attr('src',userArray.photo);
//    $('#editProfHairCatSelect').val(userArray.haircategory);
    
    
    var editProfileBkBtn = document.getElementById('editProfileBkBtn');
    FastClick.attach(editProfileBkBtn);
    
    editProfileBkBtnIndex = 0;
    
    editProfileBkBtn.addEventListener('click', function(event) {
                                      if (editProfileBkBtnIndex == 0) {
                                      editProfileBkBtnIndex = 1;
                                      deleteUnusedIscroll();
                                      
                                      profilePageActions('homepage');
                                      }
                                      }, false);
    
    var editProfChangeUsername = document.getElementById('editProfChangeUsername');
    FastClick.attach(editProfChangeUsername);
    
    editProfChangeUsernameIndex = 0;
    
    editProfChangeUsername.addEventListener('click', function(event) {
                                            if (editProfChangeUsernameIndex == 0) {
                                            editProfChangeUsernameIndex = 1;
                                            deleteUnusedIscroll();
                                            
                                            var changePreferences =
                                            '<div data-role="page" >'+
                                            '<div class="container" '+containerStyleVar+'>'+
                                            '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
                                            '<div class="profBkBtn" id="changePrefBkBtn"></div>'+
                                            '<div class="myOptionsSocialH" id="myPreferencesHead"></div>'+
                                            '<input type="text" name="changePrefInput" id="changePrefInput" class="changePref" maxlength="60"/>'+
                                            '<div class="changePrefUpdateBtnDiv" id="changePrefUpdateBtnDiv"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
                                            '</div>'+
                                            '</div>';
                                            
                                            slider.slidePage($(changePreferences));
                                            
                                            if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                            
                                            window.scroll(0,0);
                                            
                                            }
                                            
                                            $('#myPreferencesHead').empty().append('CHANGE USERNAME');
                                            $('#changePrefInput').val(userArray.username);
                                            
                                            
                                            var changePrefBkBtn = document.getElementById('changePrefBkBtn');
                                            FastClick.attach(changePrefBkBtn);
                                            
                                            changePasswordBkBtnIndex = 0;
                                            
                                            changePrefBkBtn.addEventListener('click', function(event) {
                                                                             if (changePasswordBkBtnIndex == 0) {
                                                                             changePasswordBkBtnIndex = 1;
                                                                             
                                                                             editProfileActions();
                                                                             }
                                                                             }, false);

                                            var changeUsernameUpdate = document.getElementById('changePrefUpdateBtnDiv');
                                            FastClick.attach(changeUsernameUpdate);
                                            
                                            changePrefUpdateBtnDivIndex = 0;
                                            
                                            changeUsernameUpdate.addEventListener('click', function(event) {
                                                                                  if (changePasswordUpdateIndex == 0) {
                                                                                  changePrefUpdateBtnDivIndex = 1;
                                                                                  
                                                                                  var userUsernameInput = $('#changePrefInput').val();
                                                                                  
                                                                                  submitUsernameChange(userUsernameInput);
                                                                                  
                                                                                  
                                                                                  }
                                            }, false);
                                            
                                            
                                            
                                            
                                            }
                                            }, false);
    
    
    function submitUsernameChange(input) {
        
        if ( (input != userArray.username) && (input.length > 5) ) {
            
            $.ajax({
                   type: 'POST',
                   url: myMobileGlobalURL+"submitChangeUsername.php",
                   data: {uid:userArray.uid,username:input},
                   dataType: 'json',
                   timeout: 15000,
                   success: function(data) {
                   
                   console.log('Edit Username Success');
//                   alert(data.success);
                   if (data.success) {
                   changePrefUpdateBtnDivIndex = 0;
                   userArray.username = input;
                   window.localStorage["username"] = input;
                   
                   
                   navigator.notification.alert(data.comment,profilePageActions(addLookReturnVar), 'Myavana', 'OK');
                   } else {
                   navigator.notification.alert(data.comment,changePrefUpdateBtnDivIndex = 0,'Myavana','OK');
                   }
                   
                   },
                   error: function(xhr, type, error) {
                   if (type === "timeout") {
                   
                   changePrefUpdateBtnDivIndex = 0;
                   navigator.notification.alert('Your upload timed out try again with a better connection.',editProfileActions(), 'Myavana', 'OK');
                   
                   } else {
                   
                   changePrefUpdateBtnDivIndex = 0;
                   console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
                   navigator.notification.alert('Your look upload failed try again.',editProfileActions(), 'Myavana', 'OK');
                   
                   }
                   }
                   });
            
            
        } else {
            navigator.notification.alert('You must either change your username or enter a valid 5 or more character username.',changePrefUpdateBtnDivIndex = 0, 'Myavana', 'OK');
        }
        
    }


    
    
    /////////////////////////////////////////////////////////
    
    
    
    var editProfChangePassword = document.getElementById('editProfChangePassword');
    FastClick.attach(editProfChangePassword);
    
    editProfChangePasswordIndex = 0;
    
    editProfChangePassword.addEventListener('click', function(event) {
                                      if (editProfChangePasswordIndex == 0) {
                                            editProfChangePasswordIndex = 1;
                                            deleteUnusedIscroll();
                                            
                                            
                                            var changePasswordPage =
                                            '<div data-role="page" >'+
                                            '<div class="container" '+containerStyleVar+'>'+
                                            '<img src="img/'+deviceSizeFolder+'myoptionsBg.png" class="loginBack"/>'+
                                            '<div class="profBkBtn" id="changePasswordBkBtn"></div>'+
                                            '<div class="myOptionsSocialH" id="myPreferencesHead">Change Password</div>'+
                                            '<input type="password" id="oldPassword" class="oldPassword" maxlength="60" placeholder="Old Password"/>'+
                                            '<input type="password" id="newPassword" class="newPassword" maxlength="60" placeholder="New Password"/>'+
                                            '<div class="changePasswordUpdate" id="changePasswordUpdate"><img src="img/updateProfileSettings.png" class="editProfilePicBtn"/></div>'+
                                            '</div>'+
                                            '</div>';
                                            
                                            slider.slidePage($(changePasswordPage));
                                            
                                            if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                            
                                            window.scroll(0,0);
                                            
                                            }
                                            
                                            $('#oldPassword').blur(function() {
                                                                          
                                                                          if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                                                          
                                                                          window.scroll(0,0);
                                                                          
                                                                          }
                                                                          
                                                                          });
                                            
                                            $('#newPassword').blur(function() {
                                                                   
                                                                   if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                                                                   
                                                                   window.scroll(0,0);
                                                                   
                                                                   }
                                                                   
                                                                   });
                                            
                                            var changePasswordBkBtn = document.getElementById('changePasswordBkBtn');
                                            FastClick.attach(changePasswordBkBtn);
                                            
                                            changePasswordBkBtnIndex = 0;
                                            
                                            changePasswordBkBtn.addEventListener('click', function(event) {
                                                                              if (changePasswordBkBtnIndex == 0) {
                                                                                  changePasswordBkBtnIndex = 1;
                                                                                  
                                                                                    editProfileActions();
                                                                              }
                                                                              }, false);
                                            
                                            var changePasswordUpdate = document.getElementById('changePasswordUpdate');
                                            FastClick.attach(changePasswordUpdate);
                                            
                                            changePasswordUpdateIndex = 0;
                                            
                                            changePasswordUpdate.addEventListener('click', function(event) {
                                                             if (changePasswordUpdateIndex == 0) {
                                                             changePasswordUpdateIndex = 1;
                                                              
                                                              var oldPassword = $('#oldPassword').val();
                                                              var newPassword = $('#newPassword').val();
                                                              
                                                                  if ((oldPassword != userArray.password)) {
                                                                        navigator.notification.alert('Your old password must match your current password make sure it is correct and try again.',changePasswordUpdateIndex = 0, 'Myavana', 'OK');
                                                                  } else if ((oldPassword == "" || newPassword == "")) {
                                                                             navigator.notification.alert('To change password you must enter your current password and a new password.',changePasswordUpdateIndex = 0, 'Myavana', 'OK');
                                                                  } else if (oldPassword == newPassword) {
                                                                  
                                                                        navigator.notification.alert('Your new password and old password can not match.',changePasswordUpdateIndex = 0, 'Myavana', 'OK');
                                                                  } else if (!validation.isValidPassword(newPassword)) {
                                                                  
                                                                      navigator.notification.vibrate(2000);
                                                                      navigator.notification.alert('Please enter a valid 6 character Password.', changePasswordUpdateIndex = 0, 'Myavana', 'OK');
                                                                      
                                                                  
                                                                  } else {
                                          
                                                                        submitChangePassword(newPassword);
                                                                  }
                                             
                                                            
                                                        }
                                             }, false);
                                            
                                            
                                            

                                      }
                                      }, false);
    
    ///////////////////--------------------------------------
function submitChangePassword(newPassword) {
//    alert(newPassword);
    
    $.ajax({
           type: 'POST',
           url: myMobileGlobalURL+"submitChangePassword.php",
           data: {uid:userArray.uid,password:newPassword},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           
           console.log('Edit Password Success');
           changePasswordUpdateIndex = 0;
           
           if (data.success) {
             userArray.password = newPassword;
             window.localStorage["password"] = newPassword;
           navigator.notification.alert(data.comment,profilePageActions(), 'Myavana', 'OK');
           } else {
           navigator.notification.alert(data.comment,changePasswordUpdateIndex = 0,'Myavana','OK');
           }
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           changePrefUpdateBtnDivIndex = 0;
           navigator.notification.alert('Your change timed out try again with a better connection.',changePasswordUpdateIndex = 0, 'Myavana', 'OK');
           
           } else {
           changePasswordUpdateIndex = 0;
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           navigator.notification.alert('Your change failed try again.',changePasswordUpdateIndex = 0, 'Myavana', 'OK');
           
           }
           }
           });

    
}



    function submitChangeUsername(newUsername) {
//        alert(newPassword);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"submitChangePassword.php",
               data: {uid:userArray.uid,password:newPassword},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('Edit Password Success');
               changePasswordUpdateIndex = 0;
               
               if (data.success) {
               userArray.password = newPassword;
               window.localStorage["password"] = newPassword;
               navigator.notification.alert(data.comment,profilePageActions(), 'Myavana', 'OK');
               } else {
               navigator.notification.alert(data.comment,changePasswordUpdateIndex = 0,'Myavana','OK');
               }
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               changePrefUpdateBtnDivIndex = 0;
               navigator.notification.alert('Your change timed out try again with a better connection.',changePasswordUpdateIndex = 0, 'Myavana', 'OK');
               
               } else {
               changePasswordUpdateIndex = 0;
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your change failed try again.',changePasswordUpdateIndex = 0, 'Myavana', 'OK');
               
               }
               }
               });
        
        
    }










    ///////////////////////////////--------------------------------








    var editProfPicBtnDiv = document.getElementById('editProfPicBtnDiv');
    FastClick.attach(editProfPicBtnDiv);

    editProfPicBtnDivIndex = 0;

    editProfPicBtnDiv.addEventListener('click', function(event) {
                                       if (editProfPicBtnDivIndex == 0) {
                                       editProfPicBtnDivIndex = 1;
                                       
                                       navigator.notification.confirm(
                                                                      'Upload Picture',  // message
                                                                      onProfilePicUpload,              // callback to invoke with index of button pressed
                                                                      'Myavana',            // title
                                                                      ['Camera','Gallery','Exit']          // buttonLabels
                                                                      );
                                       }
                                       }, false);
    
    var editProfUpload = document.getElementById('editProfUpload');
    FastClick.attach(editProfUpload);
    
    editProfUploadIndex = 0;
    
    editProfUpload.addEventListener('click', function(event) {
                                    if (editProfUploadIndex == 0) {
                                            editProfUploadIndex = 1;
                                        if (userArray.stylist == 1 || userArray.stylist == '1') {
                                            
                                            var changeAboutMeStylist = $('#editAboutMeStylist').val();
                                            var changeStylistSpec = $('#editProfStylistSpecialtySelect').val();
                                            var changeStylistExp = $('#editProfStylistExperienceSelect').val();
                                            var changeStylistSalon = $('#editStylistSalonName').val();
                                            var changeStylistPhone = $('#editStylistPhone').val();
                                            var changeStylistAddress = $('#editStylistSalonAddress').val();
                                    
                                            console.log('About Me, Specialty, Experience, Salon, Phone, Address '+changeAboutMeStylist+', '+changeStylistSpec+', '+changeStylistExp+', '+changeStylistSalon+', '+changeStylistPhone+', '+changeStylistAddress);
                                            
                                            submitProfileUpdate(changeAboutMeStylist,changeStylistSpec,changeStylistExp,changeStylistSalon,changeStylistPhone,changeStylistAddress);
                                    
                                        } else {
                                            var changeAboutMe = $('#editAboutMe').val();
                                            
                                            if((changeAboutMe == userArray.aboutMe)) {
                                                    //NO CHANGE DO NOTHING
                                                    editProfUploadIndex = 0;
                                            } else if ((changeAboutMe != userArray.aboutMe)) {
                                                    editProfUploadIndex = 1;
                                                    submitProfileUpdate(changeAboutMe,"","","","","");
                                            }
                                        }
                                    
                                    }
                                    }, false);
    
    setTimeout(function () {
               
               myWrapperScroller = new iScroll('myWrapperStd', {hScrollbar: false, vScrollbar: true, vScroll: true});
               
    }, 700);
    
}

function submitProfileUpdate(editProfAboutMe,stylistSpec,stylistExp,stylistSalon,stylistPhone,stylistAddress) {
    
    $.ajax({
           type: 'POST',
           url: myMobileGlobalURL+"submitProfileChange.php",
           data: {uid:userArray.uid,aboutme:editProfAboutMe,stylistSpecialty:stylistSpec, stylistExperience:stylistExp,stylistSalon:stylistSalon,stylistPhone:stylistPhone,stylistAddress:stylistAddress},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           
           console.log('Edit Profile Success');
           
           
               if (data.success) {
                    userArray.aboutMe = editProfAboutMe;
                    userArray.stylistSpecialty = stylistSpec;
                    userArray.stylistExperience = stylistExp;
                    userArray.stylistSalonName = stylistSalon;
                    userArray.stylistPhone = stylistPhone;
                    userArray.stylistSalonAddress = stylistAddress;
                   
                    navigator.notification.alert(data.comment,editProfUploadIndex = 0, 'Myavana', 'OK');
               } else {
                    navigator.notification.alert(data.comment,editProfUploadIndex = 0,'Myavana','OK');
               }
           
           editProfUploadIndex = 0;
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           
           navigator.notification.alert('Your upload timed out try again with a better connection.',editProfUploadIndex = 0, 'Myavana', 'OK');
           
           } else {
           
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           navigator.notification.alert('Your look upload failed try again.',editProfUploadIndex = 0, 'Myavana', 'OK');
           
           }
           }
           });
    
}

function onProfilePicUpload(buttonIndex) {
    ////Camera Upload Selected
    if (buttonIndex == 1) {
        imageUpload = 'profile';
        take_pic();
        
    }////Gallery Upload Select
    else if (buttonIndex == 2) {
        imageUpload = 'profile';
        album_pic();
    } else {
        editProfPicBtnDivIndex = 0;
    }
}

var sendPhotoIndex = 0;
var cancelPhotoIndex = 0;

function getProfilePhotoSuccess() {
    deleteUnusedIscroll();
    //    alert('get profile photo success');
    
    var photoUpload =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myCropPgBG.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="cancelImage"></div>'+
    '<div class="submitLookBtn" id="submitImage" ></div>'+
    
    '<div class="myWrapperStd" id="photoWrapper" >'+
    '<div id="myWrapperScrollerNOPAD" style="width:100%;">'+
    '<div class="imageDiv" id="imageDiv" style="background-color:#000;">'+
    '<img id="uploadedImg" "src=""/>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = photoUpload;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    $('#imageDiv').css("height", scrollHeight);
    
    var sendPhoto = document.getElementById('submitImage');
    var cancelPhoto = document.getElementById('cancelImage');
    
    FastClick.attach(sendPhoto);
    FastClick.attach(cancelPhoto);
    
    sendPhotoIndex = 0;
    cancelPhotoIndex = 0;
    
    sendPhoto.addEventListener('click', function(event) {
                               if(sendPhotoIndex == 0) {
                               sendPhotoIndex = 1;
                               myLoading();
                               checkCoords();
                               }
                               }, false);
    
    cancelPhoto.addEventListener('click', function(event) {
                                 ////add checks for before or after image and go back to the right page on cancel
                                 if(cancelPhotoIndex == 0) {
                                 cancelPhotoIndex = 1;
                                 editProfileActions();
                                 }
                                 }, false);
    
}

////Profile Photo Change Success and Failure Functions
var tempAfterImageLocation;
function winP(r) {
    
    console.log("Code = " + r.responseCode.toString()+"\n");
    console.log("Response = " + r.response.toString()+"\n");
    console.log("Sent = " + r.bytesSent.toString()+"\n");
    var profileImageUploadResp = r.response;
    //    alert(afterImageUploadResp);
    var profileTempStringJsonArray = jQuery.parseJSON(profileImageUploadResp);
    
    console.log('original photo url: '+userArray.photo+' new user photo link: '+profileTempStringJsonArray.fileURL);
    
    userArray.photo = profileTempStringJsonArray.fileURL;
    
    $.unblockUI();
    editProfileActions();
    
}

function failP(error) {
    
    //alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
    navigator.notification.alert('Profile Image Failed To Upload! Try again.',editProfileActions(), 'Myavana', 'OK');
    
    
}

var profFbImgIndex = 0;
var profTwitterImgIndex = 0;
var cancelProfileLargePhotoIndex = 0;
var deletePhotoIndex = 0;

function viewLargePhoto(photoURL,caption,mediaid,likes,datecreated,profUserName,totalcomments) {
    
    document.getElementById('bigPhotoOverlay').style.display='block';
    document.getElementById('fadeMe').style.display='block';
    
    var bigPhotoDiv =
    '<div class="largeViewDiv" id="largeViewDiv">'+
    '<div class="profileLookUsername" id="profileLookUsername">'+profUserName+'</div>'+
    '<img class="cancelProfileLargePhoto" id="cancelProfileLargePhoto" src="img/smallCancelX.png"/>'+
    '<img src="'+photoURL+'" class="bigPreviewPhoto" id="bigPreviewPhoto"/>'+
    '</div>'+
    '<div class="hlPicGroupNumDiv" id="hlPicGroupNumDiv">'+
    '<div class="commentCount" id="commentCount">'+totalcomments+'</div>'+
    '<img src="img/my-comment-img.png" class="commentCountImg" id="commentCountImg"/>'+
    '<div class="saveCount" id="saveCount">'+likes+'</div>'+
    '<img src="img/likeImg.png" class="saveCountImg" id="saveCountImg"/>'+
    '<div class="deletePhotoBtnDiv">'+
    '<img src="img/myDeleteImg.png" id="deleteUserLook" class="profileFollowBtn"/>'+
    '</div>'+
    '<div class="profPhotoPrevCapDiv" id="profPhotoPrevCapDiv">'+
    '<div class="hlPicGroupCaption" id="hlPicGroupCaption">'+caption+'</div>'+
    '</div>'+
    '<div class="profPhotoCommentDiv" id="profPhotoCommentDiv">'+
    '<div class="profPhotoCommentBtn" id="profPhotoCommentBtn">comments</div>'+
    '<img src="img/myTwitterIcon.png" class="twitterImg" id="profTwitterImg"/>'+
    '<img src="img/myFBicon.png" class="fbImg" id="profFbImg"/>'+
    '</div>';
    
    $('#bigPhotoOverlay').empty().append(bigPhotoDiv);
    
    var profFbImg = document.getElementById('profFbImg');
    FastClick.attach(profFbImg);
    
    profFbImgIndex = 0;
    
    profFbImg.addEventListener('click', function(event) {
                               if (profFbImgIndex == 0) {
                               profFbImgIndex = 1;
                               
                               navigator.notification.confirm(
                                                              'Do you want to share this Look on Facebook?',  // message
                                                              facebookPhotoShare,              // callback to invoke with index of button pressed
                                                              'Myavana',            // title
                                                              ['Facebook','Exit']          // buttonLabels
                                                              );
                               
                               }
                               
                               }, false);
    
    var deleteUserLook = document.getElementById('deleteUserLook');
    FastClick.attach(deleteUserLook);
    
    deletePhotoIndex = 0;
    
    deleteUserLook.addEventListener('click', function(event) {
                                    if (deletePhotoIndex == 0) {
                                    deletePhotoIndex = 1;
                                    
                                    navigator.notification.confirm(
                                                                   'Do you really want to delete this Look?',  // message
                                                                   deleteMyLookConfirm,              // callback to invoke with index of button pressed
                                                                   'Myavana',            // title
                                                                   ['Delete','Exit']          // buttonLabels
                                                                   );
                                    }
                                    
                                    }, false);
    
    //////Twitter
    
    var profTwitterImg = document.getElementById('profTwitterImg');
    FastClick.attach(profTwitterImg);
    
    profTwitterImgIndex = 0;
    
    profTwitterImg.addEventListener('click', function(event) {
                                    if (profTwitterImgIndex == 0) {
                                    profTwitterImgIndex = 1;
                                    //alert('fb button image share clicked');
                                    navigator.notification.confirm(
                                                                   'Do you want to share this Look on Twitter?',  // message
                                                                   twitterPhotoShare,              // callback to invoke with index of button pressed
                                                                   'Myavana',            // title
                                                                   ['Twitter','Exit']          // buttonLabels
                                                                   );
                                    
                                    }
                                    
                                    }, false);
    
    
    function twitterPhotoShare(buttonIndex) {
        if (buttonIndex == 1) {
            
            var postHeadingString = "Check out this look I found on Myavana!";
            profTwitterImgIndex = 0;
            
            TwitterDemo.isSetup2(postHeadingString,photoURL);
        } else {
            profTwitterImgIndex = 0;
        }
    }
    
    function facebookPhotoShare(buttonIndex) {
        if (buttonIndex == 1) {
            
            var postHeadingString = "Check out this look I found on Myavana!";
            
            checkFBLoginStatus(postHeadingString,photoURL);
        } else {
            profFbImgIndex = 0;
        }
    }
    
    function deleteMyLookConfirm(buttonIndex) {
        if (buttonIndex == 1) {
            deleteMyLook(mediaid);
        } else {
            deletePhotoIndex = 0;
        }
    }
    
    function deleteMyLook(id) {
        
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"deleteMyLook.php",
               data: {UID:userArray.uid,media_id:id},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('delete look success');
               
               if (data.success) {
               navigator.notification.alert(data.message,deletePhotoIndex = 0,'Myavana','OK');
               
               lookPicIndex = 0;
               document.getElementById('bigPhotoOverlay').style.display='none';
               document.getElementById('fadeMe').style.display='none';cument.getElementById('fadeMe').style.display='none';
               
               getUserLooks(userArray.uid);
               }
               else{
               
               navigator.notification.alert(data.message,deletePhotoIndex = 0,'Myavana','OK');
               }
               
               deletePhotoIndex = 0;
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your delete timed out try again with a better connection.',deletePhotoIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your like post failed try again.',deletePhotoIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }
    ////////close
    var cancelProfileLargePhoto = document.getElementById('cancelProfileLargePhoto');
    FastClick.attach(cancelProfileLargePhoto);
    
    cancelProfileLargePhotoIndex = 0;
    
    cancelProfileLargePhoto.addEventListener('click', function(event) {
                                             if (cancelProfileLargePhotoIndex == 0) {
                                             //cancelProfileLargePhotoIndex = 1;
                                             lookPicIndex = 0;
                                             document.getElementById('bigPhotoOverlay').style.display='none';
                                             document.getElementById('fadeMe').style.display='none';
                                             }
                                             }, false);
    
    
    var fadeMe = document.getElementById('fadeMe');
    FastClick.attach(fadeMe);
    
    var fadeMeIndex = 0;
    
    fadeMe.addEventListener('click', function(event) {
                            if (fadeMeIndex == 0) {
                            ////fadeMeIndex = 1;
                            lookPicIndex = 0;
                            document.getElementById('bigPhotoOverlay').style.display='none';
                            document.getElementById('fadeMe').style.display='none';
                            }
                            }, false);
}

function viewOtherLargePhoto(photoURL,caption,mediaid,likes,datecreated,profUserName,totalcomments) {
    
    document.getElementById('bigPhotoOverlay').style.display='block';
    document.getElementById('fadeMe').style.display='block';
    
    var bigPhotoDiv =
    '<div class="largeViewDiv" id="largeViewDiv">'+
    '<div class="profileLookUsername" id="profileLookUsername">'+profUserName+'</div>'+
    '<img class="cancelProfileLargePhoto" id="cancelProfileLargePhoto" src="img/smallCancelX.png"/>'+
    '<img src="'+photoURL+'" class="bigPreviewPhoto" id="bigPreviewPhoto"/>'+
    '</div>'+
    '<div class="hlPicGroupNumDiv" id="hlPicGroupNumDiv">'+
    '<div class="commentCount" id="commentCount">'+totalcomments+'</div>'+
    '<img src="img/my-comment-img.png" class="commentCountImg" id="commentCountImg"/>'+
    '<div class="saveCount" id="saveCount">'+likes+'</div>'+
    '<img src="img/likeImg.png" class="saveCountImg" id="saveCountImg"/>'+
    '</div>'+
    '<div class="profPhotoPrevCapDiv" id="profPhotoPrevCapDiv">'+
    '<div class="hlPicGroupCaption" id="hlPicGroupCaption">'+caption+'</div>'+
    '</div>'+
    '<div class="profPhotoCommentDiv" id="profPhotoCommentDiv">'+
    '<div class="profPhotoCommentBtn" id="profPhotoCommentBtn">comments</div>'+
    '</div>';
    
    $('#bigPhotoOverlay').empty().append(bigPhotoDiv);
    
    ////////close
    var cancelProfileLargePhoto = document.getElementById('cancelProfileLargePhoto');
    FastClick.attach(cancelProfileLargePhoto);
    
    cancelProfileLargePhotoIndex = 0;
    
    cancelProfileLargePhoto.addEventListener('click', function(event) {
                                             if (cancelProfileLargePhotoIndex == 0) {
                                             //cancelProfileLargePhotoIndex = 1;
                                             lookPicIndex = 0;
                                             document.getElementById('bigPhotoOverlay').style.display='none';
                                             document.getElementById('fadeMe').style.display='none';
                                             }
                                             }, false);
    
    
    var fadeMe = document.getElementById('fadeMe');
    FastClick.attach(fadeMe);
    
    var fadeMeIndex = 0;
    
    fadeMe.addEventListener('click', function(event) {
                            if (fadeMeIndex == 0) {
                            ////fadeMeIndex = 1;
                            lookPicIndex = 0;
                            document.getElementById('bigPhotoOverlay').style.display='none';
                            document.getElementById('fadeMe').style.display='none';
                            }
                            }, false);
}


var gfBkBtnIndex = 0;
var girlfriendsBackVar = "";

function girlfriendsPageAction() {
    //deleteUnusedIscroll();
    
    addLookReturnVar = 'girlfriends';
    
    var girlfriendsPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<div class="findFriendsDropDown" id="findFriendsDropDown"></div>'+
    '<img src="img/'+deviceSizeFolder+'girlfriendsPgBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="gfBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'girlfriends\')"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '<div class="friendsSearchBox" id="searchBox">'+
        '<input type="text" name="searchInput" class="friendSearchInput" id="friendSearchInput" placeholder="Find Friends..."/>'+
        '<div class="cancelSearchImg" id="searchImg">'+
        '<img class="smallSearchCancel" id="cancelfriendSearchImg" src="img/smallCancelX.png"/>'+
        '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
//    console.log(girlfriendsPage);
    
    page = girlfriendsPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    myLoading();
    
    var gfBkBtn = document.getElementById('gfBkBtn');
    FastClick.attach(gfBkBtn);
    
    gfBkBtnIndex = 0;
    
    gfBkBtn.addEventListener('click', function(event) {
                             if (gfBkBtnIndex == 0) {
                             gfBkBtnIndex = 1;
                             deleteUnusedIscroll();
                             
                             if (girlfriendsBackVar == "" || girlfriendsBackVar != "profilepage") {
                                    homePageActions();
                             } else if (girlfriendsBackVar == "profilepage") {
                                    profilePageActions();
                             } else {
                                    homePageActions();
                             }
                                
                             
                             }
                             }, false);
    
    setTimeout(function () {
               getMyFriends();
               }, 500);
    
}

var myGFDetailsTextIndex = 0;
var unfollowGFBtnDivIndex = 0;

function getFriendRequest() {
    //Ajax Post request
    userFriendRows = "";
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getFollowing.php",
           data: {UID:userArray.uid},
           timeout:30000,
           dataType: 'json',
           success: function(data) {
           if(data.followers==""){
           $('#myWrapperScroller').append('<div class="hlPicGroupNone" id="hlPicGroupNone">You are not following any girlfriends.</div>');
           }
           else
           {
           $.each(data.followers, function(i,data)
                  {
                  
                  if(data.friend_pic == null || data.friend_pic == 'null' || data.friend_pic == '') {
                  var friendPic = 'img/no-photo.png';
                  } else {
                  var friendPic = 'http://54.214.19.19/pictures/profilePics/'+data.friend_pic;
                  }
                  
                  var nextFriend =
                  '<div class="myGFDiv" id="myGFDiv">'+
                  '<img src="'+friendPic+'" class="teaUserPic"/>'+
                  '<div class="myGFDetailsText" id="myGFDetailsText'+i+'">'+
                  '<b style="color:black;">'+data.fullName+'</b><br>'+data.username+
                  '</div>'+
                  '<div class="myGFBtnDiv" id="unfollowGFBtnDiv'+i+'"><img src="img/following.png" class="friendBtnBG"/></div>'+
                  '</div>';
                  
                  $('#myWrapperScroller').append(nextFriend);
                  
                  //                  userFriendRows = userFriendRows + nextFriend;
                  
                  var unfollowGFBtnDiv = document.getElementById('unfollowGFBtnDiv'+i);
                  FastClick.attach(unfollowGFBtnDiv);
                  
                  unfollowGFBtnDivIndex = 0;
                  
                  unfollowGFBtnDiv.addEventListener('click', function(event) {
                                                    if (unfollowGFBtnDivIndex == 0) {
                                                    unfollowGFBtnDivIndex = 1;
                                                    
                                                    wrapperScrollX = myWrapperScroller.x;
                                                    wrapperScrollY = myWrapperScroller.y;
                                                    console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                                    
                                                    unfollowUserGirlfriend(data.friend_UID);
                                                    
                                                    
                                                    }
                                                    }, false);
                  
                  
                  var myGFDetailsText = document.getElementById('myGFDetailsText'+i);
                  FastClick.attach(myGFDetailsText);
                  
                  myGFDetailsTextIndex = 0;
                  
                  myGFDetailsText.addEventListener('click', function(event) {
                                                   if (myGFDetailsTextIndex == 0) {
                                                   myGFDetailsTextIndex = 1;
                                                   
                                                   wrapperScrollX = myWrapperScroller.x;
                                                   wrapperScrollY = myWrapperScroller.y;
                                                   console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                                   
                                                   deleteUnusedIscroll();
                                                   
                                                   if(data.friend_UID == userArray.uid) {
                                                   profilePageActions('headlines');
                                                   } else {
                                                   otherProfilePageActions(data.friend_UID,'girlfriends');
                                                   }
                                                   
                                                   }
                                                   }, false);
                  
                  });
           
           }
           
           //           $('#myWrapperScroller').append(userFriendRows);
           
           //getUserFriends(userArray.uid);
           setTimeout(function () {
//                      alert('call iscroll shit');
//                      alert($('#myWrapperScroller').outerHeight(true));
                      
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScrollbar: false, vScrollbar: true, vScroll: true, bounce:true});
                      
                      if (wrapperScrollY != 0) {
                          console.log('wrapper scroller y = '+wrapperScrollY);
                          myWrapperScroller.scrollTo(wrapperScrollX, -wrapperScrollY, 100,true);
                      }
                      
                      $.unblockUI();
                      
                      }, 1000);
           
           },
           error: function(xhr, type, error) {
           
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',none(), 'Myavana', 'OK');
           }
           //getUserFriends(userArray.uid);
           }
           });
}

function getUserFriends(UID) {
    //Ajax Post request
    userFriendRows = "";
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getFriends.php",
           data: {UID:UID},
           timeout:30000,
           dataType: 'json',
           success: function(data) {
           if(data.friends==""){
           $('#myWrapperScroller').append("<div style='font-size:90%; width:100%;'>No friends</div>");
           }
           else
           {
           var numberOfFriends = data.friends.length;
           
           $.each(data.friends, function(i,data)
                  {
                  
                  if(data.friend_pic == null || data.friend_pic == 'null') {
                  var friendPic = 'img/no-photo.png';
                  } else {
                  var friendPic = 'http://54.214.19.19/pictures/profilePics/'+data.friend_pic;
                  }
                  
                  var nextFriend =
                  '<div class="myGFDiv" id="myGFDiv">'+
                  '<img src="'+friendPic+'" class="teaUserPic"/>'+
                  '<div class="myGFDetailsText" id="myGFDetailsText">'+
                  '<b style="color:black;">'+data.fullName+'</b><br>'+data.username+
                  '</div>'+
                  '<div class="myGFBtnDiv" id="myGFBtnDiv"><img src="img/'+data.buttonId+'" class="friendBtnBG"/></div>'+
                  '</div>';
                  
                  userFriendRows = userFriendRows + nextFriend;
                  
                  });
           }
           
           $('#myWrapperScroller').append(userFriendRows);
           
           setTimeout(function () {
                      
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScrollbar: false, vScrollbar: true, vScroll: true, bounce:false});
                      $.unblockUI();
                      
                      }, 100);
           
           },
           error: function(xhr, type, error) {
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',none(), 'Myavana', 'OK');
           }
           }
           });
    
}

var userFriendRows;
var cancelfriendSearchImgIndex = 0;

function getMyFriends(){
    console.log('get my girlfriends page called');
    myLoading();
    carFriendsBtnIndex = 0;
    
    $('#myWrapperScroller').empty();
    
    var searchDiv =
    '<div class="friendsSearchBox" id="searchBox">'+
    '<div class="cancelSearchImg" id="searchImg">'+
        '<img class="smallSearchCancel" id="cancelfriendSearchImg" src="img/smallCancelX.png"/>'+
    '</div>'+
    '<input type="text" name="searchInput" class="friendSearchInput" id="friendSearchInput" placeholder="Find girlfriends..."/>'+
    '<div class="friendSearchImg" id="searchImg">'+
        '<img class="smallSearchCancel" id="friendSearchImg" src="img/magnifyingglass.png"/>'+
    '</div>'+
    '</div>';
    
    $('#myWrapperScroller').append(searchDiv);
    
    $('#friendSearchInput').blur(function() {
                        
                        if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                        
                        window.scroll(0,0);
                        
                        }
                        
                        });
    
    ////********************/////
    
    $('#friendSearchInput').keyup(function(e) {
//                                  console.log('find friends called');
                                  var searchField = $('#friendSearchInput').val();
                                  if (searchField == '') {
                                  $('#findFriendsDropDown').css('height','0px').css('border','0px transparent');
                                  } else {
                                  $('#findFriendsDropDown').empty();
                                  $('#findFriendsDropDown').css('height','40%').css('border','1px solid #000');
                                  
                                  var check = 1;
                                  //// function to grab all of the friends
                                  var searchField = $('#friendSearchInput').val();
                                  if (check == 1) {
                                  check = 0;
                                  $.getJSON(myMobileGlobalURL+"getUsersMobile.php",{field:searchField,UID:userArray.uid},function(data){
                                            $.each(data.users, function(i,data)
                                                   {
//                                                   console.log('user name: '+data.username);
                                                   
                                                   $('#findFriendsDropDown').append(
                                                                                    "<li id='userSearch"+i+"' class='userSearch' data-user-id='"+data.UID+"' data-user-screenname='"+data.username+"'>\n"+
                                                                                    "<div class='userSearchContent'>\n"+
                                                                                    "<img id='userImg_"+i+"' width='25' height='25' class='msgSearchImg' alt='usr' src='"+data.author_pic+"' alt='pic' style='float:left;margin-top:5x;margin-bottom:10px;margin-right:10px;'>\n"+
                                                                                    "<div class='userFirstLastSearch'> "+data.fullName+" </div>\n"+
                                                                                    "<div class='usernameSearch'> ("+data.username+") </div>\n"+
                                                                                    "</div>\n"+
                                                                                    "</li>"
                                                                                    );
                                                   
                                                   var selectedSearchUser = document.getElementById('userSearch'+i);
                                                   FastClick.attach(selectedSearchUser);
                                                   var selectedSearchUserIndex = 0;
                                                   selectedSearchUser.addEventListener('click', function(event) {
                                                                                       
                                                                                       if (selectedSearchUserIndex == 0) {
                                                                                       selectedSearchUserIndex = 1;
                                                                                       console.log('search this users name '+data.username);
                                                                                       //                                                                                      callUserSearchFunction(data.username);
                                                                                       $('#friendSearchInput').val(data.username);
                                                                                       
                                                                                       searchFriends();
                                                                                       
                                                                                       }
                                                                                       }, false);
                                                   
                                                   });
                                            check = 1;
                                            });
                                  }
                                  
                                  }
                                  
                                  if(e.keyCode == 13) {
                                  var searchField = $('#friendSearchInput').val();
                                  if (searchField != '' ) {
                                  
                                  searchFriends();
                                  
                                  } else {
                                  navigator.notification.alert('You have to type something in to search for friends.',none(), 'Yopima', 'OK');
                                  }
                                  }
                                  
                                  });
    
    $('#friendSearchInput').blur(function(e) {
                                 
                                 $('#findFriendsDropDown').css('height','0px').css('border','0px transparent');
                                 
                                 });
    
    //////*****************//////

    
    var friendSearchImg = document.getElementById('friendSearchImg');
    FastClick.attach(friendSearchImg);
    
    friendSearchImgIndex = 0;
    
    friendSearchImg.addEventListener('click', function(event) {
                                     if (friendSearchImgIndex == 0) {
                                     friendSearchImgIndex = 1;
                                     var searchField = $("#friendSearchInput").val();
                                     if (searchField != '' ) {
                                     
                                     friendSearchIndex = 1;
                                     searchFriends();
                                     } else {
                                     navigator.notification.alert('You have to type something in to search for friends.',friendSearchImgIndex = 0, 'Myavana', 'OK');
                                     }
                                     
                                     }
                                     }, false);
    
    var cancelfriendSearchImg = document.getElementById('cancelfriendSearchImg');
    FastClick.attach(cancelfriendSearchImg);
    
    cancelfriendSearchImgIndex = 0;
    
    cancelfriendSearchImg.addEventListener('click', function(event) {
                                           if (cancelfriendSearchImgIndex == 0) {
                                           cancelfriendSearchImgIndex = 1;
                                           
                                           deleteUnusedIscroll();
                                           getMyFriends();
                                           }
                                           }, false);
    
    getFriendRequest();
    
}

var requestFriendIndex = 0;
var unfriendBtnIdIndex = 0;
var friendSearchImgIndex = 0;

function searchFriends() {
    $('#findFriendsDropDown').css('height','0px').css('border','0px transparent');
    var searchField = $("#friendSearchInput").val();
    var UID = userArray.uid;
    friendSearchImgIndex = 0;
    $('#myWrapperScroller').empty();
    
    var searchDiv =
    '<div class="friendsSearchBox" id="searchBox">'+
    '<div class="cancelSearchImg" id="searchImg">'+
    '<img class="smallSearchCancel" id="cancelfriendSearchImg" src="img/smallCancelX.png"/>'+
    '</div>'+
    '<input type="text" name="searchInput" class="friendSearchInput" id="friendSearchInput" placeholder="Find girlfriends..."/>'+
    '<div class="findFriendsDropDown" id="findFriendsDropDown"></div>'+
    '<div class="friendSearchImg" id="searchImg">'+
    '<img class="smallSearchCancel" id="friendSearchImg" src="img/magnifyingglass.png"/>'+
    '</div>'+
    '</div>';
    
    $('#myWrapperScroller').append(searchDiv);
    
    ////********************/////
    
    $('#friendSearchInput').keyup(function(e) {
                                  //                                  console.log('find friends called');
                                  var searchField = $('#friendSearchInput').val();
                                  if (searchField == '') {
                                  $('#findFriendsDropDown').css('height','0px').css('border','0px transparent');
                                  } else {
                                  $('#findFriendsDropDown').empty();
                                  $('#findFriendsDropDown').css('height','40%').css('border','1px solid #000');
                                  
                                  var check = 1;
                                  //// function to grab all of the friends
                                  var searchField = $('#friendSearchInput').val();
                                  if (check == 1) {
                                  check = 0;
                                  $.getJSON(myMobileGlobalURL+"getUsersMobile.php",{field:searchField,UID:userArray.uid},function(data){
                                            $.each(data.users, function(i,data)
                                                   {
//                                                   console.log('user name: '+data.username);
                                                   
                                                   $('#findFriendsDropDown').append(
                                                                                    "<li id='userSearch"+i+"' class='userSearch' data-user-id='"+data.UID+"' data-user-screenname='"+data.username+"'>\n"+
                                                                                    "<div class='userSearchContent'>\n"+
                                                                                    "<img id='userImg_"+i+"' width='25' height='25' class='msgSearchImg' alt='usr' src='"+data.author_pic+"' alt='pic' style='float:left;margin-top:5x;margin-bottom:10px;margin-right:10px;'>\n"+
                                                                                    "<div class='userFirstLastSearch'> "+data.fullName+" </div>\n"+
                                                                                    "<div class='usernameSearch'> ("+data.username+") </div>\n"+
                                                                                    "</div>\n"+
                                                                                    "</li>"
                                                                                    );
                                                   
                                                   var selectedSearchUser = document.getElementById('userSearch'+i);
                                                   FastClick.attach(selectedSearchUser);
                                                   var selectedSearchUserIndex = 0;
                                                   selectedSearchUser.addEventListener('click', function(event) {
                                                                                       
                                                                                       if (selectedSearchUserIndex == 0) {
                                                                                       selectedSearchUserIndex = 1;
                                                                                       console.log('search this users name '+data.username);
                                                                                       //                                                                                      callUserSearchFunction(data.username);
                                                                                       $('#friendSearchInput').val(data.username);
                                                                                       
                                                                                       searchFriends();
                                                                                       
                                                                                       }
                                                                                       }, false);
                                                   
                                                   });
                                            check = 1;
                                            });
                                  }
                                  
                                  }
                                  
                                  if(e.keyCode == 13) {
                                  var searchField = $('#friendSearchInput').val();
                                  if (searchField != '' ) {
                                  
                                  searchFriends();
                                  
                                  } else {
                                  navigator.notification.alert('You have to type something in to search for friends.',none(), 'Yopima', 'OK');
                                  }
                                  }
                                  
                                  });
    
    $('#friendSearchInput').blur(function(e) {
                                 
                                 $('#findFriendsDropDown').css('height','0px').css('border','0px transparent');
                                 
                                 });
    
    //////*****************//////

    
    var friendSearchImg = document.getElementById('friendSearchImg');
    FastClick.attach(friendSearchImg);
    
    friendSearchImgIndex = 0;
    
    friendSearchImg.addEventListener('click', function(event) {
                                           if (friendSearchImgIndex == 0) {
                                           friendSearchImgIndex = 1;
                                             var searchField = $("#friendSearchInput").val();
                                             if (searchField != '' ) {
                                             
                                             friendSearchIndex = 1;
                                             searchFriends();
                                             } else {
                                             navigator.notification.alert('You have to type something in to search for friends.',friendSearchImgIndex = 0, 'Myavana', 'OK');
                                             }
                                     
                                           }
                                           }, false);
    
    var cancelfriendSearchImg = document.getElementById('cancelfriendSearchImg');
    FastClick.attach(cancelfriendSearchImg);
    
    cancelfriendSearchImgIndex = 0;
    
    cancelfriendSearchImg.addEventListener('click', function(event) {
                                           if (cancelfriendSearchImgIndex == 0) {
                                           cancelfriendSearchImgIndex = 1;
                                           
                                           deleteUnusedIscroll();
                                           getMyFriends();
                                           }
                                           }, false);
    
    
    //Ajax Post request
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getUsersMobile.php",
           data: {field:searchField,UID:UID},
           dataType: 'json',
           timeout:15000,
           success: function(data) {
           if(data.users==""){
           $('#myWrapperScroller').append("<div style='font-size:90%; width:100%;'>No users fit this search.</div>");
           }
           else
           {
           $.each(data.users, function(i,data)
                  {
                  //alert(data.username);
                  //alert(data.fullName);
                  //alert(data.buttonId);
                  var friendUID = data.UID;
                  var friendFirstName = data.fullName;
                  
//                  alert(data.buttonId);
                  
                  if (data.buttonId == 'follow.png' || data.buttonId != 'following.png') {
                  var nextFriend =
                  '<div class="myGFDiv" id="myGFDiv">'+
                  '<img src="'+data.author_pic+'" class="teaUserPic"/>'+
                  '<div class="myGFDetailsText" id="myGFDetailsText'+i+'">'+
                  '<b style="color:black;">'+data.fullName+'</b><br>'+data.username+
                  '</div>'+
                  '<div class="myGFBtnDiv" id="myGFBtnDiv'+i+'"><img src="img/'+data.buttonId+'" class="friendBtnBG"/></div>'+
                  '</div>';
                  
                  $('#myWrapperScroller').append(nextFriend);
                  
                  var requestFriend = 'myGFBtnDiv'+i;
                  var requestFriendBtnId = document.getElementById(requestFriend);
                  FastClick.attach(requestFriendBtnId);
                  
                  requestFriendIndex = 0;
                  requestFriendBtnId.addEventListener('click', function(event) {
                                                      
                                                      console.log('FOLLOW THIS USER');
                                                      
                                                      requestFriendIndex = 1;
                                                      
                                                      sendFollowerRequest(data.UID);
                                                      }, false);
                  
                  
                  } else if (data.buttonId == 'following.png') {
                  var nextFriend =
                  '<div class="myGFDiv" id="myGFDiv">'+
                  '<img src="'+data.author_pic+'" class="teaUserPic"/>'+
                  '<div class="myGFDetailsText" id="myGFDetailsText'+i+'">'+
                  '<b style="color:black;">'+data.fullName+'</b><br>'+data.username+
                  '</div>'+
                  '<div class="myGFBtnDiv" id="myGFBtnDiv'+i+'"><img src="img/'+data.buttonId+'" class="friendBtnBG"/></div>'+
                  '</div>';
                  
                  $('#myWrapperScroller').append(nextFriend);
                  
                  var unfriendBtn = 'myGFBtnDiv'+i;
                  var unfriendBtnId = document.getElementById(unfriendBtn);
                  FastClick.attach(unfriendBtnId);
                  
                  unfriendBtnIdIndex = 0;
                  unfriendBtnId.addEventListener('click', function(event) {
                                                 ////unfriendBtnIdIndex = 1;
                                                 
//                                                 alert('unfriend btn clicked');
                                                 
                                                 }, false);
                  
                  }
                  
                  
                  var myGFDetailsText = document.getElementById('myGFDetailsText'+i);
                  FastClick.attach(myGFDetailsText);
                  
                  myGFDetailsTextIndex = 0;
                  
                  myGFDetailsText.addEventListener('click', function(event) {
                                                   if (myGFDetailsTextIndex == 0) {
                                                   myGFDetailsTextIndex = 1;
                                                   
                                                   
                                                   if(data.UID == userArray.uid) {
                                                   deleteUnusedIscroll();
                                                   profilePageActions('headlines');
                                                   } else {
                                                   deleteUnusedIscroll();
                                                   otherProfilePageActions(data.UID,'girlfriends');
                                                   }
                                                   
                                                   }
                                                   }, false);
                  
                  });
           
           myWrapperScroller.refresh().scrollTo(0,0,0);
           
           }
           
           
           },
           error: function(xhr, type, error) {
           $.unblockUI();
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',none(), 'Myavana', 'OK');
           }
           
           console.log('Internal Error Occured!'+','+xhr.responseText+','+type+','+error);
           
           }
           });
    
}

/// function to remove friends
function removeFriendFunc(id){
    // get the user id
    var recipient_id = userArray.uid;
    var request_id = id;
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"removeFriend.php",
           data: {request_id:request_id,recipient_id:recipient_id},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           /// check the returned data
           navigator.notification.alert(data,none(), 'Myavana', 'OK');
           ////Get User Friends Request and User Friends
           userArray.numberOfFriends = userArray.numberOfFriends - 1;
           getMyFriends();
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',none(), 'Myavana', 'OK');
           }
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           }
           });
}

function sendFollowerRequest(id) {
    var recipient_id = id;
    var request_id = userArray.uid;
    var username = userArray.username;
    
    $.ajax({
           type: 'GET',
           timeout:15000,
           url: myMobileGlobalURL+"sendFollowerRequest.php",
           data: {request_id:request_id,recipient_id:recipient_id,username:username},
           dataType: 'json',
           success: function(data) {
           console.log(data.success);
           
           if(data.success){
           console.log('***PUSH SUCCESS - '+data.pushsuccess);
           userArray.numberOfFriends = data.followers;
           navigator.notification.alert('You made a new girlfriend.',requestFriendIndex = 0, 'Myavana', 'OK');
           deleteUnusedIscroll();
           getMyFriends();
           }
           else{
           
                navigator.notification.alert('Error! You are already girlfriends.',requestFriendIndex = 0, 'Myavana', 'OK');
           
           }
           
           
           },
           error: function(xhr, type, error) {
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',requestFriendIndex = 0, 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',requestFriendIndex = 0, 'Myavana', 'OK');
           }
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           deleteUnusedIscroll();
           getMyFriends();
           
           }
           });
    
}

function unfollowUserGirlfriend(id) {
    var recipient_id = id;
    var request_id = userArray.uid;
    
    $.ajax({
           type: 'GET',
           timeout:15000,
           url: myMobileGlobalURL+"deleteFollower.php",
           data: {request_id:request_id,recipient_id:recipient_id},
           dataType: 'json',
           success: function(data) {
           if(data.success){
           //           navigator.notification.alert('You are now following this user.',requestFriendIndex = 0, 'Myavana', 'OK');
           userArray.numberOfFriends = data.followers;
           unfollowGFBtnDivIndex = 0;
           deleteUnusedIscroll();
           getMyFriends();
           }
           else{
           navigator.notification.alert(data.message,profileFollowBtnIndex = 0, 'Myavana', 'OK');
           unfollowGFBtnDivIndex = 0;
           }
           
           
           },
           error: function(xhr, type, error) {
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',unfollowGFBtnDivIndex = 0, 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',unfollowGFBtnDivIndex = 0, 'Myavana', 'OK');
           }
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           unfollowGFBtnDivIndex = 0;
           deleteUnusedIscroll();
           getMyFriends();
           
           }
           });
}

function followUser(id) {
    var recipient_id = id;
    var request_id = userArray.uid;
    var username = userArray.username;
    
    $.ajax({
           type: 'GET',
           timeout:15000,
           url: myMobileGlobalURL+"sendFollowerRequest.php",
           data: {request_id:request_id,recipient_id:recipient_id,username:username},
           dataType: 'json',
           success: function(data) {
           if(data.success){
           console.log('***PUSH SUCCESS - '+data.pushsuccess);
           //           navigator.notification.alert('You are now following this user.',requestFriendIndex = 0, 'Myavana', 'OK');
           userArray.numberOfFriends = data.followers;
           profileFollowBtnIndex = 0;
           $('#profileFollowBtn').attr('src','img/profileUnfollowBtn.png');
           otherUserArray.followStatus = 1;
           }
           else{
           navigator.notification.alert('Error! You are already following this user.',profileFollowBtnIndex = 0, 'Myavana', 'OK');
           profileFollowBtnIndex = 0;
           }
           
           
           },
           error: function(xhr, type, error) {
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',profileFollowBtnIndex = 0, 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',profileFollowBtnIndex = 0, 'Myavana', 'OK');
           }
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           profileFollowBtnIndex = 0;
           
           }
           });
}

function unfollowUser(id) {
    var recipient_id = id;
    var request_id = userArray.uid;
    var username = userArray.username;
    
    $.ajax({
           type: 'GET',
           timeout:15000,
           url: myMobileGlobalURL+"deleteFollower.php",
           data: {request_id:request_id,recipient_id:recipient_id},
           dataType: 'json',
           success: function(data) {
           if(data.success){
           //           navigator.notification.alert('You are now following this user.',requestFriendIndex = 0, 'Myavana', 'OK');
           userArray.numberOfFriends = data.followers;
           profileFollowBtnIndex = 0;
           $('#profileFollowBtn').attr('src','img/profileFollowBtn.png');
           otherUserArray.followStatus = 0;
           }
           else{
           navigator.notification.alert(data.message,profileFollowBtnIndex = 0, 'Myavana', 'OK');
           profileFollowBtnIndex = 0;
           }
           
           
           },
           error: function(xhr, type, error) {
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',profileFollowBtnIndex = 0, 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',profileFollowBtnIndex = 0, 'Myavana', 'OK');
           }
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           profileFollowBtnIndex = 0;
           
           }
           });
}


var headlinesBkBtnIndex = 0;
function headlinesPageAction() {
    addLookReturnVar = 'headlines';
    fromHeadlinesPage = 0;
    
    
//    alert(deviceSizeFolder);
    
    var headlinesPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'Newsfeed.png" class="loginBack"/>'+
    '<div class="headlinesBkBtn" id="headlinesBkBtn"></div>'+
    '<div class="addLookBtn" id="homepgAddLookBtn" onclick="addNewLook(\'headlines\')"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
//    console.log(headlinesPage);

    page = headlinesPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    myLoading();
    
    $('#myWrapperScroller').empty();
    
    ////Add in Back Button
    var headlinesBkBtn = document.getElementById('headlinesBkBtn');
    FastClick.attach(headlinesBkBtn);
    
    headlinesBkBtnIndex = 0;
    
    headlinesBkBtn.addEventListener('click', function(event) {
                                    
                                    if (headlinesBkBtnIndex == 0) {
                                    headlinesBkBtnIndex = 1;
                                    deleteUnusedIscroll();
                                    homePageActions();
                                    }
                                    
                                    }, false);
    
    
    
    setTimeout(function () {
               
               getHeadlinesPage();
               
               }, 1000);
    
}

var addCommentVar = 0;
var largePicArray = new Object();

var viewLargeHeadlineBkBtnIndex = 0;
var addCommentButtonIndex = 0;
var commentUsernameClickIndex = 0;
var largePicLikeImgIndex = 0;
var largeHLWebsiteIndex = 0;

var deleteMyCommentImgIndex = 0;
var fromFavDiscoverLargeImage = 0;

var iabRef = null;

function viewLargeHLPic(HLmediaId,HLusername,HLpicName,HLnumOfComments,HLnumOfLikes,HLcaption,disCaption,discusername,disccategory,creatorUID) {
    console.log('View Large HL Pic Called '+HLmediaId+' '+HLusername+' '+HLpicName+' '+HLnumOfComments+' '+HLnumOfLikes+' '+HLcaption+' From HL Page: '+fromHeadlinesPage);
    
    deleteUnusedIscroll();
    
    fromHeadlinesLargeImage = 0;
    
    //myLoading();
    
    largePicArray.mediaid = HLmediaId;
    
    ////this is WEBSITE URL ON DISCOVER
    largePicArray.username = HLusername;
    largePicArray.picurl = HLpicName;
    largePicArray.numOfComments = HLnumOfComments;
    largePicArray.numOfLikes = HLnumOfLikes;
    largePicArray.caption = HLcaption;
    largePicArray.disCaption = disCaption;
    largePicArray.discusername = discusername;
    largePicArray.disccategory = disccategory;
    largePicArray.creatorUID = creatorUID;
    
    var viewLargeHeadlinePicture =
    '<div data-role="page"  style="max-width:100% !important;">'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-blank-header.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="viewLargeHeadlineBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'\')"></div>'+
    '<div class="HLInputCommentDiv" id="HLInputCommentDiv">'+
    '<input type="text" name="searchInput" class="addHLCommentDiv" id="addHLCommentDiv" placeholder="Add Comment..."/>'+
    '<img src="img/addBtn.png" class="addCommentBtn" id="addCommentBtn"/>'+
    '</div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScrollerCOMMENTPAD" id="myWrapperScrollerCOMMENTPAD">'+
    '<div class="hlPicGroupDiv" id="hlPicGroupDiv">'+
    '<div class="hlUsername" id="largeUsername"></div>'+
    '<div class="hlHairstyle" id="hlHairstyle"><img src="" class="hairStyleIcon" id="largeHairstyleIcon"/></div>'+
    '</div>'+
    '<div class="discoveryDetailsPicture" id="discoveryDetailsPicture"><img src="" class="largeHLPic" id="largeHLPic"/></div>'+
    '<div class="HLCaptionDiv" id="HLCaptionDiv">'+
    '<div class="largeHLWebsite" id="largeHLWebsite"></div>'+
    '<div class="largeHLCaptionTextDisc" id="largeHLCaptionTextDisc"></div>'+
    '</div>'+
    '<div class="discoveryDetailsNumDiv" id="discoveryDetailsNumDiv">'+
    '<div class="discCommentCount" id="largeHLCommentCount"></div>'+
    '<img src="img/my-comment-img.png" class="commentCountImg" id="commentCountImg"/>'+
    '<div class="saveCount" id="largeHLFavCount"></div>'+
    '<img src="img/likeImg.png" class="saveCountImg" id="largePicLikeImg"/>'+
    '</div>'+
    '<div class="HLCaptionDiv" id="HLCaptionDiv">'+
    '<div class="largeHLcaption" id="largeHLcaption"></div>'+
    '</div>'+
    '<div class="HLcommentDiv" id="HLcommentDiv">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = viewLargeHeadlinePicture;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    $('#addHLCommentDiv').blur(function() {
                               
                               if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
                               
                               window.scroll(0,0);
                               
                               }
                               
                               });
    
    $('#largeUsername').empty().append(largePicArray.username);
    $('#largeHLPic').attr('src',largePicArray.picurl);
    $('#largeHLCommentCount').empty().append(largePicArray.numOfComments);
    $('#largeHLFavCount').empty().append(largePicArray.numOfLikes);
    
    if ((largePicBackVar == 'discoverSearch') && ((largePicArray.username != "") || (largePicArray.username != null) || (largePicArray.username != 'undefined') || (fromHeadlinesPage == 0) || (fromSavedLooks == 0))) {
        
        largePicArray.caption = disCaption;
        
        if (disccategory == 'curly' || disccategory == 'straight' || disccategory == 'straightened' || disccategory == 'protective') {
            
        } else {
            
            disccategory = 'curly';
            
        }
        
        $('#largeUsername').empty().append(discusername);
        $('#largeHLWebsite').empty().css('text-decoration','underline').append(largePicArray.username);
        $('#largeHLCaptionTextDisc').empty().append(largePicArray.caption);
        $('#largeHairstyleIcon').attr('src','img/'+disccategory+'icon.png');
        
        
//        $('#largeHLWebsite').empty().append(largePicArray.username);
        
        
        var largeHLWebsite = document.getElementById('largeHLWebsite');
        FastClick.attach(largeHLFavCount);
        
        largeHLWebsiteIndex = 0;
        
        largeHLWebsite.addEventListener('click', function(event) {
                                        if(largeHLWebsiteIndex == 0) {
                                        console.log('discover link clicked');
                                        largeHLWebsiteIndex = 1;
                                        
                            var discoverURLLink = window.open(largePicArray.username, '_blank', 'location=yes','closebuttoncaption=back');
//                                        discoverURLLink.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
                                        
//                                        discoverURLLink.addEventListener('exit', iabClose);

                                        
                                        
                                        function changeBackgroundColor() {
                                            console.log('**&&**Change Background Called**&&**');
//                                            discoverURLLink.insertCSS({
//                                                             code: "body { background: blue; }"
//                                                                      });
                                        }
                                                         
//                                         function iabClose(event) {
//                                         discoverURLLink.removeEventListener('loadstop', changeBackgroundColor);
//                                         discoverURLLink.removeEventListener('exit', iabClose);
//                                         }


                                        
                                        }
                                        }, false);
        
    } else {
        if (disccategory == 'curly' || disccategory == 'straight' || disccategory == 'straightened' || disccategory == 'protective') {
            
        } else {
            
            disccategory = 'curly';
            
        }
        
        $('#largeHairstyleIcon').attr('src','img/'+disccategory+'icon.png');
        
        $('#largeHLCaptionTextDisc').empty().append(largePicArray.caption);
    }
    
    ////Go To User Profile
    setTimeout(function () {
    
    var bigPicUsername = document.getElementById('largeUsername');
    FastClick.attach(bigPicUsername);
    
    bigPicUsernameIndex = 0;
    
    bigPicUsername.addEventListener('click', function(event) {
            if (bigPicUsernameIndex == 0) {
                                    
                    bigPicUsernameIndex = 1;
                    
                    deleteUnusedIscroll();
                                    
                                    if(fromHeadlinesPage == 1) {
                                    console.log('coming from headlines page large image');
                                    fromHeadlinesLargeImage = 1;
                                    
                                    } else if (fromDiscoverImg == 1) {
                                    console.log('coming from discover large image');
                                    fromFavDiscoverLargeImage = 1;
                                    
                                    } else if (fromSavedLooks == 1) {
                                    console.log('coming from fav large image');
                                    fromSavedLooksLargeImg = 1;
                                    } else if (fromMadamesFav == 1) {
                                    fromMadamesFavLargeImg = 1;
                                    console.log('coming from disc madames fav large img')
                                    } else if (fromHairProducts == 1) {
                                    fromMadamesFavLargeImg = 1;
                                    console.log('coming from disc madames fav large img')
                                    }
                                    
                    console.log('Creator UID '+creatorUID);
                                    
                    if(creatorUID == userArray.uid) {
                        
                        profilePageActions('headlines');
                        
                    } else {
                    
                        otherProfilePageActions(creatorUID,'');
                        
                    }
            
            }
    }, false);
    
    ////End Go To User Profile
    
    ////Add Like Click
    var largePicLikeImg = document.getElementById('largePicLikeImg');
    FastClick.attach(largePicLikeImg);
    
    largePicLikeImgIndex = 0;
    
    largePicLikeImg.addEventListener('click', function(event) {
                                     if(largePicLikeImgIndex == 0) {
                                     largePicLikeImgIndex = 1;
                                     addDiscoverLike(largePicArray.mediaid);
                                     
                                     }
                                     }, false);
    
    ////Add in Back Button
    var viewLargeHeadlineBkBtn = document.getElementById('viewLargeHeadlineBkBtn');
    FastClick.attach(viewLargeHeadlineBkBtn);
    
    viewLargeHeadlineBkBtnIndex = 0;
    
    viewLargeHeadlineBkBtn.addEventListener('click', function(event) {
                                            
                                            if (viewLargeHeadlineBkBtnIndex == 0) {
                                            deleteUnusedIscroll();
                                            console.log('********after delete wrapper call from view large picture*********');
                                            viewLargeHeadlineBkBtnIndex = 1;
                                            myLoading();
                                            if (fromSavedLooks == 1) {
                                                
                                                console.log('return to favorite looks from large HL Pic');
                                                getLooksSaved();
                                            
                                            } else if (fromHeadlinesPage == 1 && discoverFavLanded == 0) {
                                            
                                                    console.log('return to headlines page from View Large HL Pic');
                                                    headlinesPageAction();
                                            
                                            } else if (fromMadamesFav == 1) {
                                            
                                                    console.log('return to Madames Fav page from View Large HL Pic');
                                                    madameFavDiscPageActions();
                                            
                                            } else if (largePicBackVar == 'discoverSearch' && discoverFavLanded == 0) {
                                            
                                                ////NEW SHIT CHECK GOES HERE
                                                if(discoverSearchType == 'curly') {
                                                    curlyDiscPageActions();
                                                } else if(discoverSearchType == 'straightened') {
                                                    straightDiscPageActions();
                                                } else if(discoverSearchType == 'protective') {
                                                    protectiveDiscPageActions();
                                                } else if(discoverSearchType == 'shampoo') {
                                            
                                                    productDiscPageActions();
                                                } else if(discoverSearchType == 'maintenance') {
                                                    maintenanceDiscPageActions();
                                                }
                                            
                                            } else {
                                                headlinesPageAction();
                                            }
                                            
                                            
                                            }
                                            }, false);
    
    
    ///add the comment button
    var addCommentButton = document.getElementById('addCommentBtn');
    FastClick.attach(addCommentButton);
    
    addCommentButtonIndex = 0;
    
    addCommentButton.addEventListener('click', function(event) {
                                      if (addCommentButtonIndex == 0) {
                                      addCommentButtonIndex = 1;
                                      
                                      addCommentVar = 1;
                                      var comment = document.getElementById('addHLCommentDiv').value;
                                      
                                      
                                      addComment(largePicArray.mediaid,userArray.uid,comment);
                                      }
                                      }, false);

        getComments(largePicArray.mediaid);
    
    ///// fucntion to get Comments
    function getComments(mediaID) {
        //Ajax Post request
        var commentsContainer = document.getElementById('HLcommentDiv');
        
        $.ajax({
               type: 'GET',
               url: myMobileGlobalURL+"getComments.php",
               data: {media_id:mediaID,myUID:userArray.uid},
               timeout:30000,
               dataType: 'json',
               success: function(data) {
               
               $('#HLcommentDiv').empty();
               
               $.each(data, function(i,data)
                      {
                      if(data.length != 0) {
                      
                      if(data.profile_photo == null || data.profile_photo == 'null') {
                            var userPic = 'img/no-photo.png';
                      } else {
                            var userPic = 'http://54.214.19.19/pictures/profilePics/'+data.profile_photo;
                      }
                      
                      if (data.UID != userArray.uid) {
                      var commentBlock =
                      '<div class="myTeaNot" id="myTeaNot">'+
                      '<img src="'+userPic+'" class="teaUserPic"/>'+
                      '<div class="teaDetailsText" id="teaDetailsText">'+
                      '<div style="float:left; width:98%;overflow-y:auto;"><b style="color:black;" id="commentUsernameClick'+i+'">'+data.username+'</b> '+data.comment+'<div style="font-size:80% !important">'+data.upload_time+'</div></div>'+
                      '</div>'+
                      '</div>';
                      
                      $('#HLcommentDiv').append(commentBlock);
                      
                      } else if (data.UID == userArray.uid) {
                      var commentBlock =
                      '<div class="myTeaNot" id="myTeaNot">'+
                      '<img src="'+userPic+'" class="teaUserPic"/>'+
                      '<div class="teaDetailsText" id="teaDetailsText">'+
                      '<div style="float:left; width:92%;overflow-y:auto;"><b style="color:black;" id="commentUsernameClick'+i+'">'+data.username+'</b> '+data.comment+'<div style="font-size:80% !important">'+data.upload_time+'</div></div>'+
                      '<img class="deleteMyCommentImg" id="deleteMyCommentImg'+i+'" src="img/smallCancelX.png"/>'+
                      '</div>'+
                      '</div>';
                      
                      $('#HLcommentDiv').append(commentBlock);
                      
                      var deleteMyCommentImg = document.getElementById('deleteMyCommentImg'+i);
                      FastClick.attach(deleteMyCommentImg);
                      
                      deleteMyCommentImgIndex = 0;
                      
                      deleteMyCommentImg.addEventListener('click', function(event) {
                                                          if (deleteMyCommentImgIndex == 0) {
                                                          deleteMyCommentImgIndex = 1;
                                                          
                                                          navigator.notification.confirm(
                                                                                         'Do you really want to delete this comment?',  // message
                                                                                         deleteMyCommentConfirm,              // callback to invoke with index of button pressed
                                                                                         'Myavana',            // title
                                                                                         ['Delete','Exit']          // buttonLabels
                                                                                         );
                                                          }
                                                          
                                                          }, false);
                      
                      function deleteMyCommentConfirm(buttonIndex) {
                      if (buttonIndex == 1) {
                      deleteMyCommentImgIndex = 0;
                      deleteMyComment(data.comment_id);
                      } else {
                      deleteMyCommentImgIndex = 0;
                      }
                      }
                      
                      function deleteMyComment(id) {
                      
                      $.ajax({
                             type: 'POST',
                             url: myMobileGlobalURL+"removeComment.php",
                             data: {UID:userArray.uid,comment_id:id},
                             dataType: 'json',
                             timeout: 15000,
                             success: function(data) {
                             
                             console.log('delete comment success');
                             
                             if (data.success) {
                             addCommentVar = 1;
                             
                             navigator.notification.alert(data.message,deleteMyCommentImgIndex = 0,'Myavana','OK');
                             
                             getComments(mediaID);
                             }
                             else{
                             
                             navigator.notification.alert(data.message,deleteMyCommentImgIndex = 0,'Myavana','OK');
                             }
                             
                             deleteMyCommentImgIndex = 0;
                             
                             },
                             error: function(xhr, type, error) {
                             if (type === "timeout") {
                             
                             navigator.notification.alert('Your delete timed out try again with a better connection.',deleteMyCommentImgIndex = 0, 'Myavana', 'OK');
                             
                             } else {
                             
                             console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
                             navigator.notification.alert('Your like post failed try again.',deleteMyCommentImgIndex = 0, 'Myavana', 'OK');
                             
                             }
                             }
                             
                             });
                      
                      }
                      
                      }
                      
                      
                      
                      var commentUsernameClick = document.getElementById('commentUsernameClick'+i);
                      FastClick.attach(commentUsernameClick);
                      
                      commentUsernameClickIndex = 0;
                      
                      commentUsernameClick.addEventListener('click', function(event) {
                                                            if (commentUsernameClickIndex == 0) {
                                                            commentUsernameClickIndex = 1;
                                                            
                                                            if(fromHeadlinesPage == 1) {
                                                                console.log('coming from headlines page large image');
                                                                fromHeadlinesLargeImage = 1;
                                                            
                                                            } else if (fromDiscoverImg == 1) {
                                                                console.log('coming from discover large image');
                                                                fromFavDiscoverLargeImage = 1;
                                                            
                                                            } else if (fromSavedLooks == 1) {
                                                                console.log('coming from fav large image');
                                                                fromSavedLooksLargeImg = 1;
                                                            } else if (fromMadamesFav == 1) {
                                                                fromMadamesFavLargeImg = 1;
                                                                console.log('coming from disc madames fav large img')
                                                            } else if (fromHairProducts == 1) {
                                                            fromMadamesFavLargeImg = 1;
                                                            console.log('coming from disc madames fav large img')
                                                            }
                                                            
                                                            deleteUnusedIscroll();
                                                            
                                                            if(data.UID == userArray.uid) {
                                                            profilePageActions('headlines');
                                                            } else {
                                                            otherProfilePageActions(data.UID,'headlines');
                                                            }
                                                            
                                                            }
                                                            }, false);
                      }
                      
                      
                      });
               
               if(addCommentVar == 1) {
               
                    myWrapperScroller.refresh().scrollTo(0,0,0);
               
               }
               
               $.when.apply($, data).then(function(){
                                          setTimeout(function () {
                                                     
                                                     console.log('call scroller after get comments success');
                                                     callLargeViewWrapperScrollerFunction();
                                                     
                                            }, 500);
                    });
                                          
               
               },
               error: function(xhr, type, error) {
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               
               if (type === "timeout") {
               navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
               } else {
               navigator.notification.alert('There was an error getting comments. Please try again.',none(), 'Myavana', 'OK');
               }
               
               //getUserFriends(userArray.uid);
               }
               });
    }
 
    //// function to add Commments
    function addComment(mediaid, UID, comment){
        //alert('add comment fired----'+mediaid+'--'+UID);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"postComment.php",
               data: {UID:UID,media_id:mediaid,comment:comment,username:userArray.username},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('post comment success');
               
               if (data.success) {
               console.log('***PUSH SUCCESS - '+data.pushsuccess);
               //userArray.haircategory = editProfHairCat;
               //userArray.aboutMe = editProfAboutMe;
               ////navigator.notification.alert(data.message,none(), 'Myavana', 'OK');
               document.getElementById('addHLCommentDiv').value = "";
               getComments(HLmediaId);
               addCommentButtonIndex = 0;
               
               var count = $('#largeHLCommentCount').html();
               var countNum = parseInt(count);
               countNum = countNum + 1;
               $('#largeHLCommentCount').empty();
               $('#largeHLCommentCount').append(countNum);
               
               }
               else{
               navigator.notification.alert(data.message,addCommentButtonIndex = 0,'Myavana','OK');
               document.getElementById('addHLCommentDiv').value = "";
               }
               
               addCommentButtonIndex = 0;
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your upload timed out try again with a better connection.',addCommentButtonIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your comment post failed try again.',addCommentButtonIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }
    
    //// function to add Commments
    function addDiscoverLike(mediaid){
        ////alert('add discover like fired----'+mediaid+'--'+UID);
        
        $.ajax({
               type: 'POST',
               url: myMobileGlobalURL+"postFavorite.php",
               data: {UID:userArray.uid,media_id:mediaid},
               dataType: 'json',
               timeout: 15000,
               success: function(data) {
               
               console.log('post discover like success');
                              
               if(data.success) {
               console.log('***PUSH SUCCESS - '+data.pushsuccess);
               
                   largePicLikeImgIndex = 0;
                   $('#largeHLFavCount').empty().append(data.favoriteCount);
               
               }
               if(!data.success) {
               
                   largePicLikeImgIndex = 0;
                   $('#largeHLFavCount').empty().append(data.favoriteCount);
               
               }
               
               
               
               
               },
               error: function(xhr, type, error) {
               if (type === "timeout") {
               
               navigator.notification.alert('Your like timed out try again with a better connection.',largePicLikeImgIndex = 0, 'Myavana', 'OK');
               
               } else {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               navigator.notification.alert('Your like post failed try again.',largePicLikeImgIndex = 0, 'Myavana', 'OK');
               
               }
               }
               
               });
        
    }
               
        }, 2000);
    
    
    
}

function callLargeViewWrapperScrollerFunction() {
    
    setTimeout(function () {
               
               console.log('********wrapper call for view large picture*********');
               myWrapperScroller = new iScroll('myWrapperStd', {hScrollbar: false, vScrollbar: true, vScroll: true});
               $.unblockUI();

               }, 1000);

    
}

var hlUsernameIndex = 0;
var saveImg1Index = 0;
var enlargeImgIndex = 0;
var commentImg1Index = 0;
var hlReportImgIndex = 0;

var fromHeadlinesPage = 0;
var fromHeadlinesLargeImage = 0;

var wrapperScrollX = 0;
var wrapperScrollY = 0;

function getHeadlinesPage() {
    largePicBackVar = '';
    //alert('get headlines page called');
    //    myLoading();
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+'getHeadlines.php',
           data: {UID:userArray.uid},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           console.log("Successful Access of Database Get Headlines");
           
           if(data != "") {
           ///grab each of the headlines
           $.each(data, function(i,data){
                  
                  if (data.hairstyle == 'curly' || data.hairstyle == 'straight' || data.hairstyle == 'straightened' || data.hairstyle == 'protective') {
                  
                  } else {
                  
                        data.hairstyle = 'curly';

                  }
                  
                  var myHeadlineString =
                  '<div class="hlPicGroupDiv" id="hlPicGroupDiv">'+
                  '<div class="hlUsername" id="hlUsername'+i+'">'+data.username+'</div>'+
                  '<div class="hlHairstyle" id="hlHairstyle'+i+'"><img src="img/'+data.hairstyle+'icon.png" class="hairStyleIcon" id="hairStyleIcon'+i+'"/></div>'+
                  '<img src="'+data.pic_name+'" class="hlPic" id="hlPic'+i+'"/>'+
                  '</div>'+
                  '<div class="hlPicGroupNumDiv" id="hlPicGroupNumDiv">'+
                  '<div class="commentCount" id="commentCount'+i+'">'+data.numOfComments+'</div>'+
                  '<img src="img/my-comment-img.png" class="commentCountImg" id="commentImg'+i+'"/>'+
                  '<div class="saveCount" id="saveCount'+i+'">'+data.numOfLikes+'</div>'+
                  '<img src="img/likeImg.png" class="saveCountImg" id="saveImg'+i+'"/>'+
                  '<img src="img/aboutBoxLink.png" class="hlReportImg" id="hlReportImg'+i+'"/>'+
                  '</div>'+
                  '<div class="hlPicGroupCapDiv" id="hlPicGroupCapDiv">'+
                  '<div class="hlPicGroupCaption" id="hlPicGroupCaption">'+data.caption+'</div>'+
                  '</div>';
                  
                  ////console.log(myHeadlineString);
                  
                  $('#myWrapperScroller').append(myHeadlineString);
                  
                  var hlPicW = $('#hlPic'+i).outerWidth();
                  $('#hlPic'+i).css('height',hlPicW);
                  
                  var hlReportImg = document.getElementById('hlReportImg'+i);
                  FastClick.attach(hlReportImg);
                  
                  hlReportImgIndex = 0;
                  
                  hlReportImg.addEventListener('click', function(event) {
                                               if (hlReportImgIndex == 0) {
                                               
                                               hlReportImgIndex = 1;
                                               
                                               navigator.notification.confirm(
                                                                              'Do you want to report this Look Innapropriate?',  // message
                                                                              confirmInnapropriate,              // callback to invoke with index of button pressed
                                                                              'Myavana',            // title
                                                                              ['Report','Cancel']          // buttonLabels
                                                                              );
                                               
                                               function confirmInnapropriate(buttonIndex) {
                                               ////Report Innapropriate
                                               if (buttonIndex === 1) {
                                               handleReportImg(data.media_id);
                                               } else {
                                               hlReportImgIndex = 0;
                                               }
                                               }
                                               
                                               
                                               
                                               }
                                               }, false);
                  
                  function handleReportImg(mediaid) {
                  
                  $.ajax({
                         type: 'POST',
                         url: myMobileGlobalURL+"innapropriateFlag.php",
                         data: {media_id:mediaid,flagCreator:userArray.uid},
                         dataType: 'json',
                         timeout: 10000,
                         success: function(data, textStatus, jqXHR) {
                         if(data.success) {
                         
                         }
                         if(!data.success) {
                         
                         navigator.notification.alert(data.message,hlReportImgIndex = 0, 'Myavana', 'OK');
                         
                         }
                         
                         
                         },
                         error: function(xhr, type, error) {
                         
                         if (type === "timeout") {
                         navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',hlReportImgIndex = 0, 'Myavana', 'OK');
                         } else {
                         navigator.notification.alert('Unable to flag this this pic.',hlReportImgIndex = 0, 'Myavana', 'OK');
                         }
                         
                         console.log('Internal Error Occured!'+','+xhr.responseText+','+type+','+error);
                         
                         }
                         
                         });
                  
                  }
                  
                  
                  
                  var hlUsername = document.getElementById('hlUsername'+i);
                  FastClick.attach(hlUsername);
                  
                  hlUsernameIndex = 0;
                  
                  hlUsername.addEventListener('click', function(event) {
                                              if (hlUsernameIndex == 0) {
                                              hlUsernameIndex = 1;
                                
                                              
                                              deleteUnusedIscroll();
                                              
                                              if(fromHeadlinesPage == 1) {
                                              console.log('coming from headlines page large image');
                                              fromHeadlinesLargeImage = 1;
                                              
                                              } else if (fromDiscoverImg == 1) {
                                              console.log('coming from discover large image');
                                              fromFavDiscoverLargeImage = 1;
                                              
                                              } else if (fromSavedLooks == 1) {
                                              console.log('coming from fav large image');
                                              fromSavedLooksLargeImg = 1;
                                              } else if (fromMadamesFav == 1) {
                                              fromMadamesFavLargeImg = 1;
                                              console.log('coming from disc madames fav large img')
                                              } else if (fromHairProducts == 1) {
                                              fromMadamesFavLargeImg = 1;
                                              console.log('coming from disc madames fav large img')
                                              }
                                              
                                              if(data.pic_creator == userArray.uid) {
                                              profilePageActions('headlines');
                                              } else {
                                              
                                              otherProfilePageActions(data.pic_creator,'headlines');
                                              }
                                              
                                              }
                                              }, false);
                  
                  var saveImg1 = document.getElementById('saveImg'+i);
                  FastClick.attach(saveImg1);
                  
                  saveImg1Index = 0;
                  
                  saveImg1.addEventListener('click', function(event) {
                                            if (saveImg1Index == 0) {
                                            saveImg1Index = 1;
                                            
                                            handleImgSave(data.media_id,i,data.numOfLikes);
                                            
                                            }
                                            }, false);
                  
                  var enlargeImg = document.getElementById('hlPic'+i);
                  FastClick.attach(enlargeImg);
                  
                  enlargeImgIndex = 0;
                  
                  enlargeImg.addEventListener('click', function(event) {
                                              if (enlargeImgIndex == 0) {
                                              enlargeImgIndex = 1;
                                              fromHeadlinesPage = 1;
                                              
                                              wrapperScrollX = myWrapperScroller.x;
                                              wrapperScrollY = myWrapperScroller.y;
                                              console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                              
                                              myLoading();
                                              
                                              deleteUnusedIscroll();
                                              
                                              ////alert('Enlarge img clicked---'+data.media_id);
                                              viewLargeHLPic(data.media_id,data.username,data.pic_name,data.numOfComments,data.numOfLikes,data.caption,'','',data.hairstyle,data.pic_creator);

                                              
                                              }
                                              }, false);
                  
                  var commentImg1 = document.getElementById('commentImg'+i);
                  FastClick.attach(commentImg1);
                  
                  commentImg1Index = 0;
                  
                  commentImg1.addEventListener('click', function(event) {
                                               if (commentImg1Index == 0) {
                                               commentImg1Index = 1;
                                               fromHeadlinesPage = 1;
                                               
                                               wrapperScrollX = myWrapperScroller.x;
                                               wrapperScrollY = myWrapperScroller.y;
                                               console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                               
                                               deleteUnusedIscroll();
                                               
                                               myLoading();
                                               
                                               viewLargeHLPic(data.media_id,data.username,data.pic_name,data.numOfComments,data.numOfLikes,data.caption,'','',data.hairstyle,data.pic_creator);
                                               
                                               }
                                               }, false);
                  
                  function handleImgSave(mediaid,id,count) {
                  
                  $.ajax({
                         type: 'POST',
                         //Show spinner
                         
                         url: myMobileGlobalURL+"postFavorite.php",
                         data: {media_id:mediaid,UID:userArray.uid},
                         dataType: 'json',
                         timeout: 10000,
                         success: function(data, textStatus, jqXHR) {
                         
//                         alert(data.success);
//                         alert(data.favoriteCount);
//                         alert(data.message);
                         
                         if(data.success) {
                         
                         console.log('***PUSH SUCCESS - '+data.pushsuccess);
                         saveImg1Index = 0;
//                         var countNum = parseInt(count);
//                         countNum = countNum + 1;
                         $('#saveCount'+id).empty();
                         $('#saveCount'+id).append(data.favoriteCount);
                         
                         }
                         if(!data.success) {
                         
                         saveImg1Index = 0;
//                         var countNum = parseInt(count);
//                         countNum = countNum - 1;
                         $('#saveCount'+id).empty();
                         $('#saveCount'+id).append(data.favoriteCount);
                         }
                         
                         
                         },
                         error: function(xhr, type, error) {
                         
                         if (type === "timeout") {
                         navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',saveImg1Index = 0, 'Myavana', 'OK');
                         } else {
                         navigator.notification.alert('Unable to like this pic.',saveImg1Index = 0, 'Myavana', 'OK');
                         }
                         
                         console.log('Internal Error Occured!'+','+xhr.responseText+','+type+','+error);
                         
                         }
                         
                         });
                  }
                  //
                  //
                  //                  }
                  //
                  //                  var commentImg1 = document.getElementById('commentImg'+i);
                  //                  FastClick.attach(commentImg1);
                  //
                  //                  var commentImg1Index = 0;
                  //
                  //                  commentImg1.addEventListener('click', function(event) {
                  //                                               if (commentImg1Index == 0) {
                  //                                               //commentImg1Index = 1;
                  //
                  //                                               alert('comment img clicked');
                  //                                               ////Show add comment section
                  //                                               }
                  //                                               }, false);
                  //
                  //
                  });
           

           
           $.when.apply($, data).then(function(){
                                      setTimeout(function () {
                                                 
                                                 myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
                                                 
                                                 console.log('Return position: '+wrapperScrollX+' & '+wrapperScrollY);
                                                 
                                                 if (wrapperScrollY !=0) {
                                                 myWrapperScroller.scrollTo(wrapperScrollX, -wrapperScrollY, 100,true);
                                                 }
                                                 $.unblockUI();
                                                 
                                                 }, 2000);
                                      
                                      });
           
           } else {
           ////append there are no headlines for you to view
           
           
           $('#myWrapperScroller').append('<div class="hlPicGroupNone" id="hlPicGroupNone">There are no Headlines to view</div>');
           $.unblockUI();
           
           
           }
           
           
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           $.unblockUI();
           homePageActions();
           } else {
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           navigator.notification.alert('Check your connection and try again.',homePageActions(), 'Myavana', 'OK');
           $.unblockUI();
           ////alert(xhr.responseText);
           }
           }
           
           });
    
}


var teaPageBkBtnIndex = 0;

function teaPageActions() {
    ////Slide in Search Page
    var theTeaPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-notifications.png" class="loginBack"/>'+
    '<div class="teaPageBkBtn" id="teaPageBkBtn"></div>'+
    '<div class="addLookBtn" id="homepgAddLookBtn" onclick="addNewLook(\'thetea\')"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = theTeaPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    myLoading();
    
    ////Add in Back Button
    var teaPageBkBtn = document.getElementById('teaPageBkBtn');
    FastClick.attach(teaPageBkBtn);
    
    teaPageBkBtnIndex = 0;
    
    teaPageBkBtn.addEventListener('click', function(event) {
                                  if (teaPageBkBtnIndex == 0) {
                                  teaPageBkBtnIndex = 1;
                                  deleteUnusedIscroll();
                                  
                                  homePageActions();
                                  }
                                  }, false);
    
    setTimeout(function () {
               getNotifications();
               }, 800);
    
    
}

var teaDetailsTextIndex = 0;

function getNotifications(){
    //Ajax Post request
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getNotifications.php",
           data: {UID:userArray.uid},
           timeout:30000,
           dataType: 'json',
           success: function(data) {
           
           $('#myWrapperScroller').empty();
           
           if(data.length == 0 || data == "") {
                    $('#myWrapperScroller').append('<div class="hlPicGroupNone" id="hlPicGroupNone">You have no notifications in The Tea.</div>');
           } else {
           
               $.each(data, function(i,data)
                      {
                      
                      if(data.photo == null || data.photo == 'null') {
                            var userPic = 'img/no-photo.png';
                      } else {
                            var userPic = 'http://54.214.19.19/pictures/profilePics/'+data.photo;
                      }
                      
                      if (data.type != 'Follow') {
                      
                      
                          var notificationBlock =
                          '<div class="myTeaNot" id="myTeaNot">'+
                          '<img src="'+userPic+'" class="teaUserPic"/>'+
                          '<div class="teaDetailsTextPhoto" id="teaDetailsText'+i+'">'+
                          '<b style="color:black;" id="usernameClick'+i+'">'+data.username+' </b>'+data.notification+'<br>'+data.time+''+
                          '</div>'+
                            '<img src="'+data.pic_name+'" class="teaNotificationPic"/>'+
                          '</div>';
                      
                      } else {
                      
                          var notificationBlock =
                          '<div class="myTeaNot" id="myTeaNot">'+
                          '<img src="'+userPic+'" class="teaUserPic"/>'+
                          '<div class="teaDetailsText" id="teaDetailsText'+i+'">'+
                          '<b style="color:black;" id="usernameClick'+i+'">'+data.username+' </b>'+data.notification+'<br>'+data.time+''+
                          
                          '</div>'+
                          '</div>';
                      
                      }
                      
                      
                      $('#myWrapperScroller').append(notificationBlock);
                      
                      
//                      if(data.type != 'Follow'){
                      var teaDetailsText = document.getElementById('teaDetailsText'+i);
                      FastClick.attach(teaDetailsText);
                      
                      teaDetailsTextIndex = 0;
                      
                      teaDetailsText.addEventListener('click', function(event) {
                                                     if (teaDetailsTextIndex == 0) {
                                                     teaDetailsTextIndex = 1;
                                                     
                                                     deleteUnusedIscroll();
                                                     
                                                     otherProfilePageActions(data.UID,'notifications');
                                                     
                                                     }
                                                     }, false);
//                      }
                      
                      });
           }
           
           setTimeout(function () {
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
                      $.unblockUI();
                      
                      }, 1000);
           
           },
           error: function(xhr, type, error) {
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
           } else {
           navigator.notification.alert('There was an error getting comments. Please try again.',none(), 'Myavana', 'OK');
           }
           
           //getUserFriends(userArray.uid);
           }
           });
    
}

var searchBkBtnIndex = 0;
var myFavBtnSecIndex = 0;
var curlyStylesBtnSecIndex = 0;
var straighBtnSecIndex = 0;
var protectiveBtnSecIndex = 0;
var productsBtnSecIndex = 0;
var maintenanceBtnSecIndex = 0;
var blogBtnClickIndex = 0;

var discoverPageLanded = 0;
var discoverFavLanded = 0;
var discoverCurlyLanded = 0;
var discoverStylistLanded = 0;
var discoverStraightLanded = 0;
var discoverProductsLanded = 0;
var discoverProtectiveLanded = 0;

function searchHairstylesPageAction() {
    
    addLookReturnVar = 'searchpage';
    
    discoverPageLanded = 0;
    discoverFavLanded = 0;
    
    wrapperScrollX = 0;
    wrapperScrollY = 0;
    
    var searchHairstylesPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-DiscoverBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="searchBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    '<div class="curlyBtnSec" id="myFavBtnSec"></div>'+
    '<div class="curlyStylesBtnSec" id="curlyStylesBtnSec"></div>'+
    '<div class="straighBtnSec" id="productsBtnSec"></div>'+
    '<div class="locdBtnSec" id="straighBtnSec"></div>'+
    '<div class="braidsBtnSec" id="maintenanceBtnSec"></div>'+
    '<div class="twistsBtnSec" id="protectiveBtnSec"></div>'+
    '<div class="optionsBtnSec" id="blogBtnClick"></div>'+
    '</div>'+
    '</div>';
    
    ////Slide in Search Page
    page = searchHairstylesPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    ////Add in Back Button
    var searchBkBtn = document.getElementById('searchBkBtn');
    FastClick.attach(searchBkBtn);
    
    searchBkBtnIndex = 0;
    
    searchBkBtn.addEventListener('click', function(event) {
                                 if (searchBkBtnIndex == 0) {
                                 searchBkBtnIndex = 1;
                                 
                                 homePageActions();
                                 }
                                 }, false);
    
    var myFavBtnSec = document.getElementById('myFavBtnSec');
    FastClick.attach(myFavBtnSec);
    
    myFavBtnSecIndex = 0;
    
    myFavBtnSec.addEventListener('click', function(event) {
                                 if (myFavBtnSecIndex == 0) {
                                 myFavBtnSecIndex = 1;
                                 discoverPageLanded = 1;
                                 
                                 madameFavDiscPageActions();
                                 
                                 }
                                 }, false);
    
    var curlyStylesBtnSec = document.getElementById('curlyStylesBtnSec');
    FastClick.attach(curlyStylesBtnSec);
    
    curlyStylesBtnSecIndex = 0;
    
    curlyStylesBtnSec.addEventListener('click', function(event) {
                                       if (curlyStylesBtnSecIndex == 0) {
                                       curlyStylesBtnSecIndex = 1;
                                       
                                       curlyDiscPageActions();
                                       
                                       
                                       }
                                       }, false);
    
    var straighBtnSec = document.getElementById('straighBtnSec');
    FastClick.attach(straighBtnSec);
    
    straighBtnSecIndex = 0;
    
    straighBtnSec.addEventListener('click', function(event) {
                                   if (straighBtnSecIndex == 0) {
                                   straighBtnSecIndex = 1;
                                   
                                   straightDiscPageActions();
                                   
                                   }
                                   }, false);
    
    var protectiveBtnSec = document.getElementById('protectiveBtnSec');
    FastClick.attach(protectiveBtnSec);
    
    protectiveBtnSecIndex = 0;
    
    protectiveBtnSec.addEventListener('click', function(event) {
                                      if (protectiveBtnSecIndex == 0) {
                                      protectiveBtnSecIndex = 1;
                                      
                                      protectiveDiscPageActions();
                                      
                                      }
                                      }, false);
    
    var productsBtnSec = document.getElementById('productsBtnSec');
    FastClick.attach(productsBtnSec);
    
    productsBtnSecIndex = 0;
    
    productsBtnSec.addEventListener('click', function(event) {
                                    if (productsBtnSecIndex == 0) {
                                    productsBtnSecIndex = 1;
                                    
                                    stylistDiscPageActions();
                                    
                                    //productDiscPageActions();
                                    
                                    }
                                    }, false);
    
    var maintenanceBtnSec = document.getElementById('maintenanceBtnSec');
    FastClick.attach(maintenanceBtnSec);
    
    maintenanceBtnSecIndex = 0;
    
    maintenanceBtnSec.addEventListener('click', function(event) {
                                       if (maintenanceBtnSecIndex == 0) {
                                       maintenanceBtnSecIndex = 1;
                                       
                                       console.log('go to hair products page');
                                       
                                       hairProductsDiscPageActions();
//                                       maintenanceDiscPageActions();
                                       
                                       }
                                       }, false);
    
//    var blogBtnClick = document.getElementById('blogBtnClick');
//    FastClick.attach(blogBtnClick);
//    
//    blogBtnClickIndex = 0;
//    
//    blogBtnClick.addEventListener('click', function(event) {
//                                       if (blogBtnClickIndex == 0) {
//                                       blogBtnClickIndex = 1;
//                                       
//                                  var myBlogDisc = window.open('http://www.madameyou.com/', '_blank', 'EnableViewPortScale=yes');
//                                  myBlogDisc.addEventListener('exit', function(event) { blogBtnClickIndex = 0; });
//                                  
//                                       }
//                                       }, false);
}

var discoveryPic1Index = 0;
var discoverCurlyBkBtnIndex = 0;

function curlyDiscPageActions() {
    deleteUnusedIscroll();
    myLoading();
    ////Slide in Search Page
    
    var discoverCurlyPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'DiscoverCurlyKinkyWavyBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverCurlyBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    
    '<div class="discoverPhotosSection" id="discoverPhotosSection">'+
    '<div class="profileGroupDiv" id="discoverGridDiv">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    
    '</div>'+
    '</div>';
    
    page = discoverCurlyPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    ////Add in Back Button
    var discoverCurlyBkBtn = document.getElementById('discoverCurlyBkBtn');
    FastClick.attach(discoverCurlyBkBtn);
    
    discoverCurlyBkBtnIndex = 0;
    
    discoverCurlyBkBtn.addEventListener('click', function(event) {
                                        if (discoverCurlyBkBtnIndex == 0) {
                                        
                                        discoverCurlyBkBtnIndex = 1;
                                        deleteUnusedIscroll();
                                        
                                        searchHairstylesPageAction();
                                        }
                                        }, false);
    
    
    setTimeout(function () {
               
               fromDiscoverImg = 1;
               getDiscoverSearch('curly');
               
               }, 1500);
    
}

var discoverMadamYouBkBtnIndex = 0;

function viewLargeDiscoverPhoto() {
    
    
    var discoverMadameYouNaturalBig =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/myNaturalBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverMadamYouBkBtn"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '<div class="discoveryDetailsPicture" id="discoveryDetailsPicture"><img src="img/sampleProfileImg.png" class="largeDiscoverPic" id="largeDiscoverPic"/></div>'+
    '<div class="discoveryDetailsNumDiv" id="discoveryDetailsNumDiv">'+
    '<div class="discCommentCount" id="discCommentCount">302</div>'+
    '<img src="img/my-comment-img.png" class="commentCountImg" id="commentCountImg"/>'+
    '<div class="saveCount" id="saveCount">647</div>'+
    '<img src="img/likeImg.png" class="saveCountImg" id="saveCountImg"/>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    ////Slide in Search Page
    page = discoverMadameYouNaturalBig;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    myLoading();
    
    ////Add in Back Button
    var discoverMadamYouBkBtn = document.getElementById('discoverMadamYouBkBtn');
    FastClick.attach(discoverMadamYouBkBtn);
    
    discoverMadamYouBkBtnIndex = 0;
    
    discoverMadamYouBkBtn.addEventListener('click', function(event) {
                                           if (discoverMadamYouBkBtnIndex == 0) {
                                           discoverMadamYouBkBtnIndex = 1;
                                           
                                           deleteUnusedIscroll();
                                           
                                           curlyDiscPageActions();
                                           }
                                           }, false);
    
    setTimeout(function () {
               
               myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
               $.unblockUI();
               
               }, 1000);
    
    
}

var searchPicIndex = 0;

var discoverMadamFavBkBtnIndex = 0;
var fromMadamesFav = 0;
var fromMadamesFavLargeImg = 0;

function madameFavDiscPageActions() {
    fromMadamesFav = 0;
    
    myLoading();
    
    var discoverMadameFavPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myMadamFav-bg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverMadamFavBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    
    '<div class="discoverPhotosSection" id="discoverPhotosSection">'+
    '<div class="profileGroupDiv" id="discoverGridDiv">'+
    
    //'<div class="profLooksRow" id="profLooksRow">'+
    //'<div class="leftLookDiv" id="leftLookDiv">'+
    //'<img src="img/sampleProfileImg.png" class="lookPic" id="discoveryPic1"/>'+
    //'</div>'+
    //'<div class="midLookDiv" id="midLookDiv">'+
    //'<img src="img/sampleProfileImg.png" class="lookPic" id="lookPic"/>'+
    //'</div>'+
    //'<div class="rightLookDiv" id="rightLookDiv">'+
    //'<img src="img/sampleProfileImg.png" class="lookPic" id="lookPic"/>'+
    //'</div>'+
    //'</div>'+
    
    
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    
    '</div>'+
    '</div>';
    
    ////Slide in Search Page
    page = discoverMadameFavPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    ////Add in Back Button
    var discoverMadamFavBkBtn = document.getElementById('discoverMadamFavBkBtn');
    FastClick.attach(discoverMadamFavBkBtn);
    
    discoverMadamFavBkBtnIndex = 0;
    
    discoverMadamFavBkBtn.addEventListener('click', function(event) {
                                           if (discoverMadamFavBkBtnIndex == 0) {
                                           
                                               if(discoverPageLanded == 1) {
                                                    deleteUnusedIscroll();
                                           
                                                       console.log('Search Favs Return From Madame Favs');
                                                       discoverMadamFavBkBtnIndex = 1;
                                                       
                                                       searchHairstylesPageAction();
                                               }
                                           
                                           }
                                           }, false);
    
    
    setTimeout(function () {
               fromDiscoverImg = 1;
               
               getFavSearch('favorite');
               
    }, 1500);
    
}

var myProductDivIndex = 0;

function getDiscoverSearchProducts(search) {
    console.log('get discover search PRODUCTS called: '+search);
    addLookReturnVar = 'searchpage';
    discoverSearchType = search;
    
    var category = search;
    //    alert(category);
    searchPicIndex = 0;
    
//    var rowCount = 0;
//    var trackRow = 1;
//    $('#discoverGridDiv').empty();
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getDiscover.php",
           data: {category:category},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           console.log('get products success');
           var trackImg;
           
           if(data.length == 0) {
           $('#myWrapperScroller').empty().append('There are no products to Discover in this section yet.');
           }
           else {
           var dLength = data.length;
           ///grab each of the comments
           //               alert(String(JSON.stringify(data)));
           $.each(data, function(i,data){
                  //                      alert(data.upload_time);
                  //                      alert(data.pic_name);
                  
                  //                  alert(data.username);
                  
                  var nextProduct =
                  '<div class="myProductsDiv" id="myProductDiv'+i+'">'+
                  '<img src="'+data.pic_name+'" class="productPictureDiv"/>'+
                  '<div class="myProductsDetailsText" id="myGFDetailsText'+i+'">'+
                      data.brandName+'<br><b style="color:black;">'+data.productName+'</b><br>'+data.productType+
                  '</div>'+
//                  '<div class="myGFBtnDiv" id="stylistFollowBtnDiv'+i+'"><img src="img/'+data.followStatus+'.png" class="friendBtnBG" id="stylistFollowStatusBtn'+i+'"/></div>'+
//                  '<div class="stylistDetDiv" id="stylistDetDiv">'+
//                  '<div class="stylistSpecialty"><b>Specialty: </b>'+data.specialty+'</div>'+
//                  '<div class="stylistExperience"><b>Experience: </b>'+data.experience+'</div>'+
//                  '<div class="stylistSalon"><b>Salon: </b>'+data.salon+'</div>'+
//                  '<div class="stylistCityState"><b>'+cityStateString+'</b></div>'+
//                  '</div>'+
                  '</div>';
                  
                  $('#myWrapperScroller').append(nextProduct);
                  
                  var myProductDiv = document.getElementById('myProductDiv'+i);
                  FastClick.attach(myProductDiv);
                
                  myProductDivIndex = 0;
                  
                  myProductDiv.addEventListener('click', function(event) {
                                           if (myProductDivIndex == 0) {
                                           myLoading();
                                           myProductDivIndex = 1;
                                           fromDiscoverImg = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           largePicBackVar = 'discoverSearch';
                                           viewLargeHLPic(data.discover_id,data.websiteURL,data.pic_name,data.numOfComments,data.numOfLikes,data.upload_time,data.caption,data.username,search,data.pic_creator);
                                           
                                           }
                                           }, false);

                  
                  
                  });
           
           }
           
           setTimeout(function () {
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
                      
                      console.log('Return position: '+wrapperScrollX+' & '+wrapperScrollY);
                      
                      if (wrapperScrollY !=0) {
                      myWrapperScroller.scrollTo(wrapperScrollX, -wrapperScrollY, 200,true);
                      }
                      
                      $.unblockUI();
                      }, 1000);
           
           
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           
           $.unblockUI();
           $('#myWrapperScroller').empty().append('No products have been added yet.');
           
           } else {
           
           $.unblockUI();
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           $('#myWrapperScroller').empty().append('We couldn\t access Myavana products.');
           
           }
           }
           });
    
    
}


var searchPicIndex = 0;
var discoverSearchType = "";
var fromDiscoverImg = 0;
function getDiscoverSearch(search) {
    console.log('get discover search called: '+search);
    addLookReturnVar = 'searchpage';
    
    discoverSearchType = search;
    
    var category = search;
//    alert(category);
    searchPicIndex = 0;
    
    var rowCount = 0;
    var trackRow = 1;
    $('#discoverGridDiv').empty();
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getDiscover.php",
           data: {category:category},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           console.log('get user looks success');
           var trackImg;
           
           if(data.length == 0) {
           $('#discoverGridDiv').empty().append('There are no looks or products to Discover in this section yet.');
           }
           else {
           var dLength = data.length;
           ///grab each of the comments
           //               alert(String(JSON.stringify(data)));
           $.each(data, function(i,data){
                  //                      alert(data.upload_time);
                  //                      alert(data.pic_name);
                  
//                  alert(data.username);
                  
                  if (trackImg%3 == 0 || rowCount == 0) {
                  $("#discoverGridDiv").append("<div class='profLooksRow' id='profLooksRow"+trackRow+"'></div>");
                  rowCount = 1;
                  } else { }
                  
                  trackImg = i+1;
                  if(trackImg%3 == 1 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="leftLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var leftPicW = $('#userLook'+trackImg).outerWidth();
                  $('#userLook'+trackImg).css('height',leftPicW);
                  $('#lookPic'+trackImg).css('height','100%');
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (searchPicIndex == 0) {
                                           myLoading();
                                           searchPicIndex = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           fromDiscoverImg = 1;
                                           
                                           largePicBackVar = 'discoverSearch';
                                           
                                           viewLargeHLPic(data.discover_id,data.websiteURL,data.pic_name,data.numOfComments,data.numOfLikes,data.upload_time,data.caption,data.username,search,data.pic_creator);
                                           
                                           
                                           }
                                           }, false);
                  
                  } else if(trackImg%3 == 2 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="midLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var midPicW = $('#userLook'+trackImg).outerWidth();
                  $('#userLook'+trackImg).css('height',midPicW);
                  $('#lookPic'+trackImg).css('height','100%');
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (searchPicIndex == 0) {
                                           myLoading();
                                           fromDiscoverImg = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           searchPicIndex = 1;
                                           largePicBackVar = 'discoverSearch';
                                           viewLargeHLPic(data.discover_id,data.websiteURL,data.pic_name,data.numOfComments,data.numOfLikes,data.upload_time,data.caption,data.username,search,data.pic_creator);
                                           
                                           }
                                           }, false);
                  
                  
                  } else if(trackImg%3 == 0 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="rightLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var rightPicW = $('#userLook'+trackImg).outerWidth();
                  $('#userLook'+trackImg).css('height',rightPicW);
                  $('#lookPic'+trackImg).css('height','100%');
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (searchPicIndex == 0) {
                                           myLoading();
                                           searchPicIndex = 1;
                                           fromDiscoverImg = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           largePicBackVar = 'discoverSearch';
                                           viewLargeHLPic(data.discover_id,data.websiteURL,data.pic_name,data.numOfComments,data.numOfLikes,data.upload_time,data.caption,data.username,search,data.pic_creator);
                                           
                                           }
                                           }, false);
                  
                  rowCount = 0;
                  trackRow = trackRow + 1;
                  
                  } else { }
                  
                  
                  });
           
           if(dLength%3 == 0) {
           trackRow = trackRow -1;
           } else {}
           
           }
           
           setTimeout(function () {
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
                      
                      console.log('Return position: '+wrapperScrollX+' & '+wrapperScrollY);
                      
                      if (wrapperScrollY !=0) {
                      myWrapperScroller.scrollTo(wrapperScrollX, -wrapperScrollY, 200,true);
                      }
                      
                      $.unblockUI();
                      }, 1000);
           
           
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           
           $.unblockUI();
           $('#profileGroupDiv').empty().append('No looks have been added yet.');
           
           } else {
           
           $.unblockUI();
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           $('#profileGroupDiv').empty().append('We couldn\t access your Myavana looks.');
           
           }
           }
           });
    
    
}

/////////////////////
var lastPage = "";
function getFavSearch(search) {
    discoverSearchType = search;
    console.log('get fav search called');
//    discoverSearchType = search;
    
//    var category = search;
//    alert(category);
    searchPicIndex = 0;
    
    var rowCount = 0;
    var trackRow = 1;
    $('#discoverGridDiv').empty();
    
    $.ajax({
           type: 'GET',
           url: myMobileGlobalURL+"getFavorites.php",
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           console.log('get user looks success');
           var trackImg;
           
           if(data.length == 0) {
           $('#discoverGridDiv').empty().append('There are no looks or products to Discover in this section yet.');
           }
           else {
           var dLength = data.length;
           ///grab each of the comments
           //               alert(String(JSON.stringify(data)));
           $.each(data, function(i,data){
                  //                      alert(data.upload_time);
                  //                      alert(data.pic_name);
                  
                  if (trackImg%3 == 0 || rowCount == 0) {
                  $("#discoverGridDiv").append("<div class='profLooksRow' id='profLooksRow"+trackRow+"'></div>");
                  rowCount = 1;
                  } else { }
                  
                  trackImg = i+1;
                  if(trackImg%3 == 1 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="leftLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var leftPicW = $('#userLook'+trackImg).outerWidth();
                  $('#userLook'+trackImg).css('height',leftPicW);
                  $('#lookPic'+trackImg).css('height','100%');
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (searchPicIndex == 0) {
                                           discoverFavLanded = 1;
                                           myLoading();
                                           searchPicIndex = 1;
                                           largePicBackVar = 'discoverSearch';
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           fromMadamesFav = 1;
                                           fromMadamesFavLargeImg = 1;
                                           deleteUnusedIscroll();
                                           
                                           viewLargeHLPic(data.discover_id,data.websiteURL,data.pic_name,data.numOfComments,data.numOfLikes,data.upload_time,data.caption,data.username,data.category,data.pic_creator);
                                           
                                           }
                                           }, false);
                  
                  } else if(trackImg%3 == 2 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="midLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var midPicW = $('#userLook'+trackImg).outerWidth();
                  $('#userLook'+trackImg).css('height',midPicW);
                  $('#lookPic'+trackImg).css('height','100%');
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (searchPicIndex == 0) {
                                           discoverFavLanded = 1;
                                           myLoading();
                                           searchPicIndex = 1;
                                           largePicBackVar = 'discoverSearch';
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           deleteUnusedIscroll();
                                           
                                           fromMadamesFav = 1;
                                           fromMadamesFavLargeImg = 1;
                                           
                                           viewLargeHLPic(data.discover_id,data.websiteURL,data.pic_name,data.numOfComments,data.numOfLikes,data.upload_time,data.caption,data.username,data.category,data.pic_creator);
                                           
                                           }
                                           }, false);
                  
                  
                  } else if(trackImg%3 == 0 && rowCount == 1) {
                  
                  var photoRow = "#profLooksRow"+trackRow;
                  var photoDiv =
                  '<div class="rightLookDiv" id="userLook'+trackImg+'">'+
                  '<img src="'+data.pic_name+'" class="lookPic" id="lookPic'+trackImg+'"/>'+
                  '</div>';
                  
                  $(photoRow).append(photoDiv);
                  
                  var rightPicW = $('#userLook'+trackImg).outerWidth();
                  $('#userLook'+trackImg).css('height',rightPicW);
                  $('#lookPic'+trackImg).css('height','100%');
                  
                  var lookPic = document.getElementById('lookPic'+trackImg);
                  FastClick.attach(lookPic);
                  
                  lookPic.addEventListener('click', function(event) {
                                           if (searchPicIndex == 0) {
                                           discoverFavLanded = 1;
                                           myLoading();
                                           searchPicIndex = 1;
                                           
                                           wrapperScrollX = myWrapperScroller.x;
                                           wrapperScrollY = myWrapperScroller.y;
                                           console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                           
                                           deleteUnusedIscroll();
                                           
                                           fromMadamesFav = 1;
                                           fromMadamesFavLargeImg = 1;
                                           
                                           largePicBackVar = 'discoverSearch';
                                           viewLargeHLPic(data.discover_id,data.websiteURL,data.pic_name,data.numOfComments,data.numOfLikes,data.upload_time,data.caption,data.username,data.category,data.pic_creator);
                                           
                                           }
                                           }, false);
                  
                  rowCount = 0;
                  trackRow = trackRow + 1;
                  
                  } else { }
                  
                  
                  });
           
           if(dLength%3 == 0) {
           trackRow = trackRow -1;
           } else {}
           
           }
           
           setTimeout(function () {
                      
                      
                      myWrapperScroller = new iScroll('myWrapperStd', {hScroll:true, hScrollbar: false, vScrollbar: true, vScroll: true});
                      
                      console.log('Return position: '+wrapperScrollX+' & '+wrapperScrollY);
                      
                      if (wrapperScrollY !=0) {
                      myWrapperScroller.scrollTo(wrapperScrollX, -wrapperScrollY, 200,true);
                      }
                      
                      $.unblockUI();
                      
                      }, 1000);
           
           
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           
           $.unblockUI();
           $('#profileGroupDiv').empty().append('You have not uploaded a look to Myavana.');
           
           } else {
           
           $.unblockUI();
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           $('#profileGroupDiv').empty().append('We couldn\t access your Myavana looks.');
           
           }
           }
           });
    
    
}

////////////////////////

var discoverStylistBkBtnIndex = 0;

function stylistDiscPageActions() {
    myLoading();
    ////Slide in Search Page
    console.log('discover stylist page');
    
    var discoverStylistPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-stylistBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverStylistBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = discoverStylistPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    ////Add in Back Button
    var discoverStylistBkBtn = document.getElementById('discoverStylistBkBtn');
    FastClick.attach(discoverStylistBkBtn);
    
    discoverStylistBkBtnIndex = 0;
    
    discoverStylistBkBtn.addEventListener('click', function(event) {
                                             if (discoverStylistBkBtnIndex == 0) {
                                             discoverStylistBkBtnIndex = 1;
                                          
                                                deleteUnusedIscroll();
                                          
                                             searchHairstylesPageAction();
                                             }
                                             }, false);

    
    setTimeout(function () {
            
            getStylistSearch();
               
     }, 1500);
}

var myGFDetailsTextIndex = 0;
var unfollowGFBtnDivIndex = 0;
var stylistRow = 0;

var stylistFollowBtnDivIndex = 0;

var stylistwrapperScrollX = 0;
var stylistwrapperScrollY = 0;

function getStylistSearch() {
        //Ajax Post request
        userFriendRows = "";
        $('#myWrapperScroller').empty();
    
        $.ajax({
               type: 'GET',
               url: myMobileGlobalURL+"getStylist.php",
               data: {UID:userArray.uid,latitude:userArray.latitude,longitude:userArray.longitude},
               timeout:30000,
               dataType: 'json',
               success: function(data) {
               if(data.stylist=="" || data.stylist.length == 0){
               $('#myWrapperScroller').append("<div style='font-size:90%; width:100%;'>No Stylist to view.</div>");
               }
               else
               {
               $.each(data.stylist, function(i,data)
                      {
                      if(data.pic == null || data.pic == 'null' || data.pic == '') {
                      var friendPic = 'img/no-photo.png';
                      } else {
                      var friendPic = 'http://54.214.19.19/pictures/profilePics/'+data.pic;
                      }
                      
                      if (data.city == null || data.city == 'null' || data.city == "") {
                            var cityStateString = "";
                      } else {
                            var cityStateString = data.city+', '+data.state;
                      }
                      
                      var nextFriend =
                      '<div class="myStylistDiv" id="myStylistDiv">'+
                        '<img src="'+friendPic+'" class="teaUserPic"/>'+
                        '<div class="myGFDetailsText" id="myGFDetailsText'+i+'">'+
                            '<b style="color:black;">'+data.fullName+'</b><br>'+data.username+
                        '</div>'+
                        '<div class="myGFBtnDiv" id="stylistFollowBtnDiv'+i+'"><img src="img/'+data.followStatus+'.png" class="friendBtnBG" id="stylistFollowStatusBtn'+i+'"/></div>'+
                        '<div class="stylistDetDiv" id="stylistDetDiv">'+
                            '<div class="stylistSpecialty"><b>Specialty: </b>'+data.specialty+'</div>'+
                            '<div class="stylistExperience"><b>Experience: </b>'+data.experience+'</div>'+
                            '<div class="stylistSalon"><b>Salon: </b>'+data.salon+'</div>'+
                            '<div class="stylistCityState"><b>'+cityStateString+'</b></div>'+
                        '</div>'+
                      '</div>';
                      
                      $('#myWrapperScroller').append(nextFriend);
                      
                      if (data.followStatus == 'follow') {
                      
                              var stylistFollowBtnDiv = document.getElementById('stylistFollowBtnDiv'+i);
                              FastClick.attach(stylistFollowBtnDiv);
                              
                              stylistFollowBtnDivIndex = 0;
                              
                              stylistFollowBtnDiv.addEventListener('click', function(event) {
                                                                if (stylistFollowBtnDivIndex == 0) {
                                                                stylistFollowBtnDivIndex = 1;
                                                                   
                                                                   wrapperScrollX = myWrapperScroller.x;
                                                                   wrapperScrollY = myWrapperScroller.y;
                                                                   console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                                                
                                                                stylistFollowUser(data.UID);
                                                                
                                                                }
                                                                }, false);

                      
                      
                      } else if (data.followStatus == 'following') {
                      
                              var stylistFollowBtnDiv = document.getElementById('stylistFollowBtnDiv'+i);
                              FastClick.attach(stylistFollowBtnDiv);
                              
                              stylistFollowBtnDivIndex = 0;
                              
                              stylistFollowBtnDiv.addEventListener('click', function(event) {
                                                                   if (stylistFollowBtnDivIndex == 0) {
                                                                   stylistFollowBtnDivIndex = 1;
                                                                   
                                                                   wrapperScrollX = myWrapperScroller.x;
                                                                   wrapperScrollY = myWrapperScroller.y;
                                                                   console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                                                   
                                                                   stylistUnfollowUser(data.UID);
                                                                   
                                                                   }
                                                                   }, false);
                      
                      }
                      
                      
                      var myGFDetailsText = document.getElementById('myGFDetailsText'+i);
                      FastClick.attach(myGFDetailsText);
                      
                      myGFDetailsTextIndex = 0;
                      
                      myGFDetailsText.addEventListener('click', function(event) {
                                                       if (myGFDetailsTextIndex == 0) {
                                                       myGFDetailsTextIndex = 1;
                                                       
                                                       wrapperScrollX = myWrapperScroller.x;
                                                       wrapperScrollY = myWrapperScroller.y;
                                                       console.log('Current Scroll Pos X & Y: '+wrapperScrollX+' & '+wrapperScrollY);
                                                       
                                                       deleteUnusedIscroll();
                                                       
                                                       if(data.UID == userArray.uid) {
                                                       profilePageActions('stylist');
                                                       } else {
                                                       otherProfilePageActions(data.UID,'stylist');
                                                       }
                                                       
                                                       }
                                                       }, false);
                      
                      });
               
               }
               
               //           $('#myWrapperScroller').append(userFriendRows);
               
               //getUserFriends(userArray.uid);
               setTimeout(function () {
                          
                          
                          myWrapperScroller = new iScroll('myWrapperStd', {hScrollbar: false, vScrollbar: true, vScroll: true, bounce:true});
                          
                          console.log('Return position: '+wrapperScrollX+' & '+wrapperScrollY);
                          
                          if (wrapperScrollY != 0) {
                                console.log('wrapper scroller y = '+wrapperScrollY);
                                myWrapperScroller.scrollTo(wrapperScrollX, -wrapperScrollY, 100,true);
                          }
                          
                          $.unblockUI();
                          
                }, 1000);
               
               },
               error: function(xhr, type, error) {
               
               console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
               $.unblockUI();
               
               if (type === "timeout") {
               navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',none(), 'Myavana', 'OK');
               } else {
               navigator.notification.alert('Somethings wrong try again when you have a better connection.',none(), 'Myavana', 'OK');
               }
               //getUserFriends(userArray.uid);
               }
               });

    
    
    
}

function stylistFollowUser(id) {
    var recipient_id = id;
    var request_id = userArray.uid;
    var username = userArray.username;
    
    $.ajax({
           type: 'GET',
           timeout:15000,
           url: myMobileGlobalURL+"sendFollowerRequest.php",
           data: {request_id:request_id,recipient_id:recipient_id,username:username},
           dataType: 'json',
           success: function(data) {
           if(data.success){
           console.log('***PUSH SUCCESS - '+data.pushsuccess);
           stylistFollowBtnDivIndex = 0;
           userArray.numberOfFriends = data.followers;
           myLoading();
           deleteUnusedIscroll();
           
           stylistFollowBtnDivIndex = 0;
           
           navigator.notification.alert('You just followed a stylist.',getStylistSearch(), 'Myavana', 'OK');
           
           }
           else{
           navigator.notification.alert('Error! You are already following this user.',stylistFollowBtnDivIndex = 0, 'Myavana', 'OK');
           }
           
           
           },
           error: function(xhr, type, error) {
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',stylistFollowBtnDivIndex = 0, 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',stylistFollowBtnDivIndex = 0, 'Myavana', 'OK');
           }
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           profileFollowBtnIndex = 0;
           
           }
           });
}

function stylistUnfollowUser(id) {
    var recipient_id = id;
    var request_id = userArray.uid;
    var username = userArray.username;
    
    $.ajax({
           type: 'GET',
           timeout:15000,
           url: myMobileGlobalURL+"deleteFollower.php",
           data: {request_id:request_id,recipient_id:recipient_id},
           dataType: 'json',
           success: function(data) {
           if(data.success){
           
                userArray.numberOfFriends = data.followers;
               stylistFollowBtnDivIndex = 0;
                myLoading();
                deleteUnusedIscroll();
           
               getStylistSearch();
           }
           else{
               navigator.notification.alert(data.message,stylistFollowBtnDivIndex = 0, 'Myavana', 'OK');
           }
           
           
           },
           error: function(xhr, type, error) {
           
           if (type === "timeout") {
           navigator.notification.alert('The app has timed out out, try again later with a better internet connection.',stylistFollowBtnDivIndex = 0, 'Myavana', 'OK');
           } else {
           navigator.notification.alert('Somethings wrong try again when you have a better connection.',stylistFollowBtnDivIndex = 0, 'Myavana', 'OK');
           }
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           stylistFollowBtnDivIndex = 0;
           
           }
           });
}



var discoverProtectiveBkBtnIndex = 0;

function protectiveDiscPageActions() {
    myLoading();
    deleteUnusedIscroll();
    
    var discoverProtectivePage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'discoverProtectiveBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverProtectiveBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '<div class="discoverPhotosSection" id="discoverPhotosSection">'+
    '<div class="profileGroupDiv" id="discoverGridDiv">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    ////Slide in Search Page
    page = discoverProtectivePage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    ////Add in Back Button
    var discoverProtectiveBkBtn = document.getElementById('discoverProtectiveBkBtn');
    FastClick.attach(discoverProtectiveBkBtn);
    
    discoverProtectiveBkBtnIndex = 0;
    
    discoverProtectiveBkBtn.addEventListener('click', function(event) {
                                             if (discoverProtectiveBkBtnIndex == 0) {
                                             discoverProtectiveBkBtnIndex = 1;
                                             
                                             deleteUnusedIscroll();
                                             
                                             searchHairstylesPageAction();
                                             }
                                             }, false);
    
    setTimeout(function () {
               fromDiscoverImg = 1;
               
               getDiscoverSearch('protective');
               
               }, 1500);

    
    
}

var discoverStraightendBkBtnIndex = 0;
function straightDiscPageActions() {
    deleteUnusedIscroll();
    myLoading();
    
    
    var discoverStraightPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-straitenedbg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverStraightendBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    
    '<div class="discoverPhotosSection" id="discoverPhotosSection">'+
    '<div class="profileGroupDiv" id="discoverGridDiv">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    
    '</div>'+
    '</div>';
    
    ////Slide in Search Page
    page = discoverStraightPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    ////Add in Back Button
    var discoverStraightendBkBtn = document.getElementById('discoverStraightendBkBtn');
    FastClick.attach(discoverStraightendBkBtn);
    
    discoverStraightendBkBtnIndex = 0;
    
    discoverStraightendBkBtn.addEventListener('click', function(event) {
                                              if (discoverStraightendBkBtnIndex == 0) {
                                              discoverStraightendBkBtnIndex = 1;
                                              
                                              deleteUnusedIscroll();
                                              
                                              searchHairstylesPageAction();
                                              }
                                              }, false);
    

    
    setTimeout(function () {
               fromDiscoverImg = 1;
               
                  getDiscoverSearch('straightened');
               
               }, 1500);
    
    
}

var discoverProductsBkBtnIndex = 0;
function productDiscPageActions() {
    console.log('products page action called');
    myLoading();
    ////Slide in Search Page
    
    var discoverProductsPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myProductsBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverProductsBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = discoverProductsPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    ////Add in Back Button
    var discoverProductsBkBtn = document.getElementById('discoverProductsBkBtn');
    FastClick.attach(discoverProductsBkBtn);
    
    discoverProductsBkBtnIndex = 0;
    
    discoverProductsBkBtn.addEventListener('click', function(event) {
                                           if (discoverProductsBkBtnIndex == 0) {
                                           discoverProductsBkBtnIndex = 1;
                                           deleteUnusedIscroll();
                                           
                                                    hairProductsDiscPageActions();
                                           
                                           }
                                           }, false);
    
    
    setTimeout(function () {
               fromDiscoverImg = 1;
               
               getDiscoverSearchProducts('shampoo');
               ////Get Discover Search Shampoo new Styling function
               
               
    }, 1500);
    
}

var discoverMaintenanceBkBtnIndex = 0;
var addLookBkBtnIndex = 0;

function maintenanceDiscPageActions() {
    deleteUnusedIscroll();
    myLoading();
    
    ////Slide in Search Page
    
    
    var discoverMaintenancePage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myProductsBg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="discoverMaintenanceBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    '<div class="myWrapperStd" id="myWrapperStd">'+
    '<div class="myWrapperScroller" id="myWrapperScroller">'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = discoverMaintenancePage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    ////Add in Back Button
    var discoverMaintenanceBkBtn = document.getElementById('discoverMaintenanceBkBtn');
    FastClick.attach(discoverMaintenanceBkBtn);
    
    discoverMaintenanceBkBtnIndex = 0;
    
    discoverMaintenanceBkBtn.addEventListener('click', function(event) {
                                              if (discoverMaintenanceBkBtnIndex == 0) {
                                              discoverMaintenanceBkBtnIndex = 1;
                                              
                                              deleteUnusedIscroll();
                                              getDiscoverSearch('protective');
                                              
                                              hairProductsDiscPageActions();
                                              }
                                              }, false);
    
//    getDiscoverSearch('maintenance');

    
    setTimeout(function () {
               fromDiscoverImg = 1;
               
               getDiscoverSearchProducts('maintenance');
               ////Get Discover Search Maintenance new Styling function
               
    }, 1500);
    
}

var searchProductsBkBtnIndex = 0;

var fromHairProductsDiscPage = 0;
var fromHairProducts = 0;

function hairProductsDiscPageActions() {
    fromHairProductsDiscPage = 0;
    fromHairProducts = 0;
    ////Slide in Search Page
    
    var searchProductsPage =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'my-discoverProduct-Bg.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="searchProductsBkBtn"></div>'+
    '<div class="addLookBtn" id="searchPgAddLook" onclick="addNewLook(\'searchpage\')"></div>'+
    '<div class="leftProdBtnSec" id="shampoosAndCondBtn"></div>'+
    '<div class="rightProdBtnSec" id="stylingBtn"></div>'+
    '<div class="optionsBtnSec" id="blogBtnClick2"></div>'+
    '</div>'+
    '</div>';

    
    page = searchProductsPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    ////Add in Back Button
    var searchProductsBkBtn = document.getElementById('searchProductsBkBtn');
    FastClick.attach(searchProductsBkBtn);
    
    searchProductsBkBtnIndex = 0;
    
    searchProductsBkBtn.addEventListener('click', function(event) {
                                         if (searchProductsBkBtnIndex == 0) {
                                         searchProductsBkBtnIndex = 1;
                                         
                                         
                                         searchHairstylesPageAction();
                                         }
                                         }, false);
    
    var shampoosAndCondBtn = document.getElementById('shampoosAndCondBtn');
    FastClick.attach(shampoosAndCondBtn);
    
    productsBtnSecIndex = 0;
    
    shampoosAndCondBtn.addEventListener('click', function(event) {
                                    if (productsBtnSecIndex == 0) {
                                    productsBtnSecIndex = 1;
                                    
                                    fromHairProductsDiscPage = 1;
                                        myLoading();
                                    productDiscPageActions();
                                    
                                    }
                                    }, false);
    
    var stylingBtn = document.getElementById('stylingBtn');
    FastClick.attach(stylingBtn);
    
    maintenanceBtnSecIndex = 0;
    
    stylingBtn.addEventListener('click', function(event) {
                                       if (maintenanceBtnSecIndex == 0) {
                                       maintenanceBtnSecIndex = 1;
                                
                                       fromHairProductsDiscPage = 1;
                                myLoading();
                                       maintenanceDiscPageActions();
                                       
                                       }
                                       }, false);
    
//    var blogBtnClick = document.getElementById('blogBtnClick2');
//    FastClick.attach(blogBtnClick);
//    
//    blogBtnClickIndex = 0;
//    
//    blogBtnClick.addEventListener('click', function(event) {
//                                  if (blogBtnClickIndex == 0) {
//                                  blogBtnClickIndex = 1;
//                                  
//                                  var myBlogDisc2 = window.open('http://www.madameyou.com/', '_blank', 'EnableViewPortScale=yes');
//                                  myBlogDisc2.addEventListener('exit', function(event) { blogBtnClickIndex = 0; });
//                                  
//                                  }
//                                  }, false);

}

var lookUploadBtnIndex = 0;
var imageUpload = "";
var addLookReturnVar = "";
var doneUploadBtnIndex = 0;
var addLookBkBtnIndex = 0;

var uploadTypeSelected = '';
var uploadCaption = '';

function addNewLook(returnPage) {
    ////alert('new look add clicked '+returnPage);
    ////Slide in Search Page
    if (returnPage == '') {
        console.log('******^^^^^>>>>>'+returnPage+'<<<<<<^^^^^******');
    } else {
        console.log('******'+returnPage+'******');
        addLookReturnVar = returnPage;
    }

    
    
    var addLookPage =
    '<div data-role="page" >'+
        '<div class="container" '+containerStyleVar+'>'+
        '<img src="img/'+deviceSizeFolder+'addLookBgPage.png" class="loginBack"/>'+
        '<div class="profBkBtn" id="addLookBkBtn"></div>'+
        '<div class="addLookBtn" id="takeLook1"></div>'+
        '<div class="addLookPlaceholderDiv" id="addLookPlaceholderDiv"><img src="img/addNewLookPlaceholder.png" id="lookUploadBtn" class="newLookImg"/></div>'+
        
        '<div class="uploadStyleDiv">'+
        '<select id="uploadLookStyleSelect" class="uploadLookHairstyle" name="uploadStyleSelect" data-role="none">'+
        '<option value="" selected="selected">CHOOSE HAIRSTYLE</option>'+
        '<option value="curly">Curly,Kinky,Wavy</option>'+
        '<option value="straightened">Straightened</option>'+
        '<option value="protective">Protective</option>'+
        '</select>'+
        '</div>'+
        
        '<input type="text" name="addLookCaption" id="addLookCaption" class="addLookCaption" maxlength="255" placeholder="Caption this look - Steps? Products?"/>'+
        
        '<img class="lookUploadBtn" id="doneUploadBtn" src="img/addNewLookDoneBtn.png"/>'+
        
        '</div>'+
    '</div>';
    
    
    page = addLookPage;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    
    
    if(uploadTypeSelected == "") {} else {
        $("#uploadLookStyleSelect").val(uploadTypeSelected);
        
    }
    
    if(uploadCaption == "") {} else {
        $("#addLookCaption").val(uploadCaption);
        
    }
    
    var uploadImgWidth = screenWidth * .8;
    $('#addLookPlaceholderDiv').css("height", uploadImgWidth);
    
    setTimeout(function () {
               
    var addLookBkBtn = document.getElementById('addLookBkBtn');
    FastClick.attach(addLookBkBtn);
    
    addLookBkBtnIndex = 0;
    
    addLookBkBtn.addEventListener('click', function(event) {
                                  if (addLookBkBtnIndex == 0) {
                                  addLookBkBtnIndex = 1;
                                  
                                  $('#addLookCaption').val("");
                                  $('#uploadLookStyleSelect').val("");
                                  tempBeforePhoto = "";
                                  
                                  returnPageFunction();
                                  
                                  }
                                  }, false);
    
    var lookUploadBtn = document.getElementById('lookUploadBtn');
    FastClick.attach(lookUploadBtn);
    
    lookUploadBtnIndex = 0;
    
    if (tempBeforePhoto != "") {
        $(".newLookImg").attr("src",tempBeforePhoto);
    }
    
    lookUploadBtn.addEventListener('click', function(event) {
                                   if (lookUploadBtnIndex == 0) {
                                   lookUploadBtnIndex = 1;
                                   
                                   uploadTypeSelected = $('#uploadLookStyleSelect').val();
                                   uploadCaption = $('#addLookCaption').val();
                                   
                                   imageUpload = 'look';
                                   ////Add Upload alert to ask upload from gallery or take pic
                                   navigator.notification.confirm(
                                                                  'Upload a New Look',  // message
                                                                  uploadNewLook,              // callback to invoke with index of button pressed
                                                                  'Myavana',            // title
                                                                  ['Camera','Gallery','Cancel']          // buttonLabels
                                                                  );
                                   
                                   }
                                   }, false);
    
    var doneUploadBtn = document.getElementById('doneUploadBtn');
    FastClick.attach(doneUploadBtn);
    
    doneUploadBtnIndex = 0;
    
    doneUploadBtn.addEventListener('click', function(event) {
                                   if (doneUploadBtnIndex == 0) {
                                   doneUploadBtnIndex = 1;
                                   lookUploadSubmit();
                                   
                                   function lookUploadSubmit() {
                                   uploadTypeSelected = $('#uploadLookStyleSelect').val();
                                   uploadCaption = $('#addLookCaption').val();
                                   
                                   if (uploadTypeSelected == "" || uploadTypeSelected == null) {
                                   navigator.notification.alert('You must select a Hairstyle Type',doneUploadBtnIndex = 0, 'Myavana', 'OK');
                                   } else if (tempBeforePhoto == "" || tempBeforePhoto == null || tempBeforePhoto == 'undefined') {
                                   navigator.notification.alert('You must upload a picture to add a new Look.',doneUploadBtnIndex = 0, 'Myavana', 'OK');
                                   } else {
                                   
                                   myLoading();
                                   submitNewLook(uploadTypeSelected,uploadCaption,tempBeforePhoto);
                                   
                                   }
                                   }
                                   
                                   }
                                   }, false);
               
    }, 500);
    
    
}

function returnPageFunction() {
    tempBeforePhoto = "";
    
    console.log('return page function called');
    
    deleteUnusedIscroll();
    
    if (addLookReturnVar == 'profile') {
        profilePageActions('');
    } else if (addLookReturnVar == 'homepage') {
        homePageActions();
    } else if (addLookReturnVar == 'searchpage') {
        searchHairstylesPageAction();
    } else if (addLookReturnVar == 'girlfriends') {
        girlfriendsPageAction();
    } else if (addLookReturnVar == 'savedlooks') {
        getLooksSaved();
    } else if (addLookReturnVar == 'headlines') {
        headlinesPageAction();
    } else if (addLookReturnVar == 'largepic') {
        myLoading();
        viewLargeHLPic(largePicArray.mediaid,largePicArray.username,largePicArray.picurl,largePicArray.numOfComments,largePicArray.numOfLikes,largePicArray.caption,largePicArray.disCaption,largePicArray.discusername,largePicArray.disccategory,largePicArray.creatorUID);
    } else if (addLookReturnVar == 'thetea') {
        teaPageActions();
    } else if (addLookReturnVar == 'editProfile') {
        editProfileActions();
    } else if (addLookReturnVar == 'discoveryCurlyPage') {
        curlyDiscPageActions();
    } else if (addLookReturnVar == 'discoveryFavPage') {
        madameFavDiscPageActions();
    } else if (addLookReturnVar == 'discoveryProtectivePage') {
        protectiveDiscPageActions();
    } else if (addLookReturnVar == 'discoveryStraightendPage') {
        straightDiscPageActions();
    } else if (addLookReturnVar == 'discoveryProductsPage') {
        productDiscPageActions();
    } else if (addLookReturnVar == 'discoveryMaintenacePage') {
        
        maintenanceDiscPageActions();
    } else if (addLookReturnVar == 'notifications') {
        teaPageActions();
    } else if (addLookReturnVar == 'stylist') {
        stylistDiscPageActions();
    }else {
        homePageActions();
    }
}

function submitNewLook(hairstyle,lookcaption,lookpic) {
    //    var captionencoded = htmlEncode(lookcaption);
    console.log('Submit Look Called || Parameters: UID - '+userArray.uid+' Hairstyle - '+hairstyle+' Caption - '+lookcaption+' Look Pic URL - '+lookpic);
    
    $.ajax({
           type: 'POST',
           url: myMobileGlobalURL+"submitNewLook.php",
           data: {uid:userArray.uid,hairstyle:hairstyle,lookcaption:lookcaption,lookpic:lookpic},
           dataType: 'json',
           timeout: 15000,
           success: function(data) {
           
           console.log('Submit Success');
           if (data.success) {
           doneUploadBtnIndex = 0;
           
           $('#addLookCaption').val("");
           $('#uploadLookStyleSelect').val("");
           
           uploadTypeSelected = "";
           uploadCaption = "";
           
           tempBeforePhoto = "";
           
           userArray.numberOfLooks = userArray.numberOfLooks + 1;
           
           $.unblockUI();
           navigator.notification.alert(data.comment,returnPageFunction(), 'Myavana', 'OK');
           } else {
           
           $.unblockUI();
           navigator.notification.alert(data.comment,doneUploadBtnIndex = 0,'Myavana','OK');
           }
           
           },
           error: function(xhr, type, error) {
           if (type === "timeout") {
           
           $.unblockUI();
           navigator.notification.alert('Your upload timed out try again with a better connection.',doneUploadBtnIndex = 0, 'Myavana', 'OK');
           
           } else {
           
           $.unblockUI();
           console.log('Internal Error Occured!'+xhr.responseText+','+type+','+error);
           navigator.notification.alert('Your look upload failed try again.',doneUploadBtnIndex = 0, 'Myavana', 'OK');
           
           }
           }
           });
    
    
    
}

function uploadNewLook(buttonIndex) {
    ////Camera pic upload selected
    if (buttonIndex === 1) {
        take_pic();
        lookUploadBtnIndex = 0;
    } ////Gallery Pic Upload selected
    else if (buttonIndex === 2) {
        album_pic();
        lookUploadBtnIndex = 0;
    } else {
        lookUploadBtnIndex = 0;
    }
}

//var photoUpload =  '<div data-role="page">'+
//'<div data-role="header" role="banner" class="newHubHeader">'+
//'<div class="menuHeadLeft" id="submitImage"><img class="headerMenuIcon" src="img/submitCheck.png"/></div>'+
//'<div class="headerCenterIcon"><img class="headerMyIcon" src="img/headerIcon-my.png"/></div>'+
//'<div class="menuHeadRight" id="cancelImage"><img class="headerMenuIcon" src="img/minusCancel.png"/></div>'+
//'</div>'+
//'<div class="photoWrapper" id="photoWrapper" >'+
//'<div id="photoSection" style="width:100%;">'+
//'<div class="imageDiv" id="imageDiv" style="background-color:#000;">'+
//'<img id="uploadedImg" "src=""/>'+
//'</div>'+
//'</div>'+
//'</div>'+
//'</div>';

var sendNewLookPhoto = 0;
var cancelNewLookPhoto = 0;
function getNewLookUpload() {
    
    
    var photoUpload =
    '<div data-role="page" >'+
    '<div class="container" '+containerStyleVar+'>'+
    '<img src="img/'+deviceSizeFolder+'myCropPgBG.png" class="loginBack"/>'+
    '<div class="searchBkBtn" id="cancelImage"></div>'+
    '<div class="submitLookBtn" id="submitImage" ></div>'+
    
    '<div class="myWrapperStd" id="photoWrapper" >'+
    '<div id="myWrapperScrollerNOPAD" style="width:100%;">'+
    '<div class="imageDiv" id="imageDiv" style="background-color:#000;">'+
    '<img id="uploadedImg" "src=""/>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    
    page = photoUpload;
    slider.slidePage($(page));
    
    if ( window.pageYOffset != 0 || window.pageYOffset != '0' ) {
        
        window.scroll(0,0);
        
    }
    $('#imageDiv').css("height", scrollHeight);
    
    var sendPhoto = document.getElementById('submitImage');
    var cancelPhoto = document.getElementById('cancelImage');
    
    FastClick.attach(sendPhoto);
    FastClick.attach(cancelPhoto);
    
    sendNewLookPhoto = 0;
    cancelNewLookPhoto = 0;
    
    sendPhoto.addEventListener('click', function(event) {
                               if(sendNewLookPhoto == 0) {
                               sendNewLookPhoto = 1;
                               //myLoading();
                               
                               checkCoords();
                               }
                               }, false);
    
    cancelPhoto.addEventListener('click', function(event) {
                                 ////add checks for before or after image and go back to the right page on cancel
                                 if(cancelNewLookPhoto == 0) {
                                 cancelNewLookPhoto = 1;
                                 
                                 addNewLook(addLookReturnVar);
                                 
                                 }
                                 
                                 }, false);
    
}

var cropSize;
function callJcrop(image_width,image_height) {
    
    var qH = image_height;
    var qW = image_width;
    var halfH = qH / 2;
    var halfW = qW / 2;
    
    if (halfH<halfW) {
        cropSize = halfH;
    } else {
        cropSize = halfW;
    }
    
    if($('#uploadedImg').attr("src") != "") {
        console.log('jcrop called');
        $('#uploadedImg').Jcrop({
                                //boxWidth: qW,
                                //boxHeight: qH,
                                bgColor:'black',
                                bgOpacity:.4,
                                minSize:[cropSize,cropSize],
                                setSelect:[0,0,cropSize,cropSize],
                                onSelect:updateCoords,
                                trueSize:[image_width,image_height],
                                allowSelect:false,
                                addClass: 'jcrop-dark',
                                aspectRatio:1 ///make it a square at all times
                                });
        
        
        var uploadedImgH = $('#uploadedImg').outerHeight();
        var uploadedImgW = $('#uploadedImg').outerWidth();
        
        //console.log('JCrop uploadedImg H & W'+uploadedImgH+"----"+uploadedImgW);
        
        var uploadedImgHt = $('#uploadedImg').outerHeight(true);
        var uploadedImgWt = $('#uploadedImg').outerWidth(true);
        
        //console.log('JCrop uploadedImg H & W'+uploadedImgHt+"----"+uploadedImgWt);
        
        
    } else {
        
        navigator.notification.alert('No Image was Uploaded',none(), 'Myavana', 'OK');
    }
}

////Crop Image Coordinate Variables
var x, y, w, h;

function updateCoords(c){
    x = c.x;
    y = c.y;
    w = c.w;
    h = c.h;
    
    console.log(x);
    console.log(y);
    console.log("w "+w);
    console.log("h "+h);
};

///// function to ensure that the crop is correctly selected before submit
function checkCoords(){
    
    console.log("Device Dimention using PhoneGap");
    console.log("Width = " + screen.width);
    console.log("Height = " + screen.height);
    
    if (parseInt(w)){
        //// grab the src of the image we were manipulating
        var options = new FileUploadOptions();
        
        options.fileKey="file";
        imageURI = $('#uploadedImg').attr("src");
        
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
        
        options.mimeType= "image/jpeg";
        
        //	      		var image = $('#tmpImage').attr('src');
        
        var params = new Object();
        
        ////check if this is an event picture or profile picture
        //        var imageUpload = sessionStorage.getItem('imageUpload');
        ////alert(imageUpload);
        if (imageUpload == 'look') {
            
            
            ////USER PARAMS OBJECT TO PASS PaRAMETERS WITH IMAGE
            //            params.eventCreatorUID = sessionStorage.getItem('eventCreatorUID');
            //            params.EID = sessionStorage.getItem('EID');
            //            params.UID = sessionStorage.getItem('UID');
            params.x = x;
            params.y = y;
            params.w = w;
            params.h = h;
            params.chunkedMode = false;
            options.params = params;
            
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://54.214.19.19/include/mobile/uploadBeforePicture.php", winB, failB, options);
        } else if (imageUpload == 'profile') {
            
            ////USER PARAMS OBJECT TO PASS PaRAMETERS WITH IMAGE
            //            params.eventCreatorUID = sessionStorage.getItem('eventCreatorUID');
            //            params.EID = sessionStorage.getItem('EID');
            params.UID = userArray.uid;
            params.x = x;
            params.y = y;
            params.w = w;
            params.h = h;
            params.chunkedMode = false;
            options.params = params;
            
            console.log('upload profile picture: '+params.UID+' '+params.x+' '+params.y+' '+params.w+' '+params.h);
            
            var ft = new FileTransfer();
            
            ft.upload(imageURI, "http://54.214.19.19/include/mobile/uploadProfilePicture.php", winP, failP, options);
        }
        
    }
    else{
        
        navigator.notification.alert('Please select a crop region then press submit.',none(), 'Myavana', 'OK');
        //return false;
    }
};


////Profile Photo Change Success and Failure Functions
var tempBeforeImageLocation;
var tempBeforePhoto = "";
function winB(r) {
    console.log('image success submit');
    
    
    console.log("Code = " + r.responseCode.toString()+"\n");
    console.log("Response = " + r.response.toString()+"\n");
    console.log("Sent = " + r.bytesSent.toString()+"\n");
    var beforeImageUploadResp = r.response;
    //    alert(afterImageUploadResp);
    var beforeTempStringJsonArray = jQuery.parseJSON(beforeImageUploadResp);
    
    tempBeforePhoto = beforeTempStringJsonArray.fileURL;
    //    alert(tempBeforePhoto);
    
    tempBeforeImageLocation = beforeTempStringJsonArray.fileURL;
    var beforeTempFileNae = beforeTempStringJsonArray.fileName;
    //    alert('file URL '+ tempBeforeImageLocation);
    //    alert('file Name '+beforeTempFileNae);
    
    
    sessionStorage.setItem('tempBeforePhotoAdd',1);
    sessionStorage.setItem('tempBeforePhoto',tempBeforeImageLocation);
    sessionStorage.setItem('tempBeforePhotoFilename',beforeTempFileNae);
    
    $.unblockUI();
    addNewLook('headlines');
    
}

function failB(error) {
    //console.log('image fail upload submit');
    
    //alert("An error has occurred: Code = " + error.code);
    //console.log("upload error source " + error.source);
    //console.log("upload error target " + error.target);
    
    $.unblockUI();
    navigator.notification.alert('Image Failed To Upload! Try again.',addNewLook(addLookReturnVar), 'Myavana', 'OK');
    
    
}


var fbLoginStatusVar = 0;
function checkFBLoginStatus(postString,postImg) {
    
    FB.getLoginStatus(function(response) {
                      if (response.status == 'connected') {
                      fbLoginStatusVar = 1;
                      profFbImgIndex = 0;
                      
                      setTimeout(function () {
                                 facebookWallPost2(postString,postImg);
                                 }, 500);
                      
                      
                      } else {
                      fbLogin(postString,postImg);
                      }
                      });
}

////////////FACEBOOK SHARE FUNCTIONS
function facebookWallPost2(postString,img) {
    
    var params = {
    method: 'feed',
    name: 'Go Download Myavana Today!',
    link: 'http://www.madameyou.com',
    picture: img,
    caption: postString,
    description: 'I just downloaded the Myavana app from the Apple Store, you should check it out for all your hair care needs.'
    };
    console.log(params);
    FB.ui(params, function(response) { if (response && response.post_id) {
          profFbImgIndex = 0;
          navigator.notification.alert('Congrats, You just shared Myavana with your Facebook Friends. Thanks.',myOptionsFacebookIndex = 0, 'Myavana', 'OK');
          ////window.location = "eventDetails.html";
          } else {
          profFbImgIndex = 0;
          navigator.notification.alert('Sorry, You couldn\'t share Myavana on Facebook',myOptionsFacebookIndex = 0, 'Myavana', 'OK');
          ////window.location = "eventDetails.html";
          }
          });
}

function fbLogin(postString,postImg) {
    //alert('fblogin called');
    FB.login(
             function(response) {
             if (response.session) {
             
             if (response.status == 'connected') {
             main.loadAjax(main.ajaxPrefix + '/auth/loginsocial/', {
                           fbId : uid,
                           access_token: response.authResponse.accessToken,
                           secret: TOP_SECRET_GENERATED_HASH
                           }, auth.successLogin, auth.errorLogin);
             
             navigator.notification.alert('Thanks for adding Facebook access to Myavana, Invite your FB friends to Download Myavana to share all their natural looks.',none(), 'Myavana', 'OK');
             
             fbLoginStatus = 1;
             
             facebookWallPost(postString,postImg);
             
             } else if (response.status === 'not_authorized') {
             
             navigator.notification.alert('Error in authentication: not authorized',profFbImgIndex = 0, 'Myavana', 'OK');
             } else {
             
             navigator.notification.alert('Facebook Login Unsuccessful, unknown error in authentication',profFbImgIndex = 0, 'Myavana', 'OK');
             }
             
             }
             },
             { scope: "email" }
             );
}

////////////FACEBOOK SHARE FUNCTIONS
function facebookWallPost(postString,postImg) {
    
    //    var userName = window.localStorage["username"];
    //
    //    var postHeadingString = userName+" just shared an image at "+eventName+" on MY.";
    
    var params = {
    method: 'feed',
    name: 'Go check out this look on Myavana',
    link: 'http://www.madameyou.com',
    picture: postImg,
    caption: 'Myavana',
    description: postString
    };
    console.log(params);
    FB.ui(params, function(response) { if (response && response.post_id) {
          profFbImgIndex = 0;
          ////window.location = "eventDetails.html";
          } else {
          
          navigator.notification.alert('The look was not posted on Facebook.',profFbImgIndex = 0, 'Myavana', 'OK');
          ////window.location = "eventDetails.html";
          }
          });
}

////////////// CORDOVA DEVICE EVENTS ///////////////////////
////Device OFFLINE
////Eventlistener Add : document.addEventListener("offline", deviceOffline, false);
var onlineStatus = 1;
function deviceOffline() {
    console.log('DEVICE OFFLINE');
    ////if onlineStatus 0 - offline
    if(onlineStatus == 1) {
        onlineStatus = 0;
        
        myLoadingOffline()();
    }
    
}


////Device ONLINE
////Eventlistener Add : document.addEventListener("online", deviceOnline, false);
function deviceOnline() {
    
    console.log('DEVICE ONLINE');
    ////if onlineStatus 1 - online
    if(onlineStatus == 0) {
        onlineStatus = 1;
        
        $.unblockUI();
        
    }
    
    
    
}

////Device PAUSE
////Eventlistener Add : document.addEventListener("pause", onPause, false);
function onPause() {
    myLoading();
    console.log('MY has been paused');
    
}

////Device Resume
////Eventlistener Add : document.addEventListener("resume", onResume, false);
function onResume() {
    $.unblockUI();
    console.log('MY has resumed');
    
}
