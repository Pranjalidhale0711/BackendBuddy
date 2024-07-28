const express=require( 'express')

let regexemail= /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/

const validemail=(value)=>{
 return  regexemail.test(value);
}
module.exports={
    validemail
};