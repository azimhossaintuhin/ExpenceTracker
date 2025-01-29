
import BottomSheet from "@gorhom/bottom-sheet";

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    SignUp: undefined ;
    Home: undefined;
    Details: { id: number };
    Profile: undefined;
    NotFound: undefined;
}

export type globalContainerType = {
    flex: number;
    backgroundColor: string;
   
  
}



export interface InputTypes {
    fieldName: string;
    values: {
      [key: string]: string;
    };
    errors?: {
      [key: string]: string;
    };
    touched?: {
      [key: string]: boolean;
    };
    handleChange?: (name: string) => any;  
    handleBlur?: (name:string)=>any;    
  }




  export interface CardProps {
    item:any,
    index:number;
  }


  export interface TodosProps {
    item:any,
    index:number;
   
  }

  export type BottomsheetProps = {
    sheetRef:React.RefObject<BottomSheet>
    
    children:React.ReactNode
  }