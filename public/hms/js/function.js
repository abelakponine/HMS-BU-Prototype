
host: "https://server.pekaboom.com";
// host: "http://localhost:5000";
var regdata = {}; // registration data
var userdata = {}; // login data
var rdFunc;

function showSideBar(event){
    event.preventDefault();
    event.stopPropagation();
    $('#side-bar').css({'display':'block', 'z-index':'50', left:'-100%', 'position':'fixed'})
        .animate({left:0}, 200);
}

function showDialog(data){

    let dataLatLng = {};

    if (data.geometry !== undefined){
        $('#overlayer, #dialog').fadeIn().addClass('d-block');
        $('#dialog h6').html(`${data.name}`);
        $('#dialog span').html(`<b>${data.geometry.location}</b>`);
        
        if (typeof data.geometry.location !== 'string'){
            dataLatLng = data.geometry.location.lat()+','+data.geometry.location.lng();
        }
        else {
            dataLatLng = data.geometry.location;
        }
        if (data.geometry.location == '(Blue Point on Map)') $('#viewOnMap').attr('data-location', `My Location`)
        else {
            $('#viewOnMap').attr('data-location', `${dataLatLng}`);
        }

        if(data.vicinity){
            if (!$('#dialog')[0].contains($('#vicinity')[0]))
                $('#dialog span').after(`<br/><div id='vicinity'>Vicinity: <b>${data.vicinity}</b></div>`);
            else
            $('#dialog #vicinity').html(`Vicinity: <b>${data.vicinity}</b>`);
        }
    }
    else {
        alert('Please ensure you grant location access for map services, thank you.')
    }
}
function hideDialog(){
    $('#overlayer, #dialog').removeClass('d-block').fadeOut(50);
    $('#dialog h6, #dialog span, #dialog #vicinity').html('');
}

function animateRadar(event){
    
    let time = 10;
    $('#scan-timer').data('timer', time).html(time+' seconds.');

    rdLen = $('#radar-container span').length;
    i = 1;
    let timer = $('#scan-timer').data('timer');
    
    $('#radar-container span').eq(0).css({visibility:'visible', 'transform':'scale(8) translate(calc((-50% / 8) + 0px), calc(-50% / 8))', 'opacity':'0', transitionDuration:'3s'});
    
    rdFunc = setInterval(()=>{
        $('#radar-container span').eq(i).css({visibility:'visible', 'transform':'scale(8) translate(calc((-50% / 8) + 0px), calc(-50% / 8))', 'opacity':'0', transitionDuration:'3s'}).promise().done(e=>{
            // console.log(e)
        });
        
        $('#radar-container span').eq(i-3).css({visibility:'hidden', 'transform':'translate(-50%, -50%)', left:'50%', right:'50%', 'opacity':'1', transitionDuration:'0s'});
        
        i++;
        timer--;
        $('#scan-timer').data('timer', timer).html(timer+' seconds.');

        if (i >= 4){
            i = 0;
        }
        
        console.log($('#scan-timer').data('timer'));

        if (timer < 1){
            cancelRadarScan(event);
            $('#scan-timer').html('');
            $('#request-at-home-service-results').fadeIn(100);
        }
    }, 1000);
}

function startRadarScan(event){
    $('#start-scan').fadeOut(50);
    $('#cancel-scan').fadeIn(50);
    animateRadar(event);
}
function cancelRadarScan(event){
    $('#start-scan').fadeIn(50);
    $('#cancel-scan').fadeOut(50);
    $('#scan-timer').html('');
    clearInterval(rdFunc);
    $('#radar-container span').css({visibility:'hidden', 'transform':'translate(-50%, -50%)', left:'50%', right:'50%', 'opacity':'1', transitionDuration:'0s'});
}

function showAtHomeServices(event){
    $('#overlayer').addClass('d-block').add('#request-at-home-services').fadeIn();
}
function closeAtHomeServices(event){
    $('#overlayer, #request-at-home-services').removeClass('d-block').fadeOut(50);
    cancelRadarScan(event);
}
function closeAtHomeServiceResults(event){
    $('#request-at-home-service-results').fadeOut(50);
}
function showAppointments(event){
    $('#overlayer').addClass('d-block').add('#appointments').fadeIn();
}
function showAppointmentForm(event){
    $('#appointment-form').fadeIn(100);
}
function closeAppointmentForm(event){
    $('#overlayer, #appointments, #appointment-form').removeClass('d-block').fadeOut(50);
}
function showEmergency(event){
    $('#overlayer').addClass('d-block').add('#emergency').fadeIn();
}
function showEmergencyForm(event){
    $('#emergency-form').fadeIn(100);
}
function closeEmergencyForm(event){
    $('#overlayer, #emergency, #emergency-form').removeClass('d-block').fadeOut(50);
}
function showTND(event){
    $('#overlayer').addClass('d-block').add('#TND').fadeIn();
}
function closeTND(event){
    $('#overlayer, #TND').removeClass('d-block').fadeOut(50);
}
function showMedications(event){
    $('#overlayer').addClass('d-block').add('#medications').fadeIn();
}
function closeMedications(event){
    $('#overlayer, #medications').removeClass('d-block').fadeOut(50);
}
function saveAppointment(event){

}
function openChat(event){
    $('#overlayer').addClass('d-block').add('#messenger').fadeIn().css('display', 'flex');
}
function closeChat(event){
    $('#overlayer, #messenger').removeClass('d-block').fadeOut(50);
}
function openChatBox(event){
    $('#message-box').fadeIn(50).css('display', 'flex');
}
function closeChatBox(event){
    $('#message-box').fadeOut(50);
}
/** User account section */
/** Do registration method */
function register(regdata){
    checklist = [];
    for (x in regdata){
        checklist.push(regdata[x]);
    }
    
    if (checklist.includes('')){
        alert('All required form fields must be completed.')
    }
    else {
        $.post(host+'/hms_handler/'+regdata.handler, {
            regdata: regdata
        }).then(res=>{
            if (res.status){
                window.location.href = 'dashboard';
            }
            else {
                alert(res.message);
            }
        })
    }
}
/** Do login method */
function login(event){
    event.preventDefault(); // prevent default form submission
    if (window.latlng.join(',') == '0,0'){

        navigator.permissions.query({name:"geolocation"}).then(status=>{
        
            window.latlng = [0,0];
    
            if (status.state == "granted"){
                let confirmedLocation = confirm(`Permission required:\r\nGeoLocation permission is required to use this app. \r\nPlease enable location in device settings or grant access to your location to continue.`);
                if (confirmedLocation) getGeoLocation();
            }
            if (status.state == "prompt"){
                alert(`Permission ${status.state}\r\nGeoLocation permission is required to use this app. \r\nPlease enable or grant access to your location to continue.`);
            }
            else if (status.state == "denied"){
                alert(`\r\nPermission ${status.state}\r\nGeoLocation permission is required to use this app. \r\nPlease enable or grant access to your location to continue.`);
            }
        })
    }
    else {
        // show spinner
        $('#user_login').find('.fa-spinner').show(100);

        // update login credentials
        userdata = {};
        userdata.username = $('#user_login').find('input[name=username]').val();
        userdata.password = $('#user_login').find('input[name=password]').val();
        userdata.handler = $('#user_login').find('form').data('handler');
        
        checklist = [];
        for (x in userdata){
            checklist.push(userdata[x]);
        }
        
        if (checklist.includes('')){
            alert('All required form fields must be completed.')
        }
        else {
            $.post(host+'/hms_handler/'+userdata.handler, {
                userdata: userdata
            }).then(res=>{
                
                if (res.status){
                    
                    let mydata = res.response.data;

                    let time = (new Date()).getTime();
                    let expires = new Date(time+((60000)*60*24)); // expire cookie after 24 hours
                    console.log(mydata)
                    // store user cookie session
                    document.cookie = "mydata="+(JSON.stringify(mydata))+"mydata=;SameSite=none;Secure=true;expires="+expires;
                    // redirect to dashboard
                    window.location.href = "/dashboard";
                }
                else {
                    console.log(res);
                    alert(res.error)
                }
            })
        }
    }
}

/** Institution registration */
function reg_inst(event){

    event.preventDefault(); // prevent default form submission
    // update registration data
    regdata = {};
    regdata.account_type = $('#inst_reg').find('input[name = account_type]').val();
    regdata.company = $('#inst_reg').find('input[name = company]').val();
    regdata.reg_number = $('#inst_reg').find('input[name = reg_number]').val();
    regdata.address = $('#inst_reg').find('input[name = address]').val();
    regdata.post_code = $('#inst_reg').find('input[name = post_code]').val().replaceAll(' ', '');
    regdata.country = $('#inst_reg').find('input[name = country]').val();
    regdata.telephone = $('#inst_reg').find('input[name = telephone]').val();
    regdata.email = $('#inst_reg').find('input[name = email]').val();
    regdata.username = $('#inst_reg').find('input[name = username]').val();
    regdata.password = $('#inst_reg').find('input[name = password]').val();
    regdata.handler = $('#inst_reg').find('form').data('handler');
    // show spinner
    $('#inst_reg').find('.fa-spinner').show(100);
    //do registration
    register(regdata);
}

/** Staff registration */
function reg_staff(event){

    event.preventDefault(); // prevent default form submission
    // update registration data
    regdata = {};
    regdata.account_type = $('#staff_reg').find('input[name = account_type]').val();
    regdata.company = $('#staff_reg').find('input[name = company]').val();
    regdata.firstname = $('#staff_reg').find('input[name = firstname]').val();
    regdata.lastname = $('#staff_reg').find('input[name = lastname]').val();
    regdata.address = $('#staff_reg').find('input[name = address]').val();
    regdata.post_code = $('#staff_reg').find('input[name = post_code]').val().replaceAll(' ', '');
    regdata.country = $('#staff_reg').find('input[name = country]').val();
    regdata.telephone = $('#staff_reg').find('input[name = telephone]').val();
    regdata.email = $('#staff_reg').find('input[name = email]').val();
    regdata.username = $('#staff_reg').find('input[name = username]').val();
    regdata.password = $('#staff_reg').find('input[name = password]').val();
    regdata.handler = $('#staff_reg').find('form').data('handler');
    // show spinner
    $('#staff_reg').find('.fa-spinner').show(100);
    //do registration
    register(regdata);
}
/** Regular user registration */
function reg_user(event){

    event.preventDefault(); // prevent default form submission
    // update registration data
    regdata = {};
    regdata.account_type = $('#user_reg').find('input[name = account_type]').val();
    regdata.firstname = $('#user_reg').find('input[name = firstname]').val();
    regdata.lastname = $('#user_reg').find('input[name = lastname]').val();
    regdata.address = $('#user_reg').find('input[name = address]').val();
    regdata.post_code = $('#user_reg').find('input[name = post_code]').val().replaceAll(' ', '');
    regdata.country = $('#user_reg').find('input[name = country]').val();
    regdata.telephone = $('#user_reg').find('input[name = telephone]').val();
    regdata.email = $('#user_reg').find('input[name = email]').val();
    regdata.username = $('#user_reg').find('input[name = username]').val();
    regdata.password = $('#user_reg').find('input[name = password]').val();
    regdata.handler = $('#user_reg').find('form').data('handler');
    // show spinner
    $('#user_reg').find('.fa-spinner').show(100);
    //do registration
    register(regdata);
}

/** Show search result */
function showSearchResults(event){
    event.preventDefault();
    if ($('#search-input').val().length > 0){
        $('#search-results').hide(50);
        $('#search-overlayer, #search-box, #search-loader').fadeIn(100);
        let timer = setTimeout(()=>{
            $('#search-loader').hide(100);
            $('#search-results').show(100);
            clearTimeout(timer);
        },2000);
    }
    else {
        hideSearchResults(event);
    }
}
/** Hide search result */
function hideSearchResults(event){
    event.preventDefault();
    $('#search-results, #search-overlayer, #search-box, #search-loader').fadeOut(50);
    $('#search-input').val('');
}
function showMyHealthRecord(event){
    event.preventDefault();
    $('#overlayer').addClass('d-block').add('#my-health-record').fadeIn();
}
function closeMyHealthRecord(event){
    $('#my-health-record, #overlayer').removeClass('d-block').fadeOut(50);
}
function showFindNearestHospitals(event){
    $('#overlayer').addClass('d-block').add('#find-nearest-hospitals').fadeIn();
}
function closeFindNearestHospitals(event){
    $('#find-nearest-hospitals, #overlayer').removeClass('d-block').fadeOut(50);
}

$('section').on('click', ()=>{
    if ($('body').outerWidth() <= 1060){
        $('#side-bar').animate({left:'-100%'}, 200).promise().done(e=>{
            $(e).css({'display':'none', 'z-index':'50', 'position':'fixed'});
        });
    }
});


window.onresize = ()=>{
    if ($('body').outerWidth() > 1060){
        $('#side-bar').css({'display':'block', 'z-index':'50', left:'-100%', 'position':'fixed'})
            .animate({left:0}, 100);
    }
    else {
        $('#side-bar').animate({left:'-100%'}, 100);//.css({'display':'none', 'z-index':'50', 'position':'fixed'})
            
    }
}