import React, {Component} from "react";
import BangaScripts from "../modules/banga-scripts";

const bangaApp = new BangaScripts();

class HMS extends Component {

    async componentDidMount (){
        bangaApp.setPageTitle('Hospital Management System (HMS)');
        bangaApp.setPageDesc('A patient centred hospital management system.');
        bangaApp.addStyle('/css/style.css');
        bangaApp.addStyle('/css/pekaboom.css');
        bangaApp.addStyle('/hms/css/hms.css');
        bangaApp.addStyle('/hms/css/hms.index.css');
        window.document.querySelector('script[id=func]').remove();
        bangaApp.addScript('/hms/js/index.js');
        bangaApp.addScript('/hms/js/function.js');
        // bangaApp.addScript('/hms/js/particles.js', true, 1000);
        bangaApp.setThemeColor('#ffffff');
    }

    render (){
        return (
            <div className="jumbotron jumbotron-fluid absolute bg-white d-flex flex-column full-width py-0">
                
                <nav className="navbar navbar-expand-sm bg-white clearfix d-flex pl-5 pr-4 py-0" style={{borderTop:"0px solid #eaeaea", boxShadow:"0 0 6px 0px #0000003b", zIndex:'8'}} ref={(el)=>{
                    if (el){
                        el.style.setProperty('background', '#ffffff', 'important')
                    }
                }}>

                    <li className="navbar-brand float-left" style={{fontSize:"1rem", fontWeight:600}}>
                        <img src="/hms/images/stethoscope_trans_light.png" alt="logo" style={{width:"55px", height:"auto"}}/>
                        <b className="text-dark">HMS</b>
                    </li>

                    <ul className="navbar-nav ml-auto" style={{fontSize:"1.08rem"}}>

                        <li className="nav-item">
                            <a className="nav-link cursor-pointer" href="#about-us"><i className="fas fa-info-circle"></i> About HMS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link cursor-pointer" href="#register" onClick={(event)=>{
                                event.preventDefault();
                                window.showHmsRegistration();
                            }}><i className="fas fa-fingerprint"></i> Create account</a>
                        </li>
                        
                        {/** Mobile menu icon **/}
                        <li className="mbtn nav-item cursor-pointer" style={{display:"none", fontSize:"1.4rem"}} onClick={(event)=>window.showMobileMenu(event)}>
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

                <section className="bg-white full-width mt-2 py-5 px-4 mx-0 mb-0 row relative" style={{minHeight:"300px"}}>
                    
                    {/* <div className="absolute full-width full-height" style={{background:"#0000000a", left:"0", top:"0", zIndex:"1"}}>
                        <div id="particles-js" style={{width:"100%", height:"100%"}}></div>
                    </div> */}
                
                    <div className="col-sm-3 mt-0 ml-auto mb-3 d-flex" style={{zIndex:"2"}}>
                        <img className="d-block m-auto" src="/hms/images/stethoscope2.png" style={{background:"white", height:"240px", borderRadius:"35% 12%"}} alt=""/>
                    </div>
                    <div id="user_login" className="col-sm-4 mt-auto mb-auto mr-auto" style={{transform:"scale(0.9)", maxHeight:"max-content", zIndex:"3"}}>
                        
                        <span className="d-block mt-2 mb-2 ml-4" style={{fontSize:"1.5rem", fontWeight:"bold", fontFamily:"arial", color:"#909090"}}>HMS Login</span>

                        <form action="login" onSubmit={(ev)=>window.login(ev)} data-handler="login" className="d-flexx flex-wrap" style={{maxWidth:"380px"}}>
                            <input className="my-2 mx-3" name="username" style={{width:"90%", minWidth:"230px", maxWidth:"500px", border:"1px solid #a0a0a0", borderRadius:"20px", padding:'10px 15px'}} placeholder="Username" required/>
                            <input className="my-2 mx-3" name="password" type="password" style={{width:"90%", minWidth:"230px", maxWidth:"500px", border:"1px solid #a0a0a0", borderRadius:"20px", padding:'10px 15px'}} placeholder="Password" required/>
                            <br/>
                            <button className="d-block btn text-white mt-2 px-3 theme-bg-color mb-auto mx-3" style={{width:"90%", minWidth:"230px", borderRadius:'20px', padding:'10px 15px'}}> Login <i className="fa fa-spinner fa-spin" style={{display:'none'}}></i></button>
                            <span className="d-block ml-3 mt-4">
                                <span className="ml-2" style={{textShadow:"0 0 25px white", fontWeight:"501", whiteSpace:"nowrap"}}>Don't have an account?</span> <a className="ml-2" href="#register" onClick={(event)=>{
                                    event.preventDefault();
                                    window.showHmsRegistration();
                                }} style={{color:"#ff214a", whiteSpace:"nowrap"}}> Create a new account.</a>
                            </span>
                        </form>
                    </div>
                    
                </section>

                <section className="bg-dark relative full-width mb-0" style={{height:"500px", borderBottom:"1px solid #202020"}}>

                    <div className="absolute" style={{background:"#00000055", width:"100%", height:"100%", zIndex:"3"}}></div>
                    <div className="absolute z-index-10" style={{background:"linear-gradient(to right, #ff3c8d 48%, transparent 100%)", width:"60%", height:"100%"}}></div>
                    <img src="/hms/images/nurse.png" style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"top"}} alt=""/>

                    <div id="about-us" className="absolute" style={{width:"100%", minHeight:"100%", zIndex:"4", top:"0"}}>
                        <div className="absolute text-white" style={{maxWidth:"700px", top:"50%", transform:"translate(0, -50%)"}}> 
                            <header className="p-4">
                                <h1>Hospital Management System (HMS)</h1>
                                <h4>A Patient-Centered Hospital Management System.</h4>
                            </header>

                            <div className="d-block px-4" style={{width:"100%"}}>
                                This technology aims to deliver digital solutions for easy and efficient healthcare services, it is developed to enhance the relationship between patients, hospitals and healthcare service providers in general.
                                <br></br>
                                <p className="mt-2">
                                    This project is developed as part of the final dissertation for M.Sc. Digital Health at Bournemouth University, 2021/2022 session, by Abel O. Akponine.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-5" style={{background:'#white'}}>
                    <div className="container container-fluid pt-3 pb-5 mt-5 d-flex text-center">
                        <div className="col-sm-8">
                            <h3 style={{fontWeight:"bold"}}>What we offer</h3>
                            <img src="/hms/images/hms_home.png" alt="" style={{width:"100%"}}/>
                        </div>
                        <div className="col-sm-4 m-auto" style={{fontSize:"1.3rem"}}>
                            <h5 style={{fontWeight:"bold"}}><i className="fas fa-arrow-left"></i> Reliable and Secure Services</h5>
                            We offer various reliable services that are integrated with modern technologies and are easily accessible.
                        </div>

                    </div>
                </section>

                <section className="mb-0" style={{background:'#ececec'}}>
                    <div className="container container-fluid pt-3 pb-5 mt-5">

                        <div className="px-4">
                            <h1>Download HMS Mobile App <small className="text-danger" style={{whiteSpace:"nowrap"}}>(Coming Soon!)</small></h1>
                            <h4>Visit your mobile app store to download.</h4>
                        </div>

                        <div className="d-block px-4" style={{width:"100%"}}>
                            HMS mobile app offers exciting feeatures utilizing the device availble resources to deliver the best services to all users.
                            <p></p>
                            <span className="text-secondary">
                                Note: the mobile app version of this system is currently unavailble on app stores, our engineers are working tirelessly to bring you the best implementation of the system.
                            </span>
                        </div>

                    </div>
                </section>

                {/* <section className="bg-dark relative full-width" style={{minHeight:"150px"}}>

                </section> */}

                <footer className="mt-0 theme-color relative" style={{minHeight:"200px"}}>
                    
                    <div className="m-3 p-4">
                        <h6>Developed by Abel Akponine</h6>
                        {/* <h6 className="text-white"><i className="fab fa-instagram"></i> belKinga.a</h6> */}
                    </div>

                    <div className="absolute-center" style={{width:"max-content", top:"60%"}}>
                        <span>
                            <i className="fab fa-facebook-f"></i>
                        </span>
                        <span>
                            <i className="fab fa-instagram"></i>
                        </span>
                        <span>
                            <i className="fab fa-google"></i>
                        </span>
                        <span>
                            <i className="fab fa-snapchat"></i>
                        </span>
                    </div>

                </footer>


                <div id="overlayer" className="overlayer" style={{display:"none"}}>

                    <div id="reg" className="absolute-center p-4" style={{display:"none", background:"white", width:"100%", maxWidth:"400px", minHeight:"300px", borderRadius:"10px"}}>
                            
                        <button className="btn bg-light absolute" style={{padding:"3px 8px", borderRadius:"50%", top:"10px", right:"20px", border:"0", boxShadow:"none"}} onClick={()=>window.closeRegistration()}><i className="fas fa-times relative" style={{bottom:"-2px", fontSize:"20px"}}></i></button>

                        <h6 className="px-0 mt-4 font-weight-bold">Account registration</h6>
                        Click this if you are a health care institution, eg., Hospitals, Healthcare Agencies etc.
                        <button className="d-block btn theme-bg-color text-white mt-3 mb-3 ml-auto mr-auto p-3" style={{background:"purple", border:"0", borderRadius:"6px", boxShadow:"0 0 10px 0 #0000003b"}} onClick={()=>window.showInstRegistration()}>For healthcare institutions only</button>

                        <p className="text-center">Or&nbsp;</p>

                        <button className="d-block btn btn-primary mt-3 mb-3 ml-auto mr-auto" style={{borderRadius:"6px"}} onClick={()=>window.showUserRegistration()}>I am a regular user</button>
                        <button className="d-block btn btn-primary mt-3 mb-3 ml-auto mr-auto" style={{borderRadius:"6px"}} onClick={()=>window.showStaffRegistration()}>I am a healthcare provider <br/>(eg: nurse, doctor, support worker etc.)</button>
                    </div>
                </div>

                <div id="forms" className="overlayer" style={{display:"none"}}>
                    {/** For Insttitutions */}
                    <div id="inst_reg" className="absolute-center p-4" style={{display:"none", background:"white", width:"100%", height:"calc(100% - 0px)", maxWidth:"400px", minHeight:"300px", maxHeight:"850px", borderRadius:"0px", overflowX: "hidden", overflowY:"auto", borderTop:"20px solid white", borderBottom:"40px solid white"}}>

                        <button className="btn bg-light absolute" style={{padding:"3px 8px", borderRadius:"50%", top:"4px", right:"20px", border:"0", boxShadow:"none"}} onClick={()=>window.closeInstRegistration()}><i className="fas fa-times relative" style={{bottom:"-2px", fontSize:"20px"}}></i></button>

                        <h6 className="px-0 mt-4 font-weight-bold">Account registration for Institutions</h6>
                        Fill the required (<strong className="text-danger">*</strong>) forms below to complete the registration process.
                        
                        <form action="inst_reg" data-handler='inst_reg' className="mt-3" onSubmit={(ev)=>window.reg_inst(ev)}>
                        
                            <div className="d-hide">
                                <input name="account_type" defaultValue="institution"/>
                            </div>
                            <div className="d-flex">
                                <input name="company" placeholder="Company Name" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="reg_number" placeholder="Company Registration Number" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="address" placeholder="Address" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="post_code" placeholder="Post Code" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="country" placeholder="Country" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="telephone" placeholder="Telephone" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="email" placeholder="Email" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="username" placeholder="Username" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="password" type="password" placeholder="Password" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <button className="btn theme-bg-color text-white py-2 px-3 mt-2 full-width">Create account <i className="fa fa-spinner fa-spin" style={{display:"none"}}></i></button> <strong className="text-danger mt-auto mb-auto ml-2">&nbsp;</strong><br/>
                            </div>
                        </form>
                    </div>
                    
                    {/** For healthcare providers */}
                    <div id="staff_reg" className="absolute-center p-4" style={{display:"none", background:"white", width:"100%", height:"calc(100% - 0px)", maxWidth:"400px", minHeight:"300px", maxHeight:"850px", borderRadius:"0px", overflowX: "hidden", overflowY:"auto", borderTop:"20px solid white", borderBottom:"40px solid white"}}>

                        <button className="btn bg-light absolute" style={{padding:"3px 8px", borderRadius:"50%", top:"4px", right:"20px", border:"0", boxShadow:"none"}} onClick={()=>window.closeStaffRegistration()}><i className="fas fa-times relative" style={{bottom:"-2px", fontSize:"20px"}}></i></button>

                        <h6 className="px-0 mt-4 font-weight-bold">Account registration for Healthcare Providers</h6>
                        Fill the required (<strong className="text-danger">*</strong>) forms below to complete the registration process.
                        
                        <div id="search_reg" className="d-flex relative">
                            <input name="company_search" type="search" placeholder="Search for your company" ref={(el)=>{
                                if (el){
                                    el.style.setProperty("padding-right", "55px", "important")
                                }
                            }} defaultValue="Tabolt Medical Center, Bournemouth" required/>
                            <button className="btn bg-light py-1 px-2 absolute-y-center" style={{right:"30px", borderRadius:"50%"}}><i className="fas fa-search"></i></button> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                        </div>
                        
                        <form action="staff_reg" data-handler='staff_reg' className="mt-3" onSubmit={(ev)=>window.reg_staff(ev)}>
                            <div className="d-hide">
                                <input name="account_type" defaultValue="healthcare_provider" required/>
                            </div>

                            <div>
                                <small className="text-secondary">Please search in the form above to find your company.<br/>
                                Note: only registered companies are allowed to register new members (employees).</small>
                            </div>
                            <div className="d-flex mt-3">
                                <input name="company" placeholder="Company Name" data-regnum="" defaultValue="Tabolt Medical Center, Bournemouth" readOnly required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <p className="mt-2">
                                Enter your details below.
                            </p>
                            
                            <div className="d-flex">
                                <input name="firstname" placeholder="Firstame" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="lastname" placeholder="Lastname" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="address" placeholder="Address" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="post_code" placeholder="Post Code" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="country" placeholder="Country" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="telephone" placeholder="Telephone" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="email" placeholder="Email" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="username" placeholder="Username" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="password" type="password" placeholder="Password" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <button className="btn theme-bg-color text-white py-2 px-3 mt-2 full-width">Create account <i className="fa fa-spinner fa-spin" style={{display:"none"}}></i></button> <strong className="text-danger mt-auto mb-auto ml-2">&nbsp;</strong><br/>
                            </div>
                        </form>
                    </div>
                    
                    {/** For regular users */}
                    
                    <div id="user_reg" className="absolute-center p-4" style={{display:"none", background:"white", width:"100%", height:"calc(100% - 0px)", maxWidth:"400px", minHeight:"300px", maxHeight:"850px", borderRadius:"0px", overflowX: "hidden", overflowY:"auto", borderTop:"20px solid white", borderBottom:"40px solid white"}}>

                        <button className="btn bg-light absolute" style={{padding:"3px 8px", borderRadius:"50%", top:"4px", right:"20px", border:"0", boxShadow:"none"}} onClick={()=>window.closeUserRegistration()}><i className="fas fa-times relative" style={{bottom:"-2px", fontSize:"20px"}}></i></button>

                        <h6 className="px-0 mt-4 font-weight-bold">User account registration</h6>
                        Fill the required (<strong className="text-danger">*</strong>) forms below to complete the registration process.
                        
                        <form action="user_reg" data-handler="user_reg" className="mt-3" onSubmit={(ev)=>window.reg_user(ev)}>
                            <div className="d-hide">
                                <input name="account_type" defaultValue="regular" required/>
                            </div>
                            <div className="d-flex">
                                <input name="firstname" placeholder="Firstame" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="lastname" placeholder="Lastname" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="address" placeholder="Address" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="post_code" placeholder="Post Code" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="country" placeholder="Country" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="telephone" placeholder="Telephone" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="email" placeholder="Email" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="username" placeholder="Username" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <input name="password" type="password" placeholder="Password" required/> <strong className="text-danger mt-auto mb-auto ml-2">*</strong><br/>
                            </div>
                            <div className="d-flex">
                                <button className="btn theme-bg-color text-white py-2 px-3 mt-2 full-width">Create account <i className="fa fa-spinner fa-spin" style={{display:"none"}}></i></button> <strong className="text-danger mt-auto mb-auto ml-2">&nbsp;</strong><br/>
                            </div>
                        </form>
                    </div>
                    
                </div>

            </div>
        )
    }

}

export default HMS;