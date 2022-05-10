var host = "https://server.pekaboom.com";
// host = "http://localhost:5000";

window.latlng = [1,0];

var dataCookieIndex = 1; // for fetching data from cookie at index 1

function hideRegistration(){
    $('#overlayer, #regForm').removeClass('d-flex').fadeOut();
}
function showRegistration(event){
    event.preventDefault();
    $('#overlayer').addClass('d-flex').add('#regForm').fadeIn();
}
function getGeoLocation(){
    if (window.location.protocol === "https:"){
        try {
            window.navigator.geolocation.getCurrentPosition(showPosition, geoErr);
        }
        catch (err) {
            console.log(err)
        }
    }
}
function hideDialog(){
    $('#overlayer, #dialog').removeClass('d-block').fadeOut();
    $('#dialog h6').html('');
}
function showDialog(msg){
    $('#overlayer, #dialog').fadeIn().addClass('d-block');
    $('#dialog h6').html(`${msg}`);
}
function showMobileMenu(event){
    event.stopPropagation()
    $('.mobile-nav').fadeIn(100);
    $('.mbtn i').toggleClass('fa-bars fa-times');
    
    $(window).add('.mbtn .fa-times').on('click', (event)=>{
        event.stopPropagation()
        if($('.mobile-nav').css('display') == "block"){
            hideMobileMenu();
        }
    });
}
function hideMobileMenu(){
    $('.mobile-nav').fadeOut(100);
    $('.mbtn i').addClass('fa-bars').removeClass('fa-times').off('click')   
}
function getUserRegistrationData(){
    let reg = window.registration;
    let userdata = {
        firstname: reg.firstname.value,
        lastname: reg.lastname.value,
        dob: reg.dob.value,
        email: reg.email.value,
        countryOfOrigin: reg.countryOfOrigin.value,
        location: reg.location.value,
        username: reg.username.value.toLowerCase(),
        password: reg.password.value
    };
    return userdata;
}

function goHome(){
    $('#overlayer, #overlayer > div, #profile, #inbox').fadeOut(200);
}
function closeProfile(){
    if ($('body').outerWidth() < 846) $('#overlayer, #rightcol').fadeOut(200);
}
function showProfile(){
    if ($('body').outerWidth() < 881 && !$('#rightcol').is(':visible')) $('#rightcol').fadeIn();
}
function closeInbox(){
    $('#overlayer, #inbox').fadeOut(200);
}
function showInbox(){
    $('#inbox').toggle(200);
}
function closeProfileEdit(){
    $('#overlayer, #profile-edit').fadeOut();
}
function showProfileEdit(){
    $('#overlayer, #profile-edit').fadeIn();
}
function showPostFullscreen(postid){
    $(postid).css('display', 'flex').fadeIn();
}
function showComments(){
    $('#overlayer').fadeIn(100);
    $('#comments').animate({
        bottom: '0%'
    }, 200);
}
function closeComments(){
    $('#comments').animate({
        bottom: '-100%'
    }, 200).promise().done(el=>{
        $(el).add('#overlayer').hide(0)
    });
}
function showGames(){
    $('#overlayer').fadeIn(100);
    $('#games').animate({
        bottom: '0%'
    }, 200);
}
function closeGames(){
    $('#games').animate({
        bottom: '-100%'
    }, 200).promise().done(el=>{
        $(el).add('#overlayer').hide(0)
    });
}
function closeGameLoader(){
    $('#game-loader')[0].src = null;
    $('#game-screen').fadeOut(50);
}
function loadGame(event){
    
    if (event.target.nodeName == 'IMG' || event.target.nodeName == 'H1'){

        let link = $(event.target).parent()[0].dataset.link;
        $('#game-loader')[0].src = link;
        $('#game-screen').show();
    }
    else {
        let link = $(event.target[0].dataset.link);
        $('#game-loader')[0].src = link;
        $('#game-screen').show();
    }
}
function closeCreatePost(){
    $('#new-media-preview').html(''); // reset media preview
    postMediaList = [];
    $('#add-media, #media-caption').val('').text('');
    $('#overlayer, #create-post').fadeOut();
}
function showCreatePost(){
    $('#overlayer, #create-post').fadeIn();
}
function createTimeStamp(timedata){

    let minutes = Math.floor((((new Date().getTime()) - timedata)/ 1000) / 60);    
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);
    let months = Math.floor(weeks / 4);
    let years = Math.floor(months / 12);
    
    if (years === 1){
        return `(${years} year ago)`
    }
    else if (years > 1){
        return `(${years} years ago)`
    }
    else if (months === 1){
        return `(${months} month ago)`
    }
    else if (months > 1 && months < 12){
        return `(${months} months ago)`
    }
    else if (weeks === 1){
        return `(${weeks} week ago)`
    }
    else if (weeks > 1 && weeks < 4){
        return `(${weeks} weeks ago)`
    }
    else if (days === 1){
        return `(yesterday)`
    }
    else if (days > 1 && days < 7){
        return `(${days} days ago)`
    }
    else if (hours === 1){
        return `(${hours} hour ago)`
    }
    else if (hours > 1 && hours < 24){
        return `(${hours} hours ago)`
    }
    else if (minutes === 1){
        return `(${minutes} min ago)`;
    }
    else if (minutes > 1 && minutes < 60){
        return `(${minutes} mins ago)`;
    }
    else {
        return `(just now)`;
    }
}
function adjustImage(target){
    let el = target;
    let mediaHeight = window.$(el).parent().outerHeight();
    let percentage = (el.height * 100) / mediaHeight
    let elParent = window.$(el).parent().parent();

    if (percentage < 100 && $(el)[0].style.height !== '100%'){

        window.$(el).css({
            width: '100%',
            height: 'max-content',
            objectFit: 'contain',
            objectPosition: 'center center'
        });

        elParent.find('.media.main').css({height:'max-content', minHeight:'0%', marginTop: elParent.find('.author-info').outerHeight()+'px'}).removeClass('my-0').addClass('mb-0');
        elParent.css({height: elParent.find('.author-info').outerHeight() + window.$(`#post${elParent.data('postid')} > .caption`).outerHeight() +  elParent.find('.media').outerHeight()+'px'});
    }
    else {
        window.$(el).css({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top'
        });
        elParent.removeClass('mb-0').addClass('my-0');
    }
}
function previewProfileImage(event){
    let img = event.target.files[0];
    let link = URL.createObjectURL(img);
    $('#prv-pi')[0].src = link;
}
function updateProfile(event){
    
    $('#piu_spinner').show();
    let imgToUpload = $('#changeProfileImage')[0].files[0];
    let xhr = new XMLHttpRequest();
    let form = new FormData();

    form.append('uid', currentUser.id);
    form.append('pimg', imgToUpload);
    form.append('firstname', $('#edit-firstname').val());
    form.append('lastname', $('#edit-lastname').val());
    form.append('dob', $('#edit-dob').val());
    form.append('workplace', $('#edit-workplace').val());
    form.append('location', $('#edit-location').val());
    form.append('aboutme', $('#edit-aboutme').val());

    xhr.onload = (event)=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        $('#piu_spinner').hide();
        setTimeout(()=>alert('Profile Updated successfully!'), 1000);
    };
    xhr.open('POST', `${host}/update-profile`);
    xhr.send(form);
}


var postMediaList = [];
function previewNewMedia(event){
    let imageTypes = ['image/png', 'image/jpeg', 'image/gif'];
    let videoTypes = ['video/mp4', 'video/3gp', 'video/avi', 'video/ogg'];
    let files = event.target.files;
    let firstFoundVideo = null;

    // check if media contains video file and select the first found video (i.e. only one video can be uploaded at a time)
    for (fc of files){

        if (videoTypes.includes(fc.type)){ // ensure only one video file is uploaded along post

            postMediaList = [];
            firstFoundVideo = fc;
            let exist = false;

            if (!postMediaList.includes(firstFoundVideo)) postMediaList.push(firstFoundVideo); // add media to uppload list if not exist
            
            let link = URL.createObjectURL(firstFoundVideo);

            if (files.length > 1){
                // let proceed = confirm("Only one video can be uploaded at a time,\r\nThe first found video will be uploaded. Continue?");
                if (confirm("Only one video can be uploaded at a time,\r\nThe first found video will be uploaded. Continue?")){
                
                    $('#new-media-preview').html(''); // reset media preview
                    
                    /** create preview object */
                    $('#new-media-preview').append(`<div class="prvObj d-inline-flex relative" data-index="0" style="width:100%;white-space:nowrap">
                        
                    <b class="index btn theme-bg-color vertical-align-top absolute" style="height:max-content;padding:2px 7px;font-size:11px;color:white;border-radius:50%;top:5px;left:15px;z-index:10;">${0+1}</b>
                    <div class="mx-2 relative" style="width:100%;">

                        <video src='${link}' style="background:black;width:100%;max-height:100%;margin:auto;object-fit:contain;object-position:top;position:relative;margin-right:6px;cursor:move;border-radius:8px;" controlslist="nodownload noplaybackrate" autoplay onclick="clearTimeout(vidTimer);$('.control').fadeIn().css('display','flex');vidTimer = setTimeout(()=>$(this).parent().find('.control').fadeOut(), 5000)" onloadedmetadata="
                            vidTimer = setTimeout(()=>$(this).parent().find('.control').fadeOut(), 5000);
                            this.onended = ()=>$(this).parent().find('.control.fa-pause-circle').toggleClass('fa-pause-circle fa-play-circle');
                        " muted></video>

                        <i class="control fad fa-pause-circle absolute-center cursor-pointer" style="background:#2020201f;font-size:calc(100% + 3.3vw);color:#ff88a9;padding:5px;border-radius:50%;" onclick="
                            
                            clearTimeout(vidTimer);
                            vidTimer = setTimeout(()=>$(this).parent().find('.control').fadeOut(), 5000);

                            $(this).toggleClass('fa-pause-circle fa-play-circle');

                            if (!$(this).parent().find('video')[0].paused){
                                $(this).parent().find('video')[0].pause();
                                clearTimeout(vidTimer);
                            }
                            else {
                                $(this).parent().find('video')[0].play();
                            }
                        "></i>
                        
                        <div class="control absolute" style="display:flex;background:#20202090;height:max-content;bottom:10%;right:5%;padding:6px;">
                            
                            <i class="fad fa-volume-mute mt-auto mb-auto cursor-pointer" style="color:white;font-size:calc(100% + 0.8vw);" onclick="
                                $(this).toggleClass('fa-volume-up fa-volume-mute');
                                if ($(this).parent().parent().find('video')[0].muted){
                                    $(this).parent().parent().find('video')[0].muted = false;
                                }
                                else {
                                    $(this).parent().parent().find('video')[0].muted = true;
                                }
                            "></i>

                            <i class="fad fa-expand cursor-pointer ml-3" style="font-size:calc(100% + 1.3vw);color:white;" onclick="
                                if (!document.fullscreen){
                                    $(this).parent().parent()[0].requestFullscreen();
                                }
                                else {
                                    document.exitFullscreen();
                                }">
                            </i>
                        </div>
                    </div>
                </div>
                    <button class="rm-prvObj fas fa-times absolute" data-index="${0}" style="background:#f8f8f8;height:max-content;border:0;border-radius:20px;padding:4px 6px;margin-right:20px;right:0;top:5px;" onclick="removeMedia(event)"></button>`);

                    $('#new-media-preview').css('flex-flow','row');
                }
            }
            else {

                $('#new-media-preview').html(''); // reset media preview
                
                /** create preview object */
                $('#new-media-preview').append(`<div class="prvObj d-inline-flex relative" data-index="0" style="width:100%;white-space:nowrap">
                    
                    <b class="index btn theme-bg-color vertical-align-top absolute" style="height:max-content;padding:2px 7px;font-size:11px;color:white;border-radius:50%;top:5px;left:15px;z-index:10;">${0+1}</b>
                    <div class="mx-2 relative" style="width:100%;">

                        <video src='${link}' style="background:black;width:100%;max-height:100%;margin:auto;object-fit:contain;object-position:top;position:relative;margin-right:6px;cursor:move;border-radius:8px;" controlslist="nodownload noplaybackrate" autoplay onclick="clearTimeout(vidTimer);$('.control').fadeIn().css('display','flex');vidTimer = setTimeout(()=>$(this).parent().find('.control').fadeOut(), 5000)" onloadedmetadata="
                            vidTimer = setTimeout(()=>$(this).parent().find('.control').fadeOut(), 5000);
                            this.onended = ()=>$(this).parent().find('.control.fa-pause-circle').toggleClass('fa-pause-circle fa-play-circle');
                        " muted></video>

                        <i class="control fad fa-pause-circle absolute-center cursor-pointer" style="background:#2020201f;font-size:calc(100% + 3.3vw);color:#ff88a9;padding:5px;border-radius:50%;" onclick="
                            
                            clearTimeout(vidTimer);
                            vidTimer = setTimeout(()=>$(this).parent().find('.control').fadeOut(), 5000);

                            $(this).toggleClass('fa-pause-circle fa-play-circle');

                            if (!$(this).parent().find('video')[0].paused){
                                $(this).parent().find('video')[0].pause();
                                clearTimeout(vidTimer);
                            }
                            else {
                                $(this).parent().find('video')[0].play();
                            }
                        "></i>
                        
                        <div class="control absolute" style="display:flex;background:#20202090;height:max-content;bottom:10%;right:5%;padding:6px;">
                            
                            <i class="fad fa-volume-mute mt-auto mb-auto cursor-pointer" style="color:white;font-size:calc(100% + 0.8vw);" onclick="
                                $(this).toggleClass('fa-volume-up fa-volume-mute');
                                if ($(this).parent().parent().find('video')[0].muted){
                                    $(this).parent().parent().find('video')[0].muted = false;
                                }
                                else {
                                    $(this).parent().parent().find('video')[0].muted = true;
                                }
                            "></i>

                            <i class="fad fa-expand cursor-pointer ml-3" style="font-size:calc(100% + 1.3vw);color:white;" onclick="
                                if (!document.fullscreen){
                                    $(this).parent().parent()[0].requestFullscreen();
                                }
                                else {
                                    document.exitFullscreen();
                                }">
                            </i>
                        </div>
                    </div>
                </div>
                <button class="rm-prvObj fas fa-times absolute" data-index="${0}" style="background:#f8f8f8;height:max-content;border:0;border-radius:20px;padding:4px 6px;margin-right:20px;right:0;top:5px;" onclick="removeMedia(event)"></button>`);

                $('#new-media-preview').css('flex-flow','row');
            }

            return true;
        }
    }
    if (!firstFoundVideo){ // proceed with uploading images

        let i = 0;
        for (i;i<files.length;i++){
            let exist = false;
            postMediaList.forEach((f)=>{
                if (f.name == files[i].name){
                    exist = true;
                }
            });
            if (!exist) postMediaList.push(files[i]);
        }

        let j = 0;
        let len = postMediaList.length;

        $('#new-media-preview').html(''); // reset media preview

        /** create preview object */
        for (j;j<len;j++){
            let link = URL.createObjectURL(postMediaList[j]);
            
            if(imageTypes.includes(postMediaList[j].type)){
                $('#new-media-preview').append(`<div class="prvObj d-inline" data-index="${j}" style="white-space:nowrap"><b class="index btn theme-bg-color vertical-align-top" style="height:max-content;padding:2px 7px;font-size:11px;color:white;border-radius:50%;">${j+1}</b> <img src='${link}' style="background:#f8f8f8;width:150px;max-height:200px;margin-left:10px;margin-bottom:20px;object-fit:contain;object-position:top;position:relative;margin-right:6px;cursor:move;"/></div> <button class="rm-prvObj fas fa-times" data-index="${j}" style="background:#f8f8f8;height:max-content;border:0;border-radius:20px;padding:4px 6px;margin-right:20px;" onclick="removeMedia(event)"></button>`);
                
                $('#new-media-preview').css('flex-flow','row');
            }
        }
    }
}

function removeMedia(event){
    let index = event.target.dataset.index;

    delete postMediaList[index];
    let newpostMediaList = [];
    postMediaList.forEach(m=>{
        newpostMediaList.push(m);
    })
    postMediaList = newpostMediaList;

    let j = 0;
    let len = postMediaList.length;

    $('#new-media-preview').html(''); // reset preview

    for (j;j<len;j++){
        let link = URL.createObjectURL(postMediaList[j]);
        $('#new-media-preview').append(`<div class="prvObj d-inline" data-index="${j}" style="white-space:nowrap"><b class="index btn theme-color-bg vertical-align-top" style="height:max-content;padding:2px 7px;font-size:11px;color:white;border-radius:50%;">${j+1}</b> <img src='${link}' style="background:#f8f8f8;width:150px;max-height:200px;margin-left:10px;margin-bottom:20px;object-fit:contain;object-position:top;position:relative;margin-right:6px;cursor:move;"/></div> <button class="rm-prvObj fas fa-times" data-index="${j}" style="background:#f8f8f8;height:max-content;border:0;border-radius:20px;padding:4px 6px;margin-right:20px;" onclick="removeMedia(event)"></button>`);
    }
}

function publishPost(event){

    event.preventDefault();

    $('.pbp_spinner').show(50);
    let form = new FormData();
    let i = 1;

    // append media files to formdata
    form.append('fileLength', postMediaList.length);

    postMediaList.forEach(file=>{
        form.append('file'+i, file);
        i++;
    });

    // append media caption/post content to formdata
    form.append('content', $('#media-caption').val());
    form.append('uid', currentUser.id);
    form.append('username', currentUser.username);
    form.append('author_name', currentUser.firstname+' '+currentUser.lastname)

    let xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event)=>{
        if ((event.loaded*100)/event.total == 100){
            $('.pbp_spinner').hide();
        }
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            setTimeout(()=>{

                console.log(xhr.response);

                if (xhr.response.status){
                    $('#new-media-preview').html(''); // reset media preview
                    postMediaList = [];
                    $('#add-media, #media-caption').val('').text('');
                    closeCreatePost();
                    alert('Post published successfully!');
                }
                else {
                    alert(xhr.response.message);
                }
            }, 1000);
        }
    }
    xhr.responseType = 'json';
    xhr.open("POST", host+'/publish');

    xhr.send(form);
}
function deletePost(postid){
    let check = confirm('Are you sure you want to delete this post?\r\nThis action cannot be undone when completed.')

    if (check){
        $.post(host+'/delete-post', {postid: postid}).then(res=>{
            if (res) alert('post deleted successfully.')
        })
    }
}
function showPostOptions(event, postid){
    event.preventDefault();
    event.stopPropagation();
    $('#post'+postid+' .post-options').css('display','flex').fadeIn(50);
}
function hidePostOptions(){
    $('.post-options').fadeOut(50);
}
function toolUnavailable(){
    alert("Sorry :( This service is currently unavailable, our engineers are working tirelessly to bring you the best feature, please endure...")
}

function register(event, userdata){
    
    event.preventDefault();
    
    userdata = window.JSON.stringify(window.getUserRegistrationData());

    if (isLocationGranted()){

        window.fetch(host+"/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userdata
        }).then(async res=>{
            
            let response = await res.json();

            console.log(response);

            if (!response.status){
                $('#registration .fa-spinner').hide(50);
                showDialog(`<b>Registration Error: </b><br/><br/>${response.error}`);
            }
            else {
                $('#registration .fa-spinner').hide(50);
                hideRegistration();
                showDialog(`<b>Registration Success: </b><br/><br/>You can now login with your username and password.`);
                
                $.post(host+'/my-data', {data:userdata}, (res)=>{

                    let mydata = res.data;

                    let time = (new Date()).getTime();
                    let expires = new Date(time+((60000)*60*24)); // expire cookie after 24 hours

                    document.cookie = "mydata="+(JSON.stringify(mydata))+"mydata=;SameSite=none;Secure=true;expires="+expires;
                    window.location.href = "/home";
                });
            }
        });
        $('#registration .fa-spinner').show(50);
    }
    else{
        getGeoLocation();
    }
}

function userLogin(event, userdata){
    event.preventDefault();

    if (isLocationGranted()){
        $.post(host+'/login', userdata, (res)=>{
            
            if (!res.status){
                $('#login .fa-spinner').hide(50);
                showDialog(`<b>Login Error: </b><br/><br/>${res.error}`);
            }
            else {

                $.post(host+'/my-data', {data:JSON.stringify(userdata)}, (res)=>{
                    console.log(res);

                    let mydata = res.data;

                    let time = (new Date()).getTime();
                    let expires = new Date(time+((60000)*60*24)); // expire cookie after 24 hours

                    document.cookie = "mydata="+(JSON.stringify(mydata))+"mydata=;SameSite=none;Secure=true;expires="+expires;
                    
                    window.location.href = "/home";
                });
            }
        });
        $('#login .fa-spinner').show(50);
    }
    else{
        getGeoLocation();
    }
}

/** logout user */
function logout(){
    let ask = confirm("Are you sure you want to logout?");
    if (ask){
        document.cookie = "mydata=mydata=;expires=Fri, 03 Sep 2021 0:0:0 GMT";
        window.location.href = "/";
    }
}

/** check if location permission is granted: boolean */
function isLocationGranted(){
    if (window.latlng.join(',') == '0,0' || window.latlng == null){
        return false;
    }
    else {
        return true;
    }
}

/** get geoCoordinates */
let showPosition = (position)=>{
    window.latlng = [position.coords.latitude,position.coords.longitude];
    return window.latlng;
}
/** get geoLocation errors */
let geoErr = (err)=>{
    navigator.permissions.query({name:"geolocation"}).then(status=>{
        
        window.latlng = [0,0];

        if (status.state == "granted"){
            let confirmedLocation = confirm(`Permission required:\r\nGeoLocation permission is required to use this app. \r\nPlease enable location in device settings or grant access to your location to continue.`);
            if (confirmedLocation) getGeoLocation();
        }
        if (status.state == "prompt"){
            showDialog(`<b>Permission ${status.state}</b><br/><br/>GeoLocation permission is required to use this app. \r\nPlease enable or grant access to your location to continue.`);
        }
        else if (status.state == "denied"){
            showDialog(`<b>Permission ${status.state}</b><br/><br/>GeoLocation permission is required to use this app. \r\nPlease enable or grant access to your location to continue.`);
        }
    })
}

/** fetch user data from cookies */
function fetchMyCookieData(){
    try {
        return JSON.parse(document.cookie.split('mydata=')[dataCookieIndex]);
    }
    catch {
        return false;
    }
}

/** Check if current user is valid */
function validateUser(){
    
    if (window.fetchMyCookieData() == false && window.location.pathname !== '/'){
        window.location.href = "/?login=failed&error=invalid session";
    }
    else {
        if (window.fetchMyCookieData() !== false && window.location.pathname == '/'){
            window.location.href = '/home';
        }
        else if (window.fetchMyCookieData() !== false && window.location.pathname !== '/'){
            let userdata = window.fetchMyCookieData();

            $.post(host+"/check-user", userdata, (res)=>{
                if (!res.status){
                    document.cookie = "mydata="+JSON.stringify({data:''})+"mydata=;SameSite=none;Secure=true;expires=Fri, 03 Sep 2021 0:0:0 GMT";
                    window.location.href = "/?login=failed&error=invalid user credentials";
                }
            });
        }
    }
}

window.sct = setTimeout(()=>{return true;}, 1000);

function scrollToScreenEvent(event){
    
    clearTimeout(sct);

    if ('touches' in event.nativeEvent){

        let touch = null;
        touch = event.nativeEvent.touches[0];
        window.touchStart = touch.clientY;
        window.offsetTop = $('#feeds')[0].scrollTop;
        window.finalTouch = touch.clientY;

        if (Math.ceil($('#feeds')[0].scrollHeight - $('#feeds').outerHeight()) > offsetTop){
            
            $('#feeds').on('touchmove', (event)=>{
                touch = event.originalEvent.touches[0];
                window.finalTouch = touch.clientY;
            });

            $('#feeds').on('touchend', (event)=>{
                event.preventDefault();
                event.stopImmediatePropagation();

                    if ((touchStart - finalTouch) > 20){

                        $('#feeds').animate({scrollTop: $('#feeds').outerHeight() * ((Math.floor($('#feeds')[0].scrollTop / $('#feeds')[0].clientHeight)+1))}, 300).promise().done(e=>{
                            window.offsetTop = $('#feeds')[0].scrollTop;
                            $('#feeds').off('touchstart touchmove');
                            return false;
                        });
                    }
                    else if ((touchStart - finalTouch) < -5){

                        $('#feeds').animate({scrollTop: $('#feeds').outerHeight() * ((Math.floor($('#feeds')[0].scrollTop / $('#feeds')[0].clientHeight)))}, 300).promise().done(e=>{
                            window.offsetTop = $('#feeds')[0].scrollTop;
                            $('#feeds').off('touchstart touchmove');
                            return false;
                        });
                    }
                    
                    sct = setTimeout(()=>{

                        $('#feeds').animate({scrollTop: $('#feeds').outerHeight() * ((Math.round($('#feeds')[0].scrollTop / $('#feeds')[0].clientHeight)))}, 300).promise().done(()=>{
                            clearTimeout(sct);
                        });
                    }, 2000);
            });
        }
    }
}

/** window onload function */
window.onload = (event)=>{

    getGeoLocation();

    initializeLocation();

    if (window.location.hash == "#register"){
        showRegistration(event);
    }
    
    $('#registration, #login').on('submit', async (event)=>{
        
        if (! isLocationGranted()){
            event.preventDefault();
            getGeoLocation();
        }
        else {
            event.target.submit()
        }
    });

    $(window).on('click', ()=>{
        if($('.mobile-nav').css('display') == "block"){
            hideMobileMenu();
        }
        hidePostOptions()
    });

}

/** window onhashchange function */
window.onhashchange = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    getGeoLocation();
    initializeLocation();

    if (window.location.hash == "#register"){
        showRegistration(event);
    }
}

function initializeLocation(){

    const $ = window.$;

    setTimeout(()=>{
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${window.latlng.join(',')}&key=AIzaSyDTWXoPxEMtQYV8Y1dKR7BN_It7Ds3K8HA`).then(async res=>{
                let response = await res.json();

                if ("error_message" in response){
                    console.log("Error:: ", response.error_message);
                    initializeLocation();
                }
                else if (window.latlng.join(',') == '0,0'){
                    console.log('Initializing location...\r');
                    initializeLocation();
                }
                else {
                    response.results.forEach(val=>{
                        if (val.types.includes('locality')){
                            if ('currentUser' in window){    
                                $('#location').val(val.formatted_address);
                                // if currentUser  is a User Class with location setter
                                if ('setLocation' in window.currentUser) window.currentUser.setLocation(val.formatted_address);
                                // if currentUser is an object with properties
                                if ('location' in window.currentUser) window.currentUser.location = val.formatted_address;
                            }
                        }
                    })
                }
            });

    }, 3000);
}