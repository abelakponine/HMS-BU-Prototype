class BangaScripts {
    /** Set React Dom page title */
    setPageTitle(title){
        this.getDomTags('head title').innerHTML = title;
    }
    /** Set page description */
    setPageDesc(title){
        this.getDomTags('meta[name=description]').content = title;
    }
    /** Get React Dom HtmlTags by tagname */
    getDomTags(tags){
        return document.querySelector(tags);
    }
    /** Get React Dom classes by classname */
    getDomClasses(className){
        return document.querySelectorAll(className);
    }
    /** Add Element to React Dom <head/> */
    appendToHeader(domElement){
        document.querySelector("head").append(domElement)
    }
    /** Add style to React Dom <head/> */
    addStyle(csslink){
        let style = document.createElement('link');
        style.href = csslink;
        style.rel = 'stylesheet'
        document.querySelector("head").append(style);
    }
    /** Set theme-color in React Dom <head/> */
    setThemeColor(color){
        document.querySelector('meta[name=theme-color]').content = color;
    }
    /** Add script to React Dom <head/> */
    addScript(jslink, defer=false, async=false, delay=0){
        let script = document.createElement('script');
        script.src = jslink;
        script.defer = defer;
        script.async = async;
        setTimeout(()=>{
            document.querySelector("head").append(script);
        }, delay);
    }
    /** Triggger get GeoLocation */
    getLocation(){
        window.navigator.geolocation.getCurrentPosition(this.showPosition, this.onError);
    }
    /** Returns Coordinates of GeoLocation: [latitude, longitude] */
    showPosition(position){
        window.latlng = [position.coords.latitude,position.coords.longitude];
        return window.latlng;
    }
    /** On GeoLocationError callback function */
    onError(err){
        window.navigator.permissions.query({name:"geolocation"}).then(status=>{
            
            window.latlng = null;
    
            if (status.state === "prompt"){
                // trigger permission request
                // this.getGeoLocation();
                window.showDialog(`<b>Permission ${status.state}</b><br/><br/>GeoLocation permission is required to use this app. \r\nPlease enable or grant access to your location to continue.`);
            }
            else if (status.state === "denied"){
                window.showDialog(`<b>Permission ${status.state}</b><br/><br/>GeoLocation permission is required to use this app. \r\nPlease enable or grant access to your location to continue.`);
            }
        })
    }
    /** Check if GeoLocation granted: boolean */
    isLocationGranted(){
        if (window.latlng == null){
            return false;
        }
        else {
            return true;
        }
    }
    /** Get GeoCoordinates: Array[lat, lng] */
    getCoordinate(){
        this.getLocation();
        return window.latlng;
    }

}

export default BangaScripts;