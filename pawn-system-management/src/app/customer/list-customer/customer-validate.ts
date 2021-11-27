import { Customer } from "src/app/interface/customer"
import { CustomerService } from "src/app/services/customer.service"

export class ValidateCustomer {
    name: string
    dateOfBirth: string
    email: string
    address: string
    phone: string
    idCard: string
    img: string
    isValid: boolean
    isChange: boolean = false;
    gender: boolean;
    public customers: Customer[];
    private customer: Customer;
    constructor(isValid: boolean, customer: Customer, customers: Customer[]) {
        this.isValid = isValid;
        this.customer = customer;
        this.customers = customers;
        this.name = this.customer.name;
        this.dateOfBirth = this.customer.dateOfBirth;
        this.dateOfBirth = this.customer.dateOfBirth;
        this.email = this.customer.email;
        this.address = this.customer.address;
        this.phone = this.customer.phone;
        this.idCard = this.customer.idCard;
        this.img = this.customer.img;
        this.gender = this.customer.gender;
    }

    setGender(gender: boolean) {
        this.gender = gender;
        this.isChange = true;
    }

    setName(name: string) {
        this.isChange = true;
        this.name = name;
    }
    setEmail(email: string) {
        this.isChange = true;
        this.email = email;
    }
    setAddress(address: string) {
        this.isChange = true;
        this.address = address;
    }

    setPhone(phone: string) {
        this.isChange = true;
        this.phone = phone;
    }

    setIdCard(idcard: string) {
        this.isChange = true;
        this.idCard = idcard;
    }

    setImg(img: string) {
        this.isChange = true;
        this.img = img;
    }

    setDateOfBirth(dateOfBirth: string) {
        this.isChange = true;
        this.dateOfBirth = dateOfBirth;
    }

    checkRequired(field: any): boolean {
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
        const regexName = /^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$/g;
        const regexPhone = /^\d{10,12}$/g;
        const regexIdCard = /^(\d{9}|\d{11})$/g;
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        switch (field) {
            case 'name':
                this.isValid = this.name.match(regexName) !== null;
                return this.name.match(regexName) !== null
            case 'email':
                this.isValid = this.email.match(regexEmail) !== null;
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
        let now = new Date();
        let birthday = new Date(this.dateOfBirth);
        let between = now.getTime() - birthday.getTime();
        let age = (between / (1000 * 60 * 60 * 24)) / 365;
        this.isValid = age > 18;
        return age > 18;
    }

    checkIdCard(): boolean {
        for (let i = 0; i < this.customers.length; i++) {
            if (this.idCard === this.customer.idCard) {
                continue;
            }
            if (this.idCard === this.customers[i].idCard) {
                this.isValid = false;
                return false;
            }
        }
        return true;
    }

}