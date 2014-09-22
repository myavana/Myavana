//function onBodyLoad(){
//	document.addEventListener("deviceready", onDeviceReady, false);
//}

//function onDeviceReady(){
//    console.log("onDeviceReady");


//    TwitterDemo.setup(); ///This is now called from index.js 


//}
var twitterStatus;
TwitterDemo = {
    $:function(id){
        return document.getElementById(id);
    },
    
    log:function(s){
        TwitterDemo.$("log").innerHTML = s;
    },
    
    setup:function(){
//        alert('function called');
        var tests = ["isAvailable", "isSetup", "tweet1", "tweet2", "tweet3", "tweet4", "tweet5", "tweet6", "timeline", "mentions", "friendsIds", "usersLookup"];
        for(var i=0, l=tests.length; i<l; i++){
            this.$(tests[i]).onclick = this[tests[i]];
        }
    },
    
    isAvailable:function(type){
        window.plugins.twitter.isTwitterAvailable(function(r){                   
              if(r == 1) {
                    TwitterDemo.isSetup();
              } else {
                    navigator.notification.alert('Twitter is not available on this device. You have to download the app.',none(), 'Madame You', 'OK');
              }
        });
    },
    ////For MY Download Link
    isSetup:function(){
        window.plugins.twitter.isTwitterSetup(function(r){
              if(r == 1) {
                    TwitterDemo.tweet1();
              } else {
                    navigator.notification.alert('Twitter is not set up on this device. You will have to set up an account to post tweets.',TwitterDemo.tweet1(), 'Madame You', 'OK');
              }
        });
    },
    ////For Twitter Image Share
    isSetup2:function(eventString,imageLocation){
        window.plugins.twitter.isTwitterSetup(function(r){
              if(r == 1) {
                TwitterDemo.tweet2(eventString,imageLocation);
              } else {
                navigator.notification.alert('Twitter is not set up on this device. You will have to set up an account to post tweets.',TwitterDemo.tweet2(), 'Madame You', 'OK');
              }
              });
    },
    ////For Twitter Event Share
    isSetup3:function(eventString,imageLocation){
        window.plugins.twitter.isTwitterSetup(function(r){
                                              if(r == 1) {
                                              TwitterDemo.tweet2(eventString,imageLocation);
                                              } else {
                                              navigator.notification.alert('Twitter is not set up on this device. You will have to set up an account to post tweets.',TwitterDemo.tweet2(), 'Madame You', 'OK');
                                              }
                                              });
    },
  
	tweet1:function(){
		$.blockUI({ message: '<h1 style="font-size:80%;"><img src="img/ajax-loader.gif" /> Just a moment...</h1>' });
		window.plugins.twitter.composeTweet(
			function(s){ $.unblockUI(); }, 
			function(e){ $.unblockUI(); }, 
            "Go check out #Madame You to know before you go & Follow @MYMadameYou.",
            {
            urlAttach:"http://www.madameyou.com",
            imageAttach:"https://si0.twimg.com/profile_images/378800000435612477/9dcc0ea81e15aefb73cd820813ebe198.jpeg"
            });
	},
    
    tweet2:function(eventString,imageLocation){
        window.plugins.twitter.composeTweet(
            function(s){ none(); },
            function(e){ none(); },
            eventString,
            {
            urlAttach:"http://www.madameyou.com",
            imageAttach:imageLocation
            });
        
    },

	
	/*
	 //Original tweet1 example
    tweet1:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text, Image, URL", 
            {
                urlAttach:"https://github.com/brianantonelli", 
                imageAttach:"http://zomgdinosaurs.com/zomg.jpg"
            });
    },

    tweet2:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text, Remote Image", 
            {
                imageAttach:"http://zomgdinosaurs.com/zomg.jpg"
            });
    },
    */

    tweet6:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
                                            function(s){ TwitterDemo.log("tweet success"); }, 
                                            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
                                            "Text, Local Image", 
                                            {
                                            imageAttach:"www/ninja-lolcat.gif"
                                            });
    },

    tweet3:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text, URL", 
            {
                urlAttach:"https://github.com/brianantonelli"
            });
    },

    tweet4:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text");
    },
    
    tweet5:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); });
    },

    timeline:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getPublicTimeline(
            function(s){ TwitterDemo.log("timeline success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("timeline failure: " + e); });
    },
    
    mentions:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getMentions(
            function(s){ TwitterDemo.log("mentions success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("mentions failure: " + e); });
    },
    
    friendsIds:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getTWRequest(
            'friends/ids.json',
            {},
            function(s){ TwitterDemo.log("friendsIds success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("friendsIds failure: " + e); });
    },
    
    usersLookup:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getTWRequest(
            'users/lookup.json',
            {user_id: '16141659,783214,6253282'},
            function(s){ TwitterDemo.log("usersLookup success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("usersLookup failure: " + e); },
            {requestMethod: 'POST'});
    }
    
    
};
