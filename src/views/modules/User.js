class User {
    /** Initialize user class */
    constructor(){
        this.firstname = undefined;
        this.lastname = undefined;
        this.dob = undefined;
        this.email = undefined;
        this.countryOfOrigin = undefined;
        this.location = undefined;
        this.username = undefined;
        this.password = undefined;
    }
    /** get user data */
    getUserdata(){
        let userdata = this;
        delete userdata['password'];
        return userdata;
    }
    /** get fullname */
    getFullname(){
        return this.firstname+" "+this.lastname;
    }
    /** get date of birth */
    getDoB(){
        return this.dob;
    }

    /** Set user data **/
    /** set firstname */
    setFirstname(firstname){
        this.firstname = firstname;
    }
    /** set lastname */
    setLastname(lastname){
        this.lastname = lastname;
    }
    /** set date of birth */
    setDoB(dob){
        this.dob = dob;
    }
    /** set user email */
    setEmail(email){
        this.email = email;
    }
    /** set user country of origin */
    setCountryOfOrigin(countryOfOrigin){
        this.countryOfOrigin = countryOfOrigin;
    }
    /** set username */
    setUsername(username){
        this.username = username.toLowerCase();
    }
    /** set password */
    setPassword(password){
        this.password = password;
    }
    /** set location */
    setLocation(location){
        this.location = location;
    }
    registerAccount(userdata){
        console.log(userdata);
    }
}

export default User;