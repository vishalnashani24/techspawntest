import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class AppConfig {
    withoutLoginUrls: any = ['login'];
    apiUrl: any = (window.location.hostname == 'localhost') ? "http://localhost:5107/api" : "http://localhost:5107/api";
    token: any = {
        keyID: 'osSuperAdminUserAuthToken',
        userKey: 'erSuperAdminUser',
    };
    assetPath: any = "assets";
    perPageDefault: any = 5;
    perPageArray: any = [
        { val: 5, text: '5/Page' },
        { val: 10, text: '10/Page' },
        { val: 20, text: '20/Page' },
        { val: 30, text: '30/Page' },
        { val: 40, text: '40/Page' },
        { val: 50, text: '50/Page' },
        { val: 100, text: '100/Page' }
    ];
    MOMENT_DATE_TIME_FORMAT: any = 'YYYY-MM-DD HH:mm:ss';
    MaxUploadSixe: any = 5;
    alowedFiletypes: any = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ,
        'image/gif',
        'image/jpeg',
        'image/png'
    ];
    statusCode: any = {
        'success': 200,
        'error': 402,
        'emailOtp': 202,
        'authErr': 203,
        'accessErr': 204,
        'emailOtpError': 205
    };
    pattern: any = {
        'NAME': /^[a-zA-Z . \-\']*$/,
        'CMPNAME': /^[a-zA-Z0-9 ]*$/,
        'AMOUNT': /^[0-9]/,
        'USERNAME': /^[a-zA-Z0-9]*$/,
        'ROLENAME': /^[a-zA-Z\_\- ]*$/,
        "CITY": /^[a-zA-Z . \-\']*$/,
        "EMAIL": /^[a-zA-Z0-9]+[a-zA-Z0-9]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/,
        "POSTAL_CODE": /(^\d{5}$)|(^\d{5}-\d{4}$)/,
        "PASSWORD": /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/,
        "PHONE": /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "DESCRIPT": /^[a-zA-Z\.\' ]*$/,
        "PHONE_NO_MASK": [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        "CARD_NO_MASK": [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        "CVV_NO_MASK": [/\d/, /\d/, /\d/],
    };
    mob_country_code: any = [
        { key: '+1', text: '+1' },
        { key: '+91', text: '+91' }
    ];
    ckEditorConfig: any = {
        //"uiColor": "#99000",
        "toolbarGroups": [
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
            { name: 'clipboard', groups: ['clipboard', 'undo'] },
            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] }, //, 'bidi'
            { name: 'styles' },
            { name: 'colors' },
            { name: 'insert'},
            { name: 'font' },
            { name: 'mode' }, //, 'document', 'doctools'
            
            //{ name: 'editing', groups: ['find', 'selection', 'spellchecker'] },            
            //{ name: 'forms' },
            //{ name: 'tools' },   
            //{ name: 'about' }            
        ],
        "removeButtons": "Image,SpecialChar,Flash,Smiley,Iframe,PageBreak" //Source,Save,Templates,Find,Replace,Scayt,SelectAll
    };
}