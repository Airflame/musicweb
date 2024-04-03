export class User {
    username:string;
    password:string;
    password2:string;
    email:string;
    first_name:string;
    last_name:string;

    constructor(username:string, password:string, password2:string, email:string, first_name:string, last_name:string){
        this.username = username;
        this.password = password;
        this.password2 = password2;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}
