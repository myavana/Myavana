/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


var pictureSource;   // picture source
var destinationType; // sets the format of returned value
// See the above in device.js for their assignments

// api-camera
function onPhotoDataSuccess(imageURI) {
    console.log("* * * onPhotoDataSuccess");
    
    var imageLoadFrom = imageUpload;
    //alert(imageLoadFrom);
    
    if (imageLoadFrom == 'look') {
        ////Change Page for Image Cropping
        getNewLookUpload();
        
    }  else if (imageLoadFrom == 'profile') {
        //        alert('after image upload');
        getProfilePhotoSuccess();
    }
    
    var cameraImage = document.getElementById('uploadedImg');
    cameraImage.style.display = 'block';
    cameraImage.src = imageURI;
    
    var uploadedImgH = $('#uploadedImg').outerHeight();
	var uploadedImgW = $('#uploadedImg').outerWidth();
    
	console.log('Photo Upload uploadedImg H & W'+uploadedImgH+"----"+uploadedImgW);
    
    //checkImg = 1;
    //    changeButtons();
    
    window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
                                     fileEntry.file(function(fileObject){
                                                    // Create a reader to read the file
                                                    var reader = new FileReader();
                                                    
                                                    // Create a function to process the file once it's read
                                                    reader.onloadend = function(evt) {
                                                    // Create an image element that we will load the data into
                                                    var image = new Image();
                                                    image.onload = function(evt) {
                                                    // The image has been loaded and the data is ready
                                                    var image_width = this.width;
                                                    var image_height = this.height;
                                                    console.log("IMAGE HEIGHT: " + image_height);
                                                    console.log("IMAGE HEIGHT: " + image_width);
                                                    
                                                    callJcrop(image_width,image_height);
                                                    // We don't need the image element anymore. Get rid of it.
                                                    image = null;
                                                    };
                                                    // Load the read data into the image source. It's base64 data
                                                    image.src = evt.target.result;
                                                    };
                                                    // Read from disk the data as base64
                                                    reader.readAsDataURL(fileObject);
                                                    
                                                    });
                                     });
}

////after camera pic upload called
function onPhotoURISuccess(imageURI) {
    console.log("* * * onPhotoURISuccess");
    //alert('onphotourisuccess called');
    // Uncomment to view the image file URI
    // console.log(imageURI);
    
    
    var imageLoadFrom = imageUpload;
    
    if (imageLoadFrom == 'look') {
        ////Change Page for Image Cropping
        getNewLookUpload();
        
    }  else if (imageLoadFrom == 'profile') {
        //        alert('after image upload');
        getProfilePhotoSuccess();
    }
    
    var cameraImage = document.getElementById('uploadedImg');
    cameraImage.style.display = 'block';
    cameraImage.src = imageURI;
    
    var uploadedImgH = $('#uploadedImg').outerHeight();
	var uploadedImgW = $('#uploadedImg').outerWidth();
    
	console.log('Photo Upload uploadedImg H & W'+uploadedImgH+"----"+uploadedImgW);
    
    //checkImg = 1;
    //    changeButtons();
    
    window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
                                     fileEntry.file(function(fileObject){
                                                    // Create a reader to read the file
                                                    var reader = new FileReader();
                                                    
                                                    // Create a function to process the file once it's read
                                                    reader.onloadend = function(evt) {
                                                    // Create an image element that we will load the data into
                                                    var image = new Image();
                                                    image.onload = function(evt) {
                                                    
                                                    // The image has been loaded and the data is ready
                                                    var image_width = this.width;
                                                    var image_height = this.height;
                                                    
                                                    // We don't need the image element anymore. Get rid of it.
                                                    
                                                    callJcrop(image_width,image_height);
                                                    image = null;
                                                    
                                                    };
                                                    // Load the read data into the image source. It's base64 data
                                                    image.src = evt.target.result;
                                                    };
                                                    // Read from disk the data as base64
                                                    reader.readAsDataURL(fileObject);
                                                    });
                                     });
    
    
}

function take_pic() {
    navigator.camera.getPicture(onPhotoDataSuccess, function(ex) { editProfPicBtnDivIndex = 0; lookUploadBtnIndex = 0;},
                                { quality: 45, correctOrientation: true,destinationType: Camera.DestinationType.FILE_URI });
    
    
    //    navigator.camera.getPicture(onPhotoDataSuccess, function(ex) {
    //        alert("No Photo Taken");
    //        checkImg = 0;
    //        changeButtons();
    //    }, 
    //    { 	quality : 25, 
    //    	destinationType: Camera.DestinationType.FILE_URI});
}

function album_pic() {
    //alert("album pic called");
    navigator.camera.getPicture(onPhotoURISuccess, function(ex) { editProfPicBtnDivIndex = 0; lookUploadBtnIndex = 0;},
                                { quality: 45, correctOrientation: true, sourceType: 0, encodingType: Camera.EncodingType.JPEG});
}