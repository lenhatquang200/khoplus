export interface DataItemProps{
    name:String | "",
    code?:string | number,
    manufacturing_group:{
        name:string | ''
    },
    phone:string | number | ''
}

export interface Iprops {
    item:DataItemProps,
    propsItem: any
}