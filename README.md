# Anuglar IPushPull Page Module

This module will allow you to pull page from iPushPull as well as push to iPushPull

## Features
* Pull Data
* Push Data
* Encryption

## Installation
**Install via bower**
```
bower install ng-ipushpull-page --save
```

**Include script in your application**
```
<script src="bower_components/ng-ipushpull-page/build/ng-ipushpull.min.js"></script>
```

**Add as dependency to your application**
```
var app = angular.module("myApp", ["ipushpull"]);
```

## Usage
```
// Configure ipushpull
app.config(["ippConfigProvider", (ippConfigProvider) => {
        ippConfigProvider.set({
            api_url: "https://www.ipushpull.com", // optional
            ws_url: "https://www.ipushpull.com", // optional
            api_key: "iPushPull API Key",
            api_secret: "iPushPull API Secret",
            storage_prefix: "", // optional
            transport: "polling", // optional - defaults to socket
        });
}]);    

// Create page object in your controller/service
myApp.controller("ExampleCtrl", ["ippPageService", function(IppPage){
    // Create new page object
    var page = new IppPage(1, 1); // new IppPage(pageId, folderId) - also accepts names
    
    // Subscribe to events
    page.on(page.EVENT_NEW_CONTENT, function(data){
        console.log("New page content received", data);
    });
    
    page.on(page.EVENT_ERROR, function(err){
        console.error("Page error", err);
    });
    
    ...
    
    // Access current content
    console.log(page.current);
    console.log(page.Content.getCell(0, 5));
    
    ...
    
    // Use page API
    page.push().catch(function(err){
        console.error("Push failed", err);
    });
    
    ...
    
    // Destroy page on unload to prevent memory leaks
    $scope.$on("destroy", function(){
        page.destroy();
    }); 
    
    // Read documentation for all events and functions
}]);
```