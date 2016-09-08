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
<script src="bower_components/ng-ipushpull-page/build/ng-ipushpull-page.js"></script>
```

**Add as dependency to your application**
```
angular.module("myApp", ["ipushpull.page"]);
```

## Usage
```
// Configure ipushpull
var myApp = angular.module("myApp", ["ipushpull.page"])
    .constant("ipushpull_conf", {
        api_key: "ipushpull api key",
        api_secret: "ipushpull_api_secret",
        api_url: "https://www.ipushpull.com" // (optional defaults to production)        
    });
    
// Create page object in your controller/service
myApp.controller("ExampleCtrl", ["ipushpullPage", function(IppPage){
    // Create new page object
    var page = new IppPage(1, 1);
    
    // Subscribe to events
    page.on("new_content", function(data){
        console.log("New page content received", data);
    });
    
    page.on("error", function(err){
        console.error("Page error", err);
    });
    
    ...
    
    // Use page API
    page.push(content).catch(function(err){
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