
import BottomSheet from "@gorhom/bottom-sheet";

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    SignUp: undefined ;
    Home: undefined;
    Details: { id: number };
    Profile: { name: string};
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
    handleChange?: (name: string) => any;  // Optional function for handleChange
    handleBlur?: (name:string)=>any;    // Optional function for handleBlur
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