import {
    createNavigationContainerRef,
    CommonActions,
    StackActions,
} from '@react-navigation/native';


export const navigationRef = createNavigationContainerRef();

export function navigate(name , params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}


export function goBack(){
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.goBack());
    }
}

export function resetRoot(name){
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: name }],
            })
        );
    }
}

export function replace(name, params){
    if (navigationRef.isReady()) {
        console.info('replace', name, params);
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}



export function push(name, params){
    if(navigationRef.isReady()){
        navigationRef.dispatch(StackActions.push(name, params));
    }
}
