import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';

type ProfileScreenNavigation = StackNavigationProp<any>;
type ProfileScreenRouteProp = RouteProp<any>;

export interface IObjectItem{
    id?:string,
    name:string
}

export interface Iprops{
    navigation?:ProfileScreenNavigation,
    route: ProfileScreenRouteProp,
}
