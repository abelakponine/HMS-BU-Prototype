import React, {Component} from "react";
import BangaScripts from "../modules/banga-scripts";

const bangaApp = new BangaScripts();

class Dashboard extends Component {

    async componentDidMount (){
        bangaApp.setPageTitle('Hospital Management System (HMS)');
        bangaApp.setPageDesc('A patient centred hospital management system.');
        bangaApp.addStyle('/css/style.css');
        bangaApp.addStyle('/css/pekaboom.css');
        bangaApp.addStyle('/hms/css/hms.css');
        bangaApp.addStyle('/hms/css/hms.dash.css');
        bangaApp.addStyle('/hms/css/calendar.css');
        bangaApp.addStyle('/hms/css/dash.mobile.css');
        window.document.querySelector('script[id=func]').remove();
        bangaApp.addScript('/hms/js/calendar.js');
        bangaApp.addScript('/hms/js/function.js');
        bangaApp.addScript('/hms/js/chat.js');
        // bangaApp.addScript('/hms/js/particles.js', true, 1000);
        bangaApp.addScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js');
        // Google Map
        bangaApp.addScript('https://polyfill.io/v3/polyfill.min.js?features=default');
        bangaApp.addScript('/hms/js/map.js', true);
        bangaApp.addScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDTWXoPxEMtQYV8Y1dKR7BN_It7Ds3K8HA&libraries=places', true, true);
        
        window.onload = (ev)=> bangaApp.addScript('/js/socket.js', true);

        bangaApp.setThemeColor('#b70952');
        
    }

    render (){
        return (
            <div className="d-flex">
                
                <div id="side-bar" className="absolute full-height" style={{background:"#353535", width:"20%", minWidth:"250px", maxWidth:"250px"}}>
                    <div className="d-flex p-2">
                        <img className="mr-2" src="/hms/images/hms.jpg" alt="" style={{minWidth:"50px", maxWidth:"50px", maxHeight:"50px", borderRadius:"50%", objectFit:"cover"}}/>
                        <div className="d-flex flex-column full-width ml-2">
                            <h6 className="mb-0 mt-1" style={{fontWeight:"bold"}}> Amelia <small>(HM5329297)</small></h6>
                            <span style={{fontSize:"0.9rem"}}> Age: 25</span>
                            <div className="mt-1">
                                <a href="#my-health-record" className="cursor-pointer text-white" style={{fontSize:"13px"}} onClick={(ev)=>window.showMyHealthRecord(ev)}><i className="fas fa-notes-medical"></i> View Health record</a> <br />
                                {/* <a className="ml-0 text-white" href="#viewprofile" style={{fontSize:"13px"}}><i className="fas fa-cog"></i> Settings</a> */}
                            </div>
                        </div>  
                    </div>

                    <hr className="my-0" style={{border:"0", borderTop:"1px solid #505050"}}/>
                    <div className="p-0">
                        <h6 className="pt-4 pb-0 px-4 text-secondary">Quick Links</h6>
                        <menu className="p-0">
                            <li className="active" style={{listStyleType:"none", listStylePosition:"inside"}}> <i className="fas fa-home"></i> &nbsp; Dashboard </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={(ev)=>window.showFindNearestHospitals(ev)}> <i className="fas fa-map-marker-alt"></i> &nbsp; Find Nearest Hospitals </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={(ev)=>window.showAtHomeServices(ev)}> <i className="fas fa-user-nurse"></i> &nbsp; Request At-Home Service </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={(ev)=>window.openChat(ev)}> <i className="fas fa-comments"></i> &nbsp; Talk to Healthcare Providers </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={(ev)=>window.showAppointments(ev)}> <i className="fas fa-calendar-alt"></i> &nbsp; My Appointments </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={(ev)=>window.showTND(ev)}> <i className="fas fa-diagnoses"></i> &nbsp; Test and Diagnoses </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={(ev)=>window.showMedications(ev)}> <i className="fas fa-pills"></i> &nbsp; My medications </li>
                            {/* <li style={{listStyleType:"none", listStylePosition:"inside"}}> <i className="fas fa-shopping-cart"></i> &nbsp; My Orders </li> */}
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={(ev)=>window.showEmergency(ev)}> <i className="fas fa-ambulance"></i> &nbsp; Emergency </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}}> <i className="fas fa-headset"></i> &nbsp; Support Team </li>
                            <li style={{listStyleType:"none", listStylePosition:"inside"}} onClick={window.logout}> <i className="fas fa-sign-out-alt"></i> &nbsp; Logout </li>
                        </menu>
                    </div>
                </div>

                <div className="jumbotron jumbotron-fluid absolute d-flex flex-column full-width py-0" style={{width:"calc(100% - 250px)", background:"#dadada", marginLeft:"250px"}}>
                    
                    <nav className="navbar navbar-expand-sm clearfix d-flex pl-5 pr-4 py-0" style={{background:"linear-gradient(to left, purple -220%, #b7095f 50%)", boxShadow:"0 0 5px 0 #0000003dd"}}>

                        <li className="navbar-brand float-left" style={{fontSize:"1rem", fontWeight:600}}>
                            
                            <h5 className="text-white">HMS Dashboard</h5>
                        </li>

                        <ul className="navbar-nav ml-auto" style={{fontSize:"1.08rem"}}>

                            <li className="nav-item">
                                <a className="nav-link cursor-pointer" href="#about-us"><i className="fas fa-headset"></i> Support</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link cursor-pointer" href="#register" onClick={(event)=>{
                                    event.preventDefault();
                                    window.logout();
                                }}><i className="fas fa-sign-out"></i> Logout</a>
                            </li>
                            
                            {/** Mobile menu icon **/}
                            <li className="mbtn nav-item cursor-pointer" style={{display:"none", fontSize:"1.4rem"}} onClick={(event)=>window.showSideBar(event)}>
                                <i className="fas fa-bars text-white"></i>
                            </li>
                        </ul>

                        {/** Mobile nav **/}
                        <div className="mobile-nav absolute py-4" style={{display:"none", width:"100%", left:"0", top:"100%"}}>

                            <li className="nav-item">
                                <a className="nav-link cursor-pointer" href="#home"><i className="fas fa-home"></i> Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link cursor-pointer" href="#about-us"><i className="fas fa-question-circle"></i> About HMS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link cursor-pointer" href="#register"><i className="fas fa-fingerprint"></i> Register</a>
                            </li>
                        </div>
                    </nav>
                    
                    <section className="d-flex" style={{width:"100%", overflowX:"hidden", overflowY:"auto"}}>
                        <div id="leftcol" className="col-sm-8 ml-5" style={{maxWidth:"calc(100% - 350px)"}}>

                            <div id="search-overlayer" className="overlayer" style={{display:'none', minHeight:'140%', left:'0', position:'absolute', borderRadius:'0 0 10px 10px', zIndex:'1'}}></div>
                            
                            <div className="my-4 p-4 ml-auto mr-auto relative" style={{background:"white", width:"90%", maxWidth:"750px", minHeight:"20px", borderRadius:"10px", boxShadow:"0 0 15px 0 #0000000aa", zIndex:'2'}}>
                                
                                <form onSubmit={(ev)=>window.showSearchResults(ev)}>
                                    <input id="search-input" className="pl-3 py-2" placeholder="Search for hospitals and health institutions" style={{width:"100%", paddingRight:"40px", borderRadius:"20px", border:"1px solid #ffbfc8", boxShadow:"none"}} onKeyUp={(ev)=>window.showSearchResults(ev)}/>
                                    <button type="submit" className="btn absolute" style={{right:'30px', marginTop:'2px', borderRadius:'50%', color:"grey"}}><i className="fas fa-search"></i></button><br/>
                                </form>

                                <div id="search-box" className="absolute bg-light p-4 text-secondary overflow-x-hide overflow-y-auto" style={{display:'none', width:'100%', height:'550%', left:'0', top:'80px', borderRadius:'0 0 10px 10px', fontSize:'14px', borderBottom:'24px solid #f8f9fa'}}>
                                    
                                    <div id="search-loader" className="text-secondary">
                                        <span className="fa fa-spinner fa-spin absolute-center text-secondary" style={{fontSize:'25px', top:'30%'}}></span>
                                        <span className="absolute-center" style={{top:'50%'}}>Searching... Please wait!</span>
                                    </div>
                                    <button className="close" onClick={(ev)=>window.hideSearchResults(ev)}><i className="fas fa-times"></i></button>
                                    <p id="dummy-search-text">This is a dummy search result, intended to look like a real search result.</p>

                                    <div id="search-results" style={{display:'none'}}>
                                        {(()=>{
                                            return (
                                                <div>
                                                    <div className="fh-res relative p-2 bg-white mt-2" style={{color:'black'}}>
                                                        <h1 style={{fontSize:'1rem'}}><b>Bournemouth University Medical Centre</b></h1>
                                                        <h2 style={{fontSize:'0.9rem'}}><b>Location:</b> Talbot House, Gillet Road, Poole</h2>
                                                        <b>Available hospital beds:</b> 2 out of 40 <br/>
                                                        <b>Staffs:</b> 54
                                                        <br></br>
                                                        <button id="viewOnMap-1" className="btn theme-bg-color text-white mt-1" data-location="" onClick={(e)=>{

                                                            if (window.mapWindow == null || window.mapWindow.closed)
                                                                window.mapWindow = window.open('https://maps.google.com/maps?daddr=50.7415781,-1.8948131')
                                                            else {
                                                                window.mapWindow.location.href = 'https://maps.google.com/maps?daddr=50.7415781,-1.8948131';
                                                                window.mapWindow.focus();
                                                            }

                                                        }}>View direction on Map</button>
                                                    </div>

                                                    <div className="fh-res relative p-2 bg-white mt-2" style={{color:'black'}}>
                                                        <h1 style={{fontSize:'1rem'}}><b>Bournemouth Chiropractic</b></h1>
                                                        <h2 style={{fontSize:'0.9rem'}}><b>Location:</b> 7 Poole Road, Bournemouth</h2>
                                                        <b>Available hospital beds:</b> 12 out of 30 <br/>
                                                        <b>Staffs:</b> 14
                                                        <br></br>
                                                        <button id="viewOnMap-2" className="btn theme-bg-color text-white mt-1" data-location="" onClick={(e)=>{

                                                            if (window.mapWindow == null || window.mapWindow.closed)
                                                                window.mapWindow = window.open('https://maps.google.com/maps?daddr=50.7415781,-1.8948131')
                                                            else {
                                                                window.mapWindow.location.href = 'https://maps.google.com/maps?daddr=50.7415781,-1.8948131';
                                                                window.mapWindow.focus();
                                                            }

                                                        }}>View direction on Map</button>
                                                    </div>
                                                </div>
                                            )
                                        })()}
                                    </div>
                                </div>
                            </div>
{/* 
                            <div className="my-4 p-4 ml-auto mr-auto text-dark" style={{background:"white", width:"90%", maxWidth:"750px", minHeight:"250px", borderRadius:"10px", boxShadow:"0 0 15px 0 #0000000aa", border:"1px solid #e8e8e8"}}>
                                <h6 className="text-dark">Staff Menu</h6>                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                            
                                <div className="menu" style={{fontWeight:'normal'}}>
                                

                                    <div className="option" title="Let healthcare providers come to your home and deliver services to you.">
                                        <h5 className="mt-2"><i className="fas fa-mobile-alt" style={{color:"#99047e"}}></i> <i className="fas fa-arrow-right" style={{fontSize:"10px"}}></i> <i className="fas fa-home" style={{color:"#909090"}}></i></h5>
                                        <span>Accept At-Home Requests</span>
                                    </div>
                                    <div className="option">
                                        <h5 className="mt-2"><i className="fas fa-envelope text-secondary"></i></h5>
                                        <span>Messages</span>
                                    </div>
                                    <div className="option">
                                        <h5 className="mt-2"><i className="fas fa-calendar-alt" style={{color:"#dd3363"}}></i></h5>
                                        <span>View Appointments</span>
                                    </div>
                                    <div className="option">
                                        <h5 className="mt-2"><i className="fas fa-receipt" style={{color:"grey"}}></i></h5>
                                        <span>View Pending Orders</span>
                                    </div>
                                    <div className="option">
                                        <h5 className="mt-2"><i className="fas fa-ambulance" style={{color:"#dd3363"}}></i></h5>
                                        <span>View Emergencies</span>
                                    </div>
                                </div>

                            </div>
                             */}
                            <div className="my-4 p-4 ml-auto mr-auto text-dark" style={{background:"white", width:"90%", maxWidth:"750px", minHeight:"250px", borderRadius:"10px", boxShadow:"0 0 15px 0 #0000000aa", border:"1px solid #e8e8e8"}}>
                                <h6 className="text-dark">User Menu</h6>                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                            
                                <div className="menu" style={{fontWeight:'normal'}}>
                                
                                <div className="option" title="Let healthcare providers come to your home and deliver services to you." onClick={(ev)=>window.showMyHealthRecord(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-notes-medical" style={{color:"#99047e"}}></i></h5>
                                        <span>My Health Record</span>
                                    </div>
                                    <div className="option" title="Let healthcare providers come to your home and deliver services to you." onClick={(ev)=>window.showAtHomeServices(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-user-nurse" style={{color:"#99047e"}}></i> <i className="fas fa-arrow-right" style={{fontSize:"10px"}}></i> <i className="fas fa-home" style={{color:"#909090"}}></i></h5>
                                        <span>Request At-Home Service</span>
                                    </div>
                                    <div className="option" onClick={(ev)=>window.showFindNearestHospitals(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-map-marker-alt text-danger"></i> <i className="fas fa-hospital" style={{color:"#99047e"}}></i></h5>
                                        <span>Find Nearest Hospitals</span>
                                    </div>
                                    <div className="option" onClick={(ev)=>window.openChat(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-comments text-secondary"></i> &raquo; <i className="fas fa-headset" style={{color:"#99047e"}}></i></h5>
                                        <span>Talk to Healthcare Providers</span>
                                    </div>
                                    <div className="option" onClick={(ev)=>window.showAppointments(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-calendar-alt" style={{color:"#dd3363"}}></i></h5>
                                        <span>My Appointments</span>
                                    </div>
                                    <div className="option" onClick={(ev)=>window.showTND(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-diagnoses" style={{color:"#4343fb"}}></i></h5>
                                        <span>Tests & Diagnoses</span>
                                    </div>
                                    <div className="option" onClick={(ev)=>window.showMedications(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-pills" style={{color:"#dd3363"}}></i></h5>
                                        <span>My Medications</span>
                                    </div>
                                    {/* <div className="option">
                                        <h5 className="mt-2"><i className="fas fa-shopping-cart" style={{color:"grey"}}></i></h5>
                                        <span>My Orders</span>
                                    </div> */}
                                    <div className="option" onClick={(ev)=>window.showEmergency(ev)}>
                                        <h5 className="mt-2"><i className="fas fa-ambulance" style={{color:"#dd3363", fontSize:'1.6rem'}}></i></h5>
                                        <span>Emergency Services</span>
                                    </div>
                                </div>

                                <div className="mt-4" style={{fontSize:"14px"}}>
                                    <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>

                                    {/* Map Services */}
                                    <h6>Map Services</h6>

                                    Hospitals near me (within 10 miles) <br/>
                                    Click any of the <b>(H)</b> label in map to view location point
                                    <div id="map" className="relative mt-3" style={{background:"#f9f9f9", width:'calc(100% + 48px)', height:'300px', margin:'auto', left:"-24px"}}></div>

                                    <p>&nbsp;</p>

                                    Find a place by postcode or address
                                    <div className="relative" style={{width:'100%'}}>

                                        { window.mapWindow = null }

                                        <input className="mt-2" name="find_place" type="search" placeholder="Enter postcode or Address" style={{minWidth:'250px', width:'100%', padding:'10px 6px', paddingRight:"30px", border:'1px solid silver', borderRadius:'4px', fontSize:'14px'}} onKeyPress={(e)=>{
                                            
                                            if (e.key === 'Enter' && window.$("input[name='find_place']").val() !==''){
                                                if (window.mapWindow == null || window.mapWindow.closed)
                                                    window.mapWindow = window.open('https://maps.google.com/maps?q='+window.$("input[name='find_place']").val())
                                                else {
                                                    window.mapWindow.location.href = 'https://maps.google.com/maps?q='+window.$("input[name='find_place']").val()
                                                    window.mapWindow.focus();
                                                }
                                            }
                                        }}/>
                                        <button className="btn bg-light py-1 px-2 absolute-y-center" style={{marginTop:'4px', right:"10px", borderRadius:"50%"}} onClick={(e)=>{
                                            
                                            if (window.mapWindow == null || window.mapWindow.closed)
                                                window.mapWindow = window.open('https://maps.google.com/maps?q='+window.$("input[name='find_place']").val())
                                            else {
                                                window.mapWindow.location.href = 'https://maps.google.com/maps?q='+window.$("input[name='find_place']").val()
                                                window.mapWindow.focus();
                                            }

                                        }}><i className="fas fa-search"></i></button><br/>
                                    </div>
                                </div>

                            </div>
                            
                        </div>
                        <div id="rightcol" className="col-sm-3 mx-auto p-0" style={{minWidth:"279px", maxWidth:"280px", minHeight:"350px"}} data-spy="affix" data-offset-top="20">

                            <div className="my-4 p-3 ml-auto mr-auto" style={{background:"white", width:"100%", borderRadius:"10px", boxShadow:"0 0 15px 0 #0000000aa", border:"1px solid #e8e8e8"}}>
                                <h6 className="text-dark my-0">Upcoming Events</h6>
                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                                
                                <div id="upcoming-event" className="text-secondary" style={{fontWeight:"normal"}}>
                                    <ul>
                                        <li>No Events found.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="my-4 p-3 ml-auto mr-auto" style={{background:"white", width:"100%", borderRadius:"10px", boxShadow:"0 0 15px 0 #0000000aa", border:"1px solid #e8e8e8"}}>
                                <h6 className="text-dark my-0">Events Calendar</h6>
                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                                
                                <div id="calendar"></div>
                            </div>

                        </div>
                    </section>

                    <div id="overlayer" className="overlayer" style={{display:"none"}}>

                         {/* Request At-Home Services */}
                         <div id="request-at-home-services" className="absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", background:"white", width:"100%", maxWidth:"500px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"15px"}}>
                            
                            <div className="mt-2 relative" style={{fontSize:"14px", zIndex:'2'}}>

                                <button className="close relative text-white" onClick={(ev)=>window.closeAtHomeServices(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>
                                <h1 className="relative text-white" style={{fontSize:'1.2rem', zIndex:'2'}}>Request At-Home Services</h1>

                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>

                                {/* Map Services */}
                                <span className="relative text-white" style={{fontSize:'16px', zIndex:'2'}}>
                                    Start scan to find health providers near you
                                </span>
                                <div id="map1" className="relative mt-3" style={{background:"#f9f9f9", width:'calc(100% + 48px)', height:'300px', margin:'auto', left:"-24px"}}></div>
                                
                                <div id="radar-container" className="absolute-center text-white" style={{width:'100%', height:'100%', fontSize:'1.3rem', top:'220px', zIndex:'2'}}>
                                    <span style={{width:'50px', height:'50px', border:'1px solid #6374ff', borderRadius:'50%'}}></span>
                                    <span style={{width:'50px', height:'50px', border:'1px solid #6374ff', borderRadius:'50%'}}></span>
                                    <span style={{width:'50px', height:'50px', border:'1px solid #6374ff', borderRadius:'50%'}}></span>
                                    <span style={{width:'50px', height:'50px', border:'1px solid #6374ff', borderRadius:'50%'}}></span>
                                </div>
                                
                                {/* Scan Timer */}
                                <span id="scan-timer" className="btn absolute-center text-white" style={{fontSize:'1.1rem', top:'150px', zIndex:'2'}} data-timer='5'></span>
                                {/* Start Scan */}
                                <button id="start-scan" className="btn absolute-center bg-primary text-white" style={{boxShadow:'0 0 20px 0px #161616', fontSize:'1.1rem', top:'220px', zIndex:'2'}} onClick={(ev)=>window.startRadarScan(ev)}>Start Scan</button>
                                {/* Stop Scan */}
                                <button id="cancel-scan" className="btn absolute-center bg-danger text-white" style={{display:'none', boxShadow:'0 0 20px 0px #161616', fontSize:'1.1rem', top:'220px', zIndex:'2'}} onClick={(ev)=>window.cancelRadarScan(ev)}>Cancel</button>

                                <div id="rahs-layer" className="overlayer" style={{display:'nonee',background:'#000000ad', zIndex:'1'}}></div>


                                <p>&nbsp;</p>

                                Find a place by postcode or address
                                <div className="relative" style={{width:'250px'}}>

                                    { window.mapWindow = null }

                                    <input className="mt-2" name="find_place" type="search" placeholder="Enter postcode or Address" style={{minWidth:'250px', padding:'10px 6px', paddingRight:"30px", border:'1px solid silver', borderRadius:'4px', fontSize:'14px'}} onKeyPress={(e)=>{
                                        
                                        if (e.key === 'Enter' && window.$("input[name='find_place']").val() !==''){
                                            if (window.mapWindow == null || window.mapWindow.closed)
                                                window.mapWindow = window.open('https://maps.google.com/maps?q='+window.$("input[name='find_place']").val())
                                            else {
                                                window.mapWindow.location.href = 'https://maps.google.com/maps?q='+window.$("input[name='find_place']").val()
                                                window.mapWindow.focus();
                                            }
                                        }
                                    }}/>
                                    <button className="btn bg-light py-1 px-2 absolute-y-center" style={{marginTop:'4px', right:"10px", borderRadius:"50%"}} onClick={(e)=>{
                                        
                                        if (window.mapWindow == null || window.mapWindow.closed)
                                            window.mapWindow = window.open('https://maps.google.com/maps?q='+window.$("input[name='find_place']").val())
                                        else {
                                            window.mapWindow.location.href = 'https://maps.google.com/maps?q='+window.$("input[name='find_place']").val()
                                            window.mapWindow.focus();
                                        }

                                    }}><i className="fas fa-search"></i></button><br/>
                                </div>
                            </div>

                        </div>

                        {/* Appointments */}
                        <div id="appointments" className="bg-light absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", width:"100%", height:'90%', maxWidth:"562px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"14px", borderBottom:'24px solid #f8f9fa', fontFamily:'sans-serif'}}>
                            
                            <button className="close relative" onClick={(ev)=>window.closeAppointmentForm(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>
                            <button className="btn btn-primary my-2" onClick={(ev)=>window.showAppointmentForm(ev)}>Create new appointment</button>

                            <div id="appointment-form" style={{display:'none'}}>

                                <table className="my-3">
                                    <tbody>
                                        <tr><th width='90'>Date: </th><td><input type="date" name="" id="appt-date" placeholder="date" className="p-2 mb-2" defaultValue='2022-04-25' style={{width:'300px', borderRadius:'6px', border:'1px solid silver'}}/></td></tr>

                                        <tr><th>Time: </th><td><input type="time" name="" id="appt-time" className="p-2 mb-2" defaultValue='08:31' style={{width:'300px', borderRadius:'6px', border:'1px solid silver'}}/></td></tr>

                                        <tr><th>Location (Address): </th><td><input type="text" name="" id="" className="p-2 mb-2" defaultValue='Talbot House, Gillet Road, Poole' style={{width:'300px', borderRadius:'6px', border:'1px solid silver'}}/></td></tr>

                                        <tr><th>Description: </th><td colSpan='2'><textarea className="p-2 mb-2" placeholder="Description" style={{width:'300px', height:'100px', borderRadius:'6px', border:'1px solid silver'}} defaultValue='Medical check up'></textarea></td></tr>

                                        <tr><td></td><td colSpan='2'><button className="btn btn-primary text-white" onClick={(ev)=>window.saveAppointment(ev)}>Save Appointment <i className="fa fa-spinner fa-spin" style={{display:'none'}}></i></button></td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-white p-4 mb-2" style={{borderRadius:'10px'}}>
                                <h1 style={{fontSize:'15px', fontWeight:'bold'}}>Upcoming Events</h1>
                                
                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>

                                <span>You have no upcoming events.</span>
                            </div>

                            <div className="bg-white p-4 mb-2" style={{minHeight:'300px', borderRadius:'10px'}}>
                                <h1 style={{fontSize:'15px', fontWeight:'bold'}}><i className="fa fa-history"></i> Events History</h1>

                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                                <span>Event history is empty.</span>
                            </div>
                        </div>

                        {/* Emergency Services */}
                        <div id="emergency" className="bg-light absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", width:"100%", height:'90%', maxWidth:"562px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"14px", borderBottom:'24px solid #f8f9fa', fontFamily:'sans-serif'}}>
                            
                            <button className="close relative" onClick={(ev)=>window.closeEmergencyForm(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>
                            <button className="btn btn-danger my-2" onClick={(ev)=>window.showEmergencyForm(ev)}>Create New Emergency</button>

                            <div id="emergency-form" style={{display:'none'}}>

                                <table className="my-3">
                                    <tbody>
                                        <tr><th width='90' style={{minWidth:'80px'}}>Select Emergency Type: </th>
                                        <td>
                                            <select type="date" name="" id="appt-date" className="p-2 mb-2" defaultValue='Ambulance' style={{width:'300px', borderRadius:'6px', border:'1px solid silver'}}>
                                                <option value="ambulance">Ambulance</option>
                                                <option value="police">Police</option>
                                                <option value="fire-service">Fire Service</option>
                                            </select>
                                        </td></tr>
                                        
                                        <tr><th>Location (Address): </th><td><input type="text" name="" id="" className="p-2 mb-2" defaultValue='Talbot House, Gillet Road, Poole' style={{width:'300px', borderRadius:'6px', border:'1px solid silver'}}/></td></tr>

                                        <tr><th>Description: </th><td colSpan='2'><textarea className="p-2 mb-2" placeholder="How can we help you?" style={{width:'300px', height:'100px', borderRadius:'6px', border:'1px solid silver'}}></textarea></td></tr>

                                        <tr><td></td><td colSpan='2'><button className="btn btn-primary text-white" onClick={(ev)=>window.saveAppointment(ev)}>Create Emergency <i className="fa fa-spinner fa-spin" style={{display:'none'}}></i></button></td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-white p-4 mb-2" style={{minHeight:'300px', borderRadius:'10px'}}>
                                <h1 style={{fontSize:'15px', fontWeight:'bold'}}><i className="fa fa-history"></i> Emergency History</h1>

                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                                <span>Emergency history is empty.</span>
                            </div>
                        </div>

                        {/* Health Records */}
                        <div id="my-health-record" className="bg-light absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", width:"100%", height:'90%', maxWidth:"562px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"15px", borderBottom:'24px solid #f8f9fa', fontFamily:'sans-serif'}}>
                            
                            <div className="mt-2 relative" style={{fontSize:"14px", zIndex:'2'}}>

                                <button className="close relative" onClick={(ev)=>window.closeMyHealthRecord(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>
                                <h1 className="relative" style={{fontSize:'1.1rem', zIndex:'2'}}>My health records</h1>

                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>

                                {/* Map Services */}
                                <span className="d-block mb-3 relative text-secondary" style={{fontSize:'16px', zIndex:'2'}}>
                                    This is a dummy health reacord, intended to look like a real health record.
                                </span>
                                
                                <div className="hr-container px-2 pt-1 pb-3 mb-2 d-block flex-column bg-white" style={{minWidth:'100%', overflow:'auto', height:'max-content'}}>
                                    <div className="d-flex" style={{width:'90%', margin:'15px auto'}}>
                                        
                                        <img className="d-block m-auto" src="/hms/images/hms.jpg" alt="health worker" style={{width:'auto', height:'180px', borderRadius:'50%', objectFit:'cover', objectPosition:'top'}}/>

                                    </div>
                                    <div className="d-flex flex-column mt-auto mb-auto mx-4" style={{textAlign:'left'}}>

                                        <table style={{display:'flex', width:'100%', overflow:'auto', scrollbarWidth:'thin'}}>
                                            <tbody>
                                                <tr>
                                                    <th colSpan={3} style={{background:'#f9afaf'}}>Bio</th>
                                                </tr>
                                                <tr>
                                                    <th>Firstname:</th><td>Amelia</td>
                                                </tr>
                                                <tr>
                                                    <th>Middlename:</th><td>Jane</td>
                                                </tr>
                                                <tr>
                                                    <th>Lastname:</th><td>Moore</td>
                                                </tr>
                                                <tr>
                                                    <th>Age:</th><td>25</td>
                                                </tr>
                                                <tr>
                                                    <th>Gender:</th><td>Female</td>
                                                </tr>
                                                <tr>
                                                    <th>Email:</th><td>Ameliajmoore@123.com</td>
                                                </tr>
                                                <tr>
                                                    <th>Telephone:</th><td>+447423456789</td>
                                                </tr>
                                                <tr>
                                                    <th className="vertical-align-top">Address:</th><td>58 Pekaboom Drive, XTT 123, UK</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'4px 0 0 4px'}}>Allergies</th>
                                                    <th colSpan={2} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>Symptoms</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={1} className="vertical-align-top" style={{fontWeight:'normal'}}>Lactose intolerance:</th>
                                                    <td colSpan={2}>
                                                        farting,
                                                        diarrhoea,
                                                        a bloated stomach,
                                                        stomach cramps and pains,
                                                        stomach rumbling,
                                                        feeling sick.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2} style={{background:'#f9afaf', borderRadius:'4px 0 0 4px'}}>Treatments</th>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>For</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2} className="vertical-align-top" style={{fontWeight:'normal'}}>
                                                        There's no cure for lactose intolerance, but cutting down on food and drink containing lactose usually helps to control the symptoms.    
                                                    </th>
                                                    <td>
                                                        Lactose Intolerance
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'4px 0 0 4px', whiteSpace:'nowrap'}}>Tests & Diagnoses</th>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0'}}>Date</th>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>Result</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={1} className="vertical-align-top" style={{fontWeight:'normal'}}>
                                                        Covid-19    
                                                    </th>
                                                    <td>
                                                        10/03/2022
                                                    </td>
                                                    <td>
                                                        Negative
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'4px 0 0 4px'}}>Vaccinations</th>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0'}}>For</th>
                                                    <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>Date</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={1} className="vertical-align-top" style={{fontWeight:'normal'}}>
                                                        Pfizer BT100 (First Dosage)
                                                    </th>
                                                    <td>
                                                        Covid-19
                                                    </td>
                                                    <td>
                                                        17/04/2021
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={3} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>Medical history</th>

                                                </tr>
                                                <tr>
                                                    <th colSpan={2} style={{background:'#f5f5f5', borderRadius:'4px 0 0 4px'}}>Description</th>
                                                    <th colSpan={1} style={{background:'#f5f5f5', borderRadius:'0'}}>Date</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2} style={{borderRadius:'4px 0 0 4px', fontWeight:'normal'}}>
                                                        <details>
                                                            <summary>Dental Treatment (At-Home Service)</summary>
                                                            Teeth Whitening procedure
                                                        </details>
                                                    </th>
                                                    <td colSpan={2} className="vertical-align-top">
                                                        12/02/2022
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2} style={{borderRadius:'4px 0 0 4px', fontWeight:'normal'}}>
                                                        <details>
                                                            <summary>Bunion Surgery</summary>
                                                            operation to correct a bunion, which is a deformity of the joint at the bottom of the big toe of the left foot.
                                                        </details>
                                                    </th>
                                                    <td colSpan={2} className="vertical-align-top">
                                                        18/12/2021
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Tests & Diagnoses */}
                        <div id="TND" className="bg-white absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", width:"100%", height:'90%', maxWidth:"562px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"15px", borderBottom:'24px solid #f8f9fa', fontFamily:'sans-serif'}}>
                            
                            <div className="mt-2 relative" style={{fontSize:"14px", zIndex:'2'}}>

                                <button className="close relative" onClick={(ev)=>window.closeTND(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>
                                <h1 className="relative" style={{fontSize:'1.1rem', zIndex:'2'}}>My Tests & Diagnoses</h1>
                                
                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                                
                                <div id="tnd-records">
                                    <table style={{width:'100%'}}>
                                        <tbody>
                                            <tr>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'4px 0 0 4px', whiteSpace:'nowrap'}}>Tests & Diagnoses</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0'}}>Date</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>Result</th>
                                            </tr>
                                            <tr>
                                                <th colSpan={1}>
                                                    <details>
                                                        <summary>Covid-19 Test</summary>
                                                        Test for Covid-19
                                                    </details>
                                                </th>
                                                <td colSpan={1}>12/01/2022</td>
                                                <td colSpan={1}>Negative</td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <details>
                                                        <summary>Lactose Intolerance (Diagnoses)</summary>
                                                        farting,
                                                        diarrhoea,
                                                        a bloated stomach,
                                                        stomach cramps and pains,
                                                        stomach rumbling,
                                                        feeling sick.
                                                    </details>
                                                </th>
                                                <td>12/01/2022</td>
                                                <td>Concluded</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        {/* Medications */}
                        <div id="medications" className="bg-white absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", width:"100%", height:'90%', maxWidth:"562px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"15px", borderBottom:'24px solid #f8f9fa', fontFamily:'sans-serif'}}>
                            
                            <div className="mt-2 relative" style={{fontSize:"14px", zIndex:'2'}}>

                                <button className="close relative" onClick={(ev)=>window.closeMedications(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>
                                <h1 className="relative" style={{fontSize:'1.1rem', zIndex:'2'}}>My Medications</h1>
                                
                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>
                                
                                <div id="tnd-records">
                                    
                                    <p></p>
                                    <h3 style={{fontSize:'14px', fontWeight:'bold'}}>Ongoing Medications</h3>

                                    <table style={{width:'100%'}}>
                                        <tbody>
                                            <tr>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'4px 0 0 4px', whiteSpace:'nowrap'}}>Medications</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0'}}>Prescription</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0'}}>Date Started</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>End Date</th>
                                            </tr>
                                            <tr>
                                                <th>Vitamin C</th>
                                                <td>1 tablet (morning and evening)</td>
                                                <td>12/01/2022</td>
                                                <td>25/04/2022</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <p></p>
                                    <h3 className="mt-4" style={{fontSize:'14px', fontWeight:'bold'}}>Completed Medications</h3>

                                    <table style={{width:'100%'}}>
                                        <tbody>
                                            <tr>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'4px 0 0 4px', whiteSpace:'nowrap'}}>Medications</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0'}}>Prescription</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0'}}>Date Started</th>
                                                <th colSpan={1} style={{background:'#f9afaf', borderRadius:'0 4px 4px 0'}}>Date Ended</th>
                                            </tr>
                                            <tr>
                                                <th>Paracetamol</th>
                                                <td>2 tablets (morning and evening)</td>
                                                <td>12/01/2022</td>
                                                <td>18/01/2022</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        {/* Request At-Home Service Results */}
                        <div id="request-at-home-service-results" className="bg-light absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", width:"100%", height:'90%', maxWidth:"562px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"15px", borderBottom:'24px solid #f8f9fa', fontFamily:'sans-serif'}}>
                            
                            <div className="mt-2 relative" style={{fontSize:"14px", zIndex:'2'}}>

                                <button className="close relative" onClick={(ev)=>window.closeAtHomeServiceResults(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>
                                <h1 className="relative" style={{fontSize:'1.1rem', zIndex:'2'}}>(At-Home Service) Results</h1>

                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>

                                {/* Map Services */}
                                <span className="d-block mb-3 relative text-secondary" style={{fontSize:'16px', zIndex:'2'}}>
                                    This is a dummy result, intended to look like a real scan result.<br/>
                                    Connect with a healthcare provider to use services.
                                </span>
                                
                                <div style={{fontSize:'15px', fontFamily:'arial'}}>
                                    <i className="fa fa-sort" style={{fontSize:'22px', color:'silver'}}></i> Sort By: &ensp;
                                    <select className="py-1 mt-2 mb-3" id="sort-scan-result" defaultValue='Sort by prices'>
                                        <option label="Prices" value="prices"></option>
                                        <option label="Distance" value='distance'></option>
                                    </select>
                                </div>

                                <div className="ahr-res px-4 py-3 mb-2 d-flex bg-white" style={{height:'max-content'}}>
                                    <div className="d-flex">
                                        
                                        <img className="d-block mb-auto" src="/hms/images/doctor-male.jpg" alt="health worker" style={{width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover'}}/>

                                        <div className="d-flex flex-column mt-auto mb-auto ml-3">
                                            <span style={{ display:'none', fontSize:'1rem', fontWeight:'bold'}}>Stanley Moore (Doctor)</span><br />
                                            <span style={{display:'none'}}><b>Age:</b> 45</span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column mt-auto mb-auto mx-4" style={{textAlign:'left'}}>

                                        <span style={{fontSize:'1rem', fontWeight:'bold'}}>Stanley Moore (Doctor)</span><br />

                                        <span><b>Age:</b> 45</span><br />
                                        <span><b>Portfolio:</b> <a href="#linkedIn" className="theme-color">https://linkedin.com/in/#linkedInProfile</a></span>
                                        <span><b>Institution:</b> Talbot Medical Center</span>
                                        <span><b>Distance:</b> less than a mile away</span>
                                        <span><b>Service Charge:</b> $10 / hr</span>

                                        <button className="btn theme-bg-color text-white mt-2">Connect</button>
                                    </div>
                                </div>

                                <div className="ahr-res px-4 py-3 mb-2 d-flex bg-white" style={{height:'max-content'}}>

                                    <div className="d-flex">

                                        <img className="d-block mb-auto" src="/hms/images/hms.jpg" alt="health worker" style={{width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover'}}/>

                                        <div className="d-flex flex-column mt-auto mb-auto ml-3">
                                            <span style={{display:'none', fontSize:'1rem', fontWeight:'bold'}}>Amelia Johnson (Nurse)</span><br />
                                            <span style={{display:'none'}}><b>Age:</b> 25</span>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-column mt-auto mb-auto mx-4" style={{textAlign:'left'}}>
                                        
                                        <span style={{fontSize:'1rem', fontWeight:'bold'}}>Amelia Johnson (Nurse)</span><br />

                                        <span><b>Age:</b> 25</span><br />
                                        <span><b>Portfolio:</b> <a href="#linkedIn" className="theme-color">https://linkedin.com/in/#linkedInProfile</a></span>
                                        <span><b>Institution:</b> Talbot Medical Center</span>
                                        <span><b>Distance:</b> 2 miles away</span>
                                        <span><b>Service Charge:</b> $10 / hr</span>
                                        <button className="btn theme-bg-color text-white mt-2">Connect</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Talk to Healthcare Providers */}
                        <div id="messenger" className="bg-white absolute p-4 overflow-hide flex-column" style={{display:"none", width:"100%", height:'95%', maxWidth:"562px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px 10px 0 0", color:"black", fontSize:"15px", border:'0px solid white', fontFamily:'sans-serif', left:'50%', transform:'translate(-50%, 0%)', bottom:'0'}}>
                            
                            <div className="mt-1 relative" style={{fontSize:"14px", zIndex:'2'}}>

                                <button className="close relative" onClick={(ev)=>window.closeChat(ev)} style={{zIndex:'3'}}><i className="fas fa-times"></i></button>

                                <h1 className="relative" style={{fontSize:'1.1rem', zIndex:'2'}}>Messenger</h1>

                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>

                                <span className="d-block mb-3 relative text-secondary" style={{fontSize:'16px', zIndex:'2'}}>
                                    <input type="search" style={{width:'100%', padding:'8px 20px 8px 20px', borderRadius:'20px', border:'1px solid #c9c9c9'}} placeholder='Search Name or ID'/>
                                    <button className="absolute btn bg-light" style={{right:'4px', top:'2px', borderRadius:'50%'}}><i className="fa fa-search"></i></button>
                                </span>
                                
                                <div id="chat-container">

                                    <div className="chat px-1 py-3 mb-2 d-flex bg-white" style={{height:'max-content'}} onClick={(ev)=>window.openChatBox(ev)}>

                                        <div className="d-flex">
                                            <img className="d-block mb-auto" src="/hms/images/doctor-male.jpg" alt="health worker" style={{width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover'}}/>
                                        </div>

                                        <div className="d-block flex-column mt-auto mb-auto mx-4" style={{height:'max-content', textAlign:'left'}}>

                                            <span style={{fontSize:'0.9rem', fontWeight:'bold'}}>Stanley Moore (Doctor)</span><br />

                                            <span className="text-success"><b>Status:</b> Online</span>

                                            <div className="d-flex">
                                                <button className="btn theme-bg-color text-white mt-2" style={{width:'max-content', borderRadius:'20px'}}> <i className="fa fa-commenting"></i> Chat</button>

                                                <button className="btn bg-light mt-2 mt-2 mx-3" style={{width:'max-content', borderRadius:'20px'}}> <i className="fa fa-flag"></i> Report</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="chat px-4 py-3 mb-2 d-flex bg-white" style={{height:'max-content'}} onClick={(ev)=>window.openChatBox(ev)}>
                                        <div className="d-flex">
                                            
                                            <img className="d-block mb-auto" src="/hms/images/hms.jpg" alt="health worker" style={{width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover'}}/>

                                        </div>
                                        <div className="d-flex flex-column mt-auto mb-auto mx-4" style={{textAlign:'left'}}>

                                            <span style={{fontSize:'0.9rem', fontWeight:'bold'}}>Amelia Johnson (Nurse)</span><br />

                                            <span className="text-success"><b>Status:</b> Online</span>

                                            <div className="d-flex">
                                                <button className="btn theme-bg-color text-white mt-2" style={{width:'max-content', borderRadius:'20px'}}> <i className="fa fa-commenting"></i> Chat</button>

                                                <button className="btn bg-light mt-2 mt-2 mx-3" style={{width:'max-content', borderRadius:'20px'}}> <i className="fa fa-flag"></i> Report</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div id="message-box" className="flex-column absolute bg-white pt-2 pb-0 px-0" style={{display:'none', width:'100%', height:'100%', left:'0', top:'0', zIndex:'10'}}>

                                <div id="msg-head" className="d-flex pb-2" style={{height:'max-content'}}>
                                
                                    <button className="close px-4 no-bg border-0 text-secondary cursor-pointer" onClick={(ev)=>window.closeChatBox(ev)}><i className="fa fa-angle-left" style={{fontSize:'2.6rem'}}></i></button>

                                    <div className="d-flex">
                                        
                                        <div>
                                            <img className="d-block mb-auto" src="/hms/images/doctor-male.jpg" alt="health worker" style={{width:'55px', height:'55px', borderRadius:'50%', objectFit:'cover'}}/>
                                        </div>
                                        
                                        <div className="d-block flex-column mt-auto mb-auto mx-4" style={{textAlign:'left', fontSize:'12px'}}>

                                            <span style={{fontSize:'15px', fontWeight:'bold'}}>Stanley Moore (Doctor)</span><br />

                                            <span className="text-success"><b>Status:</b> Online</span>
                                        </div>
                                    </div>

                                </div>
                                <div id="msg-body" className="d-flex bg-light px-4 py-2 overflow-x-hide flex-column overflow-y-auto" style={{width:'100%', height:'100%', fontSize:'14.5px'}}>

                                </div>
                                <div className="bg-white relative p-2 full-width" style={{bottom:'0'}}>
                                    <button className="absolute py-2 btn no-bg text-secondary" style={{top:'11px', left:'12px', borderRadius:'20px'}}>
                                        <i className="fas fa-smile" style={{fontSize:'1.2rem'}}></i>
                                    </button>
                                    <textarea id="msg-input" type="text" placeholder="Start typing..." style={{width:'100%', height:'48px', padding:'12px 50px 12px 50px', border:'1px solid silver', borderRadius:'25px', outline:'none', overflow:'hidden', resize:'none'}}></textarea>
                                    <button className="absolute py-2 btn theme-bg-color text-white" style={{top:'11px', right:'12px', borderRadius:'20px'}} onClick={(ev)=>{
                                        window.sendMsg(window.$('#msg-input').val());
                                        window.$('#msg-input').val('');
                                    }}>
                                        <i className="fas fa-paper-plane" style={{fontSize:'1.2rem'}}></i>
                                    </button>
                                </div>
                            </div>

                        </div>

                         {/* Find nearest hospitals */}
                         <div id="find-nearest-hospitals" className="absolute-center p-4 overflow-x-hide overflow-y-auto" style={{display:"none", background:"white", width:"100%", maxWidth:"500px", minHeight:"300px", maxHeight:'100%', borderRadius:"10px", color:"black", fontSize:"15px"}}>
                            
                            <div id="fnh-layer" className="overlayer" style={{display:'none'}}></div>

                            <div className="mt-4" style={{fontSize:"14px"}}>

                                <button className="close" onClick={(ev)=>window.closeFindNearestHospitals(ev)}><i className="fas fa-times"></i></button>
                                <h1 style={{fontSize:'1.2rem'}}>Find nearest hospitals</h1>

                                <hr className="my-2" style={{border:"0", borderTop:"1px solid #eaeaea"}}/>

                                {/* Map Services */}
                                <h6>Map Services</h6>

                                Hospitals near me (within 10 miles) <br/>
                                Click any of the <b>(H)</b> label in map to view location point
                                <div id="map2" className="relative mt-3" style={{background:"#f9f9f9", width:'calc(100% + 48px)', height:'300px', margin:'auto', left:"-24px"}}></div>

                                <p>&nbsp;</p>

                                Find a place by postcode or address
                                <div className="relative" style={{width:'100%'}}>

                                    { window.mapWindow = null }

                                    <input className="mt-2" name="find_place" type="search" placeholder="Enter postcode or Address" style={{minWidth:'250px', width:'100%', padding:'10px 6px', paddingRight:"30px", border:'1px solid silver', borderRadius:'4px', fontSize:'14px'}} onKeyPress={(e)=>{
                                        
                                        if (e.key === 'Enter' && window.$("input[name='find_place']").val() !==''){
                                            if (window.mapWindow == null || window.mapWindow.closed)
                                                window.mapWindow = window.open('https://maps.google.com/maps?q='+window.$("input[name='find_place']").val())
                                            else {
                                                window.mapWindow.location.href = 'https://maps.google.com/maps?q='+window.$("input[name='find_place']").val()
                                                window.mapWindow.focus();
                                            }
                                        }
                                    }}/>
                                    <button className="btn bg-light py-1 px-2 absolute-y-center" style={{marginTop:'4px', right:"10px", borderRadius:"50%"}} onClick={(e)=>{
                                        
                                        if (window.mapWindow == null || window.mapWindow.closed)
                                            window.mapWindow = window.open('https://maps.google.com/maps?q='+window.$("input[name='find_place']").val())
                                        else {
                                            window.mapWindow.location.href = 'https://maps.google.com/maps?q='+window.$("input[name='find_place']").val()
                                            window.mapWindow.focus();
                                        }

                                    }}><i className="fas fa-search"></i></button><br/>
                                </div>
                            </div>

                        </div>

                        {/* Dialog */}
                        <div id="dialog" className="absolute-center p-4" style={{display:"none", background:"white", width:"100%", maxWidth:"400px", minHeight:"50px", borderRadius:"10px", color:"black", fontSize:"15px"}}>
                                
                            <button className="btn bg-light absolute" style={{padding:"3px 8px", borderRadius:"50%", top:"10px", right:"20px", border:"0", boxShadow:"none"}} onClick={()=>{
                                if (window.$('#find-nearest-hospitals').is(':visible')){
                                    window.$('#dialog, #fnh-layer').removeClass('d-block').fadeOut(50);
                                }
                                else {
                                    window.hideDialog();
                                }
                            }}><i className="fas fa-times relative" style={{bottom:"-2px", fontSize:"20px"}}></i></button>
                            
                            <h6 className="mt-4">{(()=>"{{Place_name}}")()}</h6>
                            Coordinates: <span>{(()=>"{{LatLng}}")()}</span>
                            <p></p>
                            <button id="viewOnMap" className="btn theme-bg-color text-white" data-location="" onClick={(e)=>{
                                let el = e.target;

                                if (window.mapWindow == null || window.mapWindow.closed)
                                    window.mapWindow = window.open('https://maps.google.com/maps?daddr='+el.dataset.location);
                                else {
                                    window.mapWindow.location.href = 'https://maps.google.com/maps?daddr='+el.dataset.location
                                    window.mapWindow.focus();
                                }

                            }}>View direction on Map</button>
                        </div>
                    
                    </div>

                </div>
            </div>
        )
    }

}

export default Dashboard;