import {Contract} from "./contract";

export interface Customer {
    customerId: string
    name: string
    dateOfBirth: string
    email: string
    address: string
    phone: string
    gender: boolean
    idCard: string
    img: string
    contracts?: Contract[]
}
