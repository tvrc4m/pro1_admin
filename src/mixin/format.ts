
import { Component,Vue } from 'vue-property-decorator'
import * as moment from 'moment'
import * as numeral from 'numeral'

declare module 'vue/types/vue'{
    interface Vue{
        formatDate(datetime:number):string
        formatNumber(num:number|string,format?:string):string
        formatSort(key:string,sortType:boolean):any
    }
}

@Component
export default class FormatMixin extends Vue{

    formatDate(datetime:number|string):string{
        return moment(datetime).format("YYYY-MM-DD HH:mm:ss")
    }

    formatNumber(num:number|string,format?:string):string{
        if(typeof num=='string'){
            num=parseInt(num)
        }
        if(typeof format=='undefined'){
            format="0.00"
        }
        return numeral(num).format(format)
    }

    formatSort(key:string,sortType:boolean=true){
         return function(a:any,b:any){
            return sortType ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
        }
    }
}


