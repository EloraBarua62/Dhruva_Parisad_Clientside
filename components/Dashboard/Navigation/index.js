import allNavigation from "./Navigation";

const getNavigation = (role) => {
    const mainMenu = [], otherMenu = [];

    for(let i=0 ; i < allNavigation.length ; i++){
        if(role === allNavigation[i].role){
            if(i<4)
                mainMenu.push(allNavigation[i]);
            else
                otherMenu.push(allNavigation[i]);;
        }
            
    }

    return [mainMenu, otherMenu];
}

export default getNavigation;