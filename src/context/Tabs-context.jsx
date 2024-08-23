import { createContext, useState, useReducer } from "react";

export const TabsContext = createContext();

function tabsReducer(state, action){
    console.log('tabs reducer')

    if(action.type == "ACTIVE_TAB"){
        console.log('ACTIVE_TAB ---- action....', action)
        
            return {
                ...state,
                activeTab: action.payload ,
            }
   
     
    }
    if(action.type == "LOAD_TABS"){
        console.log('LOAD_TABS')
        console.log('state', state)
        console.log('action', action)
        
            return {
                ...state,
                tabs: [ action.payload, ...state.tabs ],
            }
    }

    if(action.type == "NAME_TABS"){
        console.log('NAME_TABS**********-------------------------')
        console.log('state named ---', state)
        console.log('action named ---', action)
        // const tabsRenamed = state.tabs.map( tab => tab.index == action.payload.index ? tab.name = action.payload.name : null
        // )
        // console.log('tabsRenamed', tabsRenamed)
        
        return {
            ...state,
            activeTab: action.payload,
            tabs: state.tabs.map(tab =>
                tab.index === action.payload.index
                    ? { ...tab, name: action.payload.name }
                    : tab
            )
        };
   
     
    }
    // return {
    //     ...state,
    //     activeTab: action.payload ,
    // }

}

export default function TabsContextProvider({children}) {
    function handleTabSelection(tab) {
        // console.log('tab----', tab)
        tabsDispatch({
            type: 'ACTIVE_TAB',
            payload: tab
        })
    }

    function handleTabsLoad(tabs) {
        // console.log('tab en handleTabsLoad', tabs)
        tabsDispatch({
            type: 'LOAD_TABS',
            payload: tabs
        })
    }

    function handleTabNameChange(tabs) {
        console.log('tab en handleTabsLoadoooooooooooooooooooo', tabs)
        tabsDispatch({
            type: 'NAME_TABS',
            payload: tabs
        })
    }

const [tabsState, tabsDispatch] = useReducer(tabsReducer, {

    activeTab: {},
    tabs: [{name:'+', index: 0, color:'#fff'}]
    
})

const tabsContextValues = {
    activeTab: tabsState.activeTab,
    tabs: tabsState.tabs,
    handleTabSelection: handleTabSelection,
    handleTabsLoad: handleTabsLoad,
    handleTabNameChange: handleTabNameChange

}

    return (<TabsContext.Provider value={tabsContextValues} >
        {children}
</TabsContext.Provider>)
}