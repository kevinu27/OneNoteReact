import { createContext, useState, useReducer } from "react";

export const TabsContext = createContext();

function tabsReducer(state, action){
    console.log('tabs reducer')

    if(action.type == "ACTIVE_TAB"){
        console.log('ACTIVE_TAB')
        
            return {
                ...state,
                activeTab: action.payload ,
            }
   
     
    }
    if(action.type == "LOAD_TABS"){
        console.log('LOAD_TABS')
        
            return {
                ...state,
                tabs: action.payload,
            }
   
     
    }
    return {
        ...state,
        activeTab: action.payload ,
    }

}

export default function TabsContextProvider({children}) {
    function handleTabSelection(tab) {
        console.log('tab', tab)
        tabsDispatch({
            type: 'ACTIVE_TAB',
            payload: tab
        })
    }
    function handleTabsLoad(tab) {
        console.log('tab en handleTabsLoad', tab)
        tabsDispatch({
            type: 'LOAD_TABS',
            payload: tab
        })
    }

const [tabsState, tabsDispatch] = useReducer(tabsReducer, {

    activeTab: {name:'', index: 0},
    tabs: []
    
})

const tabsContextValues = {
    activeTab: tabsState.activeTab,
    tabs: tabsState.tabs,
    handleTabSelection: handleTabSelection,
    handleTabsLoad: handleTabsLoad

}

    return (<TabsContext.Provider value={tabsContextValues} >
        {children}
</TabsContext.Provider>)
}