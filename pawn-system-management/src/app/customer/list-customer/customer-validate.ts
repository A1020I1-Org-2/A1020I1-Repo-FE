export class ValidateCustomer {
    name: string
    dateOfBirth: string
    email: string
    address: string
    phone: string
    idCard: string
    img: string
    isValid: boolean
    constructor(isValid: boolean, name: string, dateOfBirth: string, email: string, address: string, phone: string, idCard: string, img: string) {
        this.isValid = isValid;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.idCard = idCard;
        this.img = img;
    }
    setName(name: string) {
        this.name = name;
    }
    setEmail(email: string) {
        this.email = email;
    }
    setAddress(address: string) {
        this.address = address;
    }

    setPhone(phone: string) {
        this.phone = phone;
    }

    setIdCard(idcard: string) {
        this.idCard = idcard;
    }

    setImg(img: string) {
        this.img = img;
    }

    setDateOfBirth(dateOfBirth: string) {
        this.dateOfBirth = dateOfBirth;
    }
    checkRequired(field: any): boolean {
        // console.log(1);
        switch (field) {
            case 'name':
                this.isValid = this.name !== '';
                return this.name !== '';
            case 'dateOfBirth':
                this.isValid = this.dateOfBirth !== '';
                return this.dateOfBirth !== '';
            case 'email':
                this.isValid = this.email !== '';
                return this.email !== '';
            case 'address':
                this.isValid = this.address !== '';
                return this.address !== '';
            case 'phone':
                this.isValid = this.phone !== '';
                return this.phone !== '';
            case 'idCard':
                this.isValid = this.idCard !== '';
                return this.idCard !== '';
            case 'img':
                return this.img !== '';
            default:
                return false;
        }
    }

    checkPattern(field: string): boolean {
        // console.log(2);
        const regexPhone = /^\d{10,12}$/g;
        const regexIdCard = /^(\d{9}|\d{11})$/g;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        switch (field) {
            case 'email':
                this.isValid = this.phone.match(regexEmail) !== null;
                return this.email.match(regexEmail) !== null
            case 'phone':
                this.isValid = this.phone.match(regexPhone) !== null;
                return this.phone.match(regexPhone) !== null;
            case 'idCard':
                this.isValid = this.idCard.match(regexIdCard) !== null;
                return this.idCard.match(regexIdCard) !== null
            default:
                return false;
        }
    }

    checkAge(): boolean {
        // console.log(3);
        let now = new Date();
        let birthday = new Date(this.dateOfBirth);
        let between = now.getTime() - birthday.getTime();
        let age = (between / (1000 * 60 * 60 * 24)) / 365;
        this.isValid = age > 18;
        return age > 18;
    }

}